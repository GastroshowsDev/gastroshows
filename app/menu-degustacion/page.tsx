import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, restaurantSchema, breadcrumbSchema, eventSchema } from "@/components/seo/JsonLd";


export const metadata: Metadata = {
  title: "Menú Degustación Barcelona · Experiencia Gastronómica Premium",
  description:
    "Descubre el menú degustación más exclusivo de Barcelona: 7 actos en ubicación secreta. Cóctel, mesa del chef, 3 platos, 2 postres, maridaje premium. Desde 145€. ¡Reserva ya!",
  keywords:
    "menu degustacion barcelona, menú degustación barcelona, experiencia gastronomica barcelona, restaurante secreto barcelona, tasting menu barcelona, cena clandestina barcelona, restaurantes estrella michelin barcelona",
  alternates: {
    canonical: "https://gastroshows.es/menu-degustacion",
  },
  openGraph: {
    title: "Menú Degustación Barcelona · 7 Actos · GastroShows",
    description:
      "7 actos culinarios en ubicación secreta. Cóctel, mesa del chef, platos de temporada, maridaje y gin-tonic premium.",
    url: "https://gastroshows.es/menu-degustacion",
    type: "website",
    locale: "es_ES",
  },
};

const pasos = [
  {
    num: "I",
    title: "Cóctel de Bienvenida",
    desc: "La experiencia comienza con un cóctel de autor diseñado para despertar los sentidos. Snacks de bienvenida que marcan el tono de la noche.",
    icon: "🍸",
  },
  {
    num: "II",
    title: "Mesa del Chef",
    desc: "Entre 6 y 9 bocados elaborados en el momento. Una conversación directa con la cocina, donde cada bocado cuenta una historia.",
    icon: "👨‍🍳",
  },
  {
    num: "III",
    title: "Primer Plato",
    desc: "Producto de temporada y proximidad. Ingredientes de kilómetro cero con técnica de alta cocina.",
    icon: "🥗",
  },
  {
    num: "IV",
    title: "Plato Principal",
    desc: "El corazón del menú. Un plato que combina tradición catalana con técnicas contemporáneas.",
    icon: "🥩",
  },
  {
    num: "V",
    title: "Tercer Plato",
    desc: "Transición elegante hacia los postres. Sabores que evolucionan hacia la dulzura.",
    icon: "🐟",
  },
  {
    num: "VI",
    title: "Dos Postres",
    desc: "Un preludio y el cierre perfecto. Desde el pré-dessert hasta el postre principal.",
    icon: "🍮",
  },
  {
    num: "VII",
    title: "Gin-Tonic & Petit Fours",
    desc: "4 o 5 petit fours artesanales acompañados de un gin-tonic premium para cerrar la experiencia con elegancia.",
    icon: "🍫",
  },
];

const maridaje = [
  "Cóctel de autor en la bienvenida",
  "Vino blanco seleccionado",
  "Vino rosado de temporada",
  "Vino dulce para los postres",
  "Cava para brindar",
  "Licor digestivo",
  "Gin-tonic premium al cierre",
];

export default function MenuDegustacion() {
  return (
    <PageLayout>
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "https://gastroshows.es" },
          { name: "Menú Degustación", url: "https://gastroshows.es/menu-degustacion" },
        ])}
      />
      <JsonLd
        data={eventSchema({
          name: "Menú Degustación GastroShows Barcelona — 7 Actos",
          description:
            "Menú degustación de 7 actos en ubicación secreta de Barcelona. Incluye maridaje completo con vinos, cava y gin-tonic premium.",
          price: 145,
        })}
      />

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
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(218,165,32,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "1.5rem",
            }}
          >
            GastroShows · Barcelona
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Menú Degustación
            <br />
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>Barcelona</em>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--gs-muted)",
              maxWidth: "580px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            Siete actos culinarios en una ubicación secreta. Una experiencia gastronómica
            que comienza días antes de sentarte a la mesa.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/"
              style={{
                background: "var(--gs-gold)",
                color: "#0A0A0A",
                padding: "0.9rem 2.5rem",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Reservar Ahora
            </Link>
            <Link
              href="/regalo"
              style={{
                border: "1px solid var(--gs-gold)",
                color: "var(--gs-gold)",
                padding: "0.9rem 2.5rem",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Regalar Experiencia
            </Link>
          </div>
        </div>
      </section>

      {/* Datos rápidos */}
      <section
        style={{
          background: "var(--gs-bg2)",
          borderTop: "1px solid var(--gs-border)",
          borderBottom: "1px solid var(--gs-border)",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
          {[
            { label: "Actos", value: "7" },
            { label: "Duración", value: "3 horas" },
            { label: "Horarios", value: "13–16h · 20–23h" },
            { label: "Maridaje", value: "Incluido" },
            { label: "Ubicación", value: "Secreta · Barcelona" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "var(--gs-gold)",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gs-muted)",
                  marginTop: "0.25rem",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Los 7 actos */}
      <section style={{ padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
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
          El menú
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 300,
            color: "var(--gs-text)",
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          Los Siete Actos
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {pasos.map((paso, i) => (
            <div
              key={paso.num}
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "flex-start",
                padding: "2rem",
                border: "1px solid var(--gs-border)",
                background: i % 2 === 0 ? "transparent" : "rgba(218,165,32,0.02)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "3.5rem",
                  fontWeight: 300,
                  color: "var(--gs-gold)",
                  opacity: 0.3,
                  lineHeight: 1,
                  minWidth: "3rem",
                  textAlign: "center",
                }}
              >
                {paso.num}
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    color: "var(--gs-text)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {paso.icon} {paso.title}
                </h3>
                <p style={{ color: "var(--gs-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  {paso.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Maridaje */}
      <section
        style={{
          background: "var(--gs-bg2)",
          padding: "6rem 2rem",
          borderTop: "1px solid var(--gs-border)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "1rem",
            }}
          >
            Incluido en el menú
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "3rem",
            }}
          >
            Maridaje Completo
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {maridaje.map((item) => (
              <div
                key={item}
                style={{
                  padding: "1.25rem 1.5rem",
                  border: "1px solid var(--gs-border)",
                  color: "var(--gs-muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "var(--gs-gold)", marginRight: "0.5rem" }}>·</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner oferta */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #1a1500 100%)",
          border: "1px solid rgba(218,165,32,0.2)",
          padding: "3rem 2rem",
          textAlign: "center",
          margin: "0 2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gs-gold)",
            marginBottom: "0.5rem",
          }}
        >
          Oferta especial
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.8rem",
            fontWeight: 300,
            color: "var(--gs-text)",
            marginBottom: "0.5rem",
          }}
        >
          15% de descuento los miércoles y jueves
        </p>
        <p style={{ color: "var(--gs-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
          La misma experiencia completa, a un precio especial entre semana
        </p>
        <Link
          href="/"
          style={{
            background: "var(--gs-gold)",
            color: "#0A0A0A",
            padding: "0.85rem 2.5rem",
            fontFamily: "var(--font-montserrat)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Reservar con descuento
        </Link>
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
          ¿Listo para vivir la experiencia?
        </h2>
        <p style={{ color: "var(--gs-muted)", marginBottom: "2.5rem", fontSize: "1rem" }}>
          Plazas limitadas. Cada sesión es única e irrepetible.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              background: "var(--gs-gold)",
              color: "#0A0A0A",
              padding: "1rem 3rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Reservar
          </Link>
          <Link
            href="/regalo"
            style={{
              border: "1px solid var(--gs-gold)",
              color: "var(--gs-gold)",
              padding: "1rem 3rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Regalar
          </Link>
        </div>
      </section>


    </PageLayout>
  );
}
