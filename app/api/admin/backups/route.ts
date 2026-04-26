import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createBackup } from "@/lib/admin/backup";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") return null;
  return session;
}

export async function GET() {
  const session = await assertAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

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
  const session = await assertAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

  const email = session.user?.email ?? "admin";

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
