import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Beams } from '@/components/ui/beams'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { ChevronRight, Home, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Soft Reference Control in InfiniteTalk | Infinite Talk AI',
  description: 'How InfiniteTalk uses soft reference control and keyframe sampling strategies to balance identity stability and natural motion in sparse-frame video dubbing.',
  keywords: [
    'Infinite Talk AI',
    'InfiniteTalk',
    'soft reference control',
    'keyframe sampling',
    'sparse-frame dubbing',
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/lib/soft-reference-control',
  },
  openGraph: {
    title: 'Soft Reference Control in InfiniteTalk | Infinite Talk AI',
    description: 'How InfiniteTalk uses soft reference control and keyframe sampling strategies to balance identity stability and natural motion in sparse-frame video dubbing.',
    type: 'article',
    url: 'https://www.infinitetalkai.org/lib/soft-reference-control',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
    images: [
      {
        url: 'https://cdn.infinitetalkai.org/lib/fig3.png',
        width: 1200,
        height: 630,
        alt: 'Soft Reference Control Strategies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soft Reference Control in InfiniteTalk | Infinite Talk AI',
    description: 'How InfiniteTalk uses soft reference control and keyframe sampling strategies to balance identity stability and natural motion.',
    images: ['https://cdn.infinitetalkai.org/lib/fig3.png'],
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
  category: 'technology',
}

export default function SoftReferenceControlPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Soft Reference Control and Keyframe Sampling in InfiniteTalk',
    description: 'How InfiniteTalk uses soft reference control and keyframe sampling strategies to balance identity stability and natural motion in sparse-frame video dubbing.',
    image: 'https://cdn.infinitetalkai.org/lib/fig3.png',
    author: {
      '@type': 'Organization',
      name: 'Infinite Talk AI',
      url: 'https://www.infinitetalkai.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Infinite Talk AI',
      url: 'https://www.infinitetalkai.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.infinitetalkai.org/logo.png',
      },
    },
    datePublished: '2025-01-27',
    dateModified: '2025-01-27',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.infinitetalkai.org/lib/soft-reference-control',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.infinitetalkai.org',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Docs',
          item: 'https://www.infinitetalkai.org/lib',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Soft Reference Control',
          item: 'https://www.infinitetalkai.org/lib/soft-reference-control',
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-background relative min-h-screen">
        <Beams />
        
        <article className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li>
                  <Link
                    href="/lib"
                    className="hover:text-foreground transition-colors"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li className="text-foreground font-medium" aria-current="page">
                  Soft Reference Control
                </li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Soft Reference Control and Keyframe Sampling in <span className="text-accent">InfiniteTalk</span>
              </h1>
              <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty italic">
                  How Infinite Talk AI keeps faces stable without freezing motion.
                </p>
              </div>
            </header>

            {/* Section 1 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                1. The problem with "hard" control
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  When you condition a generative video model on reference frames, you have to decide <strong className="text-foreground">how strongly</strong> those references should influence each generated frame.
                </p>
                <p>
                  Two extremes:
                </p>
                <ul className="list-none space-y-4 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-2">Too weak control</p>
                      <ul className="list-none space-y-2 ml-0">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                          <span>The model ignores the reference over time.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                          <span>Identity drifts, backgrounds morph, and the character stops looking like the source actor.</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-2">Too strong control</p>
                      <ul className="list-none space-y-2 ml-0">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                          <span>The model copies the reference pose literally.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                          <span>Head and body movements are locked to the reference frame instead of following the audio.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                          <span>Performances look stiff and out of sync with speech.</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <p className="mt-6">
                  Classic approaches tend to fall into one of these extremes:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-foreground">Plain audio-driven I2V</strong>: weak control → free motion, but identity drift.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-foreground">First–Last-frame-constrained video</strong>: hard control → stable identity, but rigid, pose-copying motion.</span>
                  </li>
                </ul>
                <p className="mt-6">
                  Sparse-frame video dubbing demands something more subtle:
                </p>
                <div className="glass rounded-2xl p-6 md:p-8 border-l-4 border-accent mt-6">
                  <p className="text-base md:text-lg text-foreground font-semibold italic">
                    We want references to <strong>lock identity and style</strong>,
                    but still let the model <strong>move the whole body in sync with the dubbed audio</strong>.
                  </p>
                </div>
                <p className="mt-4">
                  This is where <strong className="text-foreground">soft reference control</strong> comes in.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                2. What is soft reference control?
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  In InfiniteTalk, "soft reference control" means:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Reference frames are used as <strong className="text-foreground">soft anchors</strong>, not hard templates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>The model learns to <strong className="text-foreground">adapt control strength</strong> based on:</span>
                  </li>
                </ul>
                <ul className="list-none space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    <span>How similar the current context is to the reference, and</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    <span>Where in the sequence the reference is placed.</span>
                  </li>
                </ul>
                <p className="mt-6">
                  Practically, this results in:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">High identity and background consistency</p>
                      <p>The actor keeps looking like themselves, even over long sequences.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Flexible head and body motion</p>
                      <p>Head turns, gestures, and posture are free to follow the audio.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Fewer "pose copy" artifacts</p>
                      <p>The model doesn't just freeze the user at the exact reference pose.</p>
                    </div>
                  </li>
                </ul>
                <p className="mt-6">
                  Instead of hand-tuning dozens of weights, InfiniteTalk learns this behavior through <strong className="text-foreground">how reference frames are sampled during training</strong>.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                3. Four sampling strategies: M0–M3
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The InfiniteTalk paper explores four different strategies (M0–M3) for selecting reference frames during training. These strategies control <strong className="text-foreground">where in time</strong> the reference comes from, relative to the chunk being generated.
                </p>

                {/* Figure 3 */}
                <div className="mt-8">
                  <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <Image
                        src="https://cdn.infinitetalkai.org/lib/fig3.png"
                        alt="A visual comparison between the training reference positioning strategies. All video chunks are generated using the same context frames and the same reference frame shown in below."
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center italic">
                      A visual comparison between the training reference positioning strategies. All video chunks are generated using the same context frames and the same reference frame shown in below.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    3.1 M0 — Random-in-chunk reference (too strong and misaligned)
                  </h3>
                  <div className="space-y-4">
                    <p>
                      In <strong className="text-foreground">M0</strong>, the reference frame is sampled uniformly from within the <strong className="text-foreground">same chunk</strong> that the model is trying to generate.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="glass rounded-xl p-4 border border-green-500/30">
                        <p className="font-semibold text-foreground mb-2 text-green-600 dark:text-green-400">Pros:</p>
                        <ul className="list-none space-y-1 ml-0">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500/60 flex-shrink-0" />
                            <span>The reference is always temporally close and visually similar.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="glass rounded-xl p-4 border border-red-500/30">
                        <p className="font-semibold text-foreground mb-2 text-red-600 dark:text-red-400">Cons:</p>
                        <ul className="list-none space-y-1 ml-0">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-red-500/60 flex-shrink-0" />
                            <span>Control becomes <strong className="text-foreground">too strong</strong> and <strong className="text-foreground">too local</strong>:</span>
                          </li>
                          <li className="flex items-start gap-2 ml-4">
                            <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-red-500/40 flex-shrink-0" />
                            <span>The model tends to copy the reference pose even when it doesn't match the audio at that exact moment.</span>
                          </li>
                          <li className="flex items-start gap-2 ml-4">
                            <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-red-500/40 flex-shrink-0" />
                            <span>You can get situations where the character suddenly performs a "big gesture" at the wrong beat because it was in the reference frame.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-4">
                      Effectively, M0 encourages <strong className="text-foreground">pose copying</strong> instead of <strong className="text-foreground">audio-driven acting</strong>.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    3.2 M1 — First/last frame reference (hard boundary locking)
                  </h3>
                  <div className="space-y-4">
                    <p>
                      In <strong className="text-foreground">M1</strong>, the reference is always taken from the <strong className="text-foreground">first or last frame</strong> of each chunk.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="glass rounded-xl p-4 border border-green-500/30">
                        <p className="font-semibold text-foreground mb-2 text-green-600 dark:text-green-400">Pros:</p>
                        <ul className="list-none space-y-1 ml-0">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500/60 flex-shrink-0" />
                            <span>Strongly stabilizes boundaries between chunks.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500/60 flex-shrink-0" />
                            <span>Reduces identity drift at chunk edges.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="glass rounded-xl p-4 border border-red-500/30">
                        <p className="font-semibold text-foreground mb-2 text-red-600 dark:text-red-400">Cons:</p>
                        <ul className="list-none space-y-1 ml-0">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-red-500/60 flex-shrink-0" />
                            <span>This leads to <strong className="text-foreground">hard locking at the chunk boundaries</strong>:</span>
                          </li>
                          <li className="flex items-start gap-2 ml-4">
                            <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-red-500/40 flex-shrink-0" />
                            <span>The model feels compelled to match the boundary pose very precisely.</span>
                          </li>
                          <li className="flex items-start gap-2 ml-4">
                            <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-red-500/40 flex-shrink-0" />
                            <span>Motion at the start and end of each chunk can look stiff or jerk back towards the reference frame.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-4">
                      M1 behaves like a "soft FL2V": better than pure FL2V, but still too rigid around chunk boundaries.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    3.3 M2 — Distant-chunk reference (too weak)
                  </h3>
                  <div className="space-y-4">
                    <p>
                      In <strong className="text-foreground">M2</strong>, reference frames are sampled from <strong className="text-foreground">chunks that are far away in time</strong> (e.g., several seconds apart).
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="glass rounded-xl p-4 border border-green-500/30">
                        <p className="font-semibold text-foreground mb-2 text-green-600 dark:text-green-400">Pros:</p>
                        <ul className="list-none space-y-1 ml-0">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500/60 flex-shrink-0" />
                            <span>Control is very soft; motion follows audio freely.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="glass rounded-xl p-4 border border-red-500/30">
                        <p className="font-semibold text-foreground mb-2 text-red-600 dark:text-red-400">Cons:</p>
                        <ul className="list-none space-y-1 ml-0">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-red-500/60 flex-shrink-0" />
                            <span>Control is often <strong className="text-foreground">too weak</strong>:</span>
                          </li>
                          <li className="flex items-start gap-2 ml-4">
                            <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-red-500/40 flex-shrink-0" />
                            <span>Identity and background consistency degrade over long sequences.</span>
                          </li>
                          <li className="flex items-start gap-2 ml-4">
                            <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-red-500/40 flex-shrink-0" />
                            <span>The model has little reason to stay close to the original look when the reference is temporally far.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-4">
                      M2 behaves a lot like plain audio-driven I2V:
                      you get freedom, but you pay with <strong className="text-foreground">drift</strong>.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    3.4 M3 — Neighboring-chunk reference (best balance)
                  </h3>
                  <div className="space-y-4">
                    <p>
                      In <strong className="text-foreground">M3</strong>, reference frames are sampled from <strong className="text-foreground">neighboring chunks</strong>—close in time, but not always from the same chunk.
                    </p>
                    <ul className="list-none space-y-3 ml-0">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>The reference remains <strong className="text-foreground">visually similar</strong> to the current context.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>It is <strong className="text-foreground">not fixed to the exact boundary frame</strong>, so the model isn't forced to copy a specific pose.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Control strength becomes <strong className="text-foreground">adaptive</strong>:</span>
                      </li>
                    </ul>
                    <ul className="list-none space-y-2 ml-6">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>Strong enough to prevent drift.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>Soft enough to let head and body motion follow the audio naturally.</span>
                      </li>
                    </ul>
                    <p className="mt-4">
                      In experiments, M3 yields the best overall trade-off across:
                    </p>
                    <ul className="list-none space-y-2 ml-0">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Lip-sync metrics (e.g., Sync-C / Sync-D).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Temporal consistency (FVD).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Identity similarity (CSIM).</span>
                      </li>
                    </ul>
                    <p className="mt-4">
                      This makes <strong className="text-foreground">M3-like sampling</strong> the default behavior behind InfiniteTalk's soft reference control.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                4. How soft reference control works at training time
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  At training time, InfiniteTalk learns soft reference control through its <strong className="text-foreground">flow-matching / diffusion training objective</strong> combined with the reference sampling strategy:
                </p>
                <ol className="list-decimal space-y-4 ml-6">
                  <li>
                    <p className="mb-2">For each training video:</p>
                    <ul className="list-none space-y-2 ml-0 mt-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>A target chunk is selected.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>Context frames (recent history) are selected.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>A reference frame is sampled using one of the M0–M3 strategies.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>Audio features for the current time span are extracted.</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="mb-2">The model is trained to reconstruct the target chunk:</p>
                    <ul className="list-none space-y-2 ml-0 mt-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>Using the <strong className="text-foreground">audio</strong> to drive lips, face, head, and body.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>Using <strong className="text-foreground">context frames</strong> to maintain motion continuity.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>Using the <strong className="text-foreground">reference frame</strong> as a soft constraint on appearance and camera.</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="mb-2">Because M3 tends to produce the best performance:</p>
                    <ul className="list-none space-y-2 ml-0 mt-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>The model learns that references from neighboring chunks usually provide a good "anchor" without over-constraining the pose.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>Over many examples, it discovers how to balance audio-driven motion with reference-driven stability.</span>
                      </li>
                    </ul>
                  </li>
                </ol>
                <p className="mt-6">
                  There is no explicit "control strength knob" in the architecture;
                  instead, <strong className="text-foreground">control strength emerges from how references are sampled in time.</strong>
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                5. What the ablation study shows
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The paper includes an ablation comparing M0–M3 on long-form dubbing benchmarks. You don't need every number here, but the trends are:
                </p>
                <ul className="list-none space-y-4 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">M0 (same-chunk reference)</p>
                      <p>Over-constrained → good identity stability, but more pose-copy artifacts and worse sync metrics.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">M1 (first/last-frame reference)</p>
                      <p>Strong boundary locking → less drift, but visible stiffness at chunk edges.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">M2 (distant reference)</p>
                      <p>Under-constrained → freer motion, but identity and background stability degrade over time.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">M3 (neighboring-chunk reference)</p>
                      <p>Best overall balance → strong identity & background stability, good lip and body sync, smooth motion across chunks.</p>
                    </div>
                  </li>
                </ul>

                {/* Comparison Table */}
                <div className="mt-8">
                  <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Strategy</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Reference position</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Control strength</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Typical issue</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/30">
                          <td className="py-3 px-4 font-mono">M0</td>
                          <td className="py-3 px-4">Inside current chunk</td>
                          <td className="py-3 px-4">Too strong / local</td>
                          <td className="py-3 px-4">Pose copying, wrong beats</td>
                        </tr>
                        <tr className="border-b border-border/30">
                          <td className="py-3 px-4 font-mono">M1</td>
                          <td className="py-3 px-4">First / last frame of chunk</td>
                          <td className="py-3 px-4">Hard at boundaries</td>
                          <td className="py-3 px-4">Stiff motion at chunk edges</td>
                        </tr>
                        <tr className="border-b border-border/30">
                          <td className="py-3 px-4 font-mono">M2</td>
                          <td className="py-3 px-4">Distant chunks</td>
                          <td className="py-3 px-4">Too weak</td>
                          <td className="py-3 px-4">Identity / background drift</td>
                        </tr>
                        <tr className="border-b border-border/30 bg-accent/5">
                          <td className="py-3 px-4 font-mono font-semibold text-foreground">M3</td>
                          <td className="py-3 px-4 font-semibold text-foreground">Neighboring chunks</td>
                          <td className="py-3 px-4 font-semibold text-foreground">Balanced (soft)</td>
                          <td className="py-3 px-4 font-semibold text-foreground">Best overall sync & stability</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 p-4 glass rounded-xl border border-accent/60">
                  <p className="text-sm text-muted-foreground">
                    For detailed numerical scores (FID, FVD, Sync-C/D, CSIM), see:{' '}
                    <Link href="/lib/benchmarks" className="text-accent hover:underline font-medium">
                      /lib/benchmarks
                    </Link>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                6. What this means for creators
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  From a user's perspective, soft reference control has very concrete benefits:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-foreground">Your character stays recognizable</strong>, even in long videos.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p><strong className="text-foreground">Their body and head can still act</strong>:</p>
                      <ul className="list-none space-y-1 ml-4 mt-2">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-accent/40 flex-shrink-0" />
                          <span>Leaning in, looking away, nodding, gesturing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-accent/40 flex-shrink-0" />
                          <span>Without being locked into whatever pose was in the reference image.</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p><strong className="text-foreground">Chunk boundaries disappear</strong>:</p>
                      <ul className="list-none space-y-1 ml-4 mt-2">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-accent/40 flex-shrink-0" />
                          <span>You can render long clips in segments without obvious seams at the joins.</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <p className="mt-6">
                  This is especially important when:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>You dub entire episodes, courses, or multi-part interviews.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>The same character appears across dozens of clips and languages.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>You want performances that feel alive, not like rigid puppets.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                7. Summary and next steps
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Hard reference control either drifts (too weak) or freezes motion (too strong).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>InfiniteTalk uses <strong className="text-foreground">soft reference control</strong>:</span>
                  </li>
                </ul>
                <ul className="list-none space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    <span>Context frames for continuity.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    <span>Sparsely sampled reference frames for stability.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    <span>Carefully chosen sampling strategies (like M3) to balance both.</span>
                  </li>
                </ul>
                <p className="mt-6">
                  This design lets Infinite Talk AI:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Maintain identity and scene consistency over long sequences.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Still let full-frame motion follow the dubbed audio.</span>
                  </li>
                </ul>
                <div className="mt-8 p-6 glass rounded-2xl border border-accent/60">
                  <p className="text-base md:text-lg text-foreground font-semibold mb-4">
                    To see how soft reference control fits into the overall system:
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/lib/sparse-frame-video-dubbing"
                      className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>Read about the sparse-frame dubbing paradigm</span>
                    </Link>
                    <Link
                      href="/lib/infinite-length-streaming-architecture"
                      className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>Learn how InfiniteTalk handles long sequences with context frames and chunking</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>
        
        <ScrollToTop />
      </main>
    </>
  )
}

