'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { ArticleCard } from '@/components/Public/ArticleCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookmarksPage() {
  const { user, loading: authLoading } = useAuth();
  const { openModal } = useAuthModal();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      openModal('login');
      setLoading(false);
      return;
    }

    if (user) {
      fetch('/api/bookmarks')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setBookmarks(data.data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user, authLoading]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 min-h-screen bg-[#FAF8F5] text-[#121110]">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#78716C] hover:text-[#121110] mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO CATALOGUE</span>
      </Link>

      {/* Header */}
      <div className="border-b border-[#121110] pb-8 mb-12 space-y-4">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest flex items-center gap-2">
          <span>01 // YOUR PERSONAL REPOSITORY</span>
          <span className="w-12 h-[1px] bg-[#E63B19]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121110]">
              Your Archive
            </h1>
            <p className="font-sans text-sm text-[#57534E] mt-2">
              Curated reading list and saved technical essays across your sessions.
            </p>
          </div>
          <div className="font-mono text-xs text-[#78716C]">
            {bookmarks.length} SAVED ARTICLES
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-16 border border-[#E6E1D8] bg-[#F4EFE6] text-center font-mono text-xs text-[#78716C]">
          LOADING SAVED ARCHIVE ENTRIES...
        </div>
      ) : !user ? (
        <div className="p-12 border border-[#121110] bg-[#F4EFE6] text-center max-w-md mx-auto space-y-4">
          <p className="font-serif text-xl font-bold text-[#121110]">Authentication Required</p>
          <p className="font-mono text-xs text-[#57534E]">
            Please sign in to view and synchronize your saved reading repository.
          </p>
          <button
            onClick={() => openModal('login')}
            className="px-5 py-2.5 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] font-mono text-xs font-bold transition"
          >
            SIGN IN NOW
          </button>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="p-16 border border-[#E6E1D8] bg-[#F4EFE6] text-center max-w-lg mx-auto space-y-4">
          <p className="font-serif text-2xl font-bold text-[#121110]">No Saved Essays</p>
          <p className="font-sans text-xs text-[#57534E]">
            Click the bookmark icon on any essay to save it here for future reference.
          </p>
          <Link
            href="/blog"
            className="inline-block px-5 py-2.5 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] font-mono text-xs font-bold transition"
          >
            EXPLORE THE ARCHIVE →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarks.map((b) => (
            <ArticleCard key={b.id} post={b.post} variant="standard" />
          ))}
        </div>
      )}
    </div>
  );
}
