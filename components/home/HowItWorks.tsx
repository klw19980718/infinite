import Link from 'next/link';

export function HowItWorks() {
  const steps = [
    {
      title: "Choose — Workflow",
      description: "Pick image-to-video generator or video-to-video lip-sync based on your project.",
      link: "/image-to-video/",
      linkText: "image-to-video generator"
    },
    {
      title: "Upload — Source & Audio",
      description: "Add a video or single image plus your audio (voiceover, podcast, dialogue).",
      details: "Supported formats: MP4 / JPG / PNG / WAV / MP3."
    },
    {
      title: "Generate & Export",
      description: "Hit Generate. Our sparse-frame engine aligns lip shapes, expressions, head movement, and posture to your audio and keeps identity consistent—even in long sequences.",
      details: "Download your result in 480p or 720p (1080p on the roadmap) as MP4.",
      link: "/examples",
      linkText: "See our AI video examples"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                {index + 1}
              </div>
              
              <h3 className="text-xl font-semibold">{step.title}</h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
                {step.link && (
                  <>
                    {' '}
                    <Link 
                      href={step.link}
                      className="text-primary hover:underline font-medium"
                    >
                      {step.linkText}
                    </Link>
                    .
                  </>
                )}
              </p>
              
              {step.details && (
                <p className="text-sm text-muted-foreground">
                  {step.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
