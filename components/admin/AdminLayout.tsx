"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/reset-password";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", position: "relative" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        position: "fixed" as const,
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
        // On desktop: always visible via media query handled below
      }}
        className="admin-sidebar-wrapper"
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Desktop sidebar spacer */}
      <div className="admin-sidebar-spacer" />

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <AdminTopBar onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main style={{ flex: 1, overflowX: "hidden" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar-wrapper {
            position: sticky !important;
            transform: translateX(0) !important;
            top: 0;
            height: 100vh;
            align-self: flex-start;
          }
          .admin-sidebar-spacer {
            display: none;
          }
        }
        @media (max-width: 1023px) {
          .admin-sidebar-spacer {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
