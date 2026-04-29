import { Shift } from "@prisma/client";
import { addDays, getDay, subDays } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { z } from "zod";

const BARCELONA_TZ = "Europe/Madrid";
const BASE_PRICE_PER_GUEST = 130;
const WED_THU_DISCOUNT_PCT = 20;

export const normalReservationSchema = z.object({
  date: z.string().datetime(),
  shift: z.nativeEnum(Shift),
  guests: z.number().int().min(1).max(12),
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  email: z.string().email(),
  allergies: z.string().max(1000).optional(),
  previousVisit: z.boolean(),
  previousBarrio: z.enum(["EIXAMPLE", "SARRIA"]).optional(),
  newsletter: z.boolean().optional(),
  groupRef: z.string().max(120).optional(),
  comments: z.string().max(1000).optional(),
});

export const giftPurchaseSchema = z.object({
  guests: z.number().int().min(1).max(12),
  purchaserName: z.string().min(2).max(120),
  purchaserPhone: z.string().min(6).max(30),
  purchaserEmail: z.string().email(),
  deliveryMode: z.enum(["now", "later"]),
  recipientEmail: z.string().email().optional(),
  sendDate: z.string().datetime().optional(),
});

export const giftRedeemSchema = z.object({
  token: z.string().uuid(),
  date: z.string().datetime(),
  shift: z.nativeEnum(Shift),
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  email: z.string().email(),
  allergies: z.string().max(1000).optional(),
  previousVisit: z.boolean(),
  previousBarrio: z.enum(["EIXAMPLE", "SARRIA"]).optional(),
  comments: z.string().max(1000).optional(),
});

export function validateServiceDate(inputDate: Date, shift: Shift): string | null {
  const serviceDate = toZonedTime(inputDate, BARCELONA_TZ);
  const nowBarcelona = toZonedTime(new Date(), BARCELONA_TZ);
  const weekday = getDay(serviceDate);

  if (weekday < 3 || weekday > 6) {
    return "Only Wednesday to Saturday are allowed.";
  }
  if (weekday !== 6 && shift !== Shift.NIGHT) {
    return "Only NIGHT shift is allowed from Wednesday to Friday.";
  }

  if (inputDate.getTime() - nowBarcelona.getTime() < 3 * 60 * 60 * 1000) {
    return "Reservation must be created at least 3 hours before service.";
  }

  const sixMonthsFromNow = new Date(nowBarcelona);
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  if (inputDate > sixMonthsFromNow) {
    return "Reservation is too far in the future (max 6 months).";
  }

  return null;
}

export function calculateTotalAmountWithDiscounts(
  guests: number,
  targetDate: Date,
  campaignPct: number,
  wedThuActive: boolean = false,
): number {

  const dateBarcelona = toZonedTime(targetDate, BARCELONA_TZ);
  const weekday = getDay(dateBarcelona);
  const baseTotal = guests * BASE_PRICE_PER_GUEST;

  const dynamicDiscount = (wedThuActive && (weekday === 3 || weekday === 4) ? WED_THU_DISCOUNT_PCT : 0) + campaignPct;

  const finalTotal = baseTotal * (1 - dynamicDiscount / 100);
  return Number(finalTotal.toFixed(2));
}

export function amountDueNow30Pct(totalAmount: number): number {
  return Number((totalAmount * 0.3).toFixed(2));
}

function atBarcelonaHour(date: Date, hour: number, minute: number): Date {
  const local = toZonedTime(date, BARCELONA_TZ);
  local.setHours(hour, minute, 0, 0);
  return fromZonedTime(local, BARCELONA_TZ);
}

export function buildEmailQueueSchedule(eventDate: Date, now: Date): Array<{ templateKey: string; scheduledAt: Date }> {
  const msDiff = eventDate.getTime() - now.getTime();
  const daysDiff = msDiff / (24 * 60 * 60 * 1000);
  const sendSoon = addDays(now, 0);
  sendSoon.setMinutes(sendSoon.getMinutes() + 5);

  const queue: Array<{ templateKey: string; scheduledAt: Date }> = [];

  // Add D14 if scheduled far enough in advance
  if (daysDiff >= 14.1) {
    queue.push({ templateKey: "D14", scheduledAt: atBarcelonaHour(subDays(eventDate, 14), 10, 0) });
  }

  if (daysDiff >= 4) {
    queue.push(
      { templateKey: "D4", scheduledAt: atBarcelonaHour(subDays(eventDate, 4), 10, 0) },
      { templateKey: "D3", scheduledAt: atBarcelonaHour(subDays(eventDate, 3), 10, 0) },
      { templateKey: "D2", scheduledAt: atBarcelonaHour(subDays(eventDate, 2), 10, 0) },
      { templateKey: "D0", scheduledAt: atBarcelonaHour(eventDate, 10, 0) },
    );
  } else if (daysDiff >= 3) {
    queue.push(
      { templateKey: "D3", scheduledAt: sendSoon },
      { templateKey: "D2", scheduledAt: atBarcelonaHour(subDays(eventDate, 2), 10, 0) },
      { templateKey: "D0", scheduledAt: atBarcelonaHour(eventDate, 10, 0) },
    );
  } else if (daysDiff >= 2) {
    queue.push(
      { templateKey: "D2", scheduledAt: sendSoon },
      { templateKey: "D0", scheduledAt: atBarcelonaHour(eventDate, 10, 0) },
    );
  } else if (daysDiff >= 1) {
    queue.push(
      { templateKey: "D1_NIGHT", scheduledAt: atBarcelonaHour(now, 20, 0) },
      { templateKey: "D0", scheduledAt: atBarcelonaHour(eventDate, 10, 0) },
    );
  } else {
    queue.push({ templateKey: "COMPACT", scheduledAt: sendSoon });
  }

  return queue;
}
