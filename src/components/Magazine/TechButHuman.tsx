"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Search, Film, Image as ImageIcon, ArrowUpRight } from "lucide-react";

const HUMAN_EXPLAINERS = [
  {
    icon: MessageSquare,
    question: "What actually happens when you send a WhatsApp message?",
    tag: "END-TO-END ENCRYPTION",
    visualBg: "bg-emerald-900 text-emerald-100",
    slug: "top-7-ai-tools",
    summary: "Noise protocol key exchange, double ratchet encryption algorithm, and asynchronous push notification queuing.",
  },
  {
    icon: Search,
    question: "Why does Google respond in under 0.2 seconds?",
    tag: "DISTRIBUTED INDEX",
    visualBg: "bg-emerald-950 text-emerald-100",
    slug: "cursor-ai-vs-vscode",
    summary: "Pre-computed inverted index shards in RAM across tens of thousands of data center clusters worldwide.",
  },
  {
    icon: Film,
    question: "How does Netflix recommend your next favorite show?",
    tag: "VECTOR EMBEDDINGS",
    visualBg: "bg-emerald-900/90 text-emerald-100",
    slug: "top-7-ai-tools",
    summary: "Real-time collaborative filtering & contextual bandit models processing billions of viewing telemetry points.",
  },
  {
    icon: ImageIcon,
    question: "Where does an Instagram photo actually live?",
    tag: "OBJECT STORAGE",
    visualBg: "bg-emerald-950/90 text-emerald-100",
    slug: "mastering-nextjs-15",
    summary: "Replicated Amazon S3 / Haystack blob storage, compressed into WebP variants and cached on regional CDN nodes.",
  },
];

export function TechButHuman() {
  return (
    <section className="mag-section-sage relative py-24 px-4 sm:px-8 lg:px-16 border-b mag-border-dark space-y-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b mag-border-dark">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-emerald-950/60 uppercase tracking-widest">
            06 / ACCESSIBLE EXPLAINERS
          </span>
          <h2 className="font-display-editorial text-4xl sm:text-6xl font-black text-emerald-950 uppercase tracking-tight">
            TECH, BUT HUMAN
          </h2>
        </div>
        <div className="font-mono text-xs text-emerald-950/70 font-medium">
          EXPLAINING THE EVERYDAY DIGITAL WORLD
        </div>
      </div>

      {/* Grid of 4 Custom Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HUMAN_EXPLAINERS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl border mag-border-dark bg-white shadow-sm flex flex-col justify-between group space-y-6 hover:border-emerald-700 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold uppercase rounded-md">
                    {item.tag}
                  </span>
                  <div className={`p-2.5 rounded-xl ${item.visualBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <Link href={`/blog/${item.slug}`} className="block">
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-emerald-950 group-hover:text-emerald-700 transition-colors leading-tight">
                    {item.question}
                  </h3>
                </Link>

                <p className="font-sans text-xs sm:text-sm text-emerald-900/75 leading-relaxed font-light">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t mag-border-dark flex items-center justify-between font-mono text-xs">
                <span className="text-emerald-900/50">EXPLAINER N° 0{idx + 1}</span>
                <Link
                  href={`/blog/${item.slug}`}
                  className="font-bold text-emerald-950 inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>READ EXPLAINER</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
