import React from 'react';
import { prisma } from '@/lib/prisma';
import { ArticleCard } from '@/components/Public/ArticleCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string; sort?: string; search?: string; page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page || '1'));
  const limit = 9;
  const skip = (page - 1) * limit;

  const categorySlug = searchParams.category;
  const tagSlug = searchParams.tag;
  const sort = searchParams.sort || 'newest';
  const query = searchParams.search;

  // Build where
  const where: any = { status: 'PUBLISHED' };

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  if (tagSlug) {
    where.tags = { some: { tag: { slug: tagSlug } } };
  }

  if (query) {
    where.OR = [
      { title: { contains: query } },
      { excerpt: { contains: query } },
      { content: { contains: query } },
    ];
  }

  let orderBy: any = { publishedAt: 'desc' };
  if (sort === 'popular') {
    orderBy = { viewCount: 'desc' };
  } else if (sort === 'likes') {
    orderBy = { likeCount: 'desc' };
  } else if (sort === 'oldest') {
    orderBy = { publishedAt: 'asc' };
  }

  const [posts, total, categories, tags] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        author: true,
        category: true,
        tags: { include: { tag: true } },
      },
    }),
    prisma.post.count({ where }),
    prisma.category.findMany({ orderBy: { postCount: 'desc' } }),
    prisma.tag.findMany({ take: 15, orderBy: { name: 'asc' } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  const formattedPosts = posts.map((p) => ({
    ...p,
    tags: p.tags.map((t) => t.tag),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 min-h-screen bg-[#FAF8F5] text-[#121110]">
      {/* Archive Masthead */}
      <div className="border-b border-[#121110] pb-8 mb-8 space-y-3">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest flex items-center gap-2">
          <span>CATALOGUE // 2026</span>
          <span className="w-12 h-[1px] bg-[#E63B19]" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#121110]">
            The Editorial Archive
          </h1>
          <div className="font-mono text-xs text-[#78716C]">
            INDEXING {total} PUBLISHED ESSAYS & PAPERS
          </div>
        </div>
      </div>

      {/* Filter & Sort Controls */}
      <div className="mb-10 space-y-4 p-6 bg-[#F4EFE6] border border-[#E6E1D8]">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
          <Link
            href="/blog"
            className={`px-3 py-1.5 border whitespace-nowrap transition ${
              !categorySlug && !tagSlug
                ? 'bg-[#121110] text-[#FAF8F5] border-[#121110] font-bold'
                : 'border-[#E6E1D8] bg-[#FAF8F5] text-[#121110] hover:border-[#121110]'
            }`}
          >
            ALL TRACKS
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className={`px-3 py-1.5 border whitespace-nowrap transition ${
                categorySlug === cat.slug
                  ? 'bg-[#121110] text-[#FAF8F5] border-[#121110] font-bold'
                  : 'border-[#E6E1D8] bg-[#FAF8F5] text-[#121110] hover:border-[#121110]'
              }`}
            >
              {cat.name.toUpperCase()} ({cat.postCount})
            </Link>
          ))}
        </div>

        {/* Tags bar & Sort selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#E6E1D8] font-mono text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[#78716C] text-[10px] uppercase">TAGS:</span>
            {tags.map((t) => (
              <Link
                key={t.id}
                href={`/blog?tag=${t.slug}`}
                className={`px-2 py-0.5 border text-[11px] transition ${
                  tagSlug === t.slug
                    ? 'bg-[#E63B19] text-[#FAF8F5] border-[#E63B19] font-bold'
                    : 'bg-[#FAF8F5] border-[#E6E1D8] text-[#57534E] hover:border-[#121110]'
                }`}
              >
                #{t.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#78716C] text-[10px] uppercase">SORT:</span>
            <div className="flex items-center gap-1">
              <Link
                href={`/blog?sort=newest${categorySlug ? `&category=${categorySlug}` : ''}`}
                className={`px-2.5 py-1 border transition ${
                  sort === 'newest'
                    ? 'bg-[#121110] text-[#FAF8F5] border-[#121110] font-bold'
                    : 'border-[#E6E1D8] bg-[#FAF8F5] text-[#121110]'
                }`}
              >
                NEWEST
              </Link>
              <Link
                href={`/blog?sort=popular${categorySlug ? `&category=${categorySlug}` : ''}`}
                className={`px-2.5 py-1 border transition ${
                  sort === 'popular'
                    ? 'bg-[#121110] text-[#FAF8F5] border-[#121110] font-bold'
                    : 'border-[#E6E1D8] bg-[#FAF8F5] text-[#121110]'
                }`}
              >
                POPULAR
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {formattedPosts.length === 0 ? (
        <div className="p-16 border border-[#E6E1D8] bg-[#F4EFE6] text-center text-[#78716C] font-mono text-xs space-y-3">
          <p className="font-serif text-xl font-bold text-[#121110]">No articles matched your filter criteria.</p>
          <p>Try selecting a different topic track or resetting all filters.</p>
          <Link
            href="/blog"
            className="inline-block mt-2 px-4 py-2 bg-[#121110] text-[#FAF8F5] font-mono text-xs font-bold"
          >
            RESET ARCHIVE FILTERS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formattedPosts.map((post) => (
            <ArticleCard key={post.id} post={post} variant="standard" />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-2 font-mono text-xs">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}${
                sort ? `&sort=${sort}` : ''
              }`}
              className={`w-9 h-9 flex items-center justify-center font-bold border transition ${
                page === p
                  ? 'bg-[#121110] text-[#FAF8F5] border-[#121110]'
                  : 'bg-[#FAF8F5] border-[#E6E1D8] text-[#121110] hover:border-[#121110]'
              }`}
            >
              {String(p).padStart(2, '0')}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
