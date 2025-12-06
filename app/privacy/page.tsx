import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Infinite Talk AI',
  description: 'Privacy Policy for Infinite Talk AI - Learn how we collect, use, and protect your data when using our audio-driven sparse-frame dubbing platform.',
  keywords: [
    'privacy policy',
    'infinite talk ai',
    'data protection',
    'privacy',
    'GDPR',
    'CCPA',
    'data security',
    'user privacy'
  ],
  alternates: {
    canonical: 'https://www.infinitetalkai.org/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Infinite Talk AI',
    description: 'Privacy Policy for Infinite Talk AI - Learn how we collect, use, and protect your data when using our audio-driven sparse-frame dubbing platform.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/privacy',
    siteName: 'Infinite Talk AI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Infinite Talk AI',
    description: 'Privacy Policy for Infinite Talk AI - Learn how we collect, use, and protect your data when using our audio-driven sparse-frame dubbing platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <div className="bg-card dark:bg-[#4a4a4a] border border-border dark:border-[#5a5a5a] rounded-2xl p-8 md:p-12 shadow-lg dark:shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Privacy Policy — Infinite Talk AI</h1>
          
          <div className="prose prose-neutral max-w-none">
            <p className="text-muted-foreground mb-8 p-4 rounded-xl bg-card/50 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
              <strong className="text-foreground">Last updated:</strong> October 23, 2025<br />
              <strong className="text-foreground">Owner:</strong> Infinitetalk.ai ("we", "us", "our")
            </p>

            <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1) Information We Collect</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
              <p><strong>Account & Auth:</strong> email address, Google OAuth basic profile (if used), OTP/magic-link metadata, session IDs (via Supabase).</p>
              <p><strong>Usage Data:</strong> interactions, device/browser type, timestamps, approximate location from IP, crash/error logs.</p>
              <p><strong>Content:</strong> prompts, uploads (e.g., images/audio/video), generated outputs, project/workspace metadata.</p>
              <p><strong>Payments:</strong> billing email and transaction metadata via Stripe; we do not store full card numbers.</p>
              <p><strong>Cookies/Local Storage:</strong> to keep you signed in, remember preferences, secure sessions, and measure performance.</p>
            </div>
            </div>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2) How We Use Data</h2>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2">
              <li>Provide, maintain, and improve Infinite Talk AI.</li>
              <li>Authenticate (Google OAuth and Email OTP via Supabase), manage sessions, and prevent abuse.</li>
              <li>Personalize UX, analyze aggregated usage, debug, and ensure safety.</li>
              <li>Send service communications (verification, receipts, policy updates).</li>
              <li>Comply with legal obligations and protect our rights and users.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3) Third-Party Providers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">To operate the Service we use:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2">
              <li><strong>Supabase</strong> — authentication/database, OTP and session management.</li>
              <li><strong>Vercel</strong> — hosting/CDN/build and performance edge network.</li>
              <li><strong>Creem</strong> — third-party service as configured by us.</li>
              <li><strong>Cloudflare R2</strong> — object storage for user uploads/outputs.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Where relevant, Stripe handles billing. These providers process data under our instructions and their own privacy terms.
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4) Legal Bases (EU/UK)</h2>
            <p className="text-muted-foreground leading-relaxed">
              We rely on Contract (to deliver the Service), Legitimate Interests (security, analytics, improvement), Consent (where required—e.g., non-essential cookies/marketing), and Legal Obligation.
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5) Sharing & Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              We share data with processors listed above; professional advisors; and authorities when required by law or to protect users. We do not sell personal information.
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6) International Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Data may be processed in US/EU. Where required, we use appropriate safeguards (e.g., Standard Contractual Clauses).
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7) Data Retention</h2>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2">
              <li><strong>Auth/session logs and standard analytics/error logs:</strong> retained for 14 days by default.</li>
              <li><strong>Account/profile data:</strong> retained while the account is active.</li>
              <li><strong>User uploads/outputs:</strong> retained until you delete them or your workspace is removed.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We may keep minimal records as required by law (e.g., invoices).
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8) Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Subject to local law, you may access, correct, delete, export your data, or object/restrict certain processing. EU/UK users may contact their supervisory authority. California residents: see CCPA section. Requests: support@infinitetalkai.org (we'll verify your identity).
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9) CCPA (California)</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not "sell" personal information. If we "share" data for cross-context advertising, we will do so only with your consent and you may opt out anytime via cookie settings. Categories collected: identifiers (email, cookies), internet activity, approximate geolocation, commercial info (transactions).
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10) Cookies & Tracking</h2>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2">
              <li><strong>Strictly necessary:</strong> login/session and security.</li>
              <li><strong>Functional:</strong> preferences/UI state.</li>
              <li><strong>Analytics:</strong> aggregated usage and performance; opt-out available.</li>
              <li><strong>Marketing (optional):</strong> off unless you consent.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Manage via cookie settings or your browser.
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11) Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use industry-standard safeguards (encryption in transit, access controls, audit logging). No method is 100% secure.
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">12) Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Not directed to children under 13. If you believe a child used the Service, contact us and we'll delete related data.
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">13) Changes</h2>
            <p className="text-muted-foreground leading-relaxed">
              We'll update this Policy when needed. If changes are material, we'll notify you (email or in-app). Continued use after the effective date means you accept the changes.
            </p>
          </section>

          <section className="mb-8 p-6 rounded-xl bg-card/30 dark:bg-[#3a3a3a] border border-border/50 dark:border-[#5a5a5a]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">14) Contact</h2>
            <div className="text-muted-foreground leading-relaxed">
              <p><strong>Infinitetalk ai</strong></p>
              <p>Email: support@infinitetalkai.org</p>
            </div>
          </section>
          </div>
        </div>
      </div>
    </div>
  )
}
