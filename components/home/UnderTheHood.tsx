export function UnderTheHood() {
  const techFeatures = [
    {
      title: "Temporal Context",
      description: "Overlapping context frames carry motion \"momentum\" across chunks, minimizing flicker and visible seams in long videos."
    },
    {
      title: "Soft Reference Control",
      description: "Control strength adapts to context-to-reference similarity, preserving identity without making the avatar look stiff."
    },
    {
      title: "Sampling Strategy",
      description: "Fine-grained keyframe placement balances control and motion alignment so lips, head, and body stay naturally in sync."
    },
    {
      title: "End-to-End Consistency",
      description: "From lips to limbs, the pipeline ties facial nuance and body kinetics to your audio for coherent, whole-frame editing."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Under the Hood
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {techFeatures.map((feature, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
