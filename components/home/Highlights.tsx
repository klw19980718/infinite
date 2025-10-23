"use client"

import { FiClock, FiTarget, FiTrendingUp, FiUser, FiLayers, FiUsers } from "react-icons/fi"

export function Highlights() {
  const highlights = [
    {
      icon: FiClock,
      title: "Unlimited Duration",
      description:
        "Generate long-form content without hard time limits—great for lectures, podcasts, and multi-chapter explainers.",
    },
    {
      icon: FiTarget,
      title: "Precision Lip-Sync",
      description: "Phoneme-aware alignment keeps speech on-beat and visually convincing, frame after frame.",
    },
    {
      icon: FiTrendingUp,
      title: "Stability at Scale",
      description: "Reduced flicker and body distortions across long sequences; smooth posture and gesture continuity.",
    },
    {
      icon: FiUser,
      title: "Identity Preservation",
      description: "Keep the same face and style throughout the video—even across scene changes and long takes.",
    },
    {
      icon: FiLayers,
      title: "I2V & V2V Workflows",
      description:
        "Use Image-to-Video (single photo → talking video) or Video-to-Video (re-animate source footage) in one place.",
    },
    {
      icon: FiUsers,
      title: "1080p Export",
      description:
        "Get crisp, publication-ready results at 1080p with the same whole-frame stability and lip accuracy.",
    },
  ]

  return (
    <section id="highlights" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">Highlights</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border p-8 hover:border-accent/50 transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-6">
                  <Icon className="w-6 h-6 text-accent" />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-foreground">{highlight.title}</h3>

                <p className="text-muted-foreground leading-relaxed text-pretty">{highlight.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
