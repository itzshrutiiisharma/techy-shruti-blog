"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface TornPaperTransitionProps {
  buttonText?: string;
  buttonHref?: string;
}

export function TornPaperTransition({
  buttonText = "View All Media",
  buttonHref = "#watch-listen",
}: TornPaperTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  const tearX = useTransform(smoothProgress, [0.18, 0.72], ["-110%", "5%"]);
  const peelRotate = useTransform(smoothProgress, [0.18, 0.72], [-4, 16]);
  const peelY = useTransform(smoothProgress, [0.18, 0.72], [0, 90]);
  const peelOpacity = useTransform(smoothProgress, [0.12, 0.28, 0.7, 0.85], [0.3, 1, 1, 0.8]);
  const ripWidth = useTransform(smoothProgress, [0.18, 0.72], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[90vh] md:min-h-[110vh] overflow-hidden select-none bg-[#1A2035] -mt-1 z-30 flex flex-col justify-between"
    >
      {/* 1. TOP CTA BUTTON AREA */}
      <div className="relative z-30 pt-16 pb-8 px-4 flex flex-col items-center justify-center">
        <motion.a
          href={buttonHref}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-white hover:bg-[#FFA0B6] text-[#1A2035] font-poppins font-black text-base sm:text-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors flex items-center gap-2.5 group cursor-pointer"
        >
          <span>{buttonText}</span>
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>

        <p className="text-xs font-mono text-slate-400 mt-3 tracking-widest uppercase opacity-70">
          &darr; Scroll down to tear open &darr;
        </p>
      </div>

      {/* 2. DYNAMIC SCROLL-LINKED JAGGED FIBROUS PAPER TEAR */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[620px] overflow-hidden">
        
        {/* UNDERNEATH CANVAS: Dark Charcoal About Section Canvas */}
        <div className="absolute inset-0 bg-[#0F1320] flex flex-col justify-end p-8 sm:p-14">
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.3, 0.65], [0, 1]),
              y: useTransform(smoothProgress, [0.3, 0.65], [50, 0]),
            }}
            className="max-w-xl"
          >
            <span className="text-xs font-mono text-[#FFA0B6] uppercase tracking-widest block mb-2 font-bold">
              Entering Next Realm
            </span>
            <h4 className="text-3xl sm:text-5xl font-black font-poppins text-white tracking-tight">
              About Shruti Sharma
            </h4>
          </motion.div>
        </div>

        {/* TOP LAYER: NAVY BLUE SHEET TEARING WITH IRREGULAR JAGGED EDGE */}
        <motion.div
          style={{
            clipPath: useTransform(
              smoothProgress,
              [0.18, 0.72],
              [
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                "polygon(0% 0%, 100% 0%, 100% 20%, 0% 88%)",
              ]
            ),
          }}
          className="absolute inset-0 bg-[#1A2035] z-10"
        />

        {/* 3. HIGHLY IRREGULAR, RUGGED & FIBROUS TORN PAPER SHARD (Real Organic Tear Path) */}
        <motion.div
          style={{
            x: tearX,
            rotate: peelRotate,
            y: peelY,
            opacity: peelOpacity,
          }}
          className="absolute inset-0 z-20 pointer-events-none origin-top-left"
        >
          <svg
            viewBox="0 0 1600 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-[160%] sm:w-[145%] h-full filter drop-shadow-[0_30px_45px_rgba(0,0,0,0.9)]"
          >
            {/* White Torn Paper Body with Jagged Rip Geometry */}
            <path
              d="M0 0 L1600 0 L1600 230 
                 L1550 245 L1500 220 L1460 255 L1420 235 L1380 260 L1340 240 L1300 270 
                 L1250 250 L1210 280 L1170 260 L1120 295 L1080 270 L1040 310 L990 285 
                 L950 325 L910 295 L860 340 L820 310 L770 355 L730 325 L680 370 L640 340 
                 L590 385 L550 355 L500 400 L460 370 L410 415 L370 385 L320 430 L280 400 
                 L230 450 L180 420 L130 470 L80 440 L0 490 Z"
              fill="#FFFFFF"
            />

            {/* Paper Fiber Inner Shading */}
            <path
              d="M0 20 L1600 20 L1600 215 
                 L1550 230 L1500 205 L1460 240 L1420 220 L1380 245 L1340 225 L1300 255 
                 L1250 235 L1210 265 L1170 245 L1120 280 L1080 255 L1040 295 L990 270 
                 L950 310 L910 280 L860 325 L820 295 L770 340 L730 310 L680 355 L640 325 
                 L590 370 L550 340 L500 385 L460 355 L410 400 L370 370 L320 415 L280 385 
                 L230 435 L180 405 L130 455 L80 425 L0 475 Z"
              fill="#E2E8F0"
            />

            {/* Raw Fibrous Micro-Tear Line along the bottom edge */}
            <path
              d="M0 490 L40 465 L80 440 L110 458 L130 470 L155 442 L180 420 L205 438 L230 450 
                 L255 422 L280 400 L300 418 L320 430 L345 402 L370 385 L390 402 L410 415 
                 L435 388 L460 370 L480 388 L500 400 L525 372 L550 355 L570 372 L590 385 
                 L615 358 L640 340 L660 358 L680 370 L705 342 L730 325 L750 342 L770 355 
                 L795 328 L820 310 L840 328 L860 340 L885 312 L910 295 L930 312 L950 325 
                 L970 300 L990 285 L1015 300 L1040 310 L1060 285 L1080 270 L1100 285 L1120 295 
                 L1145 272 L1170 260 L1190 272 L1210 280 L1230 260 L1250 250 L1275 262 L1300 270 
                 L1320 250 L1340 240 L1360 252 L1380 260 L1400 245 L1420 235 L1440 248 L1460 255 
                 L1480 232 L1500 220 L1525 235 L1550 245 L1575 238 L1600 230"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* 4. REAL-TIME TEARING GLOW BEAM */}
        <motion.div
          style={{ width: ripWidth }}
          className="absolute bottom-10 left-0 h-1.5 bg-gradient-to-r from-transparent via-[#FFA0B6] to-white pointer-events-none z-30 blur-[1.5px]"
        />
      </div>
    </div>
  );
}
