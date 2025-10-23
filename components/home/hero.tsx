"use client";

import React from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

export const AuroraHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/50"></div>
      
      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-chart-4/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-12">
          
          {/* Left content */}
          <div className="flex-1 max-w-2xl lg:max-w-none">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </div>
                <span className="text-primary font-medium">Infinite-Length Video Generation</span>
              </div>

              {/* Main title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  Infinite Talk AI
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                  — Infinite-Length
                </span>
                <br />
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  Talking Video Generator
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Turn any image or video into long-form talking footage. Our sparse-frame pipeline edits the whole frame for accurate lip-sync, stable head & body motion, and consistent identity.
              </p>
              
              {/* Feature highlights */}
              <div className="flex flex-wrap gap-3">
                {[
                  "Image-to-Video & Video-to-Video",
                  "Whole-frame editing, not just lips", 
                  "Export 480p / 720p / 1080p"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-card/60 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                    <FiCheckCircle className="text-primary w-4 h-4 flex-shrink-0" />
                    <span className="text-foreground font-medium text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/image-to-video">
                    <button className="group relative flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-chart-2 px-8 py-4 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/50">
                      <span>Start Creating</span>
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                  <Link href="/pricing">
                    <button className="group relative flex items-center gap-3 rounded-xl bg-card/50 backdrop-blur-sm px-8 py-4 text-foreground font-semibold border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
                      <span>View Pricing</span>
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
                
                {/* 1080p HD badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-chart-1 to-chart-2 text-white text-xs font-medium shadow-lg">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                  </span>
                  1080p HD now available
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Visual element or placeholder */}
          <div className="flex-1 max-w-lg lg:max-w-none flex justify-center lg:justify-end">
            <div className="relative">
              {/* Placeholder for future video/demo */}
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl bg-gradient-to-br from-primary/20 via-chart-2/20 to-chart-3/20 border border-border/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <FiArrowRight className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground font-semibold">Video Demo</p>
                    <p className="text-muted-foreground text-sm">Coming Soon</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-chart-3/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
