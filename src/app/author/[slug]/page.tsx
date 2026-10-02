import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArticleCard } from '@/components/Public/ArticleCard';
import { Globe, Twitter, Github, Linkedin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const author = await prisma.authorProfile.findUnique({
    where: { slug: params.slug },
  });
  if (!author) return { title: 'Author Not Found' };

  return {
    title: `${author.displayName} — Editorial Author Profile`,
    description: author.bio || `Read articles published by ${author.displayName} on Shruti Blogs.`,
  };
}

export default async function AuthorProfilePage({ params }: { params: { slug: string } }) {
  const author = await prisma.authorProfile.findUnique({
    where: { slug: params.slug },
    include: {
      user: true,
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

  if (!author || !author.isActive) notFound();

  const socialLinks = author.socialLinks ? JSON.parse(author.socialLinks) : {};

  const formattedPosts = author.posts.map((p) => ({
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
        <span>BACK TO ALL ESSAYS</span>
      </Link>

      {/* Author Masthead Card */}
      <div className="p-8 sm:p-12 border border-[#121110] bg-[#F4EFE6] mb-16">
        <div className="flex flex-col sm:flex-row items-start gap-8">
          <img
            src={author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt={author.displayName}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover grayscale ring-2 ring-[#121110]"
          />
          <div className="space-y-4 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E6E1D8] pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest block">
                  STAFF AUTHOR // VERIFIED
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121110]">
                  {author.displayName}
                </h1>
              </div>
              <span className="font-mono text-xs text-[#78716C]">
                {formattedPosts.length} ESSAYS IN ARCHIVE
              </span>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#57534E] leading-relaxed max-w-2xl">
              {author.bio || 'Staff Software Architect, distributed systems researcher, and technical essayist.'}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {author.website && (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[#E6E1D8] bg-[#FAF8F5] hover:border-[#121110] hover:text-[#E63B19] transition"
                  title="Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[#E6E1D8] bg-[#FAF8F5] hover:border-[#121110] hover:text-[#E63B19] transition"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[#E6E1D8] bg-[#FAF8F5] hover:border-[#121110] hover:text-[#E63B19] transition"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[#E6E1D8] bg-[#FAF8F5] hover:border-[#121110] hover:text-[#E63B19] transition"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Author Archive Section */}
      <div>
        <div className="border-b border-[#121110] pb-4 mb-8 flex items-baseline justify-between">
          <div className="font-mono text-xs text-[#E63B19] font-bold uppercase tracking-wider flex items-center gap-2">
            <span>02 // AUTHOR ARCHIVE</span>
          </div>
          <span className="font-mono text-xs text-[#78716C]">
            COMPLETE CATALOGUE
          </span>
        </div>

        {formattedPosts.length === 0 ? (
          <div className="p-16 border border-[#E6E1D8] bg-[#F4EFE6] text-center font-mono text-xs text-[#78716C]">
            NO PUBLISHED ESSAYS IN THIS AUTHOR ARCHIVE YET.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formattedPosts.map((post) => (
              <ArticleCard key={post.id} post={post} variant="standard" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
