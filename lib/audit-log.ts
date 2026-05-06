import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export interface AuditLogInput {
  userId: string;
  action: string;
  table: string;
  recordId: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  success?: boolean;
  error?: string;
}

/**
 * Log an admin action for audit trail
 * Use for: DELETE, PATCH, POST to sensitive tables
 */
export async function logAuditAction(input: AuditLogInput) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId,
        action: input.action,
        table: input.table,
        recordId: input.recordId,
        details: input.details ? JSON.stringify(input.details) : null,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        success: input.success ?? true,
        error: input.error,
      },
    });
  } catch (err) {
    console.error("[audit-log] Failed to log action:", err);
    // Don't throw - audit failures shouldn't break operations
  }
}

/**
 * Helper to extract IP and User-Agent from request
 */
export function getRequestMetadata(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    req.ip ||
    "unknown";

  const userAgent = req.headers.get("user-agent") || undefined;

  return { ip: ip.trim(), userAgent };
}

/**
 * Query audit logs with filters
 */
export async function queryAuditLogs(filters: {
  userId?: string;
  action?: string;
  table?: string;
  limit?: number;
  offset?: number;
}) {
  const limit = Math.min(filters.limit ?? 100, 1000);
  const offset = filters.offset ?? 0;

  const logs = await prisma.auditLog.findMany({
    where: {
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.action && { action: filters.action }),
      ...(filters.table && { table: filters.table }),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
  });

  const total = await prisma.auditLog.count({
    where: {
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.action && { action: filters.action }),
      ...(filters.table && { table: filters.table }),
    },
  });

  return { logs, total, limit, offset };
}
