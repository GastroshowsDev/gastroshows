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
  const [editingVisit, setEditingVisit] = useState<VisitRow | null>(null);
  const [saving, setSaving] = useState(false);

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

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingVisit || saving) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/reservations/${editingVisit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingVisit.customer.name,
          email: editingVisit.customer.email,
          phone: editingVisit.customer.phone,
          visitDate: editingVisit.visitDate,
          visitTime: editingVisit.visitTime,
          status: editingVisit.status,
        }),
      });
      const json = await res.json();
      if (json.ok) {
        setVisits((prev) => prev.map((v) => v.id === editingVisit.id ? editingVisit : v));
        setEditingVisit(null);
      }
    } finally {
      setSaving(false);
    }
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
              <tr 
                key={v.id} 
                onClick={() => setEditingVisit(v)}
                style={{ 
                  borderBottom: "1px solid var(--color-admin-border)", 
                  background: "var(--color-admin-surface)",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-admin-bg)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-admin-surface)")}
              >
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
                    onClick={(e) => { e.stopPropagation(); handleDelete(v.id); }}
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

      {editingVisit && (
        <div style={overlayStyle} onClick={() => setEditingVisit(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Editar Visita</h2>
              <button onClick={() => setEditingVisit(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "var(--color-admin-muted)" }}>✕</button>
            </div>
            <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Nombre</label>
                <input 
                  style={inputStyle} 
                  value={editingVisit.customer.name} 
                  onChange={(e) => setEditingVisit({...editingVisit, customer: {...editingVisit.customer, name: e.target.value}})} 
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input 
                  style={inputStyle} 
                  type="email"
                  value={editingVisit.customer.email} 
                  onChange={(e) => setEditingVisit({...editingVisit, customer: {...editingVisit.customer, email: e.target.value}})} 
                />
              </div>
              <div>
                <label style={labelStyle}>Teléfono</label>
                <input 
                  style={inputStyle} 
                  value={editingVisit.customer.phone} 
                  onChange={(e) => setEditingVisit({...editingVisit, customer: {...editingVisit.customer, phone: e.target.value}})} 
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Fecha</label>
                  <input 
                    type="date"
                    style={inputStyle} 
                    value={editingVisit.visitDate.split("T")[0]} 
                    onChange={(e) => setEditingVisit({...editingVisit, visitDate: e.target.value})} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Hora</label>
                  <input 
                    style={inputStyle} 
                    value={editingVisit.visitTime} 
                    onChange={(e) => setEditingVisit({...editingVisit, visitTime: e.target.value})} 
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button 
                  type="button"
                  onClick={() => setEditingVisit(null)}
                  style={{ flex: 1, padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--color-admin-border)", background: "none", color: "var(--color-admin-text)", cursor: "pointer" }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  style={{ flex: 1, padding: "0.6rem", borderRadius: "6px", border: "none", background: "var(--color-admin-accent)", color: "#fff", cursor: "pointer", fontWeight: 600, opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: "0.75rem 1rem", borderBottom: "1px solid var(--color-admin-border)", fontSize: "0.7rem", textTransform: "uppercase" as const, letterSpacing: "0.05em", color: "var(--color-admin-muted)" };
const tdStyle = { padding: "0.75rem 1rem" };
const overlayStyle: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalStyle: React.CSSProperties = { background: "var(--color-admin-surface)", padding: "2rem", borderRadius: "12px", width: "100%", maxWidth: "450px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-muted)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.8rem", borderRadius: "6px", border: "1px solid var(--color-admin-border)", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", fontSize: "0.85rem", outline: "none" };
