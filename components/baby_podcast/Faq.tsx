"use client"

import { useState } from "react"

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: "What is InfiniteTalk Baby Podcast?",
    answer:
      "InfiniteTalk Baby Podcast is a tool that uses artificial intelligence technology to convert baby photos or generated baby images into talking baby video.",
  },
  {
    question: "Do I need any technical background or editing experience to use InfiniteTalk Baby Podcast?",
    answer:
      "No. InfiniteTalk Baby Podcast is designed to be simple and user-friendly, suitable for beginners.",
  },
  {
    question: "Can I customize the baby image and voice?",
    answer:
      "Yes. You can upload your own baby photo or use a generated one. For voices, we offer a variety of cute child-like options. You can also upload audio or record your own voice directly.",
  },
  {
    question: "How long does it take to generate an InfiniteTalk Baby Podcast video?",
    answer:
      "The process is quick. After uploading the photo and selecting the voice, the video is usually ready in just a few minutes.",
  },
  {
    question: "Can I use generated AI baby podcast videos commercially?",
    answer:
      "Yes. Videos generated with InfiniteTalk Baby Podcast can be used commercially. However, the baby image must not be a copyrighted character, and you are responsible for ensuring that your usage complies with local laws and platform policies.",
  },
  {
    question: "Are the uploaded photos and data safe?",
    answer:
      "Our platform uses secure encryption to process uploaded photos. They are only used to generate videos and can be deleted after creation. For more details, please review our privacy policy.",
  },
  {
    question: "What topics can be discussed on InfiniteTalk Baby Podcast?",
    answer:
      "InfiniteTalk Baby Podcast can cover a variety of topics, such as comedy, pop culture, life stories, technology, or parodies of celebrity podcasts. The contrast between baby images and adult topics creates humor and is suitable for entertainment content.",
  },
  {
    question: "Can I make money with InfiniteTalk Baby Podcast?",
    answer:
      "Yes. By creating eye-catching viral content and sharing it on social media, creators can earn income through advertising, sponsorships, or subscriptions. Before monetizing, make sure you understand each platform’s rules on AI-generated content and monetization policies.",
  },
]

export function BabyPodcastFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            FAQ — InfiniteTalk Baby Podcast
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Answers to common questions about creating and sharing AI baby podcast videos.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="glass rounded-2xl border border-accent/60 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-4 md:px-5 py-3 md:py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-sm md:text-base font-semibold text-foreground">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border border-accent text-accent text-xs md:text-sm transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ⌃
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 text-xs md:text-sm text-muted-foreground leading-relaxed border-t border-accent/30">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}