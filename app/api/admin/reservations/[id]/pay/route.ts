import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await req.json() as { method: "CASH" | "CARD"; amount: number };
    const { method, amount } = body;

    if (!method || !amount || amount <= 0) {
      return NextResponse.json({ ok: false, error: "Parámetros inválidos" }, { status: 400 });
    }

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      select: { id: true, paidAmount: true, totalAmount: true, status: true },
    });
    if (!reservation) {
      return NextResponse.json({ ok: false, error: "Reserva no encontrada" }, { status: 404 });
    }

    const newPaid = Number(reservation.paidAmount) + amount;
    const isPaidInFull = newPaid >= Number(reservation.totalAmount) - 0.01;

    const [updated] = await prisma.$transaction([
      prisma.reservation.update({
        where: { id },
        data: {
          paidAmount: newPaid,
          ...(isPaidInFull && reservation.status === "CHECKED_IN" && { status: "CONFIRMED" }),
        },
        include: {
          customer: { select: { id: true, name: true, phone: true, email: true } },
          event: { select: { id: true, date: true, shift: true } },
          venue: { select: { id: true, name: true } },
        },
      }),
      prisma.paymentSplit.create({
        data: { reservationId: id, method, amount },
      }),
    ]);

    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    console.error("[admin/reservations/pay] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
