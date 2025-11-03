"use client"

import Link from "next/link"
import { FiArrowRight, FiDollarSign, FiHome } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function VideoToVideoCTA() {
  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Try Our Other Features
            </h2>
            <p className="text-muted-foreground">
              Explore more ways to create amazing videos with AI
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link
              href="/infinite-talk-ai/image-to-video"
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>Image to Video</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="group relative px-6 py-3 border-2 border-blue-500/50 text-foreground rounded-xl font-semibold hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <FiDollarSign className="w-4 h-4 text-blue-400" />
              <span>View Pricing</span>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FiHome className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

