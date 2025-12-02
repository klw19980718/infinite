import Link from 'next/link'

export function DonaldTrumpTtsWorkflow() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            How to Create Donald Trump Text to Speech Video
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Use this as a quick workflow checklist for turning your script into an online Donald Trump style
            text to speech video.
          </p>
        </div>

        <ol className="grid gap-4 md:grid-cols-2 text-sm sm:text-base text-muted-foreground">
          <li className="rounded-xl border border-border bg-card/80 p-4">
            <div className="text-xs font-semibold text-primary mb-1">Step 1</div>
            <h3 className="font-semibold text-foreground">Draft your script</h3>
            <p className="mt-1 text-xs sm:text-sm">
              Write what you want the voice to say – commentary, jokes, educational content, or
              political analysis. Make it clear that this is an AI voice, not the real person.
            </p>
          </li>
          <li className="rounded-xl border border-border bg-card/80 p-4">
            <div className="text-xs font-semibold text-primary mb-1">Step 2</div>
            <h3 className="font-semibold text-foreground">Choose an AI voice</h3>
            <p className="mt-1 text-xs sm:text-sm">
              In your Text to Speech tool, pick a voice that feels presidential or authoritative, but
              avoid naming it after a real person. Treat it as an original character.
            </p>
          </li>
          <li className="rounded-xl border border-border bg-card/80 p-4">
            <div className="text-xs font-semibold text-primary mb-1">Step 3</div>
            <h3 className="font-semibold text-foreground">Generate and refine audio</h3>
            <p className="mt-1 text-xs sm:text-sm">
              Generate the AI voice, listen back, and tweak your script (pauses, punctuation, emphasis)
              until the pacing feels right for a talking head or explainer video.
            </p>
          </li>
          <li className="rounded-xl border border-border bg-card/80 p-4">
            <div className="text-xs font-semibold text-primary mb-1">Step 4</div>
            <h3 className="font-semibold text-foreground">Send audio into Infinite Talk AI</h3>
            <p className="mt-1 text-xs sm:text-sm">
              Use the audio in Infinite Talk AI to drive a talking photo, avatar, or full talking head
              video. Lips, head motion, and timing will follow the AI voice.
            </p>
          </li>
        </ol>

        <p className="text-xs sm:text-sm text-muted-foreground">
          Need a general overview instead of a Trump-specific flow? See the{' '}
          <Link href="/text-to-speech" className="text-primary underline underline-offset-2">
            Text to Speech hub
          </Link>{' '}
          for all tools and tutorials.
        </p>
      </div>
    </section>
  )
}


