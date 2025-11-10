import { FiArrowRight } from "react-icons/fi"
import Link from "next/link"

export const AuroraHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Elegant gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-900/20 to-purple-950/30"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Smooth animated orbs with better colors */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[150px] animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/12 rounded-full blur-[120px] animate-float"
        style={{ animationDelay: "3s", animationDuration: "25s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] animate-float"
        style={{ animationDelay: "6s", animationDuration: "30s" }}
      ></div>

      {/* Content container - centered layout */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center justify-center py-16 md:py-24">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-10">
            {/* Hero Video - 16:9 */}
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-slate-700/50 bg-black shadow-2xl shadow-black/50">
              <video
                controls
                preload="none"
                className="w-full h-full object-contain bg-black"
                poster="https://cdn.infinitetalkai.org/hero/hero.png"
              >
                <source src="https://cdn.infinitetalkai.org/hero/hero.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Infinite Talk AI
            </h1>
            
            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Audio-driven, whole-frame dubbing that turns images or footage into identity-stable talking video. It enables infinite-length generation—syncing lips, head motion, posture, and expressions to speech for natural continuity.
            </p>

            {/* CTA Buttons - horizontal layout, centered */}
            <div className="flex flex-row gap-4 justify-center items-center pt-2">
              <Link href="/infinite-talk-ai/image-to-video">
                <button className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 border border-blue-400/50 px-6 py-3 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 hover:border-blue-400 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
                  <span>Start Generating</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="#example-videos">
                <button className="group relative flex items-center gap-2 rounded-lg bg-transparent border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-200">
                  <span>Example Videos</span>
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
