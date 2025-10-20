'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What inputs do you support?",
      answer: "Video + audio (video-to-video) or single image + audio (image-to-video). Formats: MP4/JPG/PNG/WAV/MP3."
    },
    {
      question: "How long can my video be?",
      answer: "Generation supports unlimited length, ideal for lectures, podcasts, and other long-form content."
    },
    {
      question: "Which resolutions are available?",
      answer: "480p and 720p today; 1080p is on the roadmap."
    },
    {
      question: "Can I use outputs commercially?",
      answer: "Yes—paid plans include commercial use rights. See Pricing and Terms for details."
    },
    {
      question: "How do you keep long videos stable?",
      answer: "Temporal context (overlapping chunks), soft reference control, and a sampling strategy reduce flicker, seams, and identity drift."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-card hover:bg-accent transition-colors flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-muted/30 border-t">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
