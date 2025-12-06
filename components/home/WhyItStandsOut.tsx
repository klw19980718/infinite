import Image from 'next/image'

export default function WhyItStandsOut() {
  const items = [
    {
      title: "Multilingual to the core",
      description: "Tested across hundreds of languages and dialects in one unified pipeline.",
      href: "#multilingual-content",
      cta: "View multilingual examples",
      image: "https://cdn.infinitetalkai.org/infinite-talk-ai-multilingual-video-dubbing-illustration.jpg",
      alt: "Illustration of Infinite Talk AI handling multilingual video dubbing across hundreds of languages and dialects in one unified pipeline",
    },
    {
      title: "Infinite-length generation",
      description:
        "Render up to 600s per pass, then batch and stitch into longer episodes while keeping motion continuous.",
      href: "/lib/infinite-length-streaming-architecture",
      cta: "Learn how the streaming architecture works",
      image: "https://cdn.infinitetalkai.org/infinite-talk-ai-infinite-length-video-generation-timeline.jpg",
      alt: "Concept illustration of Infinite Talk AI infinite-length video generation with long timelines stitched from 600-second chunks while keeping motion continuous",
    },
    {
      title: "Beyond lip sync: sparse-frame, whole-frame dubbing",
      description:
        "Not just the mouth: audio drives lips, head motion, posture and micro‑expressions from a few keyframes.",
      href: "/lib/sparse-frame-video-dubbing",
      cta: "Learn what sparse-frame video dubbing means",
      image: "https://cdn.infinitetalkai.org/infinite-talk-ai-sparse-frame-whole-frame-video-dubbing.jpg",
      alt: "Illustration showing sparse-frame, whole-frame video dubbing where audio drives lips, head motion, posture and micro-expressions from a few keyframes",
    },
    {
      title: "Fast, high-quality outputs for any platform",
      description:
        "480p / 720p outputs with crisp timing and identity stability that benchmark well against recent systems.",
      href: "/lib/benchmarks",
      cta: "See metrics and benchmark details",
      image: "https://cdn.infinitetalkai.org/infinite-talk-ai-fast-high-quality-video-outputs-multi-platform.jpg",
      alt: "Illustration of fast high-quality AI video outputs from Infinite Talk AI in 480p and 720p for platforms like YouTube, TikTok and other social channels",
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-8">
          Why <span className="text-primary">Infinite Talk AI</span> stands out
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-border bg-card shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] bg-muted">
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-base md:text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
