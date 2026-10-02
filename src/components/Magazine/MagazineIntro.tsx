"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Terminal, Sparkles, Code2, Wifi } from "lucide-react";

export function MagazineIntro({ totalPosts = 12 }: { totalPosts?: number }) {
  return (
    <section className="mag-section-ivory relative min-h-[92vh] flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-24 pb-16 overflow-hidden border-b mag-border-dark">
      {/* Editorial Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em] text-stone-500 uppercase pb-6 border-b mag-border-dark">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-stone-900 inline-block animate-pulse" />
          <span className="font-semibold text-stone-900">TECHY.SHRUTI</span>
          <span>/</span>
          <span>ISSUE N° 01 (2026)</span>
        </div>
        <div className="flex items-center gap-6">
          <span>TECHNOLOGY</span>
          <span>•</span>
          <span>INTERNET</span>
          <span>•</span>
          <span>IDEAS</span>
          <span className="hidden md:inline text-stone-400">|</span>
          <span className="hidden md:inline font-bold text-stone-900">{totalPosts} ESSAYS ONLINE</span>
        </div>
      </div>

      {/* Hero Headline & Asymmetric Composition */}
      <div className="my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Oversized Statement */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="inline-block font-mono text-xs font-bold text-stone-600 uppercase tracking-widest px-3 py-1 bg-stone-200/60 rounded-full">
              INTERNET SYSTEMS &amp; CULTURE
            </span>
            <h1 className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.98] text-stone-900 tracking-tight">
              The internet is <br />
              <span className="italic font-normal font-serif-editorial text-stone-600">much stranger</span> <br />
              than it looks.
            </h1>
          </div>

          <p className="font-sans text-lg sm:text-xl text-stone-600 max-w-xl font-light leading-relaxed">
            An independent publication decoding high-velocity distributed systems, AI agent runtimes, and the hidden mechanics under the web apps you use every day.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-xs">
            <a
              href="#current-issue"
              className="px-7 py-3.5 bg-stone-950 hover:bg-stone-800 text-stone-100 font-bold uppercase tracking-wider rounded-none transition flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Current Issue</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <Link
              href="/about"
              className="text-stone-700 hover:text-stone-950 font-bold uppercase tracking-wider underline underline-offset-4 decoration-stone-300"
            >
              Read Manifesto
            </Link>
          </div>
        </div>

        {/* Right Column: Editorial Visual Collage */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full max-w-lg mx-auto aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
            {/* Primary Image Pod */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[80%] rounded-2xl overflow-hidden border mag-border-dark shadow-2xl bg-stone-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80"
                alt="System Interface"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-stone-900/10" />
            </motion.div>

            {/* Overlapping Floating Browser Window */}
            <motion.div
              className="absolute -bottom-4 -left-6 sm:-left-8 w-4/5 bg-stone-900 text-stone-100 rounded-xl p-4 shadow-2xl border border-stone-800 font-mono text-xs space-y-3 z-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-[10px] text-stone-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span>https://techyshruti.dev/pipeline</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed text-stone-300">
                <p><span className="text-purple-400">GET</span> /api/v1/consensus HTTP/2.0</p>
                <p className="text-stone-500">// 100k requests routed via CDN edge</p>
                <p><span className="text-emerald-400">200 OK</span> • 14ms latency • raft:synced</p>
              </div>
            </motion.div>

            {/* Abstract Accent Badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-stone-100 border mag-border-dark p-4 rounded-xl shadow-lg font-mono text-xs space-y-1 text-stone-800 z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 font-bold text-stone-900 uppercase">
                <Wifi className="w-3.5 h-3.5 text-stone-900" />
                <span>LIVE FEED</span>
              </div>
              <p className="text-[10px] text-stone-500">Updated 2m ago</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ticker / Footer of Section 1 */}
      <div className="pt-6 border-t mag-border-dark flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-stone-600">
        <div>BY SHRUTI SHARMA &amp; FELLOW SYSTEM ARCHITECTS</div>
        <div className="flex items-center gap-6">
          <span>VOL. 01</span>
          <span>•</span>
          <span>2026 EDITION</span>
        </div>
      </div>
    </section>
  );
}
