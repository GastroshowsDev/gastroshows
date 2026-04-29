import { prisma } from "@/lib/prisma";

export async function getCalendarData(filterType: "NORMAL" | "VISIT" | "MASTER" = "MASTER") {
  const from = new Date();
  from.setMonth(from.getMonth() - 2);
  from.setDate(1);
  from.setHours(0, 0, 0, 0);

  const to = new Date();
  to.setMonth(to.getMonth() + 6);
  to.setDate(0);
  to.setHours(23, 59, 59, 999);

  let events: any[] = [];

  // 1. Reservations (NORMAL/GIFT)
  if (filterType !== "VISIT") {
    const reservations = await prisma.reservation.findMany({
      where: {
        status: { notIn: ["CANCELLED"] },
        type: filterType === "NORMAL" ? { notIn: ["VISIT", "GIFT"] } : { notIn: ["VISIT"] },
        event: { date: { gte: from, lte: to } },
      },
      select: {
        guests: true,
        event: { select: { id: true, date: true, shift: true, status: true } },
        venue: { select: { name: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    const grouped = new Map<string, any>();
    for (const r of reservations) {
      const venueName = r.venue?.name ?? null;
      const key = `${r.event?.id ?? "no-event"}:${venueName ?? "?"}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          date: r.event?.date.toISOString() ?? "",
          shift: r.event?.shift ?? "",
          status: r.event?.status ?? "",
          venueName,
          reservationCount: 0,
          totalGuests: 0,
          isVisit: false,
        });
      }
      const g = grouped.get(key)!;
      g.reservationCount++;
      g.totalGuests += r.guests;
    }
    events = [...events, ...grouped.values()];
  }

  // 2. Visits
  if (filterType === "VISIT" || filterType === "MASTER") {
    const visits = await prisma.reservation.findMany({
      where: {
        type: "VISIT",
        status: { notIn: ["CANCELLED"] },
        visitDate: { gte: from, lte: to },
      },
      select: {
        id: true,
        visitDate: true,
        visitTime: true,
        customer: { select: { name: true } },
      },
    });

    const visitEvents = visits.map(v => ({
      id: `visit:${v.id}`,
      date: v.visitDate!.toISOString(),
      shift: v.visitTime!,
      status: "CONFIRMED",
      venueName: "VISIT",
      reservationCount: 1,
      totalGuests: 1,
      isVisit: true,
      customerName: v.customer.name,
    }));
    events = [...events, ...visitEvents];
  }

  return events;
}
