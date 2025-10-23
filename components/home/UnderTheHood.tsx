"use client"

import { FiCpu, FiLayers, FiZap, FiRefreshCw } from "react-icons/fi"

export function UnderTheHood() {
  const techFeatures = [
    {
      icon: FiRefreshCw,
      title: "Temporal Context",
      description:
        'Overlapping context frames carry motion "momentum" across chunks, minimizing flicker and visible seams in long videos.',
    },
    {
      icon: FiLayers,
      title: "Soft Reference Control",
      description:
        "Control strength adapts to context-to-reference similarity, preserving identity without making the avatar look stiff.",
    },
    {
      icon: FiZap,
      title: "Sampling Strategy",
      description:
        "Fine-grained keyframe placement balances control and motion alignment so lips, head, and body stay naturally in sync.",
    },
    {
      icon: FiCpu,
      title: "End-to-End Consistency",
      description:
        "From lips to limbs, the pipeline ties facial nuance and body kinetics to your audio for coherent, whole-frame editing.",
    },
  ]

  return (
    <section id="under-the-hood" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Under the Hood
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {techFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border p-8 hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-accent/10">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{feature.description}</p>
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
