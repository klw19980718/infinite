"use client"

import { useState, useEffect } from "react"

interface AudioWaveformProps {
  audioBlob: Blob | File | null
  audioUrl: string | null
  isPlaying?: boolean
  playbackPosition?: number
  duration?: number
  className?: string
}

export const AudioWaveform = ({
  audioBlob,
  audioUrl,
  isPlaying = false,
  playbackPosition = 0,
  duration = 0,
  className = "",
}: AudioWaveformProps) => {
  const [waveformData, setWaveformData] = useState<number[]>([])

  // Generate waveform data from audio
  useEffect(() => {
    if (audioBlob) {
      const generateWaveform = async () => {
        try {
          const audioContext = new AudioContext()
          const arrayBuffer = await audioBlob.arrayBuffer()
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
          
          const rawData = audioBuffer.getChannelData(0) // Get first channel
          const samples = 100 // Number of bars to show
          const blockSize = Math.floor(rawData.length / samples)
          const filteredData: number[] = []
          
          for (let i = 0; i < samples; i++) {
            let sum = 0
            let count = 0
            for (let j = 0; j < blockSize && (i * blockSize + j) < rawData.length; j++) {
              sum += Math.abs(rawData[i * blockSize + j])
              count++
            }
            filteredData.push(count > 0 ? sum / count : 0)
          }
          
          // Normalize data to 0-100 range
          const max = Math.max(...filteredData)
          const normalized = max > 0 
            ? filteredData.map(n => Math.max((n / max) * 100, 10)) // Minimum 10% height
            : filteredData.map(() => 10) // Default minimum height
          
          setWaveformData(normalized)
          audioContext.close()
        } catch (error) {
          console.error("Error generating waveform:", error)
          // Fallback to placeholder data if analysis fails
          setWaveformData(Array.from({ length: 100 }, () => Math.random() * 40 + 20))
        }
      }
      
      generateWaveform()
    } else {
      setWaveformData([])
    }
  }, [audioBlob])

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
      {/* Progress indicator line */}
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

