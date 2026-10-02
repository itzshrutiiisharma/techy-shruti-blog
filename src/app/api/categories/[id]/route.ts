import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { categorySchema } from '@/lib/validation';
import { successResponse, errorResponse, notFoundResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';
import { createAuditLog } from '@/lib/audit';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.category.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
      include: {
        posts: {
          where: { status: 'PUBLISHED' },
          include: { author: true, tags: { include: { tag: true } } },
          orderBy: { publishedAt: 'desc' },
        },
      },
    });

    if (!category) return notFoundResponse('Category not found');

    return successResponse(category);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch category');
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'EDITOR')) return forbiddenResponse();

    const category = await prisma.category.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
    });

    if (!category) return notFoundResponse('Category not found');

    const body = await req.json();
    const parseResult = categorySchema.partial().safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const updated = await prisma.category.update({
      where: { id: category.id },
      data: parseResult.data,
    });

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'CATEGORY_UPDATED',
      entity: 'Category',
      entityId: category.id,
      metadata: updated,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse(updated);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to update category');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'ADMIN')) return forbiddenResponse();

    const category = await prisma.category.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
    });

    if (!category) return notFoundResponse('Category not found');

    // Unlink posts
    await prisma.post.updateMany({
      where: { categoryId: category.id },
      data: { categoryId: null },
    });

    await prisma.category.delete({ where: { id: category.id } });

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'CATEGORY_DELETED',
      entity: 'Category',
      entityId: category.id,
      metadata: { name: category.name },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse({ message: 'Category deleted successfully' });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to delete category');
  }
}
