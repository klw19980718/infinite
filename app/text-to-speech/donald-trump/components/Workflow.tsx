import Link from 'next/link'

export function DonaldTrumpTtsWorkflow() {
  const steps = [
    {
      step: 1,
      title: 'Draft your script',
      description:
        'Write what you want the voice to say – commentary, jokes, educational content, or political analysis. Make it clear that this is an AI voice, not the real person.',
    },
    {
      step: 2,
      title: 'Choose an AI voice',
      description:
        'In your Text to Speech tool, pick a voice that feels presidential or authoritative, but avoid naming it after a real person. Treat it as an original character.',
    },
    {
      step: 3,
      title: 'Generate and refine audio',
      description:
        'Generate the AI voice, listen back, and tweak your script (pauses, punctuation, emphasis) until the pacing feels right for a talking head or explainer video.',
    },
    {
      step: 4,
      title: 'Send audio into Infinite Talk AI',
      description:
        'Use the audio in Infinite Talk AI to drive a talking photo, avatar, or full talking head video. Lips, head motion, and timing will follow the AI voice.',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">
            How to Create Donald Trump
            <span className="block text-primary">Text to Speech Video</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mt-4">
            Use this as a quick workflow checklist for turning your script into an online Donald Trump style text to speech video.
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
                  <span className="text-sm md:text-base font-semibold text-primary">
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
          Need a general overview instead of a Trump-specific flow? See the{' '}
          <Link href="/text-to-speech" className="text-primary underline underline-offset-2 hover:text-primary/80">
            Text to Speech hub
          </Link>{' '}
          for all tools and tutorials.
        </p>
      </div>
    </section>
  )
}


