import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 80 people max per day on Sat: NOON+NIGHT (40 each = 80), others NIGHT only (40)
const SAT_SHIFT_CAPACITY   = 40;
const OTHER_SHIFT_CAPACITY = 40;

const DAY_SHORT: Record<number, string> = { 3: "Mié", 4: "Jue", 5: "Vie", 6: "Sáb" };

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  const day = d.getUTCDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d;
}

function formatWeekLabel(monday: Date): string {
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const startDay = monday.getUTCDate();
  const endDay = sunday.getUTCDate();
  const month = sunday.toLocaleDateString("es-ES", { month: "short", timeZone: "UTC" });
  return `${startDay}–${endDay} ${month}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const weekParam = searchParams.get("week"); // YYYY-MM-DD (a Monday)

  const monday = weekParam
    ? getMondayOfWeek(new Date(weekParam + "T00:00:00Z"))
    : getMondayOfWeek(new Date());

  // Wed=Mon+2, Thu=Mon+3, Fri=Mon+4, Sat=Mon+5
  const operatingDays = [2, 3, 4, 5].map((offset) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + offset);
    return d;
  });

  const rangeStart = new Date(operatingDays[0]);
  rangeStart.setUTCHours(0, 0, 0, 0);
  const rangeEnd = new Date(operatingDays[3]);
  rangeEnd.setUTCHours(23, 59, 59, 999);

  const events = await prisma.event.findMany({
    where: {
      date: { gte: rangeStart, lte: rangeEnd },
    },
    include: {
      reservations: {
        where: {
          status: { in: ["CONFIRMED", "CHECKED_IN"] },
          type: { not: "VISIT" }
        },
        select: { guests: true }
      }
    }
  });

  const days = operatingDays.map((date) => {
    const dayOfWeek = date.getUTCDay(); // 3=Wed … 6=Sat
    const isSat = dayOfWeek === 6;
    const dateStr = date.toISOString().split("T")[0];
    const shifts = (isSat ? ["NOON", "NIGHT"] : ["NIGHT"]) as ("NOON" | "NIGHT")[];

    const shiftData = shifts.map((shift) => {
      const ev = events.find((e) => {
        const evDate = new Date(e.date).toISOString().split("T")[0];
        return evDate === dateStr && e.shift === shift;
      });

      const capacity = isSat ? SAT_SHIFT_CAPACITY : OTHER_SHIFT_CAPACITY;
      // Sumamos los invitados de las reservas reales encontradas
      const totalGuests = ev?.reservations.reduce((acc, r) => acc + r.guests, 0) ?? 0;
      const isFull = ev?.status === "FULL" || ev?.status === "CLOSED";
      const available = isFull ? 0 : Math.max(0, capacity - totalGuests);

      return {
        shift,
        label: shift === "NOON" ? "Mediodía" : "Noche",
        totalGuests,
        capacity,
        available,
        isFull,
      };
    });

    return {
      date: dateStr,
      dayShort: DAY_SHORT[dayOfWeek] ?? "?",
      dayNum: date.getUTCDate(),
      month: date.toLocaleDateString("es-ES", { month: "short", timeZone: "UTC" }),
      shifts: shiftData,
      totalAvailable: shiftData.reduce((s, sh) => s + sh.available, 0),
      totalCapacity: shiftData.reduce((s, sh) => s + sh.capacity, 0),
    };
  });

  const totalAvailable = days.reduce((s, d) => s + d.totalAvailable, 0);
  const totalCapacity  = days.reduce((s, d) => s + d.totalCapacity, 0);

  const response = NextResponse.json({
    ok: true,
    week: monday.toISOString().split("T")[0],
    weekLabel: formatWeekLabel(monday),
    days,
    totalAvailable,
    totalCapacity,
  });

  // Cache for 2 minutes to reduce DB queries
  response.headers.set("Cache-Control", "public, max-age=120, stale-while-revalidate=300");

  return response;
}
