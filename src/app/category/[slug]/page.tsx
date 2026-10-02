import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArticleCard } from '@/components/Public/ArticleCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} Articles`,
    description: category.description || `Browse in-depth articles on ${category.name} on Shruti Blogs.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      posts: {
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        include: {
          author: true,
          category: true,
          tags: { include: { tag: true } },
        },
      },
    },
  });

  if (!category) notFound();

  const formattedPosts = category.posts.map((p) => ({
    ...p,
    tags: p.tags.map((t) => t.tag),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 min-h-screen bg-[#FAF8F5] text-[#121110]">
      {/* Top Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#78716C] hover:text-[#121110] mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO ALL TRACKS</span>
      </Link>

      {/* Track Masthead */}
      <div className="border-b border-[#121110] pb-8 mb-12 space-y-4">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest flex items-center gap-2">
          <span>EDITORIAL TRACK</span>
          <span className="w-12 h-[1px] bg-[#E63B19]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#121110]">
              {category.name}
            </h1>
            {category.description && (
              <p className="font-sans text-sm sm:text-base text-[#57534E] leading-relaxed max-w-2xl mt-3">
                {category.description}
              </p>
            )}
          </div>
          <div className="font-mono text-xs text-[#78716C]">
            {formattedPosts.length} ESSAYS PUBLISHED
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {formattedPosts.length === 0 ? (
        <div className="p-16 border border-[#E6E1D8] bg-[#F4EFE6] text-center font-mono text-xs text-[#78716C]">
          NO ESSAYS PUBLISHED IN THIS TRACK YET. CHECK BACK SOON.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formattedPosts.map((post) => (
            <ArticleCard key={post.id} post={post} variant="standard" />
          ))}
        </div>
      )}
    </div>
  );
}
