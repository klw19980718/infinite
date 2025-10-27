"use client"

import { FiClock, FiTarget, FiTrendingUp, FiUser, FiLayers, FiUsers } from "react-icons/fi"

export function Highlights() {
  const highlights = [
    {
      icon: FiClock,
      title: "Whole-Frame Control with Infinite Talk AI",
      description:
        "Instead of nudging only the mouth, Infinite Talk AI aligns lips, eye focus, head turns, and posture to audio. Infinite Talk AI preserves identity and keeps motion coherent across extended segments.",
    },
    {
      icon: FiTarget,
      title: "Sparse-Frame Dubbing in Infinite Talk AI",
      description:
        "A selective keyframe strategy lets Infinite Talk AI place control points where perception matters most, then interpolate smoothly. Infinite Talk AI avoids robotic stutter and maintains expressive rhythm.",
    },
    {
      icon: FiTrendingUp,
      title: "Temporal Context Windows in Infinite Talk AI",
      description:
        "Chunked processing with overlapping context carries motion momentum forward. Infinite Talk AI reduces seams, flicker, and jitter between segments without flattening expression.",
    },
    {
      icon: FiUser,
      title: "Soft Reference Control in Infinite Talk AI",
      description:
        "Control strength adapts to similarity between current context and the reference. Infinite Talk AI locks facial identity yet keeps head-and-body dynamics flexible and lifelike.",
    },
    {
      icon: FiLayers,
      title: "Multi-Speaker Pipelines via Infinite Talk AI",
      description:
        "Drive multiple characters with independent audio tracks and masks. Infinite Talk AI keeps each speaker distinct, even in fast, back-and-forth dialog.",
    },
    {
      icon: FiUsers,
      title: "Clarity & Prompt Controls in Infinite Talk AI",
      description:
        "Guide output with clarity controls and prompt adjustments. Infinite Talk AI exposes concise switches for lip strength, expression damping, and wording-based style cues to match voice tone and script density.",
    },
  ]

  return (
    <section id="highlights" className="py-32 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]"></div>
      {/* </CHANGE> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Key Features — <span className="text-accent">Infinite Talk AI</span>
          </h2>
        </div>
        {/* </CHANGE> */}

        <div className="space-y-12 max-w-7xl mx-auto">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-6 lg:gap-10 items-start group`}
              >
                <div className="flex-shrink-0">
                  <div className="inline-flex p-5 rounded-2xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-all duration-300">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">{highlight.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed text-pretty">{highlight.description}</p>
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
