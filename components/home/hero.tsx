import { FiArrowRight } from "react-icons/fi"
import Link from "next/link"

export const AuroraHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-transparent to-card/30"></div>
      
      {/* Content container - centered layout */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center justify-center py-20 md:py-28">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Infinite Talk AI
            </h1>
            
            {/* Description */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Audio-driven, whole-frame dubbing that turns images or footage into identity-stable talking video. It enables infinite-length generation—syncing lips, head motion, posture, and expressions to speech for natural continuity.
            </p>

            {/* CTA Buttons - horizontal layout, centered */}
            <div className="flex flex-row gap-3 justify-center items-center pt-2">
              <Link href="/infinite-talk-ai/image-to-video">
                <button className="group relative flex items-center gap-2 rounded-lg bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:bg-accent/90 transition-all duration-200">
                  <span>Start Generating</span>
                  <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="#example-videos">
                <button className="group relative flex items-center gap-2 rounded-lg bg-transparent border border-border text-foreground px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-all duration-200">
                  <span>Example Videos</span>
                  <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

            {/* Hero Video - 16:9 - smaller and at bottom */}
            <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden border border-border/50 bg-black shadow-xl mt-4">
              <video
                controls
                preload="none"
                className="w-full h-full object-contain bg-black"
                poster="https://cdn.infinitetalkai.org/hero/hero.png"
              >
                <source src="https://cdn.infinitetalkai.org/hero/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
