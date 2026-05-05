import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ReservasTable } from "@/components/admin/ReservasTable";
import { getCalendarData } from "@/lib/admin/calendar-utils";
import { CalendarBoard } from "@/components/admin/CalendarBoard";
import { AdminPagination } from "@/components/admin/AdminPagination";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getReservasData(offset: number, limit: number, date?: string, shift?: string) {
  // Build filter for date/shift if provided
  const whereClause: any = { type: { notIn: ["VISIT", "GIFT"] } };

  if (date) {
    // Parse YYYY-MM-DD format
    const [y, m, d] = date.split("-");
    if (y && m && d) {
      const startDate = new Date(`${y}-${m}-${d}T00:00:00Z`);
      const endDate = new Date(`${y}-${m}-${d}T23:59:59Z`);
      whereClause.event = {
        date: {
          gte: startDate,
          lte: endDate,
        }
      };
    }
  }

  if (shift && (shift === "NOON" || shift === "NIGHT")) {
    if (!whereClause.event) whereClause.event = {};
    whereClause.event.shift = shift;
  }

  // 1. Obtener el total de registros para la paginación
  const total = await prisma.reservation.count({
    where: whereClause
  });

  // 2. Obtener solo los registros del rango solicitado (skip/take)
  const reservations = await prisma.reservation.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    skip: offset - 1,
    take: limit,
    include: {
      customer: { select: { id: true, name: true, email: true, phone: true, allergies: true, comments: true, previousVisit: true } },
      event: { select: { id: true, date: true, shift: true } },
      venue: { select: { id: true, name: true } },
    },
  });

  const rows = reservations.map((r) => ({
    id: String(r.id),
    type: r.type,
    status: r.status,
    guests: r.guests,
    totalAmount: Number(r.totalAmount),
    paidAmount: Number(r.paidAmount),
    source: r.source,
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

  return { rows, total };
}

export type ReservaRow = Awaited<ReturnType<typeof getReservasData>>["rows"][number];

export default async function ReservasPage({
  searchParams
}: {
  searchParams: Promise<{ view?: string, offset?: string, limit?: string, date?: string, shift?: string }>
}) {
  const { view, offset, limit, date, shift } = await searchParams;
  const isCalendar = view === "calendar";

  const currentOffset = parseInt(offset || "1");
  const currentLimit = parseInt(limit || "25");

  const [{ rows: reservas, total }, calendarEvents, session] = await Promise.all([
    getReservasData(currentOffset, currentLimit, date, shift),
    isCalendar ? getCalendarData("NORMAL") : Promise.resolve([]),
    getServerSession(authOptions)
  ]);
  
  const sessionUser = session?.user as { role?: string } | undefined;
  const role = (sessionUser?.role ?? "LIVE") as "ADMIN" | "LIVE";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--color-admin-bg)" }}>
      <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--color-admin-border)",
          background: "var(--color-admin-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
              Reservas
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
              Panel de gestión de reservas
            </p>
          </div>
          
          {/* Solo mostramos la paginación en vista de tabla */}
          {!isCalendar && (
            <AdminPagination total={total} defaultLimit={25} />
          )}
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
