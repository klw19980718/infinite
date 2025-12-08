import Link from 'next/link'

export function SakuraKasuganoTtsWorkflow() {
  const steps = [
    {
      step: 1,
      title: 'Write Sakura-style lines',
      description:
        'Draft your script for Sakura Kasugano–style dialogue — training monologues, friendly rival banter, or slice-of-life commentary. Make it clear this is an AI parody voice, not the real character.',
    },
    {
      step: 2,
      title: 'Pick your Sakura voice setup',
      description:
        'In your Text to Speech tool, use a bright, energetic anime voice that fits Sakura&apos;s personality, but avoid naming it as the official character. Treat it as an inspired original voice.',
    },
    {
      step: 3,
      title: 'Generate and refine the AI audio',
      description:
        'Generate the AI voice, listen back, and adjust your script, pauses, and emphasis until the pacing feels like an anime scene or game intro.',
    },
    {
      step: 4,
      title: 'Create talking videos with Infinite Talk AI',
      description:
        'Send the audio into Infinite Talk AI to animate a Sakura-style avatar, cosplay photo, or full talking video. Lips, head motion, and timing will follow the AI voice.',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl md:4xl font-medium text-foreground mb-2">
            How to Create Sakura Kasugano
            <span className="block text-primary">Text to Speech Video</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mt-4">
            Use this quick workflow to turn your Sakura-inspired script into an anime-style text to speech video with Infinite Talk AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.step}
              className="rounded-3xl border border-border bg-card p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm sm:text-base text-muted-foreground mt-8">
          Need more general guidance instead of Sakura-specific tips? Check the{' '}
          <Link href="/text-to-speech" className="text-primary underline underline-offset-2 hover:text-primary/80">
            Text to Speech hub
          </Link>{' '}
          for all tools and tutorials.
        </p>
      </div>
    </section>
  )
}


