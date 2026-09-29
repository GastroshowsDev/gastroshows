import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-helpers";

function todayRange(now: Date): { start: Date; end: Date } {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

// GET /api/admin/pos/diners?venueId= → comensales del servicio de hoy en esa sala:
// reservas CONFIRMED/CHECKED_IN (por evento de hoy o visitDate de hoy) con sus
// comandas del día y totales. La unidad es la reserva (titular), no la mesa.
export async function GET(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const venueId = searchParams.get("venueId");
  if (!venueId) {
    return NextResponse.json({ ok: false, error: "venueId requerido" }, { status: 400 });
  }

  try {
    const { start, end } = todayRange(new Date());

    const reservations = await prisma.reservation.findMany({
      where: {
        venueId,
        status: { in: ["CONFIRMED", "CHECKED_IN"] },
        OR: [
          { event: { date: { gte: start, lt: end } } },
          { visitDate: { gte: start, lt: end } },
        ],
      },
      orderBy: { updatedAt: "desc" },
      take: 300,
      include: {
        customer: { select: { id: true, name: true, phone: true, email: true } },
        event: { select: { id: true, date: true, shift: true } },
        posOrders: {
          where: {
            status: { not: "CANCELLED" },
            createdAt: { gte: start, lt: end },
          },
          include: { lines: true },
        },
      },
    });

    const diners = reservations.map((r) => {
      const total = r.posOrders.reduce(
        (sum, o) => sum + o.lines.reduce((s, l) => s + Number(l.unitPrice) * l.qty, 0),
        0,
      );
      const openCount = r.posOrders.filter((o) => o.status === "OPEN").length;
      return {
        reservationId: r.id,
        name: r.customer.name,
        phone: r.customer.phone,
        guests: r.guests,
        status: r.status,
        visitTime: r.visitTime,
        event: r.event ? { id: r.event.id, shift: r.event.shift } : null,
        openOrders: openCount,
        total,
      };
    });

    const roomTotal = diners.reduce((s, d) => s + d.total, 0);

    return NextResponse.json({ ok: true, data: { diners, roomTotal, count: diners.length } });
  } catch (err) {
    console.error("[pos/diners] GET error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
