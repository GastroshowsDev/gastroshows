import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePosOperator } from "@/lib/tpv-auth";

// POST /api/admin/pos/quick-reservation { name, guests, venueId, shift? }
export async function POST(request: Request) {
  const auth = await requirePosOperator(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as {
      name?: string; guests?: number; venueId?: string; shift?: "NOON" | "NIGHT";
    };
    const name = body.name?.trim();
    const guests = Math.floor(Number(body.guests));
    const venueId = body.venueId?.trim();
    const shift = body.shift === "NOON" ? "NOON" : "NIGHT";

    if (!name || !Number.isFinite(guests) || guests < 1 || guests > 60 || !venueId) {
      return NextResponse.json(
        { ok: false, error: "Nombre, comensales (1-60) y sala requeridos" },
        { status: 400 },
      );
    }

    const venue = await prisma.venue.findUnique({ where: { id: venueId }, select: { id: true } });
    if (!venue) {
      return NextResponse.json({ ok: false, error: "Sala no válida" }, { status: 400 });
    }

    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const event = await prisma.event.findFirst({
      where: { shift, date: { gte: start, lt: end } },
      select: { id: true },
    });

    const stamp = Date.now().toString(36);
    const customer = await prisma.customer.create({
      data: {
        name,
        phone: "TPV",
        email: `tpv+${stamp}@gastroshows.local`,
        source: "TPV",
        comments: "Comensal TPV sin reserva previa (reserva rápida)",
      },
      select: { id: true, name: true },
    });

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const reservation = await prisma.reservation.create({
      data: {
        type: "NORMAL",
        status: "CONFIRMED",
        customerId: customer.id,
        eventId: event?.id ?? null,
        venueId,
        guests,
        totalAmount: "0",
        paidAmount: "0",
        visitDate: now,
        visitTime: `${hh}:${mm}`,
        source: "TPV",
        comments: "Reserva rápida TPV",
      },
      include: { customer: { select: { id: true, name: true, phone: true } } },
    });

    return NextResponse.json({ ok: true, data: reservation }, { status: 201 });
  } catch (err) {
    console.error("[pos/quick-reservation] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
