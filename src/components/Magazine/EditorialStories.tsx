"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

interface StoryPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  readingTime: number;
  publishedAt?: string | Date | null;
  category?: { name: string } | null;
  author?: { displayName: string } | null;
}

export function EditorialStories({ posts }: { posts: StoryPost[] }) {
  if (!posts || posts.length === 0) return null;

  const bigFeature = posts[0];
  const sideArticles = posts.slice(1, 5);

  return (
    <section className="mag-section-white relative py-20 px-4 sm:px-8 lg:px-16 border-b mag-border-dark space-y-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b mag-border-dark">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
            FEATURED ESSAYS &amp; WRITINGS
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-stone-900">
            Stories &amp; Dispatches
          </h2>
        </div>
        <Link
          href="/blog"
          className="font-mono text-xs font-bold text-stone-900 hover:text-stone-600 uppercase tracking-wider underline underline-offset-4"
        >
          View Complete Index ({posts.length})
        </Link>
      </div>

      {/* Irregular Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* BIG FEATURED CARD */}
        {bigFeature && (
          <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 border mag-border-dark rounded-2xl bg-stone-50/50 hover:bg-stone-50 transition-colors group">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-stone-500">
                <span className="px-3 py-1 bg-stone-900 text-stone-100 font-bold uppercase text-[10px]">
                  01 · BIG FEATURE
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-stone-700" />
                  {bigFeature.readingTime} MIN READ
                </span>
              </div>

              {bigFeature.featuredImage && (
                <Link href={`/blog/${bigFeature.slug}`} className="block overflow-hidden rounded-xl h-64 sm:h-80 bg-stone-200">
                  <img
                    src={bigFeature.featuredImage}
                    alt={bigFeature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                </Link>
              )}

              <div className="space-y-3">
                <span className="font-mono text-xs font-bold uppercase text-stone-500">
                  {bigFeature.category?.name || "SYSTEMS"}
                </span>
                <Link href={`/blog/${bigFeature.slug}`} className="block">
                  <h3 className="font-serif-editorial text-3xl sm:text-5xl font-normal text-stone-900 group-hover:text-stone-600 transition-colors leading-tight">
                    {bigFeature.title}
                  </h3>
                </Link>
                {bigFeature.excerpt && (
                  <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-3 font-light">
                    {bigFeature.excerpt}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t mag-border-dark flex items-center justify-between font-mono text-xs">
              <span className="text-stone-500">BY {bigFeature.author?.displayName || "SHRUTI SHARMA"}</span>
              <Link href={`/blog/${bigFeature.slug}`} className="font-bold text-stone-950 flex items-center gap-1 hover:underline">
                <span>READ ESSAY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* SIDE ARTICLES (Irregular heights & cards) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {sideArticles.map((post, idx) => (
            <div
              key={post.id}
              className="p-6 border mag-border-dark rounded-2xl bg-white hover:border-stone-400 transition-all flex flex-col justify-between group space-y-3"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-stone-500">
                <span className="font-bold text-stone-900 uppercase">
                  0{idx + 2} · {post.category?.name || "ARTICLE"}
                </span>
                <span>{post.readingTime} MIN</span>
              </div>

              <Link href={`/blog/${post.slug}`} className="block">
                <h4 className="font-display-editorial text-xl font-bold text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                  {post.title}
                </h4>
              </Link>

              {post.excerpt && (
                <p className="font-sans text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div className="pt-3 border-t mag-border-dark flex items-center justify-between font-mono text-[11px]">
                <span className="text-stone-400">BY {post.author?.displayName || "EDITORIAL"}</span>
                <Link href={`/blog/${post.slug}`} className="font-bold text-stone-950 inline-flex items-center gap-1 hover:underline">
                  <span>READ</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
