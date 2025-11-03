"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FiUpload, FiPlay, FiLoader, FiX, FiVideo, FiMusic, FiChevronDown, FiDollarSign } from "react-icons/fi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const VideoToVideoHero = () => {
  const router = useRouter()
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [videoFileName, setVideoFileName] = useState<string | null>(null)
  const [audioPreview, setAudioPreview] = useState<string | null>(null)
  const [audioFileName, setAudioFileName] = useState<string | null>(null)
  const [audioDuration, setAudioDuration] = useState<number | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "completed">("idle")
  const [resolution, setResolution] = useState<"480p" | "720p">("480p")
  const [taskId, setTaskId] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [estimatedCredits, setEstimatedCredits] = useState<number>(0)
  
  const videoInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const promptRef = useRef<HTMLTextAreaElement>(null)

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFileName(file.name)
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
    }
  }

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFileName(file.name)
      setAudioPreview(file.name)
      
      // Get audio duration
      const audio = new Audio()
      const url = URL.createObjectURL(file)
      audio.src = url
      audio.addEventListener("loadedmetadata", () => {
        const duration = Math.ceil(audio.duration)
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

  const clearVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }
    setVideoPreview(null)
    setVideoFileName(null)
    if (videoInputRef.current) {
      videoInputRef.current.value = ''
    }
  }

  const clearAudio = () => {
    setAudioPreview(null)
    setAudioFileName(null)
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
          setVideoUrl(data.outputs[0])
          setStatus("completed")
          return
        }

        if (data.status === "failed") {
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

    if (!videoPreview || !audioPreview) {
      alert("Please upload both video and audio files")
      return
    }

    const videoFile = videoInputRef.current?.files?.[0]
    const audioFile = audioInputRef.current?.files?.[0]

    if (!videoFile || !audioFile) {
      alert("Please select both video and audio files")
      return
    }

    setStatus("loading")
    setErrorMessage(null)

    try {
      const formData = new FormData()
      formData.append("video", videoFile)
      formData.append("audio", audioFile)
      formData.append("resolution", resolution)
      
      // Send audio duration to backend
      if (audioDuration !== null) {
        formData.append("audio_duration", audioDuration.toString())
      }
      
      const prompt = promptRef.current?.value.trim()
      if (prompt) {
        formData.append("prompt", prompt)
      }

      const response = await fetch("/api/video/video-to-video", {
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
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit task")
      setStatus("idle")
      alert(error instanceof Error ? error.message : "Failed to submit task")
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-24">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-chart-2/5"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Multiple glowing orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[150px] animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-chart-2/12 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </div>
              <span className="text-foreground text-sm font-medium">Video-to-Video Generation</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance px-4">
              <span className="bg-gradient-to-r from-accent via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Video-to-Video with Infinite Talk AI
              </span>
              <br />
              <span className="text-foreground">
                — Accurate Lip Sync
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto text-pretty px-4">
              Transform any video into a lifelike talking clip with perfect lip sync. Infinite Talk AI pairs video-to-video generation with precise Lip Sync and natural expressions for creators, brands, and educators.
            </p>
          </div>

          {/* Main Content: Form and Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 max-w-7xl mx-auto">
            {/* Left: Form */}
            <div className="relative">
              <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-chart-2 flex items-center justify-center">
                    <FiUpload className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Create Video</h3>
                    <p className="text-sm text-muted-foreground">Upload your files and generate</p>
                  </div>
                </div>
                
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Video Upload */}
                  <div className="space-y-3">
                    <Label htmlFor="video" className="text-base font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent"></span>
                      Input Video
                    </Label>
                    {!videoPreview && (
                      <div className="relative">
                        <div className="flex items-center justify-center w-full h-16 border border-dashed border-border/50 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                              <FiVideo className="w-4 h-4 text-accent" />
                            </div>
                            <span className="font-medium text-foreground">Click to upload video</span>
                            <span className="hidden sm:inline text-muted-foreground">MP4, MOV, AVI</span>
                          </div>
                          <Input
                            ref={videoInputRef}
                            id="video"
                            type="file"
                            accept="video/mp4,video/mov,video/quicktime,video/avi"
                            onChange={handleVideoChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                    {videoPreview && (
                      <div className="flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-muted/20 p-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-14 h-14 rounded-md overflow-hidden border border-border/50 bg-background flex-shrink-0">
                            <video
                              src={videoPreview}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate" title={videoFileName || undefined}>
                              {videoFileName && videoFileName.length > 8 ? `${videoFileName.slice(0, 8)}...` : videoFileName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">Video selected</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 px-3"
                            onClick={() => videoInputRef.current?.click()}
                          >
                            <FiUpload className="mr-1 h-3 w-3" /> Replace
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={clearVideo}
                          >
                            <FiX className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Audio Upload */}
                  <div className="space-y-3">
                    <Label htmlFor="audio" className="text-base font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-chart-2"></span>
                      Voice Audio
                    </Label>
                    {!audioPreview && (
                      <div className="relative">
                        <div className="flex items-center justify-center w-full h-16 border border-dashed border-border/50 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-full bg-chart-2/10 flex items-center justify-center">
                              <FiMusic className="w-4 h-4 text-chart-2" />
                            </div>
                            <span className="font-medium text-foreground">Click to upload audio</span>
                            <span className="hidden sm:inline text-muted-foreground">MP3, WAV</span>
                          </div>
                          <Input
                            ref={audioInputRef}
                            id="audio"
                            type="file"
                            accept="audio/mpeg,audio/mp3,audio/wav,audio/wave,audio/x-wav"
                            onChange={handleAudioChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                    {audioPreview && (
                      <div className="flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-muted/20 p-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                            <FiMusic className="w-5 h-5 text-chart-2" />
                          </div>
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-foreground truncate" title={audioFileName || undefined}>
                              {audioFileName && audioFileName.length > 8 ? `${audioFileName.slice(0, 8)}...` : audioFileName}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-xs text-muted-foreground">
                                {audioDuration !== null ? `${audioDuration}s` : "Loading duration..."}
                              </p>
                              {audioDuration !== null && (
                                <span className="text-xs font-medium text-accent">
                                  ~{estimatedCredits} credits
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 px-3"
                            onClick={() => audioInputRef.current?.click()}
                          >
                            <FiUpload className="mr-1 h-3 w-3" /> Replace
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={clearAudio}
                          >
                            <FiX className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Resolution (Shadcn via Dropdown) */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-chart-3"></span>
                      Quality
                    </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="flex h-12 w-full items-center justify-between rounded-lg border border-border/50 bg-background/50 px-4 text-base shadow-sm transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
                          aria-label="Select resolution"
                        >
                          <span className="text-foreground font-medium">
                            {resolution === "480p" ? "Standard (480p)" : "HD (720p)"}
                          </span>
                          <FiChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                        <DropdownMenuRadioGroup value={resolution} onValueChange={(v) => setResolution(v as any)}>
                          <DropdownMenuRadioItem value="480p">Standard (480p)</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="720p">HD (720p)</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Prompt */}
                  <div className="space-y-3">
                    <Label htmlFor="prompt" className="text-base font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-chart-5"></span>
                      Style Prompt
                      <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                    </Label>
                    <textarea
                      ref={promptRef}
                      id="prompt"
                      rows={4}
                      placeholder="Describe the style, mood, or specific details you want in the video..."
                      className="flex w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-base shadow-sm transition-colors placeholder:text-muted-foreground hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-14 rounded-xl bg-gradient-to-r from-accent to-chart-2 text-white font-semibold text-base hover:from-accent/90 hover:to-chart-2/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <FiLoader className="mr-3 h-5 w-5 animate-spin" />
                          Generating Magic...
                        </>
                      ) : (
                        <>
                          <FiPlay className="mr-3 h-5 w-5" />
                          Generate Talking Video
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Right: Preview/Result Area */}
            <div className="relative lg:sticky lg:top-24 self-start">
              <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg w-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-chart-2 to-chart-3 flex items-center justify-center">
                    <FiPlay className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Preview</h3>
                    <p className="text-sm text-muted-foreground">Your generated video will appear here</p>
                  </div>
                </div>

                {/* Content Container with Fixed Height */}
                <div className="h-[380px]">
                  {/* Initial State */}
                  {status === "idle" && (
                    <div className="flex flex-col items-center justify-center h-full rounded-xl border-2 border-dashed border-border/50 bg-gradient-to-br from-muted/20 to-muted/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-chart-2/5"></div>
                    <div className="relative text-center space-y-6 p-8">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent/20 to-chart-2/20 flex items-center justify-center mx-auto backdrop-blur-sm border border-accent/20">
                        <FiUpload className="w-10 h-10 text-accent" />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-foreground">
                          Ready to Create
                        </h4>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Upload your input video and voice audio to generate a lifelike talking video with perfect lip sync
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        <span>Powered by AI</span>
                      </div>
                    </div>
                  </div>
                )}

                  {/* Loading State */}
                  {status === "loading" && (
                    <div className="flex flex-col items-center justify-center h-full rounded-xl border border-border/50 bg-gradient-to-br from-muted/20 to-muted/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-chart-2/10"></div>
                    <div className="relative text-center space-y-8 p-8">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent/20 to-chart-2/20 flex items-center justify-center mx-auto backdrop-blur-sm border border-accent/20">
                        <FiLoader className="w-10 h-10 text-accent animate-spin" />
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground">
                          Creating Your Video
                        </h4>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Our AI is analyzing your video and audio to generate perfect lip synchronization
                        </p>
                        {errorMessage && (
                          <p className="text-sm text-destructive max-w-sm mt-2">
                            {errorMessage}
                          </p>
                        )}
                      </div>
                      <div className="w-full max-w-sm space-y-3">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Processing...</span>
                          <span>~2-3 minutes</span>
                        </div>
                        <div className="w-full bg-border/50 rounded-full h-2 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-accent to-chart-2 animate-pulse transition-all duration-1000" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                  {/* Completed State */}
                  {status === "completed" && (
                    <div className="flex flex-col h-full gap-4">
                      <div className="flex-1 rounded-xl overflow-hidden border border-border/50 bg-muted/20 shadow-inner flex items-center justify-center min-h-0">
                        <video
                          controls
                          className="w-full h-full object-contain bg-black"
                          poster={videoPreview || undefined}
                          src={videoUrl || undefined}
                        >
                          {videoUrl ? (
                            <source src={videoUrl} type="video/mp4" />
                          ) : (
                            <source src="#" type="video/mp4" />
                          )}
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="h-12 rounded-lg border-border/50 hover:border-accent/50 hover:bg-accent/5 font-medium"
                        >
                          <FiUpload className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          className="h-12 rounded-lg border-border/50 hover:border-accent/50 hover:bg-accent/5 font-medium"
                        >
                          <FiPlay className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                      <div className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => setStatus("idle")}
                        >
                          Create Another Video
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Credit Billing Rules */}
                <div className="mt-8 pt-8 border-t border-border/50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <FiDollarSign className="w-5 h-5 text-accent" />
                      <h4 className="text-base font-semibold text-foreground">Credit Billing</h4>
                    </div>
                    
                    {/* Estimated Credits */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50">
                      <div>
                        <p className="text-sm font-medium text-foreground">Estimated Credits</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {audioDuration
                            ? `Based on ${audioDuration}s audio at ${resolution}`
                            : `Minimum charge for ${resolution}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">{estimatedCredits}</p>
                        <p className="text-xs text-muted-foreground">credits</p>
                      </div>
                    </div>

                    {/* Billing Rules */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"></span>
                        <div>
                          <span className="font-medium text-foreground">Standard (480p):</span>
                          <span className="text-muted-foreground"> 1 credit/second, minimum 5 credits</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-1.5 flex-shrink-0"></span>
                        <div>
                          <span className="font-medium text-foreground">HD (720p):</span>
                          <span className="text-muted-foreground"> 2 credits/second, minimum 10 credits</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-chart-3 mt-1.5 flex-shrink-0"></span>
                        <div>
                          <span className="font-medium text-foreground">Maximum duration:</span>
                          <span className="text-muted-foreground"> 600 seconds (10 minutes)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}