import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import { AeoAnswer } from "@/components/seo/AeoAnswer";

const faqs = [
  { question: "¿Cómo se asignan las estrellas Michelin?", answer: "Inspectores anónimos de Michelin visitan los restaurantes y evalúan la calidad de los ingredientes, el dominio de las técnicas, la armonía de los sabores, la personalidad del chef en la cocina, la constancia y la relación calidad-precio. Es un proceso riguroso y secreto." },
  { question: "¿Cuándo sale la nueva Guía Michelin Barcelona?", answer: "Generalmente en noviembre, la Guía Michelin para Barcelona y regiones se actualiza anualmente. El proceso de selección dura todo el año." },
  { question: "¿Cuáles son los restaurantes Michelin más antiguos de Barcelona?", answer: "Algunos restaurantes tienen estrellas Michelin desde hace décadas. Cinc Sentits y otros son instituciones en la gastronomía barcelonesa." },
  { question: "¿Es obligatorio ir en grupo a un restaurante Michelin?", answer: "No. Aunque muchos prefieren compartir la experiencia, es común comer solo en restaurantes Michelin. Algunos ofrecen barra donde comer en solitario es habitual." },
];
import { ReservarButton } from "@/components/ReservarButton";

export const metadata: Metadata = {
  title: "Restaurantes Michelin Barcelona · Guía Estrella Michelin 2024-2025",
  description:
    "Guía completa de restaurantes con estrella Michelin en Barcelona. Descubre dónde comer, precios, especialidades culinarias y cómo reservar en los mejores restaurantes de Barcelona.",
  keywords:
    "restaurantes estrella michelin barcelona, michelin barcelona, donde comer barcelona, restaurante michelin barcelona precio, mejores restaurantes barcelona michelin, guia michelin barcelona",
  alternates: { canonical: "https://gastroshows.es/restaurantes-michelin" },
  openGraph: {
    title: "Restaurantes Michelin Barcelona · Guía Completa",
    description: "Los mejores restaurantes con estrella Michelin en Barcelona. Precios, especialidades y cómo reservar.",
    type: "website",
    images: [{ url: "https://gastroshows.es/og-michelin.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurantes Michelin Barcelona",
    description: "Guía de restaurantes con estrella Michelin en Barcelona 2024-2025",
  },
};

export default function RestaurantesMichelin() {
  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", url: "https://gastroshows.es" },
        { name: "Restaurantes Michelin", url: "https://gastroshows.es/restaurantes-michelin" },
      ])} />
      <JsonLd data={faqSchema(faqs)} />

      <main>
        {/* HERO */}
        <section
          style={{
            background: "linear-gradient(135deg, #050505 0%, #1a1a1a 100%)",
            padding: "clamp(8rem, 15vw, 12rem) 2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(218,165,32,0.09) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
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
              ⭐ Excelencia Culinaria
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(3.5rem, 10vw, 5rem)",
                fontWeight: 300,
                color: "var(--gs-text)",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Restaurantes
              <br />
              <span style={{ color: "var(--gs-gold)" }}>Michelin Barcelona</span>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(245,240,232,0.8)",
                maxWidth: "620px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.8,
              }}
            >
              Guía completa de restaurantes con estrella Michelin en Barcelona.
              Descubre dónde comer, especialidades culinarias y cómo reservar.
            </p>
            <ReservarButton label="Descubre Más Experiencias" />
          </div>
        </section>

        {/* QUÉ ES MICHELIN */}
        <section style={{ padding: "clamp(6rem, 10vw, 8rem) 2rem", maxWidth: "950px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            ¿Qué significa una Estrella Michelin?
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--gs-muted)",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
              textAlign: "center",
              maxWidth: "700px",
              margin: "0 auto 2.5rem",
            }}
          >
            La Guía Michelin es el referente mundial en excelencia gastronómica. Una estrella Michelin significa que el restaurante
            ha alcanzado un nivel de maestría culinaria reconocido internacionalmente.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                stars: "⭐",
                titulo: "Una Estrella",
                desc: "Cocina de calidad excepcional, merece una parada en el camino. Buena cooking con productos frescos.",
              },
              {
                stars: "⭐⭐",
                titulo: "Dos Estrellas",
                desc: "Excepcional, merece un desvío. Técnica sofisticada, creatividad demostrada y consistencia.",
              },
              {
                stars: "⭐⭐⭐",
                titulo: "Tres Estrellas",
                desc: "Vale la pena el viaje. Cocina de excepcionalidad absoluta, artística, única y memorable.",
              },
            ].map((item) => (
              <div
                key={item.titulo}
                style={{
                  padding: "2rem",
                  background: "rgba(218,165,32,0.05)",
                  borderLeft: "3px solid var(--gs-gold)",
                  borderRadius: "2px",
                }}
              >
                <p style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>{item.stars}</p>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.3rem",
                    color: "var(--gs-text)",
                    marginBottom: "0.8rem",
                  }}
                >
                  {item.titulo}
                </h3>
                <p style={{ color: "var(--gs-muted)", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RESTAURANTES DESTACADOS */}
        <section
          style={{
            background: "var(--gs-bg2)",
            borderTop: "1px solid var(--gs-border)",
            borderBottom: "1px solid var(--gs-border)",
            padding: "clamp(6rem, 10vw, 8rem) 2rem",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "var(--gs-text)",
                textAlign: "center",
                marginBottom: "3.5rem",
              }}
            >
              Restaurantes Destacados en Barcelona
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {[
                {
                  nombre: "Celler de Can Roca",
                  estrellas: "⭐⭐⭐",
                  especial: "Cocina contemporánea de máxima creatividad",
                  precio: "150-180€",
                  nota: "Líder mundial en innovación culinaria",
                },
                {
                  nombre: "Tickets Bar / Bodega 1900",
                  estrellas: "⭐⭐",
                  especial: "Tapas sofisticadas y técnica avanzada",
                  precio: "60-100€",
                  nota: "Experiencia tapas de lujo",
                },
                {
                  nombre: "Cinc Sentits",
                  estrellas: "⭐⭐",
                  especial: "Cocina de mercado con toques innovadores",
                  precio: "80-110€",
                  nota: "Menú tasting diario",
                },
                {
                  nombre: "Alkimia",
                  estrellas: "⭐",
                  especial: "Cocina tradicional catalana reinventada",
                  precio: "70-90€",
                  nota: "Raíces catalanas modernas",
                },
              ].map((rest, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "2rem",
                    background: "rgba(218,165,32,0.03)",
                    borderLeft: "4px solid var(--gs-gold)",
                    borderRadius: "2px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2rem",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                      {rest.estrellas}
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.5rem",
                        color: "var(--gs-text)",
                        marginBottom: "1rem",
                        fontWeight: 400,
                      }}
                    >
                      {rest.nombre}
                    </h3>
                    <p style={{ color: "rgba(245,240,232,0.8)", lineHeight: 1.7, marginBottom: "1rem" }}>
                      {rest.especial}
                    </p>
                    <p style={{ color: "var(--gs-gold)", fontSize: "0.9rem" }}>
                      💡 {rest.nota}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "rgba(218,165,32,0.1)",
                      padding: "2rem",
                      borderRadius: "4px",
                      textAlign: "center",
                      border: "1px solid rgba(218,165,32,0.25)",
                    }}
                  >
                    <p style={{ color: "var(--gs-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>
                      Precio menú aprox.
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.4rem",
                        color: "var(--gs-text)",
                        fontWeight: 400,
                      }}
                    >
                      {rest.precio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONSEJOS PARA RESERVAR */}
        <section style={{ padding: "clamp(6rem, 10vw, 8rem) 2rem", maxWidth: "1000px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "3rem",
              textAlign: "center",
            }}
          >
            Cómo Reservar en Restaurantes Michelin
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {[
              {
                paso: "1",
                titulo: "Planifica con anticipación",
                desc: "Los mejores restaurantes se reservan con 2-3 meses de anticipación. Algunos aceptan reservas hasta 6 meses antes.",
              },
              {
                paso: "2",
                titulo: "Conoce el horario",
                desc: "Los restaurantes Michelin tienen horarios limitados (normalmente 12-14h y 19-23h). Algunos cierran ciertos días.",
              },
              {
                paso: "3",
                titulo: "Elige tu experiencia",
                desc: "Decide entre menú degustación, menú ejecutivo o menú à la carte. La degustación es la recomendada.",
              },
              {
                paso: "4",
                titulo: "Especifica tus preferencias",
                desc: "Indica alergias, intolerancias, preferencias dietéticas al reservar. Estos restaurantes adaptan menús.",
              },
              {
                paso: "5",
                titulo: "Viste apropiadamente",
                desc: "Smart casual mínimo. Muchos requieren chaqueta. Consulta el código de vestuario específico del restaurante.",
              },
              {
                paso: "6",
                titulo: "Llega a tiempo",
                desc: "Puntualidad es esencial. La experiencia está cronometrada. Atraso puede resultar en pérdida de reserva.",
              },
            ].map((item) => (
              <div
                key={item.paso}
                style={{
                  padding: "2rem",
                  background: "rgba(218,165,32,0.05)",
                  borderRadius: "4px",
                  position: "relative",
                  paddingTop: "3rem",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "2rem",
                    width: "35px",
                    height: "35px",
                    background: "var(--gs-gold)",
                    color: "#0A0A0A",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                  }}
                >
                  {item.paso}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.2rem",
                    color: "var(--gs-text)",
                    marginBottom: "0.8rem",
                    fontWeight: 400,
                  }}
                >
                  {item.titulo}
                </h3>
                <p style={{ color: "var(--gs-muted)", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ALTERNATIVA: GastroShows */}
        <section
          style={{
            background: "var(--gs-bg2)",
            borderTop: "1px solid var(--gs-border)",
            borderBottom: "1px solid var(--gs-border)",
            padding: "clamp(6rem, 10vw, 8rem) 2rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
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
              Experiencia Premium Alternativa
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "var(--gs-text)",
                marginBottom: "1.5rem",
              }}
            >
              GastroShows: Experiencia Exclusiva
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--gs-muted)",
                marginBottom: "2.5rem",
                lineHeight: 1.8,
              }}
            >
              Si buscas una experiencia culinaria premium comparable a Michelin pero con misterio y exclusividad,
              la Cena Clandestina de GastroShows ofrece menú degustación de 7 actos, maridaje premium y ubicación secreta.
            </p>
            <ReservarButton label="Descubre Cena Clandestina" />
          </div>
        </section>

        {/* AEO: respuesta directa para motores de IA */}
        <AeoAnswer
          eyebrow="En breve"
          question="¿Cuántos restaurantes con estrella Michelin hay en Barcelona en 2026?"
          answer="Barcelona cuenta en 2026 con cerca de 29 restaurantes con estrella Michelin, que suman alrededor de 42 estrellas en total, incluyendo establecimientos de 1, 2 y 3 estrellas. La ciudad es uno de los grandes referentes europeos de alta cocina, con propuestas que van desde la cocina catalana de vanguardia hasta el menú degustación de autor."
          rows={[
            { label: "Restaurantes", value: "≈ 29 con estrella Michelin" },
            { label: "Estrellas", value: "≈ 42 estrellas en total" },
            { label: "Actualización", value: "La Guía Michelin se publica cada noviembre" },
            { label: "Alternativa", value: "Cena clandestina GastroShows con cocina de nivel" },
          ]}
        />

        {/* Interlinking contextual */}
        <section style={{ padding: "0 2rem 2rem", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(245,240,232,0.6)", fontSize: "0.95rem", lineHeight: 1.8 }}>
            ¿Buscas una alternativa a la alta cocina tradicional? Descubre la{" "}
            <Link href="/cena-clandestina" style={{ color: "var(--gs-gold)", textDecoration: "underline" }}>
              cena clandestina de Barcelona
            </Link>{" "}
            y su{" "}
            <Link href="/menu-degustacion" style={{ color: "var(--gs-gold)", textDecoration: "underline" }}>
              menú degustación de 7 actos
            </Link>
            . También puedes{" "}
            <Link href="/regalo" style={{ color: "var(--gs-gold)", textDecoration: "underline" }}>
              regalar la experiencia
            </Link>{" "}
            o reservar para{" "}
            <Link href="/grupos" style={{ color: "var(--gs-gold)", textDecoration: "underline" }}>
              grupos y eventos privados
            </Link>
            .
          </p>
        </section>

        {/* FAQ */}
        <section style={{ padding: "clamp(6rem, 10vw, 8rem) 2rem", maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "3rem",
              textAlign: "center",
            }}
          >
            Preguntas sobre Michelin
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              {
                q: "¿Cómo se asignan las estrellas Michelin?",
                a: "Inspectores anónimos de Michelin visitan los restaurantes y evalúan: calidad de ingredientes, mastery of flavours, harmonies of flavours, personality of chef en cuisine, consistency, value for money y overall experience. Es un proceso riguroso y secreto.",
              },
              {
                q: "¿Cuándo sale la nueva Guía Michelin Barcelona?",
                a: "Generalmente en noviembre, la Guía Michelin para Barcelona y regiones se actualiza anualmente. El proceso de selección dura todo el año.",
              },
              {
                q: "¿Cuáles son los restaurantes Michelin más antiguos de Barcelona?",
                a: "Alguns restaurants tienen estrellas Michelin desde hace décadas. Eldorado Petit, Cinc Sentits y otros son instituciones en la gastronomía barcelonesa.",
              },
              {
                q: "¿Es obligatorio ir en grupo a Michelin?",
                a: "No. Aunque muchos prefieren compartir la experiencia, es común comer solo en restaurantes Michelin. Algunos ofrecen bar donde comer solo es muy común.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "2rem",
                  background: "rgba(218,165,32,0.05)",
                  borderLeft: "3px solid var(--gs-gold)",
                  borderRadius: "2px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.15rem",
                    color: "var(--gs-text)",
                    marginBottom: "0.8rem",
                  }}
                >
                  {item.q}
                </h3>
                <p style={{ color: "var(--gs-muted)", lineHeight: 1.7 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          style={{
            padding: "clamp(6rem, 10vw, 8rem) 2rem",
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
            Vive la Excelencia Gastronómica
          </h2>
          <p
            style={{
              color: "var(--gs-muted)",
              marginBottom: "2.5rem",
              fontSize: "1.05rem",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
            }}
          >
            Ya sea en un restaurante Michelin o en la Cena Clandestina de GastroShows,
            la gastronomía premium de Barcelona te espera.
          </p>
          <ReservarButton label="Reservar tu Experiencia" />
        </section>
      </main>
    </PageLayout>
  );
}
