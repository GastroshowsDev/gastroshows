import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Team Building Gastronómico Barcelona · Talleres y Eventos · GastroShows",
  description:
    "Team building gastronómico en Barcelona: talleres de cocina, sushi, cócteles, GastroChallenge. Eventos privados de grupo con experiencia clandestina. Desde 10 personas.",
  keywords:
    "team building barcelona, team building gastronómico, taller cocina empresa barcelona, talleres grupo barcelona, eventos equipo barcelona, actividades team building",
  alternates: {
    canonical: "https://gastroshows.es/team-building-gastronomico",
  },
  openGraph: {
    title: "Team Building Gastronómico · GastroShows",
    description:
      "Talleres de cocina, sushi, cócteles y experiencias clandestinas para fortalecer equipos con gastronomía.",
    url: "https://gastroshows.es/team-building-gastronomico",
    type: "website",
    images: [{ url: "/images/web2026-optimizadas/og-team-building.jpg", width: 1200, height: 630 }],
  },
};

export default function TeamBuildingGastronomico() {
  return (
    <PageLayout>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #050505 0%, var(--gs-bg) 100%)",
          padding: "120px 2rem 6rem",
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
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(218,165,32,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "750px", margin: "0 auto", position: "relative" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "1.5rem",
            }}
          >
            Une equipos con gastronomía
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Team Building
            <br />
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>Gastronómico</em>
            <br />
            Barcelona
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
            Talleres divertidos, eventos privados y experiencias clandestinas. La forma más
            deliciosa de fortalecer tu equipo.
          </p>
          <Link
            href="/contacto"
            style={{
              background: "var(--gs-gold)",
              color: "#0A0A0A",
              padding: "1rem 3rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Consultar Disponibilidad
          </Link>
        </div>
      </section>

      {/* Modalidades */}
      <section
        style={{
          background: "var(--gs-bg2)",
          borderTop: "1px solid var(--gs-border)",
          padding: "5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
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
            Modalidades disponibles
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "2.5rem",
              fontWeight: 300,
              color: "var(--gs-text)",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Elige tu experiencia
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                title: "Talleres de Cocina",
                desc: "Taller de tapas, sushi, cócteles. Aprende, crea y disfruta en equipo. Ideal para grupos de 10-30 personas.",
                link: "/team-building-cocina-barcelona",
              },
              {
                title: "GastroChallenge",
                desc: "Competición culinaria de 50 minutos. Equipos en concurso, adrenalina y diversión. La actividad más intensa.",
                link: "/team-building-cocina-barcelona#gastrochallenge",
              },
              {
                title: "Eventos Privados de Grupo",
                desc: "Experiencia clandestina completa para tu equipo. Espacio privado, menú degustación y magia. Desde 10-50 personas.",
                link: "/grupos",
              },
              {
                title: "Actividades a Medida",
                desc: "¿Tu idea es diferente? Diseñamos la experiencia perfecta adaptada a tu equipo y objetivos.",
                link: "/contacto",
              },
            ].map((modalidad) => (
              <Link
                key={modalidad.title}
                href={modalidad.link}
                style={{
                  padding: "2rem",
                  border: "1px solid var(--gs-border)",
                  background: "var(--gs-bg)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <div>
                  <h3 style={{ color: "var(--gs-gold)", marginBottom: "0.75rem", fontSize: "1.1rem" }}>
                    {modalidad.title}
                  </h3>
                  <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {modalidad.desc}
                  </p>
                </div>
                <p style={{ color: "var(--gs-gold)", fontSize: "0.8rem", marginTop: "1rem" }}>
                  Más info →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section style={{ padding: "5rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
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
          Lo que recibes
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "2.5rem",
            fontWeight: 300,
            color: "var(--gs-text)",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          Experiencia completa
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[
            "Actividad gastronómica diseñada para tu equipo",
            "Espacio privado y exclusivo",
            "Chef y equipo profesional dedicados",
            "Menú adaptado a preferencias dietéticas",
            "Ambiente lúdico que facilita la conexión",
            "Flexible en horarios y fechas",
            "Asesoramiento personalizado en la propuesta",
            "Desde talleres de 2h hasta eventos completos de jornada",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                padding: "1.25rem 1.5rem",
                border: "1px solid var(--gs-border)",
              }}
            >
              <span style={{ color: "var(--gs-gold)", fontSize: "1.1rem", flexShrink: 0 }}>·</span>
              <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Por qué elegir */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "var(--gs-bg2)",
          borderTop: "1px solid var(--gs-border)",
          borderBottom: "1px solid var(--gs-border)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
            Ventajas
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "2.5rem",
              fontWeight: 300,
              color: "var(--gs-text)",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Por qué gastronómico
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                title: "Genera Conexión",
                desc: "La gastronomía compartida es un lenguaje universal. Facilita conversación y vínculos genuinos.",
              },
              {
                title: "Memorable",
                desc: "Los equipos recuerdan las experiencias gastronómicas. Crea historias para contar.",
              },
              {
                title: "Productivo",
                desc: "Diversión + aprendizaje. Talleres interactivos donde todos participan activamente.",
              },
              {
                title: "Premium",
                desc: "Gastronomía de calidad. Refleja el valor que tu empresa da a su equipo.",
              },
            ].map((ventaja) => (
              <div
                key={ventaja.title}
                style={{
                  padding: "1.5rem",
                  background: "var(--gs-bg)",
                  border: "1px solid var(--gs-border)",
                  textAlign: "center",
                }}
              >
                <h3 style={{ color: "var(--gs-gold)", marginBottom: "0.75rem" }}>
                  {ventaja.title}
                </h3>
                <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {ventaja.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA contacto */}
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
          Diseñemos tu experiencia
        </h2>
        <p
          style={{
            color: "var(--gs-muted)",
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Cuéntanos qué buscas, número de personas y fecha. Crearemos el team building perfecto
          para tu equipo.
        </p>
        <Link
          href="/contacto"
          style={{
            background: "var(--gs-gold)",
            color: "#0A0A0A",
            padding: "1rem 3.5rem",
            fontFamily: "var(--font-montserrat)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Contactar Ahora
        </Link>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "https://gastroshows.es" },
          { name: "Team Building Gastronómico", url: "https://gastroshows.es/team-building-gastronomico" },
        ])}
      />
    </PageLayout>
  );
}
