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

import { CreatePageModal } from "./CreatePageModal";

export function PagesList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  async function handleCreatePage({ title, slug }: { title: string; slug: string }) {
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
      setIsModalOpen(false);
    }
  }

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingBulk, setIsDeletingBulk] = useState(false);

  const toggleAll = () => {
    if (selectedIds.length === pages.length - 1) { // -1 for home
      setSelectedIds([]);
    } else {
      setSelectedIds(pages.filter(p => p.slug !== "home").map(p => p.id));
    }
  };

  const toggleOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  async function handleBulkDelete() {
    if (!confirm(`¿Estás seguro de que quieres borrar las ${selectedIds.length} páginas seleccionadas?`)) return;
    setIsDeletingBulk(true);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      if (res.ok) {
        setSelectedIds([]);
        fetchPages();
      }
    } finally {
      setIsDeletingBulk(false);
    }
  }

  return (
    <div style={{ padding: "2rem", background: "#F4F6FA", minHeight: "100vh" }}>
      <CreatePageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleCreatePage} 
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, color: "var(--color-admin-text)" }}>Páginas del sitio</h1>
          <p style={{ fontSize: "0.88rem", color: "var(--color-admin-muted)" }}>Gestiona las páginas y su contenido visual.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={isDeletingBulk}
              style={{
                padding: "0.6rem 1.25rem",
                background: "#EF4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)"
              }}
            >
              <span>🗑</span> {isDeletingBulk ? "Borrando..." : `Borrar ${selectedIds.length} seleccionadas`}
            </button>
          )}
          <Link
            href="/admin/web/redirects"
            style={{
              padding: "0.6rem 1.25rem",
              background: "white",
              color: "var(--color-admin-text)",
              border: "1px solid var(--color-admin-border)",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.82rem"
            }}
          >
            <span>🔗</span> Redirecciones
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={creating}
            style={{
              padding: "0.6rem 1.25rem",
              background: "var(--color-admin-accent)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.2s",
              fontSize: "0.82rem"
            }}
          >
            {creating ? "Creando..." : "+ Nueva página"}
          </button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #EAEEF4", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "#8B94A8" }}>Cargando páginas...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #EAEEF4", background: "#F9FAFB" }}>
                <th style={{ padding: "1rem 1.5rem", width: "40px" }}>
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length > 0 && selectedIds.length === pages.filter(p => p.slug !== "home").length} 
                    onChange={toggleAll}
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Título</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>URL (Slug)</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Bloques</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Estado</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} style={{ 
                  borderBottom: "1px solid #EAEEF4",
                  background: selectedIds.includes(page.id) ? "#F0EBFE" : "transparent"
                }}>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    {page.slug !== "home" && (
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(page.id)} 
                        onChange={() => toggleOne(page.id)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </td>
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
                        style={{ color: "var(--color-admin-accent)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}
                      >
                        Editar
                      </Link>
                      <a
                        href={page.slug === "home" ? "/" : `/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--color-admin-muted)", textDecoration: "none", fontSize: "0.85rem" }}
                      >
                        Ver
                      </a>
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
