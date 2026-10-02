import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const author = await prisma.authorProfile.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
      include: {
        posts: {
          where: { status: 'PUBLISHED' },
          include: { category: true, tags: { include: { tag: true } } },
          orderBy: { publishedAt: 'desc' },
        },
      },
    });

    if (!author) return notFoundResponse('Author profile not found');

    const formattedPosts = author.posts.map((p) => ({
      ...p,
      tags: p.tags.map((t) => t.tag),
    }));

    return successResponse({
      ...author,
      socialLinks: author.socialLinks ? JSON.parse(author.socialLinks) : {},
      posts: formattedPosts,
    });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch author');
  }
}
