import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClientForRouteHandler } from "@/lib/supabase/server.server"
import crypto from "crypto"

// Use Node.js runtime for crypto and Supabase compatibility
export const runtime = 'nodejs'

// Helper to verify signature
function verifySignature(payload: string, headers: Headers, secret: string): boolean {
  const id = headers.get("webhook-id")
  const timestamp = headers.get("webhook-timestamp")
  const signatureHeader = headers.get("webhook-signature")

  if (!id || !timestamp || !signatureHeader) {
    return false
  }

  const [version, receivedSignature] = signatureHeader.split(',')
  if (version !== 'v3') {
    return false
  }

  const signedContent = `${id}.${timestamp}.${payload}`
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedContent)
    .digest('hex')

  // Check timestamp freshness (e.g. 5 minutes)
  const now = Math.floor(Date.now() / 1000)
  const ts = parseInt(timestamp, 10)
  if (Math.abs(now - ts) > 300) {
    console.error("Webhook signature timestamp too old")
    return false
  }

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(receivedSignature)
  )
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    
    // Verify signature if secret is available
    const secret = process.env.WAVESPEED_WEBHOOK_SECRET
    if (secret) {
      const isValid = verifySignature(rawBody, request.headers, secret)
      if (!isValid) {
        return NextResponse.json(
          { ok: false, message: "Invalid signature" },
          { status: 401 }
        )
      }
    } else {
      console.warn("WAVESPEED_WEBHOOK_SECRET not set, skipping signature verification")
    }

    const body = JSON.parse(rawBody)
    const webhookId = request.headers.get("webhook-id")
    
    // Get task_id from query params
    const searchParams = request.nextUrl.searchParams
    const taskId = searchParams.get("task_id")

    if (!taskId) {
      return NextResponse.json(
        { ok: false, message: "Missing task_id" },
        { status: 400 }
      )
    }

    // Initialize Supabase client
    const response = new NextResponse()
    const supabase = createServerSupabaseClientForRouteHandler(request, response)

    // Check for idempotency and log event
    if (webhookId) {
      try {
        // Check if event already exists
        const { data: existingEvent } = await supabase
          .from("webhook_events")
          .select("id")
          .eq("webhook_id", webhookId)
          .single()

        if (existingEvent) {
          console.log(`Webhook event ${webhookId} already processed`)
          return NextResponse.json({ ok: true, message: "Already processed" })
        }

        // Log new event
        await supabase.from("webhook_events").insert({
          webhook_id: webhookId,
          task_id: taskId,
          event_type: body.status,
          payload_json: body
        })
      } catch (e) {
        console.error("Error logging webhook event:", e)
        // Continue processing even if logging fails
      }
    }

    // Prepare update data
    const updateData: {
      p_task_id: string
      p_status: string
      p_output_video_url?: string
      p_error_message?: string
      p_api_response?: any
    } = {
      p_task_id: taskId,
      p_status: body.status === "completed" ? "completed" : (body.status === "failed" ? "failed" : "processing"),
      p_api_response: body
    }

    if (body.status === "completed" && body.outputs && body.outputs.length > 0) {
      updateData.p_output_video_url = body.outputs[0]
    }

    if (body.status === "failed") {
      updateData.p_error_message = body.error || "Task failed"
    }

    // Update task status via RPC
    const { error } = await supabase.rpc("update_video_task", updateData)

    if (error) {
      console.error("Error updating video task:", error)
      return NextResponse.json(
        { ok: false, message: "Failed to update task" },
        { status: 500 }
      )
    }

    // If completed, set expiry
    if (body.status === "completed") {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      await supabase
        .from("video_tasks")
        .update({ expires_at: expiresAt })
        .eq("id", taskId)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}

