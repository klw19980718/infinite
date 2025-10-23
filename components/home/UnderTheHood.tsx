'use client';

import { FiCpu, FiLayers, FiZap, FiRefreshCw } from 'react-icons/fi';

export function UnderTheHood() {
  const techFeatures = [
    {
      icon: FiRefreshCw,
      title: "Temporal Context",
      description: "Overlapping context frames carry motion \"momentum\" across chunks, minimizing flicker and visible seams in long videos."
    },
    {
      icon: FiLayers,
      title: "Soft Reference Control",
      description: "Control strength adapts to context-to-reference similarity, preserving identity without making the avatar look stiff."
    },
    {
      icon: FiZap,
      title: "Sampling Strategy",
      description: "Fine-grained keyframe placement balances control and motion alignment so lips, head, and body stay naturally in sync."
    },
    {
      icon: FiCpu,
      title: "End-to-End Consistency",
      description: "From lips to limbs, the pipeline ties facial nuance and body kinetics to your audio for coherent, whole-frame editing."
    }
  ];

  return (
    <section id="under-the-hood" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Under the Hood
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {techFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-card-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
