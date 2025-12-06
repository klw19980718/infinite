"use client"

import { FiX, FiCheck } from "react-icons/fi"
import { toast } from "sonner"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { TalkingPhotoLayout } from "@/components/talking-components/TalkingPhotoLayout"

export default function ImageToVideoPage() {
  const pathname = usePathname()
  
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28 pb-20 md:pb-28">
      {/* Content container - centered layout */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center md:items-start justify-center gap-12 md:gap-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:space-y-10">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight tracking-tight">
              Infinite Talk AI
              <span className="block text-primary">
                Sparse-frame video dubbing engine
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto md:mx-0 font-normal">
              Turn any image or video into a long-form, lip-synced talking clip with stable identity and natural motion.
            </p>

            {/* Anchor Tab Links */}
            <div className="pt-4">
              <div className="inline-flex h-12 sm:h-14 items-center px-1.5 sm:px-2 gap-1.5 sm:gap-2 bg-muted/50 border border-border/60 rounded-full">
                <Link
                  href="/infinite-talk-ai/image-to-video"
                  className={`px-4 sm:px-6 py-2 sm:py-3 flex items-center text-xs sm:text-sm font-semibold rounded-full transition-all ${
                    pathname === "/infinite-talk-ai/image-to-video"
                      ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  infinitetalk photo
                </Link>
                <Link
                  href="/infinite-talk-ai/video-to-video"
                  className={`px-4 sm:px-6 py-2 sm:py-3 flex items-center text-xs sm:text-sm font-semibold rounded-full transition-all ${
                    pathname === "/infinite-talk-ai/video-to-video"
                      ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  infinitetalk video
                </Link>
                <Link
                  href="/infinite-talk-ai/baby-podcast"
                  className={`px-4 sm:px-6 py-2 sm:py-3 flex items-center text-xs sm:text-sm font-semibold rounded-full transition-all ${
                    pathname === "/infinite-talk-ai/baby-podcast"
                      ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                      : "text-foreground hover:text-primary"
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

