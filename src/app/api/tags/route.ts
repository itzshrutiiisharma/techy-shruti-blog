import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { tagSchema } from '@/lib/validation';
import { slugify } from '@/lib/slugify';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    const formatted = tags.map((t) => ({
      ...t,
      postCount: t._count.posts,
    }));

    return successResponse(formatted);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch tags');
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'EDITOR')) return forbiddenResponse();

    const body = await req.json();
    const parseResult = tagSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const { name, slug } = parseResult.data;
    const finalSlug = slug || slugify(name);

    const existing = await prisma.tag.findFirst({
      where: { OR: [{ slug: finalSlug }, { name }] },
    });

    if (existing) {
      return errorResponse('Tag name or slug already exists', 'DUPLICATE_TAG', 409);
    }

    const tag = await prisma.tag.create({
      data: { name, slug: finalSlug },
    });

    return successResponse(tag, undefined, 201);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to create tag');
  }
}
