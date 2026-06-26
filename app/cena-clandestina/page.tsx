import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, restaurantSchema, breadcrumbSchema, eventSchema, faqSchema } from "@/components/seo/JsonLd";
import { AeoAnswer } from "@/components/seo/AeoAnswer";
import { ReservarButton } from "@/components/ReservarButton";

const faqs = [
  {
    question: "¿Dónde está la ubicación exacta?",
    answer: "Es un secreto hasta 2 horas antes de la cena. Recibirás 4 mensajes con pistas que te llevarán a descubrir la dirección.",
  },
  {
    question: "¿Puedo llevar a alguien conmigo?",
    answer: "Sí. Debes reservar todas las plazas que necesites juntos. Máximo 12 personas por sesión.",
  },
  {
    question: "¿Qué pasa si tengo alergias?",
    answer: "Comunícalo al reservar. Nuestro chef adaptará los platos sin perder la experiencia clandestina.",
  },
  {
    question: "¿Hay estacionamiento?",
    answer: "La ubicación secreta tiene acceso a estacionamiento. Detalles completos con tu confirmación.",
  },
  {
    question: "¿Cuál es la política de cancelación?",
    answer: "Cancelación gratis hasta 7 días antes. Después, se aplican cargos progresivos.",
  },
];

export const metadata: Metadata = {
  title: "Cena Clandestina Barcelona · Menú Degustación en Ubicación Secreta",
  description:
    "La cena clandestina más exclusiva de Barcelona: ubicación secreta, 4 actos gastronómicos únicos, gin-tonic de maceración propia y petit fours artesanales. Reserva tu experiencia ahora.",
  keywords:
    "cena clandestina barcelona, menú degustación barcelona, restaurante secreto barcelona, experiencia gastronomica barcelona, sopar clandesti barcelona, tasting menu barcelona, gin tonic premium barcelona",
  alternates: {
    canonical: "https://gastroshows.es/cena-clandestina",
    languages: {
      es: "https://gastroshows.es/cena-clandestina",
      ca: "https://gastroshows.es/ca/cena-clandestina",
      en: "https://gastroshows.es/clandestine-dinner-barcelona",
      "x-default": "https://gastroshows.es/cena-clandestina",
    },
  },
};

export default function CenaClandestina() {
  return (
    <PageLayout>
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", url: "https://gastroshows.es" },
        { name: "Cena Clandestina", url: "https://gastroshows.es/cena-clandestina" },
      ])} />
      <JsonLd data={eventSchema({
        name: "Cena Clandestina GastroShows — Ubicación Secreta Barcelona",
        description: "Cena clandestina en ubicación secreta de Barcelona.",
        price: 145,
      })} />
      <JsonLd data={faqSchema(faqs)} />

      {/* ── HERO: impacto + CTA primaria FUERTE ── */}
      <section style={{ position: "relative", minHeight: "calc(100vh - 120px)", overflow: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "2rem" }}>
        <Image
          src="/images/experiencia/ambiente.jpg"
          alt="Sala secreta GastroShows con candelabros dorados"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 40%, rgba(5,5,5,0.85) 100%)",
        }} />
        <div style={{
          position: "relative",
          textAlign: "center", padding: "0 2rem", zIndex: 10,
        }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1.5rem" }}>
            Una experiencia única en Barcelona
          </p>
          <h1 style={{
            fontFamily: "var(--font-cormorant),Georgia,serif",
            fontSize: "clamp(4rem,8vw,6.5rem)",
            fontWeight: 300, color: "#F5F0E8",
            lineHeight: 0.95, marginBottom: "2rem",
          }}>
            Cena<br />
            <em style={{ color: "var(--gs-gold)" }}>Clandestina</em>
          </h1>
          <p style={{ color: "rgba(245,240,232,0.75)", maxWidth: "400px", margin: "0 auto 2.5rem", lineHeight: 1.8, fontSize: "1.05rem" }}>
            Una cena que comienza antes de que llegues.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <ReservarButton label="Reservar ahora" />
            <button style={{
              border: "1px solid rgba(218,165,32,0.5)",
              background: "transparent",
              color: "var(--gs-gold)",
              padding: "0.7rem 2rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}>
              Ver disponibilidad
            </button>
          </div>
          <p style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.75rem", marginTop: "2rem", letterSpacing: "0.1em" }}>
            ⚠ Plazas limitadas • Máximo 12 personas por sesión
          </p>
        </div>
      </section>

      {/* ── VALOR: ¿Por qué es especial? ── */}
      <section style={{ background: "#050505", padding: "6rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-cormorant),Georgia,serif",
            fontSize: "clamp(2rem,4vw,3.2rem)",
            fontWeight: 300, color: "#F5F0E8",
            lineHeight: 1.3, marginBottom: "2rem",
          }}>
            No sabes dónde vas.<br /><span style={{ color: "var(--gs-gold)" }}>Eso es parte del placer.</span>
          </h2>
          <p style={{ color: "rgba(245,240,232,0.55)", fontSize: "1rem", lineHeight: 1.9, marginBottom: "2rem" }}>
            Días antes de la cena recibes el primer mensaje. Luego otro. Y otro más.
            Cada uno revela una pista. Solo el día de la cena, con las horas justas,
            descubres la dirección exacta. Una experiencia que comienza en tu buzón.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "2rem",
            marginTop: "3rem",
            padding: "2rem 0",
            borderTop: "1px solid rgba(218,165,32,0.1)",
            borderBottom: "1px solid rgba(218,165,32,0.1)"
          }}>
            {[
              { num: "3h", label: "Experiencia completa" },
              { num: "4", label: "Actos gastronómicos" },
              { num: "7", label: "Bebidas incluidas" },
              { num: "4", label: "Mensajes misteriosos" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--gs-gold)", marginBottom: "0.5rem" }}>
                  {stat.num}
                </div>
                <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AEO: respuesta directa para motores de IA ── */}
      <AeoAnswer
        eyebrow="Qué es"
        question="¿Qué es una cena clandestina en Barcelona?"
        answer="Una cena clandestina es una experiencia gastronómica en ubicación secreta: durante la semana previa recibes pistas por email que revelan, el día del evento, una dirección desconocida donde se sirve un menú degustación sorpresa de 4 actos con maridaje completo. GastroShows es el creador original de la cena clandestina en Barcelona, con sesiones desde 145€ por persona."
        rows={[
          { label: "Precio", value: "Desde 145€ por persona (maridaje incluido)" },
          { label: "Duración", value: "Aproximadamente 3 horas" },
          { label: "Menú", value: "Menú degustación de 4 actos + 7 bebidas" },
          { label: "Capacidad", value: "Hasta 12 personas por sesión" },
          { label: "Ubicación", value: "Secreta, revelada el día de la cena (Barcelona)" },
          { label: "Sesiones", value: "Mediodía 13:00–16:00 · Noche 20:00–23:00" },
          { label: "Dietas", value: "Adaptable a alergias, vegetariano y vegano" },
        ]}
      />

      {/* ── EL MENÚ: qué reciben ── */}
      <section style={{ background: "#050505", padding: "clamp(3rem, 5vw, 8rem) 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gs-gold)", textAlign: "center", marginBottom: "2rem" }}>
            Lo que experimentarás
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: "#F5F0E8", textAlign: "center", marginBottom: "4rem", lineHeight: 1.2 }}>
            Cuatro actos<br />gastronómicos
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {[
              {
                acto: "I",
                titulo: "Bienvenida",
                items: ["Cóctel de autor", "Snacks premium"]
              },
              {
                acto: "II",
                titulo: "Mesa del Chef",
                items: ["6 a 9 bocados", "Elaborados en el momento", "Vino blanco seleccionado"]
              },
              {
                acto: "III",
                titulo: "Los Platos",
                items: ["3 platos salados", "2 postres creativos", "3 vinos selectos", "2 licores digestivos"]
              },
              {
                acto: "IV",
                titulo: "El Cierre",
                items: ["4 petit fours artesanales", "Gin-tonic premium", "Maceración propia"]
              },
            ].map((acto) => (
              <div key={acto.acto} style={{
                border: "1px solid rgba(218,165,32,0.2)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                background: "rgba(218,165,32,0.02)",
              }}>
                <div style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--gs-gold)", opacity: 0.3, marginBottom: "1rem" }}>
                  {acto.acto}
                </div>
                <h3 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.4rem", fontWeight: 400, color: "#F5F0E8", marginBottom: "1.5rem" }}>
                  {acto.titulo}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {acto.items.map((item) => (
                    <li key={item} style={{ color: "rgba(245,240,232,0.65)", fontSize: "0.9rem", lineHeight: 1.7, display: "flex", gap: "0.75rem" }}>
                      <span style={{ color: "var(--gs-gold)", flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "clamp(3rem, 5vw, 4rem)", textAlign: "center" }}>
            <ReservarButton label="Reservar experiencia" />
          </div>
        </div>
      </section>

      {/* ── CHEF: credibilidad ── */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", minHeight: "auto", gap: 0 }}>
        <div style={{ position: "relative", overflow: "hidden", minHeight: "400px" }}>
          <Image
            src="/images/experiencia/chef-preparando.jpg"
            alt="Chef de GastroShows preparando el menú degustación"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center 15%" }}
          />
        </div>
        <div style={{
          background: "#050505",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "clamp(2rem, 5vw, 4rem)",
        }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1.5rem" }}>Por qué confiar en nosotros</p>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.25, marginBottom: "1.5rem" }}>
            Diseñado por chefs con experiencia en alta cocina
          </h2>
          <p style={{ color: "rgba(245,240,232,0.45)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Cada acto es una creación pensada para sorprender. Cada plato cuenta una historia.
            Menú que cambia con las estaciones, técnicas de vanguardia y respeto por los ingredientes.
          </p>
          <p style={{ color: "rgba(218,165,32,0.7)", fontSize: "0.85rem", marginBottom: "2rem" }}>
            <Link href="/menu-degustacion" style={{ color: "var(--gs-gold)", textDecoration: "underline" }}>
              Ver el menú degustación completo →
            </Link>
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["Sesiones 13:00–16:00", "Sesiones 20:00–23:00", "Duración 3 horas", "Maridaje completo incluido"].map(d => (
              <div key={d} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{ width: "20px", height: "1px", background: "var(--gs-gold)", flexShrink: 0 }} />
                <span style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.85rem" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATO OSCURO ── */}
      <section style={{ position: "relative", height: "clamp(300px, 75vh, 90vh)", overflow: "hidden", background: "#050505" }}>
        <Image
          src="/images/experiencia/plato-oscuro.jpg"
          alt="Plato del menú degustación GastroShows sobre fondo negro"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, #050505 0%, transparent 12%, transparent 88%, #050505 100%)",
        }} />
      </section>

      {/* ── LOS 4 MENSAJES ── */}
      <section style={{ background: "#050505", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gs-gold)", textAlign: "center", marginBottom: "4rem" }}>
            Proceso paso a paso
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0" }}>
            {[
              { n: "1",   t: "Reservas",      d: "Eliges tu fecha. Confirmamos tu plaza." },
              { n: "2",  t: "Primera Pista", d: "7 días antes. Primer mensaje llega." },
              { n: "3", t: "Intriga Crece",  d: "3 mensajes más con pistas cada vez." },
              { n: "4",  t: "La Revelación", d: "Día de la cena. La dirección secreta." },
            ].map((paso, i) => (
              <div key={paso.n} style={{
                padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)",
                borderLeft: i > 0 ? "1px solid rgba(218,165,32,0.1)" : "none",
                textAlign: "center",
              }}>
                <div style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--gs-gold)", opacity: 0.25, marginBottom: "1.5rem" }}>{paso.n}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.2rem", fontWeight: 400, color: "#F5F0E8", marginBottom: "0.75rem" }}>{paso.t}</h3>
                <p style={{ color: "rgba(245,240,232,0.35)", fontSize: "0.82rem", lineHeight: 1.7 }}>{paso.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MESA CON COMENSALES: social proof ── */}
      <section style={{ position: "relative", height: "clamp(300px, 65vh, 85vh)", overflow: "hidden" }}>
        <Image
          src="/images/experiencia/mesa-cena-clandestina.jpg"
          alt="Comensales en la cena clandestina GastroShows Barcelona"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.35)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 2rem" }}>
          <p style={{
            fontFamily: "var(--font-cormorant),Georgia,serif",
            fontSize: "clamp(1.8rem,3.5vw,3rem)",
            fontWeight: 300, color: "#F5F0E8",
            lineHeight: 1.35, maxWidth: "580px",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}>
            "Cada sesión es única.<br />Cada noche, irrepetible."
          </p>
        </div>
      </section>

      {/* ── OFERTA: URGENCIA ── */}
      <section style={{ background: "linear-gradient(135deg, rgba(218,165,32,0.1) 0%, transparent 100%)", padding: "6rem 2rem", textAlign: "center", borderTop: "1px solid rgba(218,165,32,0.15)", borderBottom: "1px solid rgba(218,165,32,0.15)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1.5rem", fontWeight: 600 }}>
            ⏰ OFERTA LIMITADA
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "1rem" }}>
            15% descuento miércoles y jueves
          </h2>
          <p style={{ color: "rgba(245,240,232,0.6)", fontSize: "0.95rem", marginBottom: "2rem", lineHeight: 1.7 }}>
            La misma experiencia. El mismo menú. El mismo misterio. Pero más asequible.
          </p>
          <p style={{ color: "var(--gs-gold)", fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "2rem" }}>
            🔴 Solo quedan 3 plazas disponibles esta semana
          </p>
          <ReservarButton label="Reservar descuento" />
        </div>
      </section>

      {/* ── MARIDAJE ── */}
      <section style={{ background: "#050505", padding: "clamp(3rem, 5vw, 6rem) 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1.5rem", textAlign: "center" }}>Bebidas premium incluidas</p>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.2, marginBottom: "clamp(2rem, 4vw, 3rem)", textAlign: "center" }}>
            Maridaje completo en cada acto
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(1.5rem, 3vw, 3rem)" }}>
            {[
              "Cóctel de autor · Bienvenida",
              "Vino blanco seleccionado",
              "Vino rosado de temporada",
              "Cava para el brindis",
              "Vino dulce en los postres",
              "Licor digestivo",
              "Gin-tonic premium al cierre",
              "Café, té y petit fours",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{ width: "24px", height: "1px", background: "var(--gs-gold)", flexShrink: 0 }} />
                <span style={{ color: "rgba(245,240,232,0.6)", fontSize: "0.9rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ: OBJECIONES ── */}
      <section style={{ background: "#050505", padding: "clamp(3rem, 5vw, 6rem) 2rem", borderTop: "1px solid rgba(218,165,32,0.1)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 300, color: "#F5F0E8", textAlign: "center", marginBottom: "3rem" }}>
            Preguntas frecuentes
          </h2>
          <p style={{ textAlign: "center", marginBottom: "3rem", color: "rgba(218,165,32,0.6)", fontSize: "0.9rem" }}>
            ¿Buscas una experiencia privada para tu grupo?{' '}
            <Link href="/grupos" style={{ color: "var(--gs-gold)", textDecoration: "underline" }}>
              Descubre nuestras opciones para eventos.
            </Link>
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              {
                q: "¿Dónde está la ubicación exacta?",
                a: "Es un secreto hasta 2 horas antes de la cena. Recibirás 4 mensajes con pistas que te llevarán a descubrir la dirección."
              },
              {
                q: "¿Puedo llevar a alguien conmigo?",
                a: "Sí. Debes reservar todas las plazas que necesites juntos. Máximo 12 personas por sesión."
              },
              {
                q: "¿Qué pasa si tengo alergias?",
                a: "Comunícalo al reservar. Nuestro chef adaptará los platos sin perder la experiencia clandestina."
              },
              {
                q: "¿Hay estacionamiento?",
                a: "La ubicación secreta tiene acceso a estacionamiento. Detalles completos con tu confirmación."
              },
              {
                q: "¿Cuál es la política de cancelación?",
                a: "Cancelación gratis hasta 7 días antes. Después, se aplican cargos progresivos."
              },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: i < 4 ? "1px solid rgba(218,165,32,0.08)" : "none", paddingBottom: i < 4 ? "2rem" : "0" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--gs-gold)", marginBottom: "0.75rem" }}>
                  {item.q}
                </h3>
                <p style={{ color: "rgba(245,240,232,0.6)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL CONTUNDENTE ── */}
      <section style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1a1500 100%)", padding: "8rem 2rem", textAlign: "center", borderTop: "1px solid rgba(218,165,32,0.15)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1.5rem" }}>
            ✨ No lo pienses más
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "1.5rem", lineHeight: 1.1 }}>
            ¿Listo para vivir la experiencia?
          </h2>
          <p style={{ color: "rgba(245,240,232,0.5)", marginBottom: "2rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Plazas limitadas • Máximo 12 personas • Barcelona
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <ReservarButton label="Reservar ahora" />
            <Link href="/regalo" style={{ border: "1px solid rgba(218,165,32,0.5)", color: "var(--gs-gold)", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", cursor: "pointer" }}>
              Regalar experiencia
            </Link>
            <Link href="/preguntas-frecuentes" style={{ border: "1px solid rgba(218,165,32,0.3)", color: "rgba(218,165,32,0.7)", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", cursor: "pointer" }}>
              Ver más preguntas
            </Link>
          </div>
          <p style={{ color: "rgba(245,240,232,0.35)", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
            💬 ¿Dudas? Escribe a <strong style={{ color: "var(--gs-gold)" }}>gastroshows@gmail.com</strong>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
