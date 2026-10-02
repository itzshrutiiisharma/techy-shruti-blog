import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, serverErrorResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim();

    if (!q) {
      return successResponse({
        posts: [],
        categories: [],
        tags: [],
        authors: [],
        total: 0,
      });
    }

    const [posts, categories, tags, authors] = await Promise.all([
      prisma.post.findMany({
        where: {
          status: 'PUBLISHED',
          OR: [
            { title: { contains: q } },
            { excerpt: { contains: q } },
            { content: { contains: q } },
          ],
        },
        take: 20,
        orderBy: { publishedAt: 'desc' },
        include: {
          author: true,
          category: true,
          tags: { include: { tag: true } },
        },
      }),
      prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 10,
      }),
      prisma.tag.findMany({
        where: {
          name: { contains: q },
        },
        take: 10,
      }),
      prisma.authorProfile.findMany({
        where: {
          isActive: true,
          OR: [
            { displayName: { contains: q } },
            { bio: { contains: q } },
          ],
        },
        take: 10,
      }),
    ]);

    // Record search analytics event asynchronously
    prisma.analyticsEvent.create({
      data: {
        type: 'SEARCH',
        path: `/search?q=${encodeURIComponent(q)}`,
        metadata: JSON.stringify({ query: q, resultsCount: posts.length }),
        source: 'internal_search',
        device: 'web',
      },
    }).catch((e) => console.error('[Search Event Record Error]', e));

    const formattedPosts = posts.map((p) => ({
      ...p,
      tags: p.tags.map((t) => t.tag),
    }));

    return successResponse({
      query: q,
      posts: formattedPosts,
      categories,
      tags,
      authors,
      total: posts.length + categories.length + tags.length + authors.length,
    });
  } catch (err: any) {
    return serverErrorResponse(err, 'Search query failed');
  }
}
