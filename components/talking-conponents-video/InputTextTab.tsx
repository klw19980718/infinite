"use client"

import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
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
import { AudioWaveform } from "./AudioWaveform"
import {
  FiLoader,
  FiMusic,
  FiPause,
  FiPlay,
  FiChevronRight,
  FiSettings,
  FiClock,
  FiMinus,
  FiPlus,
  FiCheck,
  FiTrash2,
} from "react-icons/fi"
import React from "react"

// Local helper for formatting pause seconds
const formatPauseSeconds = (seconds: number): string => {
  return parseFloat(seconds.toFixed(1)).toString()
}

export interface InputTextTabProps {
  ttsLoading: boolean
  ttsAudioUrl: string | null
  ttsAudioDuration: number
  ttsAudioBlob: Blob | null
  isPlayingTts: boolean
  ttsPlaybackPosition: number
  inputText: string
  editableDivRef: React.RefObject<HTMLDivElement | null>
  onEditableDivChange: () => void
  onOpenVoiceDialog: () => void
  selectedVoiceName: string
  emotion: string
  onEmotionChange: (value: string) => void
  speed: number[]
  onSpeedChange: (value: number[]) => void
  volume: number[]
  onVolumeChange: (value: number[]) => void
  pitch: number[]
  onPitchChange: (value: number[]) => void
  pauseSeconds: number
  setPauseSeconds: (value: number) => void
  pausePopoverOpen: boolean
  setPausePopoverOpen: (open: boolean) => void
  onInsertPause: () => void
  onToggleTtsPlayback: () => void
  onDeleteTtsAudio: () => void
  onRunTts: () => void
  ttsUsage: {
    characters_used: number
    remaining_free: number
    daily_limit: number
  } | null
}

export const InputTextTab: React.FC<InputTextTabProps> = ({
  ttsLoading,
  ttsAudioUrl,
  ttsAudioDuration,
  ttsAudioBlob,
  isPlayingTts,
  ttsPlaybackPosition,
  inputText,
  editableDivRef,
  onEditableDivChange,
  onOpenVoiceDialog,
  selectedVoiceName,
  emotion,
  onEmotionChange,
  speed,
  onSpeedChange,
  volume,
  onVolumeChange,
  pitch,
  onPitchChange,
  pauseSeconds,
  setPauseSeconds,
  pausePopoverOpen,
  setPausePopoverOpen,
  onInsertPause,
  onToggleTtsPlayback,
  onDeleteTtsAudio,
  onRunTts,
  ttsUsage,
}) => {
  return (
    <TabsContent value="input" className="flex-1 flex flex-col min-h-0 mt-0">
      {ttsLoading ? (
        // Loading state
        <div
          key="loading"
          className="flex items-center justify-center w-full flex-1 min-h-[200px] border-2 border-dashed border-border/50 rounded-lg bg-card/50 dark:bg-card"
        >
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto">
              <FiLoader className="w-6 h-6 text-primary animate-spin" />
            </div>
            <p className="text-sm font-medium text-foreground">Generating audio...</p>
            <p className="text-xs text-muted-foreground">This may take a few moments</p>
          </div>
        </div>
      ) : ttsAudioUrl ? (
        // Audio result state (same layout as upload tab)
        <div
          key="result"
          className="relative w-full flex-1 min-h-[200px] rounded-lg border border-border/50 bg-card/50 dark:bg-card p-4 flex flex-col"
        >
          {/* Top: Audio Info and Actions */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                <FiMusic className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">TTS Audio</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {ttsAudioDuration > 0 ? `${Math.ceil(ttsAudioDuration)}s` : "Loading..."}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={onDeleteTtsAudio}
              >
                <FiTrash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Middle: Waveform - Takes remaining space */}
          <div className="flex-1 min-h-0 mb-3">
            {ttsAudioBlob ? (
              <AudioWaveform
                audioBlob={ttsAudioBlob}
                audioUrl={ttsAudioUrl}
                isPlaying={isPlayingTts}
                playbackPosition={ttsPlaybackPosition}
                duration={ttsAudioDuration}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">Loading audio waveform...</p>
              </div>
            )}
          </div>

          {/* Bottom: Playback Controls */}
          <div className="flex items-center justify-between flex-shrink-0">
            <Button type="button" variant="outline" size="sm" className="h-8 px-3" onClick={onToggleTtsPlayback}>
              {isPlayingTts ? <FiPause className="mr-2 h-3 w-3" /> : <FiPlay className="mr-2 h-3 w-3" />}
              {isPlayingTts ? "Pause" : "Play"}
            </Button>
            <span className="text-xs text-muted-foreground">
              {Math.floor(ttsPlaybackPosition)}s / {ttsAudioDuration > 0 ? Math.ceil(ttsAudioDuration) : 0}s
            </span>
          </div>
        </div>
      ) : (
        // Input state
        <div
          key="input"
          className="flex-1 min-h-[200px] rounded-lg border border-border/50 bg-card/50 dark:bg-card p-4 flex flex-col"
        >
          {/* Editable Div (replacing Textarea) */}
          <div className="flex-shrink-0 mb-4" style={{ height: "130px" }}>
            <div
              key="editable-div"
              ref={editableDivRef}
              contentEditable
              suppressContentEditableWarning
              onInput={onEditableDivChange}
              onPaste={(e) => {
                e.preventDefault()
                const text = e.clipboardData.getData("text/plain")
                const selection = window.getSelection()
                if (selection && selection.rangeCount > 0) {
                  const range = selection.getRangeAt(0)
                  range.deleteContents()
                  range.insertNode(document.createTextNode(text))
                  range.collapse(false)
                  selection.removeAllRanges()
                  selection.addRange(range)
                  onEditableDivChange()
                }
              }}
              className="w-full h-full resize-none border-0 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground overflow-y-auto custom-scrollbar [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground"
              data-placeholder="Type what you want to say..."
            />
          </div>

          {/* Character Counter and Bottom Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 flex-shrink-0 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap min-w-0">
              {/* Voice Select */}
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-1 sm:gap-1.5 h-7 sm:h-8 px-1.5 sm:px-2 text-xs flex-shrink-0 min-w-0"
                onClick={onOpenVoiceDialog}
              >
                <FiMusic className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                <span className="text-xs truncate">{selectedVoiceName}</span>
              </Button>

              {/* Emotion Select */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-1 sm:gap-1.5 h-7 sm:h-8 px-1.5 sm:px-2 text-xs flex-shrink-0 min-w-0"
                  >
                    <span className="text-sm sm:text-base flex-shrink-0">😊</span>
                    <span className="text-xs truncate">{emotion}</span>
                    <FiChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {["Neutral", "Happy", "Sad", "Angry", "Fearful", "Disgusted", "Surprised"].map((emo) => (
                    <DropdownMenuItem
                      key={emo}
                      onClick={() => onEmotionChange(emo)}
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
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
                  >
                    <FiSettings className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-4">
                  <div className="space-y-4">
                    {/* Speed */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Speed: {speed[0]}</Label>
                      </div>
                      <Slider value={speed} onValueChange={onSpeedChange} min={0} max={2} step={0.1} />
                    </div>

                    {/* Volume */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Volume: {volume[0]}</Label>
                      </div>
                      <Slider value={volume} onValueChange={onVolumeChange} min={0} max={10} step={1} />
                    </div>

                    {/* Pitch */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Pitch: {pitch[0]}</Label>
                      </div>
                      <Slider value={pitch} onValueChange={onPitchChange} min={-12} max={12} step={1} />
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
                    className="h-7 sm:h-8 px-1.5 sm:px-2 flex-shrink-0"
                  >
                    <FiClock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
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
                      <span className="text-sm font-medium">{formatPauseSeconds(pauseSeconds)}</span>
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
                      onClick={onInsertPause}
                    >
                      <FiCheck className="h-3 w-3" />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Run Button */}
              <Button
                type="button"
                className="h-7 sm:h-8 px-2 sm:px-3 text-xs bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0"
                onClick={onRunTts}
                disabled={!inputText.trim()}
              >
                Run
              </Button>
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0 text-right sm:text-left">
              {inputText.length} / 1000
            </span>
          </div>

          {/* TTS Free Quota Display - Separate row */}
          {ttsUsage && (
            <div className="flex-shrink-0 pt-2 border-t border-border/50">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-xs text-muted-foreground">Daily Free Quota</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">
                    {ttsUsage.remaining_free.toLocaleString()} / {ttsUsage.daily_limit.toLocaleString()} chars
                  </span>
                  {ttsUsage.remaining_free === 0 && (
                    <span className="text-xs text-orange-500 font-medium">(Paid)</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </TabsContent>
  )
}


