"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Brain, Layers, Database, Zap, ArrowUpRight } from "lucide-react";

const AI_CARDS = [
  {
    topic: "LLMs",
    title: "Tokenizer Efficiency & Attention Latency Bounds",
    desc: "Transformer KV-cache memory footprints, FlashAttention-2 kernels, and sub-second context window scaling.",
    icon: Brain,
    slug: "cursor-ai-vs-vscode",
  },
  {
    topic: "RAG",
    title: "Hybrid Dense-Sparse Vector Retrieval Pipelines",
    desc: "Combining HNSW vector similarity search with BM25 keyword reranking for zero-hallucination context extraction.",
    icon: Database,
    slug: "top-7-ai-tools",
  },
  {
    topic: "AGENTS",
    title: "Deterministic Multi-Agent Consensus Runtime",
    desc: "Executing complex software tasks via specialized agent swarms with state rollback & schema-enforced tool calls.",
    icon: Layers,
    slug: "cursor-ai-vs-vscode",
  },
  {
    topic: "EMBEDDINGS",
    title: "High-Dimensional Vector Space Quantization",
    desc: "Scalar & product quantization techniques reducing vector storage requirements by 8x with 99% recall.",
    icon: Cpu,
    slug: "top-7-ai-tools",
  },
  {
    topic: "INFERENCE",
    title: "Edge Model Quantization & Speculative Decoding",
    desc: "Deploying 8B parameter models to mobile hardware with vLLM, TensorRT-LLM, and speculative draft tokens.",
    icon: Zap,
    slug: "m4-pro-review",
  },
];

export function AISystems2026() {
  return (
    <section className="mag-section-lavender2 relative py-24 px-4 sm:px-8 lg:px-16 border-b mag-border-dark space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <span className="font-mono text-xs font-bold text-purple-950/60 uppercase tracking-widest">
          08 / ARTIFICIAL INTELLIGENCE IN 2026
        </span>
        <h2 className="font-display-editorial text-5xl sm:text-7xl font-black text-purple-950 uppercase tracking-tight leading-[0.98]">
          AI ISN&apos;T MAGIC. <br />
          <span className="text-purple-700 italic font-serif-editorial font-normal">IT&apos;S SYSTEMS.</span>
        </h2>
      </div>

      {/* Grid of 5 AI Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {AI_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.topic}
              className="p-8 bg-white rounded-3xl border mag-border-dark shadow-sm flex flex-col justify-between group space-y-6 hover:border-purple-600 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-3 py-1 bg-purple-950 text-purple-100 font-bold uppercase rounded-md">
                    {card.topic}
                  </span>
                  <div className="p-2 rounded-xl bg-purple-100 text-purple-950">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <Link href={`/blog/${card.slug}`} className="block">
                  <h3 className="font-serif-editorial text-2xl font-normal text-purple-950 group-hover:text-purple-700 transition-colors leading-tight">
                    {card.title}
                  </h3>
                </Link>

                <p className="font-sans text-xs sm:text-sm text-purple-900/75 leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t mag-border-dark flex items-center justify-between font-mono text-xs">
                <span className="text-purple-900/50">PILLAR N° 0{idx + 1}</span>
                <Link
                  href={`/blog/${card.slug}`}
                  className="font-bold text-purple-950 inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>READ DEEP DIVE</span>
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
