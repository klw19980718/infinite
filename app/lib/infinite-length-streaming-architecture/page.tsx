import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Beams } from '@/components/ui/beams'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { ChevronRight, Home, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Infinite-Length Streaming Architecture | Infinite Talk AI',
    description: 'How Infinite Talk AI uses a streaming architecture with chunks, context frames, and reference frames to scale sparse-frame video dubbing to practically infinite length.',
    keywords: [
        'Infinite Talk AI',
        'streaming architecture',
        'infinite-length dubbing',
        'context frames',
        'sparse-frame video dubbing',
    ],
    alternates: {
        canonical: 'https://www.infinitetalkai.org/lib/infinite-length-streaming-architecture',
    },
    openGraph: {
        title: 'Infinite-Length Streaming Architecture | Infinite Talk AI',
        description: 'How Infinite Talk AI uses a streaming architecture with chunks, context frames, and reference frames to scale sparse-frame video dubbing to practically infinite length.',
        type: 'article',
        url: 'https://www.infinitetalkai.org/lib/infinite-length-streaming-architecture',
        siteName: 'Infinite Talk AI',
        locale: 'en_US',
        images: [
            {
                url: 'https://cdn.infinitetalkai.org/lib/fig4.png',
                width: 1200,
                height: 630,
                alt: 'InfiniteTalk Streaming Architecture',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Infinite-Length Streaming Architecture | Infinite Talk AI',
        description: 'How Infinite Talk AI uses a streaming architecture to scale sparse-frame video dubbing to practically infinite length.',
        images: ['https://cdn.infinitetalkai.org/lib/fig4.png'],
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

export default function InfiniteLengthStreamingArchitecturePage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Infinite-Length Streaming Architecture in InfiniteTalk',
        description: 'How Infinite Talk AI uses a streaming architecture with chunks, context frames, and reference frames to scale sparse-frame video dubbing to practically infinite length.',
        image: 'https://cdn.infinitetalkai.org/lib/fig4.png',
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
            '@id': 'https://www.infinitetalkai.org/lib/infinite-length-streaming-architecture',
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
                    name: 'Infinite-Length Streaming Architecture',
                    item: 'https://www.infinitetalkai.org/lib/infinite-length-streaming-architecture',
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
                                    Infinite-Length Streaming Architecture
                                </li>
                            </ol>
                        </nav>

                        {/* Header */}
                        <header className="mb-12 md:mb-16">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                                Infinite-Length Streaming Architecture in <span className="text-accent">InfiniteTalk</span>
                            </h1>
                            <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60">
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty italic">
                                    How Infinite Talk AI scales sparse-frame video dubbing to practically infinite sequences.
                                </p>
                            </div>
                        </header>

                        {/* Section 1 */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                1. Why long-form dubbing is hard
                            </h2>
                            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    Most audio-driven video models work well on short clips, but start to break down on long sequences:
                                </p>
                                <ul className="list-none space-y-3 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span><strong className="text-foreground">Identity drift</strong> — Faces slowly change shape, skin tone shifts, and backgrounds morph over time.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span><strong className="text-foreground">Style and color drift</strong> — Each segment drifts in color and contrast, making the video look like it was shot on different cameras.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span><strong className="text-foreground">Visible seams between segments</strong> — Models that generate in fixed-length chunks often produce hard cuts in motion: head pose snaps, gestures reset, and continuity is lost.</span>
                                    </li>
                                </ul>
                                <p className="mt-6">
                                    Naive solutions behave like this:
                                </p>
                                <ul className="list-none space-y-4 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground mb-2">Plain audio-driven I2V</p>
                                            <ul className="list-none space-y-2 ml-0">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                    <span>Starts from a single reference frame and repeatedly rolls forward.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                    <span>Motion is free, but identity and scene drift accumulate.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground mb-2">First–Last-frame-constrained I2V (FL2V)</p>
                                            <ul className="list-none space-y-2 ml-0">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                    <span>Forces each chunk to match a fixed first and last frame.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                    <span>Prevents drift, but motion becomes stiff: the model copies poses instead of acting out the audio.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <div className="glass rounded-2xl p-6 md:p-8 border-l-4 border-accent mt-6">
                                    <p className="text-base md:text-lg text-foreground font-medium mb-2">
                                        The core challenge:
                                    </p>
                                    <p className="text-base md:text-lg text-foreground font-semibold italic">
                                        How do we support long or even "infinite" sequences without sacrificing natural, audio-driven motion?
                                    </p>
                                </div>
                            </div>

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
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                2. The streaming design of InfiniteTalk
                            </h2>
                            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    InfiniteTalk is built as a <strong className="text-foreground">streaming audio-driven video generator</strong> specifically for long-form dubbing.
                                </p>
                                <p>
                                    Its architecture is based on two ideas:
                                </p>
                                <ol className="list-decimal space-y-4 ml-6">
                                    <li>
                                        <strong className="text-foreground">Chunked generation</strong>
                                        <ul className="list-none space-y-2 ml-0 mt-2">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                <span>The video is divided into fixed-length chunks (e.g., 81 frames per block).</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                <span>The model generates each chunk in sequence.</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Context frames + reference frames</strong>
                                        <ul className="list-none space-y-2 ml-0 mt-2">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                <span><strong className="text-foreground">Context frames</strong>: a short history of previously generated frames that carries motion momentum forward.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                <span><strong className="text-foreground">Reference frames</strong>: sparsely sampled keyframes from the original video that anchor identity, background, and camera trajectory.</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ol>
                                <p className="mt-6">
                                    This combination lets InfiniteTalk:
                                </p>
                                <ul className="list-none space-y-3 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Use context frames to keep <strong className="text-foreground">motion continuous</strong> across chunks.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Use reference frames to prevent <strong className="text-foreground">identity and style drift</strong> over long durations.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Figure 4 */}
                            <div className="mt-8">
                                <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                        <Image
                                            src="https://cdn.infinitetalkai.org/lib/fig4.png"
                                            alt="Visualization of InfiniteTalk pipeline. Left: The streaming model receives a audio, a reference frame, and context frames to denoise iteratively. Right: The architecture of the diffusion transformer. In addition to the traditional structures, each block includes an audio cross-attention layer and a reference cross-attention layer"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                3. Context frames: keeping motion continuous
                            </h2>
                            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                                        3.1 What are context frames?
                                    </h3>
                                    <div className="space-y-4">
                                        <p>
                                            In InfiniteTalk, each chunk does <strong className="text-foreground">not</strong> start from scratch.
                                        </p>
                                        <p>
                                            Instead, when generating chunk <em>t</em>, the model also sees a short slice of frames from the end of chunk <em>t–1</em>.
                                            These frames are called <strong className="text-foreground">context frames</strong>.
                                        </p>
                                        <ul className="list-none space-y-2 ml-0">
                                            <li className="flex items-start gap-3">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                                <span>They are taken from already generated video.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                                <span>They are re-encoded by the video VAE into latent space.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                                <span>They are fed into the diffusion Transformer together with the new audio and reference frames.</span>
                                            </li>
                                        </ul>
                                        <div className="glass rounded-2xl p-6 md:p-8 border-l-4 border-accent mt-4">
                                            <p className="text-base md:text-lg text-foreground font-medium italic">
                                                Intuition:
                                            </p>
                                            <p className="text-base md:text-lg text-foreground mt-2">
                                                If the previous chunk ended with the character raising their head,
                                                the next chunk should start from that raised-head pose and continue naturally —
                                                not suddenly snap back to a neutral position.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                                        3.2 Example configuration
                                    </h3>
                                    <div className="space-y-4">
                                        <p>
                                            In the current setup (you can simplify details in the UI, keep them here for technical readers):
                                        </p>
                                        <ul className="list-none space-y-2 ml-0">
                                            <li className="flex items-start gap-3">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                                <span>A video is encoded into a latent sequence by a <strong className="text-foreground">video VAE</strong>.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                                <span>Each chunk covers <strong className="text-foreground">81 frames</strong> total.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                                <span>The model keeps a latent context length <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">tc</code> (for example, 3 latent frames derived from 9 context images).</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                                <span>For each step, InfiniteTalk generates <strong className="text-foreground">72 new frames</strong>, which are appended after the context frames.</span>
                                            </li>
                                        </ul>
                                        <p className="mt-4">
                                            Visually, you can imagine:
                                        </p>
                                        <div className="glass rounded-2xl p-6 md:p-8 border border-accent/60 font-mono text-sm md:text-base">
                                            <div className="space-y-2">
                                                <div>Chunk 1: <code className="text-accent">[Frames 1–81]</code></div>
                                                <div>Chunk 2: <code className="text-accent">[Context (Frames 73–81)] + [New Frames 82–153]</code></div>
                                                <div>Chunk 3: <code className="text-accent">[Context (Frames 145–153)] + [New Frames 154–225]</code></div>
                                                <div className="text-muted-foreground mt-2">…and so on.</div>
                                            </div>
                                        </div>
                                        <p className="mt-4">
                                            Context frames make motion across chunks feel like <strong className="text-foreground">one continuous take</strong>, rather than a set of stitched clips.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                4. Reference frames: preventing drift in identity and camera
                            </h2>
                            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    Context alone only solves continuity; it doesn't guarantee that:
                                </p>
                                <ul className="list-none space-y-2 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>The actor still looks like themselves.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>The background and camera style match the original footage.</span>
                                    </li>
                                </ul>
                                <p>
                                    To address this, InfiniteTalk also uses <strong className="text-foreground">reference frames</strong> sampled from the source video:
                                </p>
                                <ul className="list-none space-y-2 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>These are sparse keyframes selected from the original clip.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>They are encoded into latent features and fed to the diffusion Transformer.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>They act as soft anchors for:</span>
                                    </li>
                                </ul>
                                <ul className="list-none space-y-2 ml-6">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                                        <span>Face identity</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                                        <span>Clothing and lighting</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                                        <span>Background layout</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                                        <span>Global camera trajectory</span>
                                    </li>
                                </ul>
                                <p className="mt-4">
                                    During generation, each chunk is conditioned on:
                                </p>
                                <ul className="list-none space-y-2 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>The <strong className="text-foreground">dubbed audio</strong> for that time range</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>The <strong className="text-foreground">context frames</strong> from previous output</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>One or more <strong className="text-foreground">reference frames</strong> sampled according to a keyframe strategy</span>
                                    </li>
                                </ul>
                                <p className="mt-4">
                                    This is what allows InfiniteTalk to sustain:
                                </p>
                                <ul className="list-none space-y-2 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Consistent characters across minutes of video</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Stable backgrounds and camera motion</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>A coherent visual style, even as the audio and body motion evolve</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Figure 5 */}
                            <div className="mt-8">
                                <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-hidden">
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                        <Image
                                            src="https://cdn.infinitetalkai.org/lib/fig5.png"
                                            alt="Visualization of reference frame conditioning strategies for video dubbing models. Top four rows: conditioning on input video frames. Bottom row: conditioning on generated video frames. Left: Image-to-video dubbing model with initial frame conditioning (I2V) and initial+terminal frame conditioning (IT2V). Right: Streaming dubbing model with four conditioning strategies. Within each category (left/right), all strategies share identical generated-video conditioning approaches."
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-4 italic">
                                        Figure 5: Visualization of reference frame conditioning strategies for video dubbing models. Top
                                        four rows: conditioning on input video frames. Bottom row: conditioning on generated video frames.
                                        Left: Image-to-video dubbing model with initial frame conditioning (I2V) and initial+terminal frame
                                        conditioning (IT2V). Right: Streaming dubbing model with four conditioning strategies. Within each
                                        category (left/right), all strategies share identical generated-video conditioning approaches.
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground mt-4 italic">
                                    <em>(Note: detailed strategies M0–M3 for reference placement are covered in <Link href="/lib/soft-reference-control" className="text-accent hover:underline">soft-reference-control</Link>.)</em>
                                </p>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                5. I2V vs FL2V vs InfiniteTalk: architecture comparison
                            </h2>
                            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    To make the design trade-offs clear, here is a simple comparison:
                                </p>
                                <div className="glass rounded-2xl p-4 md:p-6 border border-accent/60 overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-border/50">
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Method</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Conditions used</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Context frames</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Long-form issues</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Best suited for</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-border/30">
                                                <td className="py-3 px-4">Plain I2V</td>
                                                <td className="py-3 px-4">Single reference image + previous frame</td>
                                                <td className="py-3 px-4 text-center">❌</td>
                                                <td className="py-3 px-4">Identity and style drift, motion instability</td>
                                                <td className="py-3 px-4">Short demos, toy examples</td>
                                            </tr>
                                            <tr className="border-b border-border/30">
                                                <td className="py-3 px-4">FL2V</td>
                                                <td className="py-3 px-4">First + last frame per chunk</td>
                                                <td className="py-3 px-4 text-center">❌</td>
                                                <td className="py-3 px-4">Pose snapping at boundaries, rigid motion</td>
                                                <td className="py-3 px-4">Medium clips with simple motion</td>
                                            </tr>
                                            <tr className="border-b border-border/30 bg-accent/5">
                                                <td className="py-3 px-4 font-semibold text-foreground">InfiniteTalk</td>
                                                <td className="py-3 px-4">Sparse reference frames + context + audio</td>
                                                <td className="py-3 px-4 text-center">✅</td>
                                                <td className="py-3 px-4">Smooth motion, stable identity and camera over time</td>
                                                <td className="py-3 px-4">Long-form dubbing, episodes</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                6. From theory to product: how Infinite Talk AI handles long videos
                            </h2>
                            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    On the product side (Infinite Talk AI), the streaming architecture is used roughly like this:
                                </p>
                                <ul className="list-none space-y-4 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground mb-2">Per-pass limit</p>
                                            <ul className="list-none space-y-2 ml-0">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                    <span>For practical compute and UX reasons, a single render pass may be capped (for example at ~600 seconds of output).</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground mb-2">Chunking and scheduling</p>
                                            <ul className="list-none space-y-2 ml-0">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                    <span>Long audio + source video are segmented into chunks that align with the model's preferred length.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                    <span>Each chunk:</span>
                                                </li>
                                                <ul className="list-none space-y-1 ml-4 mt-1">
                                                    <li className="flex items-start gap-2">
                                                        <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-accent/40 flex-shrink-0" />
                                                        <span>Receives its local audio segment.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-accent/40 flex-shrink-0" />
                                                        <span>Uses context frames from the end of the previous chunk.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="mt-1.5 h-0.5 w-0.5 rounded-full bg-accent/40 flex-shrink-0" />
                                                        <span>Shares a pool of reference frames sampled from the full source video.</span>
                                                    </li>
                                                </ul>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground mb-2">Stitching</p>
                                            <ul className="list-none space-y-2 ml-0">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                    <span>Generated chunks are concatenated along the timeline.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                                    <span>Because of overlapping context and soft reference control, seams at chunk boundaries are visually minimal.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <p className="mt-6">
                                    In practice, this allows Infinite Talk AI to support:
                                </p>
                                <ul className="list-none space-y-2 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Chapter-based workflows (e.g., segmenting a training course or a talk into natural sections).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Hour-scale programs composed of multiple passes.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Streaming-style pipelines where content is dubbed in batches but feels like one continuous performance.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 7 */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                7. Why this streaming architecture matters
                            </h2>
                            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    To summarize:
                                </p>
                                <ul className="list-none space-y-4 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground mb-2">Naive audio-driven I2V</p>
                                            <ul className="list-none space-y-2 ml-0">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500/60 flex-shrink-0" />
                                                    <span><strong className="text-foreground">Pros:</strong> free motion.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-red-500/60 flex-shrink-0" />
                                                    <span><strong className="text-foreground">Cons:</strong> accumulates drift in identity, style, and background over long durations.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground mb-2">FL2V with hard frame constraints</p>
                                            <ul className="list-none space-y-2 ml-0">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500/60 flex-shrink-0" />
                                                    <span><strong className="text-foreground">Pros:</strong> fixes identity drift.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-red-500/60 flex-shrink-0" />
                                                    <span><strong className="text-foreground">Cons:</strong> introduces pose snapping and stiff motion at chunk boundaries.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <div className="glass rounded-2xl p-6 md:p-8 border-l-4 border-accent mt-6">
                                    <p className="text-base md:text-lg text-foreground font-semibold mb-4">
                                        InfiniteTalk's streaming architecture combines the strengths without inheriting the weaknesses:
                                    </p>
                                    <ul className="list-none space-y-3 ml-0">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-foreground mb-1">Context frames</p>
                                                <p>Carry motion momentum forward, keeping gestures and head motion continuous across chunks.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-foreground mb-1">Sparse reference frames</p>
                                                <p>Anchor identity, background, and camera trajectory throughout the sequence.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-foreground mb-1">Chunked, audio-driven generation</p>
                                                <p>Scales to virtually unlimited length, while still letting the model act out the dubbed audio naturally.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <p className="mt-6">
                                    For creators, this means you can:
                                </p>
                                <ul className="list-none space-y-3 ml-0">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Dub long videos and episodic content without characters "melting" or "resetting" between segments.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Maintain a consistent visual identity and camera style across an entire series.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span>Deliver dubbing that feels like a single take, not a patchwork of disconnected clips.</span>
                                    </li>
                                </ul>
                                <div className="mt-8 p-6 glass rounded-2xl border border-accent/60">
                                    <p className="text-base md:text-lg text-muted-foreground mb-3">
                                        If you'd like to understand how reference placement and control strength are tuned in InfiniteTalk, continue with:
                                    </p>
                                    <Link
                                        href="/lib/soft-reference-control"
                                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                                    >
                                        <span>Soft Reference Control</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
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

