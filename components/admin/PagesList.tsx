"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Page = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  updatedAt: string;
  _count: { blocks: number };
};

export function PagesList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  async function fetchPages() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pages");
      const json = await res.json();
      if (json.ok) setPages(json.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPages(); }, []);

  async function createPage() {
    const title = prompt("Título de la nueva página:");
    if (!title) return;
    
    const slug = prompt("URL de la página (slug):", title.toLowerCase().replace(/\s+/g, "-"));
    if (!slug) return;

    setCreating(true);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug }),
      });
      const json = await res.json();
      if (json.ok) {
        window.location.href = `/admin/web/pages/${json.data.id}/editor`;
      } else {
        alert(json.error || "Error al crear la página");
      }
    } finally {
      setCreating(false);
    }
  }

  async function deletePage(id: string, slug: string) {
    if (slug === "home") return alert("No puedes borrar la página de inicio");
    if (!confirm(`¿Estás seguro de que quieres borrar la página "${slug}"?`)) return;

    const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
    if (res.ok) fetchPages();
  }

  return (
    <div style={{ padding: "2rem", background: "#F4F6FA", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, color: "#1A1A2E" }}>Páginas del sitio</h1>
          <p style={{ fontSize: "0.88rem", color: "#8B94A8" }}>Gestiona las páginas y su contenido visual.</p>
        </div>
        <button
          onClick={createPage}
          disabled={creating}
          style={{
            padding: "0.75rem 1.5rem", background: "#875BF7", color: "white",
            border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer",
          }}
        >
          {creating ? "Creando..." : "+ Nueva página"}
        </button>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #EAEEF4", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "#8B94A8" }}>Cargando páginas...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #EAEEF4", background: "#F9FAFB" }}>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Título</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>URL (Slug)</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Bloques</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Estado</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} style={{ borderBottom: "1px solid #EAEEF4" }}>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <div style={{ fontWeight: 600, color: "#111827" }}>{page.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Actualizado: {new Date(page.updatedAt).toLocaleDateString()}</div>
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <code style={{ background: "#F3F4F6", padding: "2px 6px", borderRadius: "4px" }}>/{page.slug}</code>
                  </td>
                  <td style={{ padding: "1rem 1.5rem", color: "#4B5563" }}>{page._count.blocks} bloques</td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span style={{
                      padding: "4px 8px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: 600,
                      background: page.published ? "#D1FAE5" : "#F3F4F6",
                      color: page.published ? "#065F46" : "#4B5563",
                    }}>
                      {page.published ? "Publicada" : "Borrador"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <Link
                        href={`/admin/web/pages/${page.id}/editor`}
                        style={{ color: "#875BF7", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}
                      >
                        Editar visualmente
                      </Link>
                      <a
                        href={page.slug === "home" ? "/" : `/${page.slug}`}
                        target="_blank"
                        style={{ color: "#6B7280", textDecoration: "none", fontSize: "0.85rem" }}
                      >
                        Ver página
                      </a>
                      {page.slug !== "home" && (
                        <button
                          onClick={() => deletePage(page.id, page.slug)}
                          style={{ border: "none", background: "none", color: "#EF4444", cursor: "pointer", padding: 0 }}
                        >
                          Borrar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
