import { FiArrowRight } from "react-icons/fi"
import Link from "next/link"

export const AuroraHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950">
      {/* Vibrant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-cyan-900/40"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Enhanced atmospheric glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[150px] animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-400/15 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/12 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Content container - bottom-aligned layout */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-end pb-16 md:pb-24">
        <div className="w-full max-w-7xl mx-auto">
          {/* Horizontal layout: left content (wide) + right buttons (narrow) */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-center">
            {/* Left: Title and Description - wider section */}
            <div className="space-y-6">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Infinite Talk AI
              </h1>
              
              {/* Description */}
              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl">
                Audio-driven, whole-frame dubbing that turns images or footage into identity-stable talking video. It enables infinite-length generation—syncing lips, head motion, posture, and expressions to speech for natural continuity.
              </p>
            </div>

            {/* Right: CTA Buttons - narrower section, horizontal layout */}
            <div className="flex flex-row gap-4 justify-start lg:justify-end">
              <Link href="/infinite-talk-ai/image-to-video">
                <button className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 border border-blue-400/50 px-6 py-3 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 hover:border-blue-400 transition-all duration-200 shadow-lg shadow-blue-500/25">
                  <span>Start Generating</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/pricing">
                <button className="group relative flex items-center gap-2 rounded-lg bg-transparent border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-200">
                  <span>Get Credits</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
