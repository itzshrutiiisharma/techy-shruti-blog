import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken, UserRole } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';
import { errorResponse, successResponse, serverErrorResponse } from '@/lib/api-response';
import { createAuditLog } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = loginSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const { email, password } = parseResult.data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        authorProfile: true,
      },
    });

    if (!user) {
      return errorResponse('Invalid email or password', 'INVALID_CREDENTIALS', 401);
    }

    if (user.status === 'SUSPENDED') {
      return errorResponse('Your account has been suspended. Please contact support.', 'ACCOUNT_SUSPENDED', 403);
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return errorResponse('Invalid email or password', 'INVALID_CREDENTIALS', 401);
    }

    // Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
      name: user.name,
    });

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'USER_LOGIN',
      entity: 'User',
      entityId: user.id,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    const res = successResponse({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        authorProfile: user.authorProfile,
      },
      token,
    });

    // Set secure HTTP-only cookie
    res.cookies.set('sb_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;
  } catch (err: any) {
    return serverErrorResponse(err, 'Login failed');
  }
}
