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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
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
