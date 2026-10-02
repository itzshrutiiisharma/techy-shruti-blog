import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { newsletterSchema } from '@/lib/validation';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'EDITOR')) return forbiddenResponse();

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    });

    return successResponse(subscribers);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch subscribers');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = newsletterSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const { email } = parseResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.status === 'ACTIVE') {
        return successResponse({ message: 'You are already subscribed to the newsletter!' });
      } else {
        const updated = await prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: { status: 'ACTIVE', unsubscribedAt: null },
        });
        return successResponse({ message: 'Welcome back! Your subscription is active again.', subscriber: updated });
      }
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: normalizedEmail,
        status: 'ACTIVE',
      },
    });

    return successResponse(
      { message: 'Thank you for subscribing to Shruti Blogs Editorial!', subscriber },
      undefined,
      201
    );
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to subscribe to newsletter');
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    if (!email) return errorResponse('Email is required', 'MISSING_EMAIL', 400);

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (subscriber) {
      await prisma.newsletterSubscriber.update({
        where: { id: subscriber.id },
        data: { status: 'UNSUBSCRIBED', unsubscribedAt: new Date() },
      });
    }

    return successResponse({ message: 'You have been unsubscribed successfully.' });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to unsubscribe');
  }
}
