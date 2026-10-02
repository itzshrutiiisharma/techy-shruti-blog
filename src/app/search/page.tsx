'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArticleCard } from '@/components/Public/ArticleCard';
import { Search, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any>({ posts: [], categories: [], tags: [], authors: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const executeSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setResults(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      executeSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 min-h-screen bg-[#FAF8F5] text-[#121110]">
      {/* Header Search Input */}
      <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest">
          CATALOG SEARCH // FULL-TEXT DATABASE
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121110]">
          Search the Editorial Archive
        </h1>
        <form onSubmit={handleFormSubmit} className="relative">
          <Search className="w-5 h-5 absolute left-4 top-4 text-[#78716C]" />
          <input
            type="text"
            placeholder="Search across all essays, systems architectures, tags, and authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-32 py-3.5 bg-[#FAF8F5] border border-[#121110] text-[#121110] text-sm font-mono placeholder-[#A8A29E] focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 px-5 py-2 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] font-mono text-xs font-bold transition"
          >
            INDEX SEARCH
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-16 font-mono text-xs text-[#78716C]">
          <span className="w-4 h-4 border-2 border-[#121110] border-t-transparent rounded-full animate-spin mr-2" />
          QUERYING PUBLICATION DATABASE...
        </div>
      ) : query && results.total === 0 ? (
        <div className="p-16 border border-[#E6E1D8] bg-[#F4EFE6] text-center text-[#78716C] max-w-md mx-auto">
          <p className="font-serif text-xl font-bold text-[#121110]">No results found for &ldquo;{query}&rdquo;</p>
          <p className="font-mono text-xs mt-2">Try broader terms such as &apos;PostgreSQL&apos;, &apos;AI&apos;, or &apos;Architecture&apos;.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Matched Articles */}
          {results.posts?.length > 0 && (
            <div>
              <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[#121110]">
                <h2 className="font-serif text-2xl font-bold text-[#121110] flex items-baseline gap-2">
                  <span className="font-mono text-xs text-[#E63B19]">01 //</span>
                  <span>Matched Essays ({results.posts.length})</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.posts.map((post: any) => (
                  <ArticleCard key={post.id} post={post} variant="standard" />
                ))}
              </div>
            </div>
          )}

          {/* Matched Categories & Tags */}
          {(results.categories?.length > 0 || results.tags?.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#E6E1D8]">
              {results.categories?.length > 0 && (
                <div className="p-6 bg-[#F4EFE6] border border-[#E6E1D8] space-y-4">
                  <h3 className="font-mono text-[10px] font-bold text-[#78716C] uppercase tracking-widest border-b border-[#E6E1D8] pb-2">
                    MATCHING CATEGORIES ({results.categories.length})
                  </h3>
                  <div className="space-y-2">
                    {results.categories.map((c: any) => (
                      <Link
                        key={c.id}
                        href={`/category/${c.slug}`}
                        className="p-3 bg-[#FAF8F5] border border-[#E6E1D8] hover:border-[#121110] text-xs font-mono text-[#121110] flex items-center justify-between transition"
                      >
                        <span className="font-bold">{c.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#78716C]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.tags?.length > 0 && (
                <div className="p-6 bg-[#F4EFE6] border border-[#E6E1D8] space-y-4">
                  <h3 className="font-mono text-[10px] font-bold text-[#78716C] uppercase tracking-widest border-b border-[#E6E1D8] pb-2">
                    MATCHING TAGS ({results.tags.length})
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {results.tags.map((t: any) => (
                      <Link
                        key={t.id}
                        href={`/tag/${t.slug}`}
                        className="px-3 py-1 bg-[#FAF8F5] border border-[#E6E1D8] hover:border-[#121110] text-xs font-mono text-[#57534E] hover:text-[#121110] transition"
                      >
                        #{t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-xs text-[#78716C]">
          LOADING ARCHIVE SEARCH...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
