import { FiClock, FiTarget, FiTrendingUp, FiUser, FiLayers, FiUsers } from "react-icons/fi"

export function Highlights() {
  const highlights = [
    {
      icon: FiClock,
      title: "Whole-frame control",
      description:
        "Audio drives lips, gaze, head turns, and posture together so motion stays in sync while identity stays stable.",
    },
    {
      icon: FiTarget,
      title: "Sparse-frame dubbing",
      description:
        "Keyframes land on important beats; in‑between frames follow audio so performance feels smooth instead of robotic.",
    },
    {
      icon: FiTrendingUp,
      title: "Temporal context windows",
      description:
        "Overlapping windows carry motion across chunks, cutting seams and flicker on long videos.",
    },
    {
      icon: FiUser,
      title: "Soft reference control",
      description:
        "Reference strength adapts to the frame, keeping faces on‑model while head and body stay expressive.",
    },
    {
      icon: FiLayers,
      title: "Multi‑speaker pipelines",
      description:
        "Drive several characters with separate audio tracks and masks in the same scene.",
    },
    {
      icon: FiUsers,
      title: "Clarity & style controls",
      description:
        "Simple sliders and prompts adjust lip strength, expression range, and style without touching code.",
    },
  ]

  return (
    <section id="highlights" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8">
          Key Features — <span className="text-primary">Infinite Talk AI</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon

            return (
              <div
                key={index}
                className="rounded-3xl border border-border bg-card p-6 md:p-7 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-primary`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">
                  {highlight.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
