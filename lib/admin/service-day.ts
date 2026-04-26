import { addDays } from "date-fns";

/**
 * UTC calendar-day range for YYYY-MM-DD (MVP).
 * Event dates stored in DB should align with this convention for filtering.
 */
export function utcDayRange(serviceDateYmd: string): { start: Date; end: Date } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(serviceDateYmd);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  const start = new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0));
  const end = addDays(start, 1);
  return { start, end };
}
