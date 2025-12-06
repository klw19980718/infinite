"use client"

import { FiX, FiCheck } from "react-icons/fi"
import { toast } from "sonner"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { TalkingPhotoLayout } from "@/components/talking-components-baby/TalkingPhotoLayout"

export const BabyPodcastHero = () => {
  const pathname = usePathname()
  
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Content container - centered layout */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col items-center justify-center py-32 md:py-40">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-10 md:space-y-12">
            {/* Title - Apple-style large and bold */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance px-4">
              <span className="text-primary">
                Baby Podcast with Infinite Talk AI
              </span>
              
            </h1>
            
            {/* Subtitle - Larger, more readable */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-6xl mx-auto font-light">
              Create engaging baby podcast videos with AI-powered talking video technology. Transform photos into natural talking videos with precise lip sync and expressive motion.
            </p>

            {/* Anchor Tab Links */}
            <div className="pt-4">
              <div className="inline-flex h-14 items-center px-2 gap-2 bg-card dark:bg-[#4a4a4a] border border-border dark:border-[#5a5a5a] rounded-lg shadow-md dark:shadow-lg">
                <Link
                  href="/infinite-talk-ai/talking-photo"
                  className={`px-6 py-3 flex items-center text-base font-semibold rounded-md transition-all ${
                    pathname === "/infinite-talk-ai/talking-photo"
                      ? "bg-primary text-primary-foreground shadow-lg dark:shadow-xl hover:bg-primary/90"
                      : "text-foreground hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10"
                  }`}
                >
                  infinitetalk photo
                </Link>
                <Link
                  href="/infinite-talk-ai/video-to-video"
                  className={`px-6 py-3 flex items-center text-base font-semibold rounded-md transition-all ${
                    pathname === "/infinite-talk-ai/video-to-video"
                      ? "bg-primary text-primary-foreground shadow-lg dark:shadow-xl hover:bg-primary/90"
                      : "text-foreground hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10"
                  }`}
                >
                  infinitetalk video
                </Link>
                <Link
                  href="/infinite-talk-ai/baby-podcast"
                  className={`px-6 py-3 flex items-center text-base font-semibold rounded-md transition-all ${
                    pathname === "/infinite-talk-ai/baby-podcast"
                      ? "bg-primary text-primary-foreground shadow-lg dark:shadow-xl hover:bg-primary/90"
                      : "text-foreground hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10"
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
          <div id="baby-podcast-talking" className="mb-16">
            <TalkingPhotoLayout
              onTaskCreated={() => {
                // Show success message and guide to profile
                toast.custom(
                  (t) => (
                    <div className="bg-card dark:bg-[#4a4a4a] border border-border dark:border-[#5a5a5a] rounded-xl shadow-lg dark:shadow-xl p-4 w-[350px] flex items-start gap-3 relative pointer-events-auto">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                        <FiCheck className="w-4 h-4 text-primary-foreground" />
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
                            className="text-primary hover:text-primary/80 font-medium hover:underline"
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

