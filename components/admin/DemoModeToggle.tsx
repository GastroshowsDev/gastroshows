"use client";

import { useEffect, useState } from "react";
import { LucideVideo, LucideEye, LucideLoader2 } from "lucide-react";

export function DemoModeToggle() {
  const [isDemo, setIsDemo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings?t=" + Date.now(), { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setIsDemo(data.demo_mode === "true");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggleClick = () => {
    setShowModal(true);
    setConfirmText("");
  };

  const requiredWord = isDemo ? "Live" : "Demo";
  const isMatch = confirmText.trim().toLowerCase() === requiredWord.toLowerCase();

  const confirmChange = async () => {
    if (!isMatch || updating) return;
    
    setUpdating(true);
    const newValue = !isDemo;
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "demo_mode", value: String(newValue) })
      });
      
      if (res.ok) {
        setIsDemo(newValue);
        window.dispatchEvent(new CustomEvent("gs-demo-mode-changed", { detail: newValue }));
        setShowModal(false);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert("Error: " + (errData.error || "No se pudo cambiar el modo"));
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return null;

  return (
    <>
      <button
        onClick={handleToggleClick}
        title={isDemo ? "Modo Demo (Click para pasar a LIVE)" : "Modo Directo (Click para pasar a DEMO)"}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: isDemo ? "rgba(239, 68, 68, 0.05)" : "rgba(16, 185, 129, 0.05)",
          border: `1px solid ${isDemo ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)"}`,
          color: isDemo ? "#EF4444" : "#10B981",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          outline: "none",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = isDemo ? "0 0 15px rgba(239, 68, 68, 0.2)" : "0 0 15px rgba(16, 185, 129, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {isDemo ? <LucideEye size={18} /> : <LucideVideo size={18} />}
        {isDemo && (
          <span style={{ 
            position: "absolute", top: "2px", right: "2px", 
            width: "8px", height: "8px", background: "#EF4444", 
            borderRadius: "50%", border: "2px solid var(--color-admin-surface)",
            animation: "gs-pulse 2s infinite"
          }} />
        )}
      </button>

      {showModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 10000,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            background: "var(--color-admin-surface)", border: "1px solid var(--color-admin-border)", borderRadius: "16px",
            width: "100%", maxWidth: "400px", padding: "2rem", textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}>
            <div style={{ 
              width: "50px", height: "50px", borderRadius: "50%", 
              background: isDemo ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", 
              margin: "0 auto 1.5rem", color: isDemo ? "#10B981" : "#EF4444"
            }}>
              {isDemo ? <LucideVideo size={24} /> : <LucideEye size={24} />}
            </div>
            
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              ¿Pasar a modo {isDemo ? "REAL" : "DEMO"}?
            </h3>
            
            <p style={{ color: "var(--color-admin-muted)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Para confirmar el cambio a modo <strong>{isDemo ? "DIRECTO (Pagos reales)" : "SIMULADO"}</strong>, escribe la palabra:
              <br/><span style={{ color: "#efb810", fontWeight: 700, fontSize: "1.1rem" }}>{requiredWord}</span>
            </p>

            <input
              autoFocus
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={`Escribe ${requiredWord}`}
              style={{
                width: "100%", padding: "0.75rem", background: "var(--color-admin-bg)",
                border: `1px solid ${isMatch ? "#10B981" : "var(--color-admin-border)"}`, 
                borderRadius: "10px",
                color: "var(--color-admin-text)", fontSize: "1rem", textAlign: "center",
                outline: "none", transition: "all 0.3s", marginBottom: "1.5rem"
              }}
            />

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1, padding: "0.75rem", background: "none", border: "1px solid var(--color-admin-border)",
                  color: "var(--color-admin-muted)", borderRadius: "10px", cursor: "pointer", fontWeight: 600
                }}
              >
                Cancelar
              </button>
              <button
                disabled={!isMatch || updating}
                onClick={confirmChange}
                style={{
                  flex: 1, padding: "0.75rem", 
                  background: isMatch ? "#efb810" : "var(--color-admin-bg)", 
                  color: isMatch ? "#fff" : "var(--color-admin-muted)", 
                  border: "none", borderRadius: "10px", cursor: isMatch ? "pointer" : "not-allowed",
                  fontWeight: 700, transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"
                }}
              >
                {updating && <LucideLoader2 size={16} className="animate-spin" />}
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gs-pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </>
  );
}
