import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Beams } from '@/components/ui/beams'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { ChevronRight, Home, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Benchmarks & Evaluation of InfiniteTalk | Infinite Talk AI',
  description:
    'Benchmarks of InfiniteTalk sparse-frame video dubbing on HDTF, CelebV-HQ, and EMTD, compared with traditional dubbing and audio-driven image-to-video baselines plus ablations.',
  keywords: [
    'Infinite Talk AI',
    'InfiniteTalk benchmarks',
    'video dubbing metrics',
    'Sync-C',
    'Sync-D',
    'FVD',
    'CSIM',
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/lib/benchmarks',
  },
  openGraph: {
    title: 'Benchmarks & Evaluation of InfiniteTalk | Infinite Talk AI',
    description:
      'Benchmarks of InfiniteTalk sparse-frame video dubbing on HDTF, CelebV-HQ, and EMTD, compared with traditional dubbing and audio-driven image-to-video baselines plus ablations.',
    type: 'article',
    url: 'https://www.infinitetalkai.org/lib/benchmarks',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
    images: [
      {
        url: 'https://cdn.infinitetalkai.org/lib/fig6.png',
        width: 1200,
        height: 630,
        alt: 'Visual comparison between InfiniteTalk and traditional dubbing models',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benchmarks & Evaluation of InfiniteTalk | Infinite Talk AI',
    description:
      'Benchmarks of InfiniteTalk sparse-frame video dubbing on HDTF, CelebV-HQ, and EMTD, compared with traditional dubbing and audio-driven image-to-video baselines plus ablations.',
    images: ['https://cdn.infinitetalkai.org/lib/fig6.png'],
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

export default function BenchmarksPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Benchmarks & Evaluation of InfiniteTalk',
    description:
      'Quantitative and qualitative benchmarks of InfiniteTalk sparse-frame video dubbing on public datasets, compared with traditional dubbing and audio-driven image-to-video baselines.',
    image: 'https://cdn.infinitetalkai.org/lib/fig6.png',
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
      '@id': 'https://www.infinitetalkai.org/lib/benchmarks',
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
          name: 'Benchmarks & Evaluation',
          item: 'https://www.infinitetalkai.org/lib/benchmarks',
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
                  Benchmarks &amp; Evaluation
                </li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Benchmarks &amp; Evaluation of{' '}
                <span className="text-accent">InfiniteTalk</span>
              </h1>
              <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty italic">
                  How InfiniteTalk compares to traditional dubbing and
                  audio-driven I2V models on public datasets—and what that means
                  for real productions.
                </p>
              </div>
            </header>

            {/* Section 1 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                1. What we benchmark
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  InfiniteTalk is evaluated on three public datasets that cover
                  both <strong className="text-foreground">talking-head</strong>{' '}
                  and <strong className="text-foreground">full-body</strong>{' '}
                  motion:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">HDTF</strong> – high
                      quality talking-head videos with rich facial dynamics.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">CelebV-HQ</strong> –
                      high-resolution celebrity clips with diverse poses,
                      lighting, and styles.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">EMTD</strong> – clips
                      with full-body motion, used to test gesture and
                      body–audio synchronization.
                    </span>
                  </li>
                </ul>

                <p className="mt-6">
                  We compare InfiniteTalk against two families of baselines:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4 border border-border/60">
                    <p className="font-semibold text-foreground mb-2">
                      Traditional dubbing (mouth-only)
                    </p>
                    <ul className="list-none space-y-1 ml-0">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>LatentSync</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>MuseTalk</span>
                      </li>
                    </ul>
                  </div>
                  <div className="glass rounded-xl p-4 border border-border/60">
                    <p className="font-semibold text-foreground mb-2">
                      Audio-driven image-to-video (I2V)
                    </p>
                    <ul className="list-none space-y-1 ml-0">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>FantacyTalking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>Hallo3</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>OmniAvatar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>MultiTalk</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="mt-6">
                  To evaluate both visuals and synchronization, we track five
                  automatic metrics:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">FID</strong>{' '}
                      (↓) – per-frame visual quality.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">FVD</strong>{' '}
                      (↓) – temporal coherence across frames.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Sync-C</strong>{' '}
                      (↑) – confidence score for lip–audio synchronization.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Sync-D</strong>{' '}
                      (↓) – distance metric for lip sync.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">CSIM</strong>{' '}
                      (↑) – identity similarity between input and output.
                    </span>
                  </li>
                </ul>

                <p className="mt-6">
                  We also run a human study that asks participants to rate lip
                  sync, head &amp; body alignment, identity consistency, and
                  overall naturalness.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                2. Traditional dubbing vs sparse-frame dubbing
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Traditional dubbing systems like LatentSync and MuseTalk only
                  inpaint a small region around the{' '}
                  <strong className="text-foreground">mouth</strong> and keep
                  the rest of the frame unchanged. This tends to:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      Produce very strong FID/FVD scores, because most pixels
                      are copied from the original video.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      Leave head and body motion unchanged, so the performance
                      often feels disconnected from the new audio.
                    </span>
                  </li>
                </ul>

                <p className="mt-4">
                  InfiniteTalk instead re-generates the{' '}
                  <strong className="text-foreground">entire frame</strong> in
                  an audio-driven way, using sparse keyframes as anchors for
                  identity and camera. This means lips, head, and upper body all
                  move with the dubbed speech.
                </p>

                {/* Table 1 image */}
                <div className="mt-8">
                  <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                      <Image
                        src="https://cdn.infinitetalkai.org/lib/table1.png"
                        alt="Quantitative comparisons between InfiniteTalk and traditional mouth-only dubbing models on HDTF, CelebV-HQ, and EMTD."
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center italic">
                      Table 1 · Comparison with traditional mouth-only dubbing
                      models. InfiniteTalk achieves strong lip sync while
                      animating the whole frame.
                    </p>
                  </div>
                </div>

                <p className="mt-4">
                  The key takeaway is that InfiniteTalk trades a small amount of
                  “copy-the-input” FID/FVD for{' '}
                  <strong className="text-foreground">
                    natural, full-frame performances
                  </strong>
                  —which is what actually matters for dubbed content.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                3. Audio-driven I2V vs InfiniteTalk
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Audio-driven image-to-video models like FantacyTalking,
                  Hallo3, OmniAvatar, and MultiTalk start from a single
                  reference image and generate a full video from audio. They
                  perform well on short clips, but for longer sequences they
                  tend to:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      Drift in <strong className="text-foreground">
                        identity
                      </strong>{' '}
                      and <strong className="text-foreground">style</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      Struggle to keep motion and appearance stable over time.
                    </span>
                  </li>
                </ul>

                <p className="mt-4">
                  InfiniteTalk focuses on{' '}
                  <strong className="text-foreground">
                    video-to-video dubbing
                  </strong>{' '}
                  instead of single-image animation. With its streaming
                  architecture, context frames, and sparse keyframes, it:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      Keeps identity and background stable over long sequences.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      Produces strong lip and body sync that follows the dubbed
                      audio.
                    </span>
                  </li>
                </ul>

                {/* Table 2 image */}
                <div className="mt-8">
                  <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                      <Image
                        src="https://cdn.infinitetalkai.org/lib/table2.png"
                        alt="Quantitative comparisons between InfiniteTalk and audio-driven image-to-video baselines on HDTF, CelebV-HQ, and EMTD."
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center italic">
                      Table 2 · Comparison with audio-driven image-to-video
                      baselines. InfiniteTalk delivers strong lip sync and
                      competitive visual metrics while solving the harder
                      video-to-video dubbing problem.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                4. Visual and human evaluation
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Numbers only tell part of the story. The paper also presents
                  qualitative comparisons and a human study on the EMTD dataset.
                </p>

                {/* Figure 6 image */}
                <div className="mt-4">
                  <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                      <Image
                        src="https://cdn.infinitetalkai.org/lib/fig6.png"
                        alt="Visual comparison between InfiniteTalk and traditional dubbing methods across several clips."
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center italic">
                      Figure 6 · Visual comparison between traditional
                      mouth-only dubbing and InfiniteTalk. InfiniteTalk animates
                      the whole frame, not just the mouth region.
                    </p>
                  </div>
                </div>

                <p className="mt-4">
                  In the human evaluation:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      Participants ranked methods on lip sync, body sync,
                      identity consistency, and overall naturalness.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      InfiniteTalk achieved the{' '}
                      <strong className="text-foreground">
                        highest average ranking
                      </strong>{' '}
                      for both lip sync and body motion alignment.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      Mouth-only baselines are limited by the fact that they
                      cannot adjust body motion at all.
                    </span>
                  </li>
                </ul>

                <p className="mt-4">
                  For most productions, this means that if you care about{' '}
                  <strong className="text-foreground">
                    how the dubbing feels to watch
                  </strong>
                  , full-frame methods like InfiniteTalk are strongly preferred
                  over patch-based edits.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                5. Ablation on soft reference control (M0–M3)
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Reference sampling matters. The paper evaluates four variants
                  of InfiniteTalk on EMTD, each using a different strategy for
                  placing reference frames in time:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">M0</strong> – same
                      chunk (very strong, local control).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">M1</strong> – first /
                      last frame of each chunk (hard boundary locking).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">M2</strong> – distant
                      chunks (very weak control).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">M3</strong> –
                      neighboring chunks (balanced soft control).
                    </span>
                  </li>
                </ul>

                {/* Table 3 image */}
                <div className="mt-8">
                  <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                    <div className="relative w-full aspect-[16/5] rounded-xl overflow-hidden">
                      <Image
                        src="https://cdn.infinitetalkai.org/lib/table3.png"
                        alt="Ablation results for M0–M3 reference sampling strategies on EMTD."
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center italic">
                      Table 3 · Ablation on reference sampling strategies. M3
                      offers the best balance between visual stability and
                      lip-sync quality.
                    </p>
                  </div>
                </div>

                <p className="mt-4">
                  In short, M0 and M1 over-constrain motion, M2 under-constrains
                  identity, and{' '}
                  <strong className="text-foreground">M3</strong> provides the
                  best trade-off. That is why M3-like sampling is used as the
                  default soft reference control strategy in InfiniteTalk.
                </p>

                <div className="mt-6 p-4 glass rounded-xl border border-accent/60">
                  <p className="text-sm text-muted-foreground">
                    For a deeper conceptual explanation of soft reference
                    control and the M0–M3 strategies, see:{' '}
                    <Link
                      href="/lib/soft-reference-control"
                      className="text-accent hover:underline font-medium"
                    >
                      /lib/soft-reference-control
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                6. Camera control benchmarks
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Many real videos include camera motion—slow pans, handheld
                  shake, zoom in/out. The paper investigates how well
                  InfiniteTalk can preserve this when dubbing.
                </p>
                <p>
                  Two plugin-style variants are evaluated on top of InfiniteTalk:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        InfiniteTalk + SDEdit
                      </strong>{' '}
                      – injects a noisy version of the source trajectory into
                      the generation process, better reproducing subtle camera
                      motion while keeping backgrounds stable.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        InfiniteTalk + Uni3C
                      </strong>{' '}
                      – adds a ControlNet-like branch for camera motion control;
                      it matches motion but can sometimes distort backgrounds.
                    </span>
                  </li>
                </ul>

                {/* Figure 7 image */}
                <div className="mt-8">
                  <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                      <Image
                        src="https://cdn.infinitetalkai.org/lib/fig7.png"
                        alt="Camera control comparison between InfiniteTalk, InfiniteTalk+SDEdit, and InfiniteTalk+Uni3C."
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center italic">
                      Figure 7 · Camera control comparison. Different plugins
                      offer trade-offs between motion fidelity and background
                      preservation.
                    </p>
                  </div>
                </div>

                <p className="mt-4">
                  These experiments inform future product options like “preserve
                  original camera motion” or “stabilize camera,” depending on
                  your content needs.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                7. How to interpret these benchmarks as a creator
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Putting everything together, you can read the benchmarks like
                  this:
                </p>
                <div className="glass rounded-2xl p-4 md:p-6 border border-border/60 overflow-x-auto">
                  <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Dimension
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Traditional dubbing
                          <span className="block text-xs font-normal text-muted-foreground">
                            (mouth-only)
                          </span>
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Audio-driven I2V
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          InfiniteTalk
                          <span className="block text-xs font-normal text-muted-foreground">
                            (sparse-frame)
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/30">
                        <td className="py-3 px-4">Lip sync</td>
                        <td className="py-3 px-4">Good</td>
                        <td className="py-3 px-4">Good</td>
                        <td className="py-3 px-4 font-semibold text-foreground">
                          Best (metrics + human)
                        </td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 px-4">Head &amp; body alignment</td>
                        <td className="py-3 px-4">
                          Poor (body never changes)
                        </td>
                        <td className="py-3 px-4">Medium (short clips)</td>
                        <td className="py-3 px-4 font-semibold text-foreground">
                          Best, even on long clips
                        </td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 px-4">
                          Identity &amp; background stability
                        </td>
                        <td className="py-3 px-4">
                          Very high (copies input)
                        </td>
                        <td className="py-3 px-4">
                          Degrades over long sequences
                        </td>
                        <td className="py-3 px-4 font-semibold text-foreground">
                          Stable with sparse keyframes
                        </td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 px-4">Temporal coherence (FVD)</td>
                        <td className="py-3 px-4">
                          Excellent but trivial (little change)
                        </td>
                        <td className="py-3 px-4">Good, then drifts</td>
                        <td className="py-3 px-4 font-semibold text-foreground">
                          Competitive with full-frame edits
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Full-frame dubbing</td>
                        <td className="py-3 px-4">✗ Mouth only</td>
                        <td className="py-3 px-4">✓ Image-to-video</td>
                        <td className="py-3 px-4 font-semibold text-foreground">
                          ✓ Video-to-video dubbing
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6">
                  For your own content, you can think in terms of priorities:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      If you care about{' '}
                      <strong className="text-foreground">
                        natural performances that match the dubbed voice
                      </strong>
                      , InfiniteTalk&apos;s full-frame, audio-driven approach is
                      what the metrics and human studies support.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      If you care about{' '}
                      <strong className="text-foreground">
                        long-form content
                      </strong>{' '}
                      like courses, series, or episodes, the streaming
                      architecture and soft reference control are designed
                      specifically for that regime.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>
                      Traditional patch-based edits are still useful when you
                      just need quick mouth fixes, but they cannot replace
                      full-frame dubbing when body language matters.
                    </span>
                  </li>
                </ul>

                <div className="mt-8 p-6 glass rounded-2xl border border-accent/60">
                  <p className="text-base md:text-lg text-foreground font-semibold mb-4">
                    Want to see how these results connect to the underlying
                    architecture?
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/lib/sparse-frame-video-dubbing"
                      className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>Learn the sparse-frame dubbing paradigm</span>
                    </Link>
                    <Link
                      href="/lib/infinite-length-streaming-architecture"
                      className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>
                        See how InfiniteTalk scales dubbing to long sequences
                      </span>
                    </Link>
                    <Link
                      href="/lib/soft-reference-control"
                      className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>
                        Understand how soft reference control balances stability
                        and motion
                      </span>
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
