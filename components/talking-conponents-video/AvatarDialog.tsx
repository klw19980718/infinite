"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Avatar {
  tagList: string[]
  videoUrl: string
  preview_image_url: string
}

interface AvatarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  aspectRatio: "9:16" | "16:9"
  selectedCategory: string | null
  onSelectAvatar: (url: string) => void
  onAspectRatioChange?: (aspectRatio: "9:16" | "16:9") => void
}

const categories = ["All", "halloween", "lifestyle", "outdoors", "business", "studio", "health & fitness", "education", "news"]

export const AvatarDialog = ({
  open,
  onOpenChange,
  aspectRatio,
  selectedCategory,
  onSelectAvatar,
  onAspectRatioChange,
}: AvatarDialogProps) => {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || "All")
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string | null>(null)
  const [dialogAspectRatio, setDialogAspectRatio] = useState<"9:16" | "16:9">(aspectRatio)

  useEffect(() => {
    const loadAvatars = async () => {
      // Avoid refetching avatars if already loaded
      if (avatars.length > 0) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch("/video-to-video/avatar.json")
        const data = await response.json()
        setAvatars(data)
      } catch (error) {
        console.error("Failed to load avatars:", error)
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      loadAvatars()
    }
  }, [open, avatars.length])

  // Update dialog aspect ratio when prop changes
  useEffect(() => {
    setDialogAspectRatio(aspectRatio)
  }, [aspectRatio])

  // Filter avatars by category and aspect ratio
  const filteredAvatars = useMemo(() => {
    let filtered = avatars

    // Filter by category (based on tagList)
    if (activeCategory !== "All") {
      filtered = filtered.filter((avatar) => avatar.tagList.includes(activeCategory))
    }

    // Filter by aspect ratio (tagList contains "9:16" or "16:9")
    filtered = filtered.filter((avatar) => {
      const ratioTag = avatar.tagList.find((tag) => tag === "9:16" || tag === "16:9")
      return ratioTag === dialogAspectRatio
    })

    return filtered
  }, [avatars, activeCategory, dialogAspectRatio])

  const handleAspectRatioChange = (newAspectRatio: "9:16" | "16:9") => {
    setDialogAspectRatio(newAspectRatio)
    if (onAspectRatioChange) {
      onAspectRatioChange(newAspectRatio)
    }
  }

  const handleAvatarClick = (videoUrl: string) => {
    setSelectedAvatarUrl(videoUrl)
  }

  const handleConfirm = () => {
    if (selectedAvatarUrl) {
      onSelectAvatar(selectedAvatarUrl)
      onOpenChange(false)
      setSelectedAvatarUrl(null)
    }
  }

  // Reset selected avatar when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedAvatarUrl(null)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Avatar</DialogTitle>
        </DialogHeader>

        {/* Category Tabs - Horizontal Layout */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-border/50">
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            {/* All Button */}
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === "All"
                  ? "bg-primary/20 dark:bg-primary/30 text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              All
            </button>
            
            {/* Category Labels */}
            {categories.slice(1).map((category) => (
              <div key={category} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeCategory === category
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
                {category === "halloween" && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-semibold text-red-500 bg-red-500/10 rounded leading-none">
                    NEW
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Aspect Ratio Toggle */}
          <div className="flex items-center gap-1 border border-border/50 rounded-lg overflow-hidden flex-shrink-0">
            <button
              type="button"
              onClick={() => handleAspectRatioChange("9:16")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                dialogAspectRatio === "9:16"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/50 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              9:16
            </button>
            <button
              type="button"
              onClick={() => handleAspectRatioChange("16:9")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                dialogAspectRatio === "16:9"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/50 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              16:9
            </button>
          </div>
        </div>

        {/* Avatar Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading avatars...</p>
            </div>
          ) : (
            <div
              className={`grid gap-3 ${
                dialogAspectRatio === "9:16" ? "grid-cols-6" : "grid-cols-4"
              }`}
            >
              {filteredAvatars.map((avatar, index) => (
                <button
                  key={`${avatar.videoUrl}-${index}`}
                  type="button"
                  onClick={() => handleAvatarClick(avatar.videoUrl)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-colors bg-muted/20 ${
                    selectedAvatarUrl === avatar.videoUrl
                      ? "border-primary bg-primary/10 dark:bg-primary/20"
                      : "border-border/50 dark:border-[#5a5a5a] hover:border-primary/50 dark:hover:border-primary/50"
                  } ${
                    dialogAspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"
                  }`}
                >
                  {selectedAvatarUrl === avatar.videoUrl ? (
                    <video
                      src={avatar.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={avatar.preview_image_url}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={avatar.preview_image_url}
                      alt={avatar.videoUrl.split("/").pop() || "template"}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end pt-4 border-t border-border/50">
          <Button
            onClick={handleConfirm}
            disabled={!selectedAvatarUrl}
            className="min-w-[120px] h-11 text-base font-semibold sm:min-w-[140px] sm:h-12"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

