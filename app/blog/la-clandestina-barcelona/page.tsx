"use client";

import Link from "next/link";
import { usePageActions } from "@/context/PageActionsContext";


export default function BlogLaClandestinaBCNPage() {
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
            Movimiento Gastronómico
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
            La Clandestina Barcelona: El Movimiento de Cenas Secretas que Revoluciona la Gastronomía
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(245,240,232,0.7)",
              fontFamily: "var(--font-montserrat)",
              marginBottom: "1rem",
            }}
          >
            Barcelona es cuna de experiencias culinarias únicas. Entre ellas, "La Clandestina" representa un movimiento de cenas secretas donde la ubicación es un misterio y cada experiencia es una aventura. Descubre qué significa, cómo surgió y por qué es tendencia.
          </p>

          <time
            style={{
              fontSize: "0.85rem",
              color: "rgba(245,240,232,0.5)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Mayo 2026 • 12 minutos de lectura
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
            ¿Qué es La Clandestina?
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            "La Clandestina" en Barcelona no es un restaurante específico, sino un movimiento de experiencias gastronómicas secretas donde:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem", lineHeight: 1.8 }}>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>La ubicación es secreta:</strong> Solo se revela a través de pistas, misterios o comunicaciones previas
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>La experiencia es curada:</strong> El chef o anfitrión diseña cada detalle
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Los comensales son seleccionados:</strong> Generalmente grupos pequeños para mantener exclusividad
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>La atmósfera es misteriosa:</strong> La incertidumbre es parte del atractivo
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
            Orígenes del Movimiento Clandestino Gastronómico
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            El concepto de cenas clandestinas surgió en la primera década del siglo XXI como respuesta a la estandarización de la gastronomía. Chefs jóvenes y creativos, cansados de las restricciones de restaurantes tradicionales, comenzaron a organizar cenas en espacios no convencionales: apartamentos, lofts, azoteas, bodegas.
          </p>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            Barcelona, con su tradición de innovación culinaria (gracias a chefs como Ferran Adrià), se convirtió rápidamente en epicentro de este movimiento. La ciudad ofrecía:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem", lineHeight: 1.8 }}>
            <li>Espacios variados para experiencias secretas</li>
            <li>Una audiencia sofisticada y curiosa</li>
            <li>Presión mediática que generaba intriga</li>
            <li>Una comunidad de chefs dispuestos a experimentar</li>
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
            Características de Una Cena Clandestina Auténtica
          </h2>
          <div
            style={{
              background: "rgba(200,169,110,0.03)",
              padding: "2rem",
              marginBottom: "2rem",
              border: "1px solid rgba(200,169,110,0.1)",
            }}
          >
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Reserva Discreta:</strong> Por referencia o a través de redes cerradas, no hay publicidad abierta
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Comunicación Misteriosa:</strong> Pistas, códigos, mensajes cifrados que revelan la ubicación
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Aforo Limitado:</strong> Máximo 12-20 personas para intimidad y calidad
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--gs-gold)" }}>Menú Degustación:</strong> Experiencia curada sin opciones, el chef decide
            </p>
            <p>
              <strong style={{ color: "var(--gs-gold)" }}>Ambientación Teatral:</strong> La experiencia va más allá de la comida
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
            ¿Por Qué Es Tan Atractiva?
          </h2>
          <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
            La Clandestina atrae porque ofrece:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem", lineHeight: 1.8 }}>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Exclusividad:</strong> Algo que no cualquiera puede experimentar
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Aventura:</strong> El elemento de misterio genera emoción
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Autenticidad:</strong> Una experiencia no-comercial, genuina
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Comunidad:</strong> Conectar con otros amantes de la gastronomía
            </li>
            <li>
              <strong style={{ color: "var(--gs-gold)" }}>Calidad Garantizada:</strong> El chef elige cada detalle sin compromisos
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
            Vive La Clandestina Ahora
          </h2>
          <p style={{ marginBottom: "2rem", color: "rgba(245,240,232,0.7)" }}>
            GastroShows es un ejemplo moderno del movimiento clandestino. Ubicación secreta revelada a través de 4 mensajes misteriosos, menú degustación exclusivo y experiencia culinaria sin igual.
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
            Descubre La Clandestina
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
            La Clandestina representa un cambio en cómo experienciamos la gastronomía: no es solo comer bien, es vivir una aventura culinaria. En Barcelona, este movimiento ha madurado y evolucionado, ofreciendo experiencias cada vez más sofisticadas y memorables. Si buscas ir más allá de lo ordinario, La Clandestina es tu invitación.
          </p>
        </section>
      </article>
    </main>
  );
}

