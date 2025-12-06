import { FiShare2, FiMic, FiBookOpen } from "react-icons/fi"

export function BabyPodcastUseCases() {
  const useCases = [
    {
      icon: FiShare2,
      label: "Social Media & Viral Marketing",
      headline: "Social Media & Viral Marketing with AI Baby Podcast",
      subTitle: "Create shareable baby podcast videos for TikTok and Instagram",
      bullets: [
        "Leverage the charm of AI baby characters to create attention-grabbing, shareable content.",
        "Share short, funny, or heartwarming AI Baby Podcast videos to boost engagement.",
        "Create content tailored for TikTok, Instagram, YouTube Shorts, and other social platforms.",
        "Encourage shares and interactions with entertaining, character-led videos.",
        "Use trending topics or challenges to increase virality and reach new audiences.",
        "Build a loyal audience around your AI Baby Podcast character.",
      ],
    },
    {
      icon: FiMic,
      label: "Branded Podcast Series",
      headline: "Branded Podcast Series with AI Baby Podcast",
      subTitle: "Promote your brand with a fun, memorable baby character",
      bullets: [
        "Create a full AI baby podcast series to promote your brand in a fun and memorable way.",
        "Launch recurring baby podcast episodes to strengthen your brand identity.",
        "Share product updates, tutorials, or stories in an engaging podcast format.",
        "Bring a lighthearted human element to your marketing with adorable baby voices.",
        "Run seasonal or event-themed episodes to keep content fresh.",
        "Stand out in feeds with unique, AI baby–led content.",
      ],
    },
    {
      icon: FiBookOpen,
      label: "Education & Creative Projects",
      headline: "Education & Creative Projects with AI Baby Podcast",
      subTitle: "Make learning and storytelling more fun and memorable",
      bullets: [
        "Make educational and entertaining video content with AI baby hosts.",
        "Use AI Baby Podcast to tell stories, share knowledge, or teach lessons.",
        "Perfect for classroom presentations, early education, or creative projects.",
        "Capture children’s and viewers’ attention, making content easier to remember.",
      ],
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Use Cases — <span className="text-primary">InfiniteTalk Baby Podcast</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how creators, brands, and educators use Infinite Talk AI to turn AI baby hosts into engaging podcast-style videos.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          {useCases.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className="bg-card dark:bg-[#4a4a4a] rounded-3xl px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row md:items-start gap-5 md:gap-6 border border-border dark:border-[#5a5a5a] hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 shadow-lg dark:shadow-xl"
              >
                <div className="flex flex-col items-start gap-3 md:w-64 flex-shrink-0">
                  <div className="inline-flex items-center gap-3 px-3 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/25 dark:border-primary/40">
                    <div className="w-7 h-7 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-foreground whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug text-left">
                      {item.headline}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed text-left">
                      {item.subTitle}
                    </p>
                  </div>
                </div>

                <ul className="flex-1 space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


