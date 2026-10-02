import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { successResponse, errorResponse, notFoundResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';
import { createAuditLog } from '@/lib/audit';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'MODERATOR')) return forbiddenResponse();

    const body = await req.json();
    const { status } = body;

    if (!['PENDING', 'APPROVED', 'REJECTED', 'SPAM'].includes(status)) {
      return errorResponse('Invalid comment status', 'INVALID_STATUS', 400);
    }

    const comment = await prisma.comment.findUnique({ where: { id: params.id } });
    if (!comment) return notFoundResponse('Comment not found');

    const updated = await prisma.comment.update({
      where: { id: params.id },
      data: { status },
    });

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: `COMMENT_${status}`,
      entity: 'Comment',
      entityId: comment.id,
      metadata: { previousStatus: comment.status, newStatus: status },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse(updated);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to update comment status');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'MODERATOR')) return forbiddenResponse();

    const comment = await prisma.comment.findUnique({ where: { id: params.id } });
    if (!comment) return notFoundResponse('Comment not found');

    await prisma.comment.delete({ where: { id: params.id } });

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'COMMENT_DELETED',
      entity: 'Comment',
      entityId: comment.id,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse({ message: 'Comment deleted successfully' });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to delete comment');
  }
}
