"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePageActions } from "@/context/PageActionsContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const navLinks = [
  { href: "/cena-clandestina", label: "La Experiencia" },
  { href: "/grupos",           label: "Grupos" },
  { href: "/blog",             label: "Blog" },
  { href: "/contacto",         label: "Contacto" },
];

export function SiteNav() {
  const pathname = usePathname();
  const { openReservation, openGift } = usePageActions();
  const [open, setOpen] = useState(false);
  const [gruposOpen, setGruposOpen] = useState(false);
  const [gruposOpenMobile, setGruposOpenMobile] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: "60px",
        background: "rgba(5,5,5,0.97)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(200,169,110,0.08)",
        display: "flex", alignItems: "center",
        padding: "0 2.5rem",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "var(--font-cormorant),Georgia,serif",
          fontSize: "1.3rem", fontWeight: 300,
          color: "var(--gs-gold)", textDecoration: "none",
          letterSpacing: "0.06em", flexShrink: 0,
        }}>
          Gastro<em style={{ fontStyle: "italic" }}>Shows</em>
        </Link>

        {/* Links desktop */}
        <div style={{
          display: "flex", gap: "2.5rem", alignItems: "center",
          position: "absolute", left: "50%", transform: "translateX(-50%)",
        }} className="nav-desktop">
          {navLinks.map(({ href, label, submenu }) => (
            <div key={href} style={{ position: "relative" }}>
              {submenu ? (
                <button
                  onClick={() => setGruposOpen(!gruposOpen)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive(href) || gruposOpen ? "var(--gs-gold)" : "rgba(245,240,232,0.5)",
                    textDecoration: "none",
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 500,
                    transition: "color 0.2s",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {label} {gruposOpen ? "▼" : "▶"}
                </button>
              ) : (
                <Link href={href} style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isActive(href) ? "var(--gs-gold)" : "rgba(245,240,232,0.5)",
                  textDecoration: "none",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}>
                  {label}
                </Link>
              )}

              {submenu && gruposOpen && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(5,5,5,0.95)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(200,169,110,0.2)",
                  borderTop: "none",
                  minWidth: "280px",
                  zIndex: 300,
                  marginTop: "0.5rem",
                }}>
                  {submenu.map(({ href: subHref, label: subLabel }) => (
                    <Link
                      key={subHref}
                      href={subHref}
                      onClick={() => setGruposOpen(false)}
                      style={{
                        display: "block",
                        padding: "1rem 1.5rem",
                        fontSize: "0.58rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isActive(subHref) ? "var(--gs-gold)" : "rgba(245,240,232,0.7)",
                        textDecoration: "none",
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 400,
                        borderBottom: "1px solid rgba(200,169,110,0.1)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(200,169,110,0.05)";
                        (e.currentTarget as HTMLElement).style.color = "var(--gs-gold)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = isActive(subHref) ? "var(--gs-gold)" : "rgba(245,240,232,0.7)";
                      }}
                    >
                      {subLabel}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Derecha: idioma + botones */}
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexShrink: 0 }} className="nav-desktop">
          <LanguageSwitcher />
          <div style={{ width: "1px", height: "16px", background: "rgba(200,169,110,0.15)" }} />
          <button onClick={openGift} style={{
            background: "transparent", border: "1px solid rgba(200,169,110,0.3)",
            color: "var(--gs-gold)", padding: "0.4rem 1.1rem",
            fontFamily: "var(--font-montserrat)", fontSize: "0.6rem",
            fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: "pointer",
          }}>
            Regalar
          </button>
          <button onClick={openReservation} style={{
            background: "var(--gs-gold)", border: "none",
            color: "#050505", padding: "0.45rem 1.35rem",
            fontFamily: "var(--font-montserrat)", fontSize: "0.6rem",
            fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: "pointer",
          }}>
            Reservar
          </button>
        </div>

        {/* Hamburger mobile */}
        <button onClick={() => setOpen(!open)} className="nav-mobile" style={{
          background: "transparent", border: "none",
          color: "var(--gs-gold)", cursor: "pointer",
          fontSize: "1.2rem", lineHeight: 1, padding: "0.5rem",
          display: "none",
        }}>
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 199,
          background: "#050505",
          borderBottom: "1px solid rgba(200,169,110,0.1)",
          padding: "2rem 2.5rem",
          display: "flex", flexDirection: "column", gap: "0",
          maxHeight: "calc(100vh - 60px)",
          overflowY: "auto",
        }}>
          {navLinks.map(({ href, label, submenu }) => (
            <div key={href}>
              {submenu ? (
                <>
                  <button
                    onClick={() => setGruposOpenMobile(!gruposOpenMobile)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      padding: "1.1rem 0",
                      borderBottom: "1px solid rgba(200,169,110,0.07)",
                      fontSize: "1rem",
                      fontFamily: "var(--font-cormorant),Georgia,serif",
                      color: isActive(href) || gruposOpenMobile ? "var(--gs-gold)" : "rgba(245,240,232,0.75)",
                      cursor: "pointer",
                      fontWeight: 300,
                      transition: "color 0.2s",
                    }}
                  >
                    {label} {gruposOpenMobile ? "▼" : "▶"}
                  </button>
                  {gruposOpenMobile && submenu.map(({ href: subHref, label: subLabel }) => (
                    <Link
                      key={subHref}
                      href={subHref}
                      onClick={() => { setGruposOpenMobile(false); setOpen(false); }}
                      style={{
                        display: "block",
                        padding: "0.8rem 0 0.8rem 1.5rem",
                        fontSize: "0.85rem",
                        fontFamily: "var(--font-cormorant),Georgia,serif",
                        color: isActive(subHref) ? "var(--gs-gold)" : "rgba(245,240,232,0.65)",
                        textDecoration: "none",
                        fontWeight: 300,
                        borderBottom: "1px solid rgba(200,169,110,0.05)",
                      }}
                    >
                      {subLabel}
                    </Link>
                  ))}
                </>
              ) : (
                <Link href={href} onClick={() => setOpen(false)} style={{
                  padding: "1.1rem 0",
                  borderBottom: "1px solid rgba(200,169,110,0.07)",
                  fontSize: "1rem",
                  fontFamily: "var(--font-cormorant),Georgia,serif",
                  color: isActive(href) ? "var(--gs-gold)" : "rgba(245,240,232,0.75)",
                  textDecoration: "none", fontWeight: 300,
                  display: "block",
                }}>
                  {label}
                </Link>
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            <button onClick={() => { openReservation(); setOpen(false); }} style={{
              flex: 1, background: "var(--gs-gold)", border: "none",
              color: "#050505", padding: "0.9rem",
              fontFamily: "var(--font-montserrat)", fontSize: "0.68rem",
              fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
            }}>
              Reservar
            </button>
            <button onClick={() => { openGift(); setOpen(false); }} style={{
              flex: 1, background: "transparent", border: "1px solid rgba(200,169,110,0.35)",
              color: "var(--gs-gold)", padding: "0.9rem",
              fontFamily: "var(--font-montserrat)", fontSize: "0.68rem",
              fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
            }}>
              Regalar
            </button>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <LanguageSwitcher />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: block !important; }
        }
      `}</style>
    </>
  );
}
