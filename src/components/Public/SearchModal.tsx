'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ArrowUpRight, Sparkles } from 'lucide-react';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    posts: any[];
    categories: any[];
    tags: any[];
    authors: any[];
    total: number;
  }>({ posts: [], categories: [], tags: [], authors: [], total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults({ posts: [], categories: [], tags: [], authors: [], total: 0 });
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ posts: [], categories: [], tags: [], authors: [], total: 0 });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const json = await res.json();
        if (json.success && json.data) {
          setResults(json.data);
        }
      } catch (err) {
        console.error('[Search Error]:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-4 bg-[#121110]/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#121110] shadow-editorial overflow-hidden text-[#121110]">
        {/* Top Header Bar */}
        <div className="px-6 py-3 border-b border-[#E6E1D8] bg-[#F4EFE6] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#E63B19] font-bold">01 //</span>
            <span className="font-semibold uppercase tracking-wider text-[#121110]">SEARCH THE ARCHIVE</span>
          </div>
          <div className="flex items-center gap-3 text-[#78716C]">
            <span className="hidden sm:inline">[ ESC ] TO CLOSE</span>
            <button onClick={onClose} className="p-1 hover:text-[#121110]">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center px-6 py-4 border-b border-[#E6E1D8] bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#78716C] mr-4 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search essays, systems architecture, AI models, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[#121110] placeholder-[#A8A29E] font-serif text-lg sm:text-xl focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="font-mono text-xs text-[#78716C] hover:text-[#121110] px-2 py-1 border border-[#E6E1D8]"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-12 gap-3 text-[#78716C] font-mono text-xs">
              <span className="w-3.5 h-3.5 border-2 border-[#121110] border-t-transparent rounded-full animate-spin" />
              <span>INDEXING ARCHIVE DATABASE...</span>
            </div>
          )}

          {!loading && query && results.total === 0 && (
            <div className="text-center py-12">
              <p className="font-serif text-xl font-bold text-[#121110]">No archive entries found for &ldquo;{query}&rdquo;</p>
              <p className="font-mono text-xs text-[#78716C] mt-2">
                Try querying broader keywords: &apos;Consensus&apos;, &apos;LLM&apos;, &apos;Architecture&apos;, or &apos;PostgreSQL&apos;.
              </p>
            </div>
          )}

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="space-y-4">
              <div className="font-mono text-[10px] uppercase font-bold text-[#78716C] tracking-widest border-b border-[#E6E1D8] pb-1">
                CURATED ARCHIVE TRACKS
              </div>
              <div className="flex flex-wrap gap-2">
                {['Distributed Consensus', 'Inference Pipelines', 'PostgreSQL Internals', 'AI Agents', 'Zero-Trust Architecture', 'Event-Driven Systems'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 border border-[#E6E1D8] hover:border-[#121110] bg-[#F4EFE6]/50 hover:bg-[#F4EFE6] text-xs font-mono text-[#121110] transition flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#E63B19]" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {!loading && results.posts.length > 0 && (
            <div className="space-y-3">
              <div className="font-mono text-[10px] uppercase font-bold text-[#78716C] tracking-widest border-b border-[#E6E1D8] pb-1 flex items-center justify-between">
                <span>ESSAYS & ARTICLES ({results.posts.length})</span>
                <span className="text-[#E63B19]">MATCHED</span>
              </div>
              <div className="divide-y divide-[#E6E1D8]">
                {results.posts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    onClick={onClose}
                    className="group block py-3.5 hover:bg-[#F4EFE6] -mx-3 px-3 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="font-mono text-[10px] text-[#78716C] flex items-center gap-2">
                          <span className="text-[#E63B19] font-bold">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span>/</span>
                          <span className="uppercase text-[#121110] font-semibold">
                            {post.category?.name || 'ESSAY'}
                          </span>
                          <span>•</span>
                          <span>{post.readingTime} MIN READ</span>
                        </div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#121110] group-hover:text-[#E63B19] transition-colors leading-snug">
                          {post.title}
                        </h4>
                        {post.excerpt && (
                          <p className="text-xs text-[#57534E] line-clamp-1 font-sans">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#78716C] group-hover:text-[#E63B19] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Categories Section */}
          {!loading && results.categories.length > 0 && (
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-[#78716C] tracking-widest border-b border-[#E6E1D8] pb-1">
                TOPIC TRACKS ({results.categories.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {results.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="p-3 border border-[#E6E1D8] hover:border-[#121110] bg-[#FAF8F5] hover:bg-[#F4EFE6] transition flex items-center justify-between"
                  >
                    <div>
                      <div className="font-serif font-bold text-sm text-[#121110]">{cat.name}</div>
                      <div className="font-mono text-[10px] text-[#78716C]">{cat.postCount} Published Articles</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#78716C]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags Section */}
          {!loading && results.tags.length > 0 && (
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-[#78716C] tracking-widest border-b border-[#E6E1D8] pb-1">
                TAGS ({results.tags.length})
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {results.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    onClick={onClose}
                    className="px-2.5 py-1 border border-[#E6E1D8] hover:border-[#121110] text-xs font-mono text-[#57534E] hover:text-[#121110] transition"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-6 py-2.5 bg-[#F4EFE6] border-t border-[#E6E1D8] flex items-center justify-between text-[10px] font-mono text-[#78716C]">
          <span>INDEXED CATALOG // 2026 EDITION</span>
          <span>SELECT WITH CLICK OR ENTER</span>
        </div>
      </div>
    </div>
  );
}
