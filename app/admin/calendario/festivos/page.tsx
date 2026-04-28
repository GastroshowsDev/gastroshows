import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { HolidayManager } from "./HolidayManager";

export const dynamic = "force-dynamic";

export default async function FestivosPage() {
  const holidays = await prisma.holiday.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
            Días Festivos
          </h1>
          <p style={{ color: "var(--color-admin-muted)", marginTop: "0.2rem" }}>
            Los días añadidos aquí aparecerán como no disponibles en las reservas públicas.
          </p>
        </div>
        <Link
          href="/admin/calendario"
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid var(--color-admin-border)",
            borderRadius: "6px",
            color: "var(--color-admin-text)",
            textDecoration: "none",
            fontSize: "0.85rem",
          }}
        >
          Volver al calendario
        </Link>
      </div>

      <HolidayManager initialHolidays={holidays} />
    </div>
  );
}
