import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 20,
      include: { author: true, category: true },
    });
  } catch (error) {
    console.warn('[feed.xml] Database not accessible, returning empty feed:', error);
  }

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Shruti Blogs — Software Architecture &amp; AI Systems</title>
  <link>${baseUrl}</link>
  <description>In-depth architectural breakdowns, distributed consensus, and AI engineering blueprints.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${posts
    .map(
      (post) => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
    <pubDate>${new Date(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
    <description><![CDATA[${post.excerpt || ''}]]></description>
    <author>${post.author?.displayName || 'Shruti Sharma'}</author>
    ${post.category ? `<category>${post.category.name}</category>` : ''}
  </item>`
    )
    .join('')}
</channel>
</rss>`;

  return new NextResponse(rssFeedXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
