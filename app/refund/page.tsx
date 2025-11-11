import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy | Infinite Talk AI',
  description: 'Refund Policy for Infinite Talk AI - Learn about our refund policy for credits and subscriptions. Contact support@infinitetalkai.org for refund requests.',
  keywords: [
    'refund policy',
    'refund',
    'money back',
    'infinite talk ai',
    'refund request',
    'cancellation',
    'refund terms',
    'return policy'
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/refund',
  },
  openGraph: {
    title: 'Refund Policy | Infinite Talk AI',
    description: 'Refund Policy for Infinite Talk AI - Learn about our refund policy for credits and subscriptions.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/refund',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Refund Policy | Infinite Talk AI',
    description: 'Refund Policy for Infinite Talk AI - Learn about our refund policy for credits and subscriptions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RefundPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Infinite Talk AI's refund policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Credits purchased are generally non-refundable once purchased and added to your account. However, we may consider refund requests on a case-by-case basis for technical issues, service failures, or exceptional circumstances. Contact support@infinitetalkai.org within 7 days of purchase to request a refund."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a refund for unused credits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unused credits are generally non-refundable. Credits are digital goods that are immediately available upon purchase. However, if you experience technical issues preventing you from using credits, contact our support team at support@infinitetalkai.org and we will review your case."
        }
      },
      {
        "@type": "Question",
        "name": "How do I request a refund?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To request a refund, please email support@infinitetalkai.org with your account email, order details, and reason for the refund request. We will review your request and respond within 5-7 business days."
        }
      },
      {
        "@type": "Question",
        "name": "What is the refund processing time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your refund request is approved, refunds are typically processed within 1-2 business days. The refund will be issued to the original payment method used for the purchase. Processing times may vary depending on your payment provider."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any circumstances where refunds are guaranteed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Refunds may be considered for: (1) Technical failures preventing service use, (2) Duplicate charges, (3) Unauthorized transactions, (4) Service discontinuation without alternative, or (5) Other exceptional circumstances as determined by our support team."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background pt-30">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Refund Policy — Infinite Talk AI</h1>
          
          <div className="prose prose-neutral max-w-none">
            <p className="text-muted-foreground mb-8">
              <strong>Last updated:</strong> January 27, 2025<br />
              <strong>Owner:</strong> Infinitetalk ai ("we", "us", "our")<br />
              <strong>Contact:</strong> support@infinitetalkai.org
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1) General Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Credits purchased through Infinite Talk AI are generally <strong>non-refundable</strong> once purchased and added to your account. Credits are digital goods that are immediately available for use upon purchase.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                However, we understand that exceptional circumstances may arise. We may consider refund requests on a <strong>case-by-case basis</strong> for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2 mt-4">
                <li>Technical failures or service outages preventing you from using the service</li>
                <li>Duplicate charges or billing errors</li>
                <li>Unauthorized transactions</li>
                <li>Service discontinuation without providing a reasonable alternative</li>
                <li>Other exceptional circumstances as determined by our support team</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2) How to Request a Refund</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To request a refund, please contact our support team:
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Email:</strong> <a href="mailto:support@infinitetalkai.org" className="text-primary hover:underline">support@infinitetalkai.org</a>
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Please include the following information in your refund request:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-1 mt-2">
                  <li>Your account email address</li>
                  <li>Order ID or transaction details</li>
                  <li>Date of purchase</li>
                  <li>Reason for refund request</li>
                  <li>Any relevant screenshots or documentation</li>
                </ul>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Refund requests should be submitted <strong>within 7 days</strong> of the original purchase date. Requests submitted after this period may still be considered but are less likely to be approved.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3) Refund Processing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If your refund request is approved:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2">
                <li>Refunds will be processed within <strong>1-2 business days</strong> after approval</li>
                <li>Refunds will be issued to the <strong>original payment method</strong> used for the purchase</li>
                <li>Processing times may vary depending on your payment provider (typically 3-5 business days)</li>
                <li>You will receive email confirmation once the refund has been processed</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Note:</strong> If a refund is approved, any credits associated with the refunded purchase will be removed from your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4) Non-Refundable Items</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The following are generally <strong>not eligible</strong> for refunds:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2">
                <li>Credits that have been used or partially used</li>
                <li>Credits purchased more than 7 days ago</li>
                <li>Credits purchased through promotional offers or discounts (unless otherwise stated)</li>
                <li>Refunds requested due to user error (e.g., accidental purchase)</li>
                <li>Refunds requested after the service has been used successfully</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5) Chargebacks</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you initiate a chargeback or dispute through your payment provider without first contacting our support team, we reserve the right to suspend or terminate your account. We encourage you to contact us directly at <a href="mailto:support@infinitetalkai.org" className="text-primary hover:underline">support@infinitetalkai.org</a> to resolve any billing issues before initiating a chargeback.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6) Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this Refund Policy at any time. Material changes will be communicated via email or through in-app notifications. Continued use of the service after changes become effective constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7) Contact Us</h2>
              <div className="text-muted-foreground leading-relaxed">
                <p>If you have questions about this Refund Policy or need assistance with a refund request, please contact us:</p>
                <div className="bg-muted/50 rounded-lg p-4 mt-4">
                  <p><strong>Email:</strong> <a href="mailto:support@infinitetalkai.org" className="text-primary hover:underline">support@infinitetalkai.org</a></p>
                  <p className="mt-2"><strong>Website:</strong> <Link href="/" className="text-primary hover:underline">www.infinitetalkai.org</Link></p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8) Related Policies</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Refund Policy should be read in conjunction with our{' '}
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

