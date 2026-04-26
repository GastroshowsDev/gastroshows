/**
 * POST /api/payments/initiate
 *
 * Genera los parámetros firmados para iniciar el pago en Redsys.
 * El frontend recibe { url, Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature }
 * y hace un POST automático al TPV de Redsys.
 *
 * Body: { reservationId: string }
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildRedsysFormData, reservationToOrderId } from "@/lib/redsys";
import { amountDueNow30Pct } from "@/lib/booking";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { reservationId?: string };

    if (!body.reservationId) {
      return NextResponse.json({ ok: false, error: "reservationId requerido" }, { status: 400 });
    }

    const reservation = await prisma.reservation.findUnique({
      where: { id: body.reservationId },
      select: { id: true, totalAmount: true, paidAmount: true, status: true },
    });

    if (!reservation) {
      return NextResponse.json({ ok: false, error: "Reserva no encontrada" }, { status: 404 });
    }

    if (reservation.status === "CONFIRMED" || reservation.status === "CHECKED_IN") {
      return NextResponse.json(
        { ok: false, error: "La reserva ya está confirmada y pagada" },
        { status: 400 },
      );
    }

    if (reservation.status === "CANCELLED") {
      return NextResponse.json({ ok: false, error: "Reserva cancelada" }, { status: 400 });
    }

    const totalAmount = Number(reservation.totalAmount);
    const paidAmount = Number(reservation.paidAmount);
    const deposit = amountDueNow30Pct(totalAmount);
    const amountDue = Math.max(0, deposit - paidAmount);

    if (amountDue <= 0) {
      return NextResponse.json({ ok: false, error: "No hay importe pendiente de pago" }, { status: 400 });
    }

    const orderId = reservationToOrderId(reservation.id);
    const formData = buildRedsysFormData(amountDue, orderId);

    return NextResponse.json({ ok: true, ...formData });
  } catch (err) {
    console.error("[payments/initiate]", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
