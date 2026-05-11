"use client";

import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { usePageActions } from "@/context/PageActionsContext";

// MENÚ DEGUSTACIÓN: Optimización para CTR
// Tráfico actual: 19,807 clics | Meta: 7.21% → 12% CTR = +13,132 clics/mes

export default function MenuDegustacion() {
  const { openReservation } = usePageActions();

  return (
    <PageLayout>
      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #050505 0%, #1a1a1a 100%)", padding: "clamp(6rem, 12vw, 10rem) 2rem", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(218,165,32,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1.5rem", fontWeight: 700 }}>
            🍽️ Experiencia de 7 Actos Gastronómicos
          </p>

          <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(3.5rem, 10vw, 5.5rem)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Menú Degustación<br /><span style={{ color: "var(--gs-gold)" }}>Barcelona</span>
          </h1>

          <p style={{ fontSize: "1.1rem", color: "rgba(245,240,232,0.8)", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            7 actos gastronómicos. Maridaje premium. Chef experimentado. 145€ por persona.
          </p>

          <button onClick={openReservation} style={{ background: "var(--gs-gold)", color: "#0A0A0A", padding: "1.1rem 3.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", border: "none" }}>
            Reservar Menú Ahora
          </button>
        </div>
      </section>

      {/* LOS 7 ACTOS */}
      <section style={{ background: "var(--gs-bg2)", padding: "clamp(5rem, 8vw, 8rem) 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#F5F0E8", textAlign: "center", marginBottom: "3.5rem" }}>
            Siete Actos Gastronómicos
          </h2>

          {[
            { acto: "I", titulo: "Bienvenida & Cóctel", desc: "Cóctel especial de maceración propia.", bebida: "Cóctel artesanal" },
            { acto: "II", titulo: "Aperitivo: Snacks", desc: "Delicias gourmet sorprendentes.", bebida: "Vino blanco" },
            { acto: "III", titulo: "Entrada: Mar", desc: "Proteína fresca con técnica sofisticada.", bebida: "Albariño" },
            { acto: "IV", titulo: "Sorpresa Chef", desc: "Creatividad e innovación culinaria.", bebida: "Vino rosado" },
            { acto: "V", titulo: "Plato Principal", desc: "Proteína premium con acompañamientos.", bebida: "Vino tinto" },
            { acto: "VI", titulo: "Postre", desc: "Repostería artesanal del chef.", bebida: "Cava premium" },
            { acto: "VII", titulo: "Digestivo", desc: "Finalización elegante con petit fours.", bebida: "Gin-tonic" },
          ].map((acto) => (
            <div key={acto.acto} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", padding: "2rem", marginBottom: "2rem", borderLeft: "3px solid var(--gs-gold)", background: "rgba(218,165,32,0.03)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "3rem", color: "var(--gs-gold)", marginBottom: "0.5rem" }}>{acto.acto}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", color: "#F5F0E8", marginBottom: "0.8rem" }}>{acto.titulo}</h3>
                <p style={{ color: "rgba(245,240,232,0.75)" }}>{acto.desc}</p>
              </div>
              <div style={{ background: "rgba(218,165,32,0.1)", padding: "1.5rem", textAlign: "center", borderRadius: "4px" }}>
                <p style={{ color: "var(--gs-gold)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>MARIDAJE</p>
                <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.1rem", color: "#F5F0E8" }}>{acto.bebida}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INFO PRÁCTICA */}
      <section style={{ padding: "clamp(5rem, 8vw, 8rem) 2rem", maxWidth: "950px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "3rem", textAlign: "center" }}>
          Detalles
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {[{ label: "Duración", valor: "3 horas" }, { label: "Capacidad", valor: "Máx. 12 personas" }, { label: "Precio", valor: "145€/persona" }, { label: "Ubicación", valor: "Secreta" }, { label: "Alergias", valor: "Especifica al reservar" }, { label: "Aviso", valor: "48h recomendado" }].map((item) => (
            <div key={item.label} style={{ padding: "1.5rem", borderLeft: "2px solid var(--gs-gold)" }}>
              <p style={{ color: "var(--gs-gold)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{item.label}</p>
              <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.2rem", color: "#F5F0E8" }}>{item.valor}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(5rem, 8vw, 8rem) 2rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "2rem" }}>
          ¿Listo?
        </h2>
        <button onClick={openReservation} style={{ background: "var(--gs-gold)", color: "#0A0A0A", padding: "1.1rem 4rem", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", border: "none" }}>
          Reservar Ahora
        </button>
      </section>
    </PageLayout>
  );
}
