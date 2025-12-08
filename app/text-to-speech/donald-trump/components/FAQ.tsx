export function DonaldTrumpTtsFAQ() {
  const faqs = [
    {
      question: 'Is it legal to use a Donald Trump-style AI voice?',
      answer:
        'Laws differ by country and platform, but in general you should avoid using AI to pose as real people without consent, especially for political or commercial statements. Treat AI voices as fictional characters and clearly label them as synthetic.',
    },
    {
      question: 'Does Infinite Talk AI provide an official Donald Trump voice?',
      answer:
        'No. Infinite Talk AI does not provide or endorse exact replicas of real individuals. You can, however, create original voices that feel presidential, authoritative, or comedic for commentary and satire.',
    },
    {
      question: 'Can I use these voices on YouTube and social media?',
      answer:
        "In most cases yes, as long as you follow each platform's rules, our terms of use, and local law. Clearly mark AI voices as synthetic, avoid impersonation, and do not mislead viewers about what is real.",
    },
    {
      question: 'Is Donald Trump text to speech free to use?',
      answer:
        'Infinite Talk AI offers free daily allowances for Text to Speech generation. The exact amount depends on your plan. You can generate AI voices online without upfront costs, though longer scripts may consume credits beyond the free tier.',
    },
    {
      question: 'How does Donald Trump text to speech download work?',
      answer:
        "You can download generated audio files in standard formats (MP3, WAV) from our Text to Speech tool. You can also use the audio directly in Infinite Talk AI's video workflows without downloading if you prefer.",
    },
    {
      question: 'How do I create a Donald Trump text to speech video?',
      answer:
        'First, generate the AI voice using our Text to Speech tool with your script. Then, upload an image or video to Infinite Talk AI and use the generated audio to create a lip-synced talking video. The entire process happens online in your browser.',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">
            Frequently Asked
            <span className="block text-primary">Questions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-3xl border border-border bg-card p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                {faq.question}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


