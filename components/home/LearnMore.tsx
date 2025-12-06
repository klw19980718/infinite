import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function LearnMore() {
  const learningResources = [
    {
      title: 'How to Make a Photo Talk with AI',
      description: 'Step-by-step guide to turn a single picture into a lip-synced talking video using Infinite Talk AI.',
      href: '/blog/how-to-make-a-photo-talk-with-ai',
      image: '/svg/how-to.svg',
    },
    {
      title: 'What Sparse-Frame Video Dubbing Really Means',
      description: 'Plain-language breakdown of how keyframes, audio, and streaming generation work together.',
      href: '/lib/sparse-frame-video-dubbing',
      image: '/svg/what.svg',
    },
    {
      title: 'From Talking Photos to Long-Form Dubbing',
      description: 'How the same engine scales from single-image talking heads to episode-length content.',
      href: '/lib/infinite-length-streaming-architecture',
      image: '/svg/time.svg',
    },
    {
      title: 'Benchmarking Infinite Talk AI',
      description: 'See how lip sync, identity, and motion compare to other dubbing systems.',
      href: '/lib/benchmarks',
      image: '/svg/test.svg',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-3">
          Learn more about{" "}
          <span className="text-primary">
            AI lip sync &amp; talking photos
          </span>
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl">
          Want a practical, non-technical guide to using Infinite Talk AI in your own workflow?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningResources.map((resource, index) => (
            <Link
              key={index}
              href={resource.href}
              className="group rounded-3xl border border-border bg-card shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full"
            >
              <div className="relative w-full aspect-[16/9] dark:bg-white dark:rounded-t-3xl">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
                <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed min-h-[3.4rem] md:min-h-[3.6rem]">
                  {resource.description}
                </p>
                <div className="mt-auto inline-flex items-center text-primary text-xs md:text-sm font-medium pt-1">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

