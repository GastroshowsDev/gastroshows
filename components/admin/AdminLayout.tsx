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

      {/* Sidebar Hover Zone */}
      <div className="sidebar-hover-zone" />

      {/* Sidebar */}
      <div className={`admin-sidebar-wrapper ${sidebarOpen ? "is-open" : ""}`}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <AdminTopBar onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main style={{ flex: 1, overflowX: "hidden" }}>
          {children}
        </main>
      </div>

      <style>{`
        .sidebar-hover-zone {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 25px;
          z-index: 49;
        }
        .admin-sidebar-wrapper {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 50;
          transform: translateX(-100%);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar-hover-zone:hover + .admin-sidebar-wrapper,
        .admin-sidebar-wrapper:hover,
        .admin-sidebar-wrapper.is-open {
          transform: translateX(0);
          box-shadow: 4px 0 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
