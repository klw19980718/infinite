"use client"

import { FiX, FiCheck } from "react-icons/fi"
import { toast } from "sonner"
import { TalkingPhotoLayout } from "./TalkingPhotoLayout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const ImageToVideoHero = () => {

  return (
    <section className="relative min-h-screen overflow-hidden py-32">
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-accent/30">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </div>
                  <span className="text-foreground text-base font-semibold">Talking Photo Generator</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-4 whitespace-nowrap">
                  <span className="text-accent">Infinite Talk AI</span>
                  <span className="text-foreground"> — Talking Photo Generator</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto text-pretty px-4 font-light">
                  Bring your talking photos to life with natural, expressive audio sync. Infinite Talk AI lets your photos speak with unlimited, natural video creation.
                </p>

                {/* Anchor Tab Links */}
                <Tabs defaultValue="photo-talking" className="pt-4">
                  <TabsList>
                    <TabsTrigger value="photo-talking" onClick={() => {
                      const element = document.getElementById('photo-talking')
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}>
                      Photo Talking
                    </TabsTrigger>
                    <TabsTrigger value="video-lip-sync" onClick={() => {
                      const element = document.getElementById('video-lip-sync')
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}>
                      Video Lip Sync
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
          </div>

          {/* Main Content: New Layout */}
          <div id="photo-talking" className="mb-16">
            <TalkingPhotoLayout
              onTaskCreated={() => {
                // Show success message and guide to profile
                toast.custom((t) => (
                  <div className="bg-background border border-border rounded-xl shadow-lg p-4 w-[350px] flex items-start gap-3 relative pointer-events-auto">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-[15px] leading-none mb-1.5">Create Success</h3>
                      <p className="text-muted-foreground text-[13px] leading-relaxed">
                        Close window won't stop generation. <br />
                        Check progress in <button onClick={() => window.location.href = '/profile'} className="text-blue-500 hover:text-blue-600 font-medium hover:underline">My Creations</button>
                      </p>
                    </div>
                    <button onClick={() => toast.dismiss(t)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
                      <FiX className="w-4 h-4" />
                        </button>
                  </div>
                ), {
                  duration: Infinity,
                })
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}