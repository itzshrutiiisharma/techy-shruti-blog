import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { successResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'EDITOR')) return forbiddenResponse();

    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || '30d'; // 7d, 30d, 90d, 1y

    let days = 30;
    if (range === '7d') days = 7;
    if (range === '90d') days = 90;
    if (range === '1y') days = 365;

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Global counts
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      scheduledPosts,
      totalComments,
      pendingComments,
      totalSubscribers,
      totalUsers,
      recentViews,
    ] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: 'PUBLISHED' } }),
      prisma.post.count({ where: { status: 'DRAFT' } }),
      prisma.post.count({ where: { status: 'SCHEDULED' } }),
      prisma.comment.count(),
      prisma.comment.count({ where: { status: 'PENDING' } }),
      prisma.newsletterSubscriber.count({ where: { status: 'ACTIVE' } }),
      prisma.user.count(),
      prisma.analyticsEvent.count({
        where: {
          type: 'PAGE_VIEW',
          createdAt: { gte: startDate },
        },
      }),
    ]);

    // Top performing posts
    const topPosts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      take: 5,
      orderBy: { viewCount: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        viewCount: true,
        likeCount: true,
        bookmarkCount: true,
        publishedAt: true,
        author: { select: { displayName: true } },
      },
    });

    // Device breakdown
    const rawDevices = await prisma.analyticsEvent.groupBy({
      by: ['device'],
      where: { createdAt: { gte: startDate } },
      _count: { device: true },
    });

    // Traffic sources breakdown
    const rawSources = await prisma.analyticsEvent.groupBy({
      by: ['source'],
      where: { createdAt: { gte: startDate } },
      _count: { source: true },
    });

    // Timeseries view data: aggregate per day
    const allEvents = await prisma.analyticsEvent.findMany({
      where: {
        type: 'PAGE_VIEW',
        createdAt: { gte: startDate },
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const viewsByDateMap: Record<string, number> = {};
    // Pre-populate days
    for (let i = days; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().split('T')[0];
      viewsByDateMap[key] = 0;
    }

    allEvents.forEach((ev) => {
      const key = ev.createdAt.toISOString().split('T')[0];
      if (viewsByDateMap[key] !== undefined) {
        viewsByDateMap[key] += 1;
      }
    });

    const timeseries = Object.entries(viewsByDateMap).map(([date, views]) => ({
      date: date.substring(5), // 'MM-DD'
      fullDate: date,
      views,
    }));

    return successResponse({
      summary: {
        totalPosts,
        publishedPosts,
        draftPosts,
        scheduledPosts,
        totalViews: recentViews,
        totalComments,
        pendingComments,
        totalSubscribers,
        totalUsers,
      },
      timeseries,
      topPosts,
      devices: rawDevices.map((d) => ({ name: d.device || 'other', count: d._count.device })),
      sources: rawSources.map((s) => ({ name: s.source || 'direct', count: s._count.source })),
    });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch analytics overview');
  }
}
