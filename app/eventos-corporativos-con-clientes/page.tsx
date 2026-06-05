import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Eventos Corporativos con Clientes Barcelona · GastroShows",
  description:
    "Eventos corporativos con clientes en Barcelona. Experiencias gastronómicas de lujo para networking, presentaciones y relaciones comerciales. Ubicación secreta, menú degustación premium.",
  keywords:
    "eventos corporativos barcelona, eventos clientes barcelona, networking gastronómico, evento corporativo premium, presentación empresa barcelona, evento cliente barcelona",
  alternates: {
    canonical: "https://gastroshows.es/eventos-corporativos-con-clientes",
  },
  openGraph: {
    title: "Eventos Corporativos con Clientes · GastroShows",
    description:
      "Experiencias gastronómicas premium para impresionar a tus clientes y generar conexiones duraderas.",
    url: "https://gastroshows.es/eventos-corporativos-con-clientes",
    type: "website",
    images: [{ url: "/images/web2026-optimizadas/og-eventos-corporativos.jpg", width: 1200, height: 630 }],
  },
};

export default function EventosCorporativosClientes() {
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
            Experiencias de nivel
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
            Eventos Corporativos
            <br />
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>con Clientes</em>
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
            Gastronomía premium para impresionar. Crea conexiones duraderas con tus clientes en
            un espacio exclusivo.
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

      {/* Tipos de eventos */}
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
            Objetivos
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
            Eventos que generan impacto
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
                title: "Networking Gastronómico",
                desc: "Menú compartido que facilita la conversación. Espacio íntimo donde los clientes se sienten valorados y se generan conexiones reales.",
              },
              {
                title: "Presentación Producto",
                desc: "Lanzamiento de producto con experiencia gastronómica. Menú tematizado donde el producto es protagonista de una experiencia memorable.",
              },
              {
                title: "Reunión Cliente Premium",
                desc: "Cierre de negocios en un ambiente sofisticado. Gastronomía nivel lujo que refleja el valor de tu empresa y la importancia del cliente.",
              },
              {
                title: "Retiro Estratégico",
                desc: "Jornada de trabajo más ceremonia gastronómica. Combina productividad con una experiencia que cohesiona y celebra logros.",
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
          La propuesta completa
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
          Servicio integral
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[
            "Ubicación exclusiva en Barcelona",
            "Menú degustación diseñado para la ocasión",
            "Maridaje premium: vinos, cavas y destilados de calidad",
            "Espacio privado completamente dedicado",
            "Chef y personal de servicio de nivel",
            "Capacidad desde 12 hasta 100 personas",
            "Flexible en horarios y requisitos especiales",
            "Ambiente que refleja el nivel de tu empresa",
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
          Impresiona a tus clientes
        </h2>
        <p
          style={{
            color: "var(--gs-muted)",
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Cuéntanos el objetivo del evento, número de asistentes y fecha. Diseñaremos la
          experiencia gastronómica perfecta para causar impacto.
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
          { name: "Eventos Corporativos con Clientes", url: "https://gastroshows.es/eventos-corporativos-con-clientes" },
        ])}
      />
    </PageLayout>
  );
}
