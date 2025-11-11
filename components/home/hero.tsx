import { FiArrowRight } from "react-icons/fi"
import Link from "next/link"

export const AuroraHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Content container - centered layout */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center justify-center py-32 md:py-40">
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

            {/* CTA Buttons - Apple-style prominent */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/infinite-talk-ai/image-to-video">
                <button className="group relative flex items-center gap-3 rounded-full bg-accent text-accent-foreground px-8 py-4 text-base font-semibold hover:bg-accent/90 hover:scale-105 transition-all duration-300 shadow-2xl glow-lime">
                  <span>Start Generating</span>
                  <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="#example-videos">
                <button className="group relative flex items-center gap-3 rounded-full glass px-8 py-4 text-foreground text-base font-semibold hover:glass-strong transition-all duration-300">
                  <span>Example Videos</span>
                  <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

            {/* Hero Video - Glassmorphism frame */}
            <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden glass-strong shadow-2xl  mt-8">
              <video
                controls
                preload="metadata"
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
