'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

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
      answer: "No hard time limit. We process long content in overlapping chunks for continuity; practical length and render time depend on resolution, length, and plan."
    },
    {
      question: "Which resolutions are available?",
      answer: "480p, 720p, and 1080p. Choose based on your quality needs and render time."
    },
    {
      question: "Can I use outputs commercially?",
      answer: "Yes—paid plans include commercial use rights. See Pricing and Terms for details."
    },
    {
      question: "Do you support multiple speakers?",
      answer: "Yes. Upload separate audio tracks and assign references—each speaker is synced independently."
    },
    {
      question: "How is my data handled?",
      answer: "Processed in the cloud with encryption. Files remain for previews and re-download then auto-delete after the retention period; you can delete anytime."
    },
    {
      question: "Can I download and share the result?",
      answer: "Yes. Export MP4 in 480p/720p/1080p and share via a link."
    },
    {
      question: "How fast is rendering?",
      answer: "Depends on resolution, length, and plan. Paid tiers include priority in queue for faster turnaround."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border border-border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className="w-full px-6 py-5 text-left hover:bg-accent/50 transition-colors flex justify-between items-center group"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-card-foreground text-lg pr-4">{faq.question}</span>
                <FiChevronDown 
                  className={`flex-shrink-0 w-5 h-5 text-primary transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 bg-muted/20 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
