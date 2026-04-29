import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ReservasTable } from "@/components/admin/ReservasTable";
import { getCalendarData } from "@/lib/admin/calendar-utils";
import { CalendarBoard } from "@/components/admin/CalendarBoard";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getReservas() {
  const reservations = await prisma.reservation.findMany({
    where: {
      type: { notIn: ["VISIT", "GIFT"] }
    },
    orderBy: { createdAt: "desc" },
    include: {
      customer: { select: { id: true, name: true, email: true, phone: true, allergies: true, comments: true, previousVisit: true } },
      event: { select: { id: true, date: true, shift: true } },
      venue: { select: { id: true, name: true } },
    },
  });

  return reservations.map((r) => ({
    id: r.id,
    type: r.type,
    status: r.status,
    guests: r.guests,
    totalAmount: Number(r.totalAmount),
    paidAmount: Number(r.paidAmount),
    groupRef: r.groupRef,
    mergedGroupId: r.mergedGroupId,
    createdAt: r.createdAt.toISOString(),
    customer: {
      id: r.customer.id,
      name: r.customer.name,
      email: r.customer.email,
      phone: r.customer.phone,
      allergies: r.customer.allergies ?? "",
      comments: r.customer.comments ?? "",
      previousVisit: r.customer.previousVisit,
    },
    event: r.event ? {
      id: r.event.id,
      date: r.event.date.toISOString(),
      shift: r.event.shift,
    } : {
      id: "visit",
      date: r.visitDate?.toISOString() ?? "",
      shift: r.visitTime ?? "VISIT",
    },
    venue: r.venue ? { id: r.venue.id, name: r.venue.name } : null,
  }));
}

export type ReservaRow = Awaited<ReturnType<typeof getReservas>>[number];

export default async function ReservasPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view } = await searchParams;
  const isCalendar = view === "calendar";

  const [reservas, calendarEvents, session] = await Promise.all([
    getReservas(),
    isCalendar ? getCalendarData("NORMAL") : Promise.resolve([]),
    getServerSession(authOptions)
  ]);
  const role = ((session?.user as { role?: string } | undefined)?.role ?? "LIVE") as "ADMIN" | "LIVE";

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
            Reservas
          </h1>
          <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
            {reservas.length} reserva{reservas.length !== 1 ? "s" : ""} en total
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link 
            href="/admin/reservas" 
            style={{ 
              padding: "0.4rem 0.8rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600,
              background: !isCalendar ? "var(--color-admin-accent)" : "transparent",
              color: !isCalendar ? "#fff" : "var(--color-admin-text)",
              textDecoration: "none", border: "1px solid var(--color-admin-border)"
            }}
          >
            Tabla
          </Link>
          <Link 
            href="/admin/reservas?view=calendar" 
            style={{ 
              padding: "0.4rem 0.8rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600,
              background: isCalendar ? "var(--color-admin-accent)" : "transparent",
              color: isCalendar ? "#fff" : "var(--color-admin-text)",
              textDecoration: "none", border: "1px solid var(--color-admin-border)"
            }}
          >
            Calendario
          </Link>
        </div>
      </div>

      {isCalendar ? (
        <CalendarBoard events={calendarEvents} />
      ) : (
        <ReservasTable reservas={reservas} role={role} />
      )}
    </div>
  );
}
