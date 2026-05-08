"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { usePageActions } from "@/context/PageActionsContext";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes · GastroShows",
  description:
    "Resuelve tus dudas sobre la cena clandestina de GastroShows: cómo funciona, precio, ubicación, duración, alergias, regalo y más.",
  keywords:
    "cena clandestina barcelona preguntas, como funciona gastroshows, precio cena clandestina, regalo experiencia gastronoica",
  alternates: {
    canonical: "https://gastroshows.es/preguntas-frecuentes",
  },
  openGraph: {
    title: "Preguntas Frecuentes · GastroShows",
    description:
      "Resuelve tus dudas sobre la cena clandestina de GastroShows: cómo funciona, precio, ubicación, duración, alergias y más.",
    type: "website",
    locale: "es_ES",
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
    question: "¿Cuál es el precio de la cena clandestina?",
    answer:
      "El precio varía según la edición y el tipo de menú seleccionado. Puedes consultar el precio exacto en nuestra página de reserva. Ofrecemos diferentes opciones de maridaje que se suman al precio base. El precio incluye toda la experiencia: cócteles de bienvenida, menú completo (actos I, II, III y IV) y bebidas premium.",
  },
  {
    id: 3,
    question: "¿Dónde será la cena si es ''clandestina''?",
    answer:
      "La ubicación es secreto. Solo se revela cuando hayas descifrado todas las pistas que recibirás en los 4 emails. Así garantizamos la exclusividad de la experiencia. Si necesitas referencias sobre ubicaciones pasadas (sempre en Barcelona, sempre con encanto), puedes contactarnos.",
  },
  {
    id: 4,
    question: "¿Cuánto dura la experiencia completa?",
    answer:
      "La cena dura aproximadamente 3-4 horas. El tiempo incluye la bienvenida con cócteles, los cuatro actos principales con el menú degustación, y tiempo para disfrutar del ambiente y la compañía. Es una experiencia sin prisa, diseñada para saborear cada momento.",
  },
  {
    id: 5,
    question: "¿Cuántos comensales pueden participar?",
    answer:
      "Máximo 12 personas por experiencia para garantizar la calidad y la exclusividad. Las mesas más pequeñas permiten una atmósfera más íntima. Si eres grupo de más de 12, podemos organizar múltiples experiencias en la misma fecha.",
  },
  {
    id: 6,
    question: "¿Qué pasa si tengo alergias o intolerancias?",
    answer:
      "Es imprescindible indicar todas las alergias e intolerancias en el momento de la reserva. Nuestro equipo culinario adaptará el menú según tus necesidades sin comprometer la esencia de la experiencia. Contacta directamente si tienes dudas sobre ingredientes específicos.",
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
      "Puedes reservar directamente a través de nuestro sitio web haciendo clic en el botón ''Reservar''. Recibirás confirmación inmediata y acceso al sistema de pistas. También puedes contactarnos vía email o teléfono si prefieres ayuda personalizada.",
  },
  {
    id: 10,
    question: "¿Cuándo están disponibles las experiencias?",
    answer:
      "Ofrecemos experiencias de jueves a domingo, con sesiones en viernes y sábado principalmente. Las fechas exactas dependen de cada edición. Puedes ver el calendario de disponibilidad completo en nuestra página de reservas.",
  },
  {
    id: 11,
    question: "¿Hay restricciones de edad?",
    answer:
      "La experiencia es para mayores de 18 años. Es una cena gourmet con maridaje de alcohol incluido. Si deseas traer a alguien menor, contacta directamente para explorar opciones adaptadas.",
  },
  {
    id: 12,
    question: "¿Puedo hacer fotografías durante la cena?",
    answer:
      "Las fotografías son bienvenidas para tu recuerdo personal, pero les pedimos discreción en redes sociales. La ubicación es secreta y queremos mantener el misterio para futuras ediciones. Haremos fotos oficiales de grupo que enviaremos después.",
  },
  {
    id: 13,
    question: "¿Es un buen regalo?",
    answer:
      "Absoluto. La experiencia de cena clandestina es el regalo perfecto para amantes de la gastronomía, aventura y misterio. Ofrecemos opciones de bono regalo con diseño premium y validez de 12 meses. Puedes comprar un bono para dos personas o personalizarlo.",
  },
  {
    id: 14,
    question: "¿Qué está incluido en el menú?",
    answer:
      "El menú consta de 4 actos: (I) Cócteles de bienvenida + snacks premium, (II) 6-9 bocados acompañados de vino blanco, (III) 3 platos salados + 2 postres + 3 vinos + 2 licores premium, (IV) 4 petit fours + gin-tonic premium con maceración propia. Cada acto cuenta con un vino maridado cuidadosamente.",
  },
  {
    id: 15,
    question: "¿Con quién puedo contactar si tengo más dudas?",
    answer:
      "Puedes escribirnos a través del formulario de contacto en nuestro sitio o enviarnos un email. También disponemos de teléfono para consultas personalizadas. Nuestro equipo responde dentro de 24 horas.",
  },
];

export default function PreguntasFrecuentesPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const { openReservation } = usePageActions();

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f0e8" }}>
        {/* Hero Section */}
        <section
          style={{
            paddingTop: "6rem",
            paddingBottom: "4rem",
            textAlign: "center",
            borderBottom: "1px solid rgba(200,169,110,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1rem",
              letterSpacing: "0.05em",
            }}
          >
            Preguntas Frecuentes
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              fontFamily: "var(--font-montserrat)",
              color: "rgba(245,240,232,0.7)",
              maxWidth: "600px",
              margin: "0 auto",
              fontWeight: 300,
            }}
          >
            Todo lo que necesitas saber sobre la cena clandestina más misteriosa de Barcelona
          </p>
        </section>

        {/* FAQ Accordion */}
        <section
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "4rem 2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {faqItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => toggleAccordion(item.id)}
                  style={{
                    width: "100%",
                    padding: "1.5rem",
                    textAlign: "left",
                    background: openId === item.id ? "rgba(200,169,110,0.08)" : "transparent",
                    border: "1px solid rgba(200,169,110,0.15)",
                    color: "var(--gs-gold)",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(200,169,110,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      openId === item.id ? "rgba(200,169,110,0.08)" : "transparent";
                  }}
                >
                  <span>{item.question}</span>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      transform: openId === item.id ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      flexShrink: 0,
                      marginLeft: "1rem",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {openId === item.id && (
                  <div
                    style={{
                      padding: "1.5rem",
                      background: "rgba(200,169,110,0.03)",
                      borderLeft: "3px solid var(--gs-gold)",
                      borderRight: "1px solid rgba(200,169,110,0.15)",
                      borderBottom: "1px solid rgba(200,169,110,0.15)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      color: "rgba(245,240,232,0.8)",
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 300,
                      animation: "fadeIn 0.3s ease",
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            borderTop: "1px solid rgba(200,169,110,0.1)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1.5rem",
              letterSpacing: "0.05em",
            }}
          >
            ¿Aún tienes dudas?
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(245,240,232,0.7)",
              marginBottom: "2rem",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
            }}
          >
            Nuestro equipo está aquí para ayudarte. Contacta directamente o reserva tu experiencia ahora mismo.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={openReservation}
              style={{
                padding: "0.8rem 2rem",
                background: "var(--gs-gold)",
                border: "none",
                color: "#050505",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              Reservar Ahora
            </button>
            <Link
              href="/contacto"
              style={{
                padding: "0.8rem 2rem",
                background: "transparent",
                border: "1px solid var(--gs-gold)",
                color: "var(--gs-gold)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(200,169,110,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Contacta con Nosotros
            </Link>
          </div>
        </section>
      </main>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 1000px;
          }
        }

        @media (max-width: 768px) {
          section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
