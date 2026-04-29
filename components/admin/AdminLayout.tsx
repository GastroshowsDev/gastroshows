"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/reset-password";
  const isPageBuilder = /\/admin\/web\/pages\/[^/]+\/editor/.test(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (isPageBuilder) {
    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--color-admin-bg)", color: "var(--color-admin-text)" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <AdminTopBar onMenuClick={() => {}} />
          <main style={{ flex: 1, overflow: "hidden" }}>
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--color-admin-bg)", color: "var(--color-admin-text)" }}>
      {/* Sidebar estático */}
      <AdminSidebar />

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AdminTopBar onMenuClick={() => {}} />
        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
