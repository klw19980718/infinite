import { FiUpload, FiDownload, FiPlay } from "react-icons/fi"
import Link from "next/link"

export function HowItWorks() {
  const steps = [
    {
      icon: FiPlay,
      title: "1) Select Workflow in infinite talk",
      description: (
        <>
          Choose{" "}
          <Link
            href="/infinite-talk-ai/image-to-video"
            className="text-accent hover:text-accent/80 underline font-medium transition-colors"
          >
            Image-to-Video
          </Link>{" "}
          for animating a single photo, or{" "}
          <Link
            href="/infinite-talk-ai/video-to-video"
            className="text-accent hover:text-accent/80 underline font-medium transition-colors"
          >
            Video-to-Video
          </Link>{" "}
          for re-animating source footage. Infinite Talk AI provides sensible defaults and advanced knobs for expert control.
        </>
      ),
    },
    {
      icon: FiUpload,
      title: "2) Upload Sources to infinitetalk",
      description:
        "Provide an image or video plus WAV/MP3 narration. infinitetalk parses phonemes and prosody to drive whole-frame motion that stays on beat.",
    },
    {
      icon: FiDownload,
      title: "3) Generate & Export with infinity talk",
      description:
        "Start the run, review the preview, then export. infinity talk balances lip strength, clarity settings, prompt adjustments, and context overlap to maintain consistent identity over long timelines.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 text-balance">
            How to Use — <span className="text-accent">Infinite Talk AI</span>{" "}
            <span className="text-muted-foreground text-xl md:text-2xl">(3 Steps)</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={index} className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <span className="text-xl font-bold text-accent group-hover:text-background transition-colors">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-0.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex p-1.5 rounded-lg bg-accent/10">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed text-pretty pl-8">
                    {step.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
