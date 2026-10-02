"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, BookOpen } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  postCount?: number;
}

const TOPIC_PREVIEWS: Record<string, { title: string; excerpt: string; slug: string }> = {
  "AI": {
    title: "Inside Gemini 2.0 & Multi-Agent Consensus Runtimes",
    excerpt: "How autonomous agent swarms achieve deterministic state execution without race conditions.",
    slug: "cursor-ai-vs-vscode",
  },
  "SYSTEM DESIGN": {
    title: "Designing Sub-100ms Global API Routers",
    excerpt: "Architecture patterns for edge-rendered server-sent events and distributed state caching.",
    slug: "mastering-nextjs-15",
  },
  "WEB": {
    title: "React 19 Server Components & Zero-Bundle Architecture",
    excerpt: "Eliminating client hydration overhead while maintaining rich interactive web applications.",
    slug: "mastering-nextjs-15",
  },
  "INTERNET": {
    title: "What Happens When Millions Open Instagram Simultaneously?",
    excerpt: "A deep dive into partition keys, hot key caching, and CDN origin shield strategies.",
    slug: "top-7-ai-tools",
  },
  "ENGINEERING": {
    title: "Staff Engineer Mindset: Latency vs Complexity Tradeoffs",
    excerpt: "Lessons from scaling microservices and distributed consensus systems in production.",
    slug: "fullstack-roadmap-2026",
  },
};

export function InteractiveExplore({ categories }: { categories: CategoryItem[] }) {
  const topics = [
    { name: "AI", slug: "ai-ml" },
    { name: "SYSTEM DESIGN", slug: "systems" },
    { name: "WEB", slug: "web-dev" },
    { name: "INTERNET", slug: "internet" },
    { name: "ENGINEERING", slug: "engineering" },
  ];

  const [hoveredTopic, setHoveredTopic] = useState<string>("SYSTEM DESIGN");

  const preview = TOPIC_PREVIEWS[hoveredTopic] || TOPIC_PREVIEWS["SYSTEM DESIGN"];

  return (
    <section className="mag-section-peach relative py-24 px-4 sm:px-8 lg:px-16 border-b mag-border-dark overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b mag-border-dark mb-12">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-orange-950/60 uppercase tracking-widest">
            CATEGORICAL NAVIGATION
          </span>
          <h2 className="font-display-editorial text-4xl sm:text-6xl font-black text-orange-950 uppercase tracking-tight">
            04 / EXPLORE BY TOPIC
          </h2>
        </div>
        <div className="font-mono text-xs text-orange-950/70 font-medium">
          HOVER A TOPIC TO REVEAL ESSAYS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Huge Scattered Topics Column */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          {topics.map((topic) => {
            const isSelected = hoveredTopic === topic.name;
            return (
              <div
                key={topic.name}
                onMouseEnter={() => setHoveredTopic(topic.name)}
                onClick={() => setHoveredTopic(topic.name)}
                className="group cursor-pointer select-none transition-all duration-300"
              >
                <div className="flex items-baseline justify-between gap-4 py-2 border-b border-orange-950/15 group-hover:border-orange-950">
                  <h3
                    className={`font-display-editorial text-5xl sm:text-7xl lg:text-8xl font-black uppercase transition-all duration-300 ${
                      isSelected
                        ? "text-orange-950 translate-x-3 scale-[1.02]"
                        : "text-orange-950/30 group-hover:text-orange-950/70"
                    }`}
                  >
                    {topic.name}
                  </h3>
                  <span
                    className={`font-mono text-xs font-bold transition-opacity ${
                      isSelected ? "opacity-100 text-orange-950" : "opacity-0"
                    }`}
                  >
                    [SELECT]
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Topic Preview Card */}
        <div className="lg:col-span-5">
          <div className="p-8 sm:p-10 bg-orange-950 text-orange-100 rounded-3xl shadow-2xl space-y-6 border border-orange-900/50">
            <div className="flex items-center justify-between font-mono text-xs text-orange-300 border-b border-orange-900 pb-4">
              <span className="flex items-center gap-2 font-bold uppercase">
                <Sparkles className="w-4 h-4 text-orange-400" />
                TOPIC: {hoveredTopic}
              </span>
              <span className="text-orange-400">ESSAY PREVIEW</span>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[11px] text-orange-400 uppercase tracking-widest">
                RECOMMENDED DISPATCH
              </span>
              <h4 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-white leading-tight">
                {preview.title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-orange-200/80 leading-relaxed font-light">
                {preview.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-orange-900 flex items-center justify-between font-mono text-xs">
              <Link
                href={`/blog/${preview.slug}`}
                className="px-6 py-3 bg-orange-100 text-orange-950 font-bold uppercase tracking-wider rounded-xl hover:bg-white transition inline-flex items-center gap-2"
              >
                <span>READ ESSAY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="text-orange-300 hover:text-white underline underline-offset-4"
              >
                ALL {hoveredTopic} ESSAYS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
