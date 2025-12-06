import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Beams } from '@/components/ui/beams'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { ArrowRight, BookOpen, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation Center — Infinite Talk AI',
  description: 'Explore technical documentation, guides, and resources for Infinite Talk AI. Learn about sparse-frame video dubbing, architecture, and best practices.',
  keywords: [
    'Infinite Talk AI documentation',
    'sparse-frame dubbing',
    'video dubbing guide',
    'InfiniteTalk technical docs',
    'AI video generation documentation',
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/lib',
  },
  openGraph: {
    title: 'Documentation Center — Infinite Talk AI',
    description: 'Explore technical documentation, guides, and resources for Infinite Talk AI.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/lib',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.infinitetalkai.org/logo.png',
        width: 1200,
        height: 630,
        alt: 'Infinite Talk AI Documentation Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation Center — Infinite Talk AI',
    description: 'Explore technical documentation, guides, and resources for Infinite Talk AI.',
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
  category: 'documentation',
}

// Documentation items
const documentationItems = [
  {
    id: 'sparse-frame-video-dubbing',
    title: 'Sparse-Frame Video Dubbing in InfiniteTalk',
    description: 'Learn how Infinite Talk AI goes beyond mouth-only dubbing to deliver full-frame, audio-synchronized performances using sparse-frame video dubbing technology.',
    href: '/lib/sparse-frame-video-dubbing',
    category: 'Technical Guide',
    icon: FileText,
  },
  {
    id: 'infinite-length-streaming-architecture',
    title: 'Infinite-Length Streaming Architecture',
    description: 'How Infinite Talk AI uses a streaming architecture with chunks, context frames, and reference frames to scale sparse-frame video dubbing to practically infinite length.',
    href: '/lib/infinite-length-streaming-architecture',
    category: 'Architecture',
    icon: FileText,
  },
  {
    id: 'soft-reference-control',
    title: 'Soft Reference Control and Keyframe Sampling',
    description: 'How InfiniteTalk uses soft reference control and keyframe sampling strategies to balance identity stability and natural motion in sparse-frame video dubbing.',
    href: '/lib/soft-reference-control',
    category: 'Technical Guide',
    icon: FileText,
  },
  {
    id: 'benchmarks',
    title: 'Benchmarks & Evaluation',
    description: 'Benchmarks of InfiniteTalk sparse-frame video dubbing on HDTF, CelebV-HQ, and EMTD, compared with traditional dubbing and audio-driven I2V baselines.',
    href: '/lib/benchmarks',
    category: 'Evaluation',
    icon: FileText,
  },
  // Add more documentation items here as they are created
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Infinite Talk AI Documentation Center',
  description: 'Technical documentation, guides, and resources for Infinite Talk AI',
  url: 'https://www.infinitetalkai.org/lib',
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: documentationItems.length,
    itemListElement: documentationItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        '@id': `https://www.infinitetalkai.org${item.href}`,
        name: item.title,
        description: item.description,
        url: `https://www.infinitetalkai.org${item.href}`,
      },
    })),
  },
}

export default function DocumentationCenterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-background relative min-h-screen">
        
        
        <article className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-6">
            {/* Header Section - Two Column Layout */}
            <header className="mb-12 md:mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Column - Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card dark:bg-[#4a4a4a] border border-border dark:border-[#5a5a5a] shadow-lg dark:shadow-xl">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                    <span className="text-foreground">Documentation</span>
                    <br />
                    <span className="text-primary">Center</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
                    Explore technical documentation, guides, and resources to understand how Infinite Talk AI works and how to get the most out of it.
                  </p>
                </div>

                {/* Right Column - SVG Image */}
                <div className="flex items-center justify-center lg:justify-end order-first lg:order-last">
                  <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
                    <Image
                      src="/svg/docs.svg"
                      alt="Documentation Center illustration"
                      width={952}
                      height={586}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </header>

            <div className="max-w-5xl mx-auto">

            {/* Documentation List */}
            <section className="space-y-6">
              {documentationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group block bg-card dark:bg-[#4a4a4a] rounded-2xl p-6 md:p-8 border border-border dark:border-[#5a5a5a] hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-card/50 dark:bg-[#3a3a3a] border border-border dark:border-[#5a5a5a] flex items-center justify-center group-hover:border-primary/50 dark:group-hover:border-primary/50 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-semibold text-primary/70 dark:text-primary/80 uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {item.title}
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                          <span>Read more</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </section>

            {/* Coming Soon Section */}
            {documentationItems.length === 0 && (
              <section className="text-center py-16">
                <div className="bg-card dark:bg-[#4a4a4a] rounded-2xl p-12 border border-border dark:border-[#5a5a5a] shadow-lg dark:shadow-xl max-w-2xl mx-auto">
                  <p className="text-lg text-muted-foreground">
                    More documentation is coming soon. Check back later for additional guides and resources.
                  </p>
                </div>
              </section>
            )}

              {/* Back to Home Link */}
              <section className="mt-16 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Back to Home</span>
                </Link>
              </section>
            </div>
          </div>
        </article>
        
        <ScrollToTop />
      </main>
    </>
  )
}

