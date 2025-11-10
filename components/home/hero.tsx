import { FiArrowRight } from "react-icons/fi"
import Link from "next/link"

export const AuroraHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Content container - centered layout */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center justify-center py-16 md:py-24">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-10">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Infinite Talk AI
            </h1>
            
            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Audio-driven, whole-frame dubbing that turns images or footage into identity-stable talking video. It enables infinite-length generation—syncing lips, head motion, posture, and expressions to speech for natural continuity.
            </p>

            {/* CTA Buttons - horizontal layout, centered */}
            <div className="flex flex-row gap-4 justify-center items-center pt-2">
              <Link href="/infinite-talk-ai/image-to-video">
                <button className="group relative flex items-center gap-2 rounded-lg bg-accent text-accent-foreground px-6 py-3 font-semibold hover:bg-accent/90 transition-all duration-200">
                  <span>Start Generating</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="#example-videos">
                <button className="group relative flex items-center gap-2 rounded-lg bg-transparent border border-accent text-accent px-6 py-3 font-semibold hover:bg-accent/10 transition-all duration-200">
                  <span>Example Videos</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

            {/* Hero Video - 16:9 - smaller and at bottom */}
            <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-slate-700/50 bg-black shadow-2xl shadow-black/50">
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
