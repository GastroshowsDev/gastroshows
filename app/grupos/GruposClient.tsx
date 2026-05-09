"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TeamBuildingIcon, CenasEmpresaIcon, CelebracionesIcon, CorporativoIcon } from "./EventIcons";

const tipos: Array<{
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  iconType: "team-building" | "cenas" | "celebraciones" | "corporativo";
  image: string;
  details: {
    intro: string;
    activities: string[];
    includes: string[];
    capacity: string;
    duration: string;
    pricing: string;
  };
}> = [
  {
    id: "team-building",
    title: "Team Building Gastronómico",
    subtitle: "Refuerza los Lazos del Equipo",
    desc: "Dinámicas de comunicación y colaboración dentro de una experiencia gastronómica única. El entorno secreto y la magia clandestina hacen que los equipos se unan de forma natural.",
    iconType: "team-building",
    image: "/images/experiencia/ambiente.jpg",
    details: {
      intro: "Transforma tu evento de team building en una experiencia inolvidable. La gastronomía premium y el ambiente misterioso generan conexión auténtica entre los miembros del equipo.",
      activities: [
        "Dinámicas interactivas durante los actos del menú",
        "Retos y colaboración en la experiencia misteriosa",
        "Momentos de distensión y conversación auténtica",
        "Sorpresas temáticas que unifican al grupo",
        "Networking natural en ambiente exclusivo",
      ],
      includes: [
        "Menú degustación de 7 actos",
        "Maridaje con vinos, cava y premium spirits",
        "Experiencia completa de pistas y misterio",
        "Espacio privado y dedicado para el equipo",
        "Chef y servicio adaptado a dinámicas grupales",
      ],
      capacity: "10-50 personas",
      duration: "3.5-4 horas",
      pricing: "Desde 125€/persona",
    },
  },
  {
    id: "cenas-empresa",
    title: "Cenas de Empresa",
    subtitle: "Fin de Año, Reconocimientos y Celebraciones",
    desc: "Cenas de fin de año, reuniones directivas o celebraciones corporativas en un entorno sofisticado y completamente diferente. Gastronomía de nivel con la magia de lo inesperado.",
    iconType: "cenas",
    image: "/images/experiencia/mesa-cena-clandestina.jpg",
    details: {
      intro: "Eleva tus eventos corporativos con una experiencia única que tus empleados recordarán. Una cena que combina gastronomía premium con el misterio de una aventura compartida.",
      activities: [
        "Apertura con pistas misteriosas para el evento",
        "Actos gastronómicos de alta calidad",
        "Momentos para discursos y reconocimientos",
        "Ambiente sofisticado y exclusivo",
        "Fotografías profesionales del evento",
      ],
      includes: [
        "Menú degustación de 7 actos personalizado",
        "Maridaje completo (vinos, cava, destilados)",
        "Espacio privado de 4 horas",
        "Chef y equipo dedicados",
        "Coordinación personalizada del evento",
      ],
      capacity: "15-50 personas",
      duration: "4-4.5 horas",
      pricing: "Desde 130€/persona",
    },
  },
  {
    id: "celebraciones",
    title: "Celebraciones y Aniversarios",
    subtitle: "Marca Hitos Especiales con Estilo",
    desc: "Aniversarios de empresa, hitos corporativos o celebraciones especiales. Personaliza la experiencia clandestina para cada ocasión memorable.",
    iconType: "celebraciones",
    image: "/images/experiencia/ambiente.jpg",
    details: {
      intro: "Las fechas especiales de tu empresa merecen ser celebradas de forma memorable. Personaliza cada detalle de la experiencia para que sea única y representativa de vuestra empresa.",
      activities: [
        "Menú personalizado con platos especiales",
        "Moment de brindis y celebración temática",
        "Sorpresas y detalles adaptados a la ocasión",
        "Actividades que celebren los logros del equipo",
        "Ambiente diseñado para la ocasión",
      ],
      includes: [
        "Menú degustación adaptado y personalizado",
        "Maridaje premium seleccionado",
        "Espacio privado y exclusivo",
        "Decoración temática a tu gusto",
        "Chef y equipo 100% dedicados",
      ],
      capacity: "10-50 personas",
      duration: "3.5-4 horas",
      pricing: "Desde 120€/persona",
    },
  },
  {
    id: "corporativo",
    title: "Eventos Corporativos con Clientes",
    subtitle: "Negocios con Gastronomía Premium",
    desc: "Recibe a clientes, socios o inversores en un entorno exclusivo. Demuestra el nivel de tu empresa a través de una experiencia gastronómica de lujo.",
    iconType: "corporativo",
    image: "/images/experiencia/mesa-cena-clandestina.jpg",
    details: {
      intro: "Impresiona con una experiencia única. El ambiente secreto, la gastronomía premium y la magia clandestina crean el escenario perfecto para cerrar acuerdos y fortalecer relaciones comerciales.",
      activities: [
        "Networking en ambiente exclusivo y sofisticado",
        "Momentos naturales de conversación y conexión",
        "Presentación de la marca de forma diferenciadora",
        "Experiencia que refleja el nivel de tu empresa",
        "Servicio de protocolo y atención personalizada",
      ],
      includes: [
        "Menú degustación premium de 7 actos",
        "Maridaje con vinos de selección",
        "Servicio de protocolo y maitre",
        "Espacio privado de 4 horas",
        "Coordinación ejecutiva personalizada",
      ],
      capacity: "12-50 personas",
      duration: "4-4.5 horas",
      pricing: "Desde 140€/persona",
    },
  },
];

function EventoModal({
  tipo,
  onClose
}: {
  tipo: (typeof tipos)[0] | null;
  onClose: () => void;
}) {
  if (!tipo) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "2rem",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--gs-bg)",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "sticky",
            top: 0,
            right: 0,
            background: "var(--gs-gold)",
            border: "none",
            color: "#050505",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontWeight: "bold",
            float: "right",
            margin: "1rem",
            zIndex: 1001,
          }}
        >
          ✕ Cerrar
        </button>

        <div
          style={{
            position: "relative",
            height: "400px",
            overflow: "hidden",
            clear: "both",
          }}
        >
          <Image
            src={tipo.image}
            alt={tipo.title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.85) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "3rem 2rem",
              color: "white",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                marginBottom: "0.5rem",
              }}
            >
              {tipo.subtitle}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
              }}
            >
              {tipo.title}
            </h2>
          </div>
        </div>

        <div style={{ padding: "3rem 2rem" }}>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--gs-text-muted)",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
            }}
          >
            {tipo.details.intro}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--gs-gold)",
                  marginBottom: "1.5rem",
                }}
              >
                Actividades
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {tipo.details.activities.map((act) => (
                  <li
                    key={act}
                    style={{
                      padding: "0.75rem 0",
                      borderBottom: "1px solid var(--gs-border)",
                      display: "flex",
                      gap: "0.75rem",
                      color: "var(--gs-text-muted)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ color: "var(--gs-gold)", flexShrink: 0 }}>✓</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--gs-gold)",
                  marginBottom: "1.5rem",
                }}
              >
                Incluye
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {tipo.details.includes.map((inc) => (
                  <li
                    key={inc}
                    style={{
                      padding: "0.75rem 0",
                      borderBottom: "1px solid var(--gs-border)",
                      display: "flex",
                      gap: "0.75rem",
                      color: "var(--gs-text-muted)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ color: "var(--gs-gold)", flexShrink: 0 }}>·</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--gs-border)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--gs-gold)",
                  marginBottom: "0.5rem",
                }}
              >
                Capacidad
              </p>
              <p style={{ fontSize: "1.1rem", color: "var(--gs-text)" }}>
                {tipo.details.capacity}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--gs-gold)",
                  marginBottom: "0.5rem",
                }}
              >
                Duración
              </p>
              <p style={{ fontSize: "1.1rem", color: "var(--gs-text)" }}>
                {tipo.details.duration}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--gs-gold)",
                  marginBottom: "0.5rem",
                }}
              >
                Precio
              </p>
              <p style={{ fontSize: "1.1rem", color: "var(--gs-gold)" }}>
                {tipo.details.pricing}
              </p>
            </div>
          </div>

          <Link
            href="/contacto"
            style={{
              display: "inline-block",
              marginTop: "2rem",
              background: "var(--gs-gold)",
              color: "#050505",
              padding: "1rem 3rem",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Solicitar Este Evento
          </Link>
        </div>
      </div>
    </div>
  );
}

export function GruposClient() {
  const [selected, setSelected] = useState<(typeof tipos)[0] | null>(null);

  return (
    <>
      <EventoModal tipo={selected} onClose={() => setSelected(null)} />

      {/* Tipos de eventos */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
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
          Para cada celebración
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
          ¿Qué tipo de evento buscas?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {tipos.map((tipo) => (
            <button
              key={tipo.id}
              onClick={() => setSelected(tipo)}
              style={{
                padding: "0",
                border: "1px solid var(--gs-border)",
                background: "transparent",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                aspectRatio: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gs-gold)";
                (e.currentTarget as HTMLElement).style.background = "rgba(200,169,110,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gs-border)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                {tipo.iconType === "team-building" && <TeamBuildingIcon />}
                {tipo.iconType === "cenas" && <CenasEmpresaIcon />}
                {tipo.iconType === "celebraciones" && <CelebracionesIcon />}
                {tipo.iconType === "corporativo" && <CorporativoIcon />}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.6rem",
                  color: "var(--gs-text)",
                  marginBottom: "0.75rem",
                  fontWeight: 400,
                  margin: "0 0 0.75rem",
                }}
              >
                {tipo.title}
              </h3>
              <p style={{ color: "var(--gs-muted)", fontSize: "0.85rem", lineHeight: 1.5, maxWidth: "280px" }}>
                {tipo.desc}
              </p>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gs-gold)",
                  marginTop: "1.5rem",
                }}
              >
                Ver detalles →
              </p>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
