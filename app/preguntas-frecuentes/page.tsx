import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes · Cena Clandestina Barcelona",
  description:
    "Todo lo que necesitas saber sobre la cena clandestina de Barcelona: precio, ubicación secreta, menú, duración, alergias, cancelaciones, edad mínima y más.",
  keywords:
    "cena clandestina precio, como funciona cena clandestina, ubicacion cena clandestina barcelona, menu cena clandestina, alergias cena clandestina, cancelación cena clandestina",
  alternates: { canonical: "https://gastroshows.es/preguntas-frecuentes" },
  openGraph: {
    title: "Preguntas Frecuentes · Cena Clandestina Barcelona",
    description: "Resuelve todas tus dudas sobre la experiencia gastronómica más exclusiva.",
    type: "website",
  },
};

const faqItems = [
  {
    id: 1,
    question: "¿Cómo funciona exactamente la cena clandestina?",
    answer:
      "Recibirás 4 emails con pistas criptográficas que deberás descifrar. A través de ellas descubrirás la ubicación secreta de la cena. Es una experiencia de misterio donde el viaje es parte de la aventura. La ubicación varía cada edición y solo se revela cuando hayas completado todas las pistas.",
  },
  {
    id: 2,
    question: "¿Cuál es el precio exacto de la cena clandestina?",
    answer:
      "El precio es 145€ por persona para el menú degustación completo. Este precio incluye toda la experiencia: cócteles de bienvenida, menú de 7 actos, maridaje premium (vinos, cava, gin-tonic), y agua. Opciones adicionales de maridaje premium disponibles.",
  },
  {
    id: 3,
    question: "¿Dónde será la cena si es 'clandestina'?",
    answer:
      "La ubicación es secreto. Solo se revela cuando hayas descifrado todas las pistas que recibirás en los 4 emails. Así garantizamos la exclusividad de la experiencia. Está sempre en Barcelona, siempre en un lugar con encanto. Si necesitas referencias sobre ubicaciones pasadas, contáctanos.",
  },
  {
    id: 4,
    question: "¿Cuánto dura la experiencia completa?",
    answer:
      "La cena dura aproximadamente 3-4 horas. El tiempo incluye la bienvenida con cócteles, los siete actos principales con el menú degustación, descansos entre actos, y tiempo para disfrutar del ambiente y la compañía. Es una experiencia sin prisa, diseñada para saborear cada momento.",
  },
  {
    id: 5,
    question: "¿Cuántos comensales pueden participar?",
    answer:
      "Máximo 12 personas por experiencia para garantizar la calidad, exclusividad y la capacidad de crear un ambiente íntimo. Las mesas más pequeñas permiten una atmósfera más personal y memorable. Si eres grupo de más de 12, podemos organizar múltiples experiencias en la misma fecha.",
  },
  {
    id: 6,
    question: "¿Qué pasa si tengo alergias o intolerancias?",
    answer:
      "Es imprescindible indicar todas las alergias e intolerancias en el momento de la reserva. Nuestro equipo culinario adaptará el menú completamente según tus necesidades sin comprometer la esencia de la experiencia. Contacta directamente si tienes dudas sobre ingredientes específicos.",
  },
  {
    id: 7,
    question: "¿Hay parking disponible en la ubicación?",
    answer:
      "Sí, en todas nuestras ubicaciones hay acceso a parking cercano. La ubicación exacta y detalles de estacionamiento se envían con las instrucciones finales, una vez hayas completado todas las pistas. Si prefieres transporte público o taxi, te orientaremos también.",
  },
  {
    id: 8,
    question: "¿Cuál es la política de cancelación?",
    answer:
      "Puedes cancelar tu reserva hasta 72 horas antes de la experiencia y recibir reembolso íntegro. Cancelaciones dentro de 72 horas perderán el importe de la reserva pero podrán usarlo como crédito para una futura experiencia. En caso de problemas personales, contacta directamente para buscar soluciones.",
  },
  {
    id: 9,
    question: "¿Cómo hago la reserva?",
    answer:
      "Puedes reservar directamente a través de nuestro sitio web haciendo clic en el botón 'Reservar'. Recibirás confirmación inmediata y acceso al sistema de pistas. También puedes contactarnos vía email (info@gastroshows.es) o teléfono si prefieres ayuda personalizada.",
  },
  {
    id: 10,
    question: "¿Cuándo están disponibles las experiencias?",
    answer:
      "Ofrecemos experiencias de jueves a domingo, con sesiones principalmente en viernes y sábado. Las fechas exactas dependen de cada edición y disponibilidad del chef. Puedes ver el calendario de disponibilidad completo en nuestra página de reservas.",
  },
  {
    id: 11,
    question: "¿Hay restricciones de edad mínima?",
    answer:
      "La experiencia es para mayores de 18 años. Es una cena gourmet con maridaje que incluye alcohol (vinos, cava, gin-tonic). Si deseas traer a alguien menor, contacta directamente para explorar opciones adaptadas (menú sin alcohol disponible).",
  },
  {
    id: 12,
    question: "¿Puedo hacer fotografías durante la cena?",
    answer:
      "Las fotografías son bienvenidas para tu recuerdo personal, pero les pedimos discreción en redes sociales. La ubicación es secreta y queremos mantener el misterio para futuras ediciones. Haremos fotos oficiales de grupo que enviaremos después de la experiencia.",
  },
  {
    id: 13,
    question: "¿Es realmente un buen regalo?",
    answer:
      "Absolutamente. La experiencia de cena clandestina es el regalo perfecto para amantes de la gastronomía, aventura y misterio. Es memorable, diferente y crea historias para contar. Ofrecemos opciones de bono regalo con diseño premium y validez de 12 meses.",
  },
  {
    id: 14,
    question: "¿Qué está exactamente incluido en el menú de 7 actos?",
    answer:
      "(I) Cócteles artesanales de bienvenida + snacks premium, (II) 6-9 bocados gourmet acompañados de vino blanco, (III) Proteína del mar + verduras de temporada + vino albariño, (IV) Sorpresa del chef con técnica sofisticada, (V) Plato principal con proteína premium + acompañamientos, (VI) Postre artesanal + cava premium, (VII) Petit fours + gin-tonic de maceración propia.",
  },
  {
    id: 15,
    question: "¿Con quién puedo contactar si tengo más dudas?",
    answer:
      "Puedes escribirnos a través del formulario de contacto en nuestro sitio o enviarnos un email a info@gastroshows.es. También disponemos de teléfono para consultas personalizadas. Nuestro equipo responde dentro de 24 horas a cualquier pregunta.",
  },
];

export default function PreguntasFrecuentes() {
  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio", url: "https://gastroshows.es" },
        { name: "Preguntas Frecuentes", url: "https://gastroshows.es/preguntas-frecuentes" },
      ])} />

      {/* FAQ Schema */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }} />

      <main>
        {/* HERO */}
        <section
          style={{
            padding: "clamp(8rem, 15vw, 12rem) 2rem",
            textAlign: "center",
            borderBottom: "1px solid var(--gs-border)",
          }}
        >
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
            Información & Detalles
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "1rem",
              letterSpacing: "0.02em",
            }}
          >
            Preguntas Frecuentes
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              fontFamily: "var(--font-montserrat)",
              color: "var(--gs-muted)",
              maxWidth: "620px",
              margin: "0 auto",
              fontWeight: 300,
            }}
          >
            Todo lo que necesitas saber sobre la cena clandestina más misteriosa y exclusiva de Barcelona
          </p>
        </section>

        {/* FAQ ITEMS */}
        <section
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            padding: "clamp(6rem, 10vw, 8rem) 2rem",
          }}
        >
          <FAQAccordion items={faqItems} />
        </section>

        {/* CTA SECTION */}
        <section
          style={{
            padding: "clamp(6rem, 10vw, 8rem) 2rem",
            textAlign: "center",
            borderTop: "1px solid var(--gs-border)",
            background: "var(--gs-bg2)",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-text)",
              marginBottom: "1.5rem",
              letterSpacing: "0.02em",
            }}
          >
            ¿Aún tienes dudas?
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--gs-muted)",
              marginBottom: "2.5rem",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
            }}
          >
            Nuestro equipo está aquí para ayudarte con cualquier pregunta. Contacta directamente o reserva tu experiencia ahora.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contacto"
              style={{
                padding: "1rem 2.5rem",
                background: "var(--gs-gold)",
                color: "#050505",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              Contacta con Nosotros
            </Link>
            <Link
              href="/cena-clandestina"
              style={{
                padding: "1rem 2.5rem",
                background: "transparent",
                border: "1px solid var(--gs-gold)",
                color: "var(--gs-gold)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(218,165,32,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Ver Experiencia
            </Link>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
