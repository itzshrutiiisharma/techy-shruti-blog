import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { postSchema } from '@/lib/validation';
import { slugify, calculateReadingTime } from '@/lib/slugify';
import { successResponse, errorResponse, notFoundResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';
import { createAuditLog } from '@/lib/audit';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const idOrSlug = params.id;
    const { searchParams } = new URL(req.url);
    const incrementView = searchParams.get('incView') === 'true';

    const post = await prisma.post.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        author: true,
        category: true,
        tags: {
          include: { tag: true },
        },
        comments: {
          where: { status: 'APPROVED', parentId: null },
          orderBy: { createdAt: 'desc' },
          include: {
            replies: {
              where: { status: 'APPROVED' },
              orderBy: { createdAt: 'asc' },
              include: { user: true },
            },
            user: true,
          },
        },
      },
    });

    if (!post) {
      return notFoundResponse('Article not found');
    }

    if (incrementView) {
      await prisma.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } },
      });
      post.viewCount += 1;
    }

    const formatted = {
      ...post,
      tags: post.tags.map((t) => t.tag),
    };

    return successResponse(formatted);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch article');
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();

    const existingPost = await prisma.post.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
      include: { author: true },
    });

    if (!existingPost) return notFoundResponse('Article not found');

    const isOwner = user.authorProfile?.id === existingPost.authorId;
    const isEditorOrHigher = hasPermission(user.role, 'EDITOR');

    if (!isOwner && !isEditorOrHigher) {
      return forbiddenResponse('You do not have permission to edit this article');
    }

    const body = await req.json();
    const parseResult = postSchema.partial().safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const data = parseResult.data;
    const readingTime = data.content ? calculateReadingTime(data.content) : existingPost.readingTime;

    let publishedAt = existingPost.publishedAt;
    if (data.status === 'PUBLISHED' && !existingPost.publishedAt) {
      publishedAt = new Date();
    }

    const updatedPost = await prisma.post.update({
      where: { id: existingPost.id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.slug && { slug: data.slug }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
        ...(data.content && { content: data.content, readingTime }),
        ...(data.featuredImage !== undefined && { featuredImage: data.featuredImage }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.status && { status: data.status, publishedAt }),
        ...(data.visibility && { visibility: data.visibility }),
        ...(data.scheduledAt !== undefined && { scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null }),
        ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
        ...(data.isTrending !== undefined && { isTrending: data.isTrending }),
        ...(data.seoTitle !== undefined && { seoTitle: data.seoTitle }),
        ...(data.seoDescription !== undefined && { seoDescription: data.seoDescription }),
        ...(data.canonicalUrl !== undefined && { canonicalUrl: data.canonicalUrl }),
      },
    });

    // Update tags if provided
    if (data.tagNames) {
      await prisma.postTag.deleteMany({ where: { postId: existingPost.id } });
      for (const rawTagName of data.tagNames) {
        const tagName = rawTagName.trim();
        if (!tagName) continue;
        const tagSlug = slugify(tagName);
        let tag = await prisma.tag.findUnique({ where: { slug: tagSlug } });
        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: tagName, slug: tagSlug },
          });
        }
        await prisma.postTag.create({
          data: { postId: existingPost.id, tagId: tag.id },
        });
      }
    }

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'POST_UPDATED',
      entity: 'Post',
      entityId: existingPost.id,
      metadata: { title: updatedPost.title, status: updatedPost.status },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse(updatedPost);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to update article');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();

    const post = await prisma.post.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
      include: { author: true },
    });

    if (!post) return notFoundResponse('Article not found');

    const isOwner = user.authorProfile?.id === post.authorId;
    const isEditorOrHigher = hasPermission(user.role, 'EDITOR');

    if (!isOwner && !isEditorOrHigher) {
      return forbiddenResponse('You do not have permission to delete this article');
    }

    await prisma.post.delete({ where: { id: post.id } });

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'POST_DELETED',
      entity: 'Post',
      entityId: post.id,
      metadata: { title: post.title, slug: post.slug },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse({ message: 'Article deleted successfully' });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to delete article');
  }
}
