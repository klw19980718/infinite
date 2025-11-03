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
}): Promise<{ id: string; status: string; urls: { get: string } }> {
  if (!WAVESPEED_API_KEY) {
    throw new Error("WAVESPEED_KEY is not configured")
  }

  const response = await fetch(`${WAVESPEED_API_URL}/api/v3/wavespeed-ai/infinitetalk`, {
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
 * Submit a video-to-video task to WaveSpeedAI
 */
export async function submitVideoToVideoTask(params: {
  video: string // URL
  audio: string // URL
  resolution?: "480p" | "720p"
  prompt?: string
  seed?: number
  mask_image?: string // URL
}): Promise<{ id: string; status: string; urls: { get: string } }> {
  if (!WAVESPEED_API_KEY) {
    throw new Error("WAVESPEED_KEY is not configured")
  }

  const response = await fetch(`${WAVESPEED_API_URL}/api/v3/wavespeed-ai/infinitetalk/video-to-video`, {
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
