import { NextRequest, NextResponse } from "next/server"
import { getServerSupabase } from "@/lib/supabase"
import crypto from "crypto"

// Creem webhook secret for verification
const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET
const IS_DEVELOPMENT = process.env.NODE_ENV === "development"

if (!CREEM_WEBHOOK_SECRET) {
  console.warn("CREEM_WEBHOOK_SECRET not configured - webhook verification disabled")
}

// Use Node.js runtime for Supabase and crypto compatibility
export const runtime = 'nodejs'

// Credit mapping based on plan
const CREDIT_MAPPING = {
  pro: 400,
  ultimate: 800,
  enterprise: 1800,
}

function verifyCreemSignature(payload: string, signature: string, timestamp?: string): boolean {
  if (!CREEM_WEBHOOK_SECRET) {
    console.warn("Webhook secret not configured, skipping verification")
    return true // In development, allow without verification
  }

  try {
    // Creem signature includes timestamp if provided
    const signedPayload = timestamp ? `${timestamp}.${payload}` : payload
    
    const expectedSignature = crypto
      .createHmac('sha256', CREEM_WEBHOOK_SECRET)
      .update(signedPayload)
      .digest('hex')

    // Remove 'sha256=' prefix if present
    const cleanSignature = signature.replace(/^sha256=/, '')
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(cleanSignature, 'hex')
    )
  } catch (error) {
    console.error("Signature verification error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    // Creem uses both "Creem-Signature" and "x-creem-signature" headers
    const signature = request.headers.get("Creem-Signature") || request.headers.get("x-creem-signature")
    const timestamp = request.headers.get("Creem-Timestamp") || request.headers.get("x-creem-timestamp")

    // Log webhook request in development
    if (IS_DEVELOPMENT) {
      const eventPreview = (() => {
        try {
          const parsed = JSON.parse(body)
          return parsed.eventType || parsed.type || "unknown"
        } catch {
          return "invalid-json"
        }
      })()
      
      console.log("🔔 Webhook received:", {
        signature: signature ? `${signature.substring(0, 10)}...` : "none",
        timestamp: timestamp || "none",
        bodyLength: body.length,
        eventType: eventPreview,
        headers: Object.fromEntries(request.headers.entries()),
      })
    }

    // Verify webhook signature (skip in development if secret not configured)
    if (signature && !IS_DEVELOPMENT && CREEM_WEBHOOK_SECRET) {
      if (!verifyCreemSignature(body, signature, timestamp || undefined)) {
        console.error("Invalid webhook signature")
        return NextResponse.json(
          { ok: false, message: "Invalid signature" },
          { status: 401 }
        )
      }
    }

    const event = JSON.parse(body)

    // Process checkout completion events (support both formats)
    const eventType = event.eventType || event.type
    const isCheckoutCompleted = 
      eventType === "checkout.completed" || 
      eventType === "checkout.session.completed"

    if (!isCheckoutCompleted) {
      if (IS_DEVELOPMENT) {
        console.log("⏭️ Skipping event:", eventType)
      }
      return NextResponse.json({ received: true })
    }

    const checkout = event.object
    const metadata = checkout.metadata || {}

    // Extract user information from metadata
    const userId = metadata.user_id
    const planId = metadata.plan_id

    if (IS_DEVELOPMENT) {
      console.log("💰 Processing checkout.completed:", {
        userId,
        planId,
        metadata,
        checkoutId: checkout.id,
        checkoutData: JSON.stringify(checkout, null, 2),
      })
    }

    if (!userId || !planId) {
      console.error("Missing user_id or plan_id in webhook metadata")
      console.error("Received metadata:", metadata)
      return NextResponse.json(
        { ok: false, message: "Missing user_id or plan_id in metadata" },
        { status: 400 }
      )
    }

    // Validate user_id is a valid UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(userId)) {
      console.error("Invalid user_id format (must be UUID):", userId)
      return NextResponse.json(
        { ok: false, message: "Invalid user_id format" },
        { status: 400 }
      )
    }

    const supabase = getServerSupabase()

    // Idempotency lock: try to insert a placeholder payment first.
    // If another request already inserted the same unique_key, skip immediately.
    const uniqueKey: string | undefined = event.id
    if (uniqueKey) {
      const { error: prelockErr } = await supabase.from("payments").insert({
        order_id: null,
        provider: "creem",
        event_type: event.eventType,
        unique_key: uniqueKey,
        payload_json: { prelocked: true },
      })
      if (prelockErr) {
        // 23505 = unique violation
        if ((prelockErr as any).code === "23505") {
          if (IS_DEVELOPMENT) console.log("⏭️ Duplicate webhook (prelocked)", uniqueKey)
          return NextResponse.json({ received: true })
        }
        console.error("Error prelocking payment record:", prelockErr)
        return NextResponse.json({ ok: false, message: "Prelock failed" }, { status: 500 })
      }
    }

    // Secondary idempotency: if an order with the same checkout/session id already exists, skip
    if (checkout?.id) {
      const { data: existingOrder, error: existingOrderErr } = await supabase
        .from("orders")
        .select("id")
        .eq("creem_session_id", checkout.id)
        .maybeSingle()
      if (existingOrderErr) {
        console.error("Error checking existing order by session id:", existingOrderErr)
      }
      if (existingOrder) {
        // Link the prelocked payment row and exit
        await supabase
          .from("payments")
          .update({ order_id: existingOrder.id, payload_json: event })
          .eq("unique_key", event.id)
        if (IS_DEVELOPMENT) console.log("⏭️ Duplicate webhook (by checkout.id)", checkout.id)
        return NextResponse.json({ received: true })
      }
    }

    // Get credits to add based on plan
    const creditsToAdd = CREDIT_MAPPING[planId as keyof typeof CREDIT_MAPPING]
    if (!creditsToAdd) {
      console.error("Invalid plan_id:", planId)
      return NextResponse.json({ received: true })
    }

    // Start transaction to update user credits and create ledger entry
    // NOTE: argument names must match the SQL function parameters
    const { error: updateError } = await supabase.rpc("add_user_credits", {
      p_user_id: userId,
      p_credits_to_add: creditsToAdd,
      p_note: `Purchase: ${planId} plan (${creditsToAdd} credits)`,
    })

    if (updateError) {
      console.error("Error updating user credits:", updateError)
      console.error("RPC call details:", {
        userId,
        creditsToAdd,
        note: `Purchase: ${planId} plan (${creditsToAdd} credits)`,
      })
      return NextResponse.json(
        { ok: false, message: "Failed to update credits", error: updateError.message },
        { status: 500 }
      )
    }

    // Resolve local product uuid by creem product id
    const creemProductId: string | undefined = checkout.order?.product || checkout.product?.id
    let localProductId: string | null = null
    if (creemProductId) {
      const { data: productRow, error: productErr } = await supabase
        .from("products")
        .select("id")
        .eq("creem_product_id", creemProductId)
        .maybeSingle()
      if (productErr) {
        console.error("Error fetching local product:", productErr)
      }
      localProductId = productRow?.id ?? null
    }

    // Create order record (use local uuid product_id if found)
    let insertedOrderId: string | null = null
    {
      const { data: orderRows, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          product_id: localProductId,
          status: "paid",
          request_id: checkout.request_id,
          creem_session_id: checkout.id,
          creem_order_id: checkout.order?.id,
          amount_total_cents: checkout.order?.amount || 0,
          currency: checkout.order?.currency || "USD",
          paid_at: new Date().toISOString(),
        })
        .select("id")
      if (orderError) {
        console.error("Error creating order record:", orderError)
      } else if (orderRows && orderRows.length > 0) {
        insertedOrderId = orderRows[0].id
      }
    }

    // Finalize payment record: update the prelocked row with full payload and order link
    const { error: paymentError } = await supabase
      .from("payments")
      .update({
        order_id: insertedOrderId,
        payload_json: event,
      })
      .eq("unique_key", event.id)

    if (paymentError) {
      console.error("Error creating payment record:", paymentError)
      // Don't fail the webhook for this error
    }

    console.log(`Successfully processed payment for user ${userId}: +${creditsToAdd} credits`)
    
    if (IS_DEVELOPMENT) {
      console.log("✅ Payment processing completed successfully")
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace')
    console.error("Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
    })
    return NextResponse.json(
      { ok: false, message: "Webhook processing failed", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
