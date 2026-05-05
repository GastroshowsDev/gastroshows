import type { Prisma, Shift } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { LiveReservationRow } from "@/types/live-reservation";

import { utcDayRange } from "./service-day";

const includeBlock = {
  customer: { select: { id: true, name: true, phone: true, email: true } },
  event: { select: { id: true, date: true, shift: true } },
  venue: { select: { id: true, name: true } },
} as const;

export type ReservationLivePayload = Prisma.ReservationGetPayload<{
  include: typeof includeBlock;
}>;

export async function getRecentReservationsForLive(limit: number) {
  return prisma.reservation.findMany({
    where: {
      status: { notIn: ["CHECKED_IN"] },
      NOT: { status: "PENDING", type: { not: "VISIT" } },
    },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: includeBlock,
  });
}

export async function getReservationsForServiceDay(eventDateYmd: string, shift: Shift) {
  const range = utcDayRange(eventDateYmd);
  if (!range) return null;

  return prisma.reservation.findMany({
    where: {
      event: {
        shift,
        date: { gte: range.start, lt: range.end },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 200,
    include: includeBlock,
  });
}

export function toLiveReservationRow(row: ReservationLivePayload): LiveReservationRow {
  return {
    id: row.id,
    type: row.type,
    status: row.status,
    guests: row.guests,
    totalAmount: Number(row.totalAmount),
    paidAmount: Number(row.paidAmount),
    updatedAt: row.updatedAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
    customer: row.customer,
    event: row.event ? {
      id: row.event.id,
      date: row.event.date.toISOString(),
      shift: row.event.shift,
    } : null,
    venue: row.venue ? { id: row.venue.id, name: row.venue.name } : null,

  };
}

export async function getCheckedInReservations() {
  return prisma.reservation.findMany({
    where: { status: "CHECKED_IN" },
    orderBy: { updatedAt: "asc" },
    include: includeBlock,
  });
}

export function toLiveReservationRows(rows: ReservationLivePayload[]): LiveReservationRow[] {
  return rows.map(toLiveReservationRow);
}
