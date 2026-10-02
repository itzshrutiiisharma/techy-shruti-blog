'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  postCount: number;
  description?: string | null;
}

export function TopicIndex({ categories }: { categories: CategoryItem[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (!categories || categories.length === 0) return null;

  return (
    <section className="my-24 sm:my-36 border-t border-[var(--border-color)]/60 pt-12">
      <div className="flex items-center justify-between pb-8">
        <div className="font-mono text-xs text-[#d9381e] font-bold uppercase tracking-widest flex items-center gap-3">
          <span>03 // TOPIC INDEX & RESEARCH TRACKS</span>
          <span className="w-16 h-[1px] bg-[#d9381e]" />
        </div>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          {categories.length} TAXONOMIES
        </span>
      </div>

      <div className="divide-y divide-[var(--border-color)]/50">
        {categories.map((cat, idx) => {
          const isHovered = activeIdx === idx;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 transition-all duration-300 hover:px-4 rounded-xl hover:bg-[var(--bg-card)]/50"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-sm font-bold text-[#d9381e]">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[#d9381e] transition-colors">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans line-clamp-1 max-w-xl">
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-2 sm:mt-0 flex items-center gap-4 font-mono text-xs text-[var(--text-muted)]">
                <span>{cat.postCount} PUBLISHED ESSAYS</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#d9381e] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
