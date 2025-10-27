import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Infinite Talk AI',
  description: 'Terms of Service for Infinite Talk AI - Read our terms and conditions for using our audio-driven sparse-frame dubbing platform.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'infinite talk ai',
    'user agreement',
    'legal terms',
    'service terms',
    'terms of use'
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/terms',
  },
  openGraph: {
    title: 'Terms of Service | Infinite Talk AI',
    description: 'Terms of Service for Infinite Talk AI - Read our terms and conditions for using our audio-driven sparse-frame dubbing platform.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/terms',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Infinite Talk AI',
    description: 'Terms of Service for Infinite Talk AI - Read our terms and conditions for using our audio-driven sparse-frame dubbing platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service — Infinite Talk AI</h1>
        
        <div className="prose prose-neutral max-w-none">
          <p className="text-muted-foreground mb-8">
            <strong>Last updated:</strong> October 23, 2025<br />
            <strong>Owner:</strong> Infinitetalk.ai ("we", "us", "our")<br />
            <strong>Service:</strong> Infinite Talk AI at https://www.infinitetalkai.org and related apps (the "Service").
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1) Acceptance</h2>
            <p className="text-muted-foreground leading-relaxed">
              By creating an account, clicking "I agree," or using the Service, you agree to these Terms and our Privacy Policy. If you use the Service for a company, you confirm you're authorized to bind that company.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2) Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be 13+ (or older where required by law). If 13–17, you may use the Service only with parental/guardian consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3) Your Account</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can sign in via Google or Email OTP. Keep your account secure; you're responsible for actions under it. We may suspend accounts that violate these Terms or applicable law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4) Plans, Credits & Billing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some features may require subscriptions or usage-based credits shown on our pricing/checkout pages. Fees are charged by our payment processor (Stripe). Unless required by law, fees are non-refundable (including unused credits). You may cancel renewal anytime. For billing help: support@infinitetalkai.org.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5) User Content & License</h2>
            <p className="text-muted-foreground leading-relaxed">
              "User Content" includes your prompts, uploads, data, and generated outputs. You retain ownership of your inputs and, subject to model/provider rules, your outputs. You grant us a worldwide, non-exclusive license to host, process, transmit, and display User Content only to operate, secure, and improve the Service. You can delete content where the UI allows.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6) Model Outputs & Responsibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              AI outputs can be inaccurate, synthetic, or biased and are provided as-is. You're responsible for reviewing outputs and for lawful use (IP, publicity/privacy rights, and policy compliance). We may filter or block content that violates our policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7) Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2">
              <li>Violate laws or third-party rights (IP, privacy, publicity).</li>
              <li>Upload malware, attempt to disrupt, scrape without permission, or bypass limits.</li>
              <li>Generate illegal, sexually exploitative, or violent content; engage in harassment, doxxing, or spam.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We may remove content or suspend access for violations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8) Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We rely on trusted providers to deliver the Service, including:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2">
              <li>Supabase (authentication/database, OTP & session handling)</li>
              <li>Vercel (hosting/CDN/build)</li>
              <li>Creem (third-party service as configured by us)</li>
              <li>Cloudflare R2 (object storage)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Their terms and privacy policies govern their services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9) Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              We (and our licensors) own the Service, software, templates, documentation, and branding. Except for rights expressly granted, no licenses are implied.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10) Beta Features</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some features may be labeled Beta and can change or be discontinued at any time without liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11) Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">12) Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR LOST PROFITS/REVENUE/DATA/GOODWILL. OUR TOTAL LIABILITY FOR ALL CLAIMS IS LIMITED TO AMOUNTS YOU PAID TO US IN THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO LIABILITY.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">13) Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold us harmless from claims arising out of your misuse of the Service, User Content, or violation of these Terms or third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">14) Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may stop using the Service at any time. We may suspend or terminate access for violations, unlawful activity, or to comply with law. Sections intended to survive (e.g., 5, 7, 9–13) survive termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">15) Changes</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms. If changes are material, we'll notify you (e.g., email or in-app). Continued use after the effective date means you accept the changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">16) Governing Law & Disputes</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of Delaware, United States. Courts in Delaware have exclusive jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">17) Contact</h2>
            <div className="text-muted-foreground leading-relaxed">
              <p><strong>Infinitetalk.ai</strong></p>
              <p>1234 Innovation Drive<br />
              San Francisco, CA 94105<br />
              United States</p>
              <p>Email: support@infinitetalkai.org</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
