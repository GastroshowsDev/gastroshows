import { Shift } from "@prisma/client";
import { getDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { emailValidation } from "@/lib/utils/validations";

export const reservationInputSchema = z.object({
  date: z.string().datetime(),
  shift: z.nativeEnum(Shift),
  guests: z.number().int().min(1).max(12),
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  email: emailValidation,
  allergies: z.string().max(1000).optional(),
  previousVisit: z.boolean().default(false),
  groupRef: z.string().max(120).optional(),
  comments: z.string().max(1000).optional(),
});

const BARCELONA_TZ = "Europe/Madrid";
const BASE_PRICE_PER_GUEST = 130;
const WEDNESDAY_THURSDAY_DISCOUNT = 0.2;

export function validateServiceDate(inputDate: Date, shift: Shift): string | null {
  const serviceDate = toZonedTime(inputDate, BARCELONA_TZ);
  const nowBarcelona = toZonedTime(new Date(), BARCELONA_TZ);
  const weekday = getDay(serviceDate); // 0 Sunday ... 6 Saturday

  if (weekday < 3 || weekday > 6) {
    return "Only Wednesday to Saturday are allowed.";
  }

  if (weekday !== 6 && shift !== Shift.NIGHT) {
    return "Only NIGHT shift is allowed from Wednesday to Friday.";
  }

  const threeHoursInMs = 3 * 60 * 60 * 1000;
  if (inputDate.getTime() - nowBarcelona.getTime() < threeHoursInMs) {
    return "Reservation must be created at least 3 hours before service.";
  }

  const sixMonthsFromNow = new Date(nowBarcelona);
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  if (inputDate > sixMonthsFromNow) {
    return "Reservation is too far in the future (max 6 months).";
  }

  return null;
}

export function getBaseAmountForGuests(guests: number, date: Date): number {
  const weekday = getDay(toZonedTime(date, BARCELONA_TZ));
  const rawTotal = guests * BASE_PRICE_PER_GUEST;

  if (weekday === 3 || weekday === 4) {
    return Number((rawTotal * (1 - WEDNESDAY_THURSDAY_DISCOUNT)).toFixed(2));
  }

  return rawTotal;
}

export function getAmountDueNow(totalAmount: number): number {
  return Number((totalAmount * 0.3).toFixed(2));
}
