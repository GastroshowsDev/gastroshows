import { NextRequest, NextResponse } from "next/server";
import { createBackup } from "@/lib/admin/backup";

// Llamado por Vercel Cron cada día a las 02:00 hora peninsular (01:00 UTC)
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = await createBackup("auto");
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Backup fallido" },
      { status: 500 },
    );
  }
}
