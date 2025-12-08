import Link from 'next/link'
import Image from 'next/image'
import { TextToSpeechGenerator } from '@/components/text-to-speech/TextToSpeechGenerator'

export function SakuraKasuganoTtsHero() {
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
            <li className="text-foreground">Sakura Kasugano</li>
          </ol>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Text to Speech Tool
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight tracking-tight">
              Sakura Kasugano
              <span className="block text-primary">
                Text to Speech
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
              Generate Sakura Kasugano–style anime voice lines for fan dubs, clips, and talking videos with Infinite Talk AI&apos;s text to speech engine.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              This tool is for parody and fan content only. Infinite Talk AI is not affiliated with or endorsed by Capcom or any rights holder, and does not provide exact replicas of copyrighted characters.
            </p>
          </div>

          {/* Right Column - SVG Image */}
          <div className="flex items-center justify-center lg:justify-end order-first lg:order-last">
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <Image
                src="/svg/sakura kasugano.png"
                alt="Sakura Kasugano Text to Speech illustration"
                width={1184}
                height={864}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text to Speech Generator */}
        <div className="mt-10 lg:mt-12">
          {/* 使用一个适合作为 Sakura 风格的 voice_id，后续可在 voices.json 中调整为实际 ID */}
          <TextToSpeechGenerator voiceId="sakura123132456" />
        </div>
      </div>
    </section>
  )
}


