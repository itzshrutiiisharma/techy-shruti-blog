import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { categorySchema } from '@/lib/validation';
import { slugify } from '@/lib/slugify';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';
import { createAuditLog } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: { where: { status: 'PUBLISHED' } } },
        },
      },
    });

    const formatted = categories.map((cat) => ({
      ...cat,
      postCount: cat._count.posts,
    }));

    return successResponse(formatted);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch categories');
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'EDITOR')) return forbiddenResponse();

    const body = await req.json();
    const parseResult = categorySchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const { name, slug, description, image } = parseResult.data;
    const finalSlug = slug || slugify(name);

    const existing = await prisma.category.findFirst({
      where: { OR: [{ slug: finalSlug }, { name }] },
    });

    if (existing) {
      return errorResponse('Category name or slug already exists', 'DUPLICATE_CATEGORY', 409);
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: finalSlug,
        description,
        image,
      },
    });

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'CATEGORY_CREATED',
      entity: 'Category',
      entityId: category.id,
      metadata: { name: category.name },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse(category, undefined, 201);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to create category');
  }
}
