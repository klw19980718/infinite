import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Infinite Talk AI',
  description: 'Latest news, updates, and insights about Infinite Talk AI and AI video generation technology.',
  keywords: ['Infinite Talk AI blog', 'AI video generation', 'talking video', 'lip sync technology'],
  openGraph: {
    title: 'Blog | Infinite Talk AI',
    description: 'Latest news, updates, and insights about Infinite Talk AI and AI video generation technology.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/blog',
    siteName: 'Infinite Talk AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Infinite Talk AI',
    description: 'Latest news, updates, and insights about Infinite Talk AI and AI video generation technology.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Blog posts data
const blogPosts = [
  {
    slug: 'how-to-make-a-photo-talk-with-ai',
    title: 'How to Make a Photo Talk with AI (Step-by-Step Guide)',
    description: 'Learn how to make a photo talk with AI using Infinite Talk AI. Step-by-step workflow to animate a picture to talk, with lip sync and full-frame performance.',
    date: '2025-01-27',
    readTime: '10 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-16 pb-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="py-12 sm:py-16">
          {/* Header Section - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
            {/* Left Column - Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-primary">
                  Blog
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
                Latest news, updates, and insights about Infinite Talk AI
              </p>
            </div>

            {/* Right Column - SVG Image */}
            <div className="flex items-center justify-center lg:justify-end order-first lg:order-last">
              <div className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]">
                <Image
                  src="/svg/blog.svg"
                  alt="Blog illustration"
                  width={644}
                  height={569}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group p-6 sm:p-8 rounded-2xl border border-border dark:border-[#5a5a5a] bg-card dark:bg-[#4a4a4a] hover:bg-card/80 dark:hover:bg-[#5a5a5a] hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-200 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {post.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      <span>Read more</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

