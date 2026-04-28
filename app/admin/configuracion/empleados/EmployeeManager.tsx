"use client";

import { useState } from "react";
import { Employee } from "@prisma/client";

export function EmployeeManager({ initialEmployees }: { initialEmployees: Employee[] }) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (pin.length !== 4) {
      setError("El PIN debe tener 4 dígitos.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, pin }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al añadir");
      
      setEmployees([data, ...employees]);
      setName("");
      setEmail("");
      setPhone("");
      setPin("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar empleado? Perderás también sus registros de fichaje asociados.")) return;
    try {
      const res = await fetch(`/api/admin/employees/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      setEmployees(employees.filter(e => e.id !== id));
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/employees/${id}`, { 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !current }),
      });
      if (!res.ok) throw new Error("Error");
      setEmployees(employees.map(e => e.id === id ? { ...e, active: !current } : e));
    } catch (err) {
      alert("Error al cambiar estado");
    }
  };

  return (
    <div>
      <div style={{ background: "var(--color-admin-surface)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--color-admin-border)", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--color-admin-text)" }}>Nuevo Empleado</h2>
        <form onSubmit={handleAdd} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-admin-muted)", marginBottom: "0.4rem" }}>Nombre completo *</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", borderRadius: "4px" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-admin-muted)", marginBottom: "0.4rem" }}>PIN (4 dígitos) *</label>
            <input 
              type="text" 
              required
              maxLength={4}
              pattern="\d{4}"
              placeholder="Ej. 1234"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              style={{ width: "100%", padding: "0.6rem", background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", borderRadius: "4px" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-admin-muted)", marginBottom: "0.4rem" }}>Email (Opcional)</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", borderRadius: "4px" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-admin-muted)", marginBottom: "0.4rem" }}>Teléfono (Opcional)</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", color: "var(--color-admin-text)", borderRadius: "4px" }} 
            />
          </div>
          <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end" }}>
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: "0.6rem 1.5rem", background: "var(--color-admin-accent)", color: "#0A0A0A", border: "none", borderRadius: "4px", fontWeight: 600, cursor: loading ? "wait" : "pointer" }}
            >
              {loading ? "Guardando..." : "Guardar Empleado"}
            </button>
          </div>
        </form>
        {error && <p style={{ color: "#E74C3C", fontSize: "0.85rem", marginTop: "1rem" }}>{error}</p>}
      </div>

      <div style={{ background: "var(--color-admin-surface)", borderRadius: "8px", border: "1px solid var(--color-admin-border)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-admin-border)", background: "var(--color-admin-bg)" }}>
              <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Nombre</th>
              <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>PIN</th>
              <th style={{ textAlign: "left", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Contacto</th>
              <th style={{ textAlign: "center", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Activo</th>
              <th style={{ textAlign: "right", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--color-admin-muted)", fontSize: "0.9rem" }}>
                  No hay empleados registrados
                </td>
              </tr>
            ) : (
              employees.map(e => (
                <tr key={e.id} style={{ borderBottom: "1px solid var(--color-admin-border)", opacity: e.active ? 1 : 0.5 }}>
                  <td style={{ padding: "1rem", color: "var(--color-admin-text)", fontWeight: 500 }}>{e.name}</td>
                  <td style={{ padding: "1rem", color: "var(--color-admin-accent)", fontFamily: "monospace", fontSize: "1.1rem" }}>{e.pin}</td>
                  <td style={{ padding: "1rem", color: "var(--color-admin-muted)", fontSize: "0.85rem" }}>
                    {e.email && <div>{e.email}</div>}
                    {e.phone && <div>{e.phone}</div>}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <button 
                      onClick={() => toggleActive(e.id, e.active)}
                      style={{ background: e.active ? "rgba(46,204,113,0.1)" : "rgba(231,76,60,0.1)", color: e.active ? "#2ECC71" : "#E74C3C", border: "none", padding: "0.3rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", cursor: "pointer" }}
                    >
                      {e.active ? "Sí" : "No"}
                    </button>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <button 
                      onClick={() => handleDelete(e.id)}
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
