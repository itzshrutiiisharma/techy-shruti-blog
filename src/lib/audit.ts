import { prisma } from './prisma';

export async function createAuditLog({
  actorId,
  actorEmail,
  action,
  entity,
  entityId,
  metadata,
  ipAddress,
}: {
  actorId?: string | null;
  actorEmail: string;
  action: string;
  entity: string;
  entityId?: string | null;
  metadata?: any;
  ipAddress?: string | null;
}) {
  try {
    return await prisma.auditLog.create({
      data: {
        actorId,
        actorEmail,
        action,
        entity,
        entityId,
        metadata: metadata ? JSON.stringify(metadata) : null,
        ipAddress,
      },
    });
  } catch (err) {
    console.error('[Audit Log Creation Error]:', err);
    return null;
  }
}
