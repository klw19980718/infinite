import { FiCpu, FiLayers, FiZap, FiRefreshCw } from "react-icons/fi"

export function UnderTheHood() {
  const techFeatures = [
    {
      icon: FiRefreshCw,
      title: "Phoneme-Aware Alignment in Infinite Talk AI",
      description:
        "Speech cues map to visemes, head timing, and posture shifts. Infinite Talk AI fuses audio features with spatial priors so articulation stays crisp at natural pace.",
    },
    {
      icon: FiLayers,
      title: "Keyframe Sampling Strategy in Infinite Talk AI",
      description:
        "Fine-grained placement balances constraint and freedom. Infinite Talk AI lets expressive beats land precisely while smoothing in-between frames.",
    },
    {
      icon: FiZap,
      title: "Memory-Aware Processing in Infinite Talk AI",
      description:
        "Overlapping windows minimize discontinuities. Infinite Talk AI maintains temporal consistency without over-regularizing natural variation.",
    },
    {
      icon: FiCpu,
      title: "Prompt-Driven Style & Clarity in Infinite Talk AI",
      description:
        "Concise prompts and clarity switches influence articulation intensity, expression range, and stabilization. Infinite Talk AI keeps prompts human-readable and domain-aware for technical scripts.",
    },
    {
      icon: FiRefreshCw,
      title: "Latency & Throughput in Infinite Talk AI",
      description:
        "Pipeline stages are tuned for predictable latency under load. Infinite Talk AI exposes batch-friendly behavior for production workflows and queue-based rendering.",
    },
  ]

  return (
    <section id="under-the-hood" className="py-32 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(120,119,198,0.08),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-chart-3/3 to-background"></div>

      {/* Decorative grid accent */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-[linear-gradient(to_right,#80808008_2px,transparent_2px),linear-gradient(to_bottom,#80808008_2px,transparent_2px)] bg-[size:40px_40px]"></div>

      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 max-w-7xl mx-auto">
          {/* Left: Sticky title */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground text-balance leading-tight">
              Under the Hood — Infinite Talk AI (Technical Notes)
            </h2>
          </div>

          {/* Right: Technical features list */}
          <div className="space-y-6">
            {techFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group relative bg-card rounded-2xl border border-border p-8 hover:border-accent/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 p-2.5 rounded-xl bg-accent/10">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
