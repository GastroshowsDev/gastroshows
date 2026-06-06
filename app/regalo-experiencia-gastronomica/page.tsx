import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, productSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Regala Experiencia Gastronómica Barcelona · Bono Regalo Cena Clandestina",
  description:
    "Regala la experiencia más exclusiva de Barcelona: cena clandestina con ubicación secreta, menú degustación de 7 actos y maridaje premium. Bono regalo digital con validez 12 meses.",
  keywords:
    "regalar experiencia gastronomica barcelona, bono regalo cena, tarjeta regalo restaurante barcelona, regalo cena clandestina, experiencia regalo barcelona",
  alternates: { canonical: "https://gastroshows.es/regalo-experiencia-gastronomica" },
  openGraph: {
    title: "Regala una Experiencia Gastronómica Única en Barcelona",
    description: "Cena clandestina, ubicación secreta, menú de 7 actos, maridaje premium. El regalo que nadie olvida.",
    type: "website",
    images: [{ url: "/images/web2026-optimizadas/og-regalo.jpg", width: 1200, height: 630 }],
  },
};

export default function RegaloExperienciaGastronomica() {
  const giftProduct = productSchema({
    name: "Bono Regalo Experiencia Gastronómica Clandestina",
    description: "Experiencia gastronómica exclusiva en ubicación secreta con menú degustación y maridaje premium",
    price: 145,
  });

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", url: "https://gastroshows.es" },
        { name: "Regala", url: "https://gastroshows.es/regalo-experiencia-gastronomica" },
      ])} />
      <JsonLd data={giftProduct} />

      <main>
        {/* HERO */}
        <section
          style={{
            background: "linear-gradient(180deg, #050505 0%, var(--gs-bg) 100%)",
            padding: "clamp(8rem, 15vw, 12rem) 2rem",
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
                "radial-gradient(ellipse 55% 45% at 50% 30%, rgba(218,165,32,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "750px", margin: "0 auto", position: "relative" }}>
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
              🎁 La mejor idea de regalo
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(3.2rem, 8vw, 4.8rem)",
                fontWeight: 300,
                color: "var(--gs-text)",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Regala una Experiencia
              <br />
              <span style={{ color: "var(--gs-gold)" }}>Gastronómica</span>
              <br />
              Inolvidable
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--gs-muted)",
                maxWidth: "580px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.8,
              }}
            >
              Regala la experiencia más exclusiva de Barcelona: una cena clandestina con ubicación secreta, menú degustación de 7 actos y maridaje premium.
            </p>
            <Link
              href="/gift-card"
              style={{
                background: "var(--gs-gold)",
                color: "#0A0A0A",
                padding: "1.2rem 3.5rem",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                borderRadius: "2px",
              }}
            >
              Comprar Bono Regalo
            </Link>
          </div>
        </section>

        {/* QUÉ INCLUYE */}
        <section
          style={{
            padding: "5rem 2rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
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
            La experiencia completa
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
            Qué incluye el bono regalo
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
            {[
              { title: "Ubicación Secreta", desc: "Recibirá 4 mensajes misteriosos que revelan pistas hasta el día de la cena" },
              { title: "Menú 7 Actos", desc: "Cóctel bienvenida, mesa del chef, platos principales y postres de autor" },
              { title: "Maridaje Completo", desc: "Vinos, cava, licor premium y gin-tonic artesanal incluidos" },
              { title: "Espacio Privado", desc: "Ambiente exclusivo para máximo 12 personas con servicio dedicado" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "2rem",
                  border: "1px solid var(--gs-border)",
                  background: "var(--gs-bg2)",
                }}
              >
                <h3 style={{ color: "var(--gs-gold)", marginBottom: "0.75rem", fontSize: "1.1rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* POR QUÉ ES EL MEJOR REGALO */}
        <section
          style={{
            padding: "5rem 2rem",
            background: "var(--gs-bg2)",
            borderTop: "1px solid var(--gs-border)",
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
              La propuesta perfecta
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
              Por qué es el mejor regalo
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { num: "1", title: "Memorable", desc: "No es un regalo más. Es una experiencia que se recuerda de por vida." },
                { num: "2", title: "Sorpresa Integrada", desc: "El misterio es parte del regalo. La anticipación comienza cuando lo reciben." },
                { num: "3", title: "Premium", desc: "Gastronomía de nivel, maridaje completo, servicio dedicado. Todo incluido." },
                { num: "4", title: "Flexible", desc: "12 meses para usar. El afortunado elige cuándo y con quién vivirlo." },
                { num: "5", title: "Para Todos", desc: "Perfecto para parejas, amigos, familia. Experiencia compartida sin igual." },
              ].map((item) => (
                <div
                  key={item.num}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                    padding: "1.5rem",
                    border: "1px solid var(--gs-border)",
                    background: "var(--gs-bg)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--gs-gold)",
                      color: "#0A0A0A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <h3 style={{ color: "var(--gs-gold)", marginBottom: "0.5rem" }}>{item.title}</h3>
                    <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
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
            Sorprende a alguien especial
          </h2>
          <p
            style={{
              color: "var(--gs-muted)",
              maxWidth: "480px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            El bono regalo es digital y se envía instantáneamente. Personalizable con tu mensaje. Válido durante 12 meses.
          </p>
          <Link
            href="/gift-card"
            style={{
              background: "var(--gs-gold)",
              color: "#0A0A0A",
              padding: "1.2rem 4rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
              borderRadius: "2px",
            }}
          >
            Comprar Ahora
          </Link>
        </section>
      </main>
    </PageLayout>
  );
}
