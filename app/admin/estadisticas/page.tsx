import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getStats() {
  const now = new Date();

  // Month range
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  // Year range
  const yearStart = new Date(now.getFullYear(), 0, 1);

  const [allReservations, monthReservations, yearReservations, topCustomers] = await Promise.all([
    prisma.reservation.aggregate({
      where: { status: { notIn: ["CANCELLED"] } },
      _count: { id: true },
      _sum: { totalAmount: true, paidAmount: true, guests: true },
    }),
    prisma.reservation.aggregate({
      where: {
        status: { notIn: ["CANCELLED"] },
        event: { date: { gte: monthStart, lte: monthEnd } },
      },
      _count: { id: true },
      _sum: { totalAmount: true, guests: true },
    }),
    prisma.reservation.aggregate({
      where: {
        status: { notIn: ["CANCELLED"] },
        event: { date: { gte: yearStart } },
      },
      _count: { id: true },
      _sum: { totalAmount: true, guests: true },
    }),
    prisma.customer.findMany({
      take: 5,
      include: {
        reservations: {
          where: { status: { notIn: ["CANCELLED"] } },
          select: { id: true, totalAmount: true },
        },
      },
      orderBy: { reservations: { _count: "desc" } },
    }),
  ]);

  // Monthly breakdown (last 6 months)
  const monthlyData: { month: string; reservations: number; revenue: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
    const agg = await prisma.reservation.aggregate({
      where: {
        status: { notIn: ["CANCELLED"] },
        event: { date: { gte: start, lte: end } },
      },
      _count: { id: true },
      _sum: { totalAmount: true },
    });
    monthlyData.push({
      month: start.toLocaleDateString("es-ES", { month: "short", year: "2-digit" }),
      reservations: agg._count.id,
      revenue: Number(agg._sum.totalAmount ?? 0),
    });
  }

  // Venue breakdown
  const [sarriaAgg, urgellAgg] = await Promise.all([
    prisma.reservation.aggregate({
      where: { status: { notIn: ["CANCELLED"] }, venue: { name: "BERTRAND" } },
      _count: { id: true },
      _sum: { totalAmount: true, guests: true },
    }),
    prisma.reservation.aggregate({
      where: { status: { notIn: ["CANCELLED"] }, venue: { name: "URGELL" } },
      _count: { id: true },
      _sum: { totalAmount: true, guests: true },
    }),
  ]);

  return {
    all: {
      count: allReservations._count.id,
      revenue: Number(allReservations._sum.totalAmount ?? 0),
      guests: Number(allReservations._sum.guests ?? 0),
      pending: Number(allReservations._sum.totalAmount ?? 0) - Number(allReservations._sum.paidAmount ?? 0),
    },
    month: {
      count: monthReservations._count.id,
      revenue: Number(monthReservations._sum.totalAmount ?? 0),
      guests: Number(monthReservations._sum.guests ?? 0),
    },
    year: {
      count: yearReservations._count.id,
      revenue: Number(yearReservations._sum.totalAmount ?? 0),
      guests: Number(yearReservations._sum.guests ?? 0),
    },
    monthlyData,
    venues: {
      sarria: { count: sarriaAgg._count.id, revenue: Number(sarriaAgg._sum.totalAmount ?? 0), guests: Number(sarriaAgg._sum.guests ?? 0) },
      urgell: { count: urgellAgg._count.id, revenue: Number(urgellAgg._sum.totalAmount ?? 0), guests: Number(urgellAgg._sum.guests ?? 0) },
    },
    topCustomers: topCustomers.map((c) => ({
      name: c.name,
      email: c.email,
      reservaCount: c.reservations.length,
      totalRevenue: c.reservations.reduce((s, r) => s + Number(r.totalAmount), 0),
    })),
  };
}

// NUEVA PALETA GOLD EDITION
const ACCENT     = "#efb810"; // Oro Principal
const GOLD_DEEP  = "#c5a028"; // Oro Profundo
const BRONZE     = "#b8860b"; // Bronce
const AMBER_SOFT = "#f4d03f"; // Ámbar Suave
const BERTRAND   = "#C8A96E"; 
const URGELL     = "#a67c00"; 

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent: string }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid var(--color-admin-border)",
      borderRadius: 12,
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.3rem",
    }}>
      <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
      <span style={{ fontSize: "1.6rem", fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</span>
      {sub && <span style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)" }}>{sub}</span>}
    </div>
  );
}

export default async function EstadisticasPage() {
  const stats = await getStats();

  const maxRevenue = Math.max(...stats.monthlyData.map((m) => m.revenue), 1);

  return (
    <div style={{ height: "100vh", overflowY: "auto", background: "var(--color-admin-bg)" }}>
      {/* Header */}
      <div style={{
        padding: "1.25rem 1.5rem",
        borderBottom: "1px solid var(--color-admin-border)",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>Estadísticas</h1>
          <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>Ventas y análisis de reservas</p>
        </div>
      </div>

      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* This month stats */}
        <section>
          <h2 style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Este mes</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
            <StatCard label="Reservas" value={stats.month.count} accent={ACCENT} />
            <StatCard label="Comensales" value={stats.month.guests} accent={GOLD_DEEP} />
            <StatCard label="Facturación" value={`${stats.month.revenue.toFixed(0)}€`} accent={BRONZE} />
            <StatCard label="Media/reserva" value={stats.month.count > 0 ? `${(stats.month.guests / stats.month.count).toFixed(1)}p` : "—"} accent={AMBER_SOFT} />
          </div>
        </section>

        {/* Monthly chart (last 6 months) */}
        <section>
          <div style={{
            background: "#fff",
            border: "1px solid var(--color-admin-border)",
            borderRadius: 12,
            overflow: "hidden",
          }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-admin-border)" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-admin-text)" }}>Evolución últimos 6 meses</span>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem", height: 160 }}>
                {stats.monthlyData.map((m) => {
                  const h = maxRevenue > 0 ? Math.max((m.revenue / maxRevenue) * 140, m.reservations > 0 ? 8 : 2) : 2;
                  return (
                    <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                      <span style={{ fontSize: "0.65rem", color: "var(--color-admin-muted)", fontWeight: 500 }}>
                        {m.revenue > 0 ? `${m.revenue.toFixed(0)}€` : ""}
                      </span>
                      <div
                        title={`${m.reservations} reservas · ${m.revenue.toFixed(0)}€`}
                        style={{
                          width: "100%",
                          height: h,
                          background: `linear-gradient(to top, ${ACCENT}, ${ACCENT}cc)`,
                          borderRadius: "4px 4px 0 0",
                          transition: "height 0.3s",
                          cursor: "default",
                        }}
                      />
                      <span style={{ fontSize: "0.65rem", color: "var(--color-admin-muted)", textAlign: "center" }}>{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          {/* Venue breakdown */}
          <section>
            <div style={{ background: "#fff", border: "1px solid var(--color-admin-border)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-admin-border)" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-admin-text)" }}>Por local</span>
              </div>
              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Bertrand", data: stats.venues.sarria, color: BERTRAND, bg: "#FFFBEB" },
                  { label: "Urgell", data: stats.venues.urgell, color: URGELL, bg: "#FEF3C7" },
                ].map(({ label, data, color, bg }) => {
                  const total = stats.all.count || 1;
                  const pct = Math.round((data.count / total) * 100);
                  return (
                    <div key={label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-admin-text)" }}>{label}</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color }}>
                          {data.count} reservas · {data.revenue.toFixed(0)}€
                        </span>
                      </div>
                      <div style={{ height: 8, background: "var(--color-admin-bg)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.4s" }} />
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)", marginTop: "0.25rem" }}>{pct}% del total · {data.guests} comensales</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Top customers */}
          <section>
            <div style={{ background: "#fff", border: "1px solid var(--color-admin-border)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-admin-border)" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-admin-text)" }}>Clientes frecuentes</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
                  <thead>
                    <tr style={{ background: "var(--color-admin-bg)" }}>
                      <th style={{ padding: "0.6rem 1.25rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Cliente</th>
                      <th style={{ padding: "0.6rem 1.25rem", textAlign: "right", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Visitas</th>
                      <th style={{ padding: "0.6rem 1.25rem", textAlign: "right", fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topCustomers.length === 0 ? (
                      <tr><td colSpan={3} style={{ padding: "2rem", textAlign: "center", color: "var(--color-admin-muted)" }}>Sin datos</td></tr>
                    ) : stats.topCustomers.map((c, i) => (
                      <tr key={i} style={{ borderTop: "1px solid var(--color-admin-border)" }}>
                        <td style={{ padding: "0.75rem 1.25rem" }}>
                          <div style={{ fontWeight: 500, color: "var(--color-admin-text)" }}>{c.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>{c.email}</div>
                        </td>
                        <td style={{ padding: "0.75rem 1.25rem", textAlign: "right", fontWeight: 600, color: ACCENT }}>{c.reservaCount}</td>
                        <td style={{ padding: "0.75rem 1.25rem", textAlign: "right", color: "var(--color-admin-muted)", fontSize: "0.8rem" }}>{c.totalRevenue.toFixed(0)}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* Total all-time */}
        <section>
          <h2 style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--color-admin-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Acumulado total</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
            <StatCard label="Total reservas" value={stats.all.count} accent={ACCENT} />
            <StatCard label="Total comensales" value={stats.all.guests} accent={GOLD_DEEP} />
            <StatCard label="Facturación total" value={`${stats.all.revenue.toFixed(0)}€`} accent={BRONZE} />
            <StatCard label="Pendiente cobro" value={`${stats.all.pending.toFixed(0)}€`} accent={AMBER_SOFT} />
          </div>
        </section>

      </div>
    </div>
  );
}
