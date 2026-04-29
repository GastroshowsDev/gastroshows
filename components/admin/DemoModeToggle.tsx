"use client";

import { useEffect, useState } from "react";

const GOLD = "#C8A96E";

export function DemoModeToggle() {
  const [isDemo, setIsDemo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
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
      }
    } catch (error) {
      console.error("Error updating mode:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return null;

  return (
    <>
      <button
        onClick={handleToggleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: isDemo ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
          border: `1px solid ${isDemo ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
          color: isDemo ? "#EF4444" : "#10B981",
          padding: "0.4rem 1rem",
          borderRadius: "4px",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          cursor: "pointer",
          transition: "all 0.2s",
          marginRight: "1rem"
        }}
        title={isDemo ? "Modo Demo Activo (Pagos simulados)" : "Modo Real Activo (Redsys)"}
      >
        <span style={{ 
          width: "8px", 
          height: "8px", 
          borderRadius: "50%", 
          background: "currentColor",
          animation: isDemo ? "gs-pulse 1.5s infinite" : "none"
        }} />
        {isDemo ? "DEMO MODE" : "LIVE MODE"}
      </button>

      {showModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 10000,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            background: "#121212", border: `1px solid ${GOLD}`, borderRadius: "4px",
            width: "100%", maxWidth: "420px", padding: "2.5rem", textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}>
            <h3 style={{ 
              fontFamily: "var(--font-cormorant), serif", fontSize: "1.8rem", color: "#F5F0E8",
              marginBottom: "1rem" 
            }}>
              ¿Cambiar a modo {isDemo ? "LIVE" : "DEMO"}?
            </h3>
            
            <p style={{ color: "rgba(245,240,232,0.7)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              Estás a punto de cambiar el sistema de pagos a modo <strong>{isDemo ? "REAL (Redsys)" : "SIMULADO"}</strong>.<br/>
              Para confirmar, escribe <span style={{ color: GOLD, fontWeight: 700 }}>"{requiredWord}"</span> a continuación.
            </p>

            <div style={{ position: "relative", marginBottom: "2rem" }}>
              <input
                autoFocus
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={`Escribe "${requiredWord}"`}
                style={{
                  width: "100%", padding: "1rem", background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${isMatch ? "#10B981" : "rgba(200,169,110,0.2)"}`, 
                  borderRadius: "2px",
                  color: "#F5F0E8", fontSize: "1rem", textAlign: "center",
                  outline: "none", transition: "all 0.3s"
                }}
              />
              {isMatch && (
                <div style={{ 
                  position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                  color: "#10B981", fontSize: "0.8rem", fontWeight: 700
                }}>
                  ✓
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1, padding: "0.8rem", background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.6)", borderRadius: "2px", cursor: "pointer", fontWeight: 600
                }}
              >
                Cancelar
              </button>
              <button
                disabled={!isMatch || updating}
                onClick={confirmChange}
                style={{
                  flex: 1, padding: "0.8rem", 
                  background: isMatch ? GOLD : "rgba(200,169,110,0.1)", 
                  color: isMatch ? "#0A0A0A" : "rgba(200,169,110,0.3)", 
                  border: "none", borderRadius: "2px", cursor: isMatch ? "pointer" : "not-allowed",
                  fontWeight: 700, transition: "all 0.3s"
                }}
              >
                {updating ? "Cambiando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gs-pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
