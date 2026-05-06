import { ReservationStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth/next";

import { prisma } from "@/lib/prisma";
import { mailrelaySubscribe } from "@/lib/mailrelay";
import { requireAdmin, requireStaff } from "@/lib/auth-helpers";
import { authOptions } from "@/lib/auth";
import { apiErrorResponse } from "@/lib/api-errors";

const paramsSchema = z.object({ id: z.string().min(1) });

const patchSchema = z.object({
  status: z.nativeEnum(ReservationStatus).optional(),
  venueName: z.union([z.string().min(1), z.null()]).optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, context: RouteContext) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;

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
  try {
    const auth = await requireAdmin();
    if (!auth.ok) return auth.response;

    const maybeParams = paramsSchema.safeParse(await context.params);
    if (!maybeParams.success) {
      return NextResponse.json({ ok: false, error: "Invalid id param" }, { status: 400 });
    }

    const reservationId = maybeParams.data.id;
    console.log(`[PATCH /api/reservations/:id] Attempting to update reservation ID: ${reservationId}`);

    let payload: any;
    try {
      payload = await request.json();
    } catch (e) {
      console.error("[PATCH] JSON parse error:", e);
      return NextResponse.json(
        { ok: false, error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    console.log("[PATCH /api/reservations/:id] Payload received:", payload);

    const parsed = patchSchema.safeParse(payload);
    if (!parsed.success) {
      console.error("[PATCH /api/reservations/:id] Validation error:", parsed.error.flatten());
      return NextResponse.json(
        { ok: false, error: "Invalid request body", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    console.log("[PATCH /api/reservations/:id] Parsed data:", parsed.data);

    const updateData: any = {};

    if (parsed.data.status !== undefined) {
      updateData.status = parsed.data.status;
    }

    if (parsed.data.venueName !== undefined) {
      if (parsed.data.venueName === null) {
        updateData.venueId = null;
      } else {
        const venue = await prisma.venue.findUnique({
          where: { name: parsed.data.venueName },
          select: { id: true },
        });
        if (!venue) {
          console.error("[PATCH] Venue not found:", parsed.data.venueName);
          return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });
        }
        updateData.venueId = venue.id;
      }
    }

    console.log("[PATCH /api/reservations/:id] Update data:", updateData);

    // Check if reservation exists first
    const existingReservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!existingReservation) {
      console.error(`[PATCH] Reservation not found with ID: ${reservationId}`);
      return NextResponse.json({ ok: false, error: "Reservation not found" }, { status: 404 });
    }

    const reservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: updateData,
      include: {
        customer: true,
        event: true,
        venue: true,
      },
    });

    // Sync with Mailrelay if confirmed
    if (reservation.status === "CONFIRMED") {
      const eventDate = reservation.event?.date.toISOString().split("T")[0] ?? "";
      const venueMap: Record<string, string> = {
        BERTRAND: "Sarrià-Sant Gervasi",
        URGELL: "Eixample",
      };
      const localAsignado = reservation.venue?.name ? venueMap[reservation.venue.name] : "";

      void mailrelaySubscribe(reservation.customer.email, reservation.customer.name, {
        fecha_evento: eventDate,
        local_asignado: localAsignado,
      });
    }

    return NextResponse.json({ ok: true, data: reservation });
  } catch (error: unknown) {
    const [data, status] = apiErrorResponse(error, "Failed to update reservation");
    return NextResponse.json(data, { status });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

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
    if (existing.eventId) {
      await tx.event.update({
        where: { id: existing.eventId },
        data: { totalGuests: { decrement: existing.guests } },
      });
    }
  });

  return NextResponse.json({ ok: true });
}
