"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePageActions } from "@/context/PageActionsContext";

const GOLD = "#C8A96E";

export function FloatingActions() {
  const pathname = usePathname();
  const { openReservation, openGift } = usePageActions();
  const [config, setConfig] = useState<{ wedThuActive: boolean; hasCampaign: boolean; campaignName?: string } | null>(null);
  const [visible, setVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    async function checkPromos() {
      try {
        const res = await fetch("/api/public/config");
        const data = await res.json();
        setConfig(data);
        
        // Appear after 2 seconds
        const timer = setTimeout(() => {
          setVisible(true);
          // If there's a promo, show the bubble 0.5s later
          if (data.wedThuActive || data.hasCampaign) {
             setTimeout(() => setShowNotification(true), 500);
          }
        }, 2000);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Error checking promos:", err);
      }
    }
    checkPromos();
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [yPos, setYPos] = useState(25); // percentage from bottom
  const [isDragging, setIsDragging] = useState(false);
  const dragTimeout = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // --- Draggable & Collision Logic ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    dragTimeout.current = setTimeout(() => {
      setIsDragging(true);
      if (navigator.vibrate) navigator.vibrate(10); // Haptic feedback
    }, 400); // More than a quick tap
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touchY = e.touches[0].clientY;
    const windowH = window.innerHeight;
    const newY = ((windowH - touchY) / windowH) * 100;
    setYPos(Math.min(Math.max(newY, 5), 85)); // Keep within 5% - 85%
  };

  const handleTouchEnd = () => {
    if (dragTimeout.current) clearTimeout(dragTimeout.current);
    if (isDragging) {
      setIsDragging(false);
      autoAvoidCollision();
    }
  };

  const autoAvoidCollision = () => {
    if (!menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Check elements under the menu
    const elements = document.elementsFromPoint(centerX, centerY);
    const hasTextBelow = elements.some(el => 
      ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "BLOCKQUOTE"].includes(el.tagName) ||
      (el instanceof HTMLElement && el.innerText.trim().length > 0 && el.children.length === 0)
    );

    if (hasTextBelow) {
      // If covering text, jump slightly up or down
      setYPos(prev => (prev > 50 ? prev + 10 : prev - 10));
    }
  };

  const isAdmin = pathname?.startsWith("/admin");
  const shouldHide = isAdmin;

  if (!visible || shouldHide) return null;

  const hasPromo = config?.wedThuActive || config?.hasCampaign;

  return (
    <div 
      ref={menuRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "fixed", 
        bottom: isMobile ? `${yPos}%` : "2rem", 
        right: isMobile ? "0.75rem" : "2rem", 
        zIndex: 9000,
        display: "flex", 
        flexDirection: "column", 
        alignItems: "flex-end", 
        gap: "0.75rem",
        fontFamily: "var(--font-montserrat), sans-serif",
        transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        touchAction: "none", // Prevent scroll while dragging
        opacity: isDragging ? 0.8 : 1,
        transform: isDragging ? "scale(1.05)" : "scale(1)",
      }}
    >
      
      {/* Promo Bubble (WA style) */}
      {showNotification && hasPromo && (
        <div 
          onClick={() => openReservation()}
          style={{
            background: "#daa520", color: "#000", padding: isMobile ? "0.6rem 0.9rem" : "0.8rem 1.2rem",
            borderRadius: "18px 18px 4px 18px", fontSize: isMobile ? "0.75rem" : "0.82rem", fontWeight: 600,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)", maxWidth: isMobile ? "180px" : "240px", cursor: "pointer",
            animation: "waPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
            position: "relative", border: "1px solid #C8A96E",
            marginBottom: isMobile ? "0.5rem" : "0",
            pointerEvents: isDragging ? "none" : "auto",
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.4 }}>
            ¡Hola! Tenemos una <strong style={{ textDecoration: "underline" }}>oferta especial</strong>. ✨
          </p>
        </div>
      )}

      {/* Pill Container (Vertical on Mobile, Horizontal on Desktop) */}
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "0.25rem" : "0.5rem", 
        alignItems: "center",
        background: "rgba(10, 10, 10, 0.92)",
        backdropFilter: "blur(12px)",
        padding: isMobile ? "0.35rem" : "0.6rem",
        borderRadius: "100px",
        border: `1px solid ${isDragging ? "#FFF" : GOLD}`,
        boxShadow: isDragging ? "0 25px 60px rgba(0,0,0,0.8)" : "0 15px 45px rgba(0,0,0,0.6)",
        animation: "waPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both"
      }}>
        
        {/* 1. Gift Icon */}
        <div style={{ position: "relative" }}>
          {!isMobile && <Tooltip text="Regalar" visible={activeTooltip === "gift"} />}
          <button
            onClick={openGift}
            onMouseEnter={() => { setActiveTooltip("gift"); }}
            onMouseLeave={() => setActiveTooltip(null)}
            style={{...btnStylePill, width: isMobile ? "42px" : "48px", height: isMobile ? "42px" : "48px", pointerEvents: isDragging ? "none" : "auto"}}
          >
            <svg width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 12 20 22 4 22 4 12"></polyline>
              <rect x="2" y="7" width="20" height="5"></rect>
              <line x1="12" y1="22" x2="12" y2="7"></line>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
          </button>
        </div>

        {!isMobile && <div style={{ width: "1px", height: "24px", background: "rgba(200, 169, 110, 0.2)" }} />}

        {/* 2. Reservation Icon */}
        <div style={{ position: "relative" }}>
          {!isMobile && <Tooltip text="Reservar" visible={activeTooltip === "reserve"} />}
          <button
            onClick={openReservation}
            onMouseEnter={() => { setActiveTooltip("reserve"); }}
            onMouseLeave={() => setActiveTooltip(null)}
            style={{...btnStylePill, width: isMobile ? "42px" : "48px", height: isMobile ? "42px" : "48px", pointerEvents: isDragging ? "none" : "auto"}}
          >
            <svg width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {hasPromo && (
              <div style={{
                position: "absolute", top: "-3px", right: "-3px", background: "#daa520", color: "#000",
                width: "16px", height: "16px", borderRadius: "50%", fontSize: "0.6rem", fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #0A0A0A"
              }}>!</div>
            )}
          </button>
        </div>

        {!isMobile && <div style={{ width: "1px", height: "24px", background: "rgba(200, 169, 110, 0.2)" }} />}

        {/* 3. WhatsApp Icon */}
        <div style={{ position: "relative" }}>
          {!isMobile && <Tooltip text="Contacto" visible={activeTooltip === "wa"} />}
          <a 
            href="https://wa.me/34620269585" 
            target="_blank" 
            rel="noreferrer"
            onMouseEnter={() => { setActiveTooltip("wa"); }}
            onMouseLeave={() => setActiveTooltip(null)}
            style={{...btnStylePill, width: isMobile ? "42px" : "48px", height: isMobile ? "42px" : "48px", pointerEvents: isDragging ? "none" : "auto"}}
          >
            <svg width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill={GOLD}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>

      </div>

      <style jsx global>{`
        @keyframes waPop {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Tooltip({ text, visible }: { text: string, visible: boolean }) {
  return (
    <div style={{
      position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
      marginBottom: "1.2rem", padding: "0.5rem 0.9rem", background: "#0A0A0A", color: "#fff",
      fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
      borderRadius: "4px", whiteSpace: "nowrap", pointerEvents: "none",
      opacity: visible ? 1 : 0, transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.4)", border: `1px solid ${GOLD}`
    }}>
      {text}
      <div style={{
        position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
        borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
        borderTop: `6px solid ${GOLD}`
      }} />
    </div>
  );
}

const btnStylePill = {
  width: "48px", height: "48px", background: "transparent", border: "none",
  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", transition: "all 0.3s ease", textDecoration: "none",
  position: "relative" as const
};
