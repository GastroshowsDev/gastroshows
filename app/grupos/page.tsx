import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import { AeoAnswer } from "@/components/seo/AeoAnswer";
import { GruposClient } from "./GruposClient";

const faqs = [
  { question: "¿Para cuántas personas son los eventos de grupo?", answer: "Organizamos eventos privados desde 10 hasta unas 50 personas. Para grupos más grandes adaptamos la experiencia en varias sesiones." },
  { question: "¿Qué tipo de eventos se pueden organizar?", answer: "Team building gastronómico, cenas de empresa, eventos corporativos con clientes, despedidas de soltero/a, aniversarios y celebraciones privadas." },
  { question: "¿Se puede personalizar el menú para el grupo?", answer: "Sí. Adaptamos el menú degustación a las preferencias del grupo y a alergias o dietas (vegetariano, vegano, sin gluten)." },
  { question: "¿La experiencia es en un espacio privado?", answer: "Sí. Los eventos de grupo se celebran en un espacio exclusivo para vosotros, con la experiencia clandestina completa." },
  { question: "¿Cómo se reserva un evento de grupo?", answer: "Contáctanos con la fecha y el número de personas y preparamos una propuesta a medida para tu evento en Barcelona." },
];

export const metadata: Metadata = {
  title: "Eventos Privados y Grupos Barcelona · GastroShows",
  description:
    "Cenas privadas y eventos de grupo en Barcelona. Team buildings, despedidas, aniversarios de empresa. Menú degustación exclusivo con ubicación secreta para grupos desde 10 personas.",
  keywords:
    "eventos privados barcelona, cenas empresa barcelona, team building gastronómico, despedidas soltera barcelona, cenas originales grupos barcelona, eventos gastronomicos barcelona",
  alternates: {
    canonical: "https://gastroshows.es/grupos",
    languages: {
      es: "https://gastroshows.es/grupos",
      ca: "https://gastroshows.es/ca/grupos",
      "x-default": "https://gastroshows.es/grupos",
    },
  },
  openGraph: {
    title: "Eventos Privados y Grupos Barcelona · GastroShows",
    description:
      "Organiza tu evento privado con la experiencia clandestina. Cenas de empresa, despedidas y celebraciones únicas en Barcelona.",
    url: "https://gastroshows.es/grupos",
    type: "website",
    images: [{ url: "/images/web2026-optimizadas/og-grupos.jpg", width: 1200, height: 630 }],
  },
};

export default function Grupos() {
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
            Experiencias exclusivas
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
            Grupos y
            <br />
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>Eventos Privados</em>
            <br />
            en Barcelona
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--gs-muted)",
              maxWidth: "520px",
              margin: "0 auto 1.5rem",
              lineHeight: 1.8,
            }}
          >
            La experiencia clandestina para tu grupo. Desde 10 personas. Menú exclusivo,
            espacio privado y la misma magia de siempre.
          </p>
          <p style={{ color: "rgba(218,165,32,0.7)", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
            <Link href="/cena-clandestina" style={{ color: "var(--gs-gold)", textDecoration: "underline" }}>
              Ver la experiencia individual →
            </Link>
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

      <GruposClient />

      {/* Características */}
      <section
        style={{
          background: "var(--gs-bg2)",
          borderTop: "1px solid var(--gs-border)",
          padding: "5rem 2rem",
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
            Qué incluye
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
            La experiencia privada completa
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              "Espacio privado y exclusivo para tu grupo",
              "Menú degustación de 7 actos adaptado",
              "Maridaje completo: vinos, cava, licor y gin-tonic premium",
              "La experiencia de los mensajes misteriosos para todos",
              "Chef y equipo dedicados exclusivamente a tu evento",
              "Capacidad desde 10 hasta 50 personas",
              "Flexibilidad de horarios y fechas",
              "Posibilidad de personalización del menú",
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
        </div>
      </section>

      {/* AEO: respuesta directa para motores de IA */}
      <AeoAnswer
        eyebrow="En breve"
        question="¿Qué es un evento gastronómico privado para grupos en Barcelona?"
        answer="Es una cena clandestina reservada en exclusiva para tu grupo: ubicación secreta, menú degustación y maridaje, con dinámicas adaptadas a team building, cenas de empresa, despedidas o celebraciones. GastroShows organiza eventos privados en Barcelona desde 10 hasta 50 personas, con menú personalizable a dietas y alergias."
        rows={[
          { label: "Capacidad", value: "Desde 10 hasta ~50 personas" },
          { label: "Eventos", value: "Team building, cenas de empresa, despedidas, aniversarios" },
          { label: "Menú", value: "Degustación personalizable (vegetariano, vegano, alergias)" },
          { label: "Espacio", value: "Privado y exclusivo para el grupo" },
          { label: "Reserva", value: "Propuesta a medida según fecha y nº de personas" },
        ]}
      />

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
          Cuéntanos tu proyecto
        </h2>
        <p
          style={{
            color: "var(--gs-muted)",
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Cada grupo es diferente. Contáctanos y diseñamos juntos la experiencia perfecta
          para tu ocasión.
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
          { name: "Grupos y Eventos", url: "https://gastroshows.es/grupos" },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />
    </PageLayout>
  );
}
