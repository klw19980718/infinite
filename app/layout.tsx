import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script';
import Nav from '@/components/nav'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


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
        </>
      </body>
    </html>
  )
}
