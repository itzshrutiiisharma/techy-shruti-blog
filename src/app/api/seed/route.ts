import { NextRequest } from 'next/server';
import { runSeed } from '@/lib/seed';
import { successResponse, serverErrorResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await runSeed();
    return successResponse({ message: 'Database successfully seeded with realistic sample data.' });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to seed database');
  }
}

export async function GET(req: NextRequest) {
  try {
    await runSeed();
    return successResponse({ message: 'Database successfully seeded with realistic sample data.' });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to seed database');
  }
}
