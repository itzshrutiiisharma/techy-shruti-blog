import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { tagSchema } from '@/lib/validation';
import { successResponse, errorResponse, notFoundResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tag = await prisma.tag.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
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

    if (!tag) return notFoundResponse('Tag not found');

    const publishedPosts = tag.posts
      .map((p) => p.post)
      .filter((p) => p.status === 'PUBLISHED')
      .map((p) => ({
        ...p,
        tags: p.tags.map((t) => t.tag),
      }));

    return successResponse({
      ...tag,
      posts: publishedPosts,
    });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch tag');
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'EDITOR')) return forbiddenResponse();

    const tag = await prisma.tag.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
    });

    if (!tag) return notFoundResponse('Tag not found');

    const body = await req.json();
    const parseResult = tagSchema.partial().safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const updated = await prisma.tag.update({
      where: { id: tag.id },
      data: parseResult.data,
    });

    return successResponse(updated);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to update tag');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'ADMIN')) return forbiddenResponse();

    const tag = await prisma.tag.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
    });

    if (!tag) return notFoundResponse('Tag not found');

    await prisma.tag.delete({ where: { id: tag.id } });
    return successResponse({ message: 'Tag deleted successfully' });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to delete tag');
  }
}
