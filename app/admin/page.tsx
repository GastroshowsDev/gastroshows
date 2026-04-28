import { prisma } from "@/lib/prisma";
import type { LiveReservationRow } from "@/types/live-reservation";
import { RecentActivityFeed } from "@/components/admin/RecentActivityFeed";

export const dynamic = "force-dynamic";

function todayYmd(): string {
  return new Date().toISOString().slice(0, 10);
}

async function getDashboardStats() {
  const today = todayYmd();
  const todayStart = new Date(`${today}T00:00:00Z`);
  const todayEnd = new Date(`${today}T23:59:59Z`);

  const [
    todayReservations,
    upcomingCount,
    recentReservations,
    liveActivityData,
  ] = await Promise.all([
    // Reservas de hoy
    prisma.reservation.findMany({
      where: {
        event: { date: { gte: todayStart, lte: todayEnd } },
        status: { notIn: ["CANCELLED"] },
      },
      include: {
        customer: { select: { id: true, name: true, allergies: true } },
        venue: { select: { name: true } },
        event: { select: { date: true, shift: true } },
      },
    }),
    // Próximas confirmadas
    prisma.reservation.count({
      where: {
        event: { date: { gt: todayEnd } },
        status: { in: ["CONFIRMED", "CHECKED_IN"] },
      },
    }),
    // Últimas 8 reservas (para la tabla)
    prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        customer: { select: { name: true, email: true } },
        event: { select: { date: true, shift: true } },
        venue: { select: { name: true } },
      },
    }),
    // Datos para actividad reciente (live)
    prisma.reservation.findMany({
      where: {
        event: { date: { gte: todayStart, lte: todayEnd } },
        status: { notIn: ["CHECKED_IN"] },
      },
      orderBy: { updatedAt: "desc" },
      take: 40,
      include: {
        customer: { select: { id: true, name: true, phone: true, email: true } },
        event: { select: { id: true, date: true, shift: true } },
        venue: { select: { id: true, name: true } },
      },
    }),
  ]);

  // Calcular métricas de hoy
  const todayGuests = todayReservations.reduce((sum, r) => sum + r.guests, 0);
  
  // Pendiente hoy: suma de (totalAmount - paidAmount) para reservas no canceladas
  const pendingAmount = todayReservations.reduce(
    (sum, r) => sum + Number(r.totalAmount) - Number(r.paidAmount),
    0
  );
  
  // Contar alergias únicas de hoy
  const allergiesSet = new Set<string>();
  todayReservations.forEach((r) => {
    if (r.customer.allergies?.trim()) {
      allergiesSet.add(r.customer.id);
    }
  });
  const allergiesCount = allergiesSet.size;

  // Transformar datos para RecentActivityFeed
  const liveReservationRows: LiveReservationRow[] = liveActivityData.map((r) => ({
    id: r.id,
    status: r.status,
    type: r.type,
    guests: r.guests,
    totalAmount: Number(r.totalAmount),
    paidAmount: Number(r.paidAmount),
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    customer: {
      id: r.customer.id,
      name: r.customer.name,
      phone: r.customer.phone,
      email: r.customer.email,
    },
    event: {
      id: r.event?.id ?? "",
      date: r.event?.date.toISOString() ?? "",
      shift: r.event?.shift ?? "",
    },
    venue: r.venue
      ? {
          id: r.venue.id,
          name: r.venue.name,
        }
      : null,
  }));

  return {
    todayCount: todayReservations.length,
    todayGuests,
    pendingAmount,
    allergiesCount,
    upcomingCount,
    recentReservations,
    liveReservationRows,
  };
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CHECKED_IN: "En sala",
  CANCELLED: "Cancelada",
  PAYMENT_FAILED: "Pago fallido",
};

const STATUS_COLOR: Record<string, string> = {
  PENDING: "#F59E0B",
  CONFIRMED: "#10B981",
  CHECKED_IN: "#875BF7",
  CANCELLED: "#6B7280",
  PAYMENT_FAILED: "#EF4444",
};

export default async function AdminDashboard() {
  const {
    todayCount,
    todayGuests,
    pendingAmount,
    allergiesCount,
    upcomingCount,
    recentReservations,
    liveReservationRows,
  } = await getDashboardStats();

  const stats = [
    { label: "Reservas hoy", value: todayCount, accent: "#875BF7", icon: "◈" },
    { label: "Comensales hoy", value: todayGuests, accent: "#10B981", icon: "◇" },
    { label: "Pendiente hoy", value: `${pendingAmount.toFixed(0)}€`, accent: "#F59E0B", icon: "◉" },
    { label: "Alergias hoy", value: allergiesCount, accent: "#3B82F6", icon: "⚠", subtitle: "ver semana" },
    { label: "Próximas", value: upcomingCount, accent: "#06B6D4", icon: "◻" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        padding: "2.5rem",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 600,
            color: "#1A1A2E",
            marginBottom: "0.5rem",
          }}
        >
          Escritorio
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#8B94A8" }}>
          {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2.5rem",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748B",
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                >
                  {s.label}
                </span>
                {s.subtitle && (
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "#94A3B8",
                      marginTop: "0.3rem",
                    }}
                  >
                    {s.subtitle}
                  </div>
                )}
              </div>
              <span
                style={{
                  fontSize: "1.25rem",
                  color: s.accent,
                  opacity: 0.6,
                }}
              >
                {s.icon}
              </span>
            </div>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: s.accent,
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: "2rem",
        }}
      >
        {/* Left: Activity Feed */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h2
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#1A1A2E",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            🔔 Actividad reciente
          </h2>
          <RecentActivityFeed initialItems={liveReservationRows} />
        </div>

        {/* Right: Recent Reservations */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1A1A2E" }}>
              Últimas reservas
            </h2>
            <a
              href="#"
              style={{
                fontSize: "0.8rem",
                color: "#875BF7",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Ver todas →
            </a>
          </div>
          <style>{`.admin-table-row:hover { background-color: #F8FAFC; }`}</style>
          <div style={{ overflowX: "auto", flex: 1 }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.85rem",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid #E2E8F0",
                    backgroundColor: "#F8FAFC",
                  }}
                >
                  {["FECHA", "NOMBRE", "PERS.", "LOCAL", "ESTADO"].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "0.875rem 1.25rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "#64748B",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentReservations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: "2.5rem",
                        textAlign: "center",
                        color: "#94A3B8",
                        fontSize: "0.9rem",
                      }}
                    >
                      Sin reservas aún
                    </td>
                  </tr>
                ) : (
                  recentReservations.map((r, i) => {
                    const statusColor = STATUS_COLOR[r.status] ?? "#94A3B8";
                    const statusLabel = STATUS_LABEL[r.status] ?? r.status;
                    const eventDate = r.event 
                      ? new Date(r.event.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })
                      : "—";

                    return (
                      <tr
                        key={r.id}
                        className="admin-table-row"
                        style={{
                          borderBottom:
                            i < recentReservations.length - 1
                              ? "1px solid #E2E8F0"
                              : "none",
                        }}
                      >
                        <td
                          style={{
                            padding: "0.875rem 1.25rem",
                            color: "#1A1A2E",
                            fontWeight: 500,
                          }}
                        >
                          {eventDate}
                        </td>
                        <td
                          style={{
                            padding: "0.875rem 1.25rem",
                            color: "#1A1A2E",
                            fontWeight: 500,
                          }}
                        >
                          {r.customer.name}
                        </td>
                        <td
                          style={{
                            padding: "0.875rem 1.25rem",
                            color: "#64748B",
                          }}
                        >
                          {r.guests}p
                        </td>
                        <td
                          style={{
                            padding: "0.875rem 1.25rem",
                            color: "#64748B",
                            fontSize: "0.8rem",
                          }}
                        >
                          {(r.venue?.name as string | undefined) === "BERTRAND" || (r.venue?.name as string | undefined) === "SARRIA"
                            ? "Bertrand"
                            : r.venue?.name === "URGELL"
                              ? "Urgell"
                              : "—"}
                        </td>
                        <td
                          style={{
                            padding: "0.875rem 1.25rem",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              padding: "0.35rem 0.75rem",
                              borderRadius: "20px",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              color: statusColor,
                              backgroundColor: `${statusColor}15`,
                            }}
                          >
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
