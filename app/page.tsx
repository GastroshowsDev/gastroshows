import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, restaurantSchema, breadcrumbSchema, eventSchema, faqSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "GastroShows Barcelona · Cena Clandestina Experiencia Gastronómica Única 2025",
  description: "Cena clandestina en Barcelona: ubicación secreta, 4 actos, menú degustación, maridaje premium (7 bebidas), gin-tonic artesanal, 3h experiencia. Máximo 12 personas. Reserva ahora.",
  keywords: "cena clandestina barcelona, menu degustacion barcelona, restaurante secreto, experiencia gastronomica, sopar clandesti barcelona, tasting menu barcelona, cena privada barcelona, chef barcelona",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://gastroshows.es",
    siteName: "GastroShows",
    title: "Cena Clandestina Barcelona · Menú Degustación Exclusivo",
    description: "Ubicación secreta, 4 actos, maridaje premium. Experiencia que comienza antes de llegar.",
    images: [{ url: "https://images.unsplash.com/photo-1517315177153-612f65b43bd5?w=1200&h=630", width: 1200, height: 630, alt: "Cena clandestina" }],
  },
};

async function getReservationData() {
  return {
    price: 145,
    maxPeople: 12,
    duration: "3 horas",
    sessions: ["13:00-16:00", "20:00-23:00"],
  };
}

export default async function Home() {
  const reservation = await getReservationData();

  const faqs = [
    { question: "¿Dónde está la ubicación secreta?", answer: "Es un misterio hasta 2h antes. Recibirás 4 mensajes con pistas: 7 días, 3 días, 1 día, y 2 horas antes del evento." },
    { question: "¿Qué incluye exactamente?", answer: "Todo: 4 actos gastronómicos, maridaje completo (7 bebidas premium), petit fours, gin-tonic artesanal. Nada que pagar extra." },
    { question: "¿Puedo ir con amigos o pareja?", answer: "Claro. Máximo 12 personas/sesión. Reserva todas las plazas juntas e id como grupo." },
    { question: "¿Tienen opciones vegetarianas?", answer: "100%. Alergias, dietas especiales, preferencias: avísanos al reservar y el chef adapta el menú." },
    { question: "¿Cuánto tiempo es en total?", answer: "Exactamente 3 horas sin prisa. Sesiones mediodía (13-16h) o noche (20-23h)." },
    { question: "¿Puedo cancelar?", answer: "Sí, gratis hasta 7 días antes. 3-7 días: 50% cargo. <3 días: sin reembolso (vale como crédito)." },
    { question: "¿Vale para regalar?", answer: "Perfecto para regalar. Bonos disponibles. La sorpresa empieza en el primer email que recibe el afortunado." },
    { question: "¿Cómo es el ambiente?", answer: "Íntimo, sofisticado, lúdico. Max 12 personas, chef presente, conversación facilitada, sorpresas diseñadas." },
  ];

  return (
    <PageLayout>
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "GastroShows", url: "https://gastroshows.es" }])} />
      <JsonLd data={eventSchema({ name: "Cena Clandestina GastroShows", description: "Experiencia única", price: 145 })} />
      <JsonLd data={faqSchema(faqs)} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO: Full-screen impact */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "calc(100vh - 120px)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1517315177153-612f65b43bd5?w=1920&h=1080&fit=crop"
          alt="Cena elegante en Barcelona - experiencia gastronómica"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0.7) 100%)" }} />

        <div style={{ position: "relative", textAlign: "center", maxWidth: "900px", padding: "0 2rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "2rem", fontWeight: 700, marginTop: "0" }}>
            🎭 Una Aventura Culinaria Diferente
          </p>

          <h1 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(4rem, 12vw, 6.5rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          }}>
            Cena<br /><span style={{ color: "var(--gs-gold)" }}>Clandestina</span><br />Barcelona
          </h1>

          <p style={{
            fontSize: "1.2rem",
            color: "rgba(245,240,232,0.85)",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.9,
            textShadow: "0 2px 10px rgba(0,0,0,0.6)",
          }}>
            Ubicación secreta. 4 actos gastronómicos. Maridaje premium. Una experiencia que comienza antes de que llegues.
          </p>

          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <Link href="/cena-clandestina" style={{
              background: "var(--gs-gold)",
              color: "#0A0A0A",
              padding: "1.2rem 4rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: "0 8px 32px rgba(218,165,32,0.3)",
              transition: "all 0.3s ease",
            }}
>
              📅 Reservar Experiencia
            </Link>

            <Link href="/regalo" style={{
              border: "2px solid var(--gs-gold)",
              background: "transparent",
              color: "var(--gs-gold)",
              padding: "1rem 3.5rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.3s ease",
            }}
>
              🎁 Regalar Experiencia
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            {[
              { num: "145€", label: "Por persona" },
              { num: "3h", label: "Experiencia" },
              { num: "12", label: "Max. personas" },
              { num: "7", label: "Bebidas incluidas" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.8rem", color: "var(--gs-gold)", marginBottom: "0.5rem", fontWeight: 300 }}>
                  {stat.num}
                </div>
                <p style={{ color: "rgba(245,240,232,0.6)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* VALUE PROP: ¿Por qué es diferente? */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(6rem, 10vw, 9rem) 2rem", background: "var(--gs-bg)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gs-gold)", textAlign: "center", marginBottom: "2rem", fontWeight: 700 }}>
            ¿POR QUÉ ELEGIR GASTROSHOWS?
          </p>

          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            textAlign: "center",
            marginBottom: "4.5rem",
            lineHeight: 1.25,
          }}>
            Más que una cena.<br /><span style={{ color: "var(--gs-gold)" }}>Una aventura culinaria.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
            {[
              {
                icon: "🗺️",
                title: "Ubicación Misteriosa",
                desc: "Recibes 4 mensajes con pistas enigmáticas. Solo horas antes del evento, descubres la dirección exacta. La experiencia comienza en tu buzón.",
              },
              {
                icon: "👨‍🍳",
                title: "Chef Experimentado",
                desc: "Cocina creativa con técnica sofisticada. Ingredientes de proximidad, presentación artística. Cada plato es una creación pensada para sorprender.",
              },
              {
                icon: "🍷",
                title: "Maridaje Premium",
                desc: "Gin-tonic artesanal con maceración propia, vinos selectos, cava de calidad. 7 bebidas incluidas que acompañan cada acto.",
              },
              {
                icon: "🎭",
                title: "Experiencia Memorable",
                desc: "4 actos de 3 horas. Conversación facilitada, sorpresas diseñadas, momentos irrepetibles. Máximo 12 personas para intimidad.",
              },
              {
                icon: "✨",
                title: "Ambiente Sofisticado",
                desc: "Decoración cuidada, candelabros, música seleccionada. Cada detalle piensa en crear la atmósfera perfecta para la aventura.",
              },
              {
                icon: "🎯",
                title: "Enfoque en Conversación",
                desc: "El chef y equipo conocen técnicas de facilitación. La cena es un pretexto para que te relaciones con tu grupo de comensales.",
              },
            ].map((item) => (
              <div key={item.title} style={{
                padding: "2.5rem",
                borderLeft: "4px solid var(--gs-gold)",
                background: "rgba(218,165,32,0.03)",
                transition: "all 0.3s ease",
              }}
>
                <div style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>{item.icon}</div>
                <h3 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.35rem",
                  fontWeight: 400,
                  color: "#F5F0E8",
                  marginBottom: "1rem",
                }}>
                  {item.title}
                </h3>
                <p style={{ color: "rgba(245,240,232,0.75)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 4 ACTOS: Lo que reciben */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(6rem, 10vw, 9rem) 2rem", background: "var(--gs-bg2)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gs-gold)", textAlign: "center", marginBottom: "2rem" }}>
            LA EXPERIENCIA
          </p>

          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            textAlign: "center",
            marginBottom: "4.5rem",
          }}>
            Cuatro Actos Gastronómicos
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
            {[
              {
                acto: "I",
                titulo: "Bienvenida & Cóctel",
                items: ["Cóctel artesanal de maceración propia", "Snacks premium sorprendentes", "Presentación del chef y equipo"],
                beverage: "Cóctel de autor",
              },
              {
                acto: "II",
                titulo: "Entrada: Degustación Mar",
                items: ["Proteína fresca del día", "Técnica sofisticada de preparación", "Acompañamientos vegetales de temporada"],
                beverage: "Vino blanco Penedès",
              },
              {
                acto: "III",
                titulo: "Plato Principal: Tierra",
                items: ["Carne ibérica o proteína premium", "Técnica clásica + toque innovador", "Guarniciones que cuentan historia"],
                beverage: "Vino tinto Priorat",
              },
              {
                acto: "IV",
                titulo: "Postre & Cierre",
                items: ["Repostería artesanal del chef", "Petit fours elaborados en el momento", "Gin-tonic artesanal al cierre"],
                beverage: "Cava + Gin premium",
              },
            ].map((acto) => (
              <div key={acto.acto} style={{
                padding: "2.5rem",
                borderRadius: "8px",
                background: "rgba(218,165,32,0.05)",
                borderTop: "3px solid var(--gs-gold)",
              }}>
                <div style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "3.5rem",
                  fontWeight: 300,
                  color: "var(--gs-gold)",
                  marginBottom: "0.75rem",
                }}>
                  {acto.acto}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.35rem",
                  fontWeight: 400,
                  color: "#F5F0E8",
                  marginBottom: "1.5rem",
                }}>
                  {acto.titulo}
                </h3>
                <ul style={{ listStyle: "none", padding: "0 0 1.5rem 0", margin: 0, borderBottom: "1px solid rgba(218,165,32,0.2)", paddingBottom: "1.5rem" }}>
                  {acto.items.map((item) => (
                    <li key={item} style={{ color: "rgba(245,240,232,0.7)", fontSize: "0.9rem", marginBottom: "0.7rem" }}>
                      ✓ {item}
                    </li>
                  ))}
                </ul>
                <div style={{ paddingTop: "1.5rem" }}>
                  <p style={{ color: "var(--gs-gold)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 700 }}>
                    🍷 MARIDAJE
                  </p>
                  <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.1rem", color: "#F5F0E8", margin: 0 }}>
                    {acto.beverage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CÓMO FUNCIONA: El proceso */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(6rem, 10vw, 9rem) 2rem", background: "var(--gs-bg)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            textAlign: "center",
            marginBottom: "4.5rem",
          }}>
            Cómo Funciona
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2.5rem" }}>
            {[
              {
                paso: "01",
                titulo: "Reserva tu Fecha",
                desc: "Elige tu fecha preferida (sesión mediodía 13-16h o noche 20-23h) y número de personas. Confirmación inmediata.",
              },
              {
                paso: "02",
                titulo: "Recibe Pistas",
                desc: "Primeri email 7 días antes con primera pista enigmática. Luego más pistas van llegando: 3 días, 1 día, 2 horas.",
              },
              {
                paso: "03",
                titulo: "Descubre el Lugar",
                desc: "Horas antes, recibe la dirección exacta con indicaciones de acceso, estacionamiento y punto de encuentro.",
              },
              {
                paso: "04",
                titulo: "Vive la Experiencia",
                desc: "Llega a la hora exacta. 3 horas de aventura culinaria con chef, equipo y comensales seleccionados.",
              },
            ].map((paso) => (
              <div key={paso.paso} style={{ textAlign: "center" }}>
                <div style={{
                  width: "70px",
                  height: "70px",
                  margin: "0 auto 1.5rem",
                  borderRadius: "50%",
                  background: "var(--gs-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#0A0A0A",
                }}>
                  {paso.paso}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  color: "#F5F0E8",
                  marginBottom: "0.8rem",
                }}>
                  {paso.titulo}
                </h3>
                <p style={{ color: "rgba(245,240,232,0.7)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TESTIMONIOS: Social proof */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(6rem, 10vw, 9rem) 2rem", background: "var(--gs-bg2)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gs-gold)", textAlign: "center", marginBottom: "2rem" }}>
            LO QUE DICEN NUESTROS COMENSALES
          </p>

          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            textAlign: "center",
            marginBottom: "4.5rem",
          }}>
            Experiencias Irrepetibles
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
            {[
              {
                testimonial: "Fue increíble. La sorpresa de no saber dónde ir, los mensajes misteriosos, la comida... Todo perfecto. Mi pareja lloró de la emoción.",
                author: "María & Juan",
                relation: "Pareja - 10 años juntos",
              },
              {
                testimonial: "Como chef, analizo cada detalle. La técnica está ahí, pero lo que realmente brilla es la narrativa. Cada plato cuenta una historia.",
                author: "Carlos",
                relation: "Chef profesional",
              },
              {
                testimonial: "Es lo mejor que hemos hecho en Barcelona. Los amigos aún hablan de la cena. ¿Cuándo volvemos?",
                author: "Grupo de 8 amigos",
                relation: "Despedida de soltero/a",
              },
              {
                testimonial: "Regalé la experiencia para aniversario. Fue exacto a lo que buscaba. Misterio, buen comer, ambiente íntimo.",
                author: "Roberto",
                relation: "Aniversario de bodas",
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "2.5rem",
                borderLeft: "4px solid var(--gs-gold)",
                background: "rgba(218,165,32,0.03)",
              }}>
                <p style={{ color: "rgba(245,240,232,0.8)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1.5rem", fontStyle: "italic" }}>
                  "{item.testimonial}"
                </p>
                <p style={{ color: "var(--gs-gold)", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  — {item.author}
                </p>
                <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.85rem" }}>
                  {item.relation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FAQ: Objeciones */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(6rem, 10vw, 9rem) 2rem", background: "var(--gs-bg)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            textAlign: "center",
            marginBottom: "4.5rem",
          }}>
            Preguntas Frecuentes
          </h2>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            {faqs.map((item, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid rgba(218,165,32,0.15)" : "none", paddingBottom: i < faqs.length - 1 ? "2.5rem" : "0" }}>
                <h3 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  color: "var(--gs-gold)",
                  marginBottom: "0.75rem",
                }}>
                  {item.question}
                </h3>
                <p style={{ color: "rgba(245,240,232,0.75)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CTA FINAL: Conversión */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: "clamp(6rem, 10vw, 9rem) 2rem",
        background: "linear-gradient(135deg, rgba(218,165,32,0.12) 0%, rgba(218,165,32,0.04) 100%)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1.5rem", fontWeight: 700 }}>
            ✨ EL MOMENTO ES AHORA
          </p>

          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
          }}>
            ¿Listo para la Aventura?
          </h2>

          <p style={{
            color: "rgba(245,240,232,0.75)",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            marginBottom: "3rem",
          }}>
            Las mejores experiencias son las que nunca olvidas. Esta es una de ellas.
          </p>

          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/cena-clandestina" style={{
              background: "var(--gs-gold)",
              color: "#0A0A0A",
              padding: "1.2rem 4rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}>
              Reservar Ahora
            </Link>

            <Link href="/preguntas-frecuentes" style={{
              border: "2px solid var(--gs-gold)",
              color: "var(--gs-gold)",
              padding: "1rem 2.5rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}>
              Más Preguntas
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
