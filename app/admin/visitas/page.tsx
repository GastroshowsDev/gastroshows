import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { VisitasTable } from "@/components/admin/VisitasTable";
import { getCalendarData } from "@/lib/admin/calendar-utils";
import { CalendarBoard } from "@/components/admin/CalendarBoard";
import { AdminPagination } from "@/components/admin/AdminPagination";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getVisitasData(offset: number, limit: number) {
  const total = await prisma.reservation.count({
    where: { type: "VISIT" }
  });

  const visits = await prisma.reservation.findMany({
    where: { type: "VISIT" },
    orderBy: { visitDate: "asc" },
    skip: offset - 1,
    take: limit,
    include: {
      customer: { select: { name: true, email: true, phone: true } },
    },
  });

  const rows = visits.map((v) => ({
    id: v.id,
    customer: v.customer,
    visitDate: v.visitDate?.toISOString() ?? "",
    visitTime: v.visitTime ?? "",
    status: v.status,
    createdAt: v.createdAt.toISOString(),
  }));

  return { rows, total };
}

export default async function VisitasPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ view?: string, offset?: string, limit?: string }> 
}) {
  const { view, offset, limit } = await searchParams;
  const isCalendar = view === "calendar";

  const currentOffset = parseInt(offset || "1");
  const currentLimit = parseInt(limit || "25");

  const [{ rows: visits, total }, calendarEvents, session] = await Promise.all([
    getVisitasData(currentOffset, currentLimit),
    isCalendar ? getCalendarData("VISIT") : Promise.resolve([]),
    getServerSession(authOptions)
  ]);

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
              Visitas
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
              Panel de gestión de visitas
            </p>
          </div>

          {!isCalendar && (
            <AdminPagination total={total} defaultLimit={25} />
          )}
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
