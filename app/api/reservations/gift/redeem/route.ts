import { ReservationStatus, ReservationType } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  buildEmailQueueSchedule,
  giftRedeemSchema,
  validateServiceDate,
} from "@/lib/booking";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = giftRedeemSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const serviceDate = new Date(parsed.data.date);
  const dateError = validateServiceDate(serviceDate, parsed.data.shift);
  if (dateError) {
    return NextResponse.json({ ok: false, error: dateError }, { status: 400 });
  }

  const now = new Date();
  const voucher = await prisma.giftVoucher.findUnique({
    where: { token: parsed.data.token },
  });

  if (!voucher) {
    return NextResponse.json({ ok: false, error: "Voucher token not found" }, { status: 404 });
  }
  if (voucher.redeemedAt) {
    return NextResponse.json({ ok: false, error: "Voucher already redeemed" }, { status: 409 });
  }
  if (voucher.expiresAt < now) {
    return NextResponse.json({ ok: false, error: "Voucher expired" }, { status: 410 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        allergies: parsed.data.allergies,
        previousVisit: parsed.data.previousVisit,
        comments: (parsed.data.previousVisit && parsed.data.previousBarrio
          ? `[Local: ${parsed.data.previousBarrio === "EIXAMPLE" ? "Eixample" : "Sarrià"}] `
          : "") + (parsed.data.comments || ""),
      },
    });

    const event = await tx.event.upsert({
      where: {
        date_shift: {
          date: serviceDate,
          shift: parsed.data.shift,
        },
      },
      create: {
        date: serviceDate,
        shift: parsed.data.shift,
        totalGuests: voucher.guests,
      },
      update: {
        totalGuests: { increment: voucher.guests },
      },
    });

    const reservation = await tx.reservation.create({
      data: {
        type: ReservationType.GIFT,
        status: ReservationStatus.CONFIRMED,
        customerId: customer.id,
        eventId: event.id,
        guests: voucher.guests,
        totalAmount: voucher.totalAmount,
        paidAmount: voucher.totalAmount,
        isFirstVisit: !parsed.data.previousVisit,
      },
    });

    await tx.giftVoucher.update({
      where: { id: voucher.id },
      data: {
        redeemedAt: now,
        reservationId: reservation.id,
      },
    });

    const queue = buildEmailQueueSchedule(serviceDate, now);
    if (queue.length > 0) {
      await tx.emailQueue.createMany({
        data: queue.map((item) => ({
          reservationId: reservation.id,
          templateKey: item.templateKey,
          scheduledAt: item.scheduledAt,
        })),
      });
    }

    return { reservation, event };
  });

  return NextResponse.json(
    {
      ok: true,
      reservationId: result.reservation.id,
      eventId: result.event.id,
      message: "Reserva confirmada",
    },
    { status: 201 },
  );
}
