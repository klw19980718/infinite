import { FiGift } from "react-icons/fi"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const AuroraHero = () => {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28 pb-20 md:pb-28">
      {/* Content container - two column layout */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="w-full max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 md:space-y-10">
              {/* Title - align with project landing hero style */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight tracking-tight">
                Infinite Talk AI
                <span className="block text-primary">
                  Sparse-frame video dubbing engine
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
                Upload a photo or video, add your script or audio, and we'll generate a realistic talking video with natural lip sync.
              </p>

       
      

      

              {/* Start Button */}
              <Link href="/infinite-talk-ai/image-to-video">
                <Button 
                  size="lg" 
                  className="h-12 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Right Column - SVG Image */}
            <div className="flex items-center justify-center lg:justify-end order-first lg:order-last">
              <div className="w-full max-w-lg lg:max-w-full">
                <Image
                  src="/svg/hero.svg"
                  alt="Audio conversation illustration"
                  width={922}
                  height={384}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
