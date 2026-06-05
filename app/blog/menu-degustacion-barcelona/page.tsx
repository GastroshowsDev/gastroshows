import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menú Degustación Barcelona · Los Mejores Menús de Degustación",
  description: "Los mejores menús de degustación en Barcelona. Experiencias gastronómicas de lujo con maridaje incluido. Descubre dónde comer el mejor menú degustación.",
  robots: "index, follow",
  alternates: { canonical: "https://gastroshows.es/blog/menu-degustacion-barcelona" },
  openGraph: {
    title: "Menú Degustación Barcelona",
    description: "Los mejores menús de degustación gastronómicos",
    type: "article",
    url: "https://gastroshows.es/blog/menu-degustacion-barcelona",
  },
};

"use client";

import { usePageActions } from "@/context/PageActionsContext";


export default function BlogMenuDegustacionPage() {
  const { openReservation } = usePageActions();

  return (
    <main style={{ minHeight: "100vh", background: "#050505", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <article
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 2rem",
          color: "rgba(245,240,232,0.85)",
        }}
      >
        <header style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "var(--gs-gold)",
                fontWeight: 700,
              }}
            >
              Guía Gastronómica
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            Menú Degustación: El Viaje Culinario Perfecto
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(245,240,232,0.7)",
              fontFamily: "var(--font-montserrat)",
              marginBottom: "1rem",
            }}
          >
            Un menú degustación es más que una comida: es una narración culinaria donde cada plato cuenta una historia. Te explicamos qué es, cómo funciona y por qué debería estar en tu lista de experiencias gastronómicas en Barcelona.
          </p>

          <time
            style={{
              fontSize: "0.85rem",
              color: "rgba(245,240,232,0.5)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Mayo 2026 • 10 minutos de lectura
          </time>
        </header>

        <nav
          style={{
            background: "rgba(200,169,110,0.05)",
            border: "1px solid rgba(200,169,110,0.1)",
            padding: "1.5rem",
            marginBottom: "3rem",
            borderRadius: "4px",
          }}
        >
          <h2
            style={{
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--gs-gold)",
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            Contenidos
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#que-es" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                ¿Qué es un Menú Degustación?
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#como-funciona" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                Cómo Funciona
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#estructura" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                Estructura Típica
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#maridaje" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                Maridaje de Vinos
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#etiqueta" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                Etiqueta y Protocolo
              </a>
            </li>
          </ul>
        </nav>

        <section id="que-es" style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
          >
            ¿Qué es un Menú Degustación?
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            Un menú degustación (también llamado "tasting menu" o "menu de cata") es una secuencia cuidadosamente planeada de pequeñas porciones de diferentes platos, diseñados para ser disfrutados en progresión durante una comida.
          </p>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            A diferencia del menú tradicional donde escoges tus platos, en un menú degustación es el chef quien decide el flujo y la composición de la experiencia. Cada plato está pensado para preparar el paladar para el siguiente, creando una narrativa gastronómica completa.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Es la forma preferida de los chefs de nivel Michelin para expresar su arte sin limitaciones, mostrando técnica, creatividad y filosofía culinaria en su forma más pura.
          </p>
        </section>

        <section id="como-funciona" style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
          >
            Cómo Funciona un Menú Degustación
          </h2>
          <div style={{ background: "rgba(200,169,110,0.03)", padding: "1.5rem", marginBottom: "1.5rem", borderLeft: "3px solid var(--gs-gold)" }}>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Duración típica:</strong> 2.5 a 4 horas para toda la experiencia.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Número de platos:</strong> Entre 7 y 20 platos, dependiendo del restaurante.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Porciones:</strong> Pequeñas pero significativas, permitiendo probar múltiples sabores.
            </p>
            <p>
              <strong style={{ color: "var(--gs-gold)" }}>Ritmo:</strong> El personal del restaurante controla el ritmo entre platos para optimizar la digestión y la experiencia.
            </p>
          </div>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            Cada plato llega con una explicación: ingredientes principales, técnica utilizada, y cómo complementa la historia global. El chef frecuentemente aparece para explicaciones adicionales sobre platos especiales.
          </p>
        </section>

        <section id="estructura" style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
          >
            Estructura Típica de un Menú Degustación
          </h2>
          <div style={{ background: "rgba(200,169,110,0.03)", padding: "2rem", marginBottom: "2rem", border: "1px solid rgba(200,169,110,0.1)" }}>
            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.1rem", marginBottom: "0.8rem" }}>1. Amuse Bouche (Entretenimiento del Paladar)</h3>
            <p style={{ fontSize: "0.95rem", color: "rgba(245,240,232,0.8)", marginBottom: "1rem" }}>
              Un pequeño bocado (a veces 1-3) que establece el tono y abre el apetito. Es sorpresa del chef.
            </p>

            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.1rem", marginBottom: "0.8rem" }}>2. Entrada o Primer Plato</h3>
            <p style={{ fontSize: "0.95rem", color: "rgba(245,240,232,0.8)", marginBottom: "1rem" }}>
              Introduce los temas principales de la experiencia. Frecuentemente ligero y fresco para preparar el paladar.
            </p>

            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.1rem", marginBottom: "0.8rem" }}>3. Segundo Plato</h3>
            <p style={{ fontSize: "0.95rem", color: "rgba(245,240,232,0.8)", marginBottom: "1rem" }}>
              Generalmente pescado o marisco, con mayor complejidad que la entrada.
            </p>

            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.1rem", marginBottom: "0.8rem" }}>4. Paleta Limpiadora</h3>
            <p style={{ fontSize: "0.95rem", color: "rgba(245,240,232,0.8)", marginBottom: "1rem" }}>
              Un pequeño sorbet o bebida que limpia el paladar entre platos fuertes. Reinicia tus papilas gustativas.
            </p>

            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.1rem", marginBottom: "0.8rem" }}>5. Plato Principal</h3>
            <p style={{ fontSize: "0.95rem", color: "rgba(245,240,232,0.8)", marginBottom: "1rem" }}>
              El momento fuerte: carne, caza o proteína principal. Más sustancioso y generalmente con salsas y acompañamientos elaborados.
            </p>

            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.1rem", marginBottom: "0.8rem" }}>6. Transición</h3>
            <p style={{ fontSize: "0.95rem", color: "rgba(245,240,232,0.8)", marginBottom: "1rem" }}>
              Platos salados finales o quesos antes del postre, preparando al paladar para los sabores dulces.
            </p>

            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.1rem", marginBottom: "0.8rem" }}>7. Postre</h3>
            <p style={{ fontSize: "0.95rem", color: "rgba(245,240,232,0.8)", marginBottom: "1rem" }}>
              A menudo múltiples pequeños postres que cierran la experiencia con dulzura y creatividad.
            </p>

            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.1rem", marginBottom: "0.8rem" }}>8. Petit Fours & Café</h3>
            <p style={{ fontSize: "0.95rem", color: "rgba(245,240,232,0.8)" }}>
              Pequeños dulces acompañados de café o té para cerrar definitivamente la experiencia.
            </p>
          </div>
        </section>

        <section id="maridaje" style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
          >
            Maridaje de Vinos: Potenciando la Experiencia
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            El maridaje es la selección de vinos que acompañan cada plato. No es obligatorio, pero eleva significativamente la experiencia.
          </p>
          <div style={{ background: "rgba(200,169,110,0.05)", padding: "1.5rem", marginBottom: "1.5rem", borderLeft: "3px solid var(--gs-gold)" }}>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Maridaje clásico:</strong> Vinos españoles e internacionales de calidad media-alta, cuidadosamente seleccionados.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Maridaje premium:</strong> Vinos de gran reserva, de bodegas destacadas, con mayor inversión.
            </p>
            <p>
              <strong style={{ color: "var(--gs-gold)" }}>Maridaje alternativo:</strong> Cervezas artesanales, sidras o zumos naturales para quienes no beben alcohol.
            </p>
          </div>
          <p style={{ lineHeight: 1.7 }}>
            El sommeliers del restaurante pueden explicar por qué cada vino es perfecto para cada plato, educando tu paladar durante la experiencia.
          </p>
        </section>

        <section id="etiqueta" style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
          >
            Etiqueta y Protocolo
          </h2>
          <div style={{ background: "rgba(200,169,110,0.03)", padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid rgba(200,169,110,0.1)" }}>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Puntualidad:</strong> Llega 15 minutos antes. Los menús degustación operan en cronogramas estrictos.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Vestimenta:</strong> Smart casual o formal. Consulta con el restaurante anticipadamente.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Alergias:</strong> Comunica con anticipación. Los chefs adaptan felizmente menús para necesidades dietéticas.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Celulares:</strong> Discreción recomendada. Algunas experiencias prohíben fotos; otras las animan en ciertos momentos.
            </p>
            <p>
              <strong style={{ color: "var(--gs-gold)" }}>Ritmo:</strong> Sigue el ritmo del equipo. No apresuración; es una experiencia para saborear.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: "linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(200,169,110,0.05) 100%)",
            padding: "2rem",
            marginTop: "3rem",
            marginBottom: "3rem",
            border: "1px solid rgba(200,169,110,0.2)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1rem",
            }}
          >
            Vive un Menú Degustación Único en Barcelona
          </h2>
          <p style={{ marginBottom: "2rem", color: "rgba(245,240,232,0.7)" }}>
            La cena clandestina de GastroShows es un menú degustación en 4 actos con un giro diferente: la ubicación es un misterio que tú descifrará.
          </p>
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
            }}
          >
            Descubre Nuestro Menú Degustación
          </button>
        </section>

        <section>
          <h2
            style={{
              fontSize: "1.8rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              color: "var(--gs-gold)",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
          >
            Conclusión
          </h2>
          <p style={{ lineHeight: 1.7 }}>
            Un menú degustación no es simplemente comer; es educación culinaria, exploración sensorial y conexión con el chef. Es la expresión más pura de la creatividad gastronómica. Si nunca has experimentado uno en Barcelona, está llegando el momento de hacerlo.
          </p>
        </section>
      </article>
    </main>
  );
}

