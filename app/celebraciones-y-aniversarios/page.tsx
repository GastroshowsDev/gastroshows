import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Celebraciones y Aniversarios Barcelona · Cenas Exclusivas · GastroShows",
  description:
    "Celebraciones especiales en Barcelona: cumpleaños, aniversarios de empresa, eventos de hito. Menú degustación exclusivo, ubicación secreta y experiencia memorable.",
  keywords:
    "celebraciones barcelona, aniversarios empresa barcelona, cena cumpleaños, cena aniversario, eventos especiales barcelona, cena celebración",
  alternates: {
    canonical: "https://gastroshows.es/celebraciones-y-aniversarios",
  },
  openGraph: {
    title: "Celebraciones y Aniversarios · GastroShows",
    description:
      "Eventos especiales con menú degustación exclusivo. Celebra momentos únicos en Barcelona.",
    url: "https://gastroshows.es/celebraciones-y-aniversarios",
    type: "website",
    images: [{ url: "/images/web2026-optimizadas/og-celebraciones.jpg", width: 1200, height: 630 }],
  },
};

export default function CelebracionesAniversarios() {
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
            Momentos especiales
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
            Celebraciones y
            <br />
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>Aniversarios</em>
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
            Cumpleaños, aniversarios de empresa, hitos especiales. Una experiencia gastronómica
            que recordarás para siempre.
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

      {/* Tipos de celebraciones */}
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
            Ocasiones especiales
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
            Celebra con estilo
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                title: "Cumpleaños",
                desc: "La cena de cumpleaños definitiva. Menú degustación, sorpresas diseñadas y un ambiente que hace que cada edad sea una celebración.",
              },
              {
                title: "Aniversario de Empresa",
                desc: "Marca la ocasión con una experiencia gastronómica premium. Celebra los logros con tu equipo de forma memorable.",
              },
              {
                title: "Despedidas",
                desc: "Despedida de soltera/o, cambio de trabajo o cierre de ciclo. Una cena que marca el momento con elegancia.",
              },
              {
                title: "Hitos Personales",
                desc: "Jubilación, promoción, nuevos inicios. Cada momento importante merece una experiencia especial.",
              },
            ].map((tipo) => (
              <div
                key={tipo.title}
                style={{
                  padding: "2rem",
                  border: "1px solid var(--gs-border)",
                  background: "var(--gs-bg)",
                }}
              >
                <h3 style={{ color: "var(--gs-gold)", marginBottom: "0.75rem", fontSize: "1.1rem" }}>
                  {tipo.title}
                </h3>
                <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {tipo.desc}
                </p>
              </div>
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
          Lo que te llevará
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
            "Ubicación secreta en Barcelona",
            "Menú degustación personalizado para la ocasión",
            "Maridaje premium: vinos, cavas y licores seleccionados",
            "Espacio privado y exclusivo",
            "Chef dedicado que cuida cada detalle",
            "Capacidad flexible desde 8 hasta 50 personas",
            "Posibilidad de decoración temática",
            "Sorpresas diseñadas para el momento",
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

      {/* CTA contacto */}
      <section
        style={{
          padding: "6rem 2rem",
          textAlign: "center",
          background: "var(--gs-bg2)",
          borderTop: "1px solid var(--gs-border)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            color: "var(--gs-text)",
            marginBottom: "1.5rem",
          }}
        >
          Hazlo memorable
        </h2>
        <p
          style={{
            color: "var(--gs-muted)",
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Cuéntanos qué celebras, quién te acompaña y cómo quieres que sea. Crearemos la cena
          perfecta para tu ocasión especial.
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
          { name: "Celebraciones y Aniversarios", url: "https://gastroshows.es/celebraciones-y-aniversarios" },
        ])}
      />
    </PageLayout>
  );
}
