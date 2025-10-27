"use client"

import { useState } from "react"
import { FiCheck, FiMonitor, FiUsers, FiClock, FiGlobe } from "react-icons/fi"

export function Specs() {
  const specs = [
    {
      icon: FiMonitor,
      title: "Education & L&D with Infinite Talk AI",
      content:
        "Scale courses, micro-lessons, and compliance modules. Infinite Talk AI keeps the same instructor avatar while swapping languages or scripts.",
    },
    {
      icon: FiCheck,
      title: "Corporate Demos & Comms using Infinite Talk AI",
      content:
        "Produce product explainers, investor briefings, and onboarding clips. Infinite Talk AI aligns motion to technical narration and preserves brand style.",
    },
    {
      icon: FiMonitor,
      title: "Podcasts & Media powered by Infinite Talk AI",
      content:
        "Turn audio-only shows into visual episodes. Infinite Talk AI provides lip-true on-screen hosts without reshoots or studio time.",
    },
    {
      icon: FiUsers,
      title: "Marketing & Creators on Infinite Talk AI",
      content:
        "Batch short-form and long-form breakdowns. Infinite Talk AI accelerates iteration loops for agencies and solo creators.",
    },
    {
      icon: FiClock,
      title: "Accessibility & Multilingual with Infinite Talk AI",
      content:
        "Deliver the same avatar across languages. Infinite Talk AI maintains identity while dubbing global content.",
    },
    {
      icon: FiGlobe,
      title: "Optimization Path inside Infinite Talk AI",
      content:
        "Acceleration, adaptive parameter grouping, and quantization options allow Infinite Talk AI to scale from quick previews to production passes while respecting hardware limits.",
    },
  ]

  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedSpec = specs[selectedIndex]
  const SelectedIcon = selectedSpec.icon

  return (
    <section id="specs" className="py-32 md:py-40 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950 to-purple-950/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
            Application Scenarios — Infinite Talk AI
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
                      ? "bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20"
                      : "bg-slate-900/50 border-slate-800 hover:border-blue-400/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-500/30" : "bg-blue-500/10"}`}>
                      <Icon className={`w-5 h-5 ${isSelected ? "text-blue-300" : "text-slate-400"}`} />
                    </div>
                    <h3 className={`text-base font-semibold ${isSelected ? "text-white" : "text-slate-300"}`}>
                      {spec.title}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: Selected scenario detail */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-12 min-h-[400px] flex flex-col justify-center">
            <div className="inline-flex p-4 rounded-xl bg-blue-500/20 mb-8 w-fit">
              <SelectedIcon className="w-8 h-8 text-blue-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">{selectedSpec.title}</h3>

            <p className="text-base text-slate-300 leading-relaxed">{selectedSpec.content}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
