"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/reset-password";
  const isPageBuilder = /\/admin\/web\/pages\/[^/]+\/editor/.test(pathname);

  // Cargar estado inicial y manejar cierres al navegar
  useEffect(() => {
    const saved = localStorage.getItem("gs_admin_sidebar");
    if (saved !== null) setIsSidebarOpen(saved === "true");
    setIsInitialized(true);
    
    const handleRouteChange = () => setIsSidebarOpen(false);
    const handleToggleEvent = () => setIsSidebarOpen(prev => !prev);

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("gs-toggle-sidebar", handleToggleEvent);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("gs-toggle-sidebar", handleToggleEvent);
    };
  }, []);

  // Guardar estado automáticamente y clasificar botones por tamaño
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("gs_admin_sidebar", String(isSidebarOpen));
    }

    // Lógica para medir botones en el panel de admin
    const classifyButton = (btn: Element) => {
      // Usar requestAnimationFrame para asegurar que el DOM se ha pintado
      requestAnimationFrame(() => {
        const rect = btn.getBoundingClientRect();
        if (rect.width > 0) {
          (btn as HTMLElement).dataset.size = rect.width > 50 ? "large" : "small";
        }
      });
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            const btns = node.querySelectorAll("button, .btn, a[role='button']");
            btns.forEach(classifyButton);
            if (node.matches("button, .btn, a[role='button']")) classifyButton(node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Ejecutar inmediatamente para los ya presentes
    const initialBtns = document.querySelectorAll(".admin-context button, .admin-context .btn, .admin-context a[role='button']");
    initialBtns.forEach(classifyButton);

    // Intervalo de seguridad para botones dinámicos rebeldes
    const interval = setInterval(() => {
      document.querySelectorAll(".admin-context button:not([data-size]), .admin-context .btn:not([data-size])").forEach(classifyButton);
    }, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [isSidebarOpen, isInitialized]);

  if (isAuthPage) return <SessionProvider>{children}</SessionProvider>;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SessionProvider>
    <div className="admin-context admin-theme" style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", position: "relative" }}>
      
      {/* Sidebar con Animación Slide + Fade */}
      <div className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay para cerrar al clicar fuera */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="menu-overlay"
        />
      )}

      {/* Main content */}
      <div style={{ 
        flex: 1, 
        minWidth: 0, 
        display: "flex", 
        flexDirection: "column", 
        overflow: "hidden",
      }}>
        {!isPageBuilder && <AdminTopBar onMenuClick={toggleSidebar} isMenuOpen={isSidebarOpen} />}
        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        .sidebar-container {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 220px;
          z-index: 500;
          transform: translateX(-100%);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          visibility: hidden;
        }

        .sidebar-container.open {
          transform: translateX(0);
          opacity: 1;
          visibility: visible;
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(5px);
          z-index: 450;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
    </SessionProvider>
  );
}
