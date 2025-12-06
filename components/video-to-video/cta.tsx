"use client"

import Link from "next/link"
import { FiArrowRight, FiDollarSign, FiHome } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function VideoToVideoCTA() {
  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card dark:bg-[#4a4a4a] rounded-2xl p-8 border border-border dark:border-[#5a5a5a] shadow-lg dark:shadow-xl">
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
              href="/infinite-talk-ai/talking-photo"
              className="group relative px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>infinitetalk photo</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="group relative px-6 py-3 border border-primary dark:border-primary/50 text-foreground rounded-xl font-semibold hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-md dark:shadow-lg"
            >
              <FiDollarSign className="w-4 h-4 text-primary" />
              <span>View Pricing</span>
            </Link>
          </div>

          <div className="text-center">
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
    </section>
  )
}

