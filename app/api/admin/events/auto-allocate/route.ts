import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateVenueSplit } from "@/lib/admin/allocation-utils";
import { VenueName } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { from, to } = await request.json();
    
    if (!from || !to) {
      return NextResponse.json({ error: "Faltan fechas" }, { status: 400 });
    }

    // 1. Get venues
    const venues = await prisma.venue.findMany();
    const bertrandVenue = venues.find(v => v.name === VenueName.BERTRAND);
    const urgellVenue = venues.find(v => v.name === VenueName.URGELL);

    if (!bertrandVenue || !urgellVenue) {
      return NextResponse.json({ error: "Locales no configurados correctamente" }, { status: 500 });
    }

    // 2. Get events in range
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date(from),
          lte: new Date(to),
        }
      },
      include: {
        reservations: {
          where: { status: { in: ["PENDING", "CONFIRMED", "CHECKED_IN"] } }
        }
      }
    });

    const results = [];

    for (const event of events) {
      const totalGuests = event.reservations.reduce((sum, r) => sum + r.guests, 0);
      const split = calculateVenueSplit(totalGuests);

      // Allocation Strategy:
      // We need to fill 'split.bertrand' using only even-sized groups if possible.
      // 1. Sort reservations: Even groups first, then larger to smaller.
      const sorted = [...event.reservations].sort((a, b) => {
        const aEven = a.guests % 2 === 0;
        const bEven = b.guests % 2 === 0;
        if (aEven && !bEven) return -1;
        if (!aEven && bEven) return 1;
        return b.guests - a.guests;
      });

      let currentBertrand = 0;
      const bertrandIds: string[] = [];
      const urgellIds: string[] = [];

      for (const res of sorted) {
        // Can we put this in Bertrand?
        // Rule: Bertrand only takes even groups (unless manual override).
        const isEven = res.guests % 2 === 0;
        if (isEven && currentBertrand + res.guests <= split.bertrand) {
          bertrandIds.push(res.id);
          currentBertrand += res.guests;
        } else {
          urgellIds.push(res.id);
        }
      }

      // Update in DB
      if (bertrandIds.length > 0) {
        await prisma.reservation.updateMany({
          where: { id: { in: bertrandIds } },
          data: { venueId: bertrandVenue.id }
        });
      }
      if (urgellIds.length > 0) {
        await prisma.reservation.updateMany({
          where: { id: { in: urgellIds } },
          data: { venueId: urgellVenue.id }
        });
      }

      results.push({
        event: `${event.date.toISOString().split("T")[0]} ${event.shift}`,
        totalGuests,
        split,
        assignedBertrand: currentBertrand,
        assignedUrgell: totalGuests - currentBertrand
      });
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error("[auto-allocate] Error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
