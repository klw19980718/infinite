"use client"

import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AudioWaveform } from "./AudioWaveform"
import { FiMic, FiMusic, FiPause, FiPlay, FiTrash2 } from "react-icons/fi"
import React from "react"

export interface RecordAudioTabProps {
  recordedAudioBlob: Blob | null
  recordedAudioUrl: string | null
  recordedDuration: number
  resolution: "fast" | "480p" | "720p"
  isPlayingRecorded: boolean
  playbackPosition: number
  onStartRecord: () => void
  onReRecord: () => void
  onClearRecorded: () => void
  onTogglePlayback: () => void
}

export const RecordAudioTab: React.FC<RecordAudioTabProps> = ({
  recordedAudioBlob,
  recordedAudioUrl,
  recordedDuration,
  resolution,
  isPlayingRecorded,
  playbackPosition,
  onStartRecord,
  onReRecord,
  onClearRecorded,
  onTogglePlayback,
}) => {
  return (
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
              onClick={onStartRecord}
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
                  {Math.ceil(recordedDuration)}s • ~
                  {Math.ceil(
                    recordedDuration * (resolution === "fast" ? 0.5 : resolution === "480p" ? 1 : 2),
                  )}{" "}
                  credits
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={onReRecord}
              >
                <FiMic className="mr-1 h-3 w-3" /> Re-record
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={onClearRecorded}
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
              onClick={onTogglePlayback}
            >
              {isPlayingRecorded ? <FiPause className="mr-2 h-3 w-3" /> : <FiPlay className="mr-2 h-3 w-3" />}
              {isPlayingRecorded ? "Pause" : "Play"}
            </Button>
            <span className="text-xs text-muted-foreground">
              {Math.floor(playbackPosition)}s / {Math.ceil(recordedDuration)}s
            </span>
          </div>
        </div>
      )}
    </TabsContent>
  )
}


