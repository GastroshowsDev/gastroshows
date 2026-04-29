/**
 * POST /api/payments/retry-intent
 *
 * Genera un nuevo orderId para reintentar el pago de un BookingIntent fallido.
 * Redsys requiere un orderId único por intento — no se puede reutilizar el anterior.
 *
 * Body: { intentId: string }
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildRedsysFormData, reservationToOrderId } from "@/lib/redsys";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { intentId?: string };
    if (!body.intentId) {
      return NextResponse.json({ ok: false, error: "intentId requerido" }, { status: 400 });
    }

    const intent = await prisma.bookingIntent.findUnique({
      where: { id: body.intentId },
    });

    if (!intent) {
      return NextResponse.json({ ok: false, error: "Intento de reserva no encontrado" }, { status: 404 });
    }

    if (intent.status === "COMPLETED") {
      return NextResponse.json({ ok: false, error: "Este pago ya fue completado" }, { status: 400 });
    }

    if (intent.status === "EXPIRED") {
      return NextResponse.json({ ok: false, error: "Este intento ha expirado. Por favor realiza una nueva reserva." }, { status: 410 });
    }

    // Generate a fresh orderId for this retry
    const seed = `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
    const newOrderId = reservationToOrderId(seed);

    await prisma.bookingIntent.update({
      where: { id: intent.id },
      data: {
        orderId: newOrderId,
        status: "AWAITING_PAYMENT",
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    const redsysData = buildRedsysFormData(Number(intent.amountDue), newOrderId);

    return NextResponse.json({ ok: true, redsysData });
  } catch (err) {
    console.error("[payments/retry-intent]", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
