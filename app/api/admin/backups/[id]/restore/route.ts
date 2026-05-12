import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST /api/admin/backups/[id]/restore
 * Restores the database state from a backup record.
 * WARNING: This is a destructive operation.
 */
export async function POST(req: NextRequest, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const backup = await prisma.backup.findUnique({ where: { id } });
    
    if (!backup?.data) {
      return NextResponse.json({ ok: false, error: "Backup data not found" }, { status: 404 });
    }

    const { tables } = backup.data as any;
    if (!tables) {
      return NextResponse.json({ ok: false, error: "Invalid backup format" }, { status: 400 });
    }

    // Execute restore in a heavy transaction
    await prisma.$transaction(async (tx) => {
      // 1. Delete current data in reverse order of dependency
      // (Simplified list based on lib/admin/backup.ts)
      await tx.pageBlock.deleteMany({});
      await tx.page.deleteMany({});
      await tx.reservation.deleteMany({});
      await tx.event.deleteMany({});
      await tx.venue.deleteMany({});
      await tx.customer.deleteMany({});
      await tx.giftVoucher.deleteMany({});
      await tx.paymentSplit.deleteMany({});
      await tx.campaign.deleteMany({});
      await tx.emailTemplate.deleteMany({});
      
      // 2. Re-insert data from backup
      if (tables.customers) await tx.customer.createMany({ data: tables.customers });
      if (tables.venues) await tx.venue.createMany({ data: tables.venues });
      if (tables.events) await tx.event.createMany({ data: tables.events });
      if (tables.reservations) await tx.reservation.createMany({ data: tables.reservations });
      if (tables.giftVouchers) await tx.giftVoucher.createMany({ data: tables.giftVouchers });
      if (tables.paymentSplits) await tx.paymentSplit.createMany({ data: tables.paymentSplits });
      if (tables.campaigns) await tx.campaign.createMany({ data: tables.campaigns });
      if (tables.emailTemplates) await tx.emailTemplate.createMany({ data: tables.emailTemplates });
      
      // Handle pages and pageBlocks (added in latest update)
      if (tables.pages) await tx.page.createMany({ data: tables.pages });
      if (tables.pageBlocks) await tx.pageBlock.createMany({ data: tables.pageBlocks });
    }, {
      timeout: 30000 // 30s timeout for large restores
    });

    return NextResponse.json({ ok: true, message: "Restauración completada con éxito" });
  } catch (err) {
    console.error("[restore] Failed:", err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error desconocido" }, { status: 500 });
  }
}
