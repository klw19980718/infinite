
import { AuroraHero, HowItWorks, Highlights, UnderTheHood, FAQ, Specs, WhyItStandsOut, ExampleVideos } from '@/components/home';
import { Beams } from '@/components/ui/beams';
import { Plasma } from '@/components/ui/plasma';
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

// 视频分类和 ID 配置
const videoCategories = [
  {
    key: "multilingual",
    title: "Multilingual content",
    ids: ["22955", "22969", "22977", "22868"],
    dir: "languages",
  },
  {
    key: "songs",
    title: "Songs & Music Videos",
    ids: ["22742", "22810", "22863", "22935", "22947"],
    dir: "songs",
  },
  {
    key: "cartoons",
    title: "Cartoons & Characters",
    ids: ["22893", "22943", "22960"],
    dir: "cartoons",
  },
  {
    key: "ads",
    title: "Ads & Promos",
    ids: ["22737", "22953"],
    dir: "ads",
  },
  {
    key: "podcasts",
    title: "Podcasts / Product Demos / News",
    ids: ["22800", "22802", "22844", "22928"],
    dir: "blogs",
  },
  {
    key: "shorts",
    title: "Shorts & Vlogs",
    ids: ["22823", "22927", "22956"],
    dir: "short-videos",
  },
  {
    key: "memes",
    title: "Memes & Parodies",
    ids: ["22876", "22855"],
    dir: "parody",
  },
];

// 语言映射
const languageMap: Record<string, string> = {
  "22955": "Hindi",
  "22969": "English",
  "22977": "Japanese",
  "22868": "Chinese",
};

// 与 ExampleVideos 文案保持一致的分类描述
const categoryDescriptions: Record<string, string> = {
  multilingual:
    "many languages (English, Chinese/Mandarin, Japanese, Hindi, Spanish, French, German, Portuguese, Korean, Arabic, Russian, and other major languages)",
  songs: "sing-along covers, duets, lyric-synced performances",
  cartoons: "animated hosts, kid-friendly narration, voice swaps",
  ads: "15–30s product spots, feature highlights, brand intros",
  podcasts: "virtual anchors, multilingual briefings, how-tos",
  shorts: "daily stories, travel explainers, creator intros, social clips",
  memes: "over-the-top reactions, remixed lines, comedic dubs",
};

// 生成视频的 VideoObject 结构化数据
function generateVideoStructuredData() {
  const baseUrl = "https://www.infinitetalkai.org";
  const cdnUrl = "https://cdn.infinitetalkai.org";
  const uploadDate = "2024-01-01T00:00:00+00:00"; // 默认上传日期，可根据实际情况调整
  
  return videoCategories.flatMap((category) =>
    category.ids.map((id) => {
      const thumbnailUrl = `${cdnUrl}/${category.dir}/infinite-talk-ai-${id}.jpg`;
      const contentUrl = `${cdnUrl}/${category.dir}/infinite-talk-ai-${id}.mp4`;
      const language = languageMap[id] || "";
      const name = language
        ? `${category.title} - ${language} Example`
        : `${category.title} Example - Video ${id}`;
      const categoryInfo = categoryDescriptions[category.key] || category.title;
      const baseLabel = language
        ? `${language} ${category.title.toLowerCase()}`
        : category.title.toLowerCase();
      const description = `${baseLabel} — ${categoryInfo}. Created with Infinite Talk AI: studio-grade lip sync, natural expression, multilingual publishing.`;

      return {
        "@type": "VideoObject",
        name,
        description,
        thumbnailUrl,
        uploadDate,
        contentUrl,
        embedUrl: baseUrl, // 指向包含视频的页面
        publisher: {
          "@type": "Organization",
          name: "Infinite Talk AI",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`,
          },
        },
      };
    })
  );
}

export default function Home() {
  const videoStructuredData = generateVideoStructuredData();
  
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
      },
      ...videoStructuredData,
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    
        
        <div className="relative z-10">
          <AuroraHero />
          <WhyItStandsOut />
          <ExampleVideos />
          <HowItWorks />
          <Specs />
          <Highlights />
          <UnderTheHood />
          <FAQ />
          
          {/* Final CTA */}
          <section className="py-32 md:py-40 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
              <div className="max-w-4xl mx-auto glass-strong rounded-3xl p-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                  Ship courses, demos, and episodes faster.
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty font-light max-w-2xl mx-auto">
                  Start free, adjust clarity and prompts as needed, and build your production pipeline with Infinite Talk AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
                  <a href="/infinite-talk-ai/image-to-video" className="group relative flex items-center gap-3 rounded-full bg-accent px-10 py-5 text-accent-foreground text-lg font-semibold hover:bg-accent/90 hover:scale-105 transition-all duration-300 shadow-2xl glow-lime">
                    <span>Start Generating</span>
                  </a>
                  <a href="/pricing" className="group relative flex items-center gap-3 rounded-full glass px-10 py-5 text-foreground text-lg font-semibold hover:glass-strong transition-all duration-300">
                    <span>Get Credits</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
