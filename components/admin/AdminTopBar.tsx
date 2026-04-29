"use client";

import { useRouter, usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DemoModeToggle } from "./DemoModeToggle";

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

export function AdminTopBar({ onMenuClick }: { onMenuClick?: () => void } = {}) {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  // Remove "admin" if present at the start
  const breadcrumbs = segments[0] === "admin" ? segments.slice(1) : segments;

  return (
    <div
      style={{
        height: "52px",
        borderBottom: "1px solid var(--color-admin-border)",
        background: "var(--color-admin-surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
        flexShrink: 0,
      }}
    >
      {/* Hamburger — shown only on mobile */}
      <button
        onClick={onMenuClick}
        aria-label="Abrir menú"
        className="admin-hamburger"
        style={{
          display: "none",
          flexDirection: "column",
          gap: "5px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px",
          borderRadius: "6px",
        }}
      >
        <span style={{ display: "block", width: 20, height: 2, background: "var(--color-admin-text)", borderRadius: 2 }} />
        <span style={{ display: "block", width: 20, height: 2, background: "var(--color-admin-text)", borderRadius: 2 }} />
        <span style={{ display: "block", width: 20, height: 2, background: "var(--color-admin-text)", borderRadius: 2 }} />
      </button>

      <button
        onClick={() => router.back()}
        aria-label="Atrás"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-admin-text)",
          opacity: 0.7,
          transition: "opacity 0.2s",
          marginLeft: "0.5rem"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginLeft: "0.5rem", fontSize: "0.85rem", color: "var(--color-admin-muted)" }}>
        <Link href="/admin/live" style={{ color: "var(--color-admin-text)", textDecoration: "none", fontWeight: 500 }}>Admin</Link>
        {breadcrumbs.map((segment, i) => {
          const path = `/admin/${breadcrumbs.slice(0, i + 1).join("/")}`;
          const isLast = i === breadcrumbs.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

          return (
            <Fragment key={path}>
              <span style={{ opacity: 0.4 }}>/</span>
              {isLast ? (
                <span style={{ color: "var(--color-admin-text)", opacity: 0.6 }}>{label}</span>
              ) : (
                <Link href={path} style={{ color: "var(--color-admin-text)", textDecoration: "none" }}>
                  {label}
                </Link>
              )}
            </Fragment>
          );
        })}
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
        <DemoModeToggle />
        <SaveStatusIndicator />
        <ThemeToggle variant="admin" />
      </div>

      <style>{`
        @media (max-width: 767px) {
          .admin-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
