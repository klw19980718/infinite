"use client";

import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto">
        {/* H1 标题 */}
        <h1 className="max-w-5xl bg-gradient-to-br from-white to-gray-300 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight tracking-tight">
          Infinite Talk AI — Infinite-Length Talking Video Generator
        </h1>
        
        {/* 副标题 */}
        <p className="my-8 max-w-4xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed text-white font-light">
          Turn any image or video into long-form talking footage. Our sparse-frame pipeline edits the whole frame for accurate lip-sync, stable head & body motion, and consistent identity.
        </p>
        
        {/* 要点 */}
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base mb-8 text-white font-light">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-[#13FFAA] to-[#1E67C6] rounded-full"></span>
            <span>Image-to-Video & Video-to-Video</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-[#1E67C6] to-[#CE84CF] rounded-full"></span>
            <span>Whole-frame editing, not just lips</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-[#CE84CF] to-[#DD335C] rounded-full"></span>
            <span>Export 480p/720p (1080p roadmap)</span>
          </div>
        </div>
        
        {/* CTA 按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/image-to-video"
          >
            <motion.button
              style={{
                border,
                boxShadow,
              }}
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-6 py-3 text-gray-50 transition-colors hover:bg-gray-950/50 font-medium"
            >
              Start Now
              <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            </motion.button>
          </Link>
          <Link 
            href="/pricing"
          >
            <motion.button
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/20 px-6 py-3 text-gray-50 transition-colors hover:bg-gray-950/40 font-medium border border-gray-600/50"
            >
              See Pricing
              <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};
