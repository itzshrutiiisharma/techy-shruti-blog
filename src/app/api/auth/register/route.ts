import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken, UserRole } from '@/lib/auth';
import { registerSchema } from '@/lib/validation';
import { errorResponse, successResponse, serverErrorResponse } from '@/lib/api-response';
import { createAuditLog } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = registerSchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(
        parseResult.error.issues[0].message,
        'VALIDATION_ERROR',
        400,
        parseResult.error.flatten()
      );
    }

    const { name, email, password } = parseResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return errorResponse('An account with this email already exists', 'EMAIL_ALREADY_EXISTS', 409);
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: 'READER',
        status: 'ACTIVE',
      },
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
      action: 'USER_REGISTERED',
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
      },
      token,
    }, undefined, 201);

    res.cookies.set('sb_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err: any) {
    return serverErrorResponse(err, 'Registration failed');
  }
}
