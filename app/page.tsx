
import { AuroraHero, HowItWorks, Highlights, UnderTheHood, FAQ } from '@/components/home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infinite Talk AI – Image-to-Video & Video-to-Video Generator',
  description: 'Generate natural talking videos with whole-frame editing and precise lip-sync. Supports image-to-video and video-to-video with stable full-body motion.',
  keywords: 'Infinite Talk AI, InfiniteTalk, infinitetalk, image to video, video to video, lip sync',
  openGraph: {
    title: 'Infinite Talk AI – Image-to-Video & Video-to-Video Generator',
    description: 'Generate natural talking videos with whole-frame editing and precise lip-sync. Supports image-to-video and video-to-video with stable full-body motion.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Talk AI – Image-to-Video & Video-to-Video Generator',
    description: 'Generate natural talking videos with whole-frame editing and precise lip-sync. Supports image-to-video and video-to-video with stable full-body motion.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main>
      <AuroraHero />
      <HowItWorks />
      <Highlights />
      <UnderTheHood />
      <FAQ />
    </main>
  );
}
