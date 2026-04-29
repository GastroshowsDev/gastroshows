import { getCalendarData } from "@/lib/admin/calendar-utils";
import { CalendarBoard } from "@/components/admin/CalendarBoard";
import Link from "next/link";

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
