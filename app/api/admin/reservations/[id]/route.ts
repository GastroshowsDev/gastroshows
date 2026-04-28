import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ReservationStatus, ReservationType, Shift, VenueName } from "@prisma/client";
import { mailrelaySubscribe } from "@/lib/mailrelay";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await req.json() as {
      name?: string; phone?: string; allergies?: string;
      previousVisit?: boolean; comments?: string;
      date?: string; shift?: Shift;
      venueName?: VenueName | null;
      guests?: number; type?: ReservationType;
      totalAmount?: number; paidAmount?: number;
      status?: ReservationStatus;
    };

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { customer: true, event: true },
    });
    if (!reservation) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    // Update customer fields
    if (body.name || body.phone || body.allergies !== undefined || body.previousVisit !== undefined || body.comments !== undefined) {
      await prisma.customer.update({
        where: { id: reservation.customerId },
        data: {
          ...(body.name && { name: body.name }),
          ...(body.phone && { phone: body.phone }),
          ...(body.allergies !== undefined && { allergies: body.allergies }),
          ...(body.previousVisit !== undefined && { previousVisit: body.previousVisit }),
          ...(body.comments !== undefined && { comments: body.comments }),
        },
      });
    }

    // Resolve venue
    let venueId: string | null | undefined = undefined;
    if (body.venueName !== undefined) {
      if (body.venueName === null) {
        venueId = null;
      } else {
        const venue = await prisma.venue.findUnique({ where: { name: body.venueName }, select: { id: true } });
        venueId = venue?.id ?? null;
      }
    }

    // Update event date/shift if changed
    if (body.date || body.shift) {
      const newDate = body.date ? new Date(body.date) : (reservation.event?.date ?? new Date());
      const newShift = body.shift ?? (reservation.event?.shift ?? "NIGHT");
      const event = await prisma.event.upsert({
        where: { date_shift: { date: newDate, shift: newShift } },
        update: {},
        create: { date: newDate, shift: newShift, totalGuests: 0 },
      });
      await prisma.reservation.update({ where: { id }, data: { eventId: event.id } });
    }

    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        ...(body.guests !== undefined && { guests: body.guests }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.totalAmount !== undefined && { totalAmount: body.totalAmount }),
        ...(body.paidAmount !== undefined && { paidAmount: body.paidAmount }),
        ...(body.status !== undefined && { status: body.status }),
        ...(venueId !== undefined && { venueId }),
      },
      include: {
        customer: { select: { id: true, name: true, email: true, phone: true, allergies: true } },
        event: { select: { id: true, date: true, shift: true } },
        venue: { select: { id: true, name: true } },
      },
    });

    // Sync with Mailrelay if confirmed
    if (updated.status === "CONFIRMED") {
      const eventDate = updated.event?.date.toISOString().split("T")[0] ?? "";
      const venueMap: Record<string, string> = {
        BERTRAND: "Sarrià-Sant Gervasi",
        URGELL: "Eixample",
      };
      const localAsignado = updated.venue?.name ? venueMap[updated.venue.name] : "";

      void mailrelaySubscribe(updated.customer.email, updated.customer.name, {
        fecha_evento: eventDate,
        local_asignado: localAsignado,
      });
    }

    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    console.error("[api] PATCH /admin/reservations/[id] failed:", err);
    return NextResponse.json({ ok: false, error: "Error updating reservation" }, { status: 500 });
  }
}
