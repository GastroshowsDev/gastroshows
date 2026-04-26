import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Nightly cron: move CHECKED_IN reservations from past event dates → CONFIRMED.
 *
 * Runs at 03:00 UTC (05:00 CET / 04:00 CEST), safely after any restaurant
 * service has ended. Vercel Cron invokes this with the CRON_SECRET header.
 */
export async function GET(req: NextRequest) {
  const secret = req.headers.get("authorization");
  if (secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // "today" at UTC midnight — anything with an event date strictly before
  // this is a past-day reservation that should no longer show as CHECKED_IN.
  const todayUtc = new Date();
  todayUtc.setUTCHours(0, 0, 0, 0);

  const { count } = await prisma.reservation.updateMany({
    where: {
      status: "CHECKED_IN",
      event: {
        date: { lt: todayUtc },
      },
    },
    data: { status: "CONFIRMED" },
  });

  return NextResponse.json({ ok: true, updatedCount: count });
}
