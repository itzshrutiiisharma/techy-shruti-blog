import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        post: {
          include: {
            author: true,
            category: true,
            tags: { include: { tag: true } },
          },
        },
      },
    });

    const formatted = bookmarks.map((b) => ({
      id: b.id,
      createdAt: b.createdAt,
      post: {
        ...b.post,
        tags: b.post.tags.map((t) => t.tag),
      },
    }));

    return successResponse(formatted);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch bookmarks');
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();

    const body = await req.json();
    const { postId } = body;

    if (!postId) {
      return errorResponse('Post ID is required', 'MISSING_POST_ID', 400);
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return errorResponse('Article not found', 'POST_NOT_FOUND', 404);
    }

    const existing = await prisma.bookmark.findUnique({
      where: { userId_postId: { userId: user.id, postId } },
    });

    if (existing) {
      // Toggle off / remove bookmark
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });
      await prisma.post.update({
        where: { id: postId },
        data: { bookmarkCount: { decrement: 1 } },
      });
      return successResponse({ bookmarked: false, message: 'Bookmark removed' });
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId: user.id,
        postId,
      },
    });

    await prisma.post.update({
      where: { id: postId },
      data: { bookmarkCount: { increment: 1 } },
    });

    return successResponse({ bookmarked: true, bookmark, message: 'Bookmark saved' }, undefined, 201);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to toggle bookmark');
  }
}
