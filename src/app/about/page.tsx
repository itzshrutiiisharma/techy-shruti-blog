import React from 'react';
import Link from 'next/link';
import { Sparkles, Terminal, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Shruti Blogs — Editorial Mission',
  description: 'Learn about the editorial mission, architecture philosophy, and authors behind Shruti Blogs.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-screen space-y-12 bg-[#F8FAFC]">
      {/* Title */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Our Editorial Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Deep Engineering & Systems Architecture Without the Hype
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Shruti Blogs is an independent commercial publication dedicated to staff-level software engineering, distributed consensus, LLM inference infrastructure, and modern cloud architectures.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-200">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">First-Principles Rigor</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We avoid surface-level tutorials. Every essay analyzes latency trade-offs, cache invalidation, and failure modes under production loads.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-200">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Production Tested</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All code snippets and architectural patterns are extracted from real high-scale distributed systems and open-source benchmarks.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 border border-pink-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Zero Clickbait</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No sponsored fluff or fabricated benchmarks. We write for engineers, tech leads, and software architects who build real products.
          </p>
        </div>
      </div>

      {/* Author Spotlight */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
          alt="Shruti Sharma"
          className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-100"
        />
        <div className="space-y-2 flex-1 text-center sm:text-left">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Founder & Editor-in-Chief</div>
          <h3 className="text-xl font-bold text-slate-900">Shruti Sharma</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Staff Software Architect & AI Systems Researcher. Passionate about distributed systems resilience, sub-100ms LLM streaming backends, and modern TypeScript architectures.
          </p>
          <div className="pt-2">
            <Link
              href="/author/shruti-sharma"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <span>Read Shruti&apos;s Essays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
