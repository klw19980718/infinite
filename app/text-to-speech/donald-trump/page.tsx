import type { Metadata } from 'next'
import { DonaldTrumpTtsHero } from './components/Hero'
import { DonaldTrumpTtsWorkflow } from './components/Workflow'
import { DonaldTrumpTtsSafety } from './components/Safety'
import { DonaldTrumpTtsFAQ } from './components/FAQ'

export const metadata: Metadata = {
  title: 'Free Donald Trump Text to Speech Online – AI Voice Tool | Infinite Talk AI',
  description:
    'Use our free Donald Trump text to speech online tool to generate AI Trump-style voices and talking videos with Infinite Talk AI, starting with daily free TTS credits.',
  keywords: [
    'Donald Trump text to speech',
    'donald trump text to speech download',
    'donald trump text to speech video',
    'donald trump text to speech online',
    'donald trump text to speech voice',
    'donald trump text to speech free',
    'donald trump text to speech ai voice',
    'best donald trump text to speech',
    'ai trump voice',
    'presidential ai voice',
    'political ai voiceover',
    'infinite talk ai text to speech',
  ],
  openGraph: {
    title: 'Free Donald Trump Text to Speech Online – AI Voice Tool | Infinite Talk AI',
    description:
      'Free Donald Trump text to speech online tool for generating AI voices and talking videos with Infinite Talk AI, with daily free TTS credits and no downloads required.',
    type: 'article',
    url: 'https://www.infinitetalkai.org/text-to-speech/donald-trump',
    siteName: 'Infinite Talk AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Donald Trump Text to Speech Online – AI Voice Tool | Infinite Talk AI',
    description:
      'Generate Donald Trump text to speech AI voices and talking videos online for free using Infinite Talk AI, with daily free credits included.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.infinitetalkai.org/text-to-speech/donald-trump',
  },
}

export default function DonaldTrumpTtsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            headline: 'Free Donald Trump Text to Speech Online – AI Voice Tool',
            description:
              'Free online tool for creating Donald Trump text to speech AI voice and talking video with Infinite Talk AI, including daily free TTS credits.',
            url: 'https://www.infinitetalkai.org/text-to-speech/donald-trump',
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
                name: 'Donald Trump Text to Speech',
                item: 'https://www.infinitetalkai.org/text-to-speech/donald-trump',
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
                name: 'Is it legal to use a Donald Trump-style AI voice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Laws differ by country and platform, but in general you should avoid using AI to pose as real people without consent, especially for political or commercial statements. Treat AI voices as fictional characters and clearly label them as synthetic.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does Infinite Talk AI provide an official Donald Trump voice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'No. Infinite Talk AI does not provide or endorse exact replicas of real individuals. You can, however, create original voices that feel presidential, authoritative, or comedic for commentary and satire.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use these voices on YouTube and social media?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    "In most cases yes, as long as you follow each platform's rules, our terms of use, and local law. Clearly mark AI voices as synthetic, avoid impersonation, and do not mislead viewers about what is real.",
                },
              },
              {
                '@type': 'Question',
                name: 'Is Donald Trump text to speech free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Infinite Talk AI offers free daily allowances for Text to Speech generation. The exact amount depends on your plan. You can generate AI voices online without upfront costs, though longer scripts may consume credits beyond the free tier.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does Donald Trump text to speech download work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    "You can download generated audio files in standard formats (MP3, WAV) from our Text to Speech tool. You can also use the audio directly in Infinite Talk AI's video workflows without downloading if you prefer.",
                },
              },
              {
                '@type': 'Question',
                name: 'How do I create a Donald Trump text to speech video?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'First, generate the AI voice using our Text to Speech tool with your script. Then, upload an image or video to Infinite Talk AI and use the generated audio to create a lip-synced talking video. The entire process happens online in your browser.',
                },
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-background">
        <DonaldTrumpTtsHero />
        <DonaldTrumpTtsWorkflow />
        <DonaldTrumpTtsSafety />
        <DonaldTrumpTtsFAQ />
      </div>
    </>
  )
}


