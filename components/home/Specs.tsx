"use client"

import { useState } from "react"
import { FiCheck, FiMonitor, FiUsers, FiClock, FiGlobe } from "react-icons/fi"

export function Specs() {
  const specs = [
    {
      icon: FiMonitor,
      title: "Education & L&D with infinite talk ai",
      content:
        "Scale courses, micro-lessons, and compliance modules. infinite talk ai keeps the same instructor avatar while swapping languages or scripts.",
    },
    {
      icon: FiCheck,
      title: "Corporate Demos & Comms using infinitetalk ai",
      content:
        "Produce product explainers, investor briefings, and onboarding clips. infinitetalk ai aligns motion to technical narration and preserves brand style.",
    },
    {
      icon: FiMonitor,
      title: "Podcasts & Media powered by infinity talk",
      content:
        "Turn audio-only shows into visual episodes. infinity talk provides lip-true on-screen hosts without reshoots or studio time.",
    },
    {
      icon: FiUsers,
      title: "Marketing & Creators on infinitetalk",
      content:
        "Batch short-form and long-form breakdowns. infinitetalk accelerates iteration loops for agencies and solo creators.",
    },
    {
      icon: FiClock,
      title: "Accessibility & Multilingual with infinite talk",
      content:
        "Deliver the same avatar across languages. infinite talk maintains identity while dubbing global content.",
    },
    {
      icon: FiGlobe,
      title: "Optimization Path inside infinitetalk",
      content:
        "Acceleration, adaptive parameter grouping, and quantization options allow infinitetalk to scale from quick previews to production passes while respecting hardware limits.",
    },
  ]

  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedSpec = specs[selectedIndex]
  const SelectedIcon = selectedSpec.icon

  return (
    <section id="specs" className="py-32 md:py-40 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Application Scenarios — infinite talk ai
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 max-w-7xl mx-auto">
          {/* Left: Scenario list */}
          <div className="space-y-3">
            {specs.map((spec, index) => {
              const Icon = spec.icon
              const isSelected = selectedIndex === index

              return (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-accent/20 border-accent shadow-lg shadow-accent/20"
                      : "bg-card border-border hover:border-accent/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-accent/30" : "bg-accent/10"}`}>
                      <Icon className={`w-5 h-5 ${isSelected ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className={`text-base font-semibold ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                      {spec.title}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: Selected scenario detail */}
          <div className="bg-card rounded-2xl border border-border p-12 min-h-[400px] flex flex-col justify-center">
            <div className="inline-flex p-4 rounded-xl bg-accent/20 mb-8 w-fit">
              <SelectedIcon className="w-8 h-8 text-accent" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-6">{selectedSpec.title}</h3>

            <p className="text-base text-muted-foreground leading-relaxed">{selectedSpec.content}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
