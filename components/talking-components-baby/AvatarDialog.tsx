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
  size: string
  imageUrl: string
}

interface AvatarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  aspectRatio: "9:16" | "16:9"
  selectedCategory: string | null
  onSelectAvatar: (url: string) => void
  onAspectRatioChange?: (aspectRatio: "9:16" | "16:9") => void
}

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
        const response = await fetch("/babypodcast/avatars.json")
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

  // Filter avatars by size (aspect ratio)
  const filteredAvatars = useMemo(() => {
    return avatars.filter((avatar) => avatar.size === dialogAspectRatio)
  }, [avatars, dialogAspectRatio])

  const handleAspectRatioChange = (newAspectRatio: "9:16" | "16:9") => {
    setDialogAspectRatio(newAspectRatio)
    if (onAspectRatioChange) {
      onAspectRatioChange(newAspectRatio)
    }
  }

  const handleAvatarClick = (url: string) => {
    setSelectedAvatarUrl(url)
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

        {/* Aspect Ratio Toggle */}
        <div className="flex items-center justify-end gap-4 mb-4 pb-4 border-b border-border/50">
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
              {filteredAvatars.map((avatar, index) => {
                const filename = avatar.imageUrl.split("/").pop()?.split("?")[0] || "avatar"
                return (
                  <button
                    key={`${avatar.imageUrl}-${index}`}
                    type="button"
                    onClick={() => handleAvatarClick(avatar.imageUrl)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-colors bg-muted/20 ${
                      selectedAvatarUrl === avatar.imageUrl
                        ? "border-primary bg-primary/10 dark:bg-primary/20"
                        : "border-border/50 dark:border-[#5a5a5a] hover:border-primary/50 dark:hover:border-primary/50"
                    } ${
                      dialogAspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"
                    }`}
                  >
                    <img
                      src={avatar.imageUrl}
                      alt={filename}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
              })}
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

