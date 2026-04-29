"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

type VisitRow = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  visitDate: string;
  visitTime: string;
  status: string;
  createdAt: string;
};

type TimeFilter = "today" | "week" | "month" | "all";

export function VisitasTable({ visits: initial }: { visits: VisitRow[] }) {
  const [visits, setVisits] = useState(initial);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = visits;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (timeFilter === "today") {
      list = list.filter((v) => {
        const d = new Date(v.visitDate);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
      });
    } else if (timeFilter === "week") {
      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() + 7);
      list = list.filter((v) => {
        const d = new Date(v.visitDate);
        return d >= today && d <= weekEnd;
      });
    } else if (timeFilter === "month") {
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      list = list.filter((v) => {
        const d = new Date(v.visitDate);
        return d >= today && d <= monthEnd;
      });
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (v) =>
          v.customer.name.toLowerCase().includes(q) ||
          v.customer.email.toLowerCase().includes(q) ||
          v.visitDate.includes(q)
      );
    }

    return list;
  }, [visits, timeFilter, search]);

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta visita?")) return;
    const res = await fetch(`/api/admin/reservations/${id}`, { method: "DELETE" });
    if (res.ok) setVisits((prev) => prev.filter((v) => v.id !== id));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
      {/* Toolbar */}
      <div style={{
        padding: "1rem 1.5rem",
        background: "var(--color-admin-surface)",
        borderBottom: "1px solid var(--color-admin-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["today", "week", "month", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setTimeFilter(f)}
              style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                border: "1px solid var(--color-admin-border)",
                background: timeFilter === f ? "var(--color-admin-accent)" : "transparent",
                color: timeFilter === f ? "#fff" : "var(--color-admin-text)",
                cursor: "pointer",
              }}
            >
              {f === "today" ? "Hoy" : f === "week" ? "Semana" : f === "month" ? "Mes" : "Todas"}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "1px solid var(--color-admin-border)",
            background: "var(--color-admin-bg)",
            color: "var(--color-admin-text)",
            fontSize: "0.8rem",
            width: "240px",
            outline: "none"
          }}
        />
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
          <thead>
            <tr style={{ background: "var(--color-admin-surface)", textAlign: "left" }}>
              <th style={thStyle}>Fecha y Hora</th>
              <th style={thStyle}>Cliente</th>
              <th style={thStyle}>Contacto</th>
              <th style={thStyle}>Solicitado el</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} style={{ borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)" }}>
                <td style={tdStyle}>
                  <div style={{ fontWeight: 600 }}>{new Date(v.visitDate).toLocaleDateString("es-ES")}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>{v.visitTime}</div>
                </td>
                <td style={tdStyle}>{v.customer.name}</td>
                <td style={tdStyle}>
                  <div>{v.customer.email}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>{v.customer.phone}</div>
                </td>
                <td style={tdStyle}>{new Date(v.createdAt).toLocaleDateString("es-ES")}</td>
                <td style={tdStyle}>
                  <button 
                    onClick={() => handleDelete(v.id)}
                    style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "var(--color-admin-muted)" }}>
                  No se encontraron visitas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = { padding: "0.75rem 1rem", borderBottom: "1px solid var(--color-admin-border)", fontSize: "0.7rem", textTransform: "uppercase" as const, letterSpacing: "0.05em", color: "var(--color-admin-muted)" };
const tdStyle = { padding: "0.75rem 1rem" };
