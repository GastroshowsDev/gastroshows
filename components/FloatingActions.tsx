"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePageActions } from "@/context/PageActionsContext";

const GOLD = "#C8A96E";

export function FloatingActions() {
  const pathname = usePathname();
  const { openReservation } = usePageActions();
  const [config, setConfig] = useState<{ wedThuActive: boolean; hasCampaign: boolean; campaignName?: string } | null>(null);
  const [visible, setVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    async function checkPromos() {
      try {
        const res = await fetch("/api/public/config");
        const data = await res.json();
        setConfig(data);
        
        // Appear after 4 seconds
        const timer = setTimeout(() => {
          setVisible(true);
          // If there's a promo, show the bubble 0.5s later
          if (data.wedThuActive || data.hasCampaign) {
             setTimeout(() => setShowNotification(true), 500);
          }
        }, 4000);
        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Error checking promos:", err);
      }
    }
    checkPromos();
  }, []);

  if (!visible || pathname?.startsWith("/admin")) return null;


  const hasPromo = config?.wedThuActive || config?.hasCampaign;

  return (
    <div style={{
      position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9000,
      display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem",
      fontFamily: "var(--font-montserrat), sans-serif",
    }}>
      
      {/* Promo Bubble (WA style) */}
      {showNotification && hasPromo && (
        <div 
          onClick={openReservation}
          style={{
            background: "#fff", color: "#1A1A1A", padding: "0.8rem 1.2rem",
            borderRadius: "18px 18px 4px 18px", fontSize: "0.82rem", fontWeight: 500,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)", maxWidth: "240px", cursor: "pointer",
            animation: "waPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
            position: "relative", border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.4 }}>
            ¡Hola! Tenemos una <strong style={{ color: "#25D366" }}>oferta especial</strong> disponible. ✨
          </p>
          <div style={{ position: "absolute", bottom: "4px", right: "8px", fontSize: "0.6rem", color: "#999", display: "flex", alignItems: "center", gap: "2px" }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <span style={{ color: "#34B7F1" }}>✓✓</span>
          </div>
        </div>
      )}

      {/* Action Row */}
      <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
        
        {/* 1. Reservation Icon */}
        <button
          onClick={openReservation}
          style={{
            width: "56px", height: "56px", background: "#0A0A0A", border: `1px solid ${GOLD}`,
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", position: "relative",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {hasPromo && (
            <div style={{
              position: "absolute", top: "-2px", right: "-2px", background: "#25D366", color: "#fff",
              width: "20px", height: "20px", borderRadius: "50%", fontSize: "0.7rem", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #0A0A0A"
            }}>1</div>
          )}
        </button>


        {/* 2. WhatsApp Icon */}
        <a 
          href="https://wa.me/34600000000" 
          target="_blank" 
          rel="noreferrer"
          style={{
            width: "56px", height: "56px", background: "#25D366", border: "none",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", transition: "all 0.3s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
          </svg>
        </a>

      </div>

      <style jsx global>{`
        @keyframes waPop {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
