import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ReservationStatus, ReservationType, Shift, VenueName } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      name: string;
      email: string;
      phone: string;
      allergies?: string;
      previousVisit?: boolean;
      comments?: string;
      date: string;
      shift: Shift;
      venueName?: VenueName | null;
      guests: number;
      type?: ReservationType;
      totalAmount: number;
      paidAmount?: number;
      status?: ReservationStatus;
    };

    const serviceDate = new Date(body.date);

    const existing = await prisma.customer.findFirst({ where: { email: body.email }, select: { id: true } });
    const customer = existing
      ? await prisma.customer.update({
          where: { id: existing.id },
          data: {
            name: body.name,
            phone: body.phone,
            ...(body.allergies !== undefined && { allergies: body.allergies }),
            ...(body.previousVisit !== undefined && { previousVisit: body.previousVisit }),
            ...(body.comments !== undefined && { comments: body.comments }),
          },
        })
      : await prisma.customer.create({
          data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
            allergies: body.allergies ?? null,
            previousVisit: body.previousVisit ?? false,
            comments: body.comments ?? null,
          },
        });

    const event = await prisma.event.upsert({
      where: { date_shift: { date: serviceDate, shift: body.shift } },
      update: {},
      create: { date: serviceDate, shift: body.shift, totalGuests: 0 },
    });

    let venueId: string | null = null;
    if (body.venueName) {
      const venue = await prisma.venue.findUnique({ where: { name: body.venueName }, select: { id: true } });
      venueId = venue?.id ?? null;
    }

    const reservation = await prisma.reservation.create({
      data: {
        type: body.type ?? ReservationType.NORMAL,
        customerId: customer.id,
        eventId: event.id,
        venueId,
        guests: body.guests,
        totalAmount: body.totalAmount,
        paidAmount: body.paidAmount ?? 0,
        status: body.status ?? ReservationStatus.PENDING,
        isFirstVisit: !body.previousVisit,
      },
      include: {
        customer: { select: { id: true, name: true, email: true, phone: true, allergies: true } },
        event: { select: { id: true, date: true, shift: true } },
        venue: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ ok: true, data: reservation });
  } catch (err) {
    console.error("[api] POST /admin/reservations failed:", err);
    return NextResponse.json({ ok: false, error: "Error creating reservation" }, { status: 500 });
  }
}
