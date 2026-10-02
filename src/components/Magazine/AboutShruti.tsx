"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Heart, Sparkles, BookOpen } from "lucide-react";

export function AboutShruti() {
  return (
    <section className="mag-section-green relative py-24 px-4 sm:px-8 lg:px-16 border-b mag-border-dark space-y-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b mag-border-dark">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-emerald-950/60 uppercase tracking-widest">
            10 / EDITOR &amp; FOUNDER
          </span>
          <h2 className="font-display-editorial text-4xl sm:text-6xl font-black text-emerald-950 uppercase tracking-tight">
            ABOUT THE PUBLICATION
          </h2>
        </div>
        <div className="font-mono text-xs text-emerald-950/70 font-medium">
          SHRUTI SHARMA · EDITOR-IN-CHIEF
        </div>
      </div>

      {/* Editorial Profile Card */}
      <div className="p-8 sm:p-14 bg-white border mag-border-dark rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Author Photo Frame */}
        <div className="lg:col-span-4 relative">
          <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden border mag-border-dark bg-emerald-900/10 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
              alt="Shruti Sharma"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 brightness-95"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-xl font-mono text-[11px] text-emerald-950 flex items-center justify-between">
              <span>SHRUTI SHARMA</span>
              <span className="font-bold">SYSTEM ARCHITECT</span>
            </div>
          </div>
        </div>

        {/* Narrative Copy */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-widest">
              PERSONAL NOTE
            </span>
            <h3 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-emerald-950 leading-tight">
              “Hi, I&apos;m Shruti. <br />
              I&apos;m curious about <span className="italic font-serif-editorial">how things work</span>.”
            </h3>
          </div>

          <div className="space-y-4 font-sans text-emerald-900/80 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
            <p>
              I spend my time building high-throughput distributed backends, experimenting with AI agent runtimes, and dissecting the invisible infrastructure powering the modern internet.
            </p>
            <p>
              Techy.Shruti is an independent digital publication built for software engineers, systems architects, and curious minds who want to understand the code, latency trade-offs, and algorithms behind the apps we use every day.
            </p>
          </div>

          <div className="pt-4 border-t mag-border-dark flex flex-wrap items-center gap-6 font-mono text-xs">
            <Link
              href="/author/shruti-sharma"
              className="px-6 py-3.5 bg-emerald-950 hover:bg-emerald-900 text-white font-bold uppercase tracking-wider rounded-xl transition inline-flex items-center gap-2"
            >
              <span>READ AUTHOR ARCHIVE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="text-emerald-950 hover:text-emerald-700 font-bold uppercase tracking-wider underline underline-offset-4"
            >
              FULL EDITORIAL MANIFESTO
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
