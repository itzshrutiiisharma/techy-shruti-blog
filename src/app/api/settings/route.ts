import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hasPermission } from '@/lib/auth';
import { successResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';
import { createAuditLog } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, any> = {};
    settings.forEach((s) => {
      try {
        map[s.key] = JSON.parse(s.value);
      } catch {
        map[s.key] = s.value;
      }
    });

    return successResponse(map);
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to fetch settings');
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorizedResponse();
    if (!hasPermission(user.role, 'ADMIN')) return forbiddenResponse();

    const body = await req.json(); // key-value dictionary

    for (const [key, val] of Object.entries(body)) {
      const stringValue = typeof val === 'string' ? JSON.stringify(val) : JSON.stringify(val);
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: stringValue },
        create: { key, value: stringValue },
      });
    }

    await createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'SETTINGS_UPDATED',
      entity: 'SiteSetting',
      metadata: Object.keys(body),
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return successResponse({ message: 'Settings updated successfully' });
  } catch (err: any) {
    return serverErrorResponse(err, 'Failed to update settings');
  }
}
