export function Highlights() {
  const highlights = [
    {
      title: "Unlimited Duration",
      description: "Generate long-form content without hard time limits—great for lectures, podcasts, and multi-chapter explainers."
    },
    {
      title: "Precision Lip-Sync",
      description: "Phoneme-aware alignment keeps speech on-beat and visually convincing, frame after frame."
    },
    {
      title: "Stability at Scale",
      description: "Reduced flicker and body distortions across long sequences; smooth posture and gesture continuity."
    },
    {
      title: "Identity Preservation",
      description: "Keep the same face and style throughout the video—even across scene changes and long takes."
    },
    {
      title: "I2V & V2V Workflows",
      description: "Use Image-to-Video (single photo → talking video) or Video-to-Video (re-animate source footage) in one place."
    },
    {
      title: "Multi-Speaker Scenes",
      description: "Drive multiple characters with independent audio tracks and reference controls."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Highlights
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3">
                {highlight.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
