"use client"

import { FiX, FiCheck } from "react-icons/fi"
import { toast } from "sonner"
import { TalkingPhotoLayout } from "@/components/talking-conponents-video/TalkingPhotoLayout"

export const VideoToVideoHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden py-32">
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </div>
              <span className="text-foreground text-sm font-medium">Video-to-Video Generation</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance px-4">
              <span className="text-accent">
                Video-to-Video with Infinite Talk AI
              </span>
              <br />
              <span className="text-foreground">
                — Natural Lip Sync & Motion
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto text-pretty px-4">
              Transform any video into a lifelike talking clip with perfect lip sync. Infinite Talk AI pairs video-to-video generation with precise Lip Sync and natural expressions for creators, brands, and educators.
            </p>

            {/* Anchor Tab Links */}
            <div className="pt-4">
              <div className="inline-flex h-14 items-center px-2 gap-2 bg-muted/50 border border-border/50 rounded-lg">
                <a
                  href="/#photo-talking"
                  className="px-6 py-3 flex items-center text-base font-semibold text-foreground hover:text-accent transition-all rounded-md"
                >
                  infinitetalk photo
                </a>
                <a
                  href="#video-talking"
                  className="px-6 py-3 flex items-center text-base font-semibold bg-accent text-accent-foreground shadow-lg rounded-md hover:bg-accent/90 transition-all"
                >
                  infinitetalk video
                </a>
              </div>
            </div>
          </div>

          {/* Main Content: Video-to-Video generator layout */}
          <div className="w-full max-w-6xl mx-auto mt-12">
            <div id="video-talking">
              <TalkingPhotoLayout
              onTaskCreated={() => {
                // Show success message and guide to profile
                toast.custom(
                  (t) => (
                    <div className="bg-background border border-border rounded-xl shadow-lg p-4 w-[350px] flex items-start gap-3 relative pointer-events-auto">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <FiCheck className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-[15px] leading-none mb-1.5">
                          Create Success
                        </h3>
                        <p className="text-muted-foreground text-[13px] leading-relaxed">
                          Close window won't stop generation. <br />
                          Check progress in{" "}
                          <button
                            onClick={() => {
                              window.location.href = "/profile"
                            }}
                            className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
                          >
                            My Creations
                          </button>
                        </p>
                      </div>
                      <button
                        onClick={() => toast.dismiss(t)}
                        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ),
                  {
                    duration: Infinity,
                  },
                )
              }}
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}