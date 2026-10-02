"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, HelpCircle } from "lucide-react";

const CURIOSITY_QUESTIONS = [
  {
    q: "Why can't databases just scale forever?",
    size: "text-3xl sm:text-5xl lg:text-6xl font-serif-editorial",
    colSpan: "lg:col-span-8",
    slug: "mastering-nextjs-15",
    tag: "CONSENSUS & CAP THEOREM",
  },
  {
    q: "What happens when millions of people open Instagram at the exact same second?",
    size: "text-2xl sm:text-4xl font-display-editorial font-bold",
    colSpan: "lg:col-span-4",
    slug: "top-7-ai-tools",
    tag: "CONCURRENCY & CDN",
  },
  {
    q: "How does an app know where you are within 3 meters?",
    size: "text-2xl sm:text-3xl font-serif-editorial",
    colSpan: "lg:col-span-5",
    slug: "top-7-ai-tools",
    tag: "GEOLOCATION & TRILATERATION",
  },
  {
    q: "What does “the cloud” actually mean in physical reality?",
    size: "text-3xl sm:text-4xl font-serif-editorial italic",
    colSpan: "lg:col-span-7",
    slug: "fullstack-roadmap-2026",
    tag: "PHYSICAL INFRASTRUCTURE",
  },
];

export function CuriosityWall() {
  return (
    <section className="mag-section-cream relative py-24 px-4 sm:px-8 lg:px-16 border-b mag-border-dark space-y-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b mag-border-dark">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-stone-600 uppercase tracking-widest">
            09 / PHYSICAL MAGAZINE WALL
          </span>
          <h2 className="font-display-editorial text-4xl sm:text-6xl font-black text-stone-900 uppercase tracking-tight">
            THE CURIOSITY WALL
          </h2>
        </div>
        <div className="font-mono text-xs text-stone-600 font-medium">
          PROVOCATIVE QUESTIONS ABOUT SYSTEMS
        </div>
      </div>

      {/* Scattered Irregular Question Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {CURIOSITY_QUESTIONS.map((item, idx) => (
          <div
            key={idx}
            className={`${item.colSpan} p-8 sm:p-10 bg-white border mag-border-dark rounded-3xl shadow-sm flex flex-col justify-between group space-y-6 hover:border-stone-500 transition-all`}
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-stone-100 text-stone-800 font-mono text-[10px] font-bold uppercase rounded-md">
                {item.tag}
              </span>
              <Link href={`/blog/${item.slug}`} className="block">
                <h3 className={`${item.size} text-stone-900 group-hover:text-stone-600 transition-colors leading-snug`}>
                  “{item.q}”
                </h3>
              </Link>
            </div>

            <div className="pt-4 border-t mag-border-dark flex items-center justify-between font-mono text-xs">
              <span className="text-stone-400">QUESTION N° 0{idx + 1}</span>
              <Link
                href={`/blog/${item.slug}`}
                className="font-bold text-stone-950 inline-flex items-center gap-1.5 hover:underline"
              >
                <span>EXPLORE ANSWER</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
