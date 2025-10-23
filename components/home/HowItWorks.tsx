'use client';

import Link from 'next/link';
import { FiArrowRight, FiUpload, FiDownload, FiPlay } from 'react-icons/fi';

export function HowItWorks() {
  const steps = [
    {
      icon: FiPlay,
      title: "Choose Workflow",
      description: "Pick image-to-video generator or video-to-video lip-sync based on your project.",
      link: "/image-to-video/",
      linkText: "image-to-video generator",
      gradient: "from-chart-3 to-primary"
    },
    {
      icon: FiUpload,
      title: "Upload Source & Audio",
      description: "Add a video or single image plus your audio (voiceover, podcast, dialogue).",
      details: "Supported formats: MP4 / JPG / PNG / WAV / MP3.",
      gradient: "from-chart-3 to-primary"
    },
    {
      icon: FiDownload,
      title: "Generate & Export",
      description: "Hit Generate. Our sparse-frame engine aligns lip shapes, expressions, head movement, and posture to your audio and keeps identity consistent—even in long sequences.",
      details: "Download your result in 480p、720p、1080p as MP4.",
      link: "/examples",
      gradient: "from-chart-3 to-primary"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to create stunning talking videos
          </p>
        </div>
        
        {/* Desktop: Horizontal flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Progress line */}
            {/* <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-chart-2/30 to-chart-3/30 -translate-y-1/2"></div> */}
            
            <div className="grid grid-cols-3 gap-8 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="relative"
                  >
                    {/* Step card - Fixed height */}
                    <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group h-[380px] flex flex-col">
                      {/* Header with number badge and title */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div className="flex-1">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {step.description}
                          {step.link && (
                            <>
                              {' '}
                              <Link 
                                href={step.link}
                                className="text-primary hover:underline font-medium transition-colors inline-flex items-center gap-1"
                              >
                                {step.linkText}
                                <FiArrowRight className="w-3 h-3" />
                              </Link>
                              .
                            </>
                          )}
                        </p>
                      </div>
                      
                      {/* Details */}
                      {step.details && (
                        <div className="mt-auto">
                          <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
                            <p className="text-sm text-primary font-medium">{step.details}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                {/* Header with icon and title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {step.description}
                  {step.link && (
                    <>
                      {' '}
                      <Link 
                        href={step.link}
                        className="text-primary hover:underline font-medium transition-colors inline-flex items-center gap-1"
                      >
                        {step.linkText}
                        <FiArrowRight className="w-3 h-3" />
                      </Link>
                      .
                    </>
                  )}
                </p>
                
                {/* Details */}
                {step.details && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
                    <p className="text-sm text-primary font-medium">{step.details}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
