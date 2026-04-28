import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { TimeLogFilters } from "./TimeLogFilters";

export const dynamic = "force-dynamic";

export default async function TimeLogsPage({
  searchParams,
}: {
  searchParams: { period?: string; date?: string; employeeId?: string };
}) {
  const period = (searchParams.period as "day" | "week" | "month") || "month";
  const dateParam = searchParams.date || new Date().toISOString().split("T")[0];
  const employeeId = searchParams.employeeId || "all";

  const referenceDate = new Date(dateParam);
  let start: Date;
  let end: Date;

  if (period === "day") {
    start = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate(), 0, 0, 0);
    end = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate(), 23, 59, 59, 999);
  } else if (period === "week") {
    // get start of week (Monday)
    const day = referenceDate.getDay() || 7; // 1-7
    referenceDate.setDate(referenceDate.getDate() - day + 1);
    start = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate(), 0, 0, 0);
    end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
    end.setHours(23, 59, 59, 999);
  } else {
    // month
    start = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
    end = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0, 23, 59, 59, 999);
  }

  const where: any = {
    clockIn: { gte: start, lte: end }
  };
  if (employeeId !== "all") {
    where.employeeId = employeeId;
  }

  const logs = await prisma.timeLog.findMany({
    where,
    include: {
      employee: { select: { name: true, pin: true } },
    },
    orderBy: { clockIn: "desc" },
  });

  const employeesList = await prisma.employee.findMany({ select: { id: true, name: true } });

  // Calculate total hours per employee
  const employeeStats: Record<string, { name: string; totalMinutes: number }> = {};
  
  for (const log of logs) {
    if (!employeeStats[log.employeeId]) {
      employeeStats[log.employeeId] = { name: log.employee.name, totalMinutes: 0 };
    }
    if (log.clockOut) {
      const diffMs = log.clockOut.getTime() - log.clockIn.getTime();
      employeeStats[log.employeeId].totalMinutes += Math.round(diffMs / 60000);
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
            Registros de Fichaje
          </h1>
          <p style={{ color: "var(--color-admin-muted)", marginTop: "0.2rem" }}>
            Visualiza las horas trabajadas por los empleados.
          </p>
        </div>
        <Link
          href="/admin/configuracion/empleados"
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid var(--color-admin-border)",
            borderRadius: "6px",
            color: "var(--color-admin-text)",
            textDecoration: "none",
            fontSize: "0.85rem",
          }}
        >
          Volver a Empleados
        </Link>
      </div>

      <TimeLogFilters 
        employees={employeesList}
        defaultPeriod={period}
        defaultDate={dateParam}
        defaultEmployeeId={employeeId}
      />

      <div style={{ background: "var(--color-admin-surface)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--color-admin-border)", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", marginBottom: "1rem", color: "var(--color-admin-text)" }}>
          Resumen {period === "day" ? "del día" : period === "week" ? "de la semana" : "del mes"}
        </h2>
        {Object.keys(employeeStats).length === 0 ? (
          <p style={{ color: "var(--color-admin-muted)", fontSize: "0.9rem" }}>No hay registros completados este mes.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {Object.values(employeeStats).map(stat => (
              <div key={stat.name} style={{ padding: "1rem", background: "var(--color-admin-bg)", borderRadius: "6px", border: "1px solid var(--color-admin-border)" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--color-admin-muted)", marginBottom: "0.5rem" }}>{stat.name}</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--color-admin-text)" }}>
                  {Math.floor(stat.totalMinutes / 60)}h {stat.totalMinutes % 60}m
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: "var(--color-admin-surface)", borderRadius: "8px", border: "1px solid var(--color-admin-border)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-bg)" }}>
              <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Fecha</th>
              <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Empleado</th>
              <th style={{ textAlign: "center", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Entrada</th>
              <th style={{ textAlign: "center", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Salida</th>
              <th style={{ textAlign: "right", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Duración</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--color-admin-muted)", fontSize: "0.9rem" }}>
                  No hay registros de fichaje para este mes
                </td>
              </tr>
            ) : (
              logs.map(log => {
                const clockInStr = log.clockIn.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" });
                const clockOutStr = log.clockOut ? log.clockOut.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }) : "-";
                
                let durationStr = "-";
                if (log.clockOut) {
                  const diff = log.clockOut.getTime() - log.clockIn.getTime();
                  const mins = Math.floor(diff / 60000);
                  durationStr = `${Math.floor(mins / 60)}h ${mins % 60}m`;
                }

                return (
                  <tr key={log.id} style={{ borderBottom: "1px solid var(--color-admin-border)" }}>
                    <td style={{ padding: "1rem", color: "var(--color-admin-text)", fontSize: "0.9rem" }}>
                      {log.clockIn.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Madrid" })}
                    </td>
                    <td style={{ padding: "1rem", color: "var(--color-admin-text)", fontSize: "0.9rem" }}>
                      {log.employee.name}
                    </td>
                    <td style={{ padding: "1rem", color: "var(--color-admin-text)", fontSize: "0.9rem", textAlign: "center" }}>
                      {clockInStr}
                    </td>
                    <td style={{ padding: "1rem", color: "var(--color-admin-text)", fontSize: "0.9rem", textAlign: "center" }}>
                      {clockOutStr}
                      {log.autoClockedOut && (
                        <span style={{ color: "#E74C3C", fontSize: "0.7rem", display: "block", marginTop: "0.2rem" }}>
                          ⚠️ Auto-cierre
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "1rem", color: "var(--color-admin-text)", fontSize: "0.9rem", textAlign: "right" }}>
                      {durationStr}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
