import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function DonaldTrumpTtsHero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28 pb-20 md:pb-28">
      <div className="relative z-10 container mx-auto px-6">
        <nav
          className="mb-6 text-xs sm:text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/text-to-speech" className="hover:text-primary">
                Text to Speech
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">Donald Trump</li>
          </ol>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Text to Speech Tool
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight tracking-tight">
              Best Donald Trump
              <span className="block text-primary">
                Text to Speech Style
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
              Online tool for creating Donald Trump-style text to speech AI voices and talking videos for parody and commentary with Infinite Talk AI.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Infinite Talk AI does not provide or endorse exact replicas of any real person&apos;s voice.
            </p>
          </div>

          {/* Right Column - SVG Image */}
          <div className="flex items-center justify-center lg:justify-end order-first lg:order-last">
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <Image
                src="/svg/Donald_Trump_cartoon_hero .svg"
                alt="Donald Trump Text to Speech illustration"
                width={1184}
                height={864}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


