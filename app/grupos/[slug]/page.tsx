import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, eventSchema } from "@/components/seo/JsonLd";

const eventosData: {
  [key: string]: {
    title: string;
    subtitle: string;
    metaDesc: string;
    heroImage: string;
    mainImage: string;
    tagline: string;
    hero: string;
    sections: Array<{
      type: "text" | "image" | "features" | "gallery";
      title?: string;
      content?: string;
      image?: string;
      imageAlt?: string;
      imagePosition?: "left" | "right";
      items?: string[];
    }>;
    price: string;
    duration: string;
    capacity: string;
  };
} = {
  "team-building": {
    title: "Team Building Gastronómico",
    subtitle: "Dinámicas de Equipo en la Experiencia Clandestina",
    metaDesc: "Team building gastronómico en Barcelona. Dinámicas, collaboración y conexión auténtica en la experiencia clandestina de GastroShows.",
    heroImage: "/images/experiencia/ambiente.jpg",
    mainImage: "/images/experiencia/mesa-cena-clandestina.jpg",
    tagline: "Refuerza los lazos de tu equipo",
    hero: "Team Building\nGastronómico",
    sections: [
      {
        type: "text",
        title: "El poder de la gastronomía para unir equipos",
        content:
          "En GastroShows entendemos que los mejores team buildings no son los que hablan sobre conexión, sino los que la generan de forma natural. La experiencia clandestina, con su misterio y su gastronomía premium, crea un espacio donde los equipos se unen de manera auténtica.\n\nCada acto del menú degustación es una oportunidad para la interacción, la sorpresa y el descubrimiento compartido. Los miembros del equipo colaboran en las dinámicas misteriosas, conversan en un ambiente sofisticado y disfrutan de momentos de verdadera conexión.",
      },
      {
        type: "image",
        image: "/images/experiencia/mesa-cena-clandestina.jpg",
        imageAlt: "Mesa de team building en la experiencia clandestina de GastroShows",
        imagePosition: "left",
      },
      {
        type: "text",
        title: "Actividades y dinámicas incluidas",
        content:
          "El team building gastronómico de GastroShows combina la experiencia de pistas misteriosas con dinámicas diseñadas para equipos. Cada grupo es diferente, por lo que personalizamos las actividades según tus necesidades:\n\n• Introducción misteriosa: La experiencia comienza con pistas que el equipo debe descifrar juntos\n• Actos interactivos: Entre cada acto del menú, dinámicas de colaboración y retos\n• Momentos de networking: Espacios naturales para que todos interactúen\n• Sorpresas temáticas: Personalizadas según la cultura de tu empresa",
      },
      {
        type: "features",
        title: "Qué incluye el team building",
        items: [
          "Menú degustación de 7 actos de alta gastronomía",
          "Maridaje completo: vinos, cava y destilados premium",
          "Experiencia completa de pistas y misterio",
          "Dinámicas interactivas durante la cena",
          "Espacio privado y exclusivo para tu equipo",
          "Chef y equipo de servicio dedicados",
          "Fotografías profesionales del evento (opcional)",
          "Coordinación y asesoramiento personalizado",
        ],
      },
      {
        type: "text",
        title: "Cómo funciona la experiencia",
        content:
          "1. Contacto inicial: Nos cuentas tus objetivos y el tamaño de tu equipo\n2. Personalización: Diseñamos las dinámicas específicas para tu empresa\n3. Confirmación: Reciben toda la información logística\n4. El día anterior: Primer mensaje misterioso llega al correo\n5. El día de la cena: Mensajes posteriores revelan pistas sobre la ubicación\n6. Experiencia: 4 horas de gastronomía, misterio y conexión de equipo",
      },
    ],
    price: "Desde 125€/persona",
    duration: "3.5 - 4 horas",
    capacity: "10 - 50 personas",
  },
  "cenas-empresa": {
    title: "Cenas de Empresa",
    subtitle: "Fin de Año, Reconocimientos y Celebraciones Corporativas",
    metaDesc:
      "Cenas de empresa en Barcelona con GastroShows. Fin de año, reconocimientos y celebraciones corporativas en ubicación secreta con menú degustación premium.",
    heroImage: "/images/experiencia/ambiente.jpg",
    mainImage: "/images/experiencia/chef-preparando.jpg",
    tagline: "Celebraciones corporativas con estilo",
    hero: "Cenas de\nEmpresa",
    sections: [
      {
        type: "text",
        title: "Cenas que tus empleados recordarán",
        content:
          "Las cenas de empresa no son solo eventos obligatorios. Son momentos para reconocer el trabajo de tu equipo, celebrar logros y crear memoria corporativa. En GastroShows transformamos estas cenas en experiencias memorable.\n\nNuestro enfoque combina gastronomía premium con la magia de lo inesperado. La ubicación secreta, el menú degustación de 7 actos y la experiencia de pistas misteriosas hacen que tus empleados se sientan valorados y especiales.",
      },
      {
        type: "image",
        image: "/images/experiencia/ambiente.jpg",
        imageAlt: "Sala de cena de empresa con decoración elegante en GastroShows",
        imagePosition: "left",
      },
      {
        type: "text",
        title: "Perfecta para cada ocasión",
        content:
          "• Cenas de fin de año: Celebra los logros del ejercicio con estilo\n• Reconocimientos y promociones: Haz sentir especiales a tu equipo\n• Reuniones directivas: Un entorno sofisticado para conversaciones importantes\n• Celebraciones de hitos: Aniversarios de empresa, lanzamientos de productos\n• Cenas con stakeholders: Demuestra el nivel de tu organización",
      },
      {
        type: "features",
        title: "Experiencia completa incluida",
        items: [
          "Menú degustación personalizado de 7 actos",
          "Maridaje completo con vinos, cava y destilados",
          "Espacio privado y completamente exclusivo",
          "Chef y equipo de servicio dedicados a tu evento",
          "Coordinación de discursos y momentos especiales",
          "Ambiente sofisticado diseñado para la ocasión",
          "Servicio de protocolo y maitre experimentado",
          "Fotografías profesionales del evento",
        ],
      },
      {
        type: "text",
        title: "Proceso de coordinación",
        content:
          "Trabajamos contigo en cada detalle:\n\n1. Reunión previa: Entendemos tus objetivos, número de asistentes y presupuesto\n2. Propuesta personalizada: Diseñamos el menú, dinámicas y timeline\n3. Coordinación: Toda la logística, incluyendo discursos y momentos especiales\n4. Confirmación: Los asistentes reciben invitación con información\n5. Ejecución: Experiencia clandestina completa el día del evento",
      },
    ],
    price: "Desde 130€/persona",
    duration: "4 - 4.5 horas",
    capacity: "15 - 50 personas",
  },
  "celebraciones": {
    title: "Celebraciones y Aniversarios",
    subtitle: "Marca Hitos Especiales con Estilo",
    metaDesc:
      "Celebraciones y aniversarios en Barcelona con GastroShows. Personaliza tu evento en ubicación secreta con menú degustación y experiencia clandestina.",
    heroImage: "/images/experiencia/mesa-cena-clandestina.jpg",
    mainImage: "/images/experiencia/ambiente.jpg",
    tagline: "Celebra cada momento importante",
    hero: "Celebraciones y\nAniversarios",
    sections: [
      {
        type: "text",
        title: "Las fechas especiales merecen algo único",
        content:
          "Los aniversarios de empresa, los hitos corporativos y las celebraciones especiales son momentos para recordar. En GastroShows entendemos que cada ocasión es diferente y merece un tratamiento especial.\n\nPersonalizamos cada detalle de la experiencia clandestina para que refleje lo que tu empresa quiere celebrar. Desde el diseño del menú hasta las sorpresas temáticas, todo se adapta a tu momento.",
      },
      {
        type: "image",
        image: "/images/experiencia/plato-principal.jpg",
        imageAlt: "Plato principal del menú degustación de GastroShows",
        imagePosition: "right",
      },
      {
        type: "text",
        title: "Personalizamos cada celebración",
        content:
          "• Aniversarios de empresa: Celebra años de historia y logros\n• Lanzamiento de nuevos productos: Marca el hito con estilo\n• Alcance de objetivos: Reconoce lo conseguido por todo el equipo\n• Cambios de dirección o estructura: Marca nuevas eras de forma memorable\n• Celebraciones diversas: Cualquier ocasión especial merece vivirse de forma única",
      },
      {
        type: "features",
        title: "Personalizamos para ti",
        items: [
          "Menú degustación diseñado específicamente para tu celebración",
          "Sorpresas temáticas adaptadas a la ocasión",
          "Maridaje seleccionado para el evento",
          "Espacio privado completamente personalizable",
          "Decoración temática a tu gusto",
          "Momentos especiales coordinados (brindis, presentaciones)",
          "Chef y equipo dedicados al evento",
          "Recuerdos fotográficos profesionales",
        ],
      },
      {
        type: "text",
        title: "Cómo hacemos realidad tu celebración",
        content:
          "Desde el primer contacto, nos sumergimos en tu visión:\n\n1. Entendimiento: Escuchamos qué quieres celebrar y por qué\n2. Diseño: Creamos una experiencia que refleje tu momento\n3. Personalización: Cada detalle está pensado para ti\n4. Coordinación: Ejecutamos la experiencia sin que tengas que pensar en nada\n5. Recuerdo: Un evento que todos recordarán",
      },
    ],
    price: "Desde 120€/persona",
    duration: "3.5 - 4 horas",
    capacity: "10 - 50 personas",
  },
  "corporativo": {
    title: "Eventos Corporativos con Clientes",
    subtitle: "Negocios con Gastronomía Premium",
    metaDesc:
      "Eventos corporativos en Barcelona con clientes y socios. Experiencia clandestina de GastroShows para networking premium y gastronomía de lujo.",
    heroImage: "/images/experiencia/ambiente.jpg",
    mainImage: "/images/experiencia/mesa-cena-clandestina.jpg",
    tagline: "Impresiona con experiencias de lujo",
    hero: "Eventos\nCorporativos",
    sections: [
      {
        type: "text",
        title: "Negocios en un ambiente diferente",
        content:
          "La mejor manera de fortalecer relaciones comerciales no es en una sala de juntas. Es en un ambiente sofisticado donde la gastronomía premium y el misterio crean conversaciones auténticas. En GastroShows, llevamos tus eventos corporativos a otro nivel.\n\nRecibir a clientes, socios o inversores en la experiencia clandestina es una manera única de demostrar el nivel de tu empresa. La ubicación secreta, el menú degustación de 7 actos y el servicio de protocolo crean el escenario perfecto para cerrar acuerdos y fortalecer relaciones.",
      },
      {
        type: "image",
        image: "/images/experiencia/chef-preparando.jpg",
        imageAlt: "Chef de GastroShows en la cocina preparando platos premium",
        imagePosition: "left",
      },
      {
        type: "text",
        title: "Situaciones donde se adapta perfectamente",
        content:
          "• Recepción de clientes VIP: Demuestra el nivel de tu empresa\n• Cierres de acuerdos importantes: Crea ambiente para negociaciones \n• Presentación a inversores: Muestra tu marca desde una perspectiva diferente\n• Networking premium: Conecta con socios clave en ambiente exclusivo\n• Eventos de lanzamiento: Presenta nuevas líneas o servicios con estilo\n• Reuniones estratégicas: Conversaciones importantes en ambiente sofisticado",
      },
      {
        type: "features",
        title: "Servicio ejecutivo completo",
        items: [
          "Menú degustación premium de 7 actos",
          "Maridaje con vinos de selección especial",
          "Servicio de protocolo y maitre experimentado",
          "Espacio privado completamente exclusivo",
          "Coordinación ejecutiva personalizada",
          "Ambiente diseñado para networking natural",
          "Chef dedicado a experiencia gastronómica",
          "Discreción y profesionalismo garantizado",
        ],
      },
      {
        type: "text",
        title: "Por qué eleges GastroShows",
        content:
          "1. Diferenciación: Tus clientes no olvidan una experiencia como esta\n2. Ambiente Premium: La ubicación secreta demuestra exclusividad\n3. Gastronomía: Menú degustación de alto nivel\n4. Servicio: Equipo de profesionales dedicados\n5. Flexibilidad: Adaptamos todo a tus necesidades\n6. Impacto: Relaciones comerciales fortalecidas",
      },
    ],
    price: "Desde 140€/persona",
    duration: "4 - 4.5 horas",
    capacity: "12 - 50 personas",
  },
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const evento = eventosData[params.slug];
  if (!evento) {
    return {
      title: "Evento no encontrado",
      description: "El evento que buscas no existe",
    };
  }
  return {
    title: `${evento.title} Barcelona · GastroShows`,
    description: evento.metaDesc,
    alternates: {
      canonical: `https://gastroshows.es/grupos/${params.slug}`,
    },
    openGraph: {
      title: `${evento.title} · GastroShows`,
      description: evento.metaDesc,
      url: `https://gastroshows.es/grupos/${params.slug}`,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(eventosData).map((slug) => ({ slug }));
}

export default function EventoPage({ params }: Props) {
  const evento = eventosData[params.slug];

  if (!evento) {
    return (
      <PageLayout>
        <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
          <h1>Evento no encontrado</h1>
          <Link href="/grupos">Volver a eventos</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "https://gastroshows.es" },
          { name: "Grupos y Eventos", url: "https://gastroshows.es/grupos" },
          { name: evento.title, url: `https://gastroshows.es/grupos/${params.slug}` },
        ])}
      />
      <JsonLd
        data={eventSchema({
          name: evento.title,
          description: evento.metaDesc,
          price: parseInt(evento.price.replace(/[^0-9]/g, "")),
        })}
      />

      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Image
          src={evento.heroImage}
          alt={evento.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 40%, rgba(5,5,5,0.85) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "6rem",
            left: 0,
            right: 0,
            textAlign: "center",
            padding: "0 2rem",
          }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "1.5rem",
            }}
          >
            {evento.tagline}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant),Georgia,serif",
              fontSize: "clamp(4rem,8vw,6.5rem)",
              fontWeight: 300,
              color: "#F5F0E8",
              lineHeight: 0.95,
              marginBottom: "2rem",
              whiteSpace: "pre-line",
            }}
          >
            {evento.hero}
          </h1>
          <p
            style={{
              color: "rgba(245,240,232,0.75)",
              maxWidth: "400px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
            }}
          >
            {evento.subtitle}
          </p>
          <Link
            href="/contacto"
            style={{
              background: "var(--gs-gold)",
              color: "#050505",
              padding: "0.9rem 2.5rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Solicitar Evento
          </Link>
        </div>
      </section>

      {/* Contenido */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        {evento.sections.map((section, idx) => {
          if (section.type === "text") {
            return (
              <div key={idx} style={{ marginBottom: "5rem" }}>
                {section.title && (
                  <>
                    <p
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: "var(--gs-gold)",
                        marginBottom: "1rem",
                      }}
                    >
                      {section.title}
                    </p>
                    <h2
                      style={{
                        fontFamily: "var(--font-cormorant),Georgia,serif",
                        fontSize: "clamp(2rem,4vw,3rem)",
                        fontWeight: 300,
                        color: "var(--gs-text)",
                        marginBottom: "2rem",
                      }}
                    >
                      {section.title}
                    </h2>
                  </>
                )}
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--gs-text-muted)",
                    lineHeight: 2,
                    whiteSpace: "pre-line",
                  }}
                >
                  {section.content}
                </p>
              </div>
            );
          }

          if (section.type === "image") {
            return (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: section.imagePosition === "right" ? "45% 55%" : "55% 45%",
                  gap: "3rem",
                  alignItems: "center",
                  marginBottom: "5rem",
                }}
              >
                {section.imagePosition === "left" && (
                  <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
                    <Image
                      src={section.image!}
                      alt={section.imageAlt || ""}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                )}
                <div></div>
                {section.imagePosition === "right" && (
                  <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
                    <Image
                      src={section.image!}
                      alt={section.imageAlt || ""}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                )}
              </div>
            );
          }

          if (section.type === "features") {
            return (
              <div key={idx} style={{ marginBottom: "5rem" }}>
                <p
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "var(--gs-gold)",
                    marginBottom: "1rem",
                  }}
                >
                  {section.title}
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant),Georgia,serif",
                    fontSize: "clamp(2rem,4vw,3rem)",
                    fontWeight: 300,
                    color: "var(--gs-text)",
                    marginBottom: "2.5rem",
                  }}
                >
                  {section.title}
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  {section.items?.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        padding: "1.5rem",
                        border: "1px solid var(--gs-border)",
                      }}
                    >
                      <span style={{ color: "var(--gs-gold)", flexShrink: 0, marginTop: "2px" }}>✓</span>
                      <p style={{ color: "var(--gs-text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </section>

      {/* Info cards */}
      <section style={{ background: "var(--gs-bg2)", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            <div style={{ padding: "2rem", border: "1px solid var(--gs-border)" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "0.75rem" }}>
                Capacidad
              </p>
              <p style={{ fontSize: "1.4rem", color: "var(--gs-text)" }}>{evento.capacity}</p>
            </div>
            <div style={{ padding: "2rem", border: "1px solid var(--gs-border)" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "0.75rem" }}>
                Duración
              </p>
              <p style={{ fontSize: "1.4rem", color: "var(--gs-text)" }}>{evento.duration}</p>
            </div>
            <div style={{ padding: "2rem", border: "1px solid var(--gs-border)" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "0.75rem" }}>
                Precio
              </p>
              <p style={{ fontSize: "1.4rem", color: "var(--gs-gold)" }}>{evento.price}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-cormorant),Georgia,serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 300,
            color: "var(--gs-text)",
            marginBottom: "1.5rem",
          }}
        >
          Diseñemos tu evento juntos
        </h2>
        <p style={{ color: "var(--gs-muted)", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
          Contacta con nosotros para crear una experiencia personalizada que supere tus expectativas.
        </p>
        <Link
          href="/contacto"
          style={{
            background: "var(--gs-gold)",
            color: "#050505",
            padding: "1rem 3.5rem",
            fontFamily: "var(--font-montserrat)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-block",
            marginRight: "1.5rem",
          }}
        >
          Solicitar Evento
        </Link>
        <Link
          href="/grupos"
          style={{
            background: "transparent",
            color: "var(--gs-gold)",
            border: "1px solid var(--gs-gold)",
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
          Ver otros eventos
        </Link>
      </section>
    </PageLayout>
  );
}
