"use client";

import { usePageActions } from "@/context/PageActionsContext";


export default function BlogCenaACiegasPage() {
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
            Experiencias Sensoriales
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
            Cena a Ciegas: Cuando la Oscuridad Amplifica el Sabor
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(245,240,232,0.7)",
              fontFamily: "var(--font-montserrat)",
              marginBottom: "1rem",
            }}
          >
            Una cena a ciegas es más que una experiencia culinaria: es una exploración de los sentidos. Sin la vista guiando, el paladar, el olfato y el tacto se despiertan de maneras inesperadas. Barcelona ofrece algunas de las mejores experiencias de este tipo. Descubre cómo funciona y por qué es una tendencia en gastronomía de experiencia.
          </p>

          <time
            style={{
              fontSize: "0.85rem",
              color: "rgba(245,240,232,0.5)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Mayo 2026 • 11 minutos de lectura
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
            ¿Qué es una Cena a Ciegas?
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            Una "cena a ciegas" o "blind dining experience" es un evento gastronómico donde los comensales comen en total oscuridad o con los ojos vendados. El objetivo es eliminar la influencia visual y permitir que los otros sentidos dominen la experiencia de comer.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Sin ver los platos, los colores, ni la presentación, el cerebro se enfoca en:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem", lineHeight: 1.8 }}>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Sabor:</strong> Más intenso sin distracciones visuales
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Olfato:</strong> Aromáticos más perceptibles
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Textura:</strong> Cada bocado es una revelación táctil
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Sonido:</strong> El crujir, el sonido ambiente se vuelven importantes
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Sorpresa:</strong> Nunca sabes qué esperar
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
            La Ciencia Detrás de Comer a Ciegas
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            Estudios neurocientíficos han demostrado que nuestro cerebro depende heavily de la vista para la experiencia del sabor. De hecho, el 80% de lo que percibimos como "sabor" viene del sentido olfativo. Al eliminar la vista:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem", lineHeight: 1.8 }}>
            <li>El olfato se vuelve más agudo (neuroplasticidad compensatoria)</li>
            <li>Los receptores gustativos reciben más atención</li>
            <li>Redescubrimos ingredientes simples con nuevas intensidades</li>
            <li>La sorpresa generada libera dopamina (placer)</li>
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
            La Experiencia: Paso a Paso
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
              <strong style={{ color: "var(--gs-gold)" }}>Llegada & Briefing:</strong> Te recibiremos en un espacio seguro y cómodo. Se te explicará cómo funciona la experiencia y qué esperar.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Acceso a la Sala Oscura:</strong> Personal experimentado te guía paso a paso. La oscuridad es total para máximo impacto sensorial.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Primer Plato:</strong> Sientes el plato caliente, hueles los aromas. Cada bocado es descubrimiento.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Conversación:</strong> El personal describe discretamente cada plato después, revelando lo que acabas de comer.
            </p>
            <p>
              <strong style={{ color: "var(--gs-gold)" }}>Reflexión:</strong> Momento para compartir reacciones y sorpresas con otros comensales.
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
            Beneficios de una Cena a Ciegas
          </h2>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem", lineHeight: 1.8 }}>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Redescubrir la comida:</strong> Ingredientes comunes saben completamente diferente
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Reducir prejuicios:</strong> Sin color, apariencia no influye en percepción
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Empatía y conexión:</strong> Compartir vulnerabilidad con otros comensales crea vínculo
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Presencia plena:</strong> Imposible estar en el teléfono: debes estar presente
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Experiencia memorable:</strong> Cosas nuevas son recordadas mejor por el cerebro
            </li>
          </ul>
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
            Vive una Experiencia Sensorial Única
          </h2>
          <p style={{ marginBottom: "2rem", color: "rgba(245,240,232,0.7)" }}>
            La cena clandestina de GastroShows combina dos experiencias: el misterio de la ubicación secreta + los 4 actos de menú degustación = una aventura sensorial completa.
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
            Despierta Tus Sentidos
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
            Una cena a ciegas no es gimmick: es un método probado científicamente para intensificar la experiencia gastronómica. Barcelona, como capital de la innovación culinaria, es el lugar perfecto para vivir esta experiencia. Atrévete a perder la vista para encontrar el verdadero sabor de la gastronomía.
          </p>
        </section>
      </article>
    </main>
  );
}

