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
    href: "/admin/web/landing",
    previewHref: "/",
    icon: "◈",
    title: "Landing principal",
    description: "Hero, experiencia, vale regalo y pie de página.",
    fieldCount: 40,
    accent: "#875BF7",
  },
  {
    href: "/admin/web/eventos",
    previewHref: "/eventos",
    icon: "◇",
    title: "Eventos privados",
    description: "Landing para grupos cerrados: hero, características del espacio y contacto WhatsApp.",
    fieldCount: 14,
    accent: "#C8A96E",
  },
];

export function WebIndex() {
  return (
    <div style={{ padding: "2.5rem", background: "#F4F6FA", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, color: "#1A1A2E", marginBottom: "0.4rem" }}>
          Contenido web
        </h1>
        <p style={{ fontSize: "0.88rem", color: "#8B94A8" }}>
          Selecciona una página para editar su contenido. Los cambios se publican al guardar.
        </p>
      </div>

      {/* Page cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem",
        maxWidth: "860px",
      }}>
        {PAGES.map((page) => (
          <PageCard key={page.href} page={page} />
        ))}
      </div>

      {/* Info footer */}
      <div style={{
        marginTop: "3rem",
        maxWidth: "860px",
        padding: "1.25rem 1.5rem",
        background: "#FFFFFF",
        border: "1px solid #EAEEF4",
        borderRadius: "12px",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
      }}>
        <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>ℹ</span>
        <p style={{ fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>
          Para añadir nuevas páginas o secciones contacta con el desarrollador.
          La estructura y el diseño se mantienen en código para garantizar la identidad visual.
        </p>
      </div>
    </div>
  );
}

function PageCard({ page }: { page: PageCard }) {
  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #EAEEF4",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.2s, transform 0.2s",
    }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Accent bar */}
      <div style={{ height: "4px", background: page.accent }} />

      <div style={{ padding: "1.5rem" }}>
        {/* Icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{
            width: "40px", height: "40px",
            borderRadius: "10px",
            background: `${page.accent}18`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.2rem", color: page.accent,
          }}>
            {page.icon}
          </div>
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#1A1A2E", margin: 0 }}>
              {page.title}
            </h2>
            <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>
              {page.fieldCount} campos editables
            </span>
          </div>
        </div>

        <p style={{ fontSize: "0.84rem", color: "#6B7280", lineHeight: 1.55, marginBottom: "1.5rem" }}>
          {page.description}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link
            href={page.href}
            style={{
              flex: 1,
              display: "block",
              textAlign: "center",
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              background: page.accent,
              color: "#FFFFFF",
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            Editar contenido →
          </Link>
          <a
            href={page.previewHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.6rem 0.9rem",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              color: "#6B7280",
              fontSize: "0.82rem",
              textDecoration: "none",
              transition: "border-color 0.15s, color 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = page.accent;
              (e.currentTarget as HTMLAnchorElement).style.color = page.accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E2E8F0";
              (e.currentTarget as HTMLAnchorElement).style.color = "#6B7280";
            }}
          >
            ↗ Ver
          </a>
        </div>
      </div>
    </div>
  );
}
