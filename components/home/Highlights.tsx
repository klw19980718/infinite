import { FiClock, FiTarget, FiTrendingUp, FiUser, FiLayers, FiUsers } from "react-icons/fi"

export function Highlights() {
  const highlights = [
    {
      icon: FiClock,
      title: "Whole-Frame Control with infinite talk ai",
      description:
        "Instead of nudging only the mouth, infinite talk ai aligns lips, eye focus, head turns, and posture to audio. infinite talk ai preserves identity and keeps motion coherent across extended segments.",
    },
    {
      icon: FiTarget,
      title: "Sparse-Frame Dubbing in infinitetalk",
      description:
        "A selective keyframe strategy lets infinitetalk place control points where perception matters most, then interpolate smoothly. infinitetalk avoids robotic stutter and maintains expressive rhythm.",
    },
    {
      icon: FiTrendingUp,
      title: "Temporal Context Windows in infinity talk",
      description:
        "Chunked processing with overlapping context carries motion momentum forward. infinity talk reduces seams, flicker, and jitter between segments without flattening expression.",
    },
    {
      icon: FiUser,
      title: "Soft Reference Control in infinite talk",
      description:
        "Control strength adapts to similarity between current context and the reference. infinite talk locks facial identity yet keeps head-and-body dynamics flexible and lifelike.",
    },
    {
      icon: FiLayers,
      title: "Multi-Speaker Pipelines via infinitetalk ai",
      description:
        "Drive multiple characters with independent audio tracks and masks. infinitetalk ai keeps each speaker distinct, even in fast, back-and-forth dialog.",
    },
    {
      icon: FiUsers,
      title: "Clarity & Prompt Controls in infinite talk ai",
      description:
        "Guide output with clarity controls and prompt adjustments. infinite talk ai exposes concise switches for lip strength, expression damping, and wording-based style cues to match voice tone and script density.",
    },
  ]

  return (
    <section id="highlights" className="py-20 md:py-28 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 text-balance">
            Key Features — <span className="text-accent">Infinite Talk AI</span>
          </h2>
        </div>

        <div className="space-y-8 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-5 lg:gap-8 items-start group`}
              >
                <div className="flex-shrink-0">
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-base md:text-lg font-semibold text-foreground">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{highlight.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
