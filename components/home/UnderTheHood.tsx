import { FiCpu, FiLayers, FiZap, FiRefreshCw } from "react-icons/fi"

export function UnderTheHood() {
  const techFeatures = [
    {
      icon: FiRefreshCw,
      title: "Phoneme‑aware alignment",
      description: "Speech cues map to visemes, head timing and posture so articulation stays crisp.",
    },
    {
      icon: FiLayers,
      title: "Keyframe sampling",
      description: "Keyframes land on important beats while in‑betweens stay smooth and expressive.",
    },
    {
      icon: FiZap,
      title: "Memory‑aware windows",
      description: "Overlapping context windows cut visible joins without flattening motion.",
    },
    {
      icon: FiCpu,
      title: "Prompt‑driven style",
      description: "Prompts and clarity switches control expression range and stabilization.",
    },
    {
      icon: FiRefreshCw,
      title: "Latency & throughput",
      description: "The pipeline is tuned for predictable latency and batch‑friendly rendering.",
    },
  ]

  return (
    <section id="under-the-hood" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8 leading-tight">
          Under the Hood — Infinite Talk AI <span className="text-primary">(Technical Notes)</span>
        </h2>

        {/* Technical features list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="rounded-3xl border border-border bg-card p-6 md:p-7 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
