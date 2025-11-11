import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Image 
                src="/logo.png" 
                alt="Infinite Talk AI" 
                width={28} 
                height={28}
                className="rounded-lg"
              />
              <span className="font-semibold text-base">Infinite Talk AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turn any image or video into long-form talking footage with our sparse-frame pipeline for accurate lip-sync and stable motion.
            </p>
          </div>

          {/* Product - TODO: Add pages later */}
          {/* <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Support - TODO: Add pages later */}
          {/* <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@infinitetalkai.org" 
                  className="hover:text-foreground transition-colors"
                >
                  support@infinitetalkai.org
                </a>
              </li>
            </ul>
          </div> */}

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-accent transition-colors">
                  Refund Policy
                </Link>
              </li>
              {/* TODO: Add pages later */}
              {/* <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Security
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-4 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground">
              © 2025 Infinitetalk.ai. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a 
                href="mailto:support@infinitetalkai.org" 
                className="hover:text-accent transition-colors"
              >
                support@infinitetalkai.org
              </a>
              <a 
                href="https://www.infinitetalkai.org" 
                className="hover:text-accent transition-colors"
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
