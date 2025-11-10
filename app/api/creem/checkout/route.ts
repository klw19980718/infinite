import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClientForRouteHandler } from "@/lib/supabase/server.server"

// Creem API configuration
const CREEM_API_URL = process.env.CREEM_API_URL || "https://api.creem.io"
const CREEM_API_KEY = process.env.CREEM_API_KEY
const IS_DEVELOPMENT = process.env.NODE_ENV === "development"

if (!CREEM_API_KEY) {
  throw new Error("CREEM_API_KEY environment variable is required")
}

// Product mapping - 这些需要在 Creem 仪表板中创建
const PRODUCT_MAPPING = {
  pro: process.env.CREEM_PRODUCT_PRO_ID, // 400 credits for $29.9
  ultimate: process.env.CREEM_PRODUCT_ULTIMATE_ID, // 800 credits for $49.9
  enterprise: process.env.CREEM_PRODUCT_ENTERPRISE_ID, // 1800 credits for $99.9
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

    if (!planId || !PRODUCT_MAPPING[planId as keyof typeof PRODUCT_MAPPING]) {
      return NextResponse.json(
        { ok: false, code: "INVALID_PLAN", message: "Invalid plan ID" },
        { status: 400 }
      )
    }

    if (IS_DEVELOPMENT) {
      console.log("✅ User authenticated via cookies:", { userId: user.id, email: user.email, planId })
    }

    const productId = PRODUCT_MAPPING[planId as keyof typeof PRODUCT_MAPPING]
    if (!productId) {
      return NextResponse.json(
        { ok: false, code: "PRODUCT_NOT_FOUND", message: "Product not configured" },
        { status: 400 }
      )
    }

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
