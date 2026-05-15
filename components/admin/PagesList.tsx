"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Page = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  updatedAt: string;
  type?: "dynamic" | "hardcoded";
  _count?: { blocks: number };
};

import { CreatePageModal } from "./CreatePageModal";
import { MigratePageModal } from "./MigratePageModal";

export function PagesList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMigrateModalOpen, setIsMigrateModalOpen] = useState(false);

  async function fetchPages() {
    setLoading(true);
    try {
      // Fetch dynamic pages
      const resBuilder = await fetch("/api/admin/pages");
      const jsonBuilder = await resBuilder.json();
      
      // Fetch hardcoded pages
      const resStatic = await fetch("/api/admin/web/discover");
      const jsonStatic = await resStatic.json();

      let builderPages: Page[] = [];
      if (jsonBuilder.ok) {
        builderPages = jsonBuilder.data.map((p: any) => ({ ...p, type: "dynamic" }));
      }

      let staticPages: Page[] = [];
      if (jsonStatic.ok) {
        staticPages = jsonStatic.data.map((p: any) => ({ ...p, type: "hardcoded" }));
      }

      // Combine and sort by type (Builder first) then updatedAt
      const combined = [...builderPages, ...staticPages].sort((a, b) => {
        if (a.type !== b.type) return a.type === "dynamic" ? -1 : 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });

      setPages(combined);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPages(); }, []);

  async function handleMigratePage(url: string) {
    setMigrating(true);
    try {
      const res = await fetch("/api/admin/web/migrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (json.ok) {
        alert("Página migrada con éxito");
        fetchPages();
      } else {
        alert(json.error || "Error al migrar la página");
      }
    } catch (err) {
      alert("Error de conexión al migrar");
    } finally {
      setMigrating(false);
      setIsMigrateModalOpen(false);
    }
  }

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

      <MigratePageModal 
        isOpen={isMigrateModalOpen}
        onClose={() => setIsMigrateModalOpen(false)}
        onConfirm={handleMigratePage}
        loading={migrating}
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
            onClick={() => setIsMigrateModalOpen(true)}
            disabled={migrating}
            style={{
              padding: "0.6rem 1.25rem",
              background: "white",
              color: "#4B5563",
              border: "1px solid var(--color-admin-border)",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.82rem"
            }}
          >
            <span>📥</span> {migrating ? "Migrando..." : "Importar desde Gastroshows"}
          </button>
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
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>Tipo</th>
                <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase" }}>URL (Slug)</th>
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
                    <span style={{
                      padding: "4px 8px", borderRadius: "6px", fontSize: "0.65rem", fontWeight: 700,
                      background: page.type === "dynamic" ? "var(--gs-accent-light)" : "#E0E7FF",
                      color: page.type === "dynamic" ? "var(--gs-accent)" : "#4338CA",
                      textTransform: "uppercase"
                    }}>
                      {page.type === "dynamic" ? "Builder" : "Código (SEO)"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <code style={{ background: "#F3F4F6", padding: "2px 6px", borderRadius: "4px" }}>/{page.slug}</code>
                  </td>
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
                      {page.type === "dynamic" ? (
                        <Link
                          href={`/admin/web/pages/${page.id}/editor`}
                          style={{ color: "var(--color-admin-accent)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}
                        >
                          Editar
                        </Link>
                      ) : (
                        <span style={{ color: "#9CA3AF", fontSize: "0.85rem", cursor: "default", fontStyle: "italic" }}>
                          Archivo TSX
                        </span>
                      )}
                      <a
                        href={page.slug === "" || page.slug === "home" ? "/" : `/${page.slug}`}
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
