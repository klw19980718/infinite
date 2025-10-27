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
        "Infinite Talk AI is an audio-driven, sparse-frame dubbing system that turns images or videos into long-form, lip-accurate talking footage with whole-frame control and multi-speaker support.",
    },
    {
      question: "What inputs does Infinite Talk AI support?",
      answer:
        "Upload a single image or a source video plus audio narration (WAV/MP3). Infinite Talk AI analyzes phonemes and timing to drive motion and exports MP4.",
    },
    {
      question: "How does Infinite Talk AI keep identity stable?",
      answer:
        "Soft reference control and context overlap preserve facial structure and style while keeping expressions natural.",
    },
    {
      question: "Can Infinite Talk AI handle multiple speakers?",
      answer:
        "Yes. Provide separate audio tracks and references, and Infinite Talk AI animates each speaker independently in the same scene.",
    },
    {
      question: "Does Infinite Talk AI reduce flicker and seams?",
      answer:
        "Temporal context windows carry motion across chunks, reducing flicker and visible joins on long timelines.",
    },
    {
      question: "How precise is lip-sync in Infinite Talk AI?",
      answer: "Phoneme-aware mapping keeps visemes aligned to speech rhythm for accurate articulation over long runs.",
    },
    {
      question: "Is data private when using Infinite Talk AI?",
      answer:
        "Uploads are encrypted in transit. Retention controls and one-click deletion are provided; model training is opt-in only.",
    },
    {
      question: "What hardware suits Infinite Talk AI?",
      answer:
        "From lightweight previews to heavier passes, Infinite Talk AI offers acceleration and quantization for limited VRAM.",
    },
    {
      question: "What content types fit Infinite Talk AI best?",
      answer:
        "Education, corporate explainers, podcasts, creator content, and multilingual dubbing benefit from whole-frame control.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-32 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-background to-background"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808004_1px,transparent_1px),linear-gradient(to_bottom,#80808004_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-chart-1/10 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              FAQs — Infinite Talk AI
            </h2>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-2xl overflow-hidden bg-card">
                <button
                  className="w-full px-8 py-7 text-left hover:bg-secondary/50 transition-colors flex justify-between items-center group"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-foreground text-lg pr-4">{faq.question}</span>
                  <FiChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-muted-foreground transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </button>

                {openIndex === index && (
                  <div className="overflow-hidden transition-all duration-300">
                    <div className="px-8 py-7 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed text-pretty">{faq.answer}</p>
                    </div>
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
