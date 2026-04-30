/**
 * POST /api/payments/callback
 *
 * Notificación server-to-server de Redsys (DS_MERCHANT_MERCHANTURL).
 * Busca el BookingIntent por orderId, y en caso de pago exitoso crea
 * la Reservation directamente en estado CONFIRMED.
 *
 * IMPORTANTE: esta URL debe ser pública y accesible desde los servidores de Redsys.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRedsysCallback, isRedsysSuccess } from "@/lib/redsys";
import { ReservationStatus, ReservationType } from "@prisma/client";
import { buildEmailQueueSchedule } from "@/lib/booking";
import { triggerWorkflows } from "@/lib/admin/workflow-engine";

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return new NextResponse("KO", { status: 400 });
  }

  const fields = {
    Ds_SignatureVersion:    (formData.get("Ds_SignatureVersion")    as string) ?? "",
    Ds_MerchantParameters: (formData.get("Ds_MerchantParameters") as string) ?? "",
    Ds_Signature:          (formData.get("Ds_Signature")           as string) ?? "",
  };

  const params = verifyRedsysCallback(fields);
  if (!params) {
    console.error("[payments/callback] Firma inválida — posible intento de fraude");
    return new NextResponse("KO", { status: 400 });
  }

  const { Ds_Order, Ds_Amount, Ds_Response, Ds_AuthorisationCode } = params;
  const amountEuros = parseInt(Ds_Amount, 10) / 100;
  const success = isRedsysSuccess(Ds_Response);

  // Direct lookup by orderId stored on BookingIntent (no suffix matching needed)
  const intent = await prisma.bookingIntent.findUnique({
    where: { orderId: Ds_Order },
  });

  if (!intent) {
    console.error("[payments/callback] BookingIntent no encontrado para orden:", Ds_Order);
    return new NextResponse("OK", { status: 200 }); // Respond OK to prevent Redsys retry
  }

  // Idempotency: already processed
  if (intent.status === "COMPLETED") {
    console.warn("[payments/callback] BookingIntent ya completado:", Ds_Order);
    return new NextResponse("OK", { status: 200 });
  }

  // ── Payment failed — spots stay held until TTL expires (retry is possible) ─
  if (!success) {
    try {
      await prisma.bookingIntent.update({
        where: { id: intent.id },
        data: { status: "PAYMENT_FAILED" },
      });
      console.warn(`[payments/callback] Pago fallido — intent ${intent.id}, código ${Ds_Response}`);
    } catch (err) {
      console.error("[payments/callback] Error marcando pago fallido:", err);
    }
    return new NextResponse("OK", { status: 200 });
  }

  // ── Payment success — create Reservation ─────────────────────────────────
  let reservationId: string;
  try {
    const now = new Date();
    reservationId = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.create({
        data: {
          name:          intent.name,
          phone:         intent.phone,
          email:         intent.email,
          allergies:     intent.allergies ?? undefined,
          previousVisit: intent.previousVisit,
          newsletter:    intent.newsletter,
          comments:      intent.comments ?? undefined,
        },
      });

      const reservation = await tx.reservation.create({
        data: {
          type:          ReservationType.NORMAL,
          status:        ReservationStatus.CONFIRMED,
          paymentStatus: intent.payFull ? "COMPLETED" : "PARTIAL",
          customerId:    customer.id,
          eventId:       intent.eventId ?? undefined,
          guests:        intent.guests,
          totalAmount:   intent.totalAmount,
          paidAmount:    amountEuros,
          groupRef:      intent.groupRef ?? undefined,
          isFirstVisit:  intent.isFirstVisit,
        },
      });

      await tx.paymentSplit.create({
        data: { reservationId: reservation.id, method: "CARD", amount: amountEuros },
      });

      const queue = buildEmailQueueSchedule(new Date(intent.date), now);
      if (queue.length > 0) {
        await tx.emailQueue.createMany({
          data: queue.map((item) => ({
            reservationId: reservation.id,
            templateKey:   item.templateKey,
            scheduledAt:   item.scheduledAt,
          })),
        });
      }

      await tx.bookingIntent.update({
        where: { id: intent.id },
        data: { status: "COMPLETED" },
      });

      return reservation.id;
    });

    // Trigger automation workflows outside transaction
    await triggerWorkflows("RESERVATION_CONFIRMED", reservationId);

    console.info(
      `[payments/callback] Pago OK — reserva ${reservationId} creada, ${amountEuros}€, auth ${Ds_AuthorisationCode}`,
    );
  } catch (err) {
    console.error("[payments/callback] Error creando reserva:", err);
    return new NextResponse("KO", { status: 500 });
  }

  return new NextResponse("OK", { status: 200 });
}
