"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Flame, Sparkles } from "lucide-react";

interface CurrentIssueProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    featuredImage?: string | null;
    readingTime: number;
    publishedAt?: string | Date | null;
    category?: { name: string } | null;
    author?: { displayName: string } | null;
  } | null;
}

export function CurrentIssue({ post }: CurrentIssueProps) {
  if (!post) return null;

  return (
    <section id="current-issue" className="mag-section-lavender relative min-h-[90vh] py-20 px-4 sm:px-8 lg:px-16 border-b mag-border-dark flex flex-col justify-between">
      {/* Eyebrow Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b mag-border-dark mb-12">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-purple-900/60">
            EDITORIAL FEATURE · COVER STORY
          </span>
          <h2 className="font-display-editorial text-4xl sm:text-6xl font-black text-purple-950 uppercase tracking-tight">
            01 / THE INTERNET
          </h2>
        </div>
        <div className="font-mono text-xs text-purple-900/70 font-semibold tracking-wider">
          COVER ARTICLE — ISSUE 01
        </div>
      </div>

      {/* Giant Viewport Cover Article */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch my-auto">
        {/* Left Column: Asymmetric Typography */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8 z-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-purple-900/70">
              <span className="px-3 py-1 bg-purple-950 text-purple-100 font-bold uppercase tracking-wider text-[10px]">
                FEATURED ISSUE
              </span>
              <span>—</span>
              <span className="font-bold text-purple-950 uppercase">
                {post.category?.name || "INTERNET ARCHITECTURE"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} MIN ESSAY
              </span>
            </div>

            <Link href={`/blog/${post.slug}`} className="group block">
              <h3 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.04] text-purple-950 tracking-tight group-hover:text-purple-700 transition-colors">
                {post.title}
              </h3>
            </Link>

            {post.excerpt && (
              <p className="font-sans text-base sm:text-xl text-purple-900/80 leading-relaxed font-normal max-w-2xl border-l-2 border-purple-950/30 pl-6 py-1">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="pt-6 border-t mag-border-dark flex flex-wrap items-center justify-between gap-6 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-purple-900/60 uppercase">WRITTEN BY</span>
              <span className="font-bold text-purple-950 uppercase">{post.author?.displayName || "SHRUTI SHARMA"}</span>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="px-8 py-4 bg-purple-950 hover:bg-purple-900 text-purple-100 font-bold uppercase tracking-wider transition inline-flex items-center gap-2 group"
            >
              <span>READ COVER STORY</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Giant Asymmetric Image Frame */}
        <div className="lg:col-span-5">
          <Link href={`/blog/${post.slug}`} className="block group h-full">
            <div className="relative w-full h-[380px] sm:h-[480px] lg:h-full rounded-2xl overflow-hidden border mag-border-dark bg-purple-950/20 shadow-2xl">
              <img
                src={
                  post.featuredImage ||
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
                }
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white font-mono text-xs">
                <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded border border-white/20">
                  FIG 01.1
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  READ TIME: {post.readingTime}M
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
