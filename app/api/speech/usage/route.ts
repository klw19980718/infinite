import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClientForRouteHandler } from "@/lib/supabase/server.server"

// Use Node.js runtime for Supabase compatibility
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Create response object for cookie handling
    const response = new NextResponse()
    
    // Get user from session using cookie-based authentication
    const supabase = createServerSupabaseClientForRouteHandler(request, response)
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

    const DAILY_FREE_LIMIT = 3000 // 3000 characters per day

    // Get today's usage
    const { data: usageData, error: usageError } = await supabase
      .from("tts_usage")
      .select("characters_used")
      .eq("user_id", user.id)
      .eq("usage_date", new Date().toISOString().split("T")[0])
      .maybeSingle()

    if (usageError && usageError.code !== 'PGRST116') { // PGRST116 means "no rows found"
      console.error("Error fetching TTS usage:", usageError)
      return NextResponse.json(
        { ok: false, code: "USAGE_FETCH_ERROR", message: "Failed to fetch usage data" },
        { status: 500 }
      )
    }

    const charactersUsed = usageData?.characters_used || 0
    const remainingFree = Math.max(0, DAILY_FREE_LIMIT - charactersUsed)

    return NextResponse.json(
      {
        ok: true,
        usage: {
          characters_used: charactersUsed,
          remaining_free: remainingFree,
          daily_limit: DAILY_FREE_LIMIT,
        },
      },
      {
        headers: response.headers,
      }
    )
  } catch (error) {
    console.error("TTS usage fetch error:", error)
    return NextResponse.json(
      {
        ok: false,
        code: "INTERNAL_ERROR",
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    )
  }
}

