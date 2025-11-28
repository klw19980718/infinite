import { Metadata } from 'next'
import Link from 'next/link'
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
    <div className="min-h-screen pt-16 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Latest news, updates, and insights about Infinite Talk AI
          </p>
          
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group p-6 sm:p-8 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 hover:border-border transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
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
                    
                    <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
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
  )
}

