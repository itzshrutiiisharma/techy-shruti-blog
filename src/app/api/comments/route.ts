import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { commentSchema } from '@/lib/validation';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';
import sanitizeHtml from 'sanitize-html';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const status = searchParams.get('status');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const skip = (page - 1) * limit;

    const user = await getAuthenticatedUser(req);
    const isStaff = user && hasPermission(user.role, 'MODERATOR');

    const where: any = {};
    if (postId) where.postId = postId;

    if (isStaff && status) {
      where.status = status;
    } else if (!isStaff) {
      where.status = 'APPROVED';
      where.parentId = null; // Top-level for public
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, avatar: true, role: true } },
          post: { select: { id: true, title: true, slug: true } },
          replies: {
            where: isStaff ? undefined : { status: 'APPROVED' },
            include: { user: { select: { id: true, name: true, avatar: true, role: true } } },
            orderBy: { createdAt: 'asc' },
          },
        },
      }),
      prisma.comment.count({ where }),
    ]);

    return successResponse(comments, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch comments');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = commentSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const { postId, parentId, authorName, authorEmail, content } = parseResult.data;

    // Verify post exists
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.status !== 'PUBLISHED') {
      return errorResponse('Cannot comment on unpublished article', 'POST_UNAVAILABLE', 400);
    }

    const user = await getAuthenticatedUser(req);

    // Sanitize comment content to prevent XSS
    const cleanContent = sanitizeHtml(content, {
      allowedTags: ['b', 'i', 'em', 'strong', 'code', 'pre', 'blockquote', 'a'],
      allowedAttributes: { a: ['href', 'target', 'rel'] },
    });

    const comment = await prisma.comment.create({
      data: {
        postId,
        parentId: parentId || null,
        userId: user ? user.id : null,
        authorName: user ? user.name : authorName.trim(),
        authorEmail: user ? user.email : authorEmail?.trim() || null,
        content: cleanContent,
        status: 'APPROVED', // auto-approved default for responsive experience
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
    });

    // Increment post commentCount
    await prisma.post.update({
      where: { id: postId },
      data: { commentCount: { increment: 1 } },
    });

    return successResponse(comment, undefined, 201);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to submit comment');
  }
}
