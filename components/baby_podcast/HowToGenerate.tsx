import { FiImage, FiMic, FiPlay, FiDownload } from "react-icons/fi"

export function HowToGenerateBabyPodcast() {
  const steps = [
    {
      icon: FiImage,
      title: "Upload Baby Photo",
      description:
        "Upload an AI-generated baby photo or choose from our AI baby templates. For best results, use a natural photo with the mouth closed and unobstructed.",
    },
    {
      icon: FiMic,
      title: "Add Script & Select Voice",
      description:
        "Enter your dialogue or podcast script, then choose from cute AI voices, upload pre-recorded audio, or even record your own voice for fun results.",
    },
    {
      icon: FiPlay,
      title: "Generate Your video",
      description:
        "Tap the Generate button, and our AI will turn the AI baby photo into a baby talking podcast video.",
    },
    {
      icon: FiDownload,
      title: "Preview and download",
      description:
        "Download your video in high quality—ready to share on TikTok, Instagram, YouTube Shorts, or use in professional projects.",
    },
  ]

  return (
    <section id="how-to-generate" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            How to Generate Baby Podcast Videos with <span className="text-accent">Infinite Talk AI</span>?
          </h2>
          <p className="text-xl text-muted-foreground">(4 Steps)</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          {/* Left Side - Video */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="w-full max-w-[260px] mx-auto lg:mx-0">
              <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden glass-strong" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
                <video
                  src="https://cdn.infinitetalkai.org/babypodcast/babypodcast.mp4"
                  className="w-full h-full object-cover"
                  controls
                  loop
                  playsInline
                  poster="https://cdn.infinitetalkai.org/babypodcast/baby_podcast_21.webp"
                  preload="none"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-4 order-1 lg:order-2">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  key={index}
                  className="glass rounded-2xl px-5 py-4 md:px-6 md:py-5 hover:glass-strong transition-all duration-300 group"
                  style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}
                >
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300">
                        <span className="text-sm md:text-base font-semibold text-accent">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 pt-1 space-y-2">
                      <div className="flex items-center gap-2.5 md:gap-3">
                        <div className="inline-flex p-1.5 rounded-lg bg-accent/10 flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                        </div>
                        <h3 className="text-sm md:text-base font-semibold text-foreground text-left">
                          {step.title}
                        </h3>
                      </div>
                      <div className="text-[11px] md:text-sm text-muted-foreground leading-relaxed text-left text-pretty">
                        {step.description}
                      </div>
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

