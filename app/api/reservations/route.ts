import { ReservationStatus, ReservationType } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  getAmountDueNow,
  getBaseAmountForGuests,
  reservationInputSchema,
  validateServiceDate,
} from "@/lib/reservations";
import { prisma } from "@/lib/prisma";
import { buildRedsysFormData, reservationToOrderId } from "@/lib/redsys";
import { triggerWorkflows } from "@/lib/admin/workflow-engine";

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

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check availability
      const eventRecord = await tx.event.findUnique({
        where: {
          date_shift: {
            date: serviceDate,
            shift: parsed.data.shift,
          },
        },
      });

      const currentTotal = eventRecord?.totalGuests ?? 0;
      const remaining = 40 - currentTotal;
      const requested = parsed.data.guests;

      let canBook = requested <= remaining;

      // Flexibility rule: if remaining is 1, 2 or 3, allow requested == remaining + 1
      if (!canBook && remaining >= 1 && remaining <= 3 && requested === remaining + 1) {
        canBook = true;
      }

      if (!canBook) {
        throw new Error("EVENT_FULL");
      }

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
          totalGuests: requested,
        },
        update: {
          totalGuests: { increment: requested },
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

    const amountDue = getAmountDueNow(totalAmount);
    const orderId = reservationToOrderId(result.reservation.id);
    const redsysData = buildRedsysFormData(amountDue, orderId);

    // Trigger automation workflows
    await triggerWorkflows("RESERVATION_CREATED", result.reservation.id);

    return NextResponse.json(
      {
        ok: true,
        reservationId: result.reservation.id,
        eventId: result.event.id,
        totalAmount,
        amountDue,
        redsysData,
      },
      { status: 201 },
    );
  } catch (err: any) {
    if (err.message === "EVENT_FULL") {
      return NextResponse.json(
        { ok: false, error: "Lo sentimos, el aforo para este turno está completo." },
        { status: 400 },
      );
    }
    console.error("[api/reservations] POST error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno al procesar la reserva" },
      { status: 500 },
    );
  }
}
