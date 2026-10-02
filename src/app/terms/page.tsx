import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-screen text-[#292524] space-y-8 bg-[#FAF8F5]">
      <div className="border-b border-[#121110] pb-6">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest mb-1">
          GOVERNANCE // TERMS OF PUBLICATION
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121110]">
          Terms of Service
        </h1>
        <p className="font-mono text-xs text-[#78716C] mt-2">LAST REVISED: SEPTEMBER 2026 // EDITION 14</p>
      </div>

      <div className="space-y-8 font-sans text-sm sm:text-base leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#121110]">1. Editorial Content & Copyright</h2>
          <p className="text-[#57534E]">
            All architectural blueprints, essays, and analysis published on Shruti Blogs are protected under intellectual property copyright unless explicitly noted under MIT or permissive open-source licenses.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#121110]">2. Technical Discussion Standards</h2>
          <p className="text-[#57534E]">
            Reader notes and review comments must adhere to constructive first-principles rigor. Spam, harassment, commercial promotions, or malicious code payloads are removed immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#121110]">3. Engineering Disclaimer</h2>
          <p className="text-[#57534E]">
            Architectural patterns and code benchmarks are provided for educational and architectural review. Readers should thoroughly test performance characteristics in isolated staging environments prior to production rollout.
          </p>
        </section>
      </div>
    </div>
  );
}
