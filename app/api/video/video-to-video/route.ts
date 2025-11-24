import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClientForRouteHandler } from "@/lib/supabase/server.server"
import { uploadFileToWaveSpeed, submitVideoToVideoTask, submitVideoToVideoFastTask } from "@/lib/wavespeed"

// Use Node.js runtime for Supabase compatibility
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
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

    // Parse form data
    const formData = await request.formData()
    const videoFile = formData.get("video") as File | null
    const audioFile = formData.get("audio") as File | null
    const resolution = (formData.get("resolution") as string) || "480p"
    const prompt = (formData.get("prompt") as string) || null
    const seed = formData.get("seed") ? parseInt(formData.get("seed") as string) : null
    const maskImageFile = formData.get("mask_image") as File | null

    // Validate required files
    if (!videoFile || !audioFile) {
      return NextResponse.json(
        { ok: false, code: "MISSING_FILES", message: "Video and audio files are required" },
        { status: 400 }
      )
    }

    // Validate resolution
    if (resolution !== "fast" && resolution !== "480p" && resolution !== "720p") {
      return NextResponse.json(
        { ok: false, code: "INVALID_RESOLUTION", message: "Resolution must be fast, 480p, or 720p" },
        { status: 400 }
      )
    }

    // Get audio duration from form data (calculated on frontend)
    const audioDurationParam = formData.get("audio_duration")
    let audioDurationSeconds: number | null = null
    if (audioDurationParam) {
      const duration = parseInt(audioDurationParam as string, 10)
      if (!isNaN(duration) && duration > 0) {
        audioDurationSeconds = duration
      }
    }

    // Calculate required credits BEFORE uploading files
    // Fast: 0.5 credit/s (rounded up), min 3 credits
    // 480p: 1 credit/s, min 5 credits
    // 720p: 2 credits/s, min 10 credits
    const creditsPerSecond = resolution === "fast" ? 0.5 : resolution === "480p" ? 1 : 2
    const minCredits = resolution === "fast" ? 3 : resolution === "480p" ? 5 : 10
    const maxDuration = 600 // 10 minutes
    const actualDuration = audioDurationSeconds ? Math.min(audioDurationSeconds, maxDuration) : 0
    const calculatedCredits = actualDuration * creditsPerSecond
    const requiredCredits = Math.max(minCredits, resolution === "fast" ? Math.ceil(calculatedCredits) : calculatedCredits)

    // Check user credits BEFORE uploading files
    const { data: userInfo, error: userInfoError } = await supabase
      .from("user_info")
      .select("credits")
      .eq("user_id", user.id)
      .single()

    if (userInfoError || !userInfo) {
      // User info might not exist yet, treat as 0 credits
      const userCredits = 0
      if (userCredits < requiredCredits) {
        return NextResponse.json(
          {
            ok: false,
            code: "INSUFFICIENT_CREDITS",
            message: `Insufficient credits. Required: ${requiredCredits}, Available: ${userCredits}`,
            required_credits: requiredCredits,
            available_credits: userCredits,
          },
          { status: 402 } // 402 Payment Required
        )
      }
    } else {
      const userCredits = userInfo.credits || 0
      if (userCredits < requiredCredits) {
        return NextResponse.json(
          {
            ok: false,
            code: "INSUFFICIENT_CREDITS",
            message: `Insufficient credits. Required: ${requiredCredits}, Available: ${userCredits}`,
            required_credits: requiredCredits,
            available_credits: userCredits,
          },
          { status: 402 } // 402 Payment Required
        )
      }
    }

    // Upload files to WaveSpeedAI (only after credits check passes)
    const [videoUrl, audioUrl, maskImageUrl] = await Promise.all([
      uploadFileToWaveSpeed(videoFile),
      uploadFileToWaveSpeed(audioFile),
      maskImageFile ? uploadFileToWaveSpeed(maskImageFile) : Promise.resolve(null),
    ])

    // Create task and deduct credits (this will validate credits again and create the task record)
    // For video-to-video, we still use the same create_video_task function
    // but store video URL in input_image_url field (we might need to adjust this later)
    const { data: taskId, error: taskError } = await supabase.rpc("create_video_task", {
      p_user_id: user.id,
      p_resolution: resolution,
      p_input_image_url: videoUrl, // Using image field for video URL temporarily
      p_input_audio_url: audioUrl,
      p_audio_duration_seconds: audioDurationSeconds,
      p_prompt: prompt,
      p_seed: seed ?? -1,
    })

    if (taskError) {
      console.error("Error creating video task:", taskError)
      // Check if error is related to insufficient credits
      const errorMessage = taskError.message || ""
      if (errorMessage.toLowerCase().includes("insufficient") || errorMessage.toLowerCase().includes("credit")) {
        return NextResponse.json(
          {
            ok: false,
            code: "INSUFFICIENT_CREDITS",
            message: taskError.message,
          },
          { status: 402 } // 402 Payment Required
        )
      }
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
      // Use NGROK_DEV_URL for local development, fallback to NEXT_PUBLIC_SITE_URL
      const baseUrl = process.env.NGROK_DEV_URL || process.env.NEXT_PUBLIC_SITE_URL
      if (!baseUrl) {
        console.error("Missing NGROK_DEV_URL or NEXT_PUBLIC_SITE_URL for webhook URL")
        throw new Error("Webhook URL configuration missing")
      }
      const webhookUrl = `${baseUrl}/api/video/webhook?task_id=${taskId}`
      console.log("[Video-to-Video] Webhook URL:", webhookUrl)
      
      // Use fast API if resolution is "fast", otherwise use regular API
      const result = resolution === "fast"
        ? await submitVideoToVideoFastTask({
            video: videoUrl,
            audio: audioUrl,
            prompt: prompt || undefined,
            seed: seed ?? undefined,
            mask_image: maskImageUrl || undefined,
            webhook: webhookUrl,
          })
        : await submitVideoToVideoTask({
            video: videoUrl,
            audio: audioUrl,
            resolution: resolution as "480p" | "720p",
            prompt: prompt || undefined,
            seed: seed ?? undefined,
            mask_image: maskImageUrl || undefined,
            webhook: webhookUrl,
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
    console.error("Video-to-video error:", error)
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
