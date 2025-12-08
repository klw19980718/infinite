export function SakuraKasuganoTtsSafety() {
  const guidelines = [
    {
      title: 'Treat the AI voice as parody',
      description:
        'Make it clear in your title, description, or on-screen text that any Sakura Kasugano–style AI voice is a fan-made, synthetic performance — not the official character or actor.',
    },
    {
      title: 'Respect IP and platform rules',
      description:
        'You are responsible for following Capcom&apos;s fan content policies, as well as the rules of YouTube, TikTok, and other platforms around deepfakes, impersonation, and anime content.',
    },
    {
      title: 'Avoid harmful or deceptive uses',
      description:
        'Do not use AI voices to mislead viewers, fake endorsements, or suggest official sponsorship. Keep content clearly marked as fan work or parody.',
    },
    {
      title: 'Use original designs where possible',
      description:
        'Whenever you can, pair the voice with original art, avatars, or cosplay instead of implying it is the official Sakura Kasugano model.',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">
            Safety, Policy, and
            <span className="block text-primary">Good Practice for Fan Content</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mt-4">
            Before you publish any Sakura Kasugano–style clips or videos, keep these points in mind to stay respectful to creators and platforms.
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


