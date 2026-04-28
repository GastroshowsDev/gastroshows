import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addDays } from "date-fns";

function todayUtcRange(): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return { start, end: addDays(start, 1) };
}

function weekUtcRange(): { start: Date; end: Date } {
  const now = new Date();
  const dow = now.getUTCDay(); // 0=Sun … 6=Sat
  const diffToMon = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + diffToMon),
  );
  return { start: monday, end: addDays(monday, 7) };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") === "week" ? "week" : "today";
    const { start, end } = range === "week" ? weekUtcRange() : todayUtcRange();

    const reservations = await prisma.reservation.findMany({
      where: {
        status: { notIn: ["CANCELLED"] },
        event: { date: { gte: start, lt: end } },
        customer: {
          OR: [{ allergies: { not: null } }, { comments: { not: null } }],
        },
      },
      orderBy: [{ event: { date: "asc" } }, { event: { shift: "asc" } }],
      select: {
        id: true,
        guests: true,
        status: true,
        customer: { select: { name: true, allergies: true, comments: true } },
        event: { select: { date: true, shift: true } },
        venue: { select: { name: true } },
      },
    });

    const data = reservations
      .filter((r) => r.customer.allergies?.trim() || r.customer.comments?.trim())
      .map((r) => ({
        id: r.id,
        customerName: r.customer.name,
        guests: r.guests,
        status: r.status,
        allergies: r.customer.allergies?.trim() || null,
        comments: r.customer.comments?.trim() || null,
        eventDate: r.event?.date.toISOString() ?? "",
        shift: r.event?.shift ?? "",

        venueName: r.venue?.name ?? null,
      }));

    return NextResponse.json({ ok: true, range, data });
  } catch (err) {
    console.error("[allergies] GET error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
