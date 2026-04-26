import { ReservationStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { status: ReservationStatus.PENDING },
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          select: { id: true, name: true, phone: true, email: true, comments: true },
        },
        event: { select: { id: true, date: true, shift: true } },
        venue: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ ok: true, data: reservations });
  } catch (err) {
    console.error("[api] GET /admin/reservations/pending failed:", err);
    return NextResponse.json({ ok: false, error: "Error fetching pending reservations" }, { status: 500 });
  }
}
