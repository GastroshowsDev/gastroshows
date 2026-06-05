import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cenas de Empresa Barcelona · Menú Degustación Corporativo · GastroShows",
  description:
    "Cenas de empresa en Barcelona con ubicación secreta, menú degustación exclusivo y maridaje premium. Ideal para equipos, clientes y celebraciones corporativas. Desde 10 personas.",
  keywords:
    "cenas de empresa barcelona, cena corporativa, menú degustación empresa, evento gastronómico empresa, cena ejecutiva barcelona, comida de empresa gourmet",
  alternates: {
    canonical: "https://gastroshows.es/cenas-de-empresa",
  },
  openGraph: {
    title: "Cenas de Empresa Barcelona · GastroShows",
    description:
      "Cenas corporativas con ubicación secreta, menú degustación y maridaje premium para tu equipo.",
    url: "https://gastroshows.es/cenas-de-empresa",
    type: "website",
    images: [{ url: "/images/web2026-optimizadas/og-cenas-empresa.jpg", width: 1200, height: 630 }],
  },
};

export default function CenasEmpresa() {
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
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
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
            Experiencias corporativas
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
            Cenas de
            <br />
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>Empresa</em>
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
            Menú degustación exclusivo, ubicación secreta y maridaje premium. La experiencia
            clandestina para tu empresa.
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

      {/* Tipos de cenas */}
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
            Modalidades
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
            Cenas a medida para tu empresa
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
                title: "Cena de Fin de Año",
                desc: "Celebración empresarial con estilo. Ubicación secreta, menú degustación y ambiente sofisticado para cerrar el año con elegancia.",
              },
              {
                title: "Cena con Clientes",
                desc: "Menú degustación que impresiona. Maridaje premium, espacio privado y una experiencia que genera conexión.",
              },
              {
                title: "Cena Team Building",
                desc: "Gastronomía + conexión. Menú compartido, sorpresas diseñadas y el ambiente perfecto para fortalecer vínculos.",
              },
              {
                title: "Lanzamiento de Producto",
                desc: "Experiencia gastronómica diseñada para el evento. Menú tematizado, ambiente premium y todos los detalles pensados.",
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
          Detalle de la experiencia
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
          Incluido en la experiencia
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[
            "Ubicación secreta en Barcelona",
            "Menú degustación de 4-7 actos",
            "Maridaje completo: vinos, cava, licor y gin-tonic premium",
            "Espacio privado y exclusivo para tu empresa",
            "Chef y equipo dedicados al evento",
            "Capacidad desde 10 hasta 80 personas",
            "Flexibilidad de horarios y personalización",
            "Ambiente sofisticado y cuidado al detalle",
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
          Diseñamos tu cena perfecta
        </h2>
        <p
          style={{
            color: "var(--gs-muted)",
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Cuéntanos el número de personas, la ocasión y tus preferencias. Crearemos una experiencia
          gastronómica única para tu empresa.
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
          { name: "Cenas de Empresa", url: "https://gastroshows.es/cenas-de-empresa" },
        ])}
      />
    </PageLayout>
  );
}
