/**
 * POST /api/payments/callback
 *
 * Notificación server-to-server de Redsys (DS_MERCHANT_MERCHANTURL).
 * Redsys hace POST con form-data. Verificamos firma, actualizamos la reserva
 * y respondemos "OK" (200) o "KO" (error).
 *
 * IMPORTANTE: esta URL debe ser pública y accesible desde los servidores de Redsys.
 * Configurar en Redsys back-office y en REDSYS_NOTIFICATION_URL.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyRedsysCallback,
  isRedsysSuccess,
  orderIdToReservationSuffix,
} from "@/lib/redsys";

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return new NextResponse("KO", { status: 400 });
  }

  const fields = {
    Ds_SignatureVersion: (formData.get("Ds_SignatureVersion") as string) ?? "",
    Ds_MerchantParameters: (formData.get("Ds_MerchantParameters") as string) ?? "",
    Ds_Signature: (formData.get("Ds_Signature") as string) ?? "",
  };

  const params = verifyRedsysCallback(fields);
  if (!params) {
    console.error("[payments/callback] Firma inválida — posible intento de fraude");
    return new NextResponse("KO", { status: 400 });
  }

  const { Ds_Order, Ds_Amount, Ds_Response, Ds_AuthorisationCode } = params;
  const amountEuros = parseInt(Ds_Amount, 10) / 100;
  const success = isRedsysSuccess(Ds_Response);

  // Buscar reserva por el sufijo codificado en el orderId
  const suffix = orderIdToReservationSuffix(Ds_Order);
  const pending = await prisma.reservation.findMany({
    where: { status: { in: ["PENDING", "PAYMENT_FAILED"] } },
    select: { id: true, totalAmount: true, paidAmount: true },
  });

  const reservation = pending.find(
    (r) => r.id.replace(/[^a-z0-9]/gi, "").slice(-8).toUpperCase() === suffix,
  );

  if (!reservation) {
    console.error("[payments/callback] Reserva no encontrada para orden:", Ds_Order);
    // Respondemos OK a Redsys para que no reintente; logamos el error para revisar manualmente
    return new NextResponse("OK", { status: 200 });
  }

  try {
    if (success) {
      const newPaid = Number(reservation.paidAmount) + amountEuros;
      await prisma.$transaction([
        prisma.reservation.update({
          where: { id: reservation.id },
          data: { paidAmount: newPaid, status: "CONFIRMED" },
        }),
        prisma.paymentSplit.create({
          data: {
            reservationId: reservation.id,
            method: "CARD",
            amount: amountEuros,
          },
        }),
      ]);
      console.info(
        `[payments/callback] Pago OK — reserva ${reservation.id}, importe ${amountEuros}€, auth ${Ds_AuthorisationCode}`,
      );
    } else {
      await prisma.reservation.update({
        where: { id: reservation.id },
        data: { status: "PAYMENT_FAILED" },
      });
      console.warn(
        `[payments/callback] Pago fallido — reserva ${reservation.id}, código ${Ds_Response}`,
      );
    }
  } catch (err) {
    console.error("[payments/callback] Error actualizando DB:", err);
    return new NextResponse("KO", { status: 500 });
  }

  return new NextResponse("OK", { status: 200 });
}
