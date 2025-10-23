"use client"
import { FiArrowRight, FiCheckCircle } from "react-icons/fi"
import Link from "next/link"

export const AuroraHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-chart-2/15 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </div>
            <span className="text-foreground text-sm font-medium">Infinite-Length Video Generation</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
            <span className="text-foreground">Infinite Talk AI</span>
            <br />
            <span className="bg-gradient-to-r from-accent via-chart-2 to-chart-3 bg-clip-text text-transparent">
              — Infinite-Length
            </span>
            <br />
            <span className="text-foreground">Talking Video Generator</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-pretty">
            Turn any image or video into long-form talking footage. Our sparse-frame pipeline edits the whole frame for
            accurate lip-sync, stable head & body motion, and consistent identity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "Image-to-Video & Video-to-Video",
              "Whole-frame editing, not just lips",
              "Export 480p / 720p / 1080p",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-card px-4 py-2.5 rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <FiCheckCircle className="text-accent w-4 h-4 flex-shrink-0" />
                <span className="text-foreground font-medium text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link href="/image-to-video">
              <button className="group relative flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200">
                <span>Start Creating</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="/pricing">
              <button className="group relative flex items-center gap-2 rounded-full bg-transparent px-8 py-4 text-foreground font-semibold border border-border hover:bg-card transition-all duration-200">
                <span>View Pricing</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          <div className="pt-4">
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
