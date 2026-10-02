import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArticleCard } from '@/components/Public/ArticleCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tag = await prisma.tag.findUnique({
    where: { slug: params.slug },
  });
  if (!tag) return { title: 'Tag Not Found' };

  return {
    title: `#${tag.name} Articles`,
    description: `Articles tagged with #${tag.name} on Shruti Blogs.`,
  };
}

export default async function TagArchivePage({ params }: { params: { slug: string } }) {
  const tag = await prisma.tag.findUnique({
    where: { slug: params.slug },
    include: {
      posts: {
        include: {
          post: {
            include: {
              author: true,
              category: true,
              tags: { include: { tag: true } },
            },
          },
        },
      },
    },
  });

  if (!tag) notFound();

  const publishedPosts = tag.posts
    .map((p) => p.post)
    .filter((p) => p.status === 'PUBLISHED')
    .map((p) => ({
      ...p,
      tags: p.tags.map((t) => t.tag),
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 min-h-screen bg-[#FAF8F5] text-[#121110]">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#78716C] hover:text-[#121110] mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO ARCHIVE</span>
      </Link>

      <div className="border-b border-[#121110] pb-8 mb-12 space-y-4">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest flex items-center gap-2">
          <span>TAXONOMY TAG</span>
          <span className="w-12 h-[1px] bg-[#E63B19]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121110]">
              #{tag.name}
            </h1>
            <p className="font-mono text-xs text-[#78716C] mt-2">
              INDEXED UNDER #{tag.slug.toUpperCase()}
            </p>
          </div>
          <div className="font-mono text-xs text-[#78716C]">
            {publishedPosts.length} ESSAYS MATCHED
          </div>
        </div>
      </div>

      {publishedPosts.length === 0 ? (
        <div className="p-16 border border-[#E6E1D8] bg-[#F4EFE6] text-center font-mono text-xs text-[#78716C]">
          NO ESSAYS TAGGED WITH #{tag.name} FOUND.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map((post) => (
            <ArticleCard key={post.id} post={post} variant="standard" />
          ))}
        </div>
      )}
    </div>
  );
}
