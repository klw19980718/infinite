"use client"

import { useState } from "react"
import { FiChevronDown } from "react-icons/fi"

interface FAQItem {
  question: string
  answer: string
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "What inputs do you support?",
      answer: "Video + audio (video-to-video) or single image + audio (image-to-video). Formats: MP4/JPG/PNG/WAV/MP3.",
    },
    {
      question: "How long can my video be?",
      answer:
        "No hard time limit. We process long content in overlapping chunks for continuity; practical length and render time depend on resolution, length, and plan.",
    },
    {
      question: "Which resolutions are available?",
      answer: "480p, 720p, and 1080p. Choose based on your quality needs and render time.",
    },
    {
      question: "Can I use outputs commercially?",
      answer: "Yes—paid plans include commercial use rights. See Pricing and Terms for details.",
    },
    {
      question: "Do you support multiple speakers?",
      answer: "Yes. Upload separate audio tracks and assign references—each speaker is synced independently.",
    },
    {
      question: "How is my data handled?",
      answer:
        "Processed in the cloud with encryption. Files remain for previews and re-download then auto-delete after the retention period; you can delete anytime.",
    },
    {
      question: "Can I download and share the result?",
      answer: "Yes. Export MP4 in 480p/720p/1080p and share via a link.",
    },
    {
      question: "How fast is rendering?",
      answer: "Depends on resolution, length, and plan. Paid tiers include priority in queue for faster turnaround.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-2xl overflow-hidden bg-card">
              <button
                className="w-full px-8 py-6 text-left hover:bg-secondary/50 transition-colors flex justify-between items-center group"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-foreground text-lg pr-4">{faq.question}</span>
                <FiChevronDown
                  className={`flex-shrink-0 w-5 h-5 text-muted-foreground transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === index && (
                <div className="overflow-hidden transition-all duration-300">
                  <div className="px-8 py-6 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed text-pretty">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
