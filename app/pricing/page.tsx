import { Metadata } from 'next'
import { PricingPageClient } from './PricingPageClient'

export const metadata: Metadata = {
  title: 'Pricing & Plans – Credits Never Expire | Infinite Talk AI',
  description: 'One-time USD credits for AI video—Pro, Ultimate, Enterprise. Credits never expire. HD supported, downloads, commercial use, priority support.',
  keywords: ['Infinite Talk AI pricing', 'AI video credits', 'one-time purchase', 'HD generation', 'commercial use'],
  openGraph: {
    title: 'Pricing & Plans – Credits Never Expire | Infinite Talk AI',
    description: 'One-time USD credits for AI video—Pro, Ultimate, Enterprise. Credits never expire. HD supported, downloads, commercial use, priority support.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/pricing',
    siteName: 'Infinite Talk AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Plans – Credits Never Expire | Infinite Talk AI',
    description: 'One-time USD credits for AI video—Pro, Ultimate, Enterprise. Credits never expire. HD supported, downloads, commercial use, priority support.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PricingPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            "name": "Infinite Talk AI Pricing",
            "url": "https://www.infinitetalkai.org/pricing",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "Pro",
                "priceCurrency": "USD",
                "price": "29.90",
                "category": "one-time",
                "availability": "https://schema.org/InStock",
                "description": "Get 400 credits. HD supported. Commercial use. Priority support."
              },
              {
                "@type": "Offer",
                "name": "Ultimate",
                "priceCurrency": "USD",
                "price": "49.90",
                "category": "one-time",
                "availability": "https://schema.org/InStock",
                "description": "Get 800 credits. HD supported. Commercial use. Priority support."
              },
              {
                "@type": "Offer",
                "name": "Enterprise",
                "priceCurrency": "USD",
                "price": "99.90",
                "category": "one-time",
                "availability": "https://schema.org/InStock",
                "description": "Get 1800 credits. HD supported. Commercial use. Priority support."
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do Infinite Talk AI credits expire?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Credits never expire."
                }
              },
              {
                "@type": "Question",
                "name": "How do credits work on Infinite Talk AI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Standard costs 1 credit/sec; HD costs 2 credits/sec. Minimum 5 (Std) / 10 (HD). Max per job 600 seconds."
                }
              },
              {
                "@type": "Question",
                "name": "Is this a subscription?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. These are one-time USD purchases."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use the results commercially?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all paid plans include a commercial use license."
                }
              },
              {
                "@type": "Question",
                "name": "Where can I download receipts/invoices?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Invoices are available in your account after purchase."
                }
              },
              {
                "@type": "Question",
                "name": "Which plan should I pick?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start with Pro to trial workflows; choose Ultimate for best price/credit; use Enterprise for bulk rendering."
                }
              }
            ]
          })
        }}
      />
      <PricingPageClient />
    </>
  )
}
