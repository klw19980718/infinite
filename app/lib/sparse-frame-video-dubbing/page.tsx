import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Beams } from '@/components/ui/beams'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { ChevronRight, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sparse-Frame Video Dubbing in InfiniteTalk — How It Works',
  description: 'Learn how Infinite Talk AI goes beyond mouth-only dubbing to deliver full-frame, audio-synchronized performances using sparse-frame video dubbing technology.',
  keywords: [
    'sparse-frame dubbing',
    'video dubbing',
    'InfiniteTalk',
    'Infinite Talk AI',
    'audio-driven video',
    'video localization',
    'multilingual dubbing',
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/lib/sparse-frame-video-dubbing',
  },
  openGraph: {
    title: 'Sparse-Frame Video Dubbing in InfiniteTalk — How It Works',
    description: 'Learn how Infinite Talk AI goes beyond mouth-only dubbing to deliver full-frame, audio-synchronized performances using sparse-frame video dubbing technology.',
    type: 'article',
    url: 'https://www.infinitetalkai.org/lib/sparse-frame-video-dubbing',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
    images: [
      {
        url: 'https://cdn.infinitetalkai.org/lib/fig1.png',
        width: 1200,
        height: 630,
        alt: 'Sparse-Frame Video Dubbing Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sparse-Frame Video Dubbing in InfiniteTalk — How It Works',
    description: 'Learn how Infinite Talk AI goes beyond mouth-only dubbing to deliver full-frame, audio-synchronized performances.',
    images: ['https://cdn.infinitetalkai.org/lib/fig1.png'],
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

export default function SparseFrameDubbingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sparse-Frame Video Dubbing in InfiniteTalk — How It Works',
    description: 'Learn how Infinite Talk AI goes beyond mouth-only dubbing to deliver full-frame, audio-synchronized performances using sparse-frame video dubbing technology.',
    image: 'https://cdn.infinitetalkai.org/lib/fig1.png',
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
      '@id': 'https://www.infinitetalkai.org/lib/sparse-frame-video-dubbing',
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
          name: 'Sparse-Frame Video Dubbing',
          item: 'https://www.infinitetalkai.org/lib/sparse-frame-video-dubbing',
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
                  Sparse-Frame Video Dubbing
                </li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Sparse-Frame Video Dubbing in <span className="text-accent">InfiniteTalk</span>
              </h1>
              <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty italic">
                  How Infinite Talk AI goes beyond mouth-only dubbing to deliver full-frame, audio-synchronized performances.
                </p>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border/50">
                <p className="text-sm md:text-base text-muted-foreground">
                  If you just want a practical, non-technical guide for using this engine to turn a single image into a talking video, see our tutorial on{' '}
                  <Link 
                    href="/blog/how-to-make-a-photo-talk-with-ai" 
                    className="text-accent hover:underline font-medium"
                  >
                    how to make a photo talk with AI
                  </Link>.
                </p>
              </div>
            </header>

            {/* Main Visual - Figure 1 */}
            <div className="mb-12 md:mb-16">
              <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <Image
                    src="https://cdn.infinitetalkai.org/lib/fig1.png"
                    alt="Compared to the traditional paradigm, sparse-frame video dubbing will not only edit mouth regions. It gives the model freedom to generate audio aligned mouth, facial, and body movements while referencing on sparse keyframes to preserve identity, emotional cadence, and iconic gestures."
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Figure 1: : Compared to the traditional paradigm, sparse-frame video dubbing will not only edit mouth
                  regions. It gives the model freedom to generate audio aligned mouth, facial, and body movements
                  while referencing on sparse keyframes to preserve identity, emotional cadence, and iconic gestures.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                1. Why mouth-only dubbing is not enough
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Most "video dubbing" systems today only edit a tiny region around the mouth.
                </p>
                <p>
                  They inpaint lips to roughly match the new audio, but everything else stays frozen:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Head barely moves.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Eyebrows and micro-expressions don't react to emphasis.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>The body posture and hands ignore the speech rhythm.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Camera motion from the original clip is kept, but the performance feels disconnected from the voice.</span>
                  </li>
                </ul>
                <p>
                  This creates the classic <strong className="text-foreground">"talking sticker"</strong> effect:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>The voice may sound energetic, but the face and body remain stiff.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Emotional beats in the script don't line up with visible changes in expression or pose.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Over longer clips, the mismatch becomes increasingly distracting and breaks immersion.</span>
                  </li>
                </ul>
                <p>
                  For short memes, this can be acceptable.
                </p>
                <p>
                  For dubbed interviews, explainers, learning content, or character-driven stories, it's not.
                </p>
                <div className="glass rounded-2xl p-6 md:p-8 border-l-4 border-accent mt-6">
                  <p className="text-base md:text-lg text-foreground font-medium italic">
                    Our goal with Infinite Talk AI is to make the entire frame respond to the new audio — not just the lips.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                2. What is sparse-frame video dubbing?
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Sparse-frame video dubbing</strong> is a new paradigm introduced by the InfiniteTalk research.
                </p>
                <p>
                  Instead of editing every frame or only inpainting the mouth, we:
                </p>
                <ol className="list-decimal space-y-3 ml-6">
                  <li><strong className="text-foreground">Select a sparse set of keyframes from the original video</strong>, and</li>
                  <li><strong className="text-foreground">Use those keyframes as high-level anchors</strong>, while</li>
                  <li><strong className="text-foreground">Letting the model freely generate all in-between frames in sync with the new audio.</strong></li>
                </ol>
                <p>
                  These keyframes act as <strong className="text-foreground">control points</strong> for:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-foreground">Identity</strong> — who the person is (face structure, hairstyle, clothing).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-foreground">Emotional cadence</strong> — where the original performance speeds up, slows down, or hits strong emotional beats.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-foreground">Iconic gestures</strong> — recognisable hand movements or poses that define the scene.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-foreground">Camera trajectory</strong> — framing, zoom, and rough camera path across the shot.</span>
                  </li>
                </ul>
                <p>
                  The model then generates the full dubbed video such that:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Lips, face, head, and body are <strong className="text-foreground">driven by the new speech</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Keyframes ensure the actor still looks like themselves and stays consistent across time.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>The camera still feels like the original shot, not a completely new recording.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                3. How Infinite Talk AI implements sparse-frame dubbing
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Sparse-frame video dubbing in Infinite Talk AI is powered by the <strong className="text-foreground">InfiniteTalk</strong> architecture — a streaming, audio-driven video generator.
                </p>

                <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    3.1 Keyframe selection
                  </h3>
                  <div className="space-y-4">
                    <p>
                      From the input video, InfiniteTalk samples a set of <strong className="text-foreground">keyframes</strong> at perceptually important moments.
                    </p>
                    <p>
                      These frames are encoded as reference images and serve as anchors for:
                    </p>
                    <ul className="list-none space-y-2 ml-0">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Facial identity and style</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Clothing and background</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Global camera movement</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Emotional rhythm from the original footage</span>
                      </li>
                    </ul>
                    <p>
                      The rest of the frames are not copied — they are regenerated in a way that respects both:
                    </p>
                    <ul className="list-none space-y-2 ml-0">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>The <strong className="text-foreground">new audio</strong>, and</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>The <strong className="text-foreground">constraints implied by the keyframes</strong>.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    3.2 Audio-driven full-frame generation
                  </h3>
                  <div className="space-y-4">
                    <p>
                      InfiniteTalk is trained to take:
                    </p>
                    <ul className="list-none space-y-2 ml-0">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>The <strong className="text-foreground">dubbed audio track</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>The <strong className="text-foreground">selected keyframes</strong> (image references)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>A <strong className="text-foreground">context window</strong> of recent frames (for motion continuity)</span>
                      </li>
                    </ul>
                    <p>
                      and to output the next chunk of video in latent space.
                    </p>
                    <p>
                      Instead of only modifying a mouth patch, it generates the <strong className="text-foreground">entire frame</strong>:
                    </p>
                    <ul className="list-none space-y-2 ml-0">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Lips form correct visemes for the spoken phonemes.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Jaw, cheeks, and eyes move in sync with emphasis.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Head turns, tilts, and nods follow the speech rhythm.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Shoulders, torso, and upper-body posture react naturally over time.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    3.3 Context frames for long sequences
                  </h3>
                  <div className="space-y-4">
                    <p>
                      To handle long clips, InfiniteTalk operates in <strong className="text-foreground">overlapping chunks</strong> with <strong className="text-foreground">context frames</strong>:
                    </p>
                    <ul className="list-none space-y-2 ml-0">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Each new chunk sees a short history of frames from the previous chunk.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>This transfers <strong className="text-foreground">motion momentum</strong> forward, so gestures and head movement continue smoothly.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Combined with keyframes, this lets the model maintain both:</span>
                      </li>
                    </ul>
                    <ul className="list-none space-y-2 ml-6">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Long-term identity and camera consistency.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Short-term motion coherence and audio alignment.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                4. Why we don't just use audio-driven I2V
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  A natural question:
                </p>
                <div className="glass rounded-2xl p-6 md:p-8 border-l-4 border-accent">
                  <p className="text-base md:text-lg text-foreground font-medium italic">
                    "Can't we just plug the audio into a generic image-to-video (I2V) model and call it dubbing?"
                  </p>
                </div>
                <p>
                  The InfiniteTalk paper shows why this fails in practice:
                </p>

                <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60 mt-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                    Plain I2V with audio
                  </h3>
                  <ul className="list-none space-y-2 ml-0">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Starts from a single reference frame and rolls forward.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Over long sequences, identity drifts: the face subtly changes, colors shift, backgrounds morph.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Motion can become unstable and jittery.</span>
                    </li>
                  </ul>
                </div>

                <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60 mt-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                    First–Last-frame-constrained I2V
                  </h3>
                  <ul className="list-none space-y-2 ml-0">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Forces the model to strictly match both the first and last frame of each chunk.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Prevents identity drift, but makes motion rigid.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>The model simply "copies poses" from the constraints instead of acting out the audio.</span>
                    </li>
                  </ul>
                </div>

                <p className="mt-6">
                  Sparse-frame video dubbing with InfiniteTalk is designed specifically to avoid this trade-off:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Keyframes are <strong className="text-foreground">soft constraints</strong>: they keep identity and scene style stable…</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>…while the generator <strong className="text-foreground">remains free</strong> to animate the full body in sync with the new speech.</span>
                  </li>
                </ul>

                {/* Figure 2 */}
                <div className="mt-8">
                  <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <Image
                        src="https://cdn.infinitetalkai.org/lib/fig2.png"
                        alt="(left): I2V model accumulates error for long video sequences. (right): A new chunk starts from frame 82. FL2V model suffers from abrupt inter-chunk transitions."
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Figure 2: (left): I2V model accumulates error for long video sequences. (right): A new chunk starts from frame 82. FL2V model suffers from abrupt inter-chunk transitions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                5. What sparse-frame dubbing gives you in practice
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  From a creator's perspective, sparse-frame video dubbing translates to a few concrete benefits.
                </p>

                <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    5.1 Natural, full-frame performances
                  </h3>
                  <ul className="list-none space-y-3 ml-0">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Actors don't just "open and close their mouths" — their <strong className="text-foreground">whole body</strong> participates in the performance.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Emotional beats in the script are visible as:</span>
                    </li>
                    <ul className="list-none space-y-2 ml-6 mt-2">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Stronger head movements</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Shifts in posture</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Changes in facial expression</span>
                      </li>
                    </ul>
                    <li className="flex items-start gap-3 mt-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Result: dubbed content feels <strong className="text-foreground">acted</strong>, not just <strong className="text-foreground">lip-edited</strong>.</span>
                    </li>
                  </ul>
                </div>

                <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    5.2 Identity-stable across long videos
                  </h3>
                  <p className="mb-3">
                    Because keyframes encode the original actor and style:
                  </p>
                  <ul className="list-none space-y-2 ml-0">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>The same character stays consistent across minutes, not just a couple of seconds.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Clothing, hair, and lighting match the source footage.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Camera framing and motion feel like the original shoot, even when the audio is completely different.</span>
                    </li>
                  </ul>
                </div>

                <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    5.3 Scales to episodes and series
                  </h3>
                  <p className="mb-3">
                    The streaming nature of InfiniteTalk means:
                  </p>
                  <ul className="list-none space-y-2 ml-0">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>You can process long segments (e.g. up to 600 seconds per pass) and stitch them seamlessly.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Overlapping context windows ensure motion continuity between chunks.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Sparse keyframes keep identity locked even when you generate chapter-length or episode-length content.</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    This makes Infinite Talk AI suitable for:
                  </p>
                  <ul className="list-none space-y-2 ml-0">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Multi-language localization of series and interviews</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Long-form educational and training content</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Serialized storytelling and character-driven channels</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                6. When should you use sparse-frame dubbing?
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Use sparse-frame video dubbing whenever:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>The <strong className="text-foreground">performance matters more than just "the lips match"</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Viewers need to stay immersed for more than a few seconds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Characters or hosts appear repeatedly across episodes</span>
                  </li>
                </ul>
                <p>
                  Typical use cases:
                </p>
                <ul className="list-none space-y-3 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Dubbing YouTube explainers and talking-head channels into multiple languages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Revoicing corporate trainings, lectures, and webinars</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Turning static studio interviews into multilingual, globally localised content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Creating character-consistent avatars that appear across many scenes and scripts</span>
                  </li>
                </ul>
                <p>
                  For very short clips or quick memes, mouth-only tools may be enough.
                </p>
                <p>
                  For anything longer, sparse-frame video dubbing is what keeps your dubbed content <strong className="text-foreground">watchable</strong>.
                </p>
              </div>
            </section>

            {/* Section 7 - Summary */}
            <section className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                7. Summary
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <ul className="list-none space-y-4 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-foreground">Mouth-only dubbing</strong> edits a small patch around the lips and leaves the rest of the frame frozen.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-foreground">Sparse-frame video dubbing</strong> instead:</span>
                  </li>
                  <ul className="list-none space-y-2 ml-6 mt-2">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Keeps a <strong className="text-foreground">small set of keyframes</strong> from the original video,</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Uses them to anchor <strong className="text-foreground">identity, emotion, gestures, and camera</strong>, and</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Lets InfiniteTalk <strong className="text-foreground">generate the full frame</strong> in sync with the new audio.</span>
                    </li>
                  </ul>
                </ul>
                <p>
                  In Infinite Talk AI, this design is what allows you to:
                </p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Dub long videos while keeping characters stable,</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>Make the whole frame react to speech,</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>And deliver performances that feel natural rather than mechanical.</span>
                  </li>
                </ul>
              </div>
            </section>


          </div>
        </article>

        <ScrollToTop />
      </main>
    </>
  )
}

