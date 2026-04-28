"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Footer() {
  const pathname = usePathname();
  const [isHideableAdmin, setIsHideableAdmin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsHideableAdmin(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAdmin = pathname?.startsWith("/admin");
  const shouldHide = isAdmin;


  if (shouldHide) return null;



  const currentYear = new Date().getFullYear();

  
  return (
    <footer style={{
      background: "var(--gs-bg2)",
      borderTop: "1px solid var(--gs-border)",
      padding: "5rem 2rem 6rem",
      marginTop: "auto",
      position: "relative",
      zIndex: 10
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "3rem" }}>
          <div style={{ flex: "1 1 300px" }}>
            <h3 style={{ 
              fontFamily: "var(--font-cormorant)", 
              fontSize: "1.8rem", 
              fontWeight: 300,
              color: "var(--gs-gold)", 
              marginBottom: "1rem",
              letterSpacing: "0.05em"
            }}>
              GastroShows
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--gs-muted)", lineHeight: 1.6, maxWidth: "280px" }}>
              Una cena que comienza antes de que llegues. <br/>
              Cuatro mensajes, una ubicación secreta y una noche inolvidable en Barcelona.
            </p>
          </div>
          
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--gs-gold)", fontWeight: 700, marginBottom: "0.5rem" }}>Navegación</span>
              <Link href="/eventos" style={linkStyle}>Próximos Eventos</Link>
              <Link href="/#regalar" style={linkStyle}>Regalar Experiencia</Link>
              <Link href="/#reservar" style={linkStyle}>Reservar Mesa</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--gs-gold)", fontWeight: 700, marginBottom: "0.5rem" }}>Legal</span>
              <Link href="/aviso-legal" style={linkStyle}>Aviso Legal</Link>
              <Link href="/privacidad" style={linkStyle}>Privacidad</Link>
              <Link href="/cookies" style={linkStyle}>Política de Cookies</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--gs-gold)", fontWeight: 700, marginBottom: "0.5rem" }}>Síguenos</span>
              <a href="https://instagram.com/gastroshows" target="_blank" rel="noreferrer" style={linkStyle}>Instagram</a>
              <a href="#" style={linkStyle}>Facebook</a>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: "1px solid var(--gs-border)", 
          paddingTop: "2.5rem", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: "1.5rem" 
        }}>
          <p style={{ fontSize: "0.72rem", color: "var(--gs-muted)", letterSpacing: "0.02em" }}>
            © {currentYear} GastroShows Barcelona. El Ritual de la Cena Clandestina.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
             <span style={{ fontSize: "0.72rem", color: "var(--gs-muted)", opacity: 0.5 }}>Hecho con pasión en BCN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const linkStyle = { 
  fontSize: "0.82rem", 
  color: "var(--gs-text-sub)", 
  textDecoration: "none", 
  transition: "all 0.3s ease",
  cursor: "pointer"
};
