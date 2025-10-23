
import { AuroraHero, HowItWorks, Highlights, UnderTheHood, FAQ, Specs } from '@/components/home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infinite Talk AI – Infinite-Length Talking Video Generator',
  description: 'Create unlimited talking videos from any image or video. Our AI-powered platform delivers precise lip-sync, stable motion, and consistent identity across long-form content. Perfect for lectures, podcasts, and presentations.',
  keywords: [
    // Brand name variations
    'Infinite Talk AI',
    'InfiniteTalk',
    'InfiniteTalk AI',
    'InfiniteTalkAI',
    'InfiniteTalkai',
    'infinitetalk',
    'infinitetalkai',
    'infinitetalk.ai',
    'infinite talk',
    'infinite talk ai',
    'infinite talkai',
    'infinite-talk',
    'infinite-talk-ai',
    'infinite_talk',
    'infinite_talk_ai',
    'InfiniteTalkAI',
    'InfiniteTalkAi',
    'infiniteTalk',
    'infiniteTalkAI',
    'infiniteTalkAi',
    'INFINITE TALK',
    'INFINITE TALK AI',
    'INFINITETALK',
    'INFINITETALKAI',
    // Core functionality keywords
    'talking video generator',
    'image to video',
    'video to video',
    'lip sync AI',
    'AI video generation',
    'talking head generator',
    'video synthesis',
    'AI avatar',
    'voice cloning',
    'video editing AI',
    'long-form video',
    'infinite length video',
    'whole frame editing',
    'stable motion',
    'identity preservation',
    // User intent keywords
    'FAQ',
    'how it works',
    'video tutorial',
    'AI technology',
    'tutorial',
    'guide',
    'help',
    'support'
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org',
  },
  openGraph: {
    title: 'Infinite Talk AI – Infinite-Length Talking Video Generator',
    description: 'Create unlimited talking videos from any image or video. Our AI-powered platform delivers precise lip-sync, stable motion, and consistent identity across long-form content.',
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
    title: 'Infinite Talk AI – Infinite-Length Talking Video Generator',
    description: 'Create unlimited talking videos from any image or video. Our AI-powered platform delivers precise lip-sync, stable motion, and consistent identity across long-form content.',
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
        "@type": "WebSite",
        "name": "Infinite Talk AI",
        "alternateName": [
          "InfiniteTalk",
          "InfiniteTalkAI", 
          "InfiniteTalkai",
          "infinitetalk",
          "infinitetalkai",
          "infinitetalk.ai",
          "infinite talk",
          "infinite talk ai",
          "infinite-talk",
          "infinite-talk-ai",
          "infinite_talk",
          "infinite_talk_ai",
          "INFINITE TALK",
          "INFINITETALK",
          "INFINITETALKAI"
        ],
        "url": "https://www.infinitetalkai.org",
        "description": "Create unlimited talking videos from any image or video. Our AI-powered platform delivers precise lip-sync, stable motion, and consistent identity across long-form content.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.infinitetalkai.org/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "Infinite Talk AI",
        "url": "https://www.infinitetalkai.org",
        "logo": "https://www.infinitetalkai.org/logo.png",
        "description": "AI-powered platform for creating infinite-length talking videos with precise lip-sync and stable motion.",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support@infinitetalkai.org",
          "contactType": "customer service"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1234 Innovation Drive",
          "addressLocality": "San Francisco",
          "addressRegion": "CA",
          "postalCode": "94105",
          "addressCountry": "US"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Infinite Talk AI",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "description": "AI-powered talking video generator for creating unlimited-length videos with precise lip-sync and stable motion.",
        "url": "https://www.infinitetalkai.org",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free tier available with premium options"
        },
        "featureList": [
          "Image-to-Video Generation",
          "Video-to-Video Lip Sync",
          "Whole Frame Editing",
          "Stable Motion",
          "Identity Preservation",
          "Long-form Content Support",
          "1080p Export",
          "Google OAuth Integration",
          "Email OTP Authentication"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What inputs do you support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We support image inputs (JPG/PNG) and video inputs (MP4) combined with audio files (WAV/MP3, 16–24 kHz mono recommended)."
            }
          },
          {
            "@type": "Question", 
            "name": "How long can my video be?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "There are no hard time limits. Our platform is designed for unlimited duration content, perfect for lectures, podcasts, and multi-chapter explainers."
            }
          },
          {
            "@type": "Question",
            "name": "Which resolutions are available?",
            "acceptedAnswer": {
              "@type": "Answer", 
              "text": "We support 480p, 720p, and 1080p export resolutions. 1080p provides the highest visual clarity and lip detail."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use outputs commercially?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can use the generated videos for commercial purposes. Please review our Terms of Service for specific usage guidelines."
            }
          },
          {
            "@type": "Question",
            "name": "Do you support multiple speakers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we support independent tracks and references for multiple speakers in your videos."
            }
          },
          {
            "@type": "Question",
            "name": "How is my data handled?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We use industry-standard security measures. Your data is processed securely and you can delete your content at any time. See our Privacy Policy for details."
            }
          },
          {
            "@type": "Question",
            "name": "How fast is rendering?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Rendering time scales with duration and the number of speakers. For speed-sensitive drafts, start at 480p/720p, then export the final cut in 1080p."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Create Talking Videos with Infinite Talk AI",
        "description": "Step-by-step guide to create unlimited talking videos using our AI platform",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Choose Workflow",
            "text": "Pick image-to-video generator or video-to-video lip-sync based on your project needs.",
            "url": "https://www.infinitetalkai.org#how-it-works"
          },
          {
            "@type": "HowToStep", 
            "name": "Upload Source & Audio",
            "text": "Add a video or single image plus your audio (voiceover, podcast, dialogue). Supported formats: MP4 / JPG / PNG / WAV / MP3.",
            "url": "https://www.infinitetalkai.org#how-it-works"
          },
          {
            "@type": "HowToStep",
            "name": "Generate & Export", 
            "text": "Hit Generate. Our sparse-frame engine aligns lip shapes, expressions, head movement, and posture to your audio and keeps identity consistent—even in long sequences. Download your result in 480p, 720p, or 1080p as MP4.",
            "url": "https://www.infinitetalkai.org#how-it-works"
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
        <Highlights />
        <UnderTheHood />
        <Specs />
        <FAQ />
      </main>
    </>
  );
}
