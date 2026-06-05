"use client";

import { usePageActions } from "@/context/PageActionsContext";


export default function BlogMichelinBaritoPage() {
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
          <span
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--gs-gold)",
              fontWeight: 700,
              marginBottom: "1rem",
              display: "block",
            }}
          >
            Guía Gastronómica
          </span>

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
            Restaurantes Michelin Baratos: Cómo Comer Premium Sin Arruinarse
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(245,240,232,0.7)",
              fontFamily: "var(--font-montserrat)",
              marginBottom: "1rem",
            }}
          >
            El mito de que comer en Michelin es prohibitivamente caro es exactamente eso: un mito. Barcelona tiene opciones para vivir gastronomía de excelencia sin gastar fortunas. Descubre cómo acceder a cocina de estrellas de manera inteligente.
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

        <section style={{ marginBottom: "3rem" }}>
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
            ¿Es Posible Comer Michelin Barato?
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            La respuesta corta es: sí. El precio depende de:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem", lineHeight: 1.8 }}>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Número de estrellas:</strong> Una estrella cuesta menos que dos o tres
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Formato del menú:</strong> À la carte es más caro que menú de mediodía
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Bebidas:</strong> El maridaje dispara el precio; sin alcohol es mucho más accesible
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Temporada:</strong> Menúes de primavera/otoño son más baratos que verano
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
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
            Estrategias para Ahorrar en Michelin
          </h2>

          <div
            style={{
              background: "rgba(200,169,110,0.03)",
              padding: "2rem",
              marginBottom: "2rem",
              border: "1px solid rgba(200,169,110,0.1)",
            }}
          >
            <p style={{ marginBottom: "1.5rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>1. Come al Mediodía:</strong> La mayoría de restaurantes Michelin ofrecen menús de mediodía a fracción del precio de cena. Mismo chef, misma cocina, menor costo.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>2. Sin Maridaje:</strong> El wine pairing duplica el precio. A menudo, el agua o bebidas sin alcohol son suficientes para disfrutar.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>3. Busca Estrellas Nuevas:</strong> Restaurantes que acaban de obtener su primera estrella ofrecen relación calidad-precio mejor que 2-3 estrellas establecidas.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>4. Precios Fijos vs À la Carte:</strong> Un menú degustación fijo es más barato que elegir platos individuales.
            </p>
            <p>
              <strong style={{ color: "var(--gs-gold)" }}>5. Ofertas Especiales:</strong> Algunos restaurantes lancan menús especiales o promociones en períodos bajos.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
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
            Precios Reales de Michelin en Barcelona
          </h2>
          <div
            style={{
              background: "rgba(200,169,110,0.05)",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              borderLeft: "3px solid var(--gs-gold)",
            }}
          >
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Restaurantes ⭐ (Una Estrella):</strong>
              <br />
              Menú de mediodía: €30-50 | Menú de cena: €60-90 | À la carte: €80-120
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Restaurantes ⭐⭐ (Dos Estrellas):</strong>
              <br />
              Menú de mediodía: €50-80 | Menú de cena: €90-150 | À la carte: €120-180
            </p>
            <p>
              <strong style={{ color: "var(--gs-gold)" }}>Restaurantes ⭐⭐⭐ (Tres Estrellas):</strong>
              <br />
              Menú de mediodía: €80-120 | Menú de cena: €200-250+ | À la carte: €250+
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
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
            Mi Recomendación
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            Si tu presupuesto es limitado, la mejor estrategia es:
          </p>
          <ol style={{ marginLeft: "2rem", marginBottom: "1rem", lineHeight: 1.8 }}>
            <li>Elige un restaurante ⭐ (una estrella) para comer a mediodía</li>
            <li>Opta por el menú degustación fijo, no à la carte</li>
            <li>Sin maridaje de vinos (a menos que sea incluido)</li>
            <li>Reserva con 2-3 semanas de anticipación para mejores disponibilidades</li>
          </ol>
          <p style={{ lineHeight: 1.7 }}>
            De esta manera, disfrutarás de cocina de excelencia Michelin por €30-50, que es similar al costo de un buen restaurante tradicional.
          </p>
        </section>

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
            Alternativa: Gastronomía Premium Sin Presión de Precios
          </h2>
          <p style={{ marginBottom: "2rem", color: "rgba(245,240,232,0.7)" }}>
            La cena clandestina de GastroShows es una alternativa innovadora: cocina de excelencia sin la sofisticación de un restaurante formal. Menú degustación curado, ubicación mística, precio accesible.
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
            Experimenta Gastronomía Premium
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
            No necesitas gastar una fortuna para comer bien en Barcelona. La gastronomía Michelin es accesible si sabes cómo hacerlo. Y si quieres una experiencia diferente a los restaurantes formales, la cena clandestina ofrece lo mejor de ambos mundos: excelencia culinaria con la libertad y misterio del movimiento underground.
          </p>
        </section>
      </article>
    </main>
  );
}

