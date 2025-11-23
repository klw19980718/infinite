"use client"

import { TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AudioWaveform } from "./AudioWaveform"
import { FiMusic, FiUpload, FiPause, FiPlay, FiTrash2 } from "react-icons/fi"
import React from "react"

export interface UploadAudioTabProps {
  audioFile: File | null
  audioFileName: string | null
  audioDuration: number | null
  estimatedCredits: number
  audioInputRef: React.RefObject<HTMLInputElement | null>
  uploadedAudioUrl: string | null
  isPlayingUploaded: boolean
  uploadedPlaybackPosition: number
  onAudioFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearAudio: () => void
  onTogglePlayback: () => void
}

export const UploadAudioTab: React.FC<UploadAudioTabProps> = ({
  audioFile,
  audioFileName,
  audioDuration,
  estimatedCredits,
  audioInputRef,
  uploadedAudioUrl,
  isPlayingUploaded,
  uploadedPlaybackPosition,
  onAudioFileChange,
  onClearAudio,
  onTogglePlayback,
}) => {
  return (
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
                <p className="text-xs text-muted-foreground">Supported formats: MP3, WAV, M4A, OGG, FLAC</p>
              </div>
            </div>
            <Input
              ref={audioInputRef}
              type="file"
              accept="audio/mpeg,audio/mp3,audio/wav,audio/wave,audio/x-wav,audio/mp4,audio/m4a,audio/ogg,audio/flac,audio/x-flac"
              onChange={onAudioFileChange}
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
              onClick={onTogglePlayback}
            >
              {isPlayingUploaded ? <FiPause className="mr-2 h-3 w-3" /> : <FiPlay className="mr-2 h-3 w-3" />}
              {isPlayingUploaded ? "Pause" : "Play"}
            </Button>
            <span className="text-xs text-muted-foreground">
              {Math.floor(uploadedPlaybackPosition)}s / {audioDuration !== null ? Math.ceil(audioDuration) : 0}s
            </span>
          </div>
        </div>
      )}
    </TabsContent>
  )
}


