"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { FiLoader, FiMusic, FiPause, FiPlay, FiSettings, FiClock, FiMinus, FiPlus, FiChevronRight, FiDownload } from "react-icons/fi"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
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

type TtsUsage = {
  characters_used: number
  remaining_free: number
  daily_limit: number
}

// Local helper for formatting pause seconds (same as InputTextTab)
const formatPauseSeconds = (seconds: number): string => {
  return parseFloat(seconds.toFixed(1)).toString()
}

export interface TextToSpeechGeneratorProps {
  voiceId: string
}

export function TextToSpeechGenerator({ voiceId }: TextToSpeechGeneratorProps) {
  const [text, setText] = useState("")
  const [ttsLoading, setTtsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioDuration, setAudioDuration] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackPosition, setPlaybackPosition] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [usage, setUsage] = useState<TtsUsage | null>(null)

  // Emotion, speed, volume, pitch, pauseSeconds
  const [emotion, setEmotion] = useState<string>("Neutral")
  const [speed, setSpeed] = useState<number[]>([0.9])
  const [volume, setVolume] = useState<number[]>([1])
  const [pitch, setPitch] = useState<number[]>([0])
  const [pauseSeconds, setPauseSeconds] = useState<number>(0.5)
  const [pausePopoverOpen, setPausePopoverOpen] = useState(false)
  const editableDivRef = useRef<HTMLDivElement | null>(null)

  // Load TTS usage on mount
  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await fetch("/api/speech/usage", {
          credentials: "include",
        })
        const data = await response.json()
        if (data.ok && data.usage) {
          setUsage(data.usage)
        }
      } catch (error) {
        console.error("Failed to fetch TTS usage:", error)
      }
    }

    fetchUsage()
  }, [])

  // Get plain text from editable div, converting pause elements to <#x.x#> format
  const getTextFromEditableDiv = (): string => {
    if (!editableDivRef.current) return text

    const nodes = Array.from(editableDivRef.current.childNodes)
    let result = ""

    for (const node of nodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        result += node.textContent || ""
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement
        if (element.dataset.pause) {
          result += `<#${element.dataset.pause}#>`
        } else {
          const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            {
              acceptNode: (n) => {
                if (n.nodeType === Node.ELEMENT_NODE) {
                  const el = n as HTMLElement
                  if (el.dataset.pause) {
                    return NodeFilter.FILTER_REJECT
                  }
                }
                if (n.nodeType === Node.TEXT_NODE) {
                  const parent = (n as HTMLElement).parentElement
                  if (parent && parent.dataset.pause) {
                    return NodeFilter.FILTER_REJECT
                  }
                }
                return NodeFilter.FILTER_ACCEPT
              },
            }
          )

          let subNode: Node | null
          while ((subNode = walker.nextNode())) {
            if (subNode.nodeType === Node.TEXT_NODE) {
              result += subNode.textContent || ""
            } else if (subNode.nodeType === Node.ELEMENT_NODE) {
              const subElement = subNode as HTMLElement
              if (subElement.dataset.pause) {
                result += `<#${subElement.dataset.pause}#>`
              }
            }
          }
        }
      }
    }

    return result
  }

  // Handle deleting pause element
  const handleDeletePause = (pauseElement: HTMLElement) => {
    if (!editableDivRef.current) return
    pauseElement.remove()
    const newText = getTextFromEditableDiv()
    setText(newText)
    editableDivRef.current.focus()
  }

  // Handle text change in editable div
  const handleEditableDivChange = () => {
    if (!editableDivRef.current) return
    const newText = getTextFromEditableDiv()
    setText(newText)
  }

  // Cleanup object URL and polling on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [audioUrl])

  // Update playback position for audio
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

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying])

  const handleTogglePlayback = () => {
    if (!audioUrl) return

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl)
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false)
        setPlaybackPosition(0)
      })
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleDownload = () => {
    if (!audioBlob) return
    try {
      const blobUrl = URL.createObjectURL(audioBlob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = "tts-audio.mp3"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Failed to download audio:", error)
      toast.error("Failed to download audio")
    }
  }

  const handleInsertPause = () => {
    if (!editableDivRef.current) return

    const selection = window.getSelection()
    if (!selection) return

    if (selection.rangeCount === 0) {
      const range = document.createRange()
      range.selectNodeContents(editableDivRef.current)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    const range = selection.getRangeAt(0)

    const formattedSeconds = formatPauseSeconds(pauseSeconds)

    const pauseElement = document.createElement("span")
    pauseElement.className =
      "inline-flex items-center gap-1.5 px-2 py-1 rounded bg-primary/20 dark:bg-primary/30 text-primary text-xs font-medium my-0.5"
    pauseElement.dataset.pause = formattedSeconds
    pauseElement.contentEditable = "false"

    const clockIcon = document.createElement("span")
    clockIcon.innerHTML = "⏱"
    clockIcon.className = "inline-block text-base leading-none"

    const textNode = document.createTextNode(`${formattedSeconds}s`)

    const deleteButton = document.createElement("button")
    deleteButton.type = "button"
    deleteButton.className =
      "ml-1 h-4 w-4 rounded-full bg-primary/30 dark:bg-primary/40 hover:bg-primary/50 dark:hover:bg-primary/60 flex items-center justify-center transition-colors flex-shrink-0"
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

    range.deleteContents()
    range.insertNode(pauseElement)

    range.setStartAfter(pauseElement)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)

    const newText = getTextFromEditableDiv()
    setText(newText)

    setPausePopoverOpen(false)

    editableDivRef.current.focus()
  }

  const handleGenerate = async () => {
    const textToSend = (editableDivRef.current
      ? getTextFromEditableDiv()
      : text
    ).trim()

    if (!textToSend) {
      toast.error("Please enter some text")
      return
    }

    if (textToSend.length > 2000) {
      toast.error("Text exceeds maximum of 2000 characters")
      return
    }

    // Reset previous audio state
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(null)
    setAudioBlob(null)
    setAudioDuration(0)
    setIsPlaying(false)
    setPlaybackPosition(0)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    setTtsLoading(true)

    try {
      // Map emotion to API format (same as TalkingPhotoLayout)
      const emotionMap: Record<string, string> = {
        Neutral: "neutral",
        Happy: "happy",
        Sad: "sad",
        Angry: "angry",
        Fearful: "fearful",
        Disgusted: "disgusted",
        Surprised: "surprised",
      }

      const response = await fetch("/api/speech/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textToSend,
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
        if (data.code === "INSUFFICIENT_CREDITS") {
          toast.error(
            data.message ||
              "Insufficient credits. Please purchase more credits to continue."
          )
        } else {
          toast.error(data.message || "Failed to create TTS task")
        }
        setTtsLoading(false)
        return
      }

      // Update TTS usage from API response if available
      if (data.tts_usage) {
        setUsage({
          characters_used: data.tts_usage.total_used_today,
          remaining_free: data.tts_usage.remaining_free,
          daily_limit: 3000,
        })
      }

      const wavespeedTaskId = data.task_id as string

      const pollResult = async () => {
        try {
          const resultResponse = await fetch(
            `/api/speech/result?task_id=${wavespeedTaskId}`
          )
          const resultData = await resultResponse.json()

          if (!resultData.ok) {
            if (
              resultData.code === "WAVESPEED_ERROR" ||
              resultData.code === "INTERNAL_ERROR"
            ) {
              // Still processing, continue polling
              return
            }
            throw new Error(resultData.message || "Failed to get task result")
          }

          if (
            resultData.status === "completed" &&
            resultData.outputs &&
            resultData.outputs.length > 0
          ) {
            const remoteAudioUrl = resultData.outputs[0] as string

            // Fetch audio as blob and create object URL
            const audioResponse = await fetch(remoteAudioUrl)
            const blob = await audioResponse.blob()
            const objectUrl = URL.createObjectURL(blob)

            setAudioBlob(blob)
            setAudioUrl(objectUrl)

            // Get duration
            const audio = new Audio(objectUrl)
            await new Promise<void>((resolve, reject) => {
              audio.addEventListener("loadedmetadata", () => {
                setAudioDuration(audio.duration)
                resolve()
              })
              audio.addEventListener("error", () => {
                reject(new Error("Failed to load audio metadata"))
              })
            })

            setTtsLoading(false)
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current)
              pollingIntervalRef.current = null
            }
          } else if (resultData.status === "failed") {
            throw new Error(resultData.error || "TTS task failed")
          }
        } catch (error) {
          console.error("Error polling TTS result:", error)
          if (
            error instanceof Error &&
            (error.message.includes("TTS task failed") ||
              error.message.includes("Failed to get task result"))
          ) {
            setTtsLoading(false)
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current)
              pollingIntervalRef.current = null
            }
            toast.error(error.message)
          }
        }
      }

      // Start polling
      pollingIntervalRef.current = setInterval(pollResult, 2000)
      // Initial poll
      pollResult()
    } catch (error) {
      console.error("Error creating TTS task:", error)
      setTtsLoading(false)
      toast.error(
        error instanceof Error ? error.message : "Failed to create TTS task"
      )
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-border bg-card/80 dark:bg-card p-4 sm:p-5 shadow-md dark:shadow-lg flex flex-col gap-4">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Enter text to generate audio
          </label>
          <div className="w-full rounded-lg border border-border bg-background/60 dark:bg-background/70 px-3 py-2 text-sm text-foreground">
            <div
              ref={editableDivRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleEditableDivChange}
              onPaste={(e) => {
                e.preventDefault()
                const pasted = e.clipboardData.getData("text/plain")
                const selection = window.getSelection()
                if (selection && selection.rangeCount > 0) {
                  const range = selection.getRangeAt(0)
                  range.deleteContents()
                  range.insertNode(document.createTextNode(pasted))
                  range.collapse(false)
                  selection.removeAllRanges()
                  selection.addRange(range)
                  handleEditableDivChange()
                }
              }}
              className="w-full max-h-40 min-h-[80px] resize-none border-0 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground overflow-y-auto custom-scrollbar [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground"
              data-placeholder="Type what you want the voice to say..."
            />
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`text-xs ${
                text.length > 2000 ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              {text.length} / 2000
            </span>
            {usage && (
              <span className="text-xs text-muted-foreground">
                Free quota:{" "}
                <span className="font-medium text-foreground">
                  {usage.remaining_free.toLocaleString()}
                </span>{" "}
                / {usage.daily_limit.toLocaleString()} chars
              </span>
            )}
          </div>
        </div>

        {/* Controls row: Emotion, Settings, Pause */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Emotion Select */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-1 sm:gap-1.5 h-8 px-2 text-xs flex-shrink-0 min-w-0"
              >
                <span className="text-sm flex-shrink-0">😊</span>
                <span className="text-xs truncate">{emotion}</span>
                <FiChevronRight className="h-3 w-3 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {["Neutral", "Happy", "Sad", "Angry", "Fearful", "Disgusted", "Surprised"].map((emo) => (
                <DropdownMenuItem
                  key={emo}
                  onClick={() => setEmotion(emo)}
                  className={emotion === emo ? "bg-primary text-primary-foreground" : ""}
                >
                  {emo}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings (Speed, Volume, Pitch) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <FiSettings className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-4">
              <div className="space-y-4">
                {/* Speed */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Speed: {speed[0]}</Label>
                  </div>
                  <Slider value={speed} onValueChange={setSpeed} min={0} max={2} step={0.1} />
                </div>

                {/* Volume */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Volume: {volume[0]}</Label>
                  </div>
                  <Slider value={volume} onValueChange={setVolume} min={0} max={10} step={1} />
                </div>

                {/* Pitch */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Pitch: {pitch[0]}</Label>
                  </div>
                  <Slider value={pitch} onValueChange={setPitch} min={-12} max={12} step={1} />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Pause Button */}
          <Popover open={pausePopoverOpen} onOpenChange={setPausePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <FiClock className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    const newValue = Math.max(0.1, parseFloat((pauseSeconds - 0.1).toFixed(1)))
                    setPauseSeconds(newValue)
                  }}
                  disabled={pauseSeconds <= 0.1}
                >
                  <FiMinus className="h-3 w-3" />
                </Button>
                <div className="flex items-center gap-2 min-w-[50px] justify-center">
                  <span className="text-sm font-medium">
                    {formatPauseSeconds(pauseSeconds)}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    const newValue = Math.min(2, parseFloat((pauseSeconds + 0.1).toFixed(1)))
                    setPauseSeconds(newValue)
                  }}
                  disabled={pauseSeconds >= 2}
                >
                  <FiPlus className="h-3 w-3" />
                </Button>
                <div className="text-xs text-muted-foreground px-2">Seconds Pause</div>
                <Button
                  type="button"
                  size="sm"
                  className="h-7 px-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleInsertPause}
                >
                  Insert
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Audio Result */}
        {ttsLoading ? (
          <div className="flex items-center justify-center w-full min-h-[140px] border-2 border-dashed border-border/60 rounded-lg bg-card/60">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto">
                <FiLoader className="w-5 h-5 text-primary animate-spin" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Generating audio...
              </p>
              <p className="text-xs text-muted-foreground">
                This may take a few moments
              </p>
            </div>
          </div>
        ) : audioUrl && audioBlob ? (
          <div className="relative w-full min-h-[140px] rounded-lg border border-border/60 bg-card/70 p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FiMusic className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    Generated Audio
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {audioDuration > 0
                      ? `${Math.ceil(audioDuration)}s`
                      : "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0">
              <AudioWaveform
                audioBlob={audioBlob}
                audioUrl={audioUrl}
                isPlaying={isPlaying}
                playbackPosition={playbackPosition}
                duration={audioDuration}
                className="h-16 sm:h-20"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 px-3"
                  onClick={handleTogglePlayback}
                >
                  {isPlaying ? (
                    <FiPause className="mr-2 h-3 w-3" />
                  ) : (
                    <FiPlay className="mr-2 h-3 w-3" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 px-3"
                  onClick={handleDownload}
                >
                  <FiDownload className="mr-2 h-3 w-3" />
                  Download
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">
                {Math.floor(playbackPosition)}s /{" "}
                {audioDuration > 0 ? Math.ceil(audioDuration) : 0}s
              </span>
            </div>
          </div>
        ) : null}

        {/* Generate Button */}
        <div className="pt-1">
          <Button
            type="button"
            className="w-full h-10 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-md dark:shadow-lg"
            onClick={handleGenerate}
            disabled={ttsLoading || !text.trim()}
          >
            {ttsLoading ? "Generating..." : "Generate Audio"}
          </Button>
        </div>
      </div>
    </div>
  )
}


// Local AudioWaveform copy (do not depend on external component)
interface LocalAudioWaveformProps {
  audioBlob: Blob | File | null
  audioUrl: string | null
  isPlaying?: boolean
  playbackPosition?: number
  duration?: number
  className?: string
}

const AudioWaveform = ({
  audioBlob,
  audioUrl,
  isPlaying = false,
  playbackPosition = 0,
  duration = 0,
  className = "",
}: LocalAudioWaveformProps) => {
  const [waveformData, setWaveformData] = useState<number[]>([])

  useEffect(() => {
    if (!audioBlob && !audioUrl) {
      setWaveformData([])
      return
    }

    const generateWaveform = async () => {
      let audioContext: AudioContext | null = null
      try {
        if (typeof window === "undefined" || typeof AudioContext === "undefined") {
          setWaveformData(Array.from({ length: 100 }, () => 40))
          return
        }

        audioContext = new AudioContext()

        let arrayBuffer: ArrayBuffer
        if (audioBlob) {
          arrayBuffer = await audioBlob.arrayBuffer()
        } else if (audioUrl) {
          const res = await fetch(audioUrl)
          arrayBuffer = await res.arrayBuffer()
        } else {
          setWaveformData([])
          return
        }

        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        const rawData = audioBuffer.getChannelData(0)
        const samples = 100
        const blockSize = Math.floor(rawData.length / samples) || 1
        const filteredData: number[] = []

        for (let i = 0; i < samples; i++) {
          let sum = 0
          let count = 0
          for (
            let j = 0;
            j < blockSize && i * blockSize + j < rawData.length;
            j++
          ) {
            sum += Math.abs(rawData[i * blockSize + j])
            count++
          }
          filteredData.push(count > 0 ? sum / count : 0)
        }

        const max = Math.max(...filteredData, 0.00001)
        const normalized =
          max > 0
            ? filteredData.map((n) => Math.max((n / max) * 100, 10))
            : filteredData.map(() => 40)

        setWaveformData(normalized)
      } catch (error) {
        console.error("Error generating waveform:", error)
        setWaveformData(Array.from({ length: 100 }, () => 40))
      } finally {
        if (audioContext) {
          audioContext.close()
        }
      }
    }

    generateWaveform()
  }, [audioBlob, audioUrl])

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-end gap-0.5 h-full w-full px-2">
          {waveformData.length > 0 ? (
            waveformData.map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-primary rounded-t transition-all"
                style={{
                  height: `${Math.max(height, 10)}%`,
                  minHeight: "3px",
                }}
              />
            ))
          ) : (
            Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-border/50 rounded-t"
                style={{
                  height: "20%",
                  minHeight: "3px",
                }}
              />
            ))
          )}
        </div>
      </div>
      {isPlaying && duration > 0 && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
          style={{
            left: `${Math.min((playbackPosition / duration) * 100, 100)}%`,
          }}
        />
      )}
    </div>
  )
}

