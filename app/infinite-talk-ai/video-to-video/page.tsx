import { VideoToVideoHero, VideoToVideoCTA } from '@/components/video-to-video'
import { WhatIsVideoToVideo } from '@/components/content/WhatIsVideoToVideo'
import type { Metadata } from 'next'
import { Plasma } from '@/components/ui/plasma'
import { Beams } from '@/components/ui/beams'

export const metadata: Metadata = {
  title: 'Infinite Talk AI video-to-video — Fast, Natural Lip Sync',
  description: 'Transform any video into a lifelike talking clip with infinite-talk-ai. The video-to-video engine delivers precise Lip Sync and expressive motion for marketing and UGC.',
  keywords: [
    'infinite-talk-ai',
    'video-to-video',
    'Lip Sync',
    'talking video',
    'AI presenter',
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/infinite-talk-ai/video-to-video',
  },
  openGraph: {
    title: 'Infinite Talk AI video-to-video — Fast, Natural Lip Sync',
    description: 'Transform any video into a lifelike talking clip with infinite-talk-ai. The video-to-video engine delivers precise Lip Sync and natural expressions for marketing and UGC.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/infinite-talk-ai/video-to-video',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.infinitetalkai.org/logo.png',
        width: 1200,
        height: 630,
        alt: 'Infinite Talk AI - Video-to-Video with Accurate Lip Sync',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Talk AI video-to-video — Fast, Natural Lip Sync',
    description: 'Transform any video into a lifelike talking clip with infinite-talk-ai. The video-to-video engine delivers precise Lip Sync and natural expressions for marketing and UGC.',
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

export default function VideoToVideoPage() {
  return (
    <>
      <main className="bg-background relative min-h-screen">
        {/* Unified background with Plasma and Beams */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <Plasma 
            color="#bef264"
            speed={0.6}
            direction="forward"
            scale={1.1}
            opacity={0.3}
            mouseInteractive={true}
          />
        </div>
        <Beams />
        
        <div className="relative z-10">
          <VideoToVideoHero />
          <WhatIsVideoToVideo />
          <VideoToVideoCTA />
        </div>
      </main>
    </>
  )
}
