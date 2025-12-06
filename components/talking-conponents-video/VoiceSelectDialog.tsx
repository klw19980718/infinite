"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiPlay, FiPause, FiCheck, FiX, FiChevronDown } from "react-icons/fi"

interface Voice {
  voice_name: string
  tag_list: string[]
  audiofile: string
  coverfile: string
  uniq_id: string
}

interface VoiceSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedVoiceId: string
  onSelect: (voiceId: string) => void
}

export const VoiceSelectDialog = ({
  open,
  onOpenChange,
  selectedVoiceId,
  onSelect,
}: VoiceSelectDialogProps) => {
  const [voices, setVoices] = useState<Voice[]>([])
  const [loading, setLoading] = useState(true)
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [selectedGender, setSelectedGender] = useState<string>("")
  const [selectedAge, setSelectedAge] = useState<string>("")
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map())

  // Language options
  const languages = ["English", "Chinese", "Mandarin", "Japanese", "Korean", "Spanish", "Portuguese", "French", "Indonesian", "German", "Russian", "Italian", "Dutch", "Vietnamese", "Arabic", "Turkish", "Ukrainian"]
  
  // Gender options
  const genders = ["Male", "Female"]
  
  // Age options
  const ages = ["Middle-Aged", "Young", "Adult", "Senior",]

  // Filter voices based on selected filters
  const filteredVoices = useMemo(() => {
    return voices.filter((voice) => {
      const tags = voice.tag_list.map(tag => tag.toLowerCase())
      
      // Language: fuzzy match (contains)
      if (selectedLanguage) {
        const languageLower = selectedLanguage.toLowerCase()
        const languageMatch = tags.some(tag => tag.includes(languageLower) || languageLower.includes(tag))
        if (!languageMatch) {
          return false
        }
      }
      
      // Gender: exact match
      if (selectedGender && !tags.includes(selectedGender.toLowerCase())) {
        return false
      }
      
      // Age: fuzzy match
      if (selectedAge) {
        const ageLower = selectedAge.toLowerCase()
        const ageMatch = tags.some(tag => {
          const tagLower = tag.toLowerCase()
          // Handle special cases
          if (ageLower === "middle-aged") {
            return tagLower.includes("middle") || tagLower.includes("middle-aged")
          }
          if (ageLower === "young adult") {
            return (tagLower.includes("young") && tagLower.includes("adult")) || tagLower === "young adult"
          }
          // General match
          return tagLower.includes(ageLower) || ageLower.includes(tagLower)
        })
        if (!ageMatch) {
          return false
        }
      }
      
      return true
    })
  }, [voices, selectedLanguage, selectedGender, selectedAge])

  useEffect(() => {
    if (open) {
      loadVoices()
    }
  }, [open])

  const loadVoices = async () => {
    // Avoid refetching voices if already loaded
    if (voices.length > 0) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/audio/voices.json")
      const data = await response.json()
      setVoices(data)
    } catch (error) {
      console.error("Failed to load voices:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlay = (voiceId: string, audioUrl: string) => {
    // Stop all other audio
    audioRefs.current.forEach((audio, id) => {
      if (id !== voiceId) {
        audio.pause()
        audio.currentTime = 0
      }
    })

    let audio = audioRefs.current.get(voiceId)
    if (!audio) {
      audio = new Audio(audioUrl)
      audioRefs.current.set(voiceId, audio)
      audio.addEventListener("ended", () => {
        setPlayingVoiceId(null)
      })
    }

    if (playingVoiceId === voiceId) {
      audio.pause()
      setPlayingVoiceId(null)
    } else {
      audio.play()
      setPlayingVoiceId(voiceId)
    }
  }

  const handleConfirm = () => {
    onSelect(selectedVoiceId)
    // Stop all audio
    audioRefs.current.forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })
    setPlayingVoiceId(null)
    onOpenChange(false)
  }

  const handleCancel = () => {
    // Stop all audio
    audioRefs.current.forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })
    setPlayingVoiceId(null)
    onOpenChange(false)
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      audioRefs.current.forEach((audio) => {
        audio.pause()
        audio.removeEventListener("ended", () => {})
      })
      audioRefs.current.clear()
    }
  }, [])

  const selectedVoice = voices.find((v) => v.uniq_id === selectedVoiceId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>Select Voice</DialogTitle>
        </DialogHeader>

        {/* Filter Section */}
        {!loading && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 pb-4 border-b border-border/50">
            {/* Language Filter */}
            <div className="flex-1 min-w-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between h-9 text-xs sm:text-sm text-muted-foreground"
                  >
                    <span className="truncate">{selectedLanguage || "Select Language"}</span>
                    <FiChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto custom-scrollbar">
                  <DropdownMenuItem
                    onClick={() => setSelectedLanguage("")}
                    className={selectedLanguage === "" ? "bg-primary text-primary-foreground" : ""}
                  >
                    All
                  </DropdownMenuItem>
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={selectedLanguage === lang ? "bg-primary text-primary-foreground" : ""}
                    >
                      {lang}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Gender Filter */}
            <div className="flex-1 min-w-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between h-9 text-xs sm:text-sm text-muted-foreground"
                  >
                    <span className="truncate">{selectedGender || "Select Gender"}</span>
                    <FiChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => setSelectedGender("")}
                    className={selectedGender === "" ? "bg-primary text-primary-foreground" : ""}
                  >
                    All
                  </DropdownMenuItem>
                  {genders.map((gender) => (
                    <DropdownMenuItem
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      className={selectedGender === gender ? "bg-primary text-primary-foreground" : ""}
                    >
                      {gender}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Age Filter */}
            <div className="flex-1 min-w-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between h-9 text-xs sm:text-sm text-muted-foreground"
                  >
                    <span className="truncate">{selectedAge || "Select Age"}</span>
                    <FiChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto custom-scrollbar">
                  <DropdownMenuItem
                    onClick={() => setSelectedAge("")}
                    className={selectedAge === "" ? "bg-primary text-primary-foreground" : ""}
                  >
                    All
                  </DropdownMenuItem>
                  {ages.map((age) => (
                    <DropdownMenuItem
                      key={age}
                      onClick={() => setSelectedAge(age)}
                      className={selectedAge === age ? "bg-primary text-primary-foreground" : ""}
                    >
                      {age}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-sm text-muted-foreground">Loading voices...</p>
          </div>
        ) : (
          <div className="flex-1 min-h-[300px] sm:min-h-[400px] max-h-[400px] overflow-y-auto custom-scrollbar py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {filteredVoices.map((voice) => {
                const isSelected = voice.uniq_id === selectedVoiceId
                const isPlaying = playingVoiceId === voice.uniq_id

                return (
                  <div
                    key={voice.uniq_id}
                    className={`relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all flex items-center gap-2 p-2 ${
                      isSelected
                        ? "border-primary bg-primary/10 dark:bg-primary/20"
                        : "border-border/50 dark:border-[#5a5a5a] hover:border-primary/50 dark:hover:border-primary/50 bg-card/50 dark:bg-card"
                    }`}
                    onClick={() => onSelect(voice.uniq_id)}
                  >
                    {/* Cover Image - Left */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden flex-shrink-0 relative">
                      <img
                        src={voice.coverfile}
                        alt={voice.voice_name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.style.display = "none"
                        }}
                      />
                      {isSelected && (
                        <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-primary flex items-center justify-center">
                          <FiCheck className="w-2 h-2 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Voice Info - Middle */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <h4 className="text-xs font-semibold text-foreground truncate">
                        {voice.voice_name}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {voice.tag_list.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-[#3a3a3a] text-muted-foreground border border-gray-200 dark:border-[#5a5a5a]/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Play Button - Right */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlay(voice.uniq_id, voice.audiofile)
                      }}
                    >
                      {isPlaying ? (
                        <FiPause className="h-3 w-3" />
                      ) : (
                        <FiPlay className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            <FiX className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="button" onClick={handleConfirm}>
            <FiCheck className="mr-2 h-4 w-4" />
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

