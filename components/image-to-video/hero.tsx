"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FiX, FiImage, FiMusic, FiChevronDown, FiDollarSign } from "react-icons/fi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { TalkingPhotoLayout } from "./TalkingPhotoLayout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const ImageToVideoHero = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFileName, setImageFileName] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [audioPreview, setAudioPreview] = useState<string | null>(null)
  const [audioFileName, setAudioFileName] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioDuration, setAudioDuration] = useState<number | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "completed">("idle")
  const [resolution, setResolution] = useState<"480p" | "720p">("480p")
  const [taskId, setTaskId] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [estimatedCredits, setEstimatedCredits] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  
  const imageInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      setAudioFileName(file.name)
      setAudioPreview(file.name)
      
      // Get audio duration
      const audio = new Audio()
      const url = URL.createObjectURL(file)
      audio.src = url
      audio.addEventListener("loadedmetadata", () => {
        const duration = Math.ceil(audio.duration)
        const maxDuration = 600 // 10 minutes
        if (duration > maxDuration) {
          toast.error(`Audio duration exceeds maximum of ${maxDuration}s (${Math.floor(maxDuration / 60)} minutes)`)
          setAudioFile(null)
          setAudioFileName("")
          setAudioPreview("")
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
  }

  // Calculate credits based on duration and resolution
  const calculateCredits = (duration: number | null, resolution: "480p" | "720p"): number => {
    if (!duration) {
      // Minimum charge: 5 credits for 480p, 10 credits for 720p
      return resolution === "480p" ? 5 : 10
    }
    
    const creditsPerSecond = resolution === "480p" ? 1 : 2
    const credits = duration * creditsPerSecond
    const minCredits = resolution === "480p" ? 5 : 10
    const maxDuration = 600 // 10 minutes
    const actualDuration = Math.min(duration, maxDuration)
    
    return Math.max(minCredits, actualDuration * creditsPerSecond)
  }

  // Update estimated credits when resolution or audio duration changes
  useEffect(() => {
    const credits = calculateCredits(audioDuration, resolution)
    setEstimatedCredits(credits)
  }, [audioDuration, resolution])

  // Simulate progress when loading
  useEffect(() => {
    if (status === "loading") {
      setProgress(0)
      
      // Simulate progress: start fast, slow down near 90%
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            return 90 // Cap at 90%, wait for API response
          }
          // Faster at start, slower as we approach 90%
          const increment = prev < 50 ? 3 : prev < 75 ? 2 : 1
          return Math.min(prev + increment, 90)
        })
      }, 1000) // Update every second
    } else {
      // Reset progress when not loading
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
      if (status === "completed") {
        setProgress(100)
      } else if (status === "idle") {
        setProgress(0)
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }
  }, [status])

  const clearImage = () => {
    setImagePreview(null)
    setImageFileName(null)
    setImageFile(null)
    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }
  }

  const clearAudio = () => {
    setAudioPreview(null)
    setAudioFileName(null)
    setAudioFile(null)
    setAudioDuration(null)
    if (audioInputRef.current) {
      audioInputRef.current.value = ''
    }
  }

  // Poll task result
  const pollTaskResult = async (taskId: string) => {
    const maxAttempts = 60 // 5 minutes max (5s interval)
    let attempts = 0

    const poll = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/video/result?task_id=${taskId}`, {
        credentials: "include",
      })
        const data = await response.json()

        if (!data.ok) {
          throw new Error(data.message || "Failed to fetch result")
        }

        if (data.status === "completed" && data.outputs && data.outputs.length > 0) {
          setProgress(100)
          setVideoUrl(data.outputs[0])
          setStatus("completed")
          return
        }

        if (data.status === "failed") {
          setProgress(0)
          setErrorMessage(data.error || "Video generation failed")
          setStatus("idle")
          return
        }

        // Continue polling if still processing
        attempts++
        if (attempts < maxAttempts && (data.status === "processing" || data.status === "pending")) {
          setTimeout(poll, 5000) // Poll every 5 seconds
        } else {
          throw new Error("Timeout waiting for video generation")
        }
      } catch (error) {
        console.error("Error polling task result:", error)
        setErrorMessage(error instanceof Error ? error.message : "Failed to check task status")
        setStatus("idle")
      }
    }

    poll()
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!imageFile || !audioFile) {
      toast.error("Please upload both image and audio files")
      return
    }

    setStatus("loading")
    setErrorMessage(null)

    try {
      const formData = new FormData()
      formData.append("image", imageFile!)
      formData.append("audio", audioFile!)
      formData.append("resolution", resolution)
      
      // Send audio duration to backend
      if (audioDuration !== null) {
        formData.append("audio_duration", audioDuration.toString())
      }
      
      const prompt = promptRef.current?.value.trim()
      if (prompt) {
        formData.append("prompt", prompt)
      }

      const response = await fetch("/api/video/image-to-video", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.message || "Failed to create video task")
      }

      setTaskId(data.task_id)
      
      // Start polling for results
      pollTaskResult(data.task_id)
    } catch (error) {
      console.error("Error submitting task:", error)
      const errorMsg = error instanceof Error ? error.message : "Failed to submit task"
      setErrorMessage(errorMsg)
      setStatus("idle")
      toast.error(errorMsg)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden py-32">
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-accent/30">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </div>
                  <span className="text-foreground text-base font-semibold">Talking Photo Generator</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-4 whitespace-nowrap">
                  <span className="text-accent">Infinite Talk AI</span>
                  <span className="text-foreground"> — Talking Photo Generator</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto text-pretty px-4 font-light">
                  Bring your talking photos to life with natural, expressive audio sync. Infinite Talk AI lets your photos speak with unlimited, natural video creation.
                </p>

                {/* Anchor Tab Links */}
                <Tabs defaultValue="photo-talking" className="pt-4">
                  <TabsList>
                    <TabsTrigger value="photo-talking" onClick={() => {
                      const element = document.getElementById('photo-talking')
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}>
                      Photo Talking
                    </TabsTrigger>
                    <TabsTrigger value="video-lip-sync" onClick={() => {
                      const element = document.getElementById('video-lip-sync')
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}>
                      Video Lip Sync
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
          </div>

          {/* Main Content: New Layout */}
          <div id="photo-talking" className="mb-16">
            <TalkingPhotoLayout
              imagePreview={imagePreview}
              imageFileName={imageFileName}
              imageFile={imageFile}
              audioPreview={audioPreview}
              audioFileName={audioFileName}
              audioFile={audioFile}
              audioDuration={audioDuration}
              resolution={resolution}
              estimatedCredits={estimatedCredits}
              status={status}
              onImageChange={handleImageChange}
              onAudioChange={handleAudioChange}
              onResolutionChange={setResolution}
              onClearImage={clearImage}
              onClearAudio={clearAudio}
              onSubmit={handleSubmit}
              imageInputRef={imageInputRef}
              audioInputRef={audioInputRef}
            />
          </div>
        </div>
      </div>
    </section>
  )
}