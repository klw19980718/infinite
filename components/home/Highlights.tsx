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
    <section id="highlights" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Key Features — <span className="text-accent">Infinite Talk AI</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon

            return (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover:glass-strong hover:scale-[1.02] transition-all duration-300 group"
                style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-all duration-300 mb-5">
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">{highlight.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed text-pretty">{highlight.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
