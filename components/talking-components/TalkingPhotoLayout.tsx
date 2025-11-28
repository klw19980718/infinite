"use client"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiImage, FiMic, FiX, FiChevronRight, FiCheck, FiDollarSign, FiSearch, FiSettings, FiLoader, FiClock, FiMinus, FiPlus } from "react-icons/fi"
import { toast } from "sonner"
import { AvatarDialog } from "./AvatarDialog"
import { RecordAudioDialog } from "./RecordAudioDialog"
import { VoiceSelectDialog } from "./VoiceSelectDialog"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { InputTextTab } from "./InputTextTab"
import { UploadAudioTab } from "./UploadAudioTab"
import { RecordAudioTab } from "./RecordAudioTab"
import LoginDialog from "@/components/auth/LoginDialog"
import { getSupabaseClient } from "@/lib/supabase"

// Local helper for formatting pause seconds (used when inserting pause elements)
const formatPauseSeconds = (seconds: number): string => {
  return parseFloat(seconds.toFixed(1)).toString()
}

interface Avatar {
  url: string
  category: string
  filename: string
  aspectRatio: string | null
}

interface TalkingPhotoLayoutProps {
  onTaskCreated?: (taskId: string) => void
}

export const TalkingPhotoLayout = ({ onTaskCreated }: TalkingPhotoLayoutProps) => {
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9">("9:16")
  const [audioTab, setAudioTab] = useState<"input" | "upload" | "record">("input")
  const [inputText, setInputText] = useState("")
  const [voiceId, setVoiceId] = useState("English_Trustworth_Man")
  const [emotion, setEmotion] = useState("Neutral")
  const [speed, setSpeed] = useState([0.8])
  const [volume, setVolume] = useState([5])
  const [pitch, setPitch] = useState([0])
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false)
  const [selectedVoiceName, setSelectedVoiceName] = useState("Trustworthy Man")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFileName, setImageFileName] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [audioFileName, setAudioFileName] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioDuration, setAudioDuration] = useState<number | null>(null)
  const [resolution, setResolution] = useState<"fast" | "480p" | "720p">("fast")
  const [estimatedCredits, setEstimatedCredits] = useState<number>(0)
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [recordDialogOpen, setRecordDialogOpen] = useState(false)
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null)
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null)
  const [recordedDuration, setRecordedDuration] = useState<number>(0)
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false)
  const [playbackPosition, setPlaybackPosition] = useState(0)
  const [isPlayingUploaded, setIsPlayingUploaded] = useState(false)
  const [uploadedPlaybackPosition, setUploadedPlaybackPosition] = useState(0)
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null)
  const recordedAudioRef = useRef<HTMLAudioElement | null>(null)
  const uploadedAudioRef = useRef<HTMLAudioElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const uploadedAnimationFrameRef = useRef<number | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const audioInputRef = useRef<HTMLInputElement | null>(null)
  
  // TTS (Text-to-Speech) states
  const [ttsLoading, setTtsLoading] = useState(false)
  const [ttsTaskId, setTtsTaskId] = useState<string | null>(null)
  const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null)
  const [ttsAudioBlob, setTtsAudioBlob] = useState<Blob | null>(null)
  const [ttsAudioDuration, setTtsAudioDuration] = useState<number>(0)
  const [isPlayingTts, setIsPlayingTts] = useState(false)
  const [ttsPlaybackPosition, setTtsPlaybackPosition] = useState(0)
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null)
  const ttsAnimationFrameRef = useRef<number | null>(null)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Pause control states
  const [pauseSeconds, setPauseSeconds] = useState(0.5)
  const [pausePopoverOpen, setPausePopoverOpen] = useState(false)
  const editableDivRef = useRef<HTMLDivElement | null>(null)

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false)

  // TTS usage state
  const [ttsUsage, setTtsUsage] = useState<{
    characters_used: number
    remaining_free: number
    daily_limit: number
  } | null>(null)
  const [ttsUsageLoading, setTtsUsageLoading] = useState(true)

  // Login dialog state
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)


  // Handle image file upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error(`Image size exceeds maximum of 10MB`)
      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }
      return
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, and WebP formats are supported")
      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }
      return
    }

    setImageFile(file)
    setImageFileName(file.name)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleClearImage = () => {
    setImagePreview(null)
    setImageFileName(null)
    setImageFile(null)
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  // Handle audio file upload
  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    const allowedTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/wave",
      "audio/x-wav",
      "audio/mp4",
      "audio/m4a",
      "audio/ogg",
      "audio/flac",
      "audio/x-flac",
    ]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only MP3, WAV, M4A, OGG, and FLAC formats are supported")
      if (audioInputRef.current) {
        audioInputRef.current.value = ""
      }
      return
    }

    setAudioFile(file)
    setAudioFileName(file.name)

    const audio = new Audio()
    const url = URL.createObjectURL(file)
    audio.src = url
    audio.addEventListener("loadedmetadata", () => {
      const duration = Math.ceil(audio.duration)
      const maxDuration = 600 // 10 minutes
      if (duration > maxDuration) {
        toast.error(`Audio duration exceeds maximum of ${maxDuration}s (${Math.floor(maxDuration / 60)} minutes)`)
        setAudioFile(null)
        setAudioFileName(null)
        setAudioDuration(null)
        URL.revokeObjectURL(url)
        return
      }
      setAudioDuration(duration)
      URL.revokeObjectURL(url)
    })
    audio.addEventListener("error", () => {
      URL.revokeObjectURL(url)
      setAudioDuration(null)
    })
  }

  const handleClearAudio = () => {
    setAudioFile(null)
    setAudioFileName(null)
    setAudioDuration(null)
    if (audioInputRef.current) {
      audioInputRef.current.value = ""
    }
  }

  // Calculate credits based on duration and resolution
  const calculateCredits = useCallback((duration: number | null, res: "fast" | "480p" | "720p"): number => {
    if (!duration) {
      // Minimum charge: 3 credits for fast, 5 credits for 480p, 10 credits for 720p
      return res === "fast" ? 3 : res === "480p" ? 5 : 10
    }

    // Fast: 0.5 credit/s, 480p: 1 credit/s, 720p: 2 credits/s
    const creditsPerSecond = res === "fast" ? 0.5 : res === "480p" ? 1 : 2
    const minCredits = res === "fast" ? 3 : res === "480p" ? 5 : 10
    const maxDuration = 600 // 10 minutes
    const actualDuration = Math.min(duration, maxDuration)

    // For fast mode, round up to nearest integer
    const calculatedCredits = actualDuration * creditsPerSecond
    const roundedCredits = res === "fast" ? Math.ceil(calculatedCredits) : calculatedCredits

    return Math.max(minCredits, roundedCredits)
  }, [])

  // Update estimated credits when resolution or audio duration changes
  useEffect(() => {
    const credits = calculateCredits(audioDuration, resolution)
    setEstimatedCredits(credits)
  }, [audioDuration, resolution, calculateCredits])

  // Check if user is logged in
  const checkUserLoggedIn = useCallback(async (): Promise<boolean> => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      return !!session
    } catch (error) {
      console.error("Error checking user session:", error)
      return false
    }
  }, [])

  // Load avatars on mount
  useEffect(() => {
    const loadAvatars = async () => {
      try {
        const response = await fetch("/image-to-video/avatars.json")
        const data = await response.json()
        setAvatars(data)
      } catch (error) {
        console.error("Failed to load avatars:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAvatars()
  }, [])

  // Load TTS usage on mount and when audioTab changes to "input"
  useEffect(() => {
    const fetchTtsUsage = async () => {
      if (audioTab !== "input") return

      // Check if user is logged in before fetching TTS usage
      const isLoggedIn = await checkUserLoggedIn()
      if (!isLoggedIn) {
        setTtsUsageLoading(false)
        return
      }

      setTtsUsageLoading(true)
      try {
        const response = await fetch("/api/speech/usage", {
          credentials: "include",
        })
        const data = await response.json()

        if (data.ok && data.usage) {
          setTtsUsage(data.usage)
        } else {
          // Only log error if it's not an authentication error
          if (data.message !== "User not authenticated") {
            console.error("Failed to fetch TTS usage:", data.message)
          }
        }
      } catch (error) {
        console.error("Error fetching TTS usage:", error)
      } finally {
        setTtsUsageLoading(false)
      }
    }

    fetchTtsUsage()
  }, [audioTab, checkUserLoggedIn])

  // Get default avatars to display - 3 from each category matching the aspect ratio
  const defaultAvatars = useMemo(() => {
    if (avatars.length === 0) {
      return []
    }
    
    const categories = ['business', 'education', 'health', 'lifestyle', 'news', 'outdoors', 'studio']
    const result: Avatar[] = []
    
    // For each category, get up to 3 avatars matching the selected aspect ratio
    categories.forEach(category => {
      const categoryAvatars = avatars
        .filter(avatar => avatar.category === category && avatar.aspectRatio === aspectRatio)
        .slice(0, 3)
      result.push(...categoryAvatars)
    })
    
    return result
  }, [avatars, aspectRatio])

  const handleAvatarClick = (avatarUrl: string) => {
    // For built-in avatars we only need the URL for preview.
    // We convert to File only when submitting the form.
    setImagePreview(avatarUrl)
    setImageFile(null)
    const nameFromUrl = avatarUrl.split("/").pop() || "avatar"
    setImageFileName(nameFromUrl)
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  const handleDialogAvatarSelect = (url: string) => {
    handleAvatarClick(url)
  }

  // Update playback position for recorded audio
  useEffect(() => {
    if (isPlayingRecorded && recordedAudioRef.current) {
      const updatePosition = () => {
        if (recordedAudioRef.current) {
          setPlaybackPosition(recordedAudioRef.current.currentTime)
          animationFrameRef.current = requestAnimationFrame(updatePosition)
        }
      }
      animationFrameRef.current = requestAnimationFrame(updatePosition)
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlayingRecorded])

  // Update playback position for uploaded audio
  useEffect(() => {
    if (isPlayingUploaded && uploadedAudioRef.current) {
      const updatePosition = () => {
        if (uploadedAudioRef.current) {
          setUploadedPlaybackPosition(uploadedAudioRef.current.currentTime)
          uploadedAnimationFrameRef.current = requestAnimationFrame(updatePosition)
        }
      }
      uploadedAnimationFrameRef.current = requestAnimationFrame(updatePosition)
    } else if (uploadedAnimationFrameRef.current) {
      cancelAnimationFrame(uploadedAnimationFrameRef.current)
      uploadedAnimationFrameRef.current = null
    }

    return () => {
      if (uploadedAnimationFrameRef.current) {
        cancelAnimationFrame(uploadedAnimationFrameRef.current)
      }
    }
  }, [isPlayingUploaded])

  // Create audio URL when audio file changes
  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile)
      setUploadedAudioUrl(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    } else {
      setUploadedAudioUrl(null)
      if (uploadedAudioRef.current) {
        uploadedAudioRef.current.pause()
        uploadedAudioRef.current = null
      }
      setIsPlayingUploaded(false)
      setUploadedPlaybackPosition(0)
    }
  }, [audioFile])

  // Update playback position for TTS audio
  useEffect(() => {
    if (isPlayingTts && ttsAudioRef.current) {
      const updatePosition = () => {
        if (ttsAudioRef.current) {
          setTtsPlaybackPosition(ttsAudioRef.current.currentTime)
          ttsAnimationFrameRef.current = requestAnimationFrame(updatePosition)
        }
      }
      ttsAnimationFrameRef.current = requestAnimationFrame(updatePosition)
    } else if (ttsAnimationFrameRef.current) {
      cancelAnimationFrame(ttsAnimationFrameRef.current)
      ttsAnimationFrameRef.current = null
    }

    return () => {
      if (ttsAnimationFrameRef.current) {
        cancelAnimationFrame(ttsAnimationFrameRef.current)
      }
    }
  }, [isPlayingTts])

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
      }
    }
  }, [])

  // Extract text from editable div, converting pause elements to API format
  const getTextFromEditableDiv = (): string => {
    if (!editableDivRef.current) return inputText
    
    // Get all child nodes in order
    const nodes = Array.from(editableDivRef.current.childNodes)
    let text = ""
    
    for (const node of nodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        // Regular text node
        text += node.textContent || ""
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement
        if (element.dataset.pause) {
          // Pause element - convert to API format
          text += `<#${element.dataset.pause}#>`
        } else {
          // Other elements - recursively process their text content
          // But skip any pause elements inside
          const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            {
              acceptNode: (n) => {
                // Skip pause elements and their children
                if (n.nodeType === Node.ELEMENT_NODE) {
                  const el = n as HTMLElement
                  if (el.dataset.pause) {
                    return NodeFilter.FILTER_REJECT
                  }
                }
                // Skip text nodes inside pause elements
                if (n.nodeType === Node.TEXT_NODE) {
                  const parent = n.parentElement
                  if (parent && parent.dataset.pause) {
                    return NodeFilter.FILTER_REJECT
                  }
                }
                return NodeFilter.FILTER_ACCEPT
              }
            }
          )
          
          let subNode
          while ((subNode = walker.nextNode())) {
            if (subNode.nodeType === Node.TEXT_NODE) {
              text += subNode.textContent || ""
            } else if (subNode.nodeType === Node.ELEMENT_NODE) {
              const subElement = subNode as HTMLElement
              if (subElement.dataset.pause) {
                text += `<#${subElement.dataset.pause}#>`
              }
            }
          }
        }
      }
    }
    
    return text
  }

  // Handle deleting pause element
  const handleDeletePause = (pauseElement: HTMLElement) => {
    if (!editableDivRef.current) return
    
    pauseElement.remove()
    
    // Update inputText state
    const newText = getTextFromEditableDiv()
    setInputText(newText)
    
    // Focus back to editable div
    editableDivRef.current.focus()
  }

  // Handle inserting pause at cursor position
  const handleInsertPause = () => {
    if (!editableDivRef.current) return

    const selection = window.getSelection()
    if (!selection) return

    if (selection.rangeCount === 0) {
      // If no selection, insert at the end
      const range = document.createRange()
      range.selectNodeContents(editableDivRef.current)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    const range = selection.getRangeAt(0)
    
    // Format pause seconds to avoid precision issues
    const formattedSeconds = formatPauseSeconds(pauseSeconds)
    
    // Create pause element
    const pauseElement = document.createElement("span")
    pauseElement.className = "inline-flex items-center gap-1.5 px-2 py-1 rounded bg-accent/20 text-accent text-xs font-medium my-0.5"
    pauseElement.dataset.pause = formattedSeconds
    pauseElement.contentEditable = "false"
    
    // Clock icon - larger
    const clockIcon = document.createElement("span")
    clockIcon.innerHTML = "⏱"
    clockIcon.className = "inline-block text-base leading-none"
    
    // Text node with formatted seconds
    const textNode = document.createTextNode(`${formattedSeconds}s`)
    
    // Delete button
    const deleteButton = document.createElement("button")
    deleteButton.type = "button"
    deleteButton.className = "ml-1 h-4 w-4 rounded-full bg-accent/30 hover:bg-accent/50 flex items-center justify-center transition-colors flex-shrink-0"
    deleteButton.innerHTML = "×"
    deleteButton.style.fontSize = "14px"
    deleteButton.style.lineHeight = "1"
    deleteButton.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      handleDeletePause(pauseElement)
    }
    
    pauseElement.appendChild(clockIcon)
    pauseElement.appendChild(textNode)
    pauseElement.appendChild(deleteButton)
    
    // Insert pause element
    range.deleteContents()
    range.insertNode(pauseElement)
    
    // Move cursor after the pause element
    range.setStartAfter(pauseElement)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
    
    // Update inputText state
    const newText = getTextFromEditableDiv()
    setInputText(newText)
    
    // Close popover
    setPausePopoverOpen(false)
    
    // Focus back to editable div
    editableDivRef.current.focus()
  }

  // Handle text change in editable div
  const handleEditableDivChange = () => {
    if (!editableDivRef.current) return
    const newText = getTextFromEditableDiv()
    setInputText(newText)
  }

  // Generate TTS audio and return the audio URL
  const generateTTSAudio = async (): Promise<string> => {
    const textToSend = editableDivRef.current ? getTextFromEditableDiv() : inputText.trim()
    
    if (!textToSend.trim()) {
      throw new Error("Please enter some text")
    }

    // Map emotion to API format
    const emotionMap: Record<string, string> = {
      "Neutral": "neutral",
      "Happy": "happy",
      "Sad": "sad",
      "Angry": "angry",
      "Fearful": "fearful",
      "Disgusted": "disgusted",
      "Surprised": "surprised",
    }

    // Call TTS API
    const response = await fetch("/api/speech/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textToSend.trim(),
        voice_id: voiceId || undefined,
        speed: speed[0] || 1,
        volume: volume[0] || 1,
        pitch: pitch[0] || 0,
        emotion: emotionMap[emotion] || "neutral",
        english_normalization: false,
        enable_sync_mode: false,
      }),
    })

    const data = await response.json()

    if (!data.ok) {
      throw new Error(data.message || "Failed to create TTS task")
    }

    const wavespeedTaskId = data.task_id

    // Poll for result
    return new Promise((resolve, reject) => {
      const pollInterval = setInterval(async () => {
        try {
          const resultResponse = await fetch(`/api/speech/result?task_id=${wavespeedTaskId}`)
          const resultData = await resultResponse.json()

          if (!resultData.ok) {
            if (resultData.code === "WAVESPEED_ERROR" || resultData.code === "INTERNAL_ERROR") {
              return // Continue polling
            }
            clearInterval(pollInterval)
            reject(new Error(resultData.message || "Failed to get task result"))
            return
          }

          if (resultData.status === "completed" && resultData.outputs && resultData.outputs.length > 0) {
            clearInterval(pollInterval)
            resolve(resultData.outputs[0]) // Return audio URL
          } else if (resultData.status === "failed") {
            clearInterval(pollInterval)
            reject(new Error(resultData.error || "TTS task failed"))
          }
        } catch (error) {
          // Continue polling on network errors
          if (error instanceof Error && (error.message.includes("TTS task failed") || error.message.includes("Failed to get task result"))) {
            clearInterval(pollInterval)
            reject(error)
          }
        }
      }, 2000)

      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(pollInterval)
        reject(new Error("TTS task timeout"))
      }, 5 * 60 * 1000)
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check if user is logged in
    const isLoggedIn = await checkUserLoggedIn()
    if (!isLoggedIn) {
      setLoginDialogOpen(true)
      return
    }

    if (!imageFile && !imagePreview) {
      toast.error("Please upload an image")
      return
    }

    setIsSubmitting(true)

    try {
      let finalAudioFile: File | null = audioFile
      let finalAudioUrl: string | null = null
      let finalAudioDuration: number | null = audioDuration

      // Only TTS audio can have URL (HTTP URL), upload and record audio only have File
      // If tab is "input" and no audio file, check if we have TTS audio or need to generate
      if (audioTab === "input" && !audioFile) {
        // Check if we have input text
        const textToSend = editableDivRef.current ? getTextFromEditableDiv() : inputText.trim()
        if (!textToSend.trim()) {
          toast.error("Please enter some text")
          setIsSubmitting(false)
          return
        }

        // If TTS audio already exists, use it
        if (ttsAudioBlob && ttsAudioUrl) {
          // TTS audio exists - check if it's HTTP URL or blob URL
          if (ttsAudioUrl.startsWith("http")) {
            // HTTP URL - will download later
            finalAudioUrl = ttsAudioUrl
          } else {
            // Blob URL - convert to File directly
            finalAudioFile = new File([ttsAudioBlob], `tts-${Date.now()}.mp3`, { type: ttsAudioBlob.type })
          }
          finalAudioDuration = ttsAudioDuration > 0 ? ttsAudioDuration : audioDuration
        } else {
          // Generate new TTS audio (returns HTTP URL)
          try {
            setTtsLoading(true)
            // toast.loading("Generating audio from text...", { id: "tts-generating" })
            const audioUrl = await generateTTSAudio()
            finalAudioUrl = audioUrl
            
            // Fetch audio to get duration and blob
            const audioResponse = await fetch(audioUrl)
            const audioBlob = await audioResponse.blob()
            const audio = new Audio(audioUrl)
            
            await new Promise((resolve) => {
              audio.addEventListener("loadedmetadata", () => {
                finalAudioDuration = audio.duration
                resolve(null)
              })
              audio.addEventListener("error", resolve)
            })

            // Update TTS states to change UI to show audio result
            setTtsAudioUrl(audioUrl)
            setTtsAudioBlob(audioBlob)
            setTtsAudioDuration(finalAudioDuration || 0)
            setTtsLoading(false)

            // Refresh TTS usage after generation
            try {
              const usageResponse = await fetch("/api/speech/usage", {
                credentials: "include",
              })
              const usageData = await usageResponse.json()
              if (usageData.ok && usageData.usage) {
                setTtsUsage(usageData.usage)
              }
            } catch (error) {
              console.error("Error refreshing TTS usage:", error)
            }

            // toast.success("Audio generated successfully", { id: "tts-generating" })
          } catch (error) {
            setTtsLoading(false)
            toast.error(error instanceof Error ? error.message : "Failed to generate audio", { id: "tts-generating" })
            setIsSubmitting(false)
            return
          }
        }
      }

      // For record tab, use recordedAudioBlob instead of audioFile
      if (audioTab === "record") {
        if (!recordedAudioBlob) {
          toast.error("Please record audio")
          setIsSubmitting(false)
          return
        }
        // Convert recorded blob to File for submission
        finalAudioFile = new File([recordedAudioBlob], `recording-${Date.now()}.webm`, { type: recordedAudioBlob.type })
        finalAudioDuration = recordedDuration
      }

      // For non-input tabs (upload/record), only check audioFile (no URL)
      if (audioTab !== "input" && !finalAudioFile) {
        toast.error("Please provide audio")
        setIsSubmitting(false)
        return
      }

      // Handle audio - only TTS audio can have HTTP URL, upload/record audio are already File objects
      let finalAudioFileForSubmit: File
      if (finalAudioFile) {
        // Upload/record audio or TTS blob URL - already a File
        finalAudioFileForSubmit = finalAudioFile
      } else if (finalAudioUrl) {
        // TTS HTTP URL - download and convert to File
        try {
          // toast.loading("Downloading audio...", { id: "download-audio" })
          const audioResponse = await fetch(finalAudioUrl)
          if (!audioResponse.ok) {
            throw new Error("Failed to download audio")
          }
          const audioBlob = await audioResponse.blob()
          const audioFileName = finalAudioUrl.split("/").pop()?.split("?")[0] || "tts-audio.mp3"
          finalAudioFileForSubmit = new File([audioBlob], audioFileName, { type: audioBlob.type })
          // toast.success("Audio downloaded", { id: "download-audio" })
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Failed to download audio", { id: "download-audio" })
          setIsSubmitting(false)
          return
        }
      } else {
        toast.error("Invalid audio")
        setIsSubmitting(false)
        return
      }

      // Create form data with File objects
      let finalImageFile: File = imageFile!
      
      // Handle image - convert URL to File if needed
      if (!imageFile && imagePreview && imagePreview.startsWith("http")) {
        try {
          // toast.loading("Downloading image...", { id: "download-image" })
          const imageResponse = await fetch(imagePreview)
          if (!imageResponse.ok) {
            throw new Error("Failed to download image")
          }
          const imageBlob = await imageResponse.blob()
          const imageFileName = imagePreview.split("/").pop() || "image.jpg"
          finalImageFile = new File([imageBlob], imageFileName, { type: imageBlob.type })
          // toast.success("Image downloaded", { id: "download-image" })
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Failed to download image", { id: "download-image" })
          setIsSubmitting(false)
          return
        }
      } else if (!imageFile) {
        toast.error("Invalid image")
        setIsSubmitting(false)
        return
      }

      const formData = new FormData()
      formData.append("image", finalImageFile)
      formData.append("audio", finalAudioFileForSubmit)
      formData.append("resolution", resolution)

      const response = await fetch("/api/video/image-to-video", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.message || "Failed to create video task")
      }

      if (onTaskCreated) {
        onTaskCreated(data.task_id)
      }

      // toast.success("Video task created successfully") - handled by parent
    } catch (error) {
      console.error("Error submitting task:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit task")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle TTS task creation and polling
  const handleTextToSpeech = async () => {
    // Check if user is logged in
    const isLoggedIn = await checkUserLoggedIn()
    if (!isLoggedIn) {
      setLoginDialogOpen(true)
      return
    }

    const textToSend = editableDivRef.current ? getTextFromEditableDiv() : inputText.trim()
    
    if (!textToSend.trim()) {
      toast.error("Please enter some text")
      return
    }

    setTtsLoading(true)
    setTtsTaskId(null)
    setTtsAudioUrl(null)
    setTtsAudioBlob(null)
    setTtsAudioDuration(0)

    try {
      // Map emotion to API format (matching allowed values: happy, sad, angry, fearful, disgusted, surprised, neutral)
      const emotionMap: Record<string, string> = {
        "Neutral": "neutral",
        "Happy": "happy",
        "Sad": "sad",
        "Angry": "angry",
        "Fearful": "fearful",
        "Disgusted": "disgusted",
        "Surprised": "surprised",
      }

      // Call TTS API (matching official API format)
      const response = await fetch("/api/speech/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textToSend.trim(),
          voice_id: voiceId || undefined,
          speed: speed[0] || 1,
          volume: volume[0] || 1,
          pitch: pitch[0] || 0,
          emotion: emotionMap[emotion] || "neutral",
          english_normalization: false,
          enable_sync_mode: false,
        }),
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.message || "Failed to create TTS task")
      }

      // Update TTS usage from API response
      if (data.tts_usage) {
        setTtsUsage({
          characters_used: data.tts_usage.total_used_today,
          remaining_free: data.tts_usage.remaining_free,
          daily_limit: 3000, // Daily free limit
        })
      }

      setTtsTaskId(data.task_id)
      const wavespeedTaskId = data.task_id // This is the WaveSpeedAI task ID

      // Start polling for result using TTS result API
      // Keep ttsLoading true until audio is ready
      const pollResult = async () => {
        try {
          // Use TTS result API
          const resultResponse = await fetch(`/api/speech/result?task_id=${wavespeedTaskId}`)
          const resultData = await resultResponse.json()

          if (!resultData.ok) {
            // If still processing (404 or other non-fatal errors), continue polling
            if (resultData.code === "WAVESPEED_ERROR" || resultData.code === "INTERNAL_ERROR") {
              // Still processing, continue polling
              return
            }
            throw new Error(resultData.message || "Failed to get task result")
          }

          if (resultData.status === "completed" && resultData.outputs && resultData.outputs.length > 0) {
            // Task completed, fetch audio
            const audioUrl = resultData.outputs[0]
            
            // Fetch audio as blob
            const audioResponse = await fetch(audioUrl)
            const audioBlob = await audioResponse.blob()
            
            // Create object URL
            const url = URL.createObjectURL(audioBlob)
            setTtsAudioUrl(url)
            setTtsAudioBlob(audioBlob)

            // Get audio duration
            const audio = new Audio(url)
            audio.addEventListener("loadedmetadata", () => {
              setTtsAudioDuration(audio.duration)
            })

            // Convert blob to file and trigger audio change
            const file = new File([audioBlob], `tts-${Date.now()}.mp3`, { type: audioBlob.type })
            // Use TTS audio as the current audio file for upload/submit logic
            setAudioFile(file)
            setAudioFileName(file.name)

            setTtsLoading(false)
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current)
              pollingIntervalRef.current = null
            }
          } else if (resultData.status === "failed") {
            throw new Error(resultData.error || "TTS task failed")
          }
          // If still processing, continue polling
        } catch (error) {
          console.error("Error polling TTS result:", error)
          // Don't stop polling on network errors, only on actual failures
          if (error instanceof Error && (error.message.includes("TTS task failed") || error.message.includes("Failed to get task result"))) {
            setTtsLoading(false)
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current)
              pollingIntervalRef.current = null
            }
            toast.error(error.message)
          }
        }
      }

      // Poll every 2 seconds
      pollingIntervalRef.current = setInterval(pollResult, 2000)
      // Initial poll
      pollResult()
    } catch (error) {
      console.error("Error creating TTS task:", error)
      setTtsLoading(false)
      setTtsTaskId(null) // Clear task ID on error
      toast.error(error instanceof Error ? error.message : "Failed to create TTS task")
    }
  }

  // Handle TTS audio deletion
  const handleDeleteTtsAudio = () => {
    setTtsTaskId(null)
    setTtsAudioUrl(null)
    setTtsAudioBlob(null)
    setTtsAudioDuration(0)
    setIsPlayingTts(false)
    setTtsPlaybackPosition(0)
    if (ttsAudioRef.current) {
      ttsAudioRef.current.pause()
      ttsAudioRef.current = null
    }
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = null
    }
    setTtsLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-8 max-w-7xl mx-auto">
      {/* Left Panel: Image Upload & Sample Avatars - Single Container */}
      <Card className="p-6 glass-strong" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
        <div className="space-y-8">
          {/* Image Upload Section */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">1. Upload your photo</h3>
            
            <div className="relative">
              {!imagePreview ? (
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors bg-card/50 dark:bg-card border-border dark:border-border/80 hover:border-accent/50 hover:bg-card/80 dark:hover:bg-card">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-accent/20 dark:bg-accent/15 flex items-center justify-center mx-auto">
                      <FiImage className="w-8 h-8 text-accent" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground dark:text-foreground">Supported formats: PNG, JPG, WebP</p>
                      <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">Maximum file size: 10MB</p>
                    </div>
                  </div>
                  <Input
                    ref={imageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-border dark:border-border/80 bg-card/50 dark:bg-card flex items-center justify-center">
                  <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background hover:text-foreground z-10"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClearImage()
                    }}
                  >
                    <FiX className="h-4 w-4" />
                  </Button>
                  <Input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-0"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sample Avatars Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Sample Avatars</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border border-border/50 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setAspectRatio("9:16")}
                    className={`px-2 py-1 text-[10px] font-medium transition-colors ${
                      aspectRatio === "9:16"
                        ? "bg-accent text-accent-foreground"
                        : "bg-background/50 text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    9:16
                  </button>
                  <button
                    type="button"
                    onClick={() => setAspectRatio("16:9")}
                    className={`px-2 py-1 text-[10px] font-medium transition-colors ${
                      aspectRatio === "16:9"
                        ? "bg-accent text-accent-foreground"
                        : "bg-background/50 text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    16:9
                  </button>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDialogOpen(true)}
                    className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 font-medium"
                  >
                    More <FiChevronRight className="w-3 h-3" />
                  </button>
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-semibold text-red-500 bg-red-500/10 rounded leading-none">NEW</span>
                </div>
              </div>
            </div>

            {/* Avatar Grid - Fixed height with scroll */}
            <div className="h-[420px] overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-muted-foreground">Loading avatars...</p>
                </div>
              ) : defaultAvatars.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-muted-foreground">No avatars available</p>
                </div>
              ) : (
                <div
                  className={`grid gap-2 ${
                    aspectRatio === "9:16" ? "grid-cols-4" : "grid-cols-2"
                  }`}
                >
                  {defaultAvatars.map((avatar, index) => (
                    <button
                      key={`${avatar.url}-${index}`}
                      type="button"
                      onClick={() => handleAvatarClick(avatar.url)}
                      className={`relative rounded-lg overflow-hidden border-2 border-border/50 hover:border-accent/50 transition-colors bg-muted/20 group ${
                        aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"
                      }`}
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.filename}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Right Panel: Model Select, Audio Upload & Generate - Single Container */}
      <Card className="p-6 glass-strong flex flex-col" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
        <div className="flex flex-col flex-1 space-y-8">
          {/* Model Selection */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">2. Model Select</h3>
            
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setResolution("fast")}
                className={`relative w-full sm:w-[200px] p-5 rounded-xl border-2 transition-all flex flex-col items-start ${
                  resolution === "fast"
                    ? "border-accent bg-card shadow-lg"
                    : "border-border/50 bg-card/50 hover:border-accent/50 hover:bg-card/80"
                }`}
              >
                {resolution === "fast" && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <FiCheck className="w-4 h-4 text-accent-foreground" />
                  </div>
                )}
                <h4 className="text-lg font-semibold text-foreground mb-1 pr-8">Fast</h4>
                <p className="text-sm text-muted-foreground mb-4">Fastest generation</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <FiDollarSign className="w-4 h-4" />
                    <span>0.5 Credit/s</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum 3 credits</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setResolution("480p")}
                className={`relative w-full sm:w-[200px] p-5 rounded-xl border-2 transition-all flex flex-col items-start ${
                  resolution === "480p"
                    ? "border-accent bg-card shadow-lg"
                    : "border-border/50 bg-card/50 hover:border-accent/50 hover:bg-card/80"
                }`}
              >
                {resolution === "480p" && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <FiCheck className="w-4 h-4 text-accent-foreground" />
                  </div>
                )}
                <h4 className="text-lg font-semibold text-foreground mb-1 pr-8">Quality 480P</h4>
                <p className="text-sm text-muted-foreground mb-4">Standard quality</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <FiDollarSign className="w-4 h-4" />
                    <span>1 Credit/s</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum 5 credits</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setResolution("720p")}
                className={`relative w-full sm:w-[200px] p-5 rounded-xl border-2 transition-all flex flex-col items-start ${
                  resolution === "720p"
                    ? "border-accent bg-card shadow-lg"
                    : "border-border/50 bg-card/50 hover:border-accent/50 hover:bg-card/80"
                }`}
              >
                {resolution === "720p" && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <FiCheck className="w-4 h-4 text-accent-foreground" />
                  </div>
                )}
                <h4 className="text-lg font-semibold text-foreground mb-1 pr-8">Quality 720P</h4>
                <p className="text-sm text-muted-foreground mb-4">High quality</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <FiDollarSign className="w-4 h-4" />
                    <span>2 Credits/s</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum 10 credits</p>
                </div>
              </button>
            </div>
          </div>

          {/* Audio Upload Section - Flex to fill remaining space */}
          <div className="flex flex-col flex-1 min-h-0">
            <h3 className="text-base font-semibold text-foreground mb-4">
              3. Enter your text, upload or record audio
            </h3>

            <Tabs value={audioTab} onValueChange={(v) => setAudioTab(v as "input" | "upload" | "record")} className="w-full flex flex-col flex-1 min-h-0">
              <TabsList className="grid w-full grid-cols-3 mb-4 flex-shrink-0">
                <TabsTrigger value="input" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Input Text
                </TabsTrigger>
                <TabsTrigger value="upload" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Upload Audio
                </TabsTrigger>
                <TabsTrigger value="record" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Record Audio
                </TabsTrigger>
              </TabsList>

              <InputTextTab
                ttsLoading={ttsLoading}
                ttsAudioUrl={ttsAudioUrl}
                ttsAudioDuration={ttsAudioDuration}
                ttsAudioBlob={ttsAudioBlob}
                isPlayingTts={isPlayingTts}
                ttsPlaybackPosition={ttsPlaybackPosition}
                inputText={inputText}
                editableDivRef={editableDivRef}
                onEditableDivChange={handleEditableDivChange}
                onOpenVoiceDialog={() => setVoiceDialogOpen(true)}
                selectedVoiceName={selectedVoiceName}
                emotion={emotion}
                onEmotionChange={setEmotion}
                speed={speed}
                onSpeedChange={setSpeed}
                volume={volume}
                onVolumeChange={setVolume}
                pitch={pitch}
                onPitchChange={setPitch}
                pauseSeconds={pauseSeconds}
                setPauseSeconds={(value) => setPauseSeconds(value)}
                pausePopoverOpen={pausePopoverOpen}
                setPausePopoverOpen={setPausePopoverOpen}
                onInsertPause={handleInsertPause}
                onDeleteTtsAudio={handleDeleteTtsAudio}
                onToggleTtsPlayback={() => {
                  if (!ttsAudioRef.current && ttsAudioUrl) {
                    ttsAudioRef.current = new Audio(ttsAudioUrl)
                    ttsAudioRef.current.addEventListener("ended", () => {
                      setIsPlayingTts(false)
                      setTtsPlaybackPosition(0)
                    })
                  }

                  if (ttsAudioRef.current) {
                    if (isPlayingTts) {
                      ttsAudioRef.current.pause()
                      setIsPlayingTts(false)
                    } else {
                      ttsAudioRef.current.play()
                      setIsPlayingTts(true)
                    }
                  }
                }}
                onRunTts={handleTextToSpeech}
                ttsUsage={ttsUsage}
              />

              <UploadAudioTab
                audioFile={audioFile}
                audioFileName={audioFileName}
                audioDuration={audioDuration}
                estimatedCredits={estimatedCredits}
                audioInputRef={audioInputRef}
                uploadedAudioUrl={uploadedAudioUrl}
                isPlayingUploaded={isPlayingUploaded}
                uploadedPlaybackPosition={uploadedPlaybackPosition}
                onAudioFileChange={handleAudioChange}
                onClearAudio={handleClearAudio}
                onTogglePlayback={() => {
                  if (!uploadedAudioRef.current && uploadedAudioUrl) {
                    uploadedAudioRef.current = new Audio(uploadedAudioUrl)
                    uploadedAudioRef.current.addEventListener("ended", () => {
                      setIsPlayingUploaded(false)
                      setUploadedPlaybackPosition(0)
                    })
                  }

                  if (uploadedAudioRef.current) {
                    if (isPlayingUploaded) {
                      uploadedAudioRef.current.pause()
                      setIsPlayingUploaded(false)
                    } else {
                      uploadedAudioRef.current.play()
                      setIsPlayingUploaded(true)
                    }
                  }
                }}
              />

              <RecordAudioTab
                recordedAudioBlob={recordedAudioBlob}
                recordedAudioUrl={recordedAudioUrl}
                recordedDuration={recordedDuration}
                resolution={resolution}
                isPlayingRecorded={isPlayingRecorded}
                playbackPosition={playbackPosition}
                onStartRecord={() => setRecordDialogOpen(true)}
                onReRecord={() => setRecordDialogOpen(true)}
                onClearRecorded={() => {
                  setRecordedAudioBlob(null)
                  setRecordedAudioUrl(null)
                  setRecordedDuration(0)
                  setIsPlayingRecorded(false)
                  setPlaybackPosition(0)
                  if (recordedAudioRef.current) {
                    recordedAudioRef.current.pause()
                    recordedAudioRef.current = null
                  }
                }}
                onTogglePlayback={() => {
                  if (!recordedAudioRef.current && recordedAudioUrl) {
                    recordedAudioRef.current = new Audio(recordedAudioUrl)
                    recordedAudioRef.current.addEventListener("ended", () => {
                      setIsPlayingRecorded(false)
                      setPlaybackPosition(0)
                    })
                  }

                  if (recordedAudioRef.current) {
                    if (isPlayingRecorded) {
                      recordedAudioRef.current.pause()
                      setIsPlayingRecorded(false)
                    } else {
                      recordedAudioRef.current.play()
                      setIsPlayingRecorded(true)
                    }
                  }
                }}
              />
            </Tabs>
          </div>

          {/* Generate Button */}
          <form onSubmit={handleSubmit} className="flex-shrink-0">
            <Button
              type="submit"
              className="w-full h-14 rounded-xl bg-accent text-accent-foreground font-semibold text-base hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={
                isSubmitting ||
                (!imageFile && !imagePreview) ||
                (audioTab === "input" 
                  ? !inputText.trim() 
                  : audioTab === "upload" 
                    ? !audioFile 
                    : !recordedAudioBlob)
              }
            >
              {isSubmitting ? (
                <>Generating...</>
              ) : (
                (() => {
                  const minCredits = resolution === "fast" ? 3 : resolution === "480p" ? 5 : 10
                  if (audioTab === "input") {
                    return <>Generate (minimum -{minCredits} credits)</>
                  }
                  const displayCredits = estimatedCredits || minCredits
                  return <>Generate (-{displayCredits} Credit{displayCredits !== 1 ? "s" : ""})</>
                })()
              )}
            </Button>
          </form>
        </div>
      </Card>

      {/* Avatar Selection Dialog */}
      <AvatarDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        aspectRatio={aspectRatio}
        selectedCategory={null}
        onSelectAvatar={handleDialogAvatarSelect}
        onAspectRatioChange={setAspectRatio}
      />

      {/* Record Audio Dialog */}
      <RecordAudioDialog
        open={recordDialogOpen}
        onOpenChange={setRecordDialogOpen}
        onConfirm={(blob, duration) => {
          setRecordedAudioBlob(blob)
          const url = URL.createObjectURL(blob)
          setRecordedAudioUrl(url)
          setRecordedDuration(duration)
        }}
      />

      {/* Voice Select Dialog */}
      <VoiceSelectDialog
        open={voiceDialogOpen}
        onOpenChange={setVoiceDialogOpen}
        selectedVoiceId={voiceId}
        onSelect={(id) => {
          setVoiceId(id)
          // Find voice name
          fetch("/audio/voices.json")
            .then((res) => res.json())
            .then((voices) => {
              const voice = voices.find((v: any) => v.uniq_id === id)
              if (voice) {
                setSelectedVoiceName(voice.voice_name)
              }
            })
            .catch(console.error)
        }}
      />

      {/* Login Dialog */}
      <LoginDialog
        open={loginDialogOpen}
        onOpenChange={setLoginDialogOpen}
      />
    </div>
  )
}

