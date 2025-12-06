"use client"

import Link from "next/link"
import Image from "next/image"
import { FiArrowRight, FiHome } from "react-icons/fi"

export function TalkingPhotoCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto rounded-3xl border border-border bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* SVG 图片区域 */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-primary dark:bg-white/50 order-first lg:order-none">
              <div className="relative w-full max-w-md aspect-[4/3]">
                <Image
                  src="/svg/waitforyou.svg"
                  alt="Try our other features"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            {/* 文字和按钮区域 */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center order-last lg:order-none">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 text-balance leading-tight">
                Try Our Other Features
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 text-pretty leading-relaxed">
                Explore more ways to create amazing videos with AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-6">
                <Link
                  href="/infinite-talk-ai/video-to-video"
                  className="group relative flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-primary-foreground text-sm font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>infinitetalk video</span>
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="text-center sm:text-left">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <FiHome className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

