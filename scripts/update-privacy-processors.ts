/**
 * Script to update Privacy Policy with actual processor information
 * Run with: npx tsx scripts/update-privacy-processors.ts
 */

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env.local") });

async function updatePrivacyProcessors() {
  const { prisma } = await import("@/lib/prisma");

  try {
    console.log("Updating Privacy Policy with processor information...\n");

    // Find the privacy page
    const privacyPage = await prisma.page.findUnique({
      where: { slug: "privacidad" },
      include: { blocks: true },
    });

    if (!privacyPage) {
      throw new Error("Privacy Policy page not found. Run create-legal-pages.ts first.");
    }

    // Delete old blocks
    await prisma.pageBlock.deleteMany({
      where: { pageId: privacyPage.id },
    });

    // Create updated blocks with processor information
    const updatedPage = await prisma.page.update({
      where: { slug: "privacidad" },
      data: {
        blocks: {
          create: [
            {
              type: "TEXT",
              order: 0,
              content: {
                text: "Política de Privacidad",
                alignment: "left",
                color: "#1f2937",
                fontSize: "32px",
                fontWeight: "bold",
              },
            },
            {
              type: "TEXT",
              order: 1,
              content: {
                text: `Última actualización: ${new Date().toLocaleDateString("es-ES")}`,
                alignment: "left",
                color: "#6b7280",
                fontSize: "14px",
              },
            },
            {
              type: "TEXT",
              order: 2,
              content: {
                text: "1. RESPONSABLE DEL TRATAMIENTO\n\nDenominación social: [NOMBRE_EMPRESA]\nNIF: [NIF]\nDomicilio: [DOMICILIO_COMPLETO]\nCorreo electrónico: [EMAIL_CONTACTO]\nTeléfono: [TELEFONO]\n\n[NOMBRE_EMPRESA] (en adelante, \"el Responsable\") es el responsable del tratamiento de los datos personales que usted nos proporciona.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 3,
              content: {
                text: "2. FINALIDADES DEL TRATAMIENTO\n\nTratamos sus datos personales para las siguientes finalidades:\n\na) Gestión de reservas y citas\nb) Envío de confirmaciones y recordatorios\nc) Comunicaciones comerciales y promocionales\nd) Cumplimiento de obligaciones legales\ne) Mejora de nuestros servicios\nf) Prevención del fraude y seguridad de la plataforma\ng) Análisis estadístico de uso del sitio\nh) Atención al cliente y resolución de incidencias",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 4,
              content: {
                text: "3. BASE JURÍDICA DEL TRATAMIENTO\n\nTratamos sus datos en base a las siguientes bases legales:\n\na) Consentimiento del interesado (Art. 6.1.a RGPD) para comunicaciones comerciales\nb) Ejecución de un contrato (Art. 6.1.b RGPD) para gestionar sus reservas\nc) Cumplimiento de obligaciones legales (Art. 6.1.c RGPD)\nd) Intereses legítimos (Art. 6.1.f RGPD) para mejora de servicios y prevención del fraude",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 5,
              content: {
                text: "4. DESTINATARIOS Y PROCESADORES DE LOS DATOS\n\n4.1 PROCESADORES DE DATOS (tratamiento en nuestro nombre)\n\nLos siguientes procesadores tratan sus datos personales en nombre de [NOMBRE_EMPRESA]:\n\n**VERCEL (Hosting y Servidor)\n• Empresa: Vercel Inc.\n• Ubicación: Estados Unidos (servidores en UE posibles)\n• Función: Alojamiento de la plataforma web\n• Datos procesados: Todos (necesario para prestar servicio)\n• Status DPA: Standard Contractual Clauses (SCC) aplicables\n• Política privacidad: https://vercel.com/legal/privacy\n\n**GOOGLE ANALYTICS (Análisis de uso)\n• Empresa: Google LLC\n• Ubicación: Estados Unidos\n• Función: Análisis de comportamiento de usuarios\n• Datos procesados: Navegación, dispositivo, ubicación aproximada (IP anonimizada)\n• Status DPA: Data Processing Agreement incluido en contratos Google\n• Política privacidad: https://policies.google.com/privacy\n• Protecciones: IP parcialmente enmascarada, sin identificación personal\n\n**MAILRELAY (Comunicaciones por Email)\n• Empresa: Mailrelay GmbH\n• Ubicación: Alemania/UE\n• Función: Envío de confirmaciones, recordatorios, newsletters\n• Datos procesados: Email, nombre, preferencias de comunicación\n• Status DPA: En proceso de firma\n• Política privacidad: https://mailrelay.com/privacy\n• Restricción: No almacena datos, solo los reenvía\n\n**REDSYS (Procesador de Pagos)\n• Empresa: Redsys, Servicios de Procesamiento y Pagos SL\n• Ubicación: España\n• Función: Procesamiento seguro de pagos y transacciones\n• Datos procesados: Nombre, email, monto, referencia transacción\n• Status DPA: Cumplimiento PCI-DSS, DPA en proceso\n• Política privacidad: https://www.redsys.es/eses/privacidad\n• Restricción: NO almacena datos de tarjeta completos (PCI-DSS compliance)\n• Encriptación: 3DSecure, TLS\n\n4.2 COMUNICACIÓN A OTROS RESPONSABLES\n\nNo realizamos cesión de datos a terceros como responsables independientes, excepto:\n• Cuando la ley lo requiere\n• Con su consentimiento explícito\n• Para responder a demandas judiciales",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 6,
              content: {
                text: "5. PLAZO DE CONSERVACIÓN DE DATOS\n\nConservaremos sus datos personales durante el tiempo necesario para cumplir con las finalidades indicadas:\n\n- Datos de contacto y transacciones: mínimo 3 años por obligaciones contables y fiscales\n- Datos de comunicaciones: mientras sea necesario para mantener la relación comercial\n- Datos de navegación (analytics): máximo 2 años\n- Datos de incidencias de seguridad: 3 años conforme a obligaciones legales\n- Emails de newsletters: hasta que se dé de baja o 2 años de inactividad\n\nTranscurrido este plazo, los datos serán eliminados o anonimizados, salvo que la ley establezca un plazo mayor de conservación.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 7,
              content: {
                text: "6. DERECHOS DEL TITULAR DE LOS DATOS\n\nUsted tiene derecho a:\n\na) ACCESO: Solicitar acceso a los datos personales que tratamos sobre usted\nb) RECTIFICACIÓN: Solicitar la corrección de datos inexactos o incompletos\nc) SUPRESIÓN (derecho al olvido): Solicitar la eliminación de sus datos\nd) LIMITACIÓN DE TRATAMIENTO: Solicitar que limitemos el uso de sus datos\ne) PORTABILIDAD: Recibir sus datos en formato estructurado\nf) OPOSICIÓN: Oponerse al tratamiento de sus datos para fines concretos\ng) REVOCACIÓN DE CONSENTIMIENTO: Retirar el consentimiento otorgado\n\nPara ejercer estos derechos, contáctenos en [EMAIL_CONTACTO]",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 8,
              content: {
                text: "7. SEGURIDAD DE LOS DATOS\n\nImplementamos medidas técnicas y organizativas adecuadas para proteger sus datos frente a acceso no autorizado, alteración, pérdida o tratamiento ilícito:\n\n- Encriptación TLS/HTTPS para transmisión de datos en tránsito\n- Almacenamiento seguro en PostgreSQL en Vercel (encriptado en reposo)\n- Acceso restringido a datos basado en roles (Admin, Marketing solamente)\n- Autenticación de dos factores para administradores\n- Auditorías de seguridad periódicas\n- Política de copias de seguridad (rotación cada 30 días)\n- Cumplimiento con estándares de seguridad de la industria\n- Procesador de pagos Redsys cumple PCI-DSS nivel máximo\n- Monitoreo de accesos sospechosos\n- Documentación de procedimientos de seguridad",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 9,
              content: {
                text: "8. COOKIES Y SEGUIMIENTO\n\nUtilizamos cookies para:\n\n- Funcionalidad del sitio (cookies esenciales - sin consentimiento)\n- Análisis de uso (Google Analytics - requiere consentimiento)\n- Preferencias de usuario\n- Seguridad y protección contra fraude\n\nConsulte nuestra Política de Cookies (https://[DOMINIO_WEB]/politica-cookies) para información detallada sobre:\n• Tipos de cookies utilizadas\n• Cómo gestionar preferencias\n• Derechos de los usuarios respecto a cookies",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 10,
              content: {
                text: "9. TRANSFERENCIAS INTERNACIONALES\n\n**Google Analytics y Vercel (Estados Unidos)**\nAlgunos procesadores tienen servidores en Estados Unidos. Para proteger sus datos:\n\n• Google y Vercel han implementado Standard Contractual Clauses (SCC)\n• Se han realizado Transfer Impact Assessments documentados\n• Los datos están encriptados en tránsito y en reposo\n• Se han implementado protecciones adicionales según jurisprudencia ECJ\n\n**RGPD Artículos 44-49: Protecciones de transferencias**\nConforme a lo establecido en el RGPD, hemos verificado que los destinos de transferencia cuentan con protecciones adecuadas.\n\n**Su derecho a optar**\nPuede rechazar cookies de análisis (Google Analytics) para no ser rastreado en USA. El sitio seguirá funcionando normalmente.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 11,
              content: {
                text: "10. RECLAMACIONES Y PROCEDIMIENTO DE EJERCICIO DE DERECHOS\n\n**Contacto para ejercer derechos o hacer reclamaciones:**\n\nCorreo electrónico: [EMAIL_CONTACTO]\nTeléfono: [TELEFONO]\nDirección: [DOMICILIO_COMPLETO]\nFormulario: [URL_FORMULARIO_CONTACTO]\n\n**Plazo de respuesta:** 30 días desde recepción\n\n**Si considera vulnerados sus derechos:**\n\nPuede presentar una reclamación ante la Autoridad de Protección de Datos de su país:\n\n- ESPAÑA: Agencia Española de Protección de Datos (AEPD)\n  Web: www.aepd.es\n  Teléfono: 901 100 099\n  Dirección: C/ Jorge Juan, 6, 28001 Madrid",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 12,
              content: {
                text: "11. CAMBIOS EN ESTA POLÍTICA\n\nNos reservamos el derecho a modificar esta Política de Privacidad en cualquier momento. Los cambios serán notificados mediante:\n\n• Envío de un correo electrónico a usuarios registrados\n• Mostrar un aviso prominente en nuestro sitio web\n• Solicitar nuevo consentimiento si hay cambios materiales\n\nSe recomienda revisar esta política regularmente. Su uso continuado del sitio implica aceptación de cambios.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 13,
              content: {
                text: "12. NORMATIVA APLICABLE\n\nEsta Política de Privacidad cumple con:\n\n• Reglamento (UE) 2016/679 (RGPD)\n• Ley Orgánica 3/2018 de Protección de Datos (LOPDGDD)\n• Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE)\n• Directivas europeas de privacidad y ePrivacy\n• Código Civil español",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
          ],
        },
      },
      include: { blocks: true },
    });

    console.log(`✓ Privacy Policy updated with processor information\n`);
    console.log("📋 PROCESADORES DOCUMENTADOS:");
    console.log("  • Vercel (Hosting) - USA");
    console.log("  • Google Analytics (Analytics) - USA");
    console.log("  • Mailrelay (Email) - EU");
    console.log("  • Redsys (Payments) - Spain\n");
  } catch (error) {
    console.error("✗ Error updating privacy policy:", error);
    process.exit(1);
  } finally {
    const { prisma: p } = await import("@/lib/prisma");
    await p.$disconnect();
  }
}

updatePrivacyProcessors();
