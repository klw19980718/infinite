"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import {
  FiCheck,
  FiUsers,
  FiZap,
  FiDownload,
  FiShield,
  FiHeadphones,
  FiClock,
  FiInfo,
  FiChevronDown,
  FiLoader,
} from "react-icons/fi"
import Link from "next/link"

export function PricingPageClient() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  const handlePurchase = async (planId: string) => {
    setLoading(planId)
    try {
      // Get current user info
      const supabase = getSupabaseClient()
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        alert("Please log in to purchase credits")
        return
      }

      const response = await fetch("/api/creem/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          planId,
          userId: user.id,
          userEmail: user.email
        }),
      })

      const data = await response.json()

      if (data.ok && data.checkout_url) {
        // Redirect to Creem checkout
        window.location.href = data.checkout_url
      } else {
        console.error("Checkout error:", data.message)
        alert(`Payment error: ${data.message}`)
      }
    } catch (error) {
      console.error("Purchase error:", error)
      alert("Failed to initiate payment. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      id: "pro",
      name: "Pro",
      badge: "Most Popular",
      price: "$29.9",
      credits: "400 Credits",
      unitPrice: "$0.074 / credit",
      bullets: [
        "HD video generation",
        "Lip-sync & body animation",
        "Downloads enabled",
        "Commercial use license",
        "Priority support",
      ],
      microcopy: "Approx. 6 min 40 s Standard or 3 min 20 s HD total.",
      cta: "Get Pro",
      popular: true,
    },
    {
      id: "ultimate",
      name: "Ultimate",
      badge: "Best value per credit",
      price: "$49.9",
      credits: "800 Credits",
      unitPrice: "$0.062 / credit",
      bullets: [
        "HD video generation",
        "Lip-sync & body animation",
        "Downloads enabled",
        "Commercial use license",
        "Priority support",
      ],
      microcopy: "Approx. 13 min 20 s Standard or 6 min 40 s HD.",
      cta: "Upgrade to Ultimate",
      popular: false,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      badge: "Bulk processing",
      price: "$99.9",
      credits: "1800 Credits",
      unitPrice: "$0.055 / credit",
      bullets: [
        "HD video generation",
        "Lip-sync & body animation",
        "Downloads enabled",
        "Commercial use license",
        "Priority support",
        "Bulk processing",
      ],
      microcopy: "Approx. 30 min Standard or 15 min HD.",
      cta: "Get Enterprise",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "Do Infinite Talk AI credits expire?",
      answer: "No. Credits never expire.",
    },
    {
      question: "Is this a subscription?",
      answer: "No. All plans here are one-time USD purchases.",
    },
    {
      question: "How do credits work?",
      answer:
        "Standard costs 1 credit/sec; HD costs 2 credits/sec. Minimum 5 (Std) / 10 (HD). Max per job 600 seconds.",
    },
    {
      question: "Can I use the results commercially?",
      answer: "Yes, paid plans include a commercial use license.",
    },
    {
      question: "Where can I download invoices?",
      answer: "Receipts/invoices are available in your account after purchase.",
    },
    {
      question: "Which plan should I pick?",
      answer:
        "Start with Pro to trial workflows. Choose Ultimate for best price/credit. Use Enterprise if you render in bulk.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "Credits are generally non-refundable once purchased. However, we may consider refund requests on a case-by-case basis for technical issues or exceptional circumstances. Contact support@infinitetalkai.org within 14 days of purchase. See our Refund Policy for details.",
    },
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-30" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <FiZap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">Simple & Transparent Pricing</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Simple Pricing — Credits Never Expire
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
            Pay once in USD. Use credits anytime for Standard or HD generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="#plans"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 text-center"
            >
              Choose a Plan
            </Link>
            <Link
              href="#how-credits-work"
              className="px-8 py-4 border border-border rounded-xl font-semibold hover:bg-accent/50 transition-all duration-300 hover:border-blue-500/50 text-center"
            >
              How Credits Work
            </Link>
          </div>

          {/* Trust mini-row */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FiShield className="w-4 h-4 text-blue-400" />
              </div>
              <span>Commercial use</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <FiCheck className="w-4 h-4 text-green-400" />
              </div>
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <FiHeadphones className="w-4 h-4 text-purple-400" />
              </div>
              <span>Priority support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 px-4 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className={`relative group ${plan.popular ? "md:-mt-4" : ""}`}>
                <div
                  className={`absolute -inset-[1px] rounded-3xl transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 opacity-100"
                      : "bg-gradient-to-b from-border to-border group-hover:from-blue-500/50 group-hover:to-cyan-500/50 opacity-100"
                  }`}
                />

                <div
                  className={`relative bg-card rounded-3xl p-8 h-full flex flex-col ${
                    plan.popular ? "shadow-2xl shadow-blue-500/20" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {!plan.popular && plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-muted text-muted-foreground px-4 py-1.5 rounded-full text-xs font-medium border border-border">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8 mt-4">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-1">{plan.credits}</div>
                    <div className="text-sm text-muted-foreground">{plan.unitPrice}</div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FiCheck className="w-3 h-3 text-blue-400" />
                          </div>
                          <span className="text-sm text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="h-[72px] flex items-center justify-center mb-6">
                      <div className="w-full text-center px-4 py-3 rounded-xl bg-muted/50">
                        <p className="text-xs text-muted-foreground">{plan.microcopy}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePurchase(plan.id)}
                    disabled={loading === plan.id}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        : "bg-muted text-foreground hover:bg-accent hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    }`}
                  >
                    {loading === plan.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <FiLoader className="w-4 h-4 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      plan.cta
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What's Included</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Every plan includes all essential features for professional video generation
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: FiZap, text: "HD video generation", color: "blue" },
              { icon: FiUsers, text: "Lip-sync & body animation", color: "cyan" },
              { icon: FiDownload, text: "Downloads", color: "purple" },
              { icon: FiShield, text: "Commercial use license", color: "green" },
              { icon: FiHeadphones, text: "Priority support", color: "pink" },
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="flex flex-col items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 h-full min-h-[160px]">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-500/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    <item.icon className={`w-7 h-7 text-${item.color}-400`} />
                  </div>
                  <span className="text-sm text-muted-foreground text-center font-medium flex-shrink-0">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Credits Work Section */}
      <section id="how-credits-work" className="py-20 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How Credits Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing with no hidden fees or expiration dates
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/50 to-cyan-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-card border border-border rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <FiClock className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Credit Usage</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Standard</span>
                    <span className="font-semibold text-foreground">1 credit / sec</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">HD (720p)</span>
                    <span className="font-semibold text-foreground">2 credits / sec</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground text-sm">Minimum charge</span>
                    <span className="font-semibold text-foreground text-sm">5 / 5 credits</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Max per job</span>
                    <span className="font-semibold text-foreground">600 seconds</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-card border border-border rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <FiInfo className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Important Notes</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-muted-foreground">Credits never expire</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-muted-foreground">You can split credits across multiple renders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Start creating amazing videos with AI-powered lip-sync and animation
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/infinite-talk-ai/image-to-video"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <FiZap className="w-5 h-5" />
                <span>Image to Video</span>
              </div>
            </Link>
            <Link
              href="/infinite-talk-ai/video-to-video"
              className="group relative px-8 py-4 border-2 border-blue-500/50 text-foreground rounded-xl font-semibold hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <FiZap className="w-5 h-5 text-blue-400" />
                <span>Video to Video</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="group">
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                  <button
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-accent/30 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    <div
                      className={`w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      <FiChevronDown className="w-5 h-5 text-blue-400" />
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-6 rounded-2xl bg-muted/30 border border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Payments & taxes are handled by our Merchant of Record. Invoices are issued automatically after purchase.
            </p>
            <p className="text-sm text-muted-foreground">
              Questions about refunds? See our{' '}
              <Link href="/refund" className="text-primary hover:underline font-medium">
                Refund Policy
              </Link>
              {' '}or contact{' '}
              <a href="mailto:support@infinitetalkai.org" className="text-primary hover:underline font-medium">
                support@infinitetalkai.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
