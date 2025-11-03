import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClientForRouteHandler } from "@/lib/supabase/server.server"
import { uploadFileToWaveSpeed, submitImageToVideoTask } from "@/lib/wavespeed"

export async function POST(request: NextRequest) {
  try {
    // Create response object for cookie handling
    const response = NextResponse.next()
    
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

    // Parse form data
    const formData = await request.formData()
    const imageFile = formData.get("image") as File | null
    const audioFile = formData.get("audio") as File | null
    const resolution = (formData.get("resolution") as string) || "480p"
    const prompt = (formData.get("prompt") as string) || null
    const seed = formData.get("seed") ? parseInt(formData.get("seed") as string) : null
    const maskImageFile = formData.get("mask_image") as File | null

    // Validate required files
    if (!imageFile || !audioFile) {
      return NextResponse.json(
        { ok: false, code: "MISSING_FILES", message: "Image and audio files are required" },
        { status: 400 }
      )
    }

    // Validate resolution
    if (resolution !== "480p" && resolution !== "720p") {
      return NextResponse.json(
        { ok: false, code: "INVALID_RESOLUTION", message: "Resolution must be 480p or 720p" },
        { status: 400 }
      )
    }

    // Get audio duration (if available from file metadata)
    let audioDurationSeconds: number | null = null
    // Note: In a real implementation, you might need to analyze the audio file
    // to get its duration. For now, we'll use null and let the SQL function handle it.

    // Upload files to WaveSpeedAI
    const [imageUrl, audioUrl, maskImageUrl] = await Promise.all([
      uploadFileToWaveSpeed(imageFile),
      uploadFileToWaveSpeed(audioFile),
      maskImageFile ? uploadFileToWaveSpeed(maskImageFile) : Promise.resolve(null),
    ])

    // Create task and deduct credits (this will validate credits and create the task record)
    const { data: taskId, error: taskError } = await supabase.rpc("create_video_task", {
      p_user_id: user.id,
      p_resolution: resolution,
      p_input_image_url: imageUrl,
      p_input_audio_url: audioUrl,
      p_audio_duration_seconds: audioDurationSeconds,
      p_prompt: prompt,
      p_seed: seed ?? -1,
    })

    if (taskError) {
      console.error("Error creating video task:", taskError)
      return NextResponse.json(
        { ok: false, code: "TASK_CREATION_FAILED", message: taskError.message },
        { status: 500 }
      )
    }

    if (!taskId) {
      return NextResponse.json(
        { ok: false, code: "TASK_CREATION_FAILED", message: "Failed to create task" },
        { status: 500 }
      )
    }

    // Submit task to WaveSpeedAI
    let wavespeedTaskId: string
    try {
      const result = await submitImageToVideoTask({
        image: imageUrl,
        audio: audioUrl,
        resolution: resolution as "480p" | "720p",
        prompt: prompt || undefined,
        seed: seed ?? undefined,
        mask_image: maskImageUrl || undefined,
      })
      wavespeedTaskId = result.id
    } catch (error) {
      console.error("Error submitting task to WaveSpeedAI:", error)
      // Update task status to failed
      await supabase.rpc("update_video_task", {
        p_task_id: taskId,
        p_status: "failed",
        p_error_message: error instanceof Error ? error.message : "Failed to submit task to WaveSpeedAI",
      })
      return NextResponse.json(
        { ok: false, code: "WAVESPEED_ERROR", message: "Failed to submit task to WaveSpeedAI" },
        { status: 500 }
      )
    }

    // Update task with WaveSpeedAI task ID and status
    await supabase.rpc("update_video_task", {
      p_task_id: taskId,
      p_status: "processing",
      p_wavespeed_task_id: wavespeedTaskId,
    })

    return NextResponse.json(
      {
        ok: true,
        task_id: taskId,
        wavespeed_task_id: wavespeedTaskId,
        status: "processing",
      },
      {
        headers: response.headers,
      }
    )
  } catch (error) {
    console.error("Image-to-video error:", error)
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
