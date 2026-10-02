import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';
import { createAuditLog } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'ADMIN')) return forbiddenResponse();

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        authorProfile: true,
        _count: {
          select: { comments: true, bookmarks: true },
        },
      },
    });

    return successResponse(users);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch users');
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'ADMIN')) return forbiddenResponse();

    const body = await req.json();
    const { userId, role, status } = body;

    if (!userId) return errorResponse('Missing userId', 'MISSING_USER_ID', 400);

    const targetUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!targetUser) return notFoundResponse('User not found');

    // Prevent non-superadmin from modifying super_admin
    if (targetUser.role === 'SUPER_ADMIN' && user.role !== 'SUPER_ADMIN') {
      return forbiddenResponse('Cannot modify Super Admin account');
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(role && { role }),
        ...(status && { status }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'USER_ROLE_OR_STATUS_CHANGED',
      entity: 'User',
      entityId: userId,
      metadata: { previousRole: targetUser.role, newRole: role, status },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse(updated);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to update user');
  }
}
