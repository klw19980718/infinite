import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClientForRouteHandler } from "@/lib/supabase/server.server"
import { getTaskResult } from "@/lib/wavespeed"

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

    // Get task_id from query params
    const searchParams = request.nextUrl.searchParams
    const taskId = searchParams.get("task_id")

    if (!taskId) {
      return NextResponse.json(
        { ok: false, code: "MISSING_TASK_ID", message: "task_id query parameter is required" },
        { status: 400 }
      )
    }

    // Get result from WaveSpeedAI directly (TTS tasks are not stored in video_tasks)
    let result
    try {
      result = await getTaskResult(taskId)
    } catch (error) {
      console.error("Error fetching TTS result from WaveSpeedAI:", error)
      return NextResponse.json(
        { ok: false, code: "WAVESPEED_ERROR", message: "Failed to fetch result from WaveSpeedAI" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        ok: true,
        task_id: taskId,
        status: result.status,
        outputs: result.outputs,
        error: result.error,
      },
      {
        headers: response.headers,
      }
    )
  } catch (error) {
    console.error("Get TTS result error:", error)
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

