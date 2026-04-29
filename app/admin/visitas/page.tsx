import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { VisitasTable } from "@/components/admin/VisitasTable";

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

export default async function VisitasPage() {
  const [visits, session] = await Promise.all([getVisitas(), getServerSession(authOptions)]);

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
      </div>

      <VisitasTable visits={visits} />
    </div>
  );
}
