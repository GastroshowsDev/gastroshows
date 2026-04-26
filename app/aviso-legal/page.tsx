import { LegalPage, Section, P, Ul, Li, Strong, Placeholder } from "@/components/legal/LegalPage";

// ─────────────────────────────────────────────────────────────────────────────
// PLANTILLA — revisar y completar los campos marcados con ▸ antes de publicar
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Aviso Legal · GastroShows",
  robots: "noindex",
};

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso Legal" updated="▸ [DD de mes de 2025]">

      {/* 1 ── IDENTIFICACIÓN */}
      <Section title="1. Identificación del titular del sitio web">
        <P>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios
          de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan
          los datos identificativos del titular del presente sitio web:
        </P>
        <Ul>
          <Li><Strong>Denominación social:</Strong> <Placeholder>▸ [Razón social completa]</Placeholder></Li>
          <Li><Strong>CIF/NIF:</Strong> <Placeholder>▸ [CIF de la empresa]</Placeholder></Li>
          <Li><Strong>Domicilio social:</Strong> <Placeholder>▸ [Dirección completa, ciudad, CP]</Placeholder></Li>
          <Li><Strong>Inscripción registral:</Strong> <Placeholder>▸ [Registro Mercantil de Barcelona, Tomo X, Folio X, Hoja B-XXXXX]</Placeholder></Li>
          <Li><Strong>Correo electrónico de contacto:</Strong> <Placeholder>▸ [hola@gastroshows.com]</Placeholder></Li>
          <Li><Strong>Teléfono:</Strong> <Placeholder>▸ [+34 XXX XXX XXX]</Placeholder></Li>
          <Li><Strong>Sitio web:</Strong> <Placeholder>▸ [https://www.gastroshows.com]</Placeholder></Li>
        </Ul>
      </Section>

      {/* 2 ── OBJETO */}
      <Section title="2. Objeto y ámbito de aplicación">
        <P>
          El presente Aviso Legal regula el acceso y uso del sitio web de GastroShows
          (en adelante, &ldquo;el Sitio Web&rdquo;), titularidad de la entidad identificada en el
          apartado anterior (en adelante, &ldquo;el Titular&rdquo;).
        </P>
        <P>
          El acceso al Sitio Web y la utilización de sus contenidos implica la aceptación
          plena y sin reservas de las condiciones establecidas en el presente Aviso Legal,
          así como en la Política de Privacidad y en la Política de Cookies. Si no está
          de acuerdo con alguna de las condiciones, le rogamos que se abstenga de usar el
          Sitio Web.
        </P>
        <P>
          El Titular se reserva el derecho de modificar en cualquier momento y sin previo
          aviso las condiciones de uso del Sitio Web, así como sus contenidos, servicios
          y precios.
        </P>
      </Section>

      {/* 3 ── DESCRIPCIÓN DEL SERVICIO */}
      <Section title="3. Descripción del servicio">
        <P>
          GastroShows ofrece experiencias gastronómicas privadas en Barcelona, consistentes
          en cenas de carácter clandestino desarrolladas en ubicaciones secretas. A través
          del Sitio Web, los usuarios pueden:
        </P>
        <Ul>
          <Li>Consultar información sobre la experiencia gastronómica.</Li>
          <Li>Realizar reservas para las sesiones disponibles.</Li>
          <Li>Adquirir vales regalo para terceras personas.</Li>
          <Li>Solicitar información sobre eventos privados y alquiler del espacio completo.</Li>
        </Ul>
        <P>
          El servicio está disponible exclusivamente para mayores de 18 años residentes
          en España o que accedan al servicio dentro del territorio español.
        </P>
      </Section>

      {/* 4 ── CONDICIONES DE USO */}
      <Section title="4. Condiciones de uso">
        <P>El usuario se compromete a:</P>
        <Ul>
          <Li>Usar el Sitio Web de conformidad con la ley, el presente Aviso Legal, la moral y el orden público.</Li>
          <Li>No utilizar el Sitio Web con fines fraudulentos o ilícitos.</Li>
          <Li>No realizar reservas falsas, incompletas o con datos de terceros sin su consentimiento.</Li>
          <Li>No intentar acceder a áreas restringidas del Sitio Web mediante métodos no autorizados.</Li>
          <Li>No introducir, almacenar o difundir mediante el Sitio Web contenidos que sean difamatorios, obscenos, amenazantes, xenófobos o que atenten contra la dignidad de las personas.</Li>
          <Li>No realizar acciones que puedan dañar, sobrecargar o deteriorar los sistemas informáticos del Titular o de terceros.</Li>
        </Ul>
        <P>
          El incumplimiento de estas condiciones podrá dar lugar a la cancelación de la
          reserva sin derecho a reembolso, así como al ejercicio de las acciones legales
          que correspondan.
        </P>
      </Section>

      {/* 5 ── RESERVAS Y CONTRATACIÓN */}
      <Section title="5. Reservas, precios y condiciones de cancelación">
        <P>
          <Strong>Formalización de la reserva.</Strong> La reserva queda confirmada
          únicamente cuando el usuario recibe la comunicación de confirmación por correo
          electrónico. El Titular se reserva el derecho a rechazar reservas en casos
          justificados.
        </P>
        <P>
          <Strong>Precios.</Strong> Los precios indicados en el Sitio Web incluyen el IVA
          aplicable. <Placeholder>▸ [Indicar política de precios: precio por persona, qué incluye, etc.]</Placeholder>
        </P>
        <P>
          <Strong>Política de cancelación.</Strong> <Placeholder>▸ [Describir: plazo mínimo de cancelación, si hay penalización, si se devuelve el importe o se emite un bono, etc. Ejemplo: «Las cancelaciones realizadas con más de 72 horas de antelación conllevan la devolución íntegra del importe. Las realizadas con menos de 72 horas de antelación no serán reembolsadas.»]</Placeholder>
        </P>
        <P>
          <Strong>Vales regalo.</Strong> Los vales regalo tienen una validez de seis (6)
          meses desde la fecha de emisión. No son reembolsables en metálico y no pueden
          canjearse por otras personas distintas del destinatario indicado, salvo autorización
          expresa del Titular.
        </P>
        <P>
          <Strong>Derecho de desistimiento.</Strong> <Placeholder>▸ [Indicar si aplica o no el derecho de desistimiento de 14 días del RD Legislativo 1/2007, y en qué condiciones, teniendo en cuenta que puede estar excluido para servicios de ocio con fecha determinada — art. 103.l).]</Placeholder>
        </P>
      </Section>

      {/* 6 ── PROPIEDAD INTELECTUAL */}
      <Section title="6. Propiedad intelectual e industrial">
        <P>
          Todos los contenidos del Sitio Web — incluyendo, sin carácter limitativo, textos,
          fotografías, imágenes, logotipos, marcas, gráficos, diseños, código fuente y
          cualquier otro elemento — son titularidad del Titular o de sus licenciantes, y
          están protegidos por la legislación española e internacional en materia de
          propiedad intelectual e industrial.
        </P>
        <P>
          Queda expresamente prohibida la reproducción, distribución, comunicación pública,
          transformación o cualquier otro acto de explotación de los contenidos del Sitio
          Web sin la autorización previa y por escrito del Titular, salvo uso personal y
          privado no comercial.
        </P>
        <P>
          El nombre comercial &ldquo;GastroShows&rdquo;, el logotipo y cualquier signo distintivo
          asociado son marcas <Placeholder>▸ [registradas o en proceso de registro]</Placeholder> del
          Titular. Su uso no autorizado constituye infracción de los derechos de propiedad
          industrial del Titular.
        </P>
      </Section>

      {/* 7 ── RESPONSABILIDAD */}
      <Section title="7. Exclusión de garantías y responsabilidad">
        <P>
          El Titular no garantiza la disponibilidad continua e ininterrumpida del Sitio Web
          y no será responsable de los daños y perjuicios que pudieran derivarse de
          interrupciones, errores técnicos, virus informáticos o causas de fuerza mayor.
        </P>
        <P>
          El Titular no se responsabiliza de los contenidos de sitios web de terceros
          accesibles mediante enlaces desde el Sitio Web. La inclusión de un enlace no
          implica aprobación ni recomendación de dichos sitios.
        </P>
        <P>
          El Titular no será responsable de los daños derivados del uso indebido del Sitio
          Web por parte del usuario, ni del incumplimiento por parte del usuario de las
          condiciones establecidas en el presente Aviso Legal.
        </P>
      </Section>

      {/* 8 ── PROTECCIÓN DE DATOS */}
      <Section title="8. Protección de datos personales">
        <P>
          El tratamiento de los datos personales facilitados a través del Sitio Web se rige
          por lo establecido en la{" "}
          <a href="/privacidad" style={{ color: "#C8A96E" }}>Política de Privacidad</a>,
          que forma parte integrante del presente Aviso Legal y que el usuario acepta al
          utilizar el Sitio Web.
        </P>
      </Section>

      {/* 9 ── LEGISLACIÓN */}
      <Section title="9. Legislación aplicable y jurisdicción">
        <P>
          Las relaciones entre el Titular y los usuarios del Sitio Web se rigen por la
          legislación española vigente. Para la resolución de cualquier controversia
          derivada del acceso o uso del Sitio Web, ambas partes se someten, con renuncia
          expresa a cualquier otro fuero que pudiera corresponderles, a la jurisdicción
          de los Juzgados y Tribunales de la ciudad de{" "}
          <Placeholder>▸ [Barcelona]</Placeholder>.
        </P>
        <P>
          No obstante lo anterior, si el usuario tiene la condición de consumidor y usuario
          según la normativa aplicable, la sumisión a fuero no será aplicable en los casos
          en que la ley lo prohíba expresamente.
        </P>
        <P>
          La Comisión Europea pone a disposición de los consumidores una plataforma de
          resolución de litigios en línea (ODR):{" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: "#C8A96E" }}>
            https://ec.europa.eu/consumers/odr
          </a>
        </P>
      </Section>

    </LegalPage>
  );
}
