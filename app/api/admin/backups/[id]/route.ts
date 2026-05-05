import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

// GET /api/admin/backups/[id] → descarga el backup como fichero JSON
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await params;
  const backup = await prisma.backup.findUnique({ where: { id } });
  if (!backup?.data) return NextResponse.json({ ok: false, error: "No encontrado" }, { status: 404 });

  const date = backup.createdAt.toISOString().slice(0, 10);
  const filename = `backup_gastroshows_${date}_${id.slice(0, 8)}.json`;
  const json = JSON.stringify(backup.data, null, 2);

  return new NextResponse(json, {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

// DELETE /api/admin/backups/[id] → elimina el backup
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await params;
  await prisma.backup.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
