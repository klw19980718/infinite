import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, Inbox, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Voice Generator & Text to Speech for Talking Videos | Infinite Talk AI',
  description: 'Generate natural AI voiceovers from text and send them directly into Infinite Talk AI to create lip-synced talking videos, explainers, and multilingual dubbing.',
  keywords: [
    'ai voice generator',
    'text to speech',
    'ai voiceover',
    'video voiceover',
    'talking head',
    'talking video',
    'infinite talk ai'
  ],
  openGraph: {
    title: 'AI Voice Generator & Text to Speech for Talking Videos | Infinite Talk AI',
    description: 'Generate natural AI voiceovers from text and send them directly into Infinite Talk AI to create lip-synced talking videos, explainers, and multilingual dubbing.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/text-to-speech',
    siteName: 'Infinite Talk AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Voice Generator & Text to Speech for Talking Videos | Infinite Talk AI',
    description: 'Generate natural AI voiceovers from text and send them directly into Infinite Talk AI to create lip-synced talking videos, explainers, and multilingual dubbing.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.infinitetalkai.org/text-to-speech',
  },
}

type NavigationItem = {
  id: string
  title: string
  description?: string
  href: string
  icon?: React.ReactNode
}

export default function TextToSpeechPage() {
  // Navigation items list
  const navigationItems: NavigationItem[] = [
    {
      id: 'donald-trump',
      title: 'Donald Trump Text to Speech',
      description: 'Learn about creating presidential-style AI voices and how to use them safely in talking videos with Infinite Talk AI.',
      href: '/text-to-speech/donald-trump',
      icon: <Users className="w-5 h-5" />
    }
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Text to Speech Hub – AI Voices for Infinite Talk AI",
            "description": "Turn scripts into AI voices and plug them into Infinite Talk AI for lip-synced talking videos, talking photos, and full-frame dubbing.",
            "url": "https://www.infinitetalkai.org/text-to-speech",
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.infinitetalkai.org/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Text to Speech",
                "item": "https://www.infinitetalkai.org/text-to-speech"
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <nav
              className="mb-4 text-xs sm:text-sm text-muted-foreground"
              aria-label="Breadcrumb"
            >
              <ol className="flex flex-wrap items-center gap-1">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground">Text to Speech</li>
              </ol>
            </nav>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Text to Speech Hub – AI Voices for Infinite Talk AI
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Turn scripts into AI voices and plug them into Infinite Talk AI for lip-synced talking videos, talking photos, and full-frame dubbing.
              </p>
              <p className="text-base text-muted-foreground">
                Use this hub to jump to the right tool, voice style, or tutorial.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation List */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {navigationItems.length > 0 ? (
              <div className="space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-accent/5 transition-all group"
                  >
                    {item.icon && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Inbox className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No items yet
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Navigation items will appear here once they are added.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
