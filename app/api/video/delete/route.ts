import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClientForRouteHandler } from "@/lib/supabase/server.server"
import { getServerSupabase } from "@/lib/supabase"

// Use Node.js runtime for Supabase compatibility
export const runtime = 'nodejs'

export async function DELETE(request: NextRequest) {
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

    // Verify task belongs to user (using cookie-based client for RLS check)
    const { data: task, error: taskError } = await supabase
      .from("video_tasks")
      .select("id, user_id")
      .eq("id", taskId)
      .eq("user_id", user.id)
      .single()

    if (taskError || !task) {
      return NextResponse.json(
        { ok: false, code: "TASK_NOT_FOUND", message: "Task not found or access denied" },
        { status: 404 }
      )
    }

    // Use service role client to bypass RLS for deletion
    // (We've already verified ownership above)
    const serverSupabase = getServerSupabase()
    const { data: deletedRows, error: deleteError } = await serverSupabase
      .from("video_tasks")
      .delete()
      .eq("id", taskId)
      .eq("user_id", user.id)
      .select("id")

    if (deleteError) {
      console.error("Error deleting task:", deleteError)
      return NextResponse.json(
        { ok: false, code: "DELETE_ERROR", message: deleteError.message || "Failed to delete task" },
        { status: 500 }
      )
    }

    // Verify deletion was successful
    if (!deletedRows || deletedRows.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          code: "DELETE_FAILED",
          message: "Task deletion failed - no rows were deleted",
        },
        { status: 500, headers: response.headers }
      )
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Task deleted successfully",
      },
      {
        headers: response.headers,
      }
    )
  } catch (error) {
    console.error("Delete task error:", error)
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

