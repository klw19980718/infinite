import { FiClock, FiTarget, FiTrendingUp, FiUser, FiLayers, FiUsers } from "react-icons/fi"

export function Highlights() {
  const highlights = [
    {
      icon: FiClock,
      title: "Whole-Frame Control with Infinite Talk AI",
      description:
        "Infinite Talk AI aligns lips, eye focus, head turns, and posture to audio, delivering audio-synchronized full-body motion over extended sequences while preserving identity.",
    },
    {
      icon: FiTarget,
      title: "Sparse-Frame Dubbing in InfiniteTalk",
      description:
        " A sparse keyframe strategy lets InfiniteTalk place control points where perception matters most. Those keyframes preserve identity, emotional cadence, iconic gestures, and camera trajectories, while the in-between frames follow the dubbed audio naturally. This avoids robotic stutter and keeps the performance expressive.",
    },
    {
      icon: FiTrendingUp,
      title: "Temporal Context Windows in InfiniteTalk",
      description:
        "Chunked processing with overlapping temporal context windows (context frames) carries motion momentum forward between segments. InfiniteTalk reduces seams, flicker, and jitter across long sequences without flattening expression.",
    },
    {
      icon: FiUser,
      title: "Soft Reference Control in InfiniteTalk",
      description:
        "Control strength adapts to similarity between the current context and the reference. InfiniteTalk locks facial identity yet keeps head-and-body dynamics flexible and lifelike, based on a keyframe sampling strategy validated across multiple training regimes.",
    },
    {
      icon: FiLayers,
      title: "Multi-Speaker Pipelines via Infinite Talk AI",
      description:
        "Drive multiple characters with independent audio tracks and masks. Infinite Talk AI keeps each speaker distinct, even in fast, back-and-forth dialog, building multi-speaker control on top of the core InfiniteTalk architecture.",
    },
    {
      icon: FiUsers,
      title: "Clarity & Prompt Controls in Infinite Talk AI",
      description:
        "Guide output with clarity controls and prompt adjustments. Infinite Talk AI exposes concise switches for lip strength, expression damping, and wording-based style cues to match voice tone and script density.",
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
