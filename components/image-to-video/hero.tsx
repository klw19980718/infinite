"use client"

import { useState, useRef, useEffect } from "react"
import { FiX, FiCheck } from "react-icons/fi"
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
  const [resolution, setResolution] = useState<"fast" | "480p" | "720p">("fast")
  const [estimatedCredits, setEstimatedCredits] = useState<number>(0)
  
  const imageInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)

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
  const calculateCredits = (duration: number | null, resolution: "fast" | "480p" | "720p"): number => {
    if (!duration) {
      // Minimum charge: 3 credits for fast, 5 credits for 480p, 10 credits for 720p
      return resolution === "fast" ? 3 : resolution === "480p" ? 5 : 10
    }
    
    // Fast: 0.5 credit/s, 480p: 1 credit/s, 720p: 2 credits/s
    const creditsPerSecond = resolution === "fast" ? 0.5 : resolution === "480p" ? 1 : 2
    const minCredits = resolution === "fast" ? 3 : resolution === "480p" ? 5 : 10
    const maxDuration = 600 // 10 minutes
    const actualDuration = Math.min(duration, maxDuration)
    
    // For fast mode, round up to nearest integer
    const calculatedCredits = actualDuration * creditsPerSecond
    const roundedCredits = resolution === "fast" ? Math.ceil(calculatedCredits) : calculatedCredits
    
    return Math.max(minCredits, roundedCredits)
  }

  // Update estimated credits when resolution or audio duration changes
  useEffect(() => {
    const credits = calculateCredits(audioDuration, resolution)
    setEstimatedCredits(credits)
  }, [audioDuration, resolution])

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

  // Note: TalkingPhotoLayout has its own handleSubmit that handles all cases
  // including input tab with TTS generation, so we don't need a separate handleSubmit here

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
              status="idle"
              onImageChange={handleImageChange}
              onAudioChange={handleAudioChange}
              onResolutionChange={setResolution}
              onClearImage={clearImage}
              onClearAudio={clearAudio}
              onSubmit={undefined}
              imageInputRef={imageInputRef}
              audioInputRef={audioInputRef}
              onTaskCreated={() => {
                // Show success message and guide to profile
                toast.custom((t) => (
                  <div className="bg-background border border-border rounded-xl shadow-lg p-4 w-[350px] flex items-start gap-3 relative pointer-events-auto">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-[15px] leading-none mb-1.5">Create Success</h3>
                      <p className="text-muted-foreground text-[13px] leading-relaxed">
                        Close window won't stop generation. <br />
                        Check progress in <button onClick={() => window.location.href = '/profile'} className="text-blue-500 hover:text-blue-600 font-medium hover:underline">My Creations</button>
                      </p>
                    </div>
                    <button onClick={() => toast.dismiss(t)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ), {
                  duration: Infinity,
                })
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}