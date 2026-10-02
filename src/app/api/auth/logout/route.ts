import { NextRequest } from 'next/server';
import { successResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  const res = successResponse({ message: 'Logged out successfully' });
  res.cookies.delete('sb_token');
  return res;
}
