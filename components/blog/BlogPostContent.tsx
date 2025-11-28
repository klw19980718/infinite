'use client'

import { TableOfContents } from './TableOfContents'

interface Heading {
  id: string
  text: string
  level: number
}

interface BlogPostContentProps {
  children: React.ReactNode
  headings: Heading[]
}

export function BlogPostContent({ children, headings }: BlogPostContentProps) {
  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>

      {/* Table of Contents - Desktop Only */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <TableOfContents headings={headings} />
      </aside>
    </div>
  )
}

