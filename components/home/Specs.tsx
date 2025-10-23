'use client';

import { FiCheck, FiMonitor, FiMusic, FiUsers, FiClock, FiGlobe } from 'react-icons/fi';

export function Specs() {
  const specs = [
    {
      icon: FiMonitor,
      title: "Inputs",
      content: "Image (JPG/PNG) + audio, or Video (MP4) + audio (WAV/MP3, 16–24 kHz mono recommended)"
    },
    {
      icon: FiCheck,
      title: "Outputs", 
      content: "MP4 — 480p / 720p / 1080p"
    },
    {
      icon: FiMonitor,
      title: "Modes",
      content: "Image-to-Video (I2V), Video-to-Video (V2V)"
    },
    {
      icon: FiUsers,
      title: "Multi-speaker",
      content: "Independent tracks & references"
    },
    {
      icon: FiClock,
      title: "Long-form",
      content: "Chunked with overlap for continuity"
    },
    {
      icon: FiGlobe,
      title: "Web-based",
      content: "No install required"
    }
  ];

  return (
    <section id="specs" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent mb-4">
            Specs at a Glance
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <div
                key={index}
                className="group relative p-6 bg-card/60 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {spec.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {spec.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Performance note */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-3/10 border border-primary/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Performance note</h3>
            <p className="text-muted-foreground leading-relaxed">
              1080p yields the highest visual clarity and lip detail. It also uses more compute; render time scales with duration and the number of speakers. For speed-sensitive drafts, start at 480p/720p, then export the final cut in 1080p.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
