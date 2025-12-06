import { TalkingPhotoHero } from '@/components/talking-photo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Infinite Talk AI image-to-video — Fast, Natural Lip Sync',
  description: 'Make talking videos from one photo with infinite-talk-ai. The image-to-video engine delivers precise Lip Sync and expressive motion for marketing and UGC.',
  keywords: [
    'infinite-talk-ai',
    'image-to-video',
    'Lip Sync',
    'talking photo',
    'AI presenter',
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/infinite-talk-ai/talking-photo',
  },
  openGraph: {
    title: 'Infinite Talk AI image-to-video — Fast, Natural Lip Sync',
    description: 'Make talking videos from one photo with infinite-talk-ai. The image-to-video engine delivers precise Lip Sync and expressive motion for marketing and UGC.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/infinite-talk-ai/talking-photo',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.infinitetalkai.org/logo.png',
        width: 1200,
        height: 630,
        alt: 'Infinite Talk AI - Image-to-Video with Accurate Lip Sync',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Talk AI image-to-video — Fast, Natural Lip Sync',
    description: 'Make talking videos from one photo with infinite-talk-ai. The image-to-video engine delivers precise Lip Sync and expressive motion for marketing and UGC.',
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

export default function TalkingPhotoPage() {
  return (
    <>
      <main className="bg-background relative min-h-screen">
        <div className="relative z-10">
          <TalkingPhotoHero />
        </div>
      </main>
    </>
  )
}
