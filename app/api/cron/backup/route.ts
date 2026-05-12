import { NextResponse } from "next/server";
import { createBackup } from "@/lib/admin/backup";

/**
 * GET /api/cron/backup
 * Triggered by Vercel Cron or other external scheduler.
 */
export async function GET(req: Request) {
  // 1. Security Check
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    console.log("[cron] Starting scheduled backup...");
    const id = await createBackup("SYSTEM_AUTO_CRON");
    console.log(`[cron] Backup completed successfully: ${id}`);
    
    return NextResponse.json({ ok: true, id, message: "Backup programado completado" });
  } catch (error) {
    console.error("[cron] Backup failed:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
