"use client";

import React, { useState } from "react";
import { Smartphone, Server, Database, Cloud, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

const PIPELINE_STEPS = [
  {
    step: "01",
    node: "PHONE",
    label: "Client Request",
    icon: Smartphone,
    desc: "Your phone encrypts a TLS 1.3 payload and dispatches a HTTP/3 GET packet over cellular towers.",
    latency: "2ms",
  },
  {
    step: "02",
    node: "API GATEWAY",
    label: "Edge Routing",
    icon: Zap,
    desc: "Anycast DNS routes your request to the nearest PoP server. JWT tokens & rate limits are validated at the edge.",
    latency: "12ms",
  },
  {
    step: "03",
    node: "SERVER",
    label: "Application Logic",
    icon: Server,
    desc: "Node.js / Next.js Server Action executes core business logic and evaluates Raft consensus state.",
    latency: "25ms",
  },
  {
    step: "04",
    node: "DATABASE",
    label: "Distributed Storage",
    icon: Database,
    desc: "PostgreSQL queries run with read-replica connection pooling and multi-region index lookups.",
    latency: "8ms",
  },
  {
    step: "05",
    node: "CDN SHIELD",
    label: "Cache Revalidation",
    icon: Cloud,
    desc: "Static assets & stale-while-revalidate caches are refreshed across global edge nodes.",
    latency: "4ms",
  },
];

export function HowThingsWork() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = PIPELINE_STEPS[activeStep];

  return (
    <section className="mag-section-blue relative py-24 px-4 sm:px-8 lg:px-16 border-b mag-border-dark space-y-16">
      {/* Signature Headline */}
      <div className="max-w-4xl space-y-4">
        <span className="font-mono text-xs font-bold text-sky-900/60 uppercase tracking-widest">
          SYSTEM ARCHITECTURE EXPLAINED
        </span>
        <h2 className="font-display-editorial text-4xl sm:text-6xl lg:text-7xl font-black text-sky-950 uppercase tracking-tight leading-[0.98]">
          YOU USE IT EVERY DAY. <br />
          YOU PROBABLY DON&apos;T KNOW <br />
          <span className="text-sky-700 italic font-serif-editorial font-normal">WHAT HAPPENS UNDERNEATH.</span>
        </h2>
      </div>

      {/* Interactive Visual Diagram: PHONE → API → SERVER → DATABASE → CDN → YOU */}
      <div className="space-y-8">
        <div className="p-4 sm:p-6 bg-sky-950 text-sky-100 rounded-3xl shadow-2xl border border-sky-900 overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between gap-3">
            {PIPELINE_STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeStep === idx;
              return (
                <React.Fragment key={item.step}>
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`flex-1 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-sky-50 text-sky-950 border-white shadow-lg scale-105"
                        : "bg-sky-900/50 text-sky-300 border-sky-800 hover:bg-sky-900 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold opacity-60">STEP {item.step}</span>
                      <Icon className={`w-4 h-4 ${isActive ? "text-sky-700" : "text-sky-400"}`} />
                    </div>
                    <div className="font-mono font-bold text-xs tracking-wider uppercase">{item.node}</div>
                    <div className="text-[10px] opacity-75 truncate">{item.label}</div>
                  </button>
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Explanation Card */}
        <div className="p-8 bg-white border mag-border-dark rounded-2xl shadow-sm space-y-4 max-w-3xl">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="px-3 py-1 bg-sky-100 text-sky-900 font-bold uppercase rounded-md">
              STEP {current.step} — {current.node}
            </span>
            <span className="text-sky-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              ROUND TRIP LATENCY: {current.latency}
            </span>
          </div>
          <h3 className="font-display-editorial text-2xl font-bold text-sky-950">
            {current.label} Breakdown
          </h3>
          <p className="font-sans text-sm sm:text-base text-sky-900/80 leading-relaxed font-normal">
            {current.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
