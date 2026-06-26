import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto · GastroShows Barcelona",
  description:
    "Contacta con GastroShows para consultas sobre reservas, grupos, eventos privados o cualquier pregunta sobre la cena clandestina de Barcelona. Respondemos en menos de 24 horas.",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/ca/contacto",
    languages: {
      es: "https://gastroshows.es/contacto",
      ca: "https://gastroshows.es/ca/contacto",
      "x-default": "https://gastroshows.es/contacto",
    },
  },
};

export default function Contacto() {
  return (
    <PageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "https://gastroshows.es" },
          { name: "Contacto", url: "https://gastroshows.es/contacto" },
        ])}
      />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #050505 0%, var(--gs-bg) 100%)",
          padding: "8rem 2rem 5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "1rem",
            }}
          >
            Hablemos
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "1.5rem",
            }}
          >
            Contacto
          </h1>
          <p style={{ color: "var(--gs-muted)", fontSize: "1rem", lineHeight: 1.7 }}>
            ¿Tienes preguntas sobre la experiencia? ¿Quieres organizar un evento privado?
            Escríbenos y te respondemos en menos de 24 horas.
          </p>
        </div>
      </section>

      {/* Formulario + Info */}
      <section
        style={{
          padding: "4rem 2rem 6rem",
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "4rem",
          alignItems: "start",
        }}
      >
        {/* Info de contacto */}
        <div>
          <div style={{ marginBottom: "3rem" }}>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                marginBottom: "1rem",
              }}
            >
              Información
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gs-muted)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Email
                </p>
                <p style={{ color: "var(--gs-text)", fontSize: "0.95rem" }}>
                  info@gastroshows.es
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gs-muted)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Ubicación
                </p>
                <p style={{ color: "var(--gs-text)", fontSize: "0.95rem" }}>
                  Barcelona, España
                  <br />
                  <span style={{ fontSize: "0.8rem", color: "var(--gs-muted)" }}>
                    (Ubicación exacta: secreta)
                  </span>
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gs-muted)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Sesiones
                </p>
                <p style={{ color: "var(--gs-text)", fontSize: "0.95rem" }}>
                  Miércoles a Domingo
                  <br />
                  13:00–16:00 · 20:00–23:00
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "1.5rem",
              border: "1px solid var(--gs-border)",
              background: "rgba(218,165,32,0.02)",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                color: "var(--gs-gold)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Grupos y eventos privados
            </p>
            <p style={{ color: "var(--gs-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
              Para grupos de 10 o más personas, organizamos experiencias privadas exclusivas.
              Escríbenos con los detalles.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <ContactForm />
      </section>
    </PageLayout>
  );
}
