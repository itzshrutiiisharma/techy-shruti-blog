"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

export function StayCurious() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="mag-section-peach2 relative py-32 px-4 sm:px-8 lg:px-16 border-b mag-border-dark flex flex-col justify-between items-center text-center space-y-16 overflow-hidden">
      {/* Huge Statement */}
      <div className="space-y-4 max-w-4xl">
        <span className="font-mono text-xs font-bold text-orange-950/60 uppercase tracking-widest">
          11 / WEEKLY DISPATCHES
        </span>
        <h2 className="font-display-editorial text-7xl sm:text-9xl lg:text-[11rem] font-black text-orange-950 uppercase tracking-tight leading-[0.88]">
          STAY <br />
          <span className="italic font-serif-editorial font-normal text-orange-800">CURIOUS.</span>
        </h2>
      </div>

      {/* Minimal Email Form */}
      <div className="w-full max-w-xl">
        {submitted ? (
          <div className="p-6 bg-white border mag-border-dark rounded-2xl flex items-center justify-center gap-3 text-orange-950 font-mono text-xs font-bold shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-orange-700" />
            <span>YOU ARE SUBSCRIBED TO THE WEEKLY DISPATCH. WELCOME.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <input
                type="email"
                required
                placeholder="enter your email for weekly system breakdowns..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-white border mag-border-dark rounded-2xl font-mono text-xs text-orange-950 placeholder-orange-950/40 focus:outline-none focus:border-orange-950 transition shadow-sm"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-orange-950 hover:bg-orange-900 text-orange-100 font-mono text-xs font-bold uppercase tracking-wider rounded-2xl transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <p className="font-mono text-[10px] text-orange-950/50 uppercase tracking-widest">
              ZERO SPAM · UNSUBSCRIBE AT ANY TIME · READ BY 100K+ ENGINEERS
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
