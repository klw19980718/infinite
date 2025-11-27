 "use client"

import { FiX, FiCheck, FiGift } from "react-icons/fi"
import { toast } from "sonner"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { TalkingPhotoLayout } from "@/components/talking-components/TalkingPhotoLayout"

export const AuroraHero = () => {
  const pathname = usePathname()
  
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Content container - centered layout */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col items-center justify-center py-32 md:py-40">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-10 md:space-y-12">
            {/* Title - Apple-style large and bold */}
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-accent leading-[1.1] tracking-tight">
            Infinite Talk AI — Sparse-Frame Video Dubbing Engine
            </h1>
            
            {/* Description - Larger, more readable */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-6xl mx-auto font-light">
            Audio-driven, sparse-frame video dubbing that turns images or footage into identity-stable talking video. A streaming generator scales to effectively infinite sequences, syncing lips, head motion, posture, and expressions to speech while preserving the original camera feel.
            </p>

            {/* Learn More Link */}
            <Link
              href="/lib/sparse-frame-video-dubbing"
              className="text-sm text-muted-foreground/70 hover:text-accent/80 transition-colors inline-flex items-center gap-1 group"
            >
              Learn how sparse-frame video dubbing works
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
            </Link>

            {/* New User Bonus Credit Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl backdrop-blur-sm">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                <FiGift className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <p className="text-sm md:text-base font-medium text-orange-500">
                New users get <span className="font-bold">10 free credits</span> to get started!
              </p>
            </div>

            {/* Anchor Tab Links */}
            <div className="pt-4">
              <div className="inline-flex h-14 items-center px-2 gap-2 bg-muted/50 border border-border/50 rounded-lg">
                <Link
                  href="/"
                  className={`px-6 py-3 flex items-center text-base font-semibold rounded-md transition-all ${
                    pathname === "/"
                      ? "bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
                      : "text-foreground hover:text-accent"
                  }`}
                >
                  infinitetalk photo
                </Link>
                <Link
                  href="/infinite-talk-ai/video-to-video"
                  className={`px-6 py-3 flex items-center text-base font-semibold rounded-md transition-all ${
                    pathname === "/infinite-talk-ai/video-to-video"
                      ? "bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
                      : "text-foreground hover:text-accent"
                  }`}
                >
                  infinitetalk video
                </Link>
                <Link
                  href="/infinite-talk-ai/baby-podcast"
                  className={`px-6 py-3 flex items-center text-base font-semibold rounded-md transition-all ${
                    pathname === "/infinite-talk-ai/baby-podcast"
                      ? "bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
                      : "text-foreground hover:text-accent"
                  }`}
                >
                  baby podcast
                </Link>
              </div>
            </div>
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
