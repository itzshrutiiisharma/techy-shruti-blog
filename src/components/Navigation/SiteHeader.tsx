"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { navigationLinks } from "@/data/siteData";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1); // default active on '02 Watch & Learn' like screenshot 4

  return (
    <>
      {/* FIXED TOP HEADER (Matching Trevor Noah layout) */}
      <header className="fixed top-0 inset-x-0 z-40 px-6 sm:px-10 md:px-14 py-6 md:py-8 flex items-center justify-between pointer-events-none">
        {/* Top-Left Brand Name in Pink */}
        <Link
          href="/"
          className="pointer-events-auto font-poppins font-extrabold text-2xl sm:text-3xl tracking-tight text-[#FFA0B6] hover:opacity-90 transition-opacity drop-shadow-sm"
        >
          Shruti Sharma
        </Link>

        {/* Top-Right Action Controls */}
        <div className="pointer-events-auto flex items-center gap-3.5">
          {/* Circular Hamburger Button (=) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-100 text-[#1B1F33] flex items-center justify-center font-black text-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <span className="text-xl font-bold tracking-tighter leading-none -mt-0.5">=</span>
            )}
          </button>

          {/* Pill CTA Button (Get in Touch) */}
          <a
            href="#contact"
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-[#FFA0B6] hover:text-[#1B1F33] text-[#1B1F33] font-poppins font-bold text-xs sm:text-sm tracking-tight shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all hidden xs:inline-flex items-center"
          >
            Get in Touch
          </a>
        </div>
      </header>

      {/* FULL-SCREEN EDITORIAL MENU DRAWER (Exact Screenshot 4 Implementation) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#1A2035] flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden select-none"
          >
            {/* Top Bar inside Menu */}
            <div className="w-full flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-poppins font-extrabold text-2xl sm:text-3xl tracking-tight text-[#FFA0B6]"
              >
                Shruti Sharma
              </Link>

              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-100 text-[#1B1F33] flex items-center justify-center font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-3 rounded-full bg-white text-[#1B1F33] font-poppins font-bold text-sm tracking-tight shadow-xl hover:bg-[#FFA0B6] transition-all hidden sm:inline-block"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Menu Body: Left Character Cutout + Speech Bubble, Right Numbered Editorial List */}
            <div className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 py-8">
              
              {/* LEFT COLUMN: CHARACTER CUTOUT WITH SPEECH BUBBLE (Exact Screenshot 4 Left Side) */}
              <div className="hidden lg:flex lg:col-span-5 relative items-end justify-center h-full">
                <div className="relative">
                  {/* Speech Bubble "Leaving so soon?" */}
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="absolute -top-12 -left-6 z-20 bg-white text-[#1A2035] font-poppins font-bold text-base px-6 py-3 rounded-[24px] shadow-[0_15px_30px_rgba(0,0,0,0.35)]"
                  >
                    Leaving so soon?
                    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white rotate-45" />
                  </motion.div>

                  {/* Character Head Cutout with White Sticker Rim */}
                  <div className="relative w-72 h-80 rounded-t-full bg-gradient-to-b from-[#2A344E] to-[#141A29] border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
                    {/* Character Face / Eyes */}
                    <div className="w-full h-full flex flex-col items-center justify-center pt-8">
                      <div className="w-full px-10 flex items-center justify-between">
                        <div className="w-12 h-8 bg-white rounded-full flex items-center justify-center border border-slate-300">
                          <div className="w-6 h-6 rounded-full bg-amber-950 flex items-center justify-end p-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                        </div>
                        <div className="w-12 h-8 bg-white rounded-full flex items-center justify-center border border-slate-300">
                          <div className="w-6 h-6 rounded-full bg-amber-950 flex items-center justify-end p-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: NUMBERED EDITORIAL MENU ITEMS (Screenshot 4 Right Side) */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4">
                {navigationLinks.map((item, idx) => {
                  const isActive = hoveredIndex === idx;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      className="relative flex items-center"
                    >
                      {isActive ? (
                        /* ACTIVE CAPSULE PILL STATE (Exact Screenshot 4 Capsule with 3D Preview) */
                        <motion.a
                          layoutId="activeMenuPill"
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="relative w-full py-4 sm:py-5 px-6 sm:px-8 rounded-full bg-white text-[#FFA0B6] flex items-center justify-between shadow-2xl transition-transform hover:scale-[1.02]"
                        >
                          <div className="flex items-center gap-4 sm:gap-6">
                            <span className="font-poppins font-medium text-sm sm:text-base text-slate-500">
                              {item.id}
                            </span>
                            <span className="font-poppins font-black text-2xl sm:text-4xl md:text-5xl text-[#FFA0B6] tracking-tight">
                              {item.name}
                            </span>
                          </div>

                          {/* 3D CLAY YOUTUBE / MEDIA WIDGET EMBEDDED IN PILL */}
                          {item.id === "02" && (
                            <div className="relative -my-6 -mr-4 sm:-mr-6 w-20 sm:w-28 h-14 sm:h-18 bg-[#2A334E] rounded-2xl border-2 border-white/20 shadow-xl flex items-center justify-center transform rotate-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md">
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
                              </div>
                            </div>
                          )}
                        </motion.a>
                      ) : (
                        /* INACTIVE LINK ITEM */
                        <a
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full py-3 sm:py-4 px-6 sm:px-8 flex items-center gap-4 sm:gap-6 text-white hover:text-[#FFA0B6] transition-colors group"
                        >
                          <span className="font-poppins font-medium text-sm sm:text-base text-slate-500 group-hover:text-slate-300">
                            {item.id}
                          </span>
                          <span className="font-poppins font-black text-2xl sm:text-4xl md:text-5xl tracking-tight">
                            {item.name}
                          </span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Menu Footer with Diagonal Arrow ( ↗ ) */}
            <div className="w-full flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
              <span>Shruti Sharma &bull; Editorial Platform</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A2035] transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
