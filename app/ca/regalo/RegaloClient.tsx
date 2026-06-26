"use client";

import { PageLayout } from "@/components/PageLayout";
import { usePageActions } from "@/context/PageActionsContext";

export function RegaloClient() {
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
            El regal perfecte
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
            Regala una Experiència
            <br />
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>Gastronòmica</em>
            <br />
            a Barcelona
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
            Un bo regal per viure el sopar clandestí més especial de Barcelona.
            La persona escollida rebrà els missatges misteriosos i viurà l&apos;experiència completa.
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
            Comprar Bo Regal
          </button>
        </div>
      </section>

      {/* Per què regalar */}
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
          Una experiència diferent
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
          Per què regalar GastroShows?
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
              title: "Experiència des del primer moment",
              desc: "La persona rep missatges misteriosos abans del sopar. El regal comença amb el primer missatge.",
            },
            {
              icon: "🎭",
              title: "Completament diferent",
              desc: "No és un sopar convencional. És una aventura gastronòmica que ningú oblidarà.",
            },
            {
              icon: "🍾",
              title: "Tot inclòs",
              desc: "Menú de degustació de 7 actes, maridatge complet amb vins, cava i gin-tonic premium.",
            },
            {
              icon: "📅",
              title: "Sense data de caducitat immediata",
              desc: "La persona pot escollir la data que millor li convingui. Validesa estesa.",
            },
            {
              icon: "👥",
              title: "Per a dos o més persones",
              desc: "Ideal per a parelles, amics o família. Regala l'experiència completa per al grup.",
            },
            {
              icon: "🎁",
              title: "Presentació especial",
              desc: "Bo regal digital amb disseny exclusiu, llest per enviar o imprimir.",
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

      {/* Ocasions */}
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
            Perfecte per a qualsevol ocasió
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
              "Aniversari",
              "Aniversari de parella",
              "Sant Valentí",
              "Nadal",
              "Comiat de solter/a",
              "Dia de la Mare",
              "Dia del Pare",
              "Graduació",
              "Boda",
              "Celebració especial",
            ].map((ocasio) => (
              <span
                key={ocasio}
                style={{
                  padding: "0.6rem 1.5rem",
                  border: "1px solid var(--gs-border)",
                  color: "var(--gs-muted)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                }}
              >
                {ocasio}
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
          El regal que no s&apos;oblida
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
          Una experiència és el millor regal. I aquesta, a més, comença abans de viure-la.
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
          Comprar Bo Regal
        </button>
      </section>
    </PageLayout>
  );
}
