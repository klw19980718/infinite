export function SakuraKasuganoTtsFAQ() {
  const faqs = [
    {
      question: 'Is it legal to use a Sakura Kasugano–style AI voice?',
      answer:
        'Laws and platform rules differ by region, but in general you should avoid using AI to pose as official characters or actors in a way that confuses viewers. Clearly mark the voice as synthetic fan or parody content.',
    },
    {
      question: 'Does Infinite Talk AI provide the official Sakura Kasugano voice?',
      answer:
        'No. Infinite Talk AI does not provide or endorse exact replicas of any copyrighted characters or real individuals. You can, however, create anime-inspired voices that feel energetic and friendly for fan projects.',
    },
    {
      question: 'Can I post Sakura-style AI voice clips on YouTube and social media?',
      answer:
        "In many cases, yes, as long as you follow each platform's rules, Capcom's fan content guidelines, and local law. Mark AI voices as synthetic, avoid impersonation, and do not mislead viewers about official status.",
    },
    {
      question: 'Is Sakura Kasugano text to speech free to use?',
      answer:
        'Infinite Talk AI offers daily free allowances for Text to Speech generation. After you use the free tier, additional characters are billed in credits. Check your usage on the pricing and usage pages.',
    },
    {
      question: 'How do I download Sakura-style text to speech audio?',
      answer:
        'You can download generated audio files in standard formats such as MP3 or WAV from the Text to Speech tool. You can also send them directly into Infinite Talk AI video workflows without downloading first.',
    },
    {
      question: 'How do I create a Sakura Kasugano text to speech video?',
      answer:
        'First, generate the AI voice using this Sakura-style Text to Speech page with your script. Then upload an image, cosplay shot, or stylized avatar into Infinite Talk AI and use the audio to create a lip-synced talking video.',
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


