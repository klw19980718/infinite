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

    // Verify task belongs to user
    const { data: task, error: taskError } = await supabase
      .from("video_tasks")
      .select("id, wavespeed_task_id, status")
      .eq("id", taskId)
      .eq("user_id", user.id)
      .single()

    if (taskError || !task) {
      return NextResponse.json(
        { ok: false, code: "TASK_NOT_FOUND", message: "Task not found or access denied" },
        { status: 404 }
      )
    }

    if (!task.wavespeed_task_id) {
      return NextResponse.json({
        ok: true,
        task_id: task.id,
        status: task.status,
        outputs: [],
        error: "Task not yet submitted to WaveSpeedAI",
      })
    }

    // Get result from WaveSpeedAI
    let result
    try {
      result = await getTaskResult(task.wavespeed_task_id)
    } catch (error) {
      console.error("Error fetching result from WaveSpeedAI:", error)
      return NextResponse.json(
        { ok: false, code: "WAVESPEED_ERROR", message: "Failed to fetch result from WaveSpeedAI" },
        { status: 500 }
      )
    }

    // Update task status in database
    const updateData: {
      status: "pending" | "processing" | "completed" | "failed"
      output_video_url?: string
      error_message?: string
      api_response?: any
    } = {
      status: result.status as "pending" | "processing" | "completed" | "failed",
    }

    if (result.status === "completed" && result.outputs.length > 0) {
      updateData.output_video_url = result.outputs[0]
      // Get video duration if available (would need to analyze the video)
      // For now, we'll leave it as is
    }

    if (result.status === "failed" && result.error) {
      updateData.error_message = result.error
    }

    updateData.api_response = result

    await supabase.rpc("update_video_task", {
      p_task_id: task.id,
      p_status: updateData.status,
      p_output_video_url: updateData.output_video_url,
      p_error_message: updateData.error_message,
      p_api_response: updateData.api_response,
    })

    // Set expiry (7 days retention) for completed outputs if the column exists.
    // This is best-effort: ignore if the column is not present.
    if (updateData.status === "completed") {
      try {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        await supabase
          .from("video_tasks")
          .update({ expires_at: expiresAt })
          .eq("id", task.id)
      } catch (e) {
        // noop
      }
    }

    return NextResponse.json(
      {
        ok: true,
        task_id: task.id,
        status: result.status,
        outputs: result.outputs,
        error: result.error,
      },
      {
        headers: response.headers,
      }
    )
  } catch (error) {
    console.error("Get result error:", error)
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
