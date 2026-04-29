import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { VisitasTable } from "@/components/admin/VisitasTable";
import { getCalendarData } from "@/lib/admin/calendar-utils";
import { CalendarBoard } from "@/components/admin/CalendarBoard";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getVisitas() {
  const visits = await prisma.reservation.findMany({
    where: { type: "VISIT" },
    orderBy: { visitDate: "asc" },
    include: {
      customer: { select: { name: true, email: true, phone: true } },
    },
  });

  return visits.map((v) => ({
    id: v.id,
    customer: v.customer,
    visitDate: v.visitDate?.toISOString() ?? "",
    visitTime: v.visitTime ?? "",
    status: v.status,
    createdAt: v.createdAt.toISOString(),
  }));
}

export default async function VisitasPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view } = await searchParams;
  const isCalendar = view === "calendar";

  const [visits, calendarEvents, session] = await Promise.all([
    getVisitas(),
    isCalendar ? getCalendarData("VISIT") : Promise.resolve([]),
    getServerSession(authOptions)
  ]);

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
            Visitas
          </h1>
          <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
            {visits.length} visita{visits.length !== 1 ? "s" : ""} registradas
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link 
            href="/admin/visitas" 
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
            href="/admin/visitas?view=calendar" 
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
        <VisitasTable visits={visits} />
      )}
    </div>
  );
}
