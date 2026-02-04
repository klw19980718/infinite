import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClientForRouteHandler } from "@/lib/supabase/server.server"

// Creem API configuration
const CREEM_API_URL = process.env.CREEM_API_URL || "https://api.creem.io"
const CREEM_API_KEY = process.env.CREEM_API_KEY
const IS_DEVELOPMENT = process.env.NODE_ENV === "development"

if (!CREEM_API_KEY) {
  throw new Error("CREEM_API_KEY environment variable is required")
}

// Plan -> credits; Creem product ID is loaded from products table by credits
const PLAN_CREDITS: Record<string, number> = {
  starter: 100,
  pro: 250,
  ultimate: 600,
}

// 开发环境使用测试 API URL
const API_URL = IS_DEVELOPMENT ? "https://test-api.creem.io" : CREEM_API_URL

// Use Node.js runtime for Supabase compatibility
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const response = new NextResponse()
    const supabase = createServerSupabaseClientForRouteHandler(request, response)

    // Authenticate user via cookies (same as video APIs)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { ok: false, code: "UNAUTHORIZED", message: "User not authenticated" },
        { status: 401 }
      )
    }

    const { planId } = await request.json()

    const credits = planId ? PLAN_CREDITS[planId] : undefined
    if (!planId || credits == null) {
      return NextResponse.json(
        { ok: false, code: "INVALID_PLAN", message: "Invalid plan ID" },
        { status: 400 }
      )
    }

    if (IS_DEVELOPMENT) {
      console.log("✅ User authenticated via cookies:", { userId: user.id, email: user.email, planId })
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("creem_product_id")
      .eq("credits", credits)
      .eq("active", true)
      .maybeSingle()

    if (productError || !product?.creem_product_id) {
      if (IS_DEVELOPMENT) console.error("Product lookup error:", productError)
      return NextResponse.json(
        { ok: false, code: "PRODUCT_NOT_FOUND", message: "Product not configured" },
        { status: 400 }
      )
    }

    const productId = product.creem_product_id

    // Generate unique request ID
    const requestId = `req_${Date.now()}_${user.id.slice(0, 8)}`

    // Create checkout session with Creem
    const checkoutResponse = await fetch(`${API_URL}/v1/checkouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CREEM_API_KEY!,
      },
      body: JSON.stringify({
        product_id: productId,
        request_id: requestId,
        metadata: {
          user_id: user.id,
          user_email: user.email,
          plan_id: planId,
        },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile?payment=success`,
      }),
    })

    if (!checkoutResponse.ok) {
      const errorData = await checkoutResponse.text()
      console.error("Creem checkout error:", errorData)
      return NextResponse.json(
        { ok: false, code: "CHECKOUT_ERROR", message: "Failed to create checkout session" },
        { status: 500 }
      )
    }

    const checkoutData = await checkoutResponse.json()

    return NextResponse.json({
      ok: true,
      checkout_url: checkoutData.checkout_url || checkoutData.url,
      checkout_id: checkoutData.id,
      request_id: requestId,
    }, { headers: response.headers })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR", message: "Internal server error" },
      { status: 500 }
    )
  }
}
