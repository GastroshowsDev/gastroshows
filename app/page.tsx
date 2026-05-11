"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { usePageActions } from "@/context/PageActionsContext";

// HOME: Optimizada para CTR + conversión basada en datos de SC
// Tráfico actual: 20,770 clics | Meta: 5.61% → 7% CTR = +5,239 clics

export default function Home() {
  const { openReservation, openGift } = usePageActions();

  return (
    <PageLayout>
      {/* ════════════════════════════════════════════════════════════ */}
      {/* HERO: Impacto visual + H1 con keywords críticas + CTA fuerte */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(135deg, #050505 0%, #1a1a1a 100%)",
          padding: "clamp(6rem, 12vw, 10rem) 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(218,165,32,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "1.5rem",
              fontWeight: 700,
            }}
          >
            🎭 Experiencia Gastronómica Única en Barcelona
          </p>

          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3.5rem, 10vw, 5.5rem)",
              fontWeight: 300,
              color: "#F5F0E8",
              lineHeight: 1.15,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Menú Degustación en
            <br />
            <span style={{ color: "var(--gs-gold)" }}>Cena Clandestina Barcelona</span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(245,240,232,0.8)",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Ubicación secreta. 4 actos gastronómicos. Gin-tonic de maceración propia.
            <br />
            Una experiencia culinaria que comienza antes de que llegues.
          </p>

          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <button
              onClick={openReservation}
              style={{
                background: "var(--gs-gold)",
                color: "#0A0A0A",
                padding: "1.1rem 3.5rem",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: "none",
                boxShadow: "0 8px 24px rgba(218,165,32,0.25)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(218,165,32,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(218,165,32,0.25)";
              }}
            >
              Reservar Cena Ahora
            </button>
            <button
              onClick={openGift}
              style={{
                border: "2px solid var(--gs-gold)",
                background: "transparent",
                color: "var(--gs-gold)",
                padding: "1rem 3.5rem",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(218,165,32,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              🎁 Regala la Experiencia
            </button>
          </div>

          <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
            ⚠ Plazas limitadas • Máximo 12 personas • 145€ por persona
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* PROPUESTA DE VALOR: ¿Por qué elegir GastroShows? */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(5rem, 8vw, 8rem) 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--gs-gold)",
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: 700,
          }}
        >
          ¿Por Qué Somos Diferentes?
        </p>

        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            textAlign: "center",
            marginBottom: "4rem",
            lineHeight: 1.3,
          }}
        >
          Más que una cena.
          <br />
          <span style={{ color: "var(--gs-gold)" }}>Una aventura culinaria.</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {[
            {
              icon: "🗺️",
              titulo: "Ubicación Misteriosa",
              desc: "Recibes mensajes enigmáticos con pistas. Solo horas antes, descubres la dirección exacta.",
            },
            {
              icon: "👨‍🍳",
              titulo: "Chef Experimentado",
              desc: "Cocina creativa y técnica. Ingredientes de proximidad. Presentación artística en cada plato.",
            },
            {
              icon: "🍷",
              titulo: "Maridaje Premium",
              desc: "Gin-tonic de maceración propia, vinos seleccionados y cava de calidad. 7 bebidas incluidas.",
            },
            {
              icon: "🎭",
              titulo: "Experiencia Memorable",
              desc: "4 actos gastronómicos de 3 horas. Conversación, sorpresas y momentos únicos garantizados.",
            },
          ].map((item) => (
            <div
              key={item.titulo}
              style={{
                padding: "2.5rem",
                borderLeft: "3px solid var(--gs-gold)",
                background: "rgba(218,165,32,0.03)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(218,165,32,0.08)";
                e.currentTarget.style.transform = "translateX(8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(218,165,32,0.03)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{item.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  color: "#F5F0E8",
                  marginBottom: "0.8rem",
                }}
              >
                {item.titulo}
              </h3>
              <p style={{ color: "rgba(245,240,232,0.7)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* EL MENÚ: Qué reciben (sin spoilers) */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--gs-bg2)", padding: "clamp(5rem, 8vw, 8rem) 2rem", borderTop: "1px solid var(--gs-border)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Lo Que Experimentarás
          </p>

          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "#F5F0E8",
              textAlign: "center",
              marginBottom: "3.5rem",
            }}
          >
            Cuatro Actos Gastronómicos
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
            {[
              { acto: "I", titulo: "Bienvenida", items: ["Cóctel de autor", "Snacks gourmet"] },
              { acto: "II", titulo: "Entrada", items: ["Ingredientes únicos", "Técnica sofisticada"] },
              { acto: "III", titulo: "Plato Fuerte", items: ["Proteína selecta", "Acompañamientos creativos"] },
              { acto: "IV", titulo: "Postre", items: ["Dulce sorpresa", "Petit fours artesanales"] },
            ].map((acto) => (
              <div
                key={acto.acto}
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  borderRadius: "8px",
                  background: "rgba(218,165,32,0.05)",
                  borderTop: "2px solid var(--gs-gold)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "3rem",
                    fontWeight: 300,
                    color: "var(--gs-gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {acto.acto}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    color: "#F5F0E8",
                    marginBottom: "1rem",
                  }}
                >
                  {acto.titulo}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {acto.items.map((item) => (
                    <li key={item} style={{ color: "rgba(245,240,232,0.7)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* CÓMO FUNCIONA: El proceso paso a paso */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(5rem, 8vw, 8rem) 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            textAlign: "center",
            marginBottom: "3.5rem",
          }}
        >
          Cómo Funciona
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {[
            { paso: "1", titulo: "Reserva Hoy", desc: "Elige fecha y número de personas. Confirmación inmediata." },
            { paso: "2", titulo: "Recibe Mensajes", desc: "Días antes, pistas enigmáticas sobre la ubicación." },
            { paso: "3", titulo: "Descubre la Ubicación", desc: "Horas antes del evento, conoces el lugar exacto." },
            { paso: "4", titulo: "Vive la Experiencia", desc: "3 horas de aventura culinaria inolvidable." },
          ].map((paso) => (
            <div key={paso.paso} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  margin: "0 auto 1.5rem",
                  borderRadius: "50%",
                  background: "var(--gs-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.8rem",
                  fontWeight: 300,
                  color: "#0A0A0A",
                }}
              >
                {paso.paso}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  color: "#F5F0E8",
                  marginBottom: "0.5rem",
                }}
              >
                {paso.titulo}
              </h3>
              <p style={{ color: "rgba(245,240,232,0.7)", fontSize: "0.9rem" }}>{paso.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* CTA FINAL: Conversión */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, rgba(218,165,32,0.1) 0%, transparent 100%)", padding: "clamp(5rem, 8vw, 8rem) 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 300,
              color: "#F5F0E8",
              marginBottom: "1.5rem",
            }}
          >
            ¿Listo para la aventura?
          </h2>

          <p
            style={{
              color: "rgba(245,240,232,0.75)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            Las mejores experiencias son las que nunca olvidas. Esta es una de ellas.
          </p>

          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={openReservation}
              style={{
                background: "var(--gs-gold)",
                color: "#0A0A0A",
                padding: "1.1rem 3.5rem",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: "none",
              }}
            >
              Reservar Ahora
            </button>
            <Link
              href="/preguntas-frecuentes"
              style={{
                border: "1px solid var(--gs-border)",
                color: "#F5F0E8",
                padding: "1rem 3rem",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Ver Preguntas Frecuentes
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
