import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/60">
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/logo-new.png" 
                  alt="Infinite Talk AI" 
                  width={36} 
                  height={36}
                  className="object-cover rounded-2xl"
                />
              </div>
              <span className="font-semibold text-xl text-foreground">Infinite Talk AI</span>
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Turn any image or video into long-form talking footage with our sparse-frame pipeline for accurate lip-sync and stable motion.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-5 text-base text-foreground">Legal</h3>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-primary transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Refund Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {/* ProjectHunt Badge */}
            <a
              href="https://projecthunt.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="180" height="48" role="img" aria-label="Featured on: projecthunt.me">
                <title>Featured on projecthunt.me</title>
                <g>
                  <rect width="180" height="48" rx="4" fill="#FFFFFF" stroke="#E85C0D" strokeWidth="1.5"/>
                </g>
                <g transform="translate(10, 8)">
                  <image href="https://projecthunt.me/favicon.ico" width="32" height="32"/>
                </g>
                <g fill="#666666" textAnchor="start" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif">
                  <text x="50" y="22" fontSize="13" fontWeight="500">Featured on</text>
                  <text x="50" y="38" fontSize="14" fontWeight="600" fill="#E85C0D">projecthunt.me</text>
                </g>
              </svg>
            </a>

            {/* Findly Tools Badge */}
            <a
              href="https://findly.tools/infinite-talk-ai?utm_source=infinite-talk-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src="https://findly.tools/badges/findly-tools-badge-light.svg"
                alt="Featured on findly.tools"
                width="150"
              />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Infinitetalk.ai. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a 
                href="mailto:support@infinitetalkai.org" 
                className="hover:text-primary transition-colors"
              >
                support@infinitetalkai.org
              </a>
              <a 
                href="https://www.infinitetalkai.org" 
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                infinitetalkai.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
