"use client";

import { useState, useEffect } from "react";

type Redirect = {
  id: string;
  fromPath: string;
  toPath: string;
  statusCode: number;
  createdAt: string;
};

export function RedirectsList() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRedirect, setNewRedirect] = useState({ fromPath: "", toPath: "", statusCode: 301 });
  const [creating, setCreating] = useState(false);

  async function fetchRedirects() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/redirects");
      const json = await res.json();
      if (json.ok) setRedirects(json.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchRedirects(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRedirect),
      });
      const json = await res.json();
      if (json.ok) {
        setNewRedirect({ fromPath: "", toPath: "", statusCode: 301 });
        fetchRedirects();
      } else {
        alert(json.error || "Error al crear redirección");
      }
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Borrar esta redirección?")) return;
    const res = await fetch("/api/admin/redirects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchRedirects();
  }

  return (
    <div style={{ padding: "2rem", background: "#F4F6FA", minHeight: "100vh" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, color: "#1A1A2E" }}>Redirecciones SEO (301)</h1>
        <p style={{ fontSize: "0.88rem", color: "#8B94A8" }}>Gestiona las redirecciones de URLs antiguas para no perder tráfico de Google.</p>
      </div>

      {/* Add Form */}
      <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #EAEEF4", marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Añadir nueva redirección</h3>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.4rem" }}>URL Antigua (desde)</label>
            <input
              placeholder="/pagina-antigua"
              value={newRedirect.fromPath}
              onChange={(e) => setNewRedirect({ ...newRedirect, fromPath: e.target.value })}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #D1D5DB" }}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.4rem" }}>URL Nueva (hacia)</label>
            <input
              placeholder="/nueva-url"
              value={newRedirect.toPath}
              onChange={(e) => setNewRedirect({ ...newRedirect, toPath: e.target.value })}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #D1D5DB" }}
              required
            />
          </div>
          <div style={{ width: "120px" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.4rem" }}>Código</label>
            <select
              value={newRedirect.statusCode}
              onChange={(e) => setNewRedirect({ ...newRedirect, statusCode: Number(e.target.value) })}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #D1D5DB" }}
            >
              <option value={301}>301 (Permanente)</option>
              <option value={302}>302 (Temporal)</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={creating}
            style={{ padding: "0.65rem 1.5rem", background: "#875BF7", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
          >
            {creating ? "Añadiendo..." : "Añadir"}
          </button>
        </form>
      </div>

      {/* List Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #EAEEF4", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "#8B94A8" }}>Cargando redirecciones...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #EAEEF4", background: "#F9FAFB" }}>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Desde</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Hacia</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Código</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {redirects.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #EAEEF4" }}>
                  <td style={{ padding: "1rem 1.5rem" }}><code style={{ color: "#EF4444" }}>{r.fromPath}</code></td>
                  <td style={{ padding: "1rem 1.5rem" }}><code style={{ color: "#10B981" }}>{r.toPath}</code></td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span style={{ padding: "2px 6px", background: "#F3F4F6", borderRadius: "4px", fontSize: "0.75rem" }}>{r.statusCode}</span>
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <button
                      onClick={() => handleDelete(r.id)}
                      style={{ border: "none", background: "none", color: "#EF4444", cursor: "pointer", fontSize: "0.85rem" }}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
              {redirects.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: "4rem", textAlign: "center", color: "#9CA3AF" }}>No hay redirecciones configuradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
