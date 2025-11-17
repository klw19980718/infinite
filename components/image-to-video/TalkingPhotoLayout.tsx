"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FiUpload, FiImage, FiMusic, FiMic, FiX, FiChevronRight, FiCheck, FiDollarSign, FiPlay, FiPause, FiTrash2 } from "react-icons/fi"
import { AvatarDialog } from "./AvatarDialog"
import { RecordAudioDialog } from "./RecordAudioDialog"
import { AudioWaveform } from "./AudioWaveform"

interface Avatar {
  url: string
  category: string
  filename: string
  aspectRatio: string | null
}

interface TalkingPhotoLayoutProps {
  imagePreview: string | null
  imageFileName: string | null
  imageFile: File | null
  audioPreview: string | null
  audioFileName: string | null
  audioFile: File | null
  audioDuration: number | null
  resolution: "480p" | "720p"
  estimatedCredits: number
  status: "idle" | "loading" | "completed"
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAudioChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onResolutionChange: (resolution: "480p" | "720p") => void
  onClearImage: () => void
  onClearAudio: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  imageInputRef: React.RefObject<HTMLInputElement | null>
  audioInputRef: React.RefObject<HTMLInputElement | null>
  onAvatarSelect?: (url: string) => void
}

export const TalkingPhotoLayout = ({
  imagePreview,
  imageFileName,
  imageFile,
  audioPreview,
  audioFileName,
  audioFile,
  audioDuration,
  resolution,
  estimatedCredits,
  status,
  onImageChange,
  onAudioChange,
  onResolutionChange,
  onClearImage,
  onClearAudio,
  onSubmit,
  imageInputRef,
  audioInputRef,
  onAvatarSelect,
}: TalkingPhotoLayoutProps) => {
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9">("9:16")
  const [audioTab, setAudioTab] = useState<"upload" | "record">("upload")
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

  const handleAvatarClick = async (avatarUrl: string) => {
    if (onAvatarSelect) {
      onAvatarSelect(avatarUrl)
    } else {
      // Fallback: try to load image and set it
      try {
        const response = await fetch(avatarUrl)
        const blob = await response.blob()
        const file = new File([blob], avatarUrl.split("/").pop() || "avatar.webp", { type: blob.type })
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        const fakeEvent = {
          target: { files: dataTransfer.files },
        } as React.ChangeEvent<HTMLInputElement>
        onImageChange(fakeEvent)
      } catch (error) {
        console.error("Failed to load avatar:", error)
      }
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
                      <p className="text-sm font-medium text-foreground dark:text-foreground">Supported formats: jpg, png, webp</p>
                      <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">Maximum file size: 30MB</p>
                    </div>
                  </div>
                  <Input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={onImageChange}
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
                      onClearImage()
                    }}
                  >
                    <FiX className="h-4 w-4" />
                  </Button>
                  <Input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={onImageChange}
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
            <div className="h-[400px] overflow-y-auto custom-scrollbar">
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
                onClick={() => onResolutionChange("480p")}
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
                <h4 className="text-lg font-semibold text-foreground mb-1 pr-8">480P</h4>
                <p className="text-sm text-muted-foreground mb-4">Fastest, basic effect</p>
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
                onClick={() => onResolutionChange("720p")}
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
                <h4 className="text-lg font-semibold text-foreground mb-1 pr-8">720P</h4>
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

            <Tabs value={audioTab} onValueChange={(v) => setAudioTab(v as "upload" | "record")} className="w-full flex flex-col flex-1 min-h-0">
              <TabsList className="grid w-full grid-cols-2 mb-4 flex-shrink-0">
                <TabsTrigger value="upload" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Upload Audio
                </TabsTrigger>
                <TabsTrigger value="record" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Record Audio
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="flex-1 flex flex-col min-h-0 mt-0">
                {!audioFile ? (
                  <div className="flex items-center justify-center w-full flex-1 min-h-[200px] border-2 border-dashed border-border/50 rounded-lg bg-card/50 dark:bg-card">
                    <div className="relative w-full h-full">
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                            <FiMusic className="w-6 h-6 text-accent" />
                          </div>
                          <p className="text-sm font-medium text-foreground">Upload Audio Up to 600s</p>
                        </div>
                      </div>
                      <Input
                        ref={audioInputRef}
                        type="file"
                        accept="audio/mpeg,audio/mp3,audio/wav,audio/wave,audio/x-wav"
                        onChange={onAudioChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full flex-1 min-h-[200px] rounded-lg border border-border/50 bg-card/50 dark:bg-card p-4 flex flex-col">
                    {/* Top: Audio Info and Actions */}
                    <div className="flex items-center justify-between mb-3 flex-shrink-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <FiMusic className="w-4 h-4 text-accent" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate" title={audioFileName || undefined}>
                            {audioFileName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {audioDuration !== null ? `${Math.ceil(audioDuration)}s` : "Loading..."} • ~{estimatedCredits} credits
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => audioInputRef.current?.click()}
                        >
                          <FiUpload className="mr-1 h-3 w-3" /> Replace
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={onClearAudio}
                        >
                          <FiTrash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Middle: Waveform - Takes remaining space */}
                    <div className="flex-1 min-h-0 mb-3">
                      <AudioWaveform
                        audioBlob={audioFile}
                        audioUrl={uploadedAudioUrl}
                        isPlaying={isPlayingUploaded}
                        playbackPosition={uploadedPlaybackPosition}
                        duration={audioDuration || 0}
                      />
                    </div>

                    {/* Bottom: Playback Controls */}
                    <div className="flex items-center justify-between flex-shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-3"
                        onClick={() => {
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
                      >
                        {isPlayingUploaded ? (
                          <FiPause className="mr-2 h-3 w-3" />
                        ) : (
                          <FiPlay className="mr-2 h-3 w-3" />
                        )}
                        {isPlayingUploaded ? "Pause" : "Play"}
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(uploadedPlaybackPosition)}s / {audioDuration !== null ? Math.ceil(audioDuration) : 0}s
                      </span>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="record" className="flex-1 flex flex-col min-h-0 mt-0">
                {!recordedAudioBlob ? (
                  <div className="flex items-center justify-center w-full flex-1 min-h-[200px] border-2 border-dashed border-border/50 rounded-lg bg-card/50 dark:bg-card">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                        <FiMic className="w-6 h-6 text-accent" />
                      </div>
                      <p className="text-sm font-medium text-foreground">Click to start recording</p>
                      <Button
                        type="button"
                        onClick={() => setRecordDialogOpen(true)}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        <FiMic className="mr-2 h-4 w-4" />
                        Start Recording
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full flex-1 min-h-[200px] rounded-lg border border-border/50 bg-card/50 dark:bg-card p-4 flex flex-col">
                    {/* Top: Audio Info and Actions */}
                    <div className="flex items-center justify-between mb-3 flex-shrink-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <FiMusic className="w-4 h-4 text-accent" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5)}.webm
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {Math.ceil(recordedDuration)}s • ~{Math.ceil(recordedDuration * (resolution === "480p" ? 1 : 2))} credits
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => setRecordDialogOpen(true)}
                        >
                          <FiMic className="mr-1 h-3 w-3" /> Re-record
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => {
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
                        >
                          <FiTrash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Middle: Waveform - Takes remaining space */}
                    <div className="flex-1 min-h-0 mb-3">
                      <AudioWaveform
                        audioBlob={recordedAudioBlob}
                        audioUrl={recordedAudioUrl}
                        isPlaying={isPlayingRecorded}
                        playbackPosition={playbackPosition}
                        duration={recordedDuration}
                      />
                    </div>

                    {/* Bottom: Playback Controls */}
                    <div className="flex items-center justify-between flex-shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-3"
                        onClick={() => {
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
                      >
                        {isPlayingRecorded ? (
                          <FiPause className="mr-2 h-3 w-3" />
                        ) : (
                          <FiPlay className="mr-2 h-3 w-3" />
                        )}
                        {isPlayingRecorded ? "Pause" : "Play"}
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(playbackPosition)}s / {Math.ceil(recordedDuration)}s
                      </span>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Generate Button */}
          <form onSubmit={onSubmit} className="flex-shrink-0">
            <Button
              type="submit"
              className="w-full h-14 rounded-xl bg-accent text-accent-foreground font-semibold text-base hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={status === "loading" || !imageFile || !audioFile}
            >
              {status === "loading" ? (
                <>Generating...</>
              ) : (
                <>Generate ({estimatedCredits > 0 ? `-${estimatedCredits}` : ""} Credit{estimatedCredits !== 1 ? "s" : ""})</>
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
          
          // Convert blob to file and trigger audio change
          const file = new File([blob], `recording-${Date.now()}.webm`, { type: blob.type })
          const dataTransfer = new DataTransfer()
          dataTransfer.items.add(file)
          const fakeEvent = {
            target: { files: dataTransfer.files },
          } as React.ChangeEvent<HTMLInputElement>
          onAudioChange(fakeEvent)
        }}
      />
    </div>
  )
}
