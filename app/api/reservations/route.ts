import { ReservationStatus, ReservationType } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  getAmountDueNow,
  getBaseAmountForGuests,
  reservationInputSchema,
  validateServiceDate,
} from "@/lib/reservations";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      customer: true,
      event: true,
      venue: true,
      paymentSplits: true,
    },
  });

  return NextResponse.json({ ok: true, data: reservations });
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = reservationInputSchema.safeParse(json);

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

  const totalAmount = getBaseAmountForGuests(parsed.data.guests, serviceDate);

  const result = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        allergies: parsed.data.allergies,
        previousVisit: parsed.data.previousVisit,
        comments: parsed.data.comments,
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
        status: ReservationStatus.PENDING,
        customerId: customer.id,
        eventId: event.id,
        guests: parsed.data.guests,
        totalAmount,
        isFirstVisit: !parsed.data.previousVisit,
        groupRef: parsed.data.groupRef,
      },
    });

    return { customer, event, reservation };
  });

  return NextResponse.json(
    {
      ok: true,
      reservationId: result.reservation.id,
      eventId: result.event.id,
      totalAmount,
      amountDue: getAmountDueNow(totalAmount),
    },
    { status: 201 },
  );
}
