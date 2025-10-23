"use client"

import { FiCheck, FiMonitor, FiUsers, FiClock, FiGlobe } from "react-icons/fi"

export function Specs() {
  const specs = [
    {
      icon: FiMonitor,
      title: "Inputs",
      content: "Image (JPG/PNG) + audio, or Video (MP4) + audio (WAV/MP3, 16–24 kHz mono recommended)",
    },
    {
      icon: FiCheck,
      title: "Outputs",
      content: "MP4 — 480p / 720p / 1080p",
    },
    {
      icon: FiMonitor,
      title: "Modes",
      content: "Image-to-Video (I2V), Video-to-Video (V2V)",
    },
    {
      icon: FiUsers,
      title: "Multi-speaker",
      content: "Independent tracks & references",
    },
    {
      icon: FiClock,
      title: "Long-form",
      content: "Chunked with overlap for continuity",
    },
    {
      icon: FiGlobe,
      title: "Web-based",
      content: "No install required",
    },
  ]

  return (
    <section id="specs" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Specs at a Glance
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {specs.map((spec, index) => {
            const Icon = spec.icon
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border p-8 hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-accent/10">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{spec.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm text-pretty">{spec.content}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Performance note</h3>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              1080p yields the highest visual clarity and lip detail. It also uses more compute; render time scales with
              duration and the number of speakers. For speed-sensitive drafts, start at 480p/720p, then export the final
              cut in 1080p.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
