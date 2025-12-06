import Image from "next/image"

export function HowItWorks() {
  const steps = [
    {
      image: "/svg/upload.svg",
      title: "Upload Image or Video",
      description:
        "Upload a clear image or source video you want to re‑animate.",
    },
    {
      image: "/svg/audio.svg",
      title: "Add Script and Audio",
      description:
        "Paste a script or upload WAV/MP3 narration; we map phonemes and timing automatically.",
    },
    {
      image: "/svg/complate.svg",
      title: "Generate and Download",
      description:
        "Generate, review a preview, then download MP4 ready for courses, ads, or social clips.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">
            How to Generate Talking Videos with
            <span className="block text-primary">Infinite Talk AI</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className="rounded-3xl border border-border bg-card p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm md:text-base font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-32 md:h-40 relative mb-2">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
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
