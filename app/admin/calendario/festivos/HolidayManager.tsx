"use client";

import { useState } from "react";
import { Holiday } from "@prisma/client";

export function HolidayManager({ initialHolidays }: { initialHolidays: Holiday[] }) {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/holidays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, name, recurring }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al añadir");
      
      setHolidays([...holidays, data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setDate("");
      setName("");
      setRecurring(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este día festivo?")) return;
    try {
      const res = await fetch(`/api/admin/holidays/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      setHolidays(holidays.filter(h => h.id !== id));
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  const handleToggleRecurring = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/holidays/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recurring: !current }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      const updated = await res.json();
      setHolidays(holidays.map(h => h.id === id ? updated : h));
    } catch (err) {
      alert("Error al actualizar");
    }
  };

  return (
    <div>
      <div style={{ background: "var(--color-admin-surface)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--color-admin-border)", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--color-admin-text)" }}>Añadir nuevo festivo</h2>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-admin-muted)", marginBottom: "0.4rem" }}>Fecha</label>
            <input 
              type="date" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", borderRadius: "4px" }} 
            />
          </div>
          <div style={{ flex: 2 }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-admin-muted)", marginBottom: "0.4rem" }}>Nombre / Motivo (Opcional)</label>
            <input 
              type="text" 
              placeholder="Ej. Navidad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", borderRadius: "4px" }} 
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingBottom: "0.6rem" }}>
            <input 
              type="checkbox" 
              id="recurring"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <label htmlFor="recurring" style={{ fontSize: "0.85rem", color: "var(--color-admin-text)", cursor: "pointer" }}>¿Recurrente cada año?</label>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: "0.6rem 1.5rem", background: "var(--color-admin-accent)", color: "#0A0A0A", border: "none", borderRadius: "4px", fontWeight: 600, cursor: loading ? "wait" : "pointer" }}
          >
            {loading ? "Añadiendo..." : "Añadir"}
          </button>
        </form>
        {error && <p style={{ color: "#E74C3C", fontSize: "0.85rem", marginTop: "1rem" }}>{error}</p>}
      </div>

      <div style={{ background: "var(--color-admin-surface)", borderRadius: "8px", border: "1px solid var(--color-admin-border)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-bg)" }}>
              <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Fecha</th>
              <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Nombre</th>
              <th style={{ textAlign: "center", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Recurrente</th>
              <th style={{ textAlign: "right", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {holidays.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: "2rem", textAlign: "center", color: "var(--color-admin-muted)", fontSize: "0.9rem" }}>
                  No hay días festivos configurados
                </td>
              </tr>
            ) : (
              holidays.map(h => (
                <tr key={h.id} style={{ borderBottom: "1px solid var(--color-admin-border)" }}>
                  <td style={{ padding: "1rem", color: "var(--color-admin-text)" }}>
                    {new Date(h.date).toLocaleDateString("es-ES", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td style={{ padding: "1rem", color: "var(--color-admin-muted)" }}>{h.name || "-"}</td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <input 
                        type="checkbox" 
                        checked={h.recurring}
                        onChange={() => handleToggleRecurring(h.id, h.recurring)}
                        style={{ width: "16px", height: "16px", cursor: "pointer" }}
                        title={h.recurring ? "Se repite cada año" : "Solo este año"}
                      />
                    </div>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <button 
                      onClick={() => handleDelete(h.id)}
                      style={{ background: "none", border: "none", color: "#E74C3C", cursor: "pointer", fontSize: "0.85rem", textDecoration: "underline" }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
