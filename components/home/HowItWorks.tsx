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
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            How to Use — <span className="text-accent">Infinite Talk AI</span>{" "}
          </h2>
          <p className="text-xl text-muted-foreground">(3 Steps)</p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={index} className="glass rounded-2xl p-8 hover:glass-strong transition-all duration-300 group" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300">
                      <span className="text-2xl font-bold text-accent">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 pt-2 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex p-2 rounded-xl bg-accent/10">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <div className="text-base text-muted-foreground leading-relaxed text-pretty">
                      {step.description}
                    </div>
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
