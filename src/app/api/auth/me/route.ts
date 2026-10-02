import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  if (!user) {
    return errorResponse('Not authenticated', 'UNAUTHENTICATED', 401);
  }

  return successResponse({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      authorProfile: user.authorProfile,
      createdAt: user.createdAt,
    },
  });
}
