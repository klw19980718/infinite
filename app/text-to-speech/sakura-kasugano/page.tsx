import type { Metadata } from 'next'
import { SakuraKasuganoTtsHero } from './components/Hero'
import { SakuraKasuganoTtsWorkflow } from './components/Workflow'
import { SakuraKasuganoTtsSafety } from './components/Safety'
import { SakuraKasuganoTtsFAQ } from './components/FAQ'

export const metadata: Metadata = {
  title: 'Sakura Kasugano Text to Speech – Anime Voice Tool | Infinite Talk AI',
  description:
    'Generate Sakura Kasugano–style anime voices from text and turn them into talking videos with Infinite Talk AI. Great for fan dubs, clips, and parody content.',
  keywords: [
    'Sakura Kasugano text to speech',
    'sakura kasugano ai voice',
    'anime girl text to speech',
    'anime tts',
    'sakura kasugano voice generator',
    'street fighter parody voice',
    'infinite talk ai text to speech',
  ],
  openGraph: {
    title: 'Sakura Kasugano Text to Speech – Anime Voice Tool | Infinite Talk AI',
    description:
      'Free online tool for generating Sakura Kasugano–style anime voices and talking videos with Infinite Talk AI, starting with daily free TTS credits.',
    type: 'article',
    url: 'https://www.infinitetalkai.org/text-to-speech/sakura-kasugano',
    siteName: 'Infinite Talk AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakura Kasugano Text to Speech – Anime Voice Tool | Infinite Talk AI',
    description:
      'Generate Sakura Kasugano–style text to speech anime voices and talking videos online for free using Infinite Talk AI, with daily free credits included.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.infinitetalkai.org/text-to-speech/sakura-kasugano',
  },
}

export default function SakuraKasuganoTtsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            headline: 'Sakura Kasugano Text to Speech – Anime Voice Tool',
            description:
              'Online tool for creating Sakura Kasugano–style text to speech anime voices and talking videos with Infinite Talk AI, including daily free TTS credits.',
            url: 'https://www.infinitetalkai.org/text-to-speech/sakura-kasugano',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.infinitetalkai.org/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Text to Speech',
                item: 'https://www.infinitetalkai.org/text-to-speech',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Sakura Kasugano Text to Speech',
                item: 'https://www.infinitetalkai.org/text-to-speech/sakura-kasugano',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is it legal to use a Sakura Kasugano–style AI voice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Laws and platform rules differ by region, but in general you should avoid using AI to pose as official characters or actors in a way that confuses viewers. Clearly mark any Sakura Kasugano–style AI voice as synthetic fan or parody content.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does Infinite Talk AI provide the official Sakura Kasugano voice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'No. Infinite Talk AI does not provide or endorse exact replicas of any copyrighted characters or real individuals. You can, however, create anime-inspired voices that feel energetic and friendly for fan projects.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I post Sakura-style AI voice clips on YouTube and social media?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    "In many cases, yes, as long as you follow each platform's rules, the relevant IP holder's fan content guidelines, and local law. Mark AI voices as synthetic, avoid impersonation, and do not mislead viewers about official status.",
                },
              },
              {
                '@type': 'Question',
                name: 'Is Sakura Kasugano text to speech free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Infinite Talk AI offers daily free allowances for Text to Speech generation. After you use the free tier, additional characters are billed in credits according to your plan.',
                },
              },
            ],
          }),
        }}
      />

      <main className="bg-background relative min-h-screen">
        <div className="relative z-10">
          <SakuraKasuganoTtsHero />
          <SakuraKasuganoTtsWorkflow />
          <SakuraKasuganoTtsSafety />
          <SakuraKasuganoTtsFAQ />
        </div>
      </main>
    </>
  )
}


