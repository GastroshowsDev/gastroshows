import { ReservationStatus, VenueName } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const paramsSchema = z.object({ id: z.string().min(1) });

const patchSchema = z.object({
  status: z.nativeEnum(ReservationStatus).optional(),
  venueName: z.nativeEnum(VenueName).nullable().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, context: RouteContext) {
  const maybeParams = paramsSchema.safeParse(await context.params);
  if (!maybeParams.success) {
    return NextResponse.json({ ok: false, error: "Invalid id param" }, { status: 400 });
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id: maybeParams.data.id },
    include: {
      customer: true,
      event: true,
      venue: true,
      paymentSplits: true,
      emailQueue: true,
    },
  });

  if (!reservation) {
    return NextResponse.json({ ok: false, error: "Reservation not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: reservation });
}

export async function PATCH(request: Request, context: RouteContext) {
  const maybeParams = paramsSchema.safeParse(await context.params);
  if (!maybeParams.success) {
    return NextResponse.json({ ok: false, error: "Invalid id param" }, { status: 400 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  let venueId: string | null | undefined;
  if (parsed.data.venueName !== undefined) {
    if (parsed.data.venueName === null) {
      venueId = null;
    } else {
      const venue = await prisma.venue.findUnique({
        where: { name: parsed.data.venueName },
        select: { id: true },
      });
      if (!venue) {
        return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });
      }
      venueId = venue.id;
    }
  }

  const reservation = await prisma.reservation.update({
    where: { id: maybeParams.data.id },
    data: {
      status: parsed.data.status,
      venueId,
    },
    include: {
      customer: true,
      event: true,
      venue: true,
    },
  });

  return NextResponse.json({ ok: true, data: reservation });
}

export async function DELETE(_: Request, context: RouteContext) {
  const maybeParams = paramsSchema.safeParse(await context.params);
  if (!maybeParams.success) {
    return NextResponse.json({ ok: false, error: "Invalid id param" }, { status: 400 });
  }

  const existing = await prisma.reservation.findUnique({
    where: { id: maybeParams.data.id },
    include: { event: true },
  });

  if (!existing) {
    return NextResponse.json({ ok: false, error: "Reservation not found" }, { status: 404 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.reservation.delete({ where: { id: maybeParams.data.id } });
    await tx.event.update({
      where: { id: existing.eventId },
      data: { totalGuests: { decrement: existing.guests } },
    });
  });

  return NextResponse.json({ ok: true });
}
