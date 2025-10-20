'use client';

import { motion } from "framer-motion";
import { FiClock, FiTarget, FiTrendingUp, FiUser, FiLayers, FiUsers } from "react-icons/fi";

export function Highlights() {
  const highlights = [
    {
      icon: FiClock,
      title: "Unlimited Duration",
      description: "Generate long-form content without hard time limits—great for lectures, podcasts, and multi-chapter explainers.",
      gradient: "from-chart-1 to-chart-2"
    },
    {
      icon: FiTarget,
      title: "Precision Lip-Sync",
      description: "Phoneme-aware alignment keeps speech on-beat and visually convincing, frame after frame.",
      gradient: "from-chart-2 to-chart-3"
    },
    {
      icon: FiTrendingUp,
      title: "Stability at Scale",
      description: "Reduced flicker and body distortions across long sequences; smooth posture and gesture continuity.",
      gradient: "from-chart-3 to-chart-4"
    },
    {
      icon: FiUser,
      title: "Identity Preservation",
      description: "Keep the same face and style throughout the video—even across scene changes and long takes.",
      gradient: "from-chart-4 to-chart-5"
    },
    {
      icon: FiLayers,
      title: "I2V & V2V Workflows",
      description: "Use Image-to-Video (single photo → talking video) or Video-to-Video (re-animate source footage) in one place.",
      gradient: "from-chart-5 to-primary"
    },
    {
      icon: FiUsers,
      title: "1080p Export",
      description: "Get crisp, publication-ready results at 1080p with the same whole-frame stability and lip accuracy.",
      gradient: "from-primary to-chart-1"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Highlights
          </h2>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden"
              >
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${highlight.gradient} bg-opacity-10 mb-4`}>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
