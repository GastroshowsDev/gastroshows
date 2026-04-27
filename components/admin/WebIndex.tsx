"use client";

import Link from "next/link";

type PageCard = {
  href: string;
  previewHref: string;
  icon: string;
  title: string;
  description: string;
  fieldCount: number;
  accent: string;
};

const PAGES: PageCard[] = [
  {
    href: "/admin/web/pages",
    previewHref: "/",
    icon: "🏗",
    title: "Page Builder",
    description: "Crea y diseña páginas personalizadas con bloques arrastrables.",
    fieldCount: 0,
    accent: "#10B981",
  },
  {
    href: "/admin/web/redirects",
    previewHref: "/",
    icon: "🔗",
    title: "Redirecciones SEO",
    description: "Configura redirecciones 301 de URLs antiguas para no perder tráfico.",
    fieldCount: 0,
    accent: "#F59E0B",
  },
];

export function WebIndex() {
  return (
    <div style={{ padding: "2rem", background: "#F4F6FA", minHeight: "100vh" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, color: "#1A1A2E" }}>Gestión Web</h1>
        <p style={{ fontSize: "0.88rem", color: "#8B94A8", marginTop: "0.5rem" }}>
          Administra el contenido visual, las páginas y las redirecciones de GastroShows.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {PAGES.map((page) => (
          <div
            key={page.href}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "1.5rem",
              border: "1px solid #EAEEF4",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${page.accent}15`,
                  color: page.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                {page.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#111827", margin: 0 }}>{page.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "#6B7280", marginTop: "0.4rem", lineHeight: "1.4" }}>
                  {page.description}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
                {page.fieldCount > 0 ? `${page.fieldCount} campos configurables` : "Control total"}
              </span>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Link
                  href={page.href}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    background: "#F3F4F6",
                    color: "#374151",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Configurar
                </Link>
                <a
                  href={page.previewHref}
                  target="_blank"
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid #EAEEF4",
                    color: "#6B7280",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Ver
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
