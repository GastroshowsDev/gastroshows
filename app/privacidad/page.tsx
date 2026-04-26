import { LegalPage, Section, P, Ul, Li, Strong, Placeholder, Table } from "@/components/legal/LegalPage";

// ─────────────────────────────────────────────────────────────────────────────
// PLANTILLA — revisar y completar los campos marcados con ▸ antes de publicar
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Política de Privacidad · GastroShows",
  robots: "noindex",
};

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de Privacidad" updated="▸ [DD de mes de 2025]">

      {/* 1 ── RESPONSABLE */}
      <Section title="1. Responsable del tratamiento">
        <P>
          En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo
          (RGPD) y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
          Personales y garantía de los derechos digitales (LOPDGDD), le informamos de que
          el responsable del tratamiento de sus datos personales es:
        </P>
        <Ul>
          <Li><Strong>Denominación social:</Strong> <Placeholder>▸ [Razón social completa]</Placeholder></Li>
          <Li><Strong>CIF/NIF:</Strong> <Placeholder>▸ [CIF de la empresa]</Placeholder></Li>
          <Li><Strong>Domicilio social:</Strong> <Placeholder>▸ [Dirección completa, ciudad, CP]</Placeholder></Li>
          <Li><Strong>Correo electrónico de contacto RGPD:</Strong> <Placeholder>▸ [privacidad@gastroshows.com]</Placeholder></Li>
          <Li><Strong>Teléfono:</Strong> <Placeholder>▸ [+34 XXX XXX XXX]</Placeholder></Li>
        </Ul>
      </Section>

      {/* 2 ── QUÉ DATOS */}
      <Section title="2. ¿Qué datos personales tratamos?">
        <P>Tratamos los siguientes datos personales según el contexto en que se facilitan:</P>

        <P><Strong>a) Reserva de experiencia gastronómica</Strong></P>
        <Ul>
          <Li>Nombre y apellidos</Li>
          <Li>Dirección de correo electrónico</Li>
          <Li>Número de teléfono</Li>
          <Li>Número de comensales</Li>
          <Li>Alergias e intolerancias alimentarias (dato de salud — categoría especial)</Li>
          <Li>Comentarios adicionales que el usuario decida facilitar</Li>
          <Li>Si es cliente recurrente (marcado voluntariamente por el usuario)</Li>
        </Ul>

        <P><Strong>b) Compra de vale regalo</Strong></P>
        <Ul>
          <Li>Nombre, email y teléfono del comprador</Li>
          <Li>Email del destinatario del vale (solo si el comprador elige enviarlo directamente)</Li>
        </Ul>

        <P><Strong>c) Canjeo de vale regalo</Strong></P>
        <Ul>
          <Li>Nombre, email y teléfono del titular del vale (beneficiario)</Li>
          <Li>Alergias e intolerancias alimentarias</Li>
          <Li>Comentarios adicionales</Li>
        </Ul>

        <P><Strong>d) Contacto de empresa (eventos privados)</Strong></P>
        <Ul>
          <Li>Nombre y apellidos del contacto</Li>
          <Li>Email y teléfono</Li>
          <Li>CIF y denominación social <Placeholder>▸ [si se facilita para facturación]</Placeholder></Li>
          <Li>Dirección fiscal</Li>
        </Ul>

        <P><Strong>e) Datos recogidos automáticamente</Strong></P>
        <Ul>
          <Li>Dirección IP y datos de navegación (mediante cookies — véase apartado 9)</Li>
          <Li>Datos de comportamiento en la web (páginas visitadas, tiempo de sesión, conversiones)</Li>
        </Ul>

        <P>
          <Strong>Datos de salud:</Strong> Las alergias e intolerancias alimentarias son datos
          especialmente protegidos (art. 9 RGPD). Se recogen exclusivamente para garantizar
          la seguridad alimentaria del comensal y no se utilizan con ninguna otra finalidad.
        </P>
      </Section>

      {/* 3 ── FINALIDADES Y BASE JURÍDICA */}
      <Section title="3. Finalidades del tratamiento y base jurídica">
        <P>
          Tratamos sus datos para las siguientes finalidades, cada una amparada en la base
          jurídica indicada:
        </P>
        <Ul>
          <Li>
            <Strong>Gestión de la reserva</Strong> — tramitar, confirmar y gestionar su reserva
            de experiencia gastronómica, incluyendo la comunicación de detalles relevantes.
            Base jurídica: ejecución de un contrato (art. 6.1.b RGPD).
          </Li>
          <Li>
            <Strong>Comunicaciones previas a la experiencia</Strong> — envío de los mensajes
            preparatorios del ritual (D-4, D-3, D-2 y D-0), que forman parte de la experiencia
            contratada y son imprescindibles para su desarrollo.
            Base jurídica: ejecución de un contrato (art. 6.1.b RGPD).
          </Li>
          <Li>
            <Strong>Gestión del vale regalo</Strong> — emisión, envío y seguimiento del vale
            regalo, incluyendo el aviso al destinatario cuando el comprador así lo solicita.
            Base jurídica: ejecución de un contrato con el comprador (art. 6.1.b RGPD).
          </Li>
          <Li>
            <Strong>Facturación y obligaciones contables</Strong> — emisión de facturas y
            cumplimiento de obligaciones tributarias.
            Base jurídica: cumplimiento de una obligación legal (art. 6.1.c RGPD).
          </Li>
          <Li>
            <Strong>Comunicaciones de marketing post-visita</Strong> — envío de solicitudes de
            reseña, ofertas, descuentos y comunicaciones sobre futuras experiencias, únicamente
            a quienes hayan otorgado su consentimiento explícito al realizar la reserva.
            Base jurídica: consentimiento del interesado (art. 6.1.a RGPD). El consentimiento
            puede retirarse en cualquier momento sin que ello afecte a la licitud del
            tratamiento previo.
          </Li>
          <Li>
            <Strong>Análisis y mejora del servicio</Strong> — uso de herramientas de analítica
            web y mapas de calor para mejorar la experiencia del usuario, previa aceptación
            de cookies analíticas.
            Base jurídica: consentimiento (art. 6.1.a RGPD).
          </Li>
          <Li>
            <Strong>Publicidad digital</Strong> — uso de píxeles de conversión para medir
            la eficacia de campañas publicitarias (Google Ads, Meta, TikTok, LinkedIn),
            previa aceptación de cookies publicitarias.
            Base jurídica: consentimiento (art. 6.1.a RGPD).
          </Li>
        </Ul>
        <P>
          No tomamos decisiones automatizadas ni elaboramos perfiles que produzcan efectos
          jurídicos significativos sobre los interesados.
        </P>
      </Section>

      {/* 4 ── DESTINATARIOS */}
      <Section title="4. Destinatarios y encargados del tratamiento">
        <P>
          Sus datos no se ceden a terceros salvo obligación legal. No obstante, para prestar
          el servicio utilizamos los siguientes proveedores que actúan como encargados del
          tratamiento, con los que mantenemos el correspondiente contrato de encargo (DPA):
        </P>
        <Ul>
          <Li>
            <Strong>Supabase Inc.</Strong> (Estados Unidos) — alojamiento de la base de datos.
            Transferencia internacional amparada en las Cláusulas Contractuales Tipo (CCT)
            aprobadas por la Comisión Europea.
          </Li>
          <Li>
            <Strong>Mailrelay / CPC Servicios Informáticos S.L.</Strong> (España) — plataforma
            de envío de emails de marketing. Solo recibe datos de usuarios que han dado
            consentimiento para comunicaciones de marketing.
          </Li>
          <Li>
            <Strong><Placeholder>▸ [Proveedor SMTP / email transaccional]</Placeholder></Strong> — envío de
            emails transaccionales (confirmaciones, mensajes del ritual).
          </Li>
          <Li>
            <Strong>Vercel Inc.</Strong> (Estados Unidos) — alojamiento de la aplicación web.
            Transferencia amparada en CCT.
          </Li>
          <Li>
            <Strong>Google LLC</Strong> (Estados Unidos) — Google Analytics 4, Google Tag
            Manager y Google Ads (previa aceptación de cookies). Transferencia amparada en
            el marco EU–US Data Privacy Framework.
          </Li>
          <Li>
            <Strong>Meta Platforms Ireland Ltd.</Strong> (Irlanda/EE.UU.) — Meta Pixel
            (previa aceptación de cookies). Transferencia amparada en CCT.
          </Li>
          <Li>
            <Strong>TikTok Technology Ltd.</Strong> (Irlanda/EE.UU.) — TikTok Pixel
            (previa aceptación de cookies). Transferencia amparada en CCT.
          </Li>
          <Li>
            <Strong>LinkedIn Ireland Unlimited Company</Strong> (Irlanda) — LinkedIn Insight
            Tag (previa aceptación de cookies). Transferencia amparada en CCT.
          </Li>
          <Li>
            <Strong>Hotjar Ltd.</Strong> (Malta) — mapas de calor y grabación de sesiones
            (previa aceptación de cookies).
          </Li>
          <Li>
            <Strong><Placeholder>▸ [Pasarela de pago, si aplica]</Placeholder></Strong> —
            procesamiento de pagos. No almacenamos datos de tarjeta.
          </Li>
        </Ul>
      </Section>

      {/* 5 ── PLAZO DE CONSERVACIÓN */}
      <Section title="5. Plazo de conservación">
        <Ul>
          <Li>
            <Strong>Datos de reserva:</Strong> se conservan durante <Placeholder>▸ [3 años]</Placeholder> desde
            la fecha de la experiencia, plazo necesario para atender posibles reclamaciones y
            cumplir con obligaciones fiscales.
          </Li>
          <Li>
            <Strong>Datos de facturación:</Strong> 5 años (art. 66 de la Ley General Tributaria).
          </Li>
          <Li>
            <Strong>Datos de marketing:</Strong> hasta que el interesado retire su consentimiento
            o, en todo caso, transcurridos <Placeholder>▸ [2 años]</Placeholder> sin actividad
            o reserva del usuario.
          </Li>
          <Li>
            <Strong>Datos de vales regalo:</Strong> hasta 6 meses después de la fecha de
            vencimiento del vale o hasta que se canjee, lo que ocurra antes.
          </Li>
          <Li>
            <Strong>Alergias:</Strong> se conservan junto con los datos de reserva y se eliminan
            en el mismo plazo.
          </Li>
          <Li>
            <Strong>Logs del sistema:</Strong> <Placeholder>▸ [30 días]</Placeholder> de forma automática.
          </Li>
        </Ul>
        <P>
          Transcurridos los plazos indicados, los datos se eliminarán o anonimizarán de
          manera que no sea posible identificar al interesado.
        </P>
      </Section>

      {/* 6 ── DERECHOS */}
      <Section title="6. Derechos de los interesados">
        <P>En cualquier momento puede ejercer los siguientes derechos:</P>
        <Ul>
          <Li><Strong>Acceso:</Strong> conocer qué datos suyos tratamos.</Li>
          <Li><Strong>Rectificación:</Strong> corregir datos inexactos o incompletos.</Li>
          <Li><Strong>Supresión («derecho al olvido»):</Strong> solicitar que eliminemos sus datos cuando ya no sean necesarios para los fines para los que fueron recogidos.</Li>
          <Li><Strong>Oposición:</Strong> oponerse al tratamiento para fines de marketing en cualquier momento.</Li>
          <Li><Strong>Limitación del tratamiento:</Strong> solicitar que suspendamos temporalmente el tratamiento de sus datos.</Li>
          <Li><Strong>Portabilidad:</Strong> recibir sus datos en un formato estructurado y legible por máquina.</Li>
          <Li><Strong>Retirada del consentimiento:</Strong> retirar en cualquier momento el consentimiento dado para marketing u otras finalidades basadas en el consentimiento, sin que ello afecte a la licitud del tratamiento anterior.</Li>
        </Ul>
        <P>
          Para ejercer cualquiera de estos derechos, envíe su solicitud por correo electrónico
          a <Placeholder>▸ [privacidad@gastroshows.com]</Placeholder>, indicando su nombre,
          correo electrónico con el que realizó la reserva, y el derecho que desea ejercer.
          Responderemos en el plazo máximo de 30 días.
        </P>
        <P>
          Si considera que el tratamiento de sus datos no es conforme a la normativa, puede
          presentar una reclamación ante la <Strong>Agencia Española de Protección de
          Datos (AEPD)</Strong>: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" style={{ color: "#C8A96E" }}>www.aepd.es</a>.
        </P>
      </Section>

      {/* 7 ── MENORES */}
      <Section title="7. Menores de edad">
        <P>
          El servicio de GastroShows está dirigido exclusivamente a mayores de 18 años.
          No recogemos conscientemente datos personales de menores. Si detectamos que hemos
          recogido datos de un menor sin consentimiento parental, los eliminaremos
          inmediatamente. Si usted es padre, madre o tutor y cree que un menor nos ha
          facilitado datos, contáctenos en <Placeholder>▸ [privacidad@gastroshows.com]</Placeholder>.
        </P>
      </Section>

      {/* 8 ── SEGURIDAD */}
      <Section title="8. Medidas de seguridad">
        <P>
          Aplicamos medidas técnicas y organizativas adecuadas para proteger sus datos
          personales frente a accesos no autorizados, pérdida, destrucción o alteración:
        </P>
        <Ul>
          <Li>Cifrado de las comunicaciones mediante HTTPS/TLS.</Li>
          <Li>Contraseñas de usuario almacenadas con función de hash (bcrypt).</Li>
          <Li>Acceso a los datos personales restringido al personal autorizado con credenciales individuales.</Li>
          <Li>Base de datos alojada en infraestructura con acceso restringido y auditorías de seguridad periódicas.</Li>
          <Li>Copias de seguridad automáticas cifradas.</Li>
        </Ul>
      </Section>

      {/* 9 ── COOKIES */}
      <Section title="9. Política de cookies">
        <P>
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo
          cuando visita nuestra web. Las utilizamos para el correcto funcionamiento del
          sitio, analizar su uso y mostrarte publicidad relevante en otras plataformas.
        </P>

        <P><Strong>Cookies estrictamente necesarias</Strong> (no requieren consentimiento)</P>
        <Table rows={[
          ["Sesión de usuario (next-auth)", "Autenticación en el panel de administración", "Sesión"],
          ["__Host-next-auth.csrf-token", "Protección contra CSRF", "Sesión"],
        ]} />

        <P><Strong>Cookies analíticas y de rendimiento</Strong> (requieren consentimiento)</P>
        <Table rows={[
          ["Google Analytics 4 (_ga, _ga_*)", "Analítica de tráfico web (páginas visitadas, sesiones, conversiones)", "2 años"],
          ["Google Tag Manager", "Gestión y disparo de etiquetas de seguimiento", "Sesión"],
          ["Hotjar (_hjid, _hjSession*)", "Mapas de calor, grabación de sesiones y formularios", "1 año"],
        ]} />

        <P><Strong>Cookies publicitarias</Strong> (requieren consentimiento)</P>
        <Table rows={[
          ["Google Ads (_gcl_au)", "Seguimiento de conversiones de campañas de Google", "90 días"],
          ["Meta Pixel (_fbp, _fbc)", "Seguimiento de conversiones y remarketing en Facebook/Instagram", "90 días"],
          ["TikTok Pixel (_ttp, tt_pageview)", "Seguimiento de conversiones en TikTok", "13 meses"],
          ["LinkedIn Insight Tag (li_fat_id, lidc)", "Seguimiento de conversiones y remarketing en LinkedIn", "30 días / 1 año"],
        ]} />

        <P>
          Puede gestionar o retirar su consentimiento en cualquier momento haciendo clic
          en el enlace &ldquo;Gestionar cookies&rdquo; <Placeholder>▸ [enlace al banner de cookies]</Placeholder>{" "}
          disponible en cualquier página de la web. También puede configurar su navegador
          para bloquear o eliminar cookies, aunque esto puede afectar al funcionamiento del
          sitio.
        </P>
        <P>
          Para más información sobre las cookies de terceros, consulte las políticas de
          privacidad de Google, Meta, TikTok, LinkedIn y Hotjar.
        </P>
      </Section>

      {/* 10 ── MODIFICACIONES */}
      <Section title="10. Modificaciones de esta política">
        <P>
          Podemos actualizar esta Política de Privacidad para reflejar cambios en nuestras
          prácticas o en la normativa aplicable. Cuando lo hagamos, actualizaremos la fecha
          de &ldquo;Última actualización&rdquo; al inicio de este documento. Si los cambios son
          significativos, le informaremos por email o mediante un aviso destacado en la web.
          Le recomendamos que revise esta política periódicamente.
        </P>
      </Section>

    </LegalPage>
  );
}
