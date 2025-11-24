import { NextRequest, NextResponse } from "next/server"
import { getServerSupabase } from "@/lib/supabase"
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
    
    // Log webhook request for debugging
    console.log("[Webhook] Received request:", {
      url: request.url,
      method: request.method,
      headers: {
        "webhook-id": request.headers.get("webhook-id"),
        "webhook-timestamp": request.headers.get("webhook-timestamp"),
        "webhook-signature": request.headers.get("webhook-signature") ? "present" : "missing",
      },
      bodyLength: rawBody.length,
    })
    
    // Verify signature if secret is available
    const secret = process.env.WAVESPEED_WEBHOOK_SECRET
    if (secret) {
      const isValid = verifySignature(rawBody, request.headers, secret)
      if (!isValid) {
        console.error("[Webhook] Invalid signature")
        return NextResponse.json(
          { ok: false, message: "Invalid signature" },
          { status: 401 }
        )
      }
      console.log("[Webhook] Signature verified")
    } else {
      console.warn("[Webhook] WAVESPEED_WEBHOOK_SECRET not set, skipping signature verification")
    }

    const body = JSON.parse(rawBody)
    const webhookId = request.headers.get("webhook-id")
    
    // Get task_id from query params
    const searchParams = request.nextUrl.searchParams
    const taskId = searchParams.get("task_id")

    console.log("[Webhook] Processing:", {
      taskId,
      webhookId,
      status: body.status,
      outputs: body.outputs?.length || 0,
    })

    if (!taskId) {
      console.error("[Webhook] Missing task_id")
      return NextResponse.json(
        { ok: false, message: "Missing task_id" },
        { status: 400 }
      )
    }

    // Initialize Supabase client with service role key (webhook is called externally, no cookies)
    const supabase = getServerSupabase()

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
      console.error("[Webhook] Error updating video task:", error)
      return NextResponse.json(
        { ok: false, message: "Failed to update task", error: error.message },
        { status: 500 }
      )
    }

    console.log("[Webhook] Task updated successfully:", {
      taskId,
      status: updateData.p_status,
      hasOutput: !!updateData.p_output_video_url,
    })

    // If completed, set expiry
    if (body.status === "completed") {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      const { error: expiryError } = await supabase
        .from("video_tasks")
        .update({ expires_at: expiresAt })
        .eq("id", taskId)
      
      if (expiryError) {
        console.error("[Webhook] Error setting expiry:", expiryError)
      } else {
        console.log("[Webhook] Expiry set:", expiresAt)
      }
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

