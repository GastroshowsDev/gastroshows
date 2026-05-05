"use client";

import { useRouter, usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DemoModeToggle } from "./DemoModeToggle";
import { ChefHat, Globe } from "lucide-react";

function SaveStatusIndicator() {
  const [status, setStatus] = useState<"idle" | "unsaved" | "saving" | "saved">("idle");

  useEffect(() => {
    const handleStatus = (e: any) => setStatus(e.detail);
    window.addEventListener("page-builder-status", handleStatus);
    return () => window.removeEventListener("page-builder-status", handleStatus);
  }, []);

  if (status === "idle") return null;

  return (
    <div style={{ display: "flex", alignItems: "center", marginRight: "1rem" }}>
      {status === "unsaved" && (
        <span title="Cambios por guardar" style={{ fontSize: "1.2rem", color: "var(--color-admin-text)", opacity: 0.6, cursor: "help" }}>
          💾
        </span>
      )}
      {status === "saving" && (
        <span title="Guardando..." style={{ fontSize: "1.2rem", animation: "gs-pulse 1s infinite" }}>
          ⏳
        </span>
      )}
      {status === "saved" && (
        <span title="Guardado y procesado" style={{ fontSize: "1.2rem", color: "#10B981" }}>
          ✅
        </span>
      )}
    </div>
  );
}

export function AdminTopBar({ onMenuClick, isMenuOpen }: { onMenuClick?: () => void, isMenuOpen?: boolean } = {}) {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments[0] === "admin" ? segments.slice(1) : segments;

  return (
    <div
      style={{
        height: "60px",
        borderBottom: "1px solid var(--color-admin-border)",
        background: "var(--color-admin-surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
        flexShrink: 0,
        zIndex: 100,
      }}
    >
      {/* Lado Izquierdo: Gorro de Chef (Menu Trigger) */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={onMenuClick}
          className="chef-menu-btn"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#efb810",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(239, 184, 16, 0.25)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            visibility: isMenuOpen ? "hidden" : "visible",
            opacity: isMenuOpen ? 0 : 1,
            outline: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(239, 184, 16, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 184, 16, 0.25)";
          }}
        >
          <ChefHat size={20} />
        </button>

        {/* Logo/Label junto al botón (Opcional, muy discreto) */}
        {!isMenuOpen && (
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-admin-text)", opacity: 0.8 }}>
            Gastro<span style={{ color: "#efb810" }}>Shows</span>
          </div>
        )}
      </div>

      {/* Lado Derecho: Herramientas en formato circular */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <SaveStatusIndicator />
        
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="Ver web pública"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.03)",
            border: "1px solid var(--color-admin-border)",
            color: "var(--color-admin-text)",
            textDecoration: "none",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            marginRight: "0.25rem"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.borderColor = "var(--color-admin-accent)";
            e.currentTarget.style.background = "var(--color-admin-accent-light)";
            e.currentTarget.style.color = "var(--color-admin-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.borderColor = "var(--color-admin-border)";
            e.currentTarget.style.background = "rgba(0,0,0,0.03)";
            e.currentTarget.style.color = "var(--color-admin-text)";
          }}
        >
          <Globe size={18} />
        </a>

        <DemoModeToggle />
        <ThemeToggle variant="admin" />
      </div>

      <style jsx global>{`
        .chef-menu-btn:active {
          transform: scale(0.95) !important;
        }
      `}</style>
    </div>
  );
}
