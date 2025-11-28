import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function LearnMore() {
  const learningResources = [
    {
      title: 'How to Make a Photo Talk with AI',
      description: 'Step-by-step guide to turn a single picture into a lip-synced talking video using Infinite Talk AI.',
      href: '/blog/how-to-make-a-photo-talk-with-ai',
    },
    {
      title: 'What Sparse-Frame Video Dubbing Really Means',
      description: 'Plain-language breakdown of how keyframes, audio, and streaming generation work together.',
      href: '/lib/sparse-frame-video-dubbing',
    },
    {
      title: 'From Talking Photos to Long-Form Dubbing',
      description: 'How the same engine scales from single-image talking heads to episode-length content.',
      href: '/lib/infinite-length-streaming-architecture',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Learn more about AI lip sync & talking photos
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Want a practical, non-technical guide to using Infinite Talk AI in your own workflow?
          </p>

          <div className="space-y-4">
            {learningResources.map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                className="group block glass rounded-2xl p-6 md:p-8 border border-accent/60 hover:border-accent hover:glass-strong transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

