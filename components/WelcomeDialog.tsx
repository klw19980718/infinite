"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Coins } from "lucide-react"

const WELCOME_DIALOG_KEY = "welcome_dialog_shown"

export default function WelcomeDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has seen the welcome dialog
    const hasSeenDialog = localStorage.getItem(WELCOME_DIALOG_KEY)
    
    // Only show if user hasn't seen it before
    if (!hasSeenDialog) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        setOpen(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    // Mark as seen in localStorage
    localStorage.setItem(WELCOME_DIALOG_KEY, "true")
  }

  const handleGetStarted = () => {
    handleClose()
    router.push("/infinite-talk-ai/talking-photo")
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleClose()
      }
    }}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl p-0 overflow-hidden">
        <div className="relative">
          {/* SVG Image Section */}
          <div className="relative w-full h-64 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <div className="relative w-full h-full max-w-md">
              <Image
                src="/svg/gifts.svg"
                alt="Welcome Gift"
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            <DialogHeader className="text-center space-y-3">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome to Infinite Talk AI!
              </DialogTitle>
              <DialogDescription className="text-base sm:text-lg text-muted-foreground">
                Get started with <span className="font-semibold text-primary">10 free credits</span> to create amazing talking photos
              </DialogDescription>
            </DialogHeader>

            {/* Credits Display */}
            <div className="flex items-center justify-center gap-2 mt-6 mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <Coins className="h-6 w-6 text-primary" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">10</span>
                <span className="text-sm text-muted-foreground">Free Credits</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleGetStarted}
                className="w-full rounded-full py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                size="lg"
              >
                Get Started Now
              </Button>
              <Button
                onClick={handleClose}
                variant="ghost"
                className="w-full rounded-full py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

