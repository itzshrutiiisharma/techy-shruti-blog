"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Terminal, Layers, ArrowUpRight, Zap, Database, Activity, GitBranch } from "lucide-react";

const LAB_SYSTEMS = [
  {
    name: "UBER",
    title: "Geospatial Indexing & Real-time Driver Matching at Scale",
    metrics: "15M trips/day • H3 Spatial Index • Ringpop Gossip Cluster",
    diagram: [
      "Mobile App → Envoy Mesh → Driver Location Ingestion (Kafka)",
      "H3 Hexagonal Spatial Indexer (RAM Memory Grid)",
      "Dynamic Surge Pricing Engine (Go / Microservices)",
      "Cassandra Storage for Trip Telemetry History",
    ],
    slug: "mastering-nextjs-15",
  },
  {
    name: "INSTAGRAM",
    title: "Handling 100 Million Photo Uploads Without Dropping Frames",
    metrics: "2B active users • Haystack Storage • Memcached Sharding",
    diagram: [
      "Client Photo Upload → CDN Ingress (Edge TLS Termination)",
      "Image Processing Pipeline (Resizing, WebP, Blurhash)",
      "Haystack Append-Only Blob Store (Zero Metadata Overhead)",
      "PostgreSQL Database Partitioning by User ID",
    ],
    slug: "top-7-ai-tools",
  },
  {
    name: "YOUTUBE",
    title: "Sub-Second Video Streaming Across 5 Billion Devices",
    metrics: "500 hrs uploaded/min • Vitess DB • HLS/DASH Chunks",
    diagram: [
      "Raw Video File → Transcoding Farm (AV1, VP9, H.264 resolutions)",
      "Vitess MySQL Sharding (Horizontal Auto-scaling)",
      "HLS & MPEG-DASH Adaptive Bitrate Chunks",
      "Google Global Fiber CDN Edge Caching Nodes",
    ],
    slug: "cursor-ai-vs-vscode",
  },
  {
    name: "NETFLIX",
    title: "Microservice Resilience & Chaos Engineering Architecture",
    metrics: "250M subscribers • Chaos Gorilla • Titus Container Platform",
    diagram: [
      "Zuul Edge API Gateway → Hystrix Circuit Breakers",
      "Titus Container Platform (EC2 Virtualization)",
      "EVCache (Distributed In-Memory Memcached Layer)",
      "CockroachDB / Cassandra Global Multi-Region Replication",
    ],
    slug: "fullstack-roadmap-2026",
  },
];

export function SystemDesignLab() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeSystem = LAB_SYSTEMS[selectedIdx];

  return (
    <section className="mag-section-black relative py-28 px-4 sm:px-8 lg:px-16 border-b mag-border-light space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-800 text-stone-300 font-mono text-[11px] font-bold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-stone-100" />
          <span>07 / SYSTEM DESIGN LAB</span>
        </div>
        <h2 className="font-display-editorial text-5xl sm:text-7xl font-black text-white uppercase tracking-tight leading-[0.98]">
          BEHIND THE APPS <br />
          <span className="text-stone-400 italic font-serif-editorial font-normal">YOU USE EVERY DAY.</span>
        </h2>
      </div>

      {/* System Selector Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b mag-border-light pb-6">
        {LAB_SYSTEMS.map((sys, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={sys.name}
              onClick={() => setSelectedIdx(idx)}
              className={`px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest rounded-xl transition cursor-pointer ${
                isSelected
                  ? "bg-white text-black shadow-lg"
                  : "bg-stone-900 text-stone-400 border border-stone-800 hover:text-white hover:border-stone-700"
              }`}
            >
              {sys.name}
            </button>
          );
        })}
      </div>

      {/* Selected System Blueprint Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left: Architecture Details */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between p-8 sm:p-10 bg-stone-900/80 border border-stone-800 rounded-3xl">
          <div className="space-y-4">
            <div className="font-mono text-xs text-stone-400 font-bold uppercase tracking-wider">
              {activeSystem.metrics}
            </div>

            <h3 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-white leading-tight">
              {activeSystem.title}
            </h3>
          </div>

          <div className="pt-6 border-t border-stone-800 flex items-center justify-between font-mono text-xs">
            <span className="text-stone-500">LAB BLUEPRINT N° 0{selectedIdx + 1}</span>
            <Link
              href={`/blog/${activeSystem.slug}`}
              className="px-6 py-3 bg-white hover:bg-stone-200 text-black font-bold uppercase tracking-wider rounded-xl transition inline-flex items-center gap-2"
            >
              <span>DEEP DIVE ESSAY</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: Technical Diagram Code Frame */}
        <div className="lg:col-span-6 p-8 sm:p-10 bg-[#050507] border border-stone-800 rounded-3xl font-mono text-xs text-stone-300 space-y-6 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-stone-500 text-[11px]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-stone-300" />
              <span>{activeSystem.name}_ARCHITECTURE_DIAGRAM.d2</span>
            </div>
            <span className="text-emerald-400">● VALIDATED</span>
          </div>

          {/* Architecture Pipeline Topology Visualizer */}
          <div className="relative rounded-2xl bg-stone-950/80 border border-stone-800/80 p-4 overflow-hidden flex flex-col gap-3">
            <div className="w-full flex items-center justify-between text-[10px] text-stone-500 font-mono pb-2 border-b border-stone-800/60">
              <span className="flex items-center gap-1.5 text-stone-300">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                ACTIVE TOPOLOGY PIPELINE
              </span>
              <span className="text-emerald-400 font-bold">HEALTH: 100% ONLINE</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <span className="text-[10px] text-stone-500 block font-mono">INGRESS</span>
                <span className="text-xs font-bold text-sky-400 font-mono">TLS 1.3 / EDGE</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <span className="text-[10px] text-stone-500 block font-mono">CONSENSUS</span>
                <span className="text-xs font-bold text-purple-400 font-mono">RAFT / SHARD</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <span className="text-[10px] text-stone-500 block font-mono">STORAGE</span>
                <span className="text-xs font-bold text-amber-400 font-mono">APPEND-ONLY</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 leading-relaxed">
            {activeSystem.diagram.map((node, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-stone-900/60 rounded-xl border border-stone-800/80">
                <span className="text-stone-500 font-bold">0{i + 1}</span>
                <span className="text-stone-200">{node}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800 text-[10px] text-stone-500 flex items-center justify-between">
            <span>TECHY.SHRUTI SYSTEM DESIGN LAB</span>
            <span>RAFT / KAFKA / POSTGRES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
