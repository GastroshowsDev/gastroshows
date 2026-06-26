import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, menuSchema, faqSchema } from "@/components/seo/JsonLd";
import { AeoAnswer } from "@/components/seo/AeoAnswer";

const faqs = [
  { question: "¿Puedo ver el menú con antelación?", answer: "El menú es una sorpresa que se revela en el momento. Esto permite que el chef sorprenda a los comensales con creatividad." },
  { question: "¿Qué pasa si soy vegetariano/vegano?", answer: "Adaptamos completamente el menú a tus necesidades dietéticas sin comprometer la calidad. Especifica al reservar." },
  { question: "¿El precio incluye bebidas?", answer: "Sí, el maridaje está completamente incluido: vinos, cava, cócteles y gin-tonic premium." },
  { question: "¿Hay opciones de maridaje sin alcohol?", answer: "Claro. Ofrecemos maridaje con jugos premium, infusiones y bebidas sin alcohol de igual calibre." },
  { question: "¿Se pueden hacer fotos?", answer: "Las fotografías son bienvenidas para tu recuerdo. Hacemos fotos de grupo que enviamos después." },
];
import { ReservarButton } from "@/components/ReservarButton";

export const metadata: Metadata = {
  title: "Menú Degustación Barcelona · 7 Actos Gastronómicos + Maridaje Premium",
  description:
    "Menú degustación de 7 actos culinarios en Barcelona: experiencia exclusiva con chef, maridaje de vinos premium, cava y gin-tonic artesanal. 145€ por persona, 3 horas inolvidables.",
  keywords:
    "menú degustación barcelona, tasting menu barcelona, menu degustacion españa, experiencia gastronomica barcelona, restaurante menu degustacion, maridaje vinos barcelona, chef barcelona",
  alternates: {
    canonical: "https://gastroshows.es/menu-degustacion",
    languages: {
      es: "https://gastroshows.es/menu-degustacion",
      ca: "https://gastroshows.es/ca/menu-degustacion",
      en: "https://gastroshows.es/en/tasting-menu",
      "x-default": "https://gastroshows.es/menu-degustacion",
    },
  },
  openGraph: {
    title: "Menú Degustación Barcelona · 7 Actos Exclusivos",
    description: "Experiencia culinaria de 7 actos con maridaje premium, chef experimentado y ambiente sofisticado.",
    type: "website",
    images: [{ url: "/images/web2026-optimizadas/og-menu.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menú Degustación Barcelona",
    description: "7 actos gastronómicos con maridaje premium",
  },
};

const menuAcots = [
  {
    acto: "I",
    titulo: "Bienvenida & Cóctel Artesanal",
    desc: "Recepción con cóctel de maceración propia, elaborado específicamente para esta experiencia. Primer contacto sensorial con la gastronomía premium.",
    vinos: "Cóctel artesanal",
    tiempo: "20 min",
  },
  {
    acto: "II",
    titulo: "Aperitivo: Snacks & Degustaciones",
    desc: "Delicias gourmet seleccionadas: bocados sorprendentes de preparación sofisticada que despiertan el paladar.",
    vinos: "Vino blanco crisp",
    tiempo: "25 min",
  },
  {
    acto: "III",
    titulo: "Entrada: Proteína del Mar",
    desc: "Plato con proteína fresca de temporada, preparada con técnica sofisticada, presentación elegante y sabores innovadores.",
    vinos: "Albariño o Verdejo",
    tiempo: "30 min",
  },
  {
    acto: "IV",
    titulo: "Sorpresa del Chef",
    desc: "Creación única del chef: innovación culinaria, creatividad sin límites y técnicas avanzadas. La sorpresa gastronómica de la noche.",
    vinos: "Vino rosado premium",
    tiempo: "25 min",
  },
  {
    acto: "V",
    titulo: "Plato Principal: Proteína Premium",
    desc: "Proteína seleccionada de máxima calidad, cocinada al perfeccionamiento, con acompañamientos complejos y salsa elaborada.",
    vinos: "Vino tinto de reserva",
    tiempo: "35 min",
  },
  {
    acto: "VI",
    titulo: "Postre: Repostería Artesanal",
    desc: "Creación dulce del chef: técnicas sofisticadas, texturas contrastadas y presentación de galería. Culminación dulce memorab.",
    vinos: "Cava o champagne premium",
    tiempo: "30 min",
  },
  {
    acto: "VII",
    titulo: "Digestivo & Petit Fours",
    desc: "Finalización elegante con petit fours artesanales, gin-tonic con maceración propia del chef y despedida memorab.",
    vinos: "Gin-tonic de maceración",
    tiempo: "20 min",
  },
];

export default function MenuDegustacion() {
  const menuSchemaData = menuSchema({
    name: "Menú Degustación GastroShows",
    description: "Menú de 7 actos gastronómicos con maridaje premium",
  });

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", url: "https://gastroshows.es" },
        { name: "Menú Degustación", url: "https://gastroshows.es/menu-degustacion" },
      ])} />
      <JsonLd data={menuSchemaData} />
      <JsonLd data={faqSchema(faqs)} />

      <main>
        {/* HERO: Impacto visual */}
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
              🍽️ 7 Actos Gastronómicos Únicos
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(3.5rem, 10vw, 5.5rem)",
                fontWeight: 300,
                color: "var(--gs-text)",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Menú Degustación
              <br />
              <span style={{ color: "var(--gs-gold)" }}>Barcelona</span>
            </h1>
            <p
              style={{
                fontSize: "1.15rem",
                color: "rgba(245,240,232,0.8)",
                maxWidth: "620px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.8,
              }}
            >
              Experiencia culinaria de 3-4 horas: 7 actos de maridaje premium, chef experimentado,
              ambiente sofisticado, menú único cada mes. 145€ por persona.
            </p>
            <ReservarButton label="Reservar Menú Ahora" />
          </div>
        </section>

        {/* QUÉ ES TASTING MENU: Contextualización SEO */}
        <section style={{ padding: "clamp(6rem, 10vw, 8rem) 2rem", maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            ¿Qué es un Menú Degustación?
          </h2>
          <p style={{ textAlign: "center", marginBottom: "2rem", color: "rgba(218,165,32,0.6)", fontSize: "0.9rem" }}>
            <Link href="/cena-clandestina" style={{ color: "var(--gs-gold)", textDecoration: "underline" }}>
              Vive esta experiencia en nuestra cena clandestina →
            </Link>
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--gs-muted)",
              lineHeight: 1.8,
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Un menú degustación es una experiencia culinaria diseñada por el chef donde cada plato
            es una pequeña obra maestra. No se trata solo de comer, sino de vivir un viaje gastronómico
            con múltiples sabores, texturas y técnicas culinarias sofisticadas.
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
                titulo: "Experiencia Completa",
                desc: "Cada acto está pensado para complementar el anterior, creando una narrativa gastronómica coherente.",
              },
              {
                titulo: "Tamaños Controlados",
                desc: "Porciones precisas que permiten degustar múltiples platos sin saciarse. Enfoque en calidad sobre cantidad.",
              },
              {
                titulo: "Maridaje Premium",
                desc: "Bebidas seleccionadas específicamente para cada acto, elevando la experiencia sensorial.",
              },
              {
                titulo: "Originalidad del Chef",
                desc: "El menú es único cada mes. El chef experimenta con ingredientes de temporada e innovación constante.",
              },
            ].map((item) => (
              <div
                key={item.titulo}
                style={{
                  padding: "1.8rem",
                  background: "rgba(218,165,32,0.05)",
                  borderLeft: "3px solid var(--gs-gold)",
                  borderRadius: "2px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.2rem",
                    color: "var(--gs-text)",
                    marginBottom: "0.8rem",
                  }}
                >
                  {item.titulo}
                </h3>
                <p style={{ color: "var(--gs-muted)", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* LOS 7 ACTOS: Détail exhaustif */}
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
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: "var(--gs-text)",
                textAlign: "center",
                marginBottom: "3.5rem",
              }}
            >
              Siete Actos Gastronómicos Inolvidables
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {menuAcots.map((acto) => (
                <div
                  key={acto.acto}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1.2fr",
                    gap: "2.5rem",
                    padding: "2rem",
                    background: "rgba(218,165,32,0.03)",
                    borderLeft: "4px solid var(--gs-gold)",
                    borderRadius: "2px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "4rem",
                        color: "var(--gs-gold)",
                        marginBottom: "0.5rem",
                        lineHeight: 1,
                      }}
                    >
                      {acto.acto}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.5rem",
                        color: "var(--gs-text)",
                        marginBottom: "1rem",
                        fontWeight: 400,
                      }}
                    >
                      {acto.titulo}
                    </h3>
                    <p style={{ color: "rgba(245,240,232,0.8)", lineHeight: 1.7, marginBottom: "1rem" }}>
                      {acto.desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        fontSize: "0.9rem",
                        color: "var(--gs-muted)",
                      }}
                    >
                      <span>⏱️ {acto.tiempo}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(218,165,32,0.12)",
                      padding: "2rem",
                      borderRadius: "4px",
                      textAlign: "center",
                      border: "1px solid rgba(218,165,32,0.25)",
                    }}
                  >
                    <p style={{ color: "var(--gs-gold)", fontSize: "0.75rem", letterSpacing: "0.15em", marginBottom: "1rem", fontWeight: 700 }}>
                      MARIDAJE RECOMENDADO
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.3rem",
                        color: "var(--gs-text)",
                        fontWeight: 400,
                      }}
                    >
                      {acto.vinos}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFORMACIÓN PRÁCTICA: Detalles logísticos */}
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
            Información Práctica
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              { label: "Duración total", valor: "3-4 horas", icon: "⏱️" },
              { label: "Capacidad máxima", valor: "12 personas", icon: "👥" },
              { label: "Precio por persona", valor: "145€", icon: "💰" },
              { label: "Ubicación", valor: "Secreta en Barcelona", icon: "📍" },
              { label: "Alergias e intolerancias", valor: "Especificar al reservar", icon: "⚠️" },
              { label: "Aviso de reserva", valor: "48 horas recomendado", icon: "📅" },
              { label: "Edad mínima", valor: "18 años +", icon: "🔞" },
              { label: "Código de vestuario", valor: "Smart casual recomendado", icon: "👔" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "2rem",
                  background: "rgba(218,165,32,0.05)",
                  borderLeft: "3px solid var(--gs-gold)",
                  borderRadius: "2px",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{item.icon}</div>
                <p style={{ color: "var(--gs-gold)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 700 }}>
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.2rem",
                    color: "var(--gs-text)",
                  }}
                >
                  {item.valor}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* AEO: respuesta directa para motores de IA */}
        <AeoAnswer
          eyebrow="Qué es"
          question="¿Qué es un menú degustación en Barcelona?"
          answer="Un menú degustación es una secuencia de varios platos pequeños diseñada por el chef para mostrar su creatividad y los mejores ingredientes de temporada. En GastroShows consta de 7 actos gastronómicos con maridaje completo incluido (vinos, cava, cócteles y gin-tonic premium), servidos en una experiencia única en Barcelona."
          rows={[
            { label: "Actos", value: "7 actos gastronómicos" },
            { label: "Maridaje", value: "Incluido: vinos, cava, cócteles y gin-tonic premium" },
            { label: "Sin alcohol", value: "Maridaje alternativo con zumos premium e infusiones" },
            { label: "Dietas", value: "Adaptable a vegetariano, vegano y alergias" },
            { label: "Ciudad", value: "Barcelona" },
          ]}
        />

        {/* FAQ: Preguntas comunes */}
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
            Preguntas Frecuentes sobre el Menú
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              {
                q: "¿Puedo ver el menú con antelación?",
                a: "El menú es una sorpresa que se revela en el momento. Esto permite que el chef sorprenda a los comensales con creatividad.",
              },
              {
                q: "¿Qué pasa si soy vegetariano/vegano?",
                a: "Adaptamos completamente el menú a tus necesidades dietéticas sin comprometer la calidad. Especifica al reservar.",
              },
              {
                q: "¿El precio incluye bebidas?",
                a: "Sí, el maridaje está completamente incluido: vinos, cava, cócteles y gin-tonic premium.",
              },
              {
                q: "¿Hay opciones de maridaje sin alcohol?",
                a: "Claro. Ofrecemos maridaje con jugos premium, infusiones y bebidas sin alcohol de igual calibre.",
              },
              {
                q: "¿Se pueden hacer fotos?",
                a: "Las fotografías son bienvenidas para tu recuerdo. Hacemos fotos de grupo que enviamos después.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1.8rem",
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
            ¿Listo para vivir la experiencia?
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
            Reserva tu menú degustación y prepárate para un viaje culinario inolvidable.
            Plazas limitadas a 12 personas por experiencia.
          </p>
          <ReservarButton label="Reservar Menú Ahora" />
          <p
            style={{
              marginTop: "2rem",
              fontSize: "0.85rem",
              color: "rgba(218,165,32,0.7)",
              letterSpacing: "0.05em",
            }}
          >
            <Link href="/blog" style={{ color: "var(--gs-gold)", textDecoration: "underline" }}>
              Aprende más sobre gastronomía en nuestro blog →
            </Link>
          </p>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.9rem",
              color: "var(--gs-muted)",
              letterSpacing: "0.05em",
            }}
          >
            ✓ Confirmación inmediata · ✓ Chef experimentado · ✓ Ambiente sofisticado
          </p>
        </section>
      </main>
    </PageLayout>
  );
}
