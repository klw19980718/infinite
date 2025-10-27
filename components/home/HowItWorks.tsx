import { FiUpload, FiDownload, FiPlay } from "react-icons/fi"

export function HowItWorks() {
  const steps = [
    {
      icon: FiPlay,
      title: "1) Select Workflow in Infinite Talk AI",
      description:
        "Choose Image-to-Video for animating a single photo, or Video-to-Video for re-animating source footage. Infinite Talk AI provides sensible defaults and advanced knobs for expert control.",
    },
    {
      icon: FiUpload,
      title: "2) Upload Sources to Infinite Talk AI",
      description:
        "Provide an image or video plus WAV/MP3 narration. Infinite Talk AI parses phonemes and prosody to drive whole-frame motion that stays on beat.",
    },
    {
      icon: FiDownload,
      title: "3) Generate & Export with Infinite Talk AI",
      description:
        "Start the run, review the preview, then export. Infinite Talk AI balances lip strength, clarity settings, prompt adjustments, and context overlap to maintain consistent identity over long timelines.",
    },
  ]

  return (
    <section id="how-it-works" className="py-32 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1/5 via-background to-chart-3/5"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[100px]"></div>
      {/* </CHANGE> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            How to Use — <span className="text-accent">Infinite Talk AI</span>{" "}
            <span className="text-muted-foreground">(3 Steps)</span>
          </h2>
        </div>
        {/* </CHANGE> */}

        <div className="max-w-7xl mx-auto space-y-10">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <span className="text-3xl font-bold text-accent group-hover:text-background transition-colors">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex p-2 rounded-lg bg-accent/10">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed text-pretty pl-10">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        {/* </CHANGE> */}
      </div>
    </section>
  )
}
