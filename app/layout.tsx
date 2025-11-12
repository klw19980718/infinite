import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script';
import Nav from '@/components/nav'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" suppressHydrationWarning className="light">
      <body className={`${inter.className} bg-background text-foreground`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'light';
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
