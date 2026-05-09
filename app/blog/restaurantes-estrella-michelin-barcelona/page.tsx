"use client";

import Image from "next/image";
import Link from "next/link";
import { usePageActions } from "@/context/PageActionsContext";


export default function BlogRestaurantesMichelinPage() {
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
        {/* Header */}
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
            Restaurantes Michelin en Barcelona: La Guía Definitiva para Foodies
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(245,240,232,0.7)",
              fontFamily: "var(--font-montserrat)",
              marginBottom: "1rem",
            }}
          >
            Barcelona, la capital gastronómica de España, alberga un número impresionante de restaurantes con reconocimiento Michelin. Desde chefs legendarios hasta propuestas innovadoras, te guiamos a través de los mejores restaurantes con estrella Michelin de la ciudad.
          </p>

          <time
            style={{
              fontSize: "0.85rem",
              color: "rgba(245,240,232,0.5)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Mayo 2026 • 8 minutos de lectura
          </time>
        </header>

        {/* Table of Contents */}
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
            En este artículo
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#historia" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                Historia de la Gastronomía de Barcelona
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#michelin" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                Guía de Estrellas Michelin
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#mejores" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                Los 5 Mejores Restaurantes Michelin
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#fusion" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                Cocina Fusion e Innovadora
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="#reservar" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                Cómo Reservar
              </a>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <section id="historia" style={{ marginBottom: "3rem" }}>
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
            Barcelona: Epicentro de la Excelencia Culinaria
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            Barcelona ha evolucionado durante las últimas dos décadas para convertirse en uno de los destinos gastronómicos más prestigiosos de Europa. Con una herencia culinaria profunda que combina la tradición catalana con la innovación moderna, la ciudad atrae a chefs de clase mundial y ofrece experiencias gastronómicas incomparables.
          </p>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            La "revolución culinaria" barcelonesa comenzó a finales de los años 90, cuando chefs como Ferran Adrià transformaron la gastronomía no solo en Barcelona, sino en el mundo entero. Hoy en día, la ciudad cuenta con un ecosistema gastronómico robusto que va desde restaurantes con tres estrellas Michelin hasta propuestas emergentes que desafían las convenciones.
          </p>
        </section>

        <section id="michelin" style={{ marginBottom: "3rem" }}>
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
            Entendiendo las Estrellas Michelin
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            La Guía Michelin es considerada el estándar de oro en evaluación gastronómica mundial. Las estrellas representan:
          </p>
          <div style={{ background: "rgba(200,169,110,0.05)", padding: "1.5rem", marginBottom: "1rem", borderLeft: "3px solid var(--gs-gold)" }}>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>⭐ Una Estrella:</strong> Cocina de muy buena calidad en su categoría. Merece la pena pararse a comer allí.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>⭐⭐ Dos Estrellas:</strong> Cocina excelente, vale la pena hacer un desvío. Técnica experta con sabores interesantes.
            </p>
            <p>
              <strong style={{ color: "var(--gs-gold)" }}>⭐⭐⭐ Tres Estrellas:</strong> Cocina excepcional que merece un viaje especial. Obras maestras culinarias.
            </p>
          </div>
        </section>

        <section id="mejores" style={{ marginBottom: "3rem" }}>
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
            Los 5 Mejores Restaurantes Michelin de Barcelona
          </h2>

          <div style={{ background: "rgba(200,169,110,0.03)", padding: "2rem", marginBottom: "2rem", border: "1px solid rgba(200,169,110,0.1)" }}>
            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.3rem", marginBottom: "1rem" }}>1. El Bulli (Cerrado - Legado Histórico)</h3>
            <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              Aunque ha cerrado sus puertas como restaurante en 2011, El Bulli sigue siendo la leyenda viva de la gastronomía mundial. Ferran Adrià revolucionó la cocina con técnicas de espuma, deconstrucción y experiencias multisensoriales que definieron una era.
            </p>
            <p style={{ lineHeight: 1.7 }}>
              Su legado perdura en la mentalidad innovadora de Barcelona. Los chefs que pasaron por sus cocinas ahora dirigen establecimientos destacados en la ciudad.
            </p>
          </div>

          <div style={{ background: "rgba(200,169,110,0.03)", padding: "2rem", marginBottom: "2rem", border: "1px solid rgba(200,169,110,0.1)" }}>
            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.3rem", marginBottom: "1rem" }}>2. Moments en Mandarin Oriental (⭐⭐⭐)</h3>
            <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              Bajo la dirección del chef Carme Ruscalleda, Moments representa la cocina catalana en su máxima expresión. Ubicado en el lujoso hotel Mandarin Oriental en el Paseo de Gracia, ofrece una experiencia culinaria de clase mundial.
            </p>
            <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              La cocina destaca por técnicas impecables, ingredientes de la máxima calidad y una presentación artística que entra por los ojos. Cada plato cuenta una historia sobre la gastronomía catalana contemporánea.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--gs-gold)" }}>
              💡 Reserva con meses de anticipación. Precio aproximado: 200-250€ por persona.
            </p>
          </div>

          <div style={{ background: "rgba(200,169,110,0.03)", padding: "2rem", marginBottom: "2rem", border: "1px solid rgba(200,169,110,0.1)" }}>
            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.3rem", marginBottom: "1rem" }}>3. Cinc Sentits (⭐⭐)</h3>
            <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              Ubicado en el Eixample, Cinc Sentits es un referente de la cocina contemporánea catalana. Su nombre hace referencia a los cinco sentidos, y cada plato está diseñado para estimularlos todos.
            </p>
            <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              El chef Jordi Artal ha creado un espacio donde la innovación convive con el respeto por los productos y la tradición culinaria. Los menús degustación permiten explorar propuestas sorprendentes.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--gs-gold)" }}>
              💡 Excelente relación calidad-precio. Precio aproximado: 90-120€ por persona.
            </p>
          </div>

          <div style={{ background: "rgba(200,169,110,0.03)", padding: "2rem", marginBottom: "2rem", border: "1px solid rgba(200,169,110,0.1)" }}>
            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.3rem", marginBottom: "1rem" }}>4. Disfrutar (⭐⭐)</h3>
            <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              Los tres chefs fundadores de Disfrutar (antiguamente El Bulli 1.5) traen el espíritu innovador del legendario El Bulli a Barcelona. Ubicado en el Eixample, es un laboratorio de creatividad culinaria.
            </p>
            <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              Aquí la gastronomía es teatral: platos que se presentan con humo, técnicas moleculares, juegos interactivos con el cliente. Es una experiencia multisensorial que va más allá de comer.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--gs-gold)" }}>
              💡 Reserva online con meses de anticipación. Precio aproximado: 150-180€ por persona.
            </p>
          </div>

          <div style={{ background: "rgba(200,169,110,0.03)", padding: "2rem", marginBottom: "2rem", border: "1px solid rgba(200,169,110,0.1)" }}>
            <h3 style={{ color: "var(--gs-gold)", fontSize: "1.3rem", marginBottom: "1rem" }}>5. Alkimia (⭐)</h3>
            <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              El chef Jordi Vilà lleva más de 20 años explorando la intersección entre tradición e innovación. Alkimia (el "arte de la transmutación") representa cocina sofisticada en un ambiente acogedor.
            </p>
            <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              Ubicado en el Born, destaca por ingredientes excepcionales tratados con respeto y técnica. Los menús cambian según la temporada y disponibilidad de productos.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--gs-gold)" }}>
              💡 Ambiente más íntimo. Precio aproximado: 80-110€ por persona.
            </p>
          </div>
        </section>

        <section id="fusion" style={{ marginBottom: "3rem" }}>
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
            Cocina Fusion e Innovadora: Más Allá de Michelin
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            Barcelona no se detiene en restaurantes Michelin. Hay una escena emergente de chefs jóvenes y creativos que están definiendo el futuro de la gastronomía catalana:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "2rem" }}>
            <li style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--gs-gold)" }}>Cocina Nikkei:</strong> La fusión de técnicas japonesas con ingredientes catalanes está ganando tracción, creando platos únicos que solo existen en Barcelona.
            </li>
            <li style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--gs-gold)" }}>Cocina Sostenible:</strong> Chefs como Paco Pérez del restaurante Coque están liderando el movimiento hacia gastronomía más ética y sostenible.
            </li>
            <li style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--gs-gold)" }}>Experiencias Clandestinas:</strong> Una tendencia emergente son las cenas privadas y secretas donde el misterio es parte de la experiencia.
            </li>
          </ul>
        </section>

        <section id="reservar" style={{ marginBottom: "3rem" }}>
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
            Consejos para Reservar y Disfrutar
          </h2>
          <div style={{ background: "rgba(200,169,110,0.05)", padding: "1.5rem", marginBottom: "1rem", borderLeft: "3px solid var(--gs-gold)" }}>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Reserva con anticipación:</strong> Los restaurantes Michelin se llenan rápidamente. Algunos aceptan reservas 3-6 meses antes.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Elige el menú degustación:</strong> Permite que el chef muestre su trabajo de forma más completa que platos à la carte.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Maridaje de vinos:</strong> No dudes en solicitar recomendaciones de vinos. Los sommeliers Michelin son expertos.
            </p>
            <p>
              <strong style={{ color: "var(--gs-gold)" }}>Viste apropiadamente:</strong> Aunque algunos son más casuales, la mayoría requieren smart casual o elegancia.
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
            ¿Buscas una Experiencia Gastronómica Diferente?
          </h2>
          <p style={{ marginBottom: "2rem", color: "rgba(245,240,232,0.7)" }}>
            La cena clandestina de GastroShows ofrece un misterio culinario que combina excelencia gastronómica con aventura. Descubre una ubicación secreta revelada a través de pistas criptográficas.
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
            Reserva Tu Cena Clandestina
          </button>
        </section>

        {/* Conclusion */}
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
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            Barcelona es un destino gastronómico sin igual. Ya sea que busques la excelencia de tres estrellas Michelin o experiencias innovadoras que desafíen las convenciones, la ciudad tiene algo para cada paladar.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Los restaurantes Michelin de Barcelona no son solo lugares donde comer; son templos de la creatividad culinaria donde los chefs expresan su arte. Y si quieres una experiencia que vaya más allá de lo tradicional, las cenas clandestinas ofrecen un viaje donde la gastronomía se encuentra con el misterio.
          </p>
        </section>
      </article>
    </main>
  );
}

