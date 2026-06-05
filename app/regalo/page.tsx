import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, productSchema } from "@/components/seo/JsonLd";
import { GiftButton } from "@/components/GiftButton";
import { InteractiveCard } from "@/components/InteractiveCard";
import { OccasionTag } from "@/components/OccasionTag";

export const metadata: Metadata = {
  title: "Regala Cena Clandestina Barcelona · Bono Regalo Experiencia Gastronómica",
  description:
    "Regala la experiencia más exclusiva de Barcelona: cena clandestina con ubicación secreta, menú degustación de 7 actos y maridaje premium. Bono regalo digital con validez 12 meses.",
  keywords:
    "regalar cena barcelona, bono regalo experiencia gastronómica, tarjeta regalo restaurante barcelona, regalo cena para dos, experiencia gastronomica regalo, regalar menu degustacion barcelona",
  alternates: { canonical: "https://gastroshows.es/regalo" },
  openGraph: {
    title: "Regala una Experiencia Gastronómica Única en Barcelona",
    description: "Cena clandestina, ubicación secreta, menú de 7 actos, maridaje premium. El regalo que nadie olvida.",
    type: "website",
    images: [{ url: "/images/web2026-optimizadas/og-regalo.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regala Cena Clandestina Barcelona",
    description: "Bono regalo para vivir la experiencia gastronómica más exclusiva.",
  },
};

export default function Regalo() {
  const giftProduct = productSchema({
    name: "Bono Regalo Cena Clandestina",
    description: "Experiencia gastronómica exclusiva en ubicación secreta con menú degustación y maridaje premium",
    price: 145,
  });

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", url: "https://gastroshows.es" },
        { name: "Regalo", url: "https://gastroshows.es/regalo" },
      ])} />
      <JsonLd data={giftProduct} />

      <main>
        {/* HERO: Impacto máximo */}
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
              inset: 0,
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
              Bono regalo para vivir la cena clandestina más especial de Barcelona.
              Una experiencia que comienza con el primer mensaje misterioso.
            </p>
            <GiftButton label="Comprar Bono Regalo Ahora" style={{ padding: "1.1rem 3.5rem", fontSize: "0.8rem" }} />
          </div>
        </section>

        {/* POR QUÉ REGALAR: Persuasión emocional */}
        <section style={{ padding: "clamp(6rem, 10vw, 8rem) 2rem", maxWidth: "1000px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              textAlign: "center",
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            6 razones para elegir GastroShows
          </p>
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
            ¿Por qué GastroShows es el regalo perfecto?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {[
              {
                icon: "✉️",
                title: "Experiencia desde el primer mensaje",
                desc: "El regalo comienza antes de la cena. La persona recibirá 4 emails misteriosos con pistas criptográficas para descifrar la ubicación secreta.",
              },
              {
                icon: "🎭",
                title: "Completamente diferente a todo",
                desc: "No es una cena convencional. Es una aventura gastronómica con una narrativa mística que crea recuerdos inolvidables.",
              },
              {
                icon: "🍽️",
                title: "Menú de 7 actos + maridaje premium",
                desc: "Experiencia culinaria exhaustiva: cócteles, snacks, platos principales, postres, gin-tonic artesanal de maceración propia.",
              },
              {
                icon: "📅",
                title: "Flexibilidad total en fechas",
                desc: "Validez de 12 meses. La persona elige la fecha que mejor le convenga sin presión de fechas cerradas.",
              },
              {
                icon: "👥",
                title: "Para 2-12 personas",
                desc: "Perfecto para parejas, amigos, familia o pequeños grupos. Cada persona vive la experiencia completa e inmersiva.",
              },
              {
                icon: "🎨",
                title: "Presentación especial y premium",
                desc: "Bono regalo digital con diseño exclusivo, listo para enviar o imprimir. Personalizables para cualquier ocasión.",
              },
            ].map((item) => (
              <InteractiveCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        {/* QUÉ INCLUYE: Detalles concretos */}
        <section
          style={{
            background: "var(--gs-bg2)",
            borderTop: "1px solid var(--gs-border)",
            borderBottom: "1px solid var(--gs-border)",
            padding: "clamp(6rem, 10vw, 8rem) 2rem",
          }}
        >
          <div style={{ maxWidth: "950px", margin: "0 auto" }}>
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
              ¿Qué incluye el bono regalo?
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "2rem",
              }}
            >
              {[
                { label: "Precio por persona", valor: "145€" },
                { label: "Duración", valor: "3-4 horas" },
                { label: "Personas máximo", valor: "12 por experiencia" },
                { label: "Ubicación", valor: "Secreta en Barcelona" },
                { label: "Validez", valor: "12 meses" },
                { label: "Menú", valor: "7 actos gastronómicos" },
                { label: "Maridaje", valor: "Vinos, cava, gin-tonic" },
                { label: "Presentación", valor: "Digital + imprimible" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "1.8rem",
                    background: "rgba(218,165,32,0.05)",
                    borderLeft: "3px solid var(--gs-gold)",
                    borderRadius: "2px",
                  }}
                >
                  <p style={{ color: "var(--gs-gold)", fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "0.8rem", fontWeight: 700 }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", color: "var(--gs-text)" }}>
                    {item.valor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OCASIONES: Casos de uso */}
        <section style={{ padding: "clamp(6rem, 10vw, 8rem) 2rem", maxWidth: "1000px", margin: "0 auto" }}>
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
            Perfecto para cualquier ocasión especial
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              "🎂 Cumpleaños",
              "💍 Aniversario",
              "💕 San Valentín",
              "🎄 Navidad",
              "👰 Despedida de soltero/a",
              "👩 Día de la Madre",
              "👨 Día del Padre",
              "🎓 Graduación",
              "💒 Boda",
              "🎉 Celebración especial",
              "🎁 Sin ocasión especial",
              "✨ Solo porque sí",
            ].map((ocasion) => (
              <OccasionTag key={ocasion} label={ocasion} />
            ))}
          </div>
        </section>

        {/* CÓMO FUNCIONA: Process clarity */}
        <section
          style={{
            background: "var(--gs-bg2)",
            borderTop: "1px solid var(--gs-border)",
            borderBottom: "1px solid var(--gs-border)",
            padding: "clamp(6rem, 10vw, 8rem) 2rem",
          }}
        >
          <div style={{ maxWidth: "950px", margin: "0 auto" }}>
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
              Cómo funciona el regalo
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
                  titulo: "Comprar el bono",
                  desc: "Selecciona la cantidad de personas y completa la compra de forma segura.",
                },
                {
                  paso: "2",
                  titulo: "Recibe el bono digital",
                  desc: "Recibirás un bono con diseño especial que puedes enviar o imprimir al instante.",
                },
                {
                  paso: "3",
                  titulo: "La persona elige fecha",
                  desc: "Quien lo reciba contacta para elegir la fecha dentro de los 12 meses de validez.",
                },
                {
                  paso: "4",
                  titulo: "Comienza la aventura",
                  desc: "Recibe el primer email misterioso y empieza a descifrar pistas hacia la ubicación secreta.",
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
                      top: "-20px",
                      left: "2rem",
                      width: "40px",
                      height: "40px",
                      background: "var(--gs-gold)",
                      color: "#0A0A0A",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                    }}
                  >
                    {item.paso}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.3rem",
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
          </div>
        </section>

        {/* TESTIMONIOS: Social proof */}
        <section style={{ padding: "clamp(6rem, 10vw, 8rem) 2rem", maxWidth: "1000px", margin: "0 auto" }}>
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
            Testimonios de quien lo regaló
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
                quote: "Mi pareja aún no deja de hablar de la cena. Fue la sorpresa perfecta y el misterio hizo que fuera aún más especial.",
                author: "María",
                relation: "Regaló por aniversario",
              },
              {
                quote: "Lo regalé para el 40 aniversario de mis padres. Fue la experiencia más memorable que hemos compartido en familia.",
                author: "Javier",
                relation: "Regaló para aniversario de padres",
              },
              {
                quote: "La mejor despedida de soltera. Mis amigas y yo quedamos alucinadas con la ubicación secreta y el menú fue una maravilla.",
                author: "Laura",
                relation: "Regaló para despedida de soltera",
              },
              {
                quote: "Un regalo diferente y de calidad. No es dinero tirado, es una inversión en un recuerdo que durará para siempre.",
                author: "Carlos",
                relation: "Regaló para cumpleaños",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                style={{
                  padding: "2rem",
                  border: "1px solid var(--gs-border)",
                  background: "rgba(218,165,32,0.02)",
                  borderRadius: "4px",
                  borderLeft: "3px solid var(--gs-gold)",
                }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--gs-muted)",
                    lineHeight: 1.8,
                    marginBottom: "1.5rem",
                    fontStyle: "italic",
                  }}
                >
                  "{testimonial.quote}"
                </p>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.1rem",
                      color: "var(--gs-text)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {testimonial.author}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "var(--gs-gold)", letterSpacing: "0.05em" }}>
                    {testimonial.relation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL: Urgencia + Conversión */}
        <section style={{ padding: "clamp(6rem, 10vw, 8rem) 2rem", textAlign: "center", background: "var(--gs-bg2)" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "1.5rem",
            }}
          >
            El regalo que nadie olvida
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
            Una experiencia es el mejor regalo. Y esta, además, comienza con el primer email misterioso.
            <br />
            <span style={{ color: "var(--gs-gold)", fontWeight: 600 }}>Entrégalo hoy, que lo viva cuando quiera.</span>
          </p>
          <GiftButton label="Comprar Bono Regalo Ahora" style={{ padding: "1.1rem 3.5rem", fontSize: "0.8rem" }} />
          <p
            style={{
              marginTop: "2rem",
              fontSize: "0.9rem",
              color: "var(--gs-muted)",
              letterSpacing: "0.05em",
            }}
          >
            ✓ Pago 100% seguro · ✓ Validez 12 meses · ✓ Cambio si no le gusta
          </p>
        </section>
      </main>
    </PageLayout>
  );
}
