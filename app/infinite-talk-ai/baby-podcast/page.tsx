import type { Metadata } from 'next'
import { BabyPodcastHero, HowToGenerateBabyPodcast, BabyPodcastUseCases, BabyPodcastFaq } from '@/components/baby_podcast'
import { Beams } from '@/components/ui/beams'

export const metadata: Metadata = {
  title: 'Infinite Talk AI Baby Podcast — AI Talking Video Creator',
  description: 'Create engaging baby podcast videos with Infinite Talk AI. Transform photos into natural talking videos with precise lip sync and expressive motion.',
  keywords: [
    'Infinite Talk AI',
    'baby podcast',
    'talking video',
    'AI video generator',
    'lip sync',
    'video creator',
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/infinite-talk-ai/baby-podcast',
  },
  openGraph: {
    title: 'Infinite Talk AI Baby Podcast — AI Talking Video Creator',
    description: 'Create engaging baby podcast videos with Infinite Talk AI. Transform photos into natural talking videos with precise lip sync and expressive motion.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/infinite-talk-ai/baby-podcast',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.infinitetalkai.org/logo.png',
        width: 1200,
        height: 630,
        alt: 'Infinite Talk AI - Baby Podcast Video Creator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Talk AI Baby Podcast — AI Talking Video Creator',
    description: 'Create engaging baby podcast videos with Infinite Talk AI. Transform photos into natural talking videos with precise lip sync and expressive motion.',
    images: ['https://www.infinitetalkai.org/logo.png'],
    creator: '@infinitetalkai',
    site: '@infinitetalkai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google32aec5a0f4af8f9d',
  },
  category: 'technology',
}

export default function BabyPodcastPage() {
  return (
    <>
      <main className="bg-background relative min-h-screen">
        
        
        <div className="relative z-10">
          <BabyPodcastHero />
          <HowToGenerateBabyPodcast />
          <BabyPodcastUseCases />
          <BabyPodcastFaq />
        </div>
      </main>
    </>
  )
}

