'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';

interface ArticleCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    featuredImage?: string | null;
    readingTime: number;
    viewCount: number;
    likeCount: number;
    commentCount?: number;
    publishedAt?: string | Date | null;
    category?: { name: string; slug: string } | null;
    author?: { displayName: string; slug: string; avatar?: string | null } | null;
    tags?: { id: string; name: string; slug: string }[];
  };
  variant?: 'featured' | 'standard' | 'compact' | 'horizontal' | 'index-row';
  indexNumber?: string | number;
}

export function ArticleCard({ post, variant = 'standard', indexNumber }: ArticleCardProps) {
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Draft';

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openModal('login');
      return;
    }

    setBookmarkLoading(true);
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id }),
      });
      const data = await res.json();
      if (data.success) {
        setBookmarked(data.data.bookmarked);
      }
    } catch (err) {
      console.error('[Bookmark Error]', err);
    } finally {
      setBookmarkLoading(false);
    }
  };

  // 1. FEATURED COVER STORY (Magazine Cover Layout)
  if (variant === 'featured') {
    return (
      <article className="relative group border border-[#121110] bg-[#FAF8F5] transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Content Column */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-between order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-[#121110]">
            <div>
              {/* Category & Track Tag */}
              <div className="flex items-center gap-3 font-mono text-[11px] text-[#78716C] mb-6">
                <span className="px-2 py-0.5 bg-[#121110] text-[#FAF8F5] font-bold">
                  COVER STORY
                </span>
                {post.category && (
                  <>
                    <span>/</span>
                    <Link
                      href={`/category/${post.category.slug}`}
                      className="text-[#E63B19] font-bold uppercase hover:underline"
                    >
                      {post.category.name}
                    </Link>
                  </>
                )}
                <span>•</span>
                <span>{post.readingTime} MIN READ</span>
              </div>

              {/* Title */}
              <Link href={`/blog/${post.slug}`} className="block group/title">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#121110] tracking-tight leading-[1.08] mb-6 group-hover/title:text-[#E63B19] transition-colors">
                  {post.title}
                </h1>
              </Link>

              {/* Excerpt / Deck */}
              {post.excerpt && (
                <p className="font-sans text-base sm:text-lg text-[#57534E] leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Author & Footer Bar */}
            <div className="pt-6 border-t border-[#E6E1D8] flex items-center justify-between">
              {post.author ? (
                <Link
                  href={`/author/${post.author.slug}`}
                  className="flex items-center gap-3 group/author"
                >
                  <img
                    src={post.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={post.author.displayName}
                    className="w-10 h-10 rounded-full object-cover grayscale group-hover/author:grayscale-0 transition"
                  />
                  <div>
                    <div className="font-mono text-xs font-bold text-[#121110] group-hover/author:text-[#E63B19] transition">
                      {post.author.displayName}
                    </div>
                    <div className="font-mono text-[10px] text-[#78716C]">{formattedDate}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBookmark}
                  disabled={bookmarkLoading}
                  className={`p-2 border font-mono text-xs transition ${
                    bookmarked
                      ? 'bg-[#E63B19] text-[#FAF8F5] border-[#E63B19]'
                      : 'border-[#E6E1D8] hover:border-[#121110] text-[#78716C] hover:text-[#121110]'
                  }`}
                  title="Bookmark story"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
                <Link
                  href={`/blog/${post.slug}`}
                  className="px-4 py-2 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] font-mono text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>READ ESSAY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Image Column */}
          <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[420px] lg:min-h-[540px] overflow-hidden bg-[#121110] order-1 lg:order-2">
            <Link href={`/blog/${post.slug}`} className="block w-full h-full">
              <img
                src={post.featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'}
                alt={post.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/40 to-transparent pointer-events-none" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // 2. INDEX ROW VARIANT (For Trending / Editorial Index Section)
  if (variant === 'index-row') {
    const formattedIndex = typeof indexNumber === 'number' ? String(indexNumber).padStart(2, '0') : indexNumber || '01';
    return (
      <article className="group py-6 sm:py-8 border-b border-[#E6E1D8] hover:border-[#121110] transition-colors relative">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            {/* Left: Number + Title */}
            <div className="flex items-start gap-4 sm:gap-8 max-w-3xl">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#E63B19] tracking-tight flex-shrink-0">
                {formattedIndex}
              </span>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#121110] group-hover:text-[#E63B19] transition-colors leading-tight">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="font-sans text-xs sm:text-sm text-[#57534E] mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Metadata */}
            <div className="flex items-center gap-4 font-mono text-xs text-[#78716C] md:text-right flex-shrink-0">
              {post.category && (
                <span className="uppercase text-[#121110] font-bold">
                  {post.category.name}
                </span>
              )}
              <span>/</span>
              <span>{post.readingTime} MIN</span>
              <ArrowUpRight className="w-4 h-4 text-[#78716C] group-hover:text-[#E63B19] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all hidden sm:inline-block" />
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // 3. HORIZONTAL ARCHIVE ROW
  if (variant === 'horizontal' || variant === 'compact') {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 p-5 border border-[#E6E1D8] hover:border-[#121110] bg-[#FAF8F5] transition-all">
        {post.featuredImage && (
          <Link
            href={`/blog/${post.slug}`}
            className="sm:w-48 sm:h-32 h-44 overflow-hidden flex-shrink-0 relative bg-[#F4EFE6] block"
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </Link>
        )}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#78716C] mb-2 uppercase">
              {post.category && <span className="text-[#E63B19] font-bold">{post.category.name}</span>}
              <span>•</span>
              <span>{post.readingTime} MIN READ</span>
            </div>
            <Link href={`/blog/${post.slug}`} className="block">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#121110] group-hover:text-[#E63B19] transition-colors leading-snug line-clamp-2">
                {post.title}
              </h3>
            </Link>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E6E1D8] mt-3 font-mono text-[11px] text-[#78716C]">
            <span>{post.author?.displayName || 'Editorial'}</span>
            <button
              onClick={handleBookmark}
              className="hover:text-[#E63B19] transition"
              title="Bookmark"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current text-[#E63B19]' : ''}`} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // 4. STANDARD EDITORIAL ASYMMETRIC CARD
  return (
    <article className="group flex flex-col border border-[#E6E1D8] hover:border-[#121110] bg-[#FAF8F5] transition-all duration-300">
      {/* Cover Image */}
      {post.featuredImage && (
        <Link href={`/blog/${post.slug}`} className="relative h-52 sm:h-56 overflow-hidden block bg-[#121110]">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-103"
          />
          {post.category && (
            <span className="absolute top-3 left-3 px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase bg-[#121110] text-[#FAF8F5]">
              {post.category.name}
            </span>
          )}
        </Link>
      )}

      {/* Body */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#78716C] mb-3 uppercase tracking-wider">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{post.readingTime} MIN READ</span>
          </div>

          <Link href={`/blog/${post.slug}`} className="block group-hover:text-[#E63B19] transition-colors">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#121110] tracking-tight leading-snug line-clamp-2 mb-3">
              {post.title}
            </h3>
          </Link>

          {post.excerpt && (
            <p className="font-sans text-xs sm:text-sm text-[#57534E] line-clamp-3 leading-relaxed mb-6">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between font-mono text-xs">
          {post.author ? (
            <Link
              href={`/author/${post.author.slug}`}
              className="flex items-center gap-2 group/author"
            >
              <img
                src={post.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={post.author.displayName}
                className="w-6 h-6 rounded-full object-cover grayscale group-hover/author:grayscale-0 ring-1 ring-[#E6E1D8]"
              />
              <span className="text-[#121110] font-bold group-hover/author:text-[#E63B19] transition text-[11px]">
                {post.author.displayName}
              </span>
            </Link>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              disabled={bookmarkLoading}
              className={`p-1.5 border transition ${
                bookmarked
                  ? 'bg-[#E63B19] text-[#FAF8F5] border-[#E63B19]'
                  : 'border-[#E6E1D8] hover:border-[#121110] text-[#78716C] hover:text-[#121110]'
              }`}
              title="Bookmark story"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
            <Link
              href={`/blog/${post.slug}`}
              className="p-1.5 border border-[#E6E1D8] hover:border-[#121110] text-[#121110] hover:text-[#E63B19] transition"
              title="Read story"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
