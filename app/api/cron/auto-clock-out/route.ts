import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  // Verify cron secret if configured
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    const openLogs = await prisma.timeLog.findMany({
      where: { clockOut: null },
    });

    if (openLogs.length === 0) {
      return NextResponse.json({ ok: true, message: "No open logs to close." });
    }

    // Update all open logs, setting autoClockedOut to true
    await prisma.timeLog.updateMany({
      where: { clockOut: null },
      data: {
        clockOut: now,
        autoClockedOut: true,
      },
    });

    return NextResponse.json({ 
      ok: true, 
      message: `Closed ${openLogs.length} logs automatically.` 
    });
  } catch (error) {
    console.error("Auto clock-out error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
