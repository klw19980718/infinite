import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script';
import Nav from '@/components/nav'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_TRACKING_ID = 'G-BST9KGD31X';

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${outfit.className} bg-background text-foreground`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  const root = document.documentElement;
                  root.classList.remove('dark', 'light');
                  root.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <>
          <Nav />
          <main className="min-h-[calc(100vh-80px)]">
            {children}
          </main>
          <Footer />
          <Toaster />
        </>
      </body>
    </html>
  )
}
