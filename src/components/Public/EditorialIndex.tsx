'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  readingTime: number;
  featuredImage?: string | null;
  category?: { name: string; slug: string } | null;
  author?: { displayName: string } | null;
  publishedAt?: string | Date | null;
}

export function EditorialIndex({ posts }: { posts: ArticleItem[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  if (!posts || posts.length === 0) return null;

  const activePost = hoveredIdx !== null ? posts[hoveredIdx] : posts[0];

  return (
    <section className="relative my-24 sm:my-36">
      {/* Header Label */}
      <div className="flex items-center justify-between pb-6 border-b border-[var(--border-color)]/60">
        <div className="font-mono text-xs text-[#d9381e] font-bold uppercase tracking-widest flex items-center gap-3">
          <span>02 // EDITORIAL INDEX & TRENDING DISPATCHES</span>
          <span className="w-16 h-[1px] bg-[#d9381e]" />
        </div>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          CURATED ESSAYS & PAPERS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 items-start">
        {/* Left List of Index Items */}
        <div className="lg:col-span-7 space-y-0 divide-y divide-[var(--border-color)]/40">
          {posts.map((post, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`group block py-7 transition-all duration-300 relative ${
                  isHovered ? 'pl-4' : 'pl-0 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Active Indicator Bar */}
                {isHovered && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#d9381e] rounded-r transition-all" />
                )}

                <div className="flex items-baseline justify-between gap-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
                      <span className="font-serif text-lg font-black text-[#d9381e]">
                        0{idx + 1}
                      </span>
                      <span>/</span>
                      <span className="uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                        {post.category?.name || 'ESSAY'}
                      </span>
                      <span>•</span>
                      <span>{post.readingTime} MIN READ</span>
                    </div>

                    <h3
                      className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] transition-all duration-300 ${
                        isHovered ? 'translate-x-2 text-[#d9381e]' : ''
                      }`}
                    >
                      {post.title}
                    </h3>
                  </div>

                  <ArrowUpRight
                    className={`w-5 h-5 text-[var(--text-muted)] transition-all duration-300 flex-shrink-0 ${
                      isHovered ? 'text-[#d9381e] translate-x-1 -translate-y-1' : ''
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Dynamic Image Preview Frame */}
        <div className="hidden lg:block lg:col-span-5 sticky top-32">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[#0e0e0e] shadow-2xl transition-all duration-500">
            {activePost?.featuredImage ? (
              <img
                key={activePost.id}
                src={activePost.featuredImage}
                alt={activePost.title}
                className="w-full h-full object-cover animate-fadeIn filter brightness-95"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[var(--text-muted)]">
                NO COVER IMAGE
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-80" />
            
            {/* Overlay metadata */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white font-mono text-xs">
              <div className="text-[#d9381e] font-bold text-[10px] uppercase tracking-widest">
                FEATURED ARCHIVE ENTRY
              </div>
              <div className="font-serif text-lg font-bold line-clamp-2">
                {activePost?.title}
              </div>
              <div className="text-[11px] text-slate-300 pt-1 border-t border-white/20 flex justify-between">
                <span>BY {activePost?.author?.displayName || 'SHRUTI SHARMA'}</span>
                <span>{activePost?.readingTime} MIN READ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
