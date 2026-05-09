"use client";

import { PageLayout } from "@/components/PageLayout";


export default function CookiesPage() {
  return (
    <PageLayout>
      <article style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem", color: "rgba(245,240,232,0.85)" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300,
            color: "var(--gs-gold)",
            marginBottom: "2rem",
          }}
        >
          Política de Cookies
        </h1>

        <div style={{ fontSize: "0.95rem", lineHeight: 1.8, fontFamily: "var(--font-montserrat)" }}>
          <p>
            <strong>Última actualización: Mayo 2026</strong>
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            ¿Qué son las cookies?
          </h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Se utilizan para recordar información sobre tu visita y mejorar tu experiencia de navegación.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            Tipos de cookies que utilizamos
          </h2>

          <h3 style={{ fontSize: "1.1rem", color: "var(--gs-gold)", marginTop: "1.5rem", marginBottom: "0.8rem" }}>
            Cookies Necesarias
          </h3>
          <p>
            Estas cookies son esenciales para el funcionamiento de nuestro sitio web. Incluyen cookies para:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
            <li>Mantener tu sesión de usuario</li>
            <li>Procesar reservas y pagos</li>
            <li>Seguridad (prevenir acceso no autorizado)</li>
            <li>Guardar preferencias básicas</li>
          </ul>

          <h3 style={{ fontSize: "1.1rem", color: "var(--gs-gold)", marginTop: "1.5rem", marginBottom: "0.8rem" }}>
            Cookies Analíticas
          </h3>
          <p>
            Utilizamos cookies analíticas para entender cómo los usuarios interactúan con nuestro sitio. Estas cookies nos ayudan a:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
            <li>Medir el número de visitantes</li>
            <li>Analizar cómo se utiliza el sitio</li>
            <li>Identificar páginas populares</li>
            <li>Mejorar nuestros servicios</li>
          </ul>
          <p style={{ fontStyle: "italic", color: "rgba(245,240,232,0.7)" }}>
            Requieren consentimiento previo. Las proporcionadas por Google Analytics están sujetas a su Política de Privacidad.
          </p>

          <h3 style={{ fontSize: "1.1rem", color: "var(--gs-gold)", marginTop: "1.5rem", marginBottom: "0.8rem" }}>
            Cookies de Marketing
          </h3>
          <p>
            Utilizamos cookies de marketing de terceros (Meta Pixel, TikTok Pixel) para:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
            <li>Mostrar anuncios personalizados</li>
            <li>Hacer seguimiento de conversiones</li>
            <li>Crear audiencias personalizadas</li>
            <li>Medir la efectividad de campañas publicitarias</li>
          </ul>
          <p style={{ fontStyle: "italic", color: "rgba(245,240,232,0.7)" }}>
            Estas cookies requieren consentimiento explícito.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            Cómo controlar las cookies
          </h2>
          <p>
            Puedes controlar y eliminar cookies de las siguientes formas:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
            <li>
              <strong>Cambiar preferencias:</strong> Usa nuestro banner de consentimiento en el pie de página para cambiar tus preferencias en cualquier momento.
            </li>
            <li>
              <strong>Configuración del navegador:</strong> La mayoría de navegadores te permiten rechazar cookies o ser avisado cuando se envíe una cookie.
            </li>
            <li>
              <strong>Sitios de control:</strong> Puedes usar sitios como allaboutcookies.org para aprender más sobre cookies y cómo controlarlas.
            </li>
          </ul>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            Google Analytics
          </h2>
          <p>
            Utilizamos Google Analytics para análisis de sitio web. Google Analytics utiliza cookies para trackear información de uso de sitios. La información generada por la cookie sobre tu uso del sitio web (incluyendo tu dirección IP) será transmitida a y almacenada por Google en servidores en los EE.UU.
          </p>
          <p>
            Google usará esta información con el propósito de evaluar tu uso del sitio web, compilando reportes sobre actividad del sitio web y proporcionando otros servicios. Google puede también transferir esta información a terceros cuando sea requerido por ley o cuando terceros procesen la información en nombre de Google.
          </p>
          <p>
            Puedes optar por no permitir Google Analytics visitando sus controles de privacidad.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            Otros scripts de terceros
          </h2>
          <p>
            Nuestro sitio puede contener elementos de terceros (videos, mapas, redes sociales) que pueden usar sus propias cookies. No tenemos control sobre estas cookies de terceros. Te recomendamos revisar las políticas de privacidad de estos servicios.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            Cambios en esta política
          </h2>
          <p>
            Podemos actualizar esta política ocasionalmente. Los cambios serán publicados en esta página. El uso continuado de nuestro sitio indica aceptación de cualquier cambio.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            Contacto
          </h2>
          <p>
            Si tienes preguntas sobre esta política, contacta con nosotros a través de nuestro formulario de contacto.
          </p>
        </div>
      </article>
    </PageLayout>
  );
}

