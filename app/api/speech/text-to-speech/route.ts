import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClientForRouteHandler } from "@/lib/supabase/server.server"
import { submitTextToSpeechTask } from "@/lib/wavespeed"

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

    // Parse request body
    const body = await request.json()
    const { text, voice_id, speed, volume, pitch, emotion, english_normalization, enable_sync_mode } = body

    // Validate required fields
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { ok: false, code: "MISSING_TEXT", message: "Text is required" },
        { status: 400 }
      )
    }

    // Validate text length (max 50,000 characters based on MiniMax API)
    if (text.length > 50000) {
      return NextResponse.json(
        { ok: false, code: "TEXT_TOO_LONG", message: "Text exceeds maximum length of 50,000 characters" },
        { status: 400 }
      )
    }

    // Validate optional parameters
    if (speed !== undefined && typeof speed !== "number") {
      return NextResponse.json(
        { ok: false, code: "INVALID_SPEED", message: "Speed must be a number" },
        { status: 400 }
      )
    }

    if (volume !== undefined && typeof volume !== "number") {
      return NextResponse.json(
        { ok: false, code: "INVALID_VOLUME", message: "Volume must be a number" },
        { status: 400 }
      )
    }

    if (pitch !== undefined && typeof pitch !== "number") {
      return NextResponse.json(
        { ok: false, code: "INVALID_PITCH", message: "Pitch must be a number" },
        { status: 400 }
      )
    }

    const validEmotions = ["happy", "sad", "angry", "fearful", "disgusted", "surprised", "neutral"]
    if (emotion && !validEmotions.includes(emotion)) {
      return NextResponse.json(
        { ok: false, code: "INVALID_EMOTION", message: `Emotion must be one of: ${validEmotions.join(", ")}` },
        { status: 400 }
      )
    }

    // Submit task to WaveSpeedAI
    let result
    try {
      result = await submitTextToSpeechTask({
        text: text.trim(),
        voice_id,
        speed,
        volume,
        pitch,
        emotion,
        english_normalization,
        enable_sync_mode,
      })
    } catch (error) {
      console.error("Error submitting text-to-speech task to WaveSpeedAI:", error)
      return NextResponse.json(
        { 
          ok: false, 
          code: "WAVESPEED_ERROR", 
          message: error instanceof Error ? error.message : "Failed to submit task to WaveSpeedAI" 
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        ok: true,
        task_id: result.id,
        status: result.status,
        outputs: result.outputs,
        urls: result.urls,
      },
      {
        headers: response.headers,
      }
    )
  } catch (error) {
    console.error("Text-to-speech error:", error)
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

