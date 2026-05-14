import { Shift } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  getRecentReservationsForLive,
  getReservationsForServiceDay,
} from "@/lib/admin/live-data";
import { requireStaff } from "@/lib/auth-helpers";

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(40),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  shift: z.nativeEnum(Shift).optional(),
});

export async function GET(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    limit: searchParams.get("limit") ?? undefined,
    eventDate: searchParams.get("eventDate") ?? undefined,
    shift: searchParams.get("shift") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid query", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { limit, eventDate, shift } = parsed.data;

  if (eventDate && shift) {
    const reservations = await getReservationsForServiceDay(eventDate, shift);
    if (reservations === null) {
      return NextResponse.json({ ok: false, error: "Invalid eventDate" }, { status: 400 });
    }

    return NextResponse.json({ ok: true, scope: "event", data: reservations });
  }

  const reservations = await getRecentReservationsForLive(limit);

  return NextResponse.json({ ok: true, scope: "recent", data: reservations });
}
