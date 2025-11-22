 "use client"

import { FiX, FiCheck } from "react-icons/fi"
import { toast } from "sonner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TalkingPhotoLayout } from "@/components/image-to-video/TalkingPhotoLayout"

export const AuroraHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Content container - centered layout */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col items-center justify-center py-32 md:py-40">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-10 md:space-y-12">
            {/* Title - Apple-style large and bold */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent leading-[1.1] tracking-tight">
              Infinite Talk AI
            </h1>
            
            {/* Description - Larger, more readable */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
              Audio-driven, whole-frame dubbing that turns images or footage into identity-stable talking video. It enables infinite-length generation—syncing lips, head motion, posture, and expressions to speech for natural continuity.
            </p>

            {/* Anchor Tab Links (from image-to-video hero) */}
            <Tabs defaultValue="photo-talking" className="pt-4">
              <TabsList className="h-14 px-2 gap-2 bg-muted/50 border border-border/50">
                <TabsTrigger
                  value="photo-talking"
                  onClick={() => {
                    const element = document.getElementById("photo-talking")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="px-6 py-3 text-base font-semibold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg hover:text-accent transition-all"
                >
                  Photo Talking
                </TabsTrigger>
                <TabsTrigger
                  value="video-lip-sync"
                  onClick={() => {
                    const element = document.getElementById("video-lip-sync")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="px-6 py-3 text-base font-semibold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg hover:text-accent transition-all"
                >
                  Video Lip Sync
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main Content: Talking Photo generator layout */}
        <div className="w-full max-w-6xl mx-auto mt-12">
          <div id="photo-talking" className="mb-16">
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
    </section>
  )
}
