"use client"

import Link from "next/link"
import { FiArrowRight, FiUpload, FiDownload, FiPlay } from "react-icons/fi"

export function HowItWorks() {
  const steps = [
    {
      icon: FiPlay,
      title: "Choose Workflow",
      description: "Pick image-to-video generator or video-to-video lip-sync based on your project.",
      link: "/image-to-video/",
      linkText: "image-to-video generator",
    },
    {
      icon: FiUpload,
      title: "Upload Source & Audio",
      description: "Add a video or single image plus your audio (voiceover, podcast, dialogue).",
      details: "Supported formats: MP4 / JPG / PNG / WAV / MP3.",
    },
    {
      icon: FiDownload,
      title: "Generate & Export",
      description:
        "Hit Generate. Our sparse-frame engine aligns lip shapes, expressions, head movement, and posture to your audio and keeps identity consistent—even in long sequences.",
      details: "Download your result in 480p、720p、1080p as MP4.",
      link: "/examples",
    },
  ]

  return (
    <section id="how-it-works" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">How it works</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty">
            Three simple steps to create stunning talking videos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border p-8 hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent text-sm font-bold">{index + 1}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>

                <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">
                  {step.description}
                  {step.link && (
                    <>
                      {" "}
                      <Link
                        href={step.link}
                        className="text-accent hover:underline font-medium transition-colors inline-flex items-center gap-1"
                      >
                        {step.linkText}
                        <FiArrowRight className="w-3 h-3" />
                      </Link>
                    </>
                  )}
                </p>

                {step.details && (
                  <div className="mt-auto pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">{step.details}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
