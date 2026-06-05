import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Aviso Legal · GastroShows Barcelona",
  description: "Aviso legal de GastroShows. Información sobre derechos de autor, términos de uso, responsabilidades y protección de datos.",
  robots: "index, follow",
  alternates: { canonical: "https://gastroshows.es/aviso-legal" },
  openGraph: {
    title: "Aviso Legal GastroShows",
    description: "Aviso legal de GastroShows Barcelona",
    type: "website",
    url: "https://gastroshows.es/aviso-legal",
  },
};

export default function AvisoLegalPage() {
  return (
    <PageLayout>
      <article style={{ maxWidth: "900px", margin: "0 auto", padding: "120px 2rem 4rem", color: "rgba(245,240,232,0.85)" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300,
            color: "var(--gs-gold)",
            marginBottom: "2rem",
          }}
        >
          Aviso Legal
        </h1>

        <div style={{ fontSize: "0.95rem", lineHeight: 1.8, fontFamily: "var(--font-montserrat)" }}>
          <p>
            <strong>Última actualización: Mayo 2026</strong>
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            1. Información legal
          </h2>
          <p>
            GastroShows es un sitio web de experiencias gastronómicas con sede en Barcelona, España. El presente aviso legal regula el acceso y la utilización del sitio web.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            2. Propiedad intelectual
          </h2>
          <p>
            Todos los contenidos de este sitio web (textos, imágenes, diseños, logos, videos, etc.) están protegidos por derechos de autor y son propiedad de GastroShows o de sus proveedores de contenido. Se prohíbe:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
            <li>Copiar, modificar o distribuir cualquier contenido sin permiso</li>
            <li>Usar nuestros logos o marcas sin autorización</li>
            <li>Incrustar nuestro sitio web en otros sitios sin permiso</li>
          </ul>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            3. Términos de uso
          </h2>
          <p>Al acceder y utilizar este sitio web, aceptas:</p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
            <li>Usar el sitio solo para propósitos legales y apropiados</li>
            <li>No transmitir contenido dañino, ofensivo o ilegal</li>
            <li>No intentar acceder a partes restringidas sin autorización</li>
            <li>No interferir con la operación del sitio web</li>
            <li>No usar herramientas de scraping o automatización sin permiso</li>
          </ul>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            4. Reservas y pagos
          </h2>
          <p>
            Las reservas realizadas a través de nuestro sitio web están sujetas a los siguientes términos:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
            <li>Una vez confirmada la reserva, recibirás un email de confirmación</li>
            <li>El pago debe realizarse según los términos especificados en el momento de la reserva</li>
            <li>Aceptamos tarjetas de crédito y otros métodos de pago indicados</li>
            <li>Las transacciones se procesan de forma segura</li>
            <li>La cancelación está sujeta a nuestra política de cancelación</li>
          </ul>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            5. Cancelaciones y reembolsos
          </h2>
          <p>
            Las solicitudes de cancelación deben hacerse al menos 72 horas antes de la experiencia para recibir un reembolso completo. Cancelaciones dentro de 72 horas pueden resultar en pérdida del importe, aunque podrá usarse como crédito futuro. Consulta nuestra página de Preguntas Frecuentes para más detalles.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            6. Limitación de responsabilidad
          </h2>
          <p>
            GastroShows no será responsable por:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
            <li>Daños indirectos, incidentales o consecuentes</li>
            <li>Pérdida de datos o ingresos</li>
            <li>Cambios o cancelaciones de experiencias por razones de fuerza mayor</li>
            <li>Problemas técnicos no imputables a negligencia nuestra</li>
          </ul>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            7. Garantías sobre experiencias
          </h2>
          <p>
            GastroShows se esfuerza por ofrecer experiencias de alta calidad. Sin embargo:
          </p>
          <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
            <li>Las experiencias se ofrecen "tal cual"</li>
            <li>No garantizamos resultados específicos</li>
            <li>La satisfacción es subjetiva y puede variar</li>
            <li>Los cambios de ubicación pueden ocurrir en caso de circunstancias excepcionales</li>
          </ul>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            8. Enlaces a terceros
          </h2>
          <p>
            Nuestro sitio web puede contener enlaces a sitios web de terceros. No somos responsables del contenido, exactitud o prácticas de privacidad de sitios externos. El acceso a enlaces externos es bajo tu propio riesgo.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            9. Cambios en el sitio
          </h2>
          <p>
            GastroShows se reserva el derecho a modificar, suspender o descontinuar cualquier parte del sitio web sin previo aviso. No somos responsables por cualquier pérdida resultante de cambios.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            10. Ley aplicable
          </h2>
          <p>
            Este aviso legal se rige por la ley española. Cualquier disputa será resuelta según la jurisdicción de Barcelona, España. Aceptas someterte a la jurisdicción exclusiva de los tribunales españoles.
          </p>

          <h2 style={{ fontSize: "1.3rem", color: "var(--gs-gold)", marginTop: "2rem", marginBottom: "1rem" }}>
            11. Contacto
          </h2>
          <p>
            Para consultas sobre este aviso legal, contacta con nosotros a través de nuestro formulario de contacto.
          </p>
        </div>
      </article>
    </PageLayout>
  );
}

