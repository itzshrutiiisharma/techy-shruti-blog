import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArticleCard } from '@/components/Public/ArticleCard';
import { ShareBar } from '@/components/Public/ShareBar';
import { TableOfContents } from '@/components/Public/TableOfContents';
import { CommentsSection } from '@/components/Public/CommentsSection';
import { NewsletterBox } from '@/components/Public/NewsletterBox';
import {
  Clock,
  Calendar,
  Eye,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import type { Metadata } from 'next';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { author: true, category: true },
  });

  if (!post) return { title: 'Article Not Found' };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || '';
  const ogImage = post.featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author ? [post.author.displayName] : [],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        include: { user: true },
      },
      category: true,
      tags: { include: { tag: true } },
      comments: {
        where: { status: 'APPROVED', parentId: null },
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          replies: {
            where: { status: 'APPROVED' },
            orderBy: { createdAt: 'asc' },
            include: { user: true },
          },
        },
      },
    },
  });

  if (!post || post.status !== 'PUBLISHED') {
    notFound();
  }

  // Increment view count asynchronously
  prisma.post.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {});

  // Fetch related articles
  const relatedPosts = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      id: { not: post.id },
      categoryId: post.categoryId,
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } },
    },
  });

  const formattedRelated = relatedPosts.map((p) => ({
    ...p,
    tags: p.tags.map((t) => t.tag),
  }));

  // Render markdown to sanitized HTML
  const rawHtml = await marked(post.content || '');
  const cleanContentHtml = sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'h1', 'h2', 'h3', 'h4', 'pre', 'code', 'img', 'span', 'div', 'button',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      code: ['class'],
      pre: ['class'],
      span: ['class'],
      div: ['class'],
      img: ['src', 'alt', 'title', 'class'],
      a: ['href', 'target', 'rel', 'class'],
    },
  });

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  // JSON-LD Structured Data Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author?.displayName || 'Shruti Sharma',
      url: post.author?.website || `https://shrutiblogs.com/author/${post.author?.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shruti Blogs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shrutiblogs.com/logo.png',
      },
    },
  };

  return (
    <article className="min-h-screen pb-20 bg-[#F8FAFC]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumb Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-slate-500">
          <nav className="flex items-center gap-1.5 truncate font-medium">
            <Link href="/" className="hover:text-slate-900 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-slate-900 transition">
              Articles
            </Link>
            {post.category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <Link href={`/category/${post.category.slug}`} className="text-indigo-600 hover:text-indigo-700 font-semibold transition">
                  {post.category.name}
                </Link>
              </>
            )}
          </nav>

          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
        </div>
      </div>

      {/* Article Header Container */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8 text-center sm:text-left space-y-6">
        {post.category && (
          <Link
            href={`/category/${post.category.slug}`}
            className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition"
          >
            {post.category.name}
          </Link>
        )}

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        )}

        {/* Byline & Metadata Bar */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {post.author && (
            <Link href={`/author/${post.author.slug}`} className="flex items-center gap-3 group">
              <img
                src={post.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={post.author.displayName}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-400 transition"
              />
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {post.author.displayName}
                </div>
                <div className="text-xs text-slate-500">Author & Systems Architect</div>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              {post.readingTime} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {post.viewCount + 1} views
            </span>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      {post.featuredImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md max-h-[500px] bg-slate-100">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Main Reading Column & TOC Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Sticky Table of Contents (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start space-y-6">
          <TableOfContents content={post.content} />
          <NewsletterBox compact={true} />
        </aside>

        {/* Central Article Body */}
        <main className="lg:col-span-9 max-w-3xl space-y-8">
          {/* Social Share & Bookmark Bar */}
          <ShareBar
            postId={post.id}
            title={post.title}
            slug={post.slug}
            initialLikeCount={post.likeCount}
            initialBookmarkCount={post.bookmarkCount}
          />

          {/* Formatted Markdown Body */}
          <div
            className="prose prose-slate prose-lg max-w-none text-slate-800 leading-relaxed font-sans prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 prose-a:underline hover:prose-a:text-indigo-700 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-2xl prose-code:text-indigo-600 prose-blockquote:border-indigo-600 prose-blockquote:bg-indigo-50/60 prose-blockquote:text-slate-800 prose-blockquote:p-4 prose-blockquote:rounded-r-xl"
            dangerouslySetInnerHTML={{ __html: cleanContentHtml }}
          />

          {/* Tag Pills */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-slate-500">Tagged with:</span>
              {post.tags.map((t) => (
                <Link
                  key={t.tag.id}
                  href={`/tag/${t.tag.slug}`}
                  className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 hover:text-indigo-600 hover:border-indigo-200 transition shadow-2xs"
                >
                  #{t.tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Author Bio Card */}
          {post.author && (
            <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm">
              <img
                src={post.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={post.author.displayName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-100 flex-shrink-0"
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Written by</span>
                    <h3 className="text-base font-bold text-slate-900">{post.author.displayName}</h3>
                  </div>
                  <Link
                    href={`/author/${post.author.slug}`}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {post.author.bio || 'Staff Software Architect & Distributed Systems Engineer.'}
                </p>
              </div>
            </div>
          )}

          {/* Threaded Discussion Section */}
          <CommentsSection
            postId={post.id}
            initialComments={post.comments as any}
          />
        </main>
      </div>

      {/* Related Articles Section */}
      {formattedRelated.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-slate-200">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Related Articles</h2>
            <p className="text-xs text-slate-500">Continue exploring deep dives in {post.category?.name || 'this track'}.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formattedRelated.map((rel) => (
              <ArticleCard key={rel.id} post={rel} variant="standard" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
