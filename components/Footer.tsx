import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative glass border-t border-white/10">
      {/* Gradient glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/logo.png" 
                  alt="Infinite Talk AI" 
                  width={36} 
                  height={36}
                  className="rounded-lg"
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
                <Link href="/terms" className="hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Refund Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Infinitetalk.ai. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
