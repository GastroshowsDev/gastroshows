import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createBackup } from "@/lib/admin/backup";
import { requireAdmin } from "@/lib/auth-helpers";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const backups = await prisma.backup.findMany({
    select: {
      id: true, createdAt: true, triggeredBy: true,
      status: true, sizeBytes: true, rowCount: true, error: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ ok: true, data: backups });
}

export async function POST() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const email = auth.session.user?.email ?? "admin";

  try {
    const id = await createBackup(email);
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Backup fallido" },
      { status: 500 },
    );
  }
}
