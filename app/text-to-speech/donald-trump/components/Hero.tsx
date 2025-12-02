import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function DonaldTrumpTtsHero() {
  return (
    <section className="relative pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <nav
          className="mb-3 text-xs sm:text-sm text-muted-foreground"
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
        <div className="rounded-2xl border border-border bg-gradient-to-b from-background/60 via-background/80 to-background/100 px-6 py-8 sm:px-8 sm:py-10 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
            Text to Speech Tool
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Best Donald Trump Text to Speech Style – Online AI Voice Tool
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6 max-w-2xl leading-relaxed">
            Online tool for creating Donald Trump-style text to speech AI voices and talking videos for parody and commentary with Infinite Talk AI.
          </p>
          <p className="text-[11px] sm:text-xs text-muted-foreground mb-6">
            Infinite Talk AI does not provide or endorse exact replicas of any real person&apos;s voice.
          </p>

        </div>
      </div>
    </section>
  )
}


