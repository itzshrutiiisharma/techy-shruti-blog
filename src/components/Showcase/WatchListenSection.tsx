"use client";

import { motion } from "framer-motion";
import { Play, Mic, Sparkles, Coffee, ArrowUpRight } from "lucide-react";

export function WatchListenSection() {
  const cards = [
    {
      title: "Building Autonomous Agents Live",
      tag: "Deep Dive / 45 min",
      rotate: "-rotate-12",
      delay: 0.1,
      position: "-top-10 -left-6 sm:left-[12%]",
      imgGradient: "from-blue-600 to-indigo-900",
    },
    {
      title: "How I Scaled to 100k Developers",
      tag: "Keynote / Tech Talk",
      rotate: "rotate-12",
      delay: 0.2,
      position: "-top-8 -right-6 sm:right-[14%]",
      imgGradient: "from-purple-600 to-pink-900",
    },
    {
      title: "Zero-Downtime Microservice Architecture",
      tag: "Live Coding / Tutorial",
      rotate: "rotate-6",
      delay: 0.3,
      position: "-bottom-12 -left-4 sm:left-[16%]",
      imgGradient: "from-emerald-600 to-teal-900",
    },
    {
      title: "Podcast: The Future of AI in Web",
      tag: "Episode #24",
      rotate: "-rotate-6",
      delay: 0.4,
      position: "-bottom-16 -right-4 sm:right-[15%]",
      imgGradient: "from-rose-600 to-orange-900",
    },
  ];

  return (
    <section id="watch-listen" className="relative min-h-screen w-full bg-[#1A2035] py-28 px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-center select-none">
      
      {/* SECTION TITLE */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFA0B6]/10 border border-[#FFA0B6]/30 text-[#FFA0B6] font-poppins font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Watch &amp; Listen
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-poppins text-white tracking-tight">
          Visuals &amp; <span className="text-[#FFA0B6]">Broadcasts</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Weekly technical breakdowns, deep dives, system design walk-throughs, and creator episodes.
        </p>
      </div>

      {/* MAIN 3D FLOATING STAGE (Exact Screenshot 2 Composition) */}
      <div className="relative w-full max-w-5xl h-[520px] sm:h-[600px] flex items-center justify-center my-auto">
        
        {/* 1. CENTER FLOATING 3D CLAY YOUTUBE PLAYER */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 w-72 sm:w-96 md:w-[460px] h-48 sm:h-64 md:h-72 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-[36px] border-[6px] border-white shadow-[0_35px_80px_rgba(0,0,0,0.7)] p-4 sm:p-6 flex flex-col justify-between group cursor-pointer"
        >
          {/* Main Video Viewport */}
          <div className="w-full h-32 sm:h-44 md:h-48 bg-[#141A29] rounded-2xl flex items-center justify-center border-2 border-slate-400 shadow-inner relative overflow-hidden">
            <div className="w-16 sm:w-20 h-11 sm:h-14 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-7 sm:w-8 h-7 sm:h-8 fill-white ml-1" />
            </div>
            
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/80">
              <span>Shruti Sharma Broadcast</span>
              <span className="bg-rose-600/90 text-white font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">
                1080p 60FPS
              </span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="w-full flex items-center gap-3 px-1">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-600 shadow-md animate-pulse" />
            <div className="flex-1 h-2.5 bg-rose-400/70 rounded-full overflow-hidden">
              <div className="w-3/5 h-full bg-rose-600" />
            </div>
            <span className="text-[11px] font-mono text-slate-700 font-bold">18:42</span>
          </div>
        </motion.div>

        {/* 2. SURROUNDING TILTED POLAROID PHOTO STICKERS WITH FOLDED CORNERS (Screenshot 2) */}
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: card.delay }}
            whileHover={{ scale: 1.08, zIndex: 30 }}
            className={`absolute ${card.position} z-10 w-44 sm:w-56 p-3 rounded-2xl bg-white text-[#1A2035] shadow-2xl transform ${card.rotate} hover:rotate-0 transition-all cursor-pointer`}
          >
            {/* Visual Thumbnail */}
            <div className={`w-full h-24 sm:h-28 rounded-xl bg-gradient-to-tr ${card.imgGradient} flex items-center justify-center text-white mb-2 shadow-inner relative overflow-hidden`}>
              <Play className="w-8 h-8 fill-white/80" />
              {/* Peel-off Corner Fold */}
              <div className="absolute top-0 right-0 w-6 h-6 bg-slate-300 rounded-bl-xl border-b border-l border-white shadow-sm" />
            </div>

            <p className="font-poppins font-bold text-xs sm:text-sm line-clamp-1">{card.title}</p>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{card.tag}</p>
          </motion.div>
        ))}

        {/* 3. 3D FLOATING COFFEE MUG (Bottom Right of Player) */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 right-[22%] sm:right-[26%] z-20 pointer-events-auto"
        >
          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-200 via-amber-100 to-amber-50 border-4 border-white shadow-2xl flex items-center justify-center transform rotate-12">
            <Coffee className="w-7 h-7 text-amber-900" />
          </div>
        </motion.div>

        {/* 4. 3D FLOATING MICROPHONE (Top Left of Player) */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [8, -8, 8] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 left-[20%] sm:left-[24%] z-20 pointer-events-auto"
        >
          <div className="w-12 sm:w-14 h-24 sm:h-28 bg-gradient-to-b from-slate-200 via-slate-800 to-black rounded-full border-4 border-white shadow-2xl flex flex-col items-center p-2 transform -rotate-15">
            <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center">
              <Mic className="w-4 h-4 text-slate-800" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM CTA BUTTON */}
      <div className="relative z-20 mt-12">
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FFA0B6] hover:bg-[#ff8da8] text-[#1A2035] font-poppins font-bold text-sm shadow-[0_10px_30px_rgba(255,160,182,0.4)] hover:scale-105 active:scale-95 transition-all"
        >
          <Play className="w-4 h-4 fill-[#1A2035]" />
          Explore Full Video Library
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
