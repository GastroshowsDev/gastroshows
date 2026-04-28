import { prisma } from "@/lib/prisma";
import { CalendarBoard } from "@/components/admin/CalendarBoard";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getCalendarData() {
  const from = new Date();
  from.setMonth(from.getMonth() - 2);
  from.setDate(1);
  from.setHours(0, 0, 0, 0);

  const to = new Date();
  to.setMonth(to.getMonth() + 6);
  to.setDate(0);
  to.setHours(23, 59, 59, 999);

  // Query reservations directly so venueName comes from the reservation's venue,
  // not the event's venue (which is often null/unassigned).
  const reservations = await prisma.reservation.findMany({
    where: {
      status: { notIn: ["CANCELLED"] },
      event: { date: { gte: from, lte: to } },
    },
    select: {
      guests: true,
      event: { select: { id: true, date: true, shift: true, status: true } },
      venue: { select: { name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  // Group by (eventId + venueName) so each chip represents one venue's guests on a shift
  const grouped = new Map<string, {
    id: string;
    date: string;
    shift: string;
    status: string;
    venueName: string | null;
    reservationCount: number;
    totalGuests: number;
  }>();

  for (const r of reservations) {
    const venueName = r.venue?.name ?? null;
    const key = `${r.event.id}:${venueName ?? "?"}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: key,
        date: r.event.date.toISOString(),
        shift: r.event.shift,
        status: r.event.status,
        venueName,
        reservationCount: 0,
        totalGuests: 0,
      });
    }
    const g = grouped.get(key)!;
    g.reservationCount++;
    g.totalGuests += r.guests;
  }

  return [...grouped.values()];
}

export type CalendarEvent = Awaited<ReturnType<typeof getCalendarData>>[number];

export default async function CalendarioPage() {
  const events = await getCalendarData();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--color-admin-bg)" }}>
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--color-admin-border)",
          background: "var(--color-admin-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
            Calendario
          </h1>
          <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
            Vista de ocupación por local
          </p>
        </div>
        <Link
          href="/admin/calendario/festivos"
          style={{
            background: "var(--color-admin-accent)",
            color: "#0A0A0A",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            fontSize: "0.85rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        >
          Días Festivos
        </Link>
      </div>

      <CalendarBoard events={events} />
    </div>
  );
}
