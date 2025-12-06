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
      question: "What's the Infinite Talk AI?",
      answer:
        "An audio‑driven dubbing system that turns images or videos into lip‑accurate talking footage.",
    },
    {
      question: "What inputs does Infinite Talk AI support?",
      answer:
        "Upload a single image or a source video plus WAV/MP3 narration; we export MP4.",
    },
    {
      question: "How does Infinite Talk AI keep identity stable?",
      answer:
        "Soft reference control and overlapping context preserve facial structure and style.",
    },
    {
      question: "Can Infinite Talk AI handle multiple speakers?",
      answer:
        "Yes. Provide separate audio tracks and references, and each speaker is animated independently.",
    },
    {
      question: "Does Infinite Talk AI reduce flicker and seams?",
      answer:
        "Overlapping temporal windows carry motion across chunks to reduce flicker and joins.",
    },
    {
      question: "How precise is lip-sync in Infinite Talk AI?",
      answer: "Phoneme‑aware mapping keeps visemes aligned to speech rhythm over long runs.",
    },
    {
      question: "Is data private when using Infinite Talk AI?",
      answer:
        "Uploads are encrypted in transit, with retention controls and one‑click deletion. Training is opt‑in only.",
    },
    {
      question: "What hardware suits Infinite Talk AI?",
      answer:
        "Runs from lightweight previews to longer passes with acceleration and quantization for limited VRAM.",
    },
    {
      question: "What content types fit Infinite Talk AI best?",
      answer:
        "Education, explainers, podcasts, creator content and multilingual dubbing work especially well.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="rounded-3xl border border-border bg-card shadow-md p-8 md:p-10">
          <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground">
            Frequently Asked
            <span className="block text-primary">Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-b-0 border-border/80 dark:border-white/12 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 text-left font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="pr-4 text-base md:text-lg">{faq.question}</span>
                  <FiChevronDown
                    className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180 text-primary" : ""}`}
                  />
                </button>

                {openIndex === index && (
                  <div className="mt-2 text-sm md:text-base text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
