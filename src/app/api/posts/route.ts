import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { postSchema } from '@/lib/validation';
import { slugify, calculateReadingTime } from '@/lib/slugify';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';
import { createAuditLog } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
    const skip = (page - 1) * limit;

    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const author = searchParams.get('author');
    const search = searchParams.get('search');
    const isFeatured = searchParams.get('featured') === 'true';
    const isTrending = searchParams.get('trending') === 'true';
    const requestedStatus = searchParams.get('status');
    const sort = searchParams.get('sort') || 'newest';

    const user = await getAuthenticatedUser(req);
    const isStaff = user && hasPermission(user.role, 'AUTHOR');

    // Build where clause
    const where: any = {};

    if (requestedStatus && isStaff) {
      where.status = requestedStatus;
    } else if (!isStaff) {
      where.status = 'PUBLISHED';
    }

    if (category) {
      where.category = {
        OR: [{ slug: category }, { id: category }],
      };
    }

    if (tag) {
      where.tags = {
        some: {
          tag: {
            OR: [{ slug: tag }, { name: tag }],
          },
        },
      };
    }

    if (author) {
      where.author = {
        OR: [{ slug: author }, { id: author }],
      };
    }

    if (isFeatured) {
      where.isFeatured = true;
    }

    if (isTrending) {
      where.isTrending = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ];
    }

    // Build orderBy
    let orderBy: any = { publishedAt: 'desc' };
    if (sort === 'popular' || sort === 'views') {
      orderBy = { viewCount: 'desc' };
    } else if (sort === 'likes') {
      orderBy = { likeCount: 'desc' };
    } else if (sort === 'oldest') {
      orderBy = { publishedAt: 'asc' };
    } else if (sort === 'updated') {
      orderBy = { updatedAt: 'desc' };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          author: true,
          category: true,
          tags: {
            include: { tag: true },
          },
          _count: {
            select: { comments: true, bookmarks: true },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    const formattedPosts = posts.map((post) => ({
      ...post,
      tags: post.tags.map((t) => t.tag),
      commentCount: post._count.comments,
      bookmarkCount: post._count.bookmarks,
    }));

    return successResponse(formattedPosts, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch posts');
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorizedResponse();
    }

    if (!hasPermission(user.role, 'AUTHOR')) {
      return forbiddenResponse('You must be an author or editor to create posts');
    }

    const body = await req.json();
    const parseResult = postSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const data = parseResult.data;

    // Check if author profile exists
    let authorProfile = user.authorProfile;
    if (!authorProfile) {
      authorProfile = await prisma.authorProfile.create({
        data: {
          userId: user.id,
          displayName: user.name,
          slug: slugify(user.name) + '-' + Math.floor(Math.random() * 1000),
          avatar: user.avatar,
        },
      });
    }

    const finalSlug = data.slug || slugify(data.title);
    const existingSlug = await prisma.post.findUnique({
      where: { slug: finalSlug },
    });

    const uniqueSlug = existingSlug ? `${finalSlug}-${Date.now().toString().slice(-4)}` : finalSlug;
    const readingTime = calculateReadingTime(data.content);

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: uniqueSlug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        authorId: authorProfile.id,
        categoryId: data.categoryId || null,
        status: data.status,
        visibility: data.visibility,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        readingTime,
        isFeatured: data.isFeatured ?? false,
        isTrending: data.isTrending ?? false,
        seoTitle: data.seoTitle || data.title,
        seoDescription: data.seoDescription || data.excerpt,
        canonicalUrl: data.canonicalUrl,
      },
    });

    // Handle Tags
    if (data.tagNames && data.tagNames.length > 0) {
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
          data: { postId: post.id, tagId: tag.id },
        });
      }
    }

    // Update category post count
    if (post.categoryId && post.status === 'PUBLISHED') {
      const count = await prisma.post.count({
        where: { categoryId: post.categoryId, status: 'PUBLISHED' },
      });
      await prisma.category.update({
        where: { id: post.categoryId },
        data: { postCount: count },
      });
    }

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'POST_CREATED',
      entity: 'Post',
      entityId: post.id,
      metadata: { title: post.title, slug: post.slug, status: post.status },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse(post, undefined, 201);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to create post');
  }
}
