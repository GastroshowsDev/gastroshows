import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, restaurantSchema, breadcrumbSchema, eventSchema } from "@/components/seo/JsonLd";


export const metadata: Metadata = {
  title: "Cena Clandestina Barcelona · Restaurante Secreto · GastroShows",
  description:
    "La cena clandestina más famosa de Barcelona. Ubicación secreta, menú degustación de 7 actos y maridaje. Recibe 4 mensajes misteriosos antes de descubrir dónde vas. Reserva tu experiencia única.",
  keywords:
    "cena clandestina barcelona, restaurante secreto barcelona, experiencia gastronomica barcelona, cena sorpresa barcelona, cena clandestina, sopar clandesti barcelona, cena a ciegas barcelona",
  alternates: {
    canonical: "https://gastroshows.es/ca/cena-clandestina",
    languages: {
      es: "https://gastroshows.es/cena-clandestina",
      ca: "https://gastroshows.es/ca/cena-clandestina",
      en: "https://gastroshows.es/clandestine-dinner-barcelona",
      "x-default": "https://gastroshows.es/cena-clandestina",
    },
  },
  openGraph: {
    title: "Cena Clandestina Barcelona · GastroShows",
    description:
      "Una cena que comienza antes de que llegues. 4 mensajes misteriosos, una ubicación secreta y el mejor menú degustación de Barcelona.",
    url: "https://gastroshows.es/ca/cena-clandestina",
    type: "website",
    locale: "ca_ES",
  },
};

const pasos = [
  {
    num: "01",
    title: "Reservas",
    desc: "Elige fecha y número de comensales. Confirmamos tu plaza de inmediato.",
  },
  {
    num: "02",
    title: "Primera Pista",
    desc: "Días antes recibes el primer mensaje. Una pista críptica que empieza a construir el misterio.",
  },
  {
    num: "03",
    title: "Más Mensajes",
    desc: "Tres mensajes más llegan en los días siguientes. Cada uno revela un detalle diferente.",
  },
  {
    num: "04",
    title: "La Revelación",
    desc: "El día de la cena, con las horas justas, descubres la dirección exacta. El misterio se desvela.",
  },
  {
    num: "05",
    title: "La Experiencia",
    desc: "Llegas. La magia comienza. Tres horas de gastronomía, conversación y momentos únicos.",
  },
];

export default function CenaClandestina() {
  return (
    <PageLayout>
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "https://gastroshows.es" },
          { name: "Cena Clandestina", url: "https://gastroshows.es/cena-clandestina" },
        ])}
      />
      <JsonLd
        data={eventSchema({
          name: "Cena Clandestina GastroShows — Ubicación Secreta Barcelona",
          description:
            "Cena clandestina en ubicación secreta de Barcelona. 4 mensajes previos, menú degustación de 7 actos y maridaje completo.",
          price: 145,
        })}
      />

      {/* Hero oscuro y cinematográfico */}
      <section
        style={{
          background: "#050505",
          padding: "10rem 2rem 7rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(218,165,32,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "750px", position: "relative" }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "2rem",
            }}
          >
            Una experiencia única en Barcelona
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              lineHeight: 1.05,
              marginBottom: "2rem",
              letterSpacing: "-0.01em",
            }}
          >
            Cena
            <br />
            <em style={{ color: "var(--gs-gold)", fontStyle: "italic" }}>Clandestina</em>
            <br />
            Barcelona
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--gs-muted)",
              maxWidth: "520px",
              margin: "0 auto 3rem",
              lineHeight: 1.8,
            }}
          >
            Una cena que comienza antes de que llegues. Cuatro mensajes, cuatro pistas,
            una ubicación secreta que descubrirás tú solo.
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
                fontWeight: 700,
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
                border: "1px solid rgba(218,165,32,0.4)",
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
        </div>
      </section>

      {/* Separador */}
      <div
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, #050505, var(--gs-bg))",
          pointerEvents: "none",
        }}
      />

      {/* El proceso — los 4 mensajes */}
      <section style={{ padding: "4rem 2rem 6rem", maxWidth: "900px", margin: "0 auto" }}>
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
          El Ritual
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            color: "var(--gs-text)",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Cómo funciona la experiencia
        </h2>
        <p
          style={{
            color: "var(--gs-muted)",
            textAlign: "center",
            maxWidth: "550px",
            margin: "0 auto 4rem",
            lineHeight: 1.7,
          }}
        >
          Cada detalle está diseñado para generar anticipación. El misterio empieza mucho
          antes de sentarte a la mesa.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {pasos.map((paso, i) => (
            <div
              key={paso.num}
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "flex-start",
                padding: "2rem 2.5rem",
                borderLeft: "2px solid var(--gs-gold)",
                background: "rgba(218,165,32,0.02)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  color: "var(--gs-gold)",
                  opacity: 0.25,
                  minWidth: "3rem",
                  lineHeight: 1,
                }}
              >
                {paso.num}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "var(--gs-text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {paso.title}
                </h3>
                <p style={{ color: "var(--gs-muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                  {paso.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Oferta miércoles y jueves */}
      <section
        style={{
          background: "var(--gs-bg2)",
          borderTop: "1px solid var(--gs-border)",
          borderBottom: "1px solid var(--gs-border)",
          padding: "3.5rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "0.75rem",
            }}
          >
            Oferta especial entre semana
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "2rem",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "0.75rem",
            }}
          >
            15% de descuento los miércoles y jueves
          </p>
          <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            La misma experiencia completa. El mismo menú. El mismo misterio.
          </p>
          <Link
            href="/"
            style={{
              background: "var(--gs-gold)",
              color: "#0A0A0A",
              padding: "0.9rem 2.5rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Ver disponibilidad
          </Link>
        </div>
      </section>

      {/* Lo que incluye */}
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
          Todo incluido
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
          La experiencia completa
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              title: "Menú 7 actos",
              desc: "Cóctel, mesa del chef, 3 platos, 2 postres y petit fours",
            },
            {
              title: "Maridaje completo",
              desc: "Vinos, cava, licor y gin-tonic premium incluidos",
            },
            {
              title: "Experiencia de misterio",
              desc: "4 mensajes previos con pistas sobre la ubicación",
            },
            {
              title: "Ubicación secreta",
              desc: "Cada sesión puede ser en un espacio diferente de Barcelona",
            },
            {
              title: "Duración 3 horas",
              desc: "Sesiones 13:00–16:00 y 20:00–23:00",
            },
            {
              title: "Grupo íntimo",
              desc: "Número limitado de comensales para una experiencia exclusiva",
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
              <div
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "var(--gs-gold)",
                  marginBottom: "1rem",
                }}
              />
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

      {/* Links internos para SEO */}
      <section
        style={{
          background: "var(--gs-bg2)",
          padding: "4rem 2rem",
          borderTop: "1px solid var(--gs-border)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.8rem",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "1rem",
            }}
          >
            Más información
          </h2>
          <div
            style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            {[
              { label: "Ver el Menú completo", href: "/menu-degustacion" },
              { label: "Regalar la experiencia", href: "/regalo" },
              { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
              { label: "Grupos y eventos", href: "/grupos" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{
                  color: "var(--gs-gold)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  borderBottom: "1px solid var(--gs-border)",
                  paddingBottom: "0.25rem",
                  transition: "border-color 0.2s",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>


    </PageLayout>
  );
}
