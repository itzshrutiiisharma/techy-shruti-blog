"use client";

import { motion } from "framer-motion";
import { Cloud, Sparkles, Code2, Compass, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutVisualSection() {
  return (
    <section id="about" className="relative min-h-screen w-full bg-[#1A2035] py-28 px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-between select-none">
      
      {/* 1. TOP TITLE: "About Shruti Sharma" (Exact Screenshot 1 Typography) */}
      <div className="text-center max-w-3xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none mb-1">
            About
          </h2>
          <span className="font-poppins font-black text-5xl sm:text-7xl md:text-8xl text-[#FFA0B6] tracking-tight leading-none block">
            Shruti Sharma
          </span>
        </motion.div>
      </div>

      {/* 2. CENTER COLLAGE STAGE: HEAD CUTOUT + PINK SPEECH BUBBLE + CLAY BRAIN & CLOUD (Screenshot 1) */}
      <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] flex items-center justify-center my-6">
        
        {/* A. FLOATING 3D PINK CLAY BRAIN (Left Side) */}
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] sm:left-[16%] z-10 hover:scale-120 transition-transform cursor-pointer"
        >
          <div className="w-20 sm:w-28 h-16 sm:h-22 rounded-[32px] bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 border-[5px] border-white shadow-[0_20px_45px_rgba(244,63,94,0.45)] flex items-center justify-center">
            <span className="text-3xl sm:text-4xl">🧠</span>
          </div>
        </motion.div>

        {/* B. CENTER CHARACTER HEAD CUTOUT WITH WHITE STICKER OUTLINE (Screenshot 1) */}
        <div className="relative z-20 w-64 sm:w-80 md:w-96 flex flex-col items-center">
          
          {/* Pink Speech Bubble ("What now?") */}
          <motion.div
            initial={{ scale: 0, rotate: 10 }}
            whileInView={{ scale: 1, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 220, delay: 0.2 }}
            className="absolute -top-12 -right-4 sm:-right-8 z-30 bg-[#FFA0B6] text-[#1A2035] font-poppins font-extrabold text-sm sm:text-base px-6 py-3 rounded-[24px] shadow-[0_15px_30px_rgba(255,160,182,0.4)] cursor-default"
          >
            What now?
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[#FFA0B6] rotate-45" />
          </motion.div>

          {/* Head Cutout with White Sticker Outline */}
          <div className="w-full h-72 sm:h-88 rounded-[50px] bg-gradient-to-b from-[#2A344E] to-[#141A29] border-[6px] border-white shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col items-center justify-center pt-8">
            <div className="w-full px-10 sm:px-14 flex items-center justify-between">
              {/* Left Eye */}
              <div className="w-14 sm:w-16 h-9 sm:h-10 bg-white rounded-full flex items-center justify-center border-2 border-slate-300">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-amber-950 flex items-center justify-end p-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>
              {/* Right Eye */}
              <div className="w-14 sm:w-16 h-9 sm:h-10 bg-white rounded-full flex items-center justify-center border-2 border-slate-300">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-amber-950 flex items-center justify-end p-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* C. FLOATING 3D WHITE CLAY CLOUD (Right Side) */}
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute right-[6%] sm:right-[15%] z-10 hover:scale-120 transition-transform"
        >
          <div className="w-24 sm:w-32 h-18 sm:h-24 rounded-full bg-slate-100 border-[5px] border-white shadow-[0_20px_45px_rgba(0,0,0,0.4)] flex items-center justify-center">
            <Cloud className="w-12 sm:w-16 h-12 sm:h-16 text-slate-300 fill-slate-200" />
          </div>
        </motion.div>
      </div>

      {/* 3. SUBTITLE TEXT & EDITORIAL STATEMENT (Exact Screenshot 1 Bottom Text) */}
      <div className="text-center max-w-3xl mx-auto relative z-20 mt-4">
        <h3 className="font-poppins font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
          A curious <span className="text-[#FFA0B6]">engineer.</span>
        </h3>
        <p className="text-slate-300 text-sm sm:text-lg max-w-xl mx-auto mt-4 leading-relaxed font-sans">
          Building at the convergence of frontier artificial intelligence, scalable distributed web systems, and high-impact educational content.
        </p>

        {/* Editorial Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FFA0B6] text-[#1A2035] font-poppins font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all"
          >
            Read Full Journey &amp; Vision
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-white text-white font-poppins font-semibold text-xs sm:text-sm hover:scale-105 transition-all"
          >
            Explore Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
