"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type NavItem = { label: string; href: string; icon: string; adminOnly?: boolean };
type NavSection = { title: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    title: "Principal",
    items: [
      { label: "Live", href: "/admin/live", icon: "📡" },
    ],
  },
  {
    title: "Herramientas",
    items: [
      { label: "Asistente AI", href: "/admin/asistente", icon: "✨", adminOnly: true },
    ],
  },
  {
    title: "Gestión",
    items: [
      { label: "Reservas",      href: "/admin/reservas",     icon: "🛎️" },
      { label: "Visitas",       href: "/admin/visitas",      icon: "👥" },
      { label: "Regalos",       href: "/admin/regalos",      icon: "🎁" },
      { label: "Calendario",    href: "/admin/calendario",   icon: "🗓️" },
      { label: "Asignación",    href: "/admin/organizacion", icon: "🗺️" },
      { label: "Contactos",     href: "/admin/contactos",    icon: "📇" },
      { label: "Estadísticas",  href: "/admin/estadisticas", icon: "📊", adminOnly: true },
    ],
  },
  {
    title: "Comunicación",
    items: [
      { label: "Plantillas Email", href: "/admin/comunicacion/plantillas", icon: "📧" },
      { label: "Campañas",        href: "/admin/comunicacion/campanas",   icon: "🚀" },
      { label: "Automatizaciones", href: "/admin/comunicacion/automatizaciones", icon: "🤖" },
      { label: "Ajustes SMTP",     href: "/admin/comunicacion/ajustes",    icon: "⚡" },
    ],
  },
  {
    title: "Configuración",
    items: [
      { label: "Promociones", href: "/admin/promociones", icon: "🎫" },
      { label: "Web",          href: "/admin/web",          icon: "🌐", adminOnly: true },
      { label: "SEO",         href: "/admin/seo",         icon: "🔍", adminOnly: true },
      { label: "Usuarios",    href: "/admin/usuarios",    icon: "👤", adminOnly: true },
      { label: "Empleados",   href: "/admin/configuracion/empleados", icon: "👨‍🍳", adminOnly: true },
      { label: "Backups",     href: "/admin/backups",     icon: "💾", adminOnly: true },
    ],
  },
];

export function AdminSidebar({ onClose }: { onClose?: () => void } = {}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role ?? "LIVE";

  if (pathname === "/admin/login") return null;

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside
      style={{
        width: "240px", // Aumentamos un poco el ancho para dar aire
        height: "100vh",
        background: "var(--color-admin-sidebar)",
        borderRight: "1px solid var(--color-admin-border)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "1.5rem 1.5rem 1.25rem", borderBottom: "1px solid var(--color-admin-border)" }}>
        <div style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--color-admin-text)" }}>
          Gastro<span style={{ color: "var(--color-admin-accent)" }}>Shows</span>
        </div>
        <div style={{ fontSize: "0.68rem", color: "var(--color-admin-muted)", marginTop: "0.15rem", letterSpacing: "0.05em" }}>
          Panel de gestión
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "1rem 0" }}>
        {NAV.map((section) => {
          const visibleItems = section.items.filter((item) => !item.adminOnly || role === "ADMIN");
          if (visibleItems.length === 0) return null;
          return (
            <div key={section.title} style={{ marginBottom: "1.5rem" }}>
              <div style={{ padding: "0 1.25rem 0.5rem", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-admin-muted)", opacity: 0.8 }}>
                {section.title}
              </div>
              {visibleItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: "flex", 
                      alignItems: "center", 
                      gap: "0.85rem",
                      padding: "0.6rem 1.25rem", 
                      margin: "0 0.5rem", 
                      borderRadius: "8px",
                      fontSize: "0.82rem", 
                      fontWeight: active ? 600 : 500,
                      color: active ? "var(--color-admin-accent)" : "var(--color-admin-text)",
                      background: active ? "var(--color-admin-accent-light)" : "transparent",
                      textDecoration: "none", 
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-admin-accent-light)"; }}
                    onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                  >
                    <span style={{ 
                      width: "24px", 
                      height: "24px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      fontSize: "1.05rem",
                      flexShrink: 0,
                    }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Role badge + Sign out */}
      <div style={{ padding: "0.75rem 1rem 1.25rem", borderTop: "1px solid var(--color-admin-border)" }}>
        {session?.user && (
          <div style={{ marginBottom: "0.75rem", padding: "0.5rem 0.75rem", background: "var(--color-admin-bg)", borderRadius: 8, fontSize: "0.72rem" }}>
            <div style={{ fontWeight: 600, color: "var(--color-admin-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {session.user.name}
            </div>
            <div style={{ color: "var(--color-admin-muted)", marginTop: "0.1rem" }}>
              {role === "ADMIN" ? "Administrador" : "Live"}
            </div>
          </div>
        )}
        <button
          onClick={() => void signOut({ callbackUrl: "/admin/login" })}
          style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--color-admin-border)", background: "transparent", color: "var(--color-admin-muted)", fontSize: "0.75rem", cursor: "pointer", transition: "all 0.15s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-admin-accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--color-admin-accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-admin-border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--color-admin-muted)"; }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
