import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, serverErrorResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, path, postId, visitorId, sessionId, referrer, source, device, browser } = body;

    const event = await prisma.analyticsEvent.create({
      data: {
        type: type || 'PAGE_VIEW',
        path: path || '/',
        postId: postId || null,
        visitorId: visitorId || null,
        sessionId: sessionId || null,
        referrer: referrer || null,
        source: source || 'direct',
        device: device || 'desktop',
        browser: browser || 'chrome',
      },
    });

    return successResponse({ recorded: true, id: event.id }, undefined, 201);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to record analytics');
  }
}
