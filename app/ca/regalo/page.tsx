import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regala Cena Clandestina Barcelona · Bono Regalo Experiència Gastronòmica",
  description: "Regala l'experiència més exclusiva de Barcelona: cena clandestina amb ubicació secreta, menú de degustació i maridatge premium. Bono de regal digital amb validesa 12 mesos.",
  robots: "index, follow",
  alternates: { canonical: "https://gastroshows.es/ca/regalo" },
  openGraph: {
    title: "Regala Experiència Gastronòmica Única",
    description: "Cena clandestina a Barcelona amb ubicació secreta",
    type: "website",
    url: "https://gastroshows.es/ca/regalo",
  },
};

"use client";

import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";

import { usePageActions } from "@/context/PageActionsContext";

export default function Regalo() {
  const { openGift } = usePageActions();

  return (
    <PageLayout>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #050505 0%, var(--gs-bg) 100%)",
          padding: "8rem 2rem 6rem",
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
              "radial-gradient(ellipse 55% 45% at 50% 30%, rgba(218,165,32,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "1.5rem",
            }}
          >
            El regalo perfecto
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Regala una Experiencia
            <br />
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>Gastronómica</em>
            <br />
            en Barcelona
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--gs-muted)",
              maxWidth: "520px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
            }}
          >
            Un bono regalo para vivir la cena clandestina más especial de Barcelona.
            La persona elegida recibirá los mensajes misteriosos y vivirá la experiencia completa.
          </p>
          <button
            onClick={openGift}
            style={{
              background: "var(--gs-gold)",
              color: "#0A0A0A",
              padding: "1rem 3rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              border: "none",
              display: "inline-block",
            }}
          >
            Comprar Bono Regalo
          </button>
        </div>
      </section>

      {/* Por qué regalar */}
      <section style={{ padding: "6rem 2rem", maxWidth: "950px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gs-gold)",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Una experiencia diferente
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            color: "var(--gs-text)",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          ¿Por qué regalar GastroShows?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            {
              icon: "✉️",
              title: "Experiencia desde el primer momento",
              desc: "La persona recibe mensajes misteriosos antes de la cena. El regalo comienza con el primer mensaje.",
            },
            {
              icon: "🎭",
              title: "Completamente diferente",
              desc: "No es una cena convencional. Es una aventura gastronómica que nadie olvidará.",
            },
            {
              icon: "🍾",
              title: "Todo incluido",
              desc: "Menú degustación de 7 actos, maridaje completo con vinos, cava y gin-tonic premium.",
            },
            {
              icon: "📅",
              title: "Sin fecha de caducidad inmediata",
              desc: "La persona puede elegir la fecha que mejor le convenga. Validez extendida.",
            },
            {
              icon: "👥",
              title: "Para dos o más personas",
              desc: "Ideal para parejas, amigos o familia. Regala la experiencia completa para el grupo.",
            },
            {
              icon: "🎁",
              title: "Presentación especial",
              desc: "Bono regalo digital con diseño exclusivo, listo para enviar o imprimir.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "2rem",
                border: "1px solid var(--gs-border)",
                background: "rgba(218,165,32,0.02)",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{item.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.2rem",
                  color: "var(--gs-text)",
                  marginBottom: "0.5rem",
                  fontWeight: 400,
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "var(--gs-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ocasiones */}
      <section
        style={{
          background: "var(--gs-bg2)",
          borderTop: "1px solid var(--gs-border)",
          borderBottom: "1px solid var(--gs-border)",
          padding: "5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "2.5rem",
            }}
          >
            Perfecto para cualquier ocasión
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {[
              "Cumpleaños",
              "Aniversario",
              "San Valentín",
              "Navidad",
              "Despedida de soltero/a",
              "Día de la Madre",
              "Día del Padre",
              "Graduación",
              "Boda",
              "Celebración especial",
            ].map((ocasion) => (
              <span
                key={ocasion}
                style={{
                  padding: "0.6rem 1.5rem",
                  border: "1px solid var(--gs-border)",
                  color: "var(--gs-muted)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                }}
              >
                {ocasion}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            color: "var(--gs-text)",
            marginBottom: "1.5rem",
          }}
        >
          El regalo que no se olvida
        </h2>
        <p
          style={{
            color: "var(--gs-muted)",
            marginBottom: "2.5rem",
            fontSize: "1rem",
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Una experiencia es el mejor regalo. Y esta, además, empieza antes de vivirla.
        </p>
        <button
          onClick={openGift}
          style={{
            background: "var(--gs-gold)",
            color: "#0A0A0A",
            padding: "1rem 3.5rem",
            fontFamily: "var(--font-montserrat)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            border: "none",
            display: "inline-block",
          }}
        >
          Comprar Bono Regalo
        </button>
      </section>


    </PageLayout>
  );
}
