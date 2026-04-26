import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ReservasTable } from "@/components/admin/ReservasTable";

export const dynamic = "force-dynamic";

async function getReservas() {
  const reservations = await prisma.reservation.findMany({
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
    event: {
      id: r.event.id,
      date: r.event.date.toISOString(),
      shift: r.event.shift,
    },
    venue: r.venue ? { id: r.venue.id, name: r.venue.name } : null,
  }));
}

export type ReservaRow = Awaited<ReturnType<typeof getReservas>>[number];

export default async function ReservasPage() {
  const [reservas, session] = await Promise.all([getReservas(), getServerSession(authOptions)]);
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
      </div>

      <ReservasTable reservas={reservas} role={role} />
    </div>
  );
}
