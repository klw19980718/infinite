import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_TRACKING_ID = 'G-BST9KGD31X';

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <>
          <main className="min-h-[calc(100vh-80px)]">
            {children}
          </main>
        </>
      </body>
    </html>
  )
}
