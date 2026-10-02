import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, serverErrorResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authors = await prisma.authorProfile.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { posts: { where: { status: 'PUBLISHED' } } },
        },
      },
      orderBy: { displayName: 'asc' },
    });

    const formatted = authors.map((a) => ({
      ...a,
      socialLinks: a.socialLinks ? JSON.parse(a.socialLinks) : {},
      postCount: a._count.posts,
    }));

    return successResponse(formatted);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch authors');
  }
}
