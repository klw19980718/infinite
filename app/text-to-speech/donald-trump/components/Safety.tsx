export function DonaldTrumpTtsSafety() {
  const guidelines = [
    {
      title: 'Do not claim the AI voice is the real person',
      description:
        'Make it clear in titles, descriptions, or on-screen text that any Donald Trump text to speech AI voice is synthetic.',
    },
    {
      title: 'Respect platform rules',
      description:
        'You are responsible for following the policies of YouTube, TikTok, and other platforms around deepfakes, misinformation, and political content.',
    },
    {
      title: 'Avoid harmful or deceptive use',
      description:
        'Do not use AI voices to mislead people, fake endorsements, or fabricate statements that could be mistaken for real.',
    },
    {
      title: 'Use AI voices as original performances',
      description:
        'Treat them as characters inspired by a style, not as exact replicas of specific individuals.',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">
            Safety, Policy, and
            <span className="block text-primary">Good Practice</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mt-4">
            Before you publish any content that sounds like a public figure, keep these points in mind:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidelines.map((guideline, index) => (
            <div
              key={index}
              className="rounded-3xl border border-border bg-card p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                {guideline.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {guideline.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


