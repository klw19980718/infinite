"use client"

import { useState, useRef, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FiMic, FiX, FiCheck, FiTrash2 } from "react-icons/fi"

interface RecordAudioDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (audioBlob: Blob, duration: number) => void
}

const SAMPLE_SCRIPT = `Hello everyone!

Technology is evolving fast, shaping our lives in incredible ways. AI is transforming work, creativity, and communication. But with innovation comes responsibility. Let's learn, adapt, and use technology wisely to build a better future together.

So, stay curious, keep learning, and embrace the future. The world is changing, and we can shape it together!

Thank you for listening!`

export const RecordAudioDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: RecordAudioDialogProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackPosition, setPlaybackPosition] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const durationRef = useRef<number>(0)

  const MAX_DURATION = 600 // 600 seconds (10 minutes)

  // Format time helper
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      stopRecording()
      setRecordedBlob(null)
      setAudioUrl(null)
      setDuration(0)
      durationRef.current = 0
      setIsPlaying(false)
      setPlaybackPosition(0)
    }
  }, [open])

  // Update playback position
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const updatePosition = () => {
        if (audioRef.current) {
          setPlaybackPosition(audioRef.current.currentTime)
          animationFrameRef.current = requestAnimationFrame(updatePosition)
        }
      }
      animationFrameRef.current = requestAnimationFrame(updatePosition)
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [isPlaying])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Setup audio context
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      })
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        setRecordedBlob(blob)
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        
        // Create audio element to get duration
        const audio = new Audio(url)
        audio.addEventListener("loadedmetadata", () => {
          setDuration(audio.duration)
        })
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      durationRef.current = 0
      timerRef.current = setInterval(() => {
        durationRef.current += 0.1
        setDuration(durationRef.current)
        if (durationRef.current >= MAX_DURATION) {
          stopRecording()
        }
      }, 100)
    } catch (error) {
      console.error("Error starting recording:", error)
      alert("Failed to access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
  }

  const handleConfirm = () => {
    if (recordedBlob) {
      onConfirm(recordedBlob, duration)
      onOpenChange(false)
    }
  }

  const handleDelete = () => {
    stopRecording()
    setRecordedBlob(null)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsPlaying(false)
    setPlaybackPosition(0)
    setDuration(0)
    durationRef.current = 0
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Script Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">No good ideas? Try reading:</p>
              {isRecording && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-sm font-medium text-foreground">
                    {formatTime(duration)} / {MAX_DURATION}s
                  </span>
                </div>
              )}
            </div>
            <div className="p-6 rounded-lg bg-card/50 dark:bg-card border border-border/50 min-h-[200px]">
              <div className="text-sm text-foreground leading-relaxed space-y-4">
                {SAMPLE_SCRIPT.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Audio Playback Controls (shown after recording) */}
          {recordedBlob && audioUrl && (
            <div className="space-y-3">
              <audio
                ref={audioRef}
                src={audioUrl}
                controls
                className="w-full"
                onTimeUpdate={(e) => {
                  const audio = e.currentTarget
                  setPlaybackPosition(audio.currentTime)
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false)
                  setPlaybackPosition(0)
                }}
              />
              <div className="flex items-center justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-destructive hover:text-destructive"
                >
                  <FiTrash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Record Button */}
          <div className="flex justify-center">
            {!recordedBlob ? (
              <Button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`h-20 w-20 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-accent hover:bg-accent/90 text-accent-foreground"
                }`}
              >
                {isRecording ? (
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                  </div>
                ) : (
                  <FiMic className="h-8 w-8" />
                )}
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleDelete}
                  className="h-16 w-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
                >
                  <FiX className="h-6 w-6" />
                </Button>
                <Button
                  type="button"
                  size="lg"
                  onClick={handleConfirm}
                  className="h-16 w-16 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <FiCheck className="h-6 w-6" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

