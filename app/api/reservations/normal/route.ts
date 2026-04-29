import { ReservationStatus, ReservationType } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  amountDueNow30Pct,
  buildEmailQueueSchedule,
  calculateTotalAmountWithDiscounts,
  normalReservationSchema,
  validateServiceDate,
} from "@/lib/booking";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = normalReservationSchema.safeParse(payload);
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
  const [activeCampaign, promoConfig] = await Promise.all([
    prisma.campaign.findFirst({
      where: {
        active: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.promotionConfig.findUnique({ where: { id: "default" } }),
  ]);

  const campaignPct = activeCampaign ? Number(activeCampaign.discountPct) : 0;
  const wedThuActive = promoConfig?.wedThuActive ?? false;
  const totalAmount = calculateTotalAmountWithDiscounts(parsed.data.guests, serviceDate, campaignPct, wedThuActive);

  const amountDue = amountDueNow30Pct(totalAmount);

  const created = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        allergies: parsed.data.allergies,
        previousVisit: parsed.data.previousVisit,
        newsletter: parsed.data.newsletter ?? false,
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
        totalGuests: parsed.data.guests,
      },
      update: {
        totalGuests: { increment: parsed.data.guests },
      },
    });

    const reservation = await tx.reservation.create({
      data: {
        type: ReservationType.NORMAL,
        customerId: customer.id,
        eventId: event.id,
        guests: parsed.data.guests,
        status: ReservationStatus.PENDING,
        totalAmount,
        paidAmount: 0,
        groupRef: parsed.data.groupRef,
        isFirstVisit: !parsed.data.previousVisit,
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
      reservationId: created.reservation.id,
      totalAmount,
      amountDue,
      eventId: created.event.id,
    },
    { status: 201 },
  );
}
