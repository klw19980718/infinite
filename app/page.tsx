
import { AuroraHero, HowItWorks, Highlights, UnderTheHood, FAQ, Specs } from '@/components/home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infinite Talk AI — Audio-Driven Sparse-Frame Dubbing',
  description: 'Infinite Talk AI turns images or videos into long-form talking footage with phoneme-level sync, whole-frame control, multi-speaker scenes, and stable identity.',
  keywords: [
    'infinite talk ai',
    'talking video generator', 
    'lip sync ai',
    'sparse-frame dubbing',
    'audio to video'
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org',
  },
  openGraph: {
    title: 'Infinite Talk AI — Audio-Driven Sparse-Frame Dubbing',
    description: 'Infinite Talk AI turns images or videos into long-form talking footage with phoneme-level sync, whole-frame control, multi-speaker scenes, and stable identity.',
    type: 'website',
    url: 'https://www.infinitetalkai.org',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.infinitetalkai.org/logo.png',
        width: 1200,
        height: 630,
        alt: 'Infinite Talk AI - Infinite-Length Talking Video Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Talk AI — Audio-Driven Sparse-Frame Dubbing',
    description: 'Infinite Talk AI turns images or videos into long-form talking footage with phoneme-level sync, whole-frame control, multi-speaker scenes, and stable identity.',
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
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Infinite Talk AI",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "description": "Infinite Talk AI provides audio-driven, sparse-frame dubbing with phoneme-aware lip-sync, whole-frame control, multi-speaker pipelines, and prompt/clarity controls for long-form talking video.",
        "url": "https://www.infinitetalkai.org",
        "image": "https://www.infinitetalkai.org/logo.png",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Infinite Talk AI"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What's the Infinite Talk AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Infinite Talk AI is an audio-driven, sparse-frame dubbing system that turns images or videos into long-form, lip-accurate talking footage with whole-frame control and multi-speaker support."
            }
          },
          {
            "@type": "Question",
            "name": "What inputs does Infinite Talk AI support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Upload a single image or a source video plus audio narration (WAV/MP3). Infinite Talk AI analyzes phonemes and timing to drive motion and exports MP4."
            }
          },
          {
            "@type": "Question",
            "name": "How does Infinite Talk AI keep identity stable?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Soft reference control and context overlap preserve facial structure and style while keeping expressions natural."
            }
          },
          {
            "@type": "Question",
            "name": "Can Infinite Talk AI handle multiple speakers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Provide separate audio tracks and references, and Infinite Talk AI animates each speaker independently in the same scene."
            }
          },
          {
            "@type": "Question",
            "name": "Does Infinite Talk AI reduce flicker and seams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Temporal context windows carry motion across chunks, reducing flicker and visible joins on long timelines."
            }
          },
          {
            "@type": "Question",
            "name": "How precise is lip-sync in Infinite Talk AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Phoneme-aware mapping keeps visemes aligned to speech rhythm for accurate articulation over long runs."
            }
          },
          {
            "@type": "Question",
            "name": "Is data private when using Infinite Talk AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Uploads are encrypted in transit. Retention controls and one-click deletion are provided; model training is opt-in only."
            }
          },
          {
            "@type": "Question",
            "name": "What hardware suits Infinite Talk AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "From lightweight previews to heavier passes, Infinite Talk AI offers acceleration and quantization for limited VRAM."
            }
          },
          {
            "@type": "Question",
            "name": "What content types fit Infinite Talk AI best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Education, corporate explainers, podcasts, creator content, and multilingual dubbing benefit from whole-frame control."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <AuroraHero />
        <HowItWorks />
        <Specs />
        <Highlights />
        <UnderTheHood />
       
        <FAQ />
        
        {/* Final CTA */}
        <section className="py-32 bg-background">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Ship courses, demos, and episodes faster.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
                Start free, adjust clarity and prompts as needed, and build your production pipeline with Infinite Talk AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a href="/infinite-talk-ai/image-to-video" className="group relative flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200">
                  <span>Start Generating</span>
                </a>
                <a href="/pricing" className="group relative flex items-center gap-2 rounded-full bg-transparent px-8 py-4 text-foreground font-semibold border border-border hover:bg-card transition-all duration-200">
                  <span>Get Credits</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
