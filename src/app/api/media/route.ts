import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { successResponse, unauthorizedResponse, forbiddenResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'AUTHOR')) return forbiddenResponse();

    const mediaList = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        uploadedBy: { select: { id: true, name: true, avatar: true } },
      },
    });

    return successResponse(mediaList);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch media');
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'EDITOR')) return forbiddenResponse();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return serverErrorResponse(null, 'Missing media ID');

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) return notFoundResponse('Media not found');

    await prisma.media.delete({ where: { id } });
    return successResponse({ message: 'Media deleted successfully' });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to delete media');
  }
}
