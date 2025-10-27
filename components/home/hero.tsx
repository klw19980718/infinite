"use client"
import { FiArrowRight, FiCheckCircle } from "react-icons/fi"
import Link from "next/link"

export const AuroraHero = () => {
  return (
    <section className="relative min-h-[110vh] overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-chart-2/5"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Multiple glowing orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[150px] animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-chart-2/12 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-chart-3/8 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

   
      <div className="relative z-10 container mx-auto px-6 min-h-[110vh] flex items-center py-24">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </div>
            <span className="text-foreground text-sm font-medium">Infinite-Length Video Generation</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance px-4">
            <span className="text-foreground">Infinite Talk AI</span>
            <br />
            <span className="bg-gradient-to-r from-accent via-chart-2 to-chart-3 bg-clip-text text-transparent">
              — Audio-Driven Talking Video Generation, Engineered for Precision
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto text-pretty px-4">
            Infinite Talk AI converts images or source footage into long-form, lip-accurate, identity-stable talking
            video. With a sparse-frame pipeline, Infinite Talk AI synchronizes lips, head motion, posture, and
            micro-expressions to speech timing for natural continuity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
            {[
              "Image-to-Video & Video-to-Video",
              "Whole-frame editing, not just lips",
              "Export 480p / 720p / 1080p",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-card px-5 py-3.5 rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <FiCheckCircle className="text-accent w-5 h-5 flex-shrink-0" />
                <span className="text-foreground font-medium text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center pt-6">
            <Link href="/image-to-video">
              <button className="group relative flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200">
                <span>Start Free</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="/pricing">
              <button className="group relative flex items-center gap-2 rounded-full bg-transparent px-10 py-4 text-foreground font-semibold border border-border hover:bg-card transition-all duration-200">
                <span>See Examples</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-chart-1 to-chart-2 text-white text-xs font-medium shadow-lg">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              1080p HD now available
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
