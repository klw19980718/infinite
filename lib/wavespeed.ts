/**
 * WaveSpeedAI API helper functions
 */

const WAVESPEED_API_URL = "https://api.wavespeed.ai"
const WAVESPEED_API_KEY = process.env.WAVESPEED_KEY

if (!WAVESPEED_API_KEY) {
  console.warn("WAVESPEED_KEY environment variable is not configured")
}

/**
 * Upload a file to WaveSpeedAI media storage
 * @param file File to upload (Blob or File)
 * @returns Uploaded file URL
 */
export async function uploadFileToWaveSpeed(file: File | Blob): Promise<string> {
  if (!WAVESPEED_API_KEY) {
    throw new Error("WAVESPEED_KEY is not configured")
  }

  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${WAVESPEED_API_URL}/api/v3/media/upload/binary`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WAVESPEED_API_KEY}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WaveSpeedAI upload failed: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  
  if (data.code !== 200 || !data.data?.download_url) {
    throw new Error(`WaveSpeedAI upload failed: ${data.message || "Unknown error"}`)
  }

  return data.data.download_url
}

/**
 * Submit an image-to-video task to WaveSpeedAI
 */
export async function submitImageToVideoTask(params: {
  image: string // URL
  audio: string // URL
  resolution?: "480p" | "720p"
  prompt?: string
  seed?: number
  mask_image?: string // URL
  webhook?: string // URL
}): Promise<{ id: string; status: string; urls: { get: string } }> {
  if (!WAVESPEED_API_KEY) {
    throw new Error("WAVESPEED_KEY is not configured")
  }

  let url = `${WAVESPEED_API_URL}/api/v3/wavespeed-ai/infinitetalk`
  
  // Add webhook parameter if provided
  if (params.webhook) {
    url += `?webhook=${encodeURIComponent(params.webhook)}`
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${WAVESPEED_API_KEY}`,
    },
    body: JSON.stringify({
      image: params.image,
      audio: params.audio,
      resolution: params.resolution || "480p",
      prompt: params.prompt || "",
      seed: params.seed ?? -1,
      mask_image: params.mask_image,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WaveSpeedAI API error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  
  if (data.code !== 200) {
    throw new Error(`WaveSpeedAI API error: ${data.message || "Unknown error"}`)
  }

  return {
    id: data.data.id,
    status: data.data.status,
    urls: data.data.urls,
  }
}

/**
 * Submit an image-to-video fast task to WaveSpeedAI
 */
export async function submitImageToVideoFastTask(params: {
  image: string // URL
  audio: string // URL
  prompt?: string
  seed?: number
  mask_image?: string // URL
  webhook?: string // URL
}): Promise<{ id: string; status: string; urls: { get: string } }> {
  if (!WAVESPEED_API_KEY) {
    throw new Error("WAVESPEED_KEY is not configured")
  }

  let url = `${WAVESPEED_API_URL}/api/v3/wavespeed-ai/infinitetalk-fast`
  
  // Add webhook parameter if provided
  if (params.webhook) {
    url += `?webhook=${encodeURIComponent(params.webhook)}`
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${WAVESPEED_API_KEY}`,
    },
    body: JSON.stringify({
      image: params.image,
      audio: params.audio,
      prompt: params.prompt || "",
      seed: params.seed ?? -1,
      mask_image: params.mask_image,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WaveSpeedAI API error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  
  if (data.code !== 200) {
    throw new Error(`WaveSpeedAI API error: ${data.message || "Unknown error"}`)
  }

  return {
    id: data.data.id,
    status: data.data.status,
    urls: data.data.urls,
  }
}

/**
 * Submit a video-to-video task to WaveSpeedAI
 */
export async function submitVideoToVideoTask(params: {
  video: string // URL
  audio: string // URL
  resolution?: "480p" | "720p"
  prompt?: string
  seed?: number
  mask_image?: string // URL
  webhook?: string // URL
}): Promise<{ id: string; status: string; urls: { get: string } }> {
  if (!WAVESPEED_API_KEY) {
    throw new Error("WAVESPEED_KEY is not configured")
  }

  let url = `${WAVESPEED_API_URL}/api/v3/wavespeed-ai/infinitetalk/video-to-video`
  
  // Add webhook parameter if provided
  if (params.webhook) {
    url += `?webhook=${encodeURIComponent(params.webhook)}`
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${WAVESPEED_API_KEY}`,
    },
    body: JSON.stringify({
      video: params.video,
      audio: params.audio,
      resolution: params.resolution || "480p",
      prompt: params.prompt || "",
      seed: params.seed ?? -1,
      mask_image: params.mask_image,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WaveSpeedAI API error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  
  if (data.code !== 200) {
    throw new Error(`WaveSpeedAI API error: ${data.message || "Unknown error"}`)
  }

  return {
    id: data.data.id,
    status: data.data.status,
    urls: data.data.urls,
  }
}

/**
 * Submit a video-to-video fast task to WaveSpeedAI
 */
export async function submitVideoToVideoFastTask(params: {
  video: string // URL
  audio: string // URL
  prompt?: string
  seed?: number
  mask_image?: string // URL
  webhook?: string // URL
}): Promise<{ id: string; status: string; urls: { get: string } }> {
  if (!WAVESPEED_API_KEY) {
    throw new Error("WAVESPEED_KEY is not configured")
  }

  let url = `${WAVESPEED_API_URL}/api/v3/wavespeed-ai/infinitetalk-fast/video-to-video`
  
  // Add webhook parameter if provided
  if (params.webhook) {
    url += `?webhook=${encodeURIComponent(params.webhook)}`
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${WAVESPEED_API_KEY}`,
    },
    body: JSON.stringify({
      video: params.video,
      audio: params.audio,
      prompt: params.prompt || "",
      seed: params.seed ?? -1,
      mask_image: params.mask_image,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WaveSpeedAI API error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  
  if (data.code !== 200) {
    throw new Error(`WaveSpeedAI API error: ${data.message || "Unknown error"}`)
  }

  return {
    id: data.data.id,
    status: data.data.status,
    urls: data.data.urls,
  }
}

/**
 * Get task result from WaveSpeedAI
 */
export async function getTaskResult(requestId: string): Promise<{
  id: string
  status: string
  outputs: string[]
  error?: string
  created_at: string
}> {
  if (!WAVESPEED_API_KEY) {
    throw new Error("WAVESPEED_KEY is not configured")
  }

  const response = await fetch(`${WAVESPEED_API_URL}/api/v3/predictions/${requestId}/result`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${WAVESPEED_API_KEY}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WaveSpeedAI API error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  
  if (data.code !== 200) {
    throw new Error(`WaveSpeedAI API error: ${data.message || "Unknown error"}`)
  }

  return {
    id: data.data.id,
    status: data.data.status,
    outputs: data.data.outputs || [],
    error: data.data.error,
    created_at: data.data.created_at,
  }
}

/**
 * Submit a text-to-speech task using MiniMax Speech 02 Hd via WaveSpeedAI
 * Reference: https://wavespeed.ai/docs/docs-api/minimax/minimax-speech-02-hd
 * Official example: https://wavespeed.ai/docs/docs-api/minimax/minimax-speech-02-hd
 */
export async function submitTextToSpeechTask(params: {
  text: string // Required - Text to convert to speech
  voice_id?: string // Optional - Voice ID (may be required for some models)
  speed?: number // Optional - Speech speed (default: 1)
  volume?: number // Optional - Speech volume (default: 1)
  pitch?: number // Optional - Speech pitch (default: 0)
  emotion?: "happy" | "sad" | "angry" | "fearful" | "disgusted" | "surprised" | "neutral" // Optional - Emotion
  english_normalization?: boolean // Optional - Enable English normalization (default: false)
  enable_sync_mode?: boolean // Optional - Enable sync mode (default: false)
}): Promise<{ id: string; status: string; urls?: { get: string }; outputs?: string[] }> {
  if (!WAVESPEED_API_KEY) {
    throw new Error("WAVESPEED_KEY is not configured")
  }

  const requestBody: any = {
    text: params.text,
  }

  // Add optional parameters (matching official API format)
  if (params.voice_id) requestBody.voice_id = params.voice_id
  if (params.speed !== undefined) requestBody.speed = params.speed
  if (params.volume !== undefined) requestBody.volume = params.volume
  if (params.pitch !== undefined) requestBody.pitch = params.pitch
  if (params.emotion) requestBody.emotion = params.emotion
  if (params.english_normalization !== undefined) requestBody.english_normalization = params.english_normalization
  if (params.enable_sync_mode !== undefined) requestBody.enable_sync_mode = params.enable_sync_mode

  // Use the correct API endpoint from official example
  const response = await fetch(`${WAVESPEED_API_URL}/api/v3/minimax/speech-02-hd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${WAVESPEED_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WaveSpeedAI API error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  
  if (data.code !== 200) {
    throw new Error(`WaveSpeedAI API error: ${data.message || "Unknown error"}`)
  }

  return {
    id: data.data.id,
    status: data.data.status || "processing",
    urls: data.data.urls,
    outputs: data.data.outputs,
  }
}