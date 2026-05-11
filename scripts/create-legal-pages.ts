/**
 * Script to create legal pages (Privacy Policy, Terms, Legal Notice)
 * Run with: npx tsx scripts/create-legal-pages.ts
 */

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env.local") });

async function createLegalPages() {
  const { prisma } = await import("@/lib/prisma");

  try {
    console.log("Creating legal pages...\n");

    // Privacy Policy
    const privacyPolicy = await prisma.page.upsert({
      where: { slug: "privacidad" },
      update: {},
      create: {
        title: "Política de Privacidad",
        slug: "privacidad",
        published: true,
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
                text: "4. DESTINATARIOS DE LOS DATOS\n\nSus datos personales serán comunicados a:\n\na) Proveedores de hosting y servidores de datos (necesario para prestar el servicio)\nb) Plataformas de pago (para procesar transacciones)\nc) Autoridades públicas cuando sea requerido por ley\nd) Otros responsables de tratamiento cuando sea necesario para cumplir con nuestros servicios\n\nNo realizamos transferencias de datos a terceros países fuera del EEE sin las garantías necesarias establecidas en el RGPD.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 6,
              content: {
                text: "5. PLAZO DE CONSERVACIÓN DE DATOS\n\nConservaremos sus datos personales durante el tiempo necesario para cumplir con las finalidades indicadas:\n\n- Datos de contacto y transacciones: mínimo 3 años por obligaciones contables y fiscales\n- Datos de comunicaciones: mientras sea necesario para mantener la relación comercial\n- Datos de navegación: máximo 1 año para fines analíticos\n- Datos de incidencias de seguridad: 3 años conforme a obligaciones legales\n\nTranscurrido este plazo, los datos serán eliminados o anonimizados, salvo que la ley establezca un plazo mayor de conservación.",
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
                text: "7. SEGURIDAD DE LOS DATOS\n\nImplementamos medidas técnicas y organizativas adecuadas para proteger sus datos frente a acceso no autorizado, alteración, pérdida o tratamiento ilícito:\n\n- Encriptación TLS para transmisión de datos\n- Acceso restringido a datos basado en roles\n- Autenticación de dos factores para administradores\n- Auditorías de seguridad periódicas\n- Política de copias de seguridad\n- Cumplimiento con estándares de seguridad de la industria",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 9,
              content: {
                text: "8. COOKIES\n\nUtilizamos cookies para:\n\n- Funcionalidad del sitio (cookies esenciales)\n- Análisis de uso (Google Analytics)\n- Preferencias de usuario\n- Publicidad personalizada (si consiente)\n\nPuede gestionar sus preferencias de cookies en el consentimiento de cookies de esta web.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 10,
              content: {
                text: "9. RECLAMACIONES\n\nSi considera que sus derechos han sido vulnerados, puede presentar una reclamación ante la Autoridad de Protección de Datos de su país:\n\n- ESPAÑA: Agencia Española de Protección de Datos (AEPD) - www.aepd.es\n\nTambién puede ejercer sus derechos directamente dirigiéndose a [EMAIL_CONTACTO]",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 11,
              content: {
                text: "10. CAMBIOS EN ESTA POLÍTICA\n\nNos reservamos el derecho a modificar esta Política de Privacidad en cualquier momento. Los cambios serán notificados mediante el envío de un correo electrónico y/o el mostrar un aviso prominente en nuestro sitio web.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
          ],
        },
      },
    });

    console.log(`✓ Privacy Policy created: ${privacyPolicy.slug}`);

    // Terms and Conditions
    const termsConditions = await prisma.page.upsert({
      where: { slug: "terminos-condiciones" },
      update: {},
      create: {
        title: "Términos y Condiciones de Uso",
        slug: "terminos-condiciones",
        published: true,
        blocks: {
          create: [
            {
              type: "TEXT",
              order: 0,
              content: {
                text: "Términos y Condiciones de Uso",
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
                text: "1. IDENTIFICACIÓN Y CONDICIONES GENERALES\n\n1.1 Prestador de servicios:\nDenominación social: [NOMBRE_EMPRESA]\nNIF: [NIF]\nDomicilio: [DOMICILIO_COMPLETO]\nCorreo electrónico: [EMAIL_CONTACTO]\nTeléfono: [TELEFONO]\nRegistro Mercantil: [DATOS_REGISTRO_MERCANTIL]\n\n1.2 Objeto:\nEstos Términos y Condiciones (\"Términos\") regulan el acceso y uso del sitio web [DOMINIO_WEB] y de todos los servicios que proporciona [NOMBRE_EMPRESA] (\"el Prestador\"), incluyendo la plataforma de reservas y gestión de eventos.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 3,
              content: {
                text: "2. ACEPTACIÓN DE LOS TÉRMINOS\n\nAl acceder y utilizar este sitio web, usted acepta plenamente estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, le recomendamos que no continúe utilizando el servicio.\n\nNos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación. Su uso continuado del sitio implica su aceptación de los términos modificados.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 4,
              content: {
                text: "3. DESCRIPCIÓN DE SERVICIOS\n\n[NOMBRE_EMPRESA] proporciona una plataforma digital para:\n\n- Consulta y exploración de experiencias gastronómicas\n- Realización de reservas para eventos y servicios\n- Gestión de perfiles de usuario\n- Comunicación con el prestador de servicios\n- Procesamiento de pagos\n\nLa prestación de estos servicios está sujeta a disponibilidad y a las condiciones específicas de cada reserva.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 5,
              content: {
                text: "4. REQUISITOS PARA EL USO\n\n4.1 Capacidad legal: Solo personas mayores de 18 años o con capacidad legal pueden utilizar los servicios.\n\n4.2 Información verificada: Al crear una cuenta, se compromete a proporcionar información verídica, exacta y completa.\n\n4.3 Responsabilidad de la cuenta: Usted es responsable de mantener la confidencialidad de su contraseña y es responsable de todas las actividades que ocurran bajo su cuenta.\n\n4.4 Uso legítimo: Acepta utilizar los servicios únicamente para propósitos legítimos y no para:\n- Fraude o actividades ilegales\n- Violación de derechos de terceros\n- Envío de virus o código malicioso\n- Interferencia con funcionamiento del sitio",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 6,
              content: {
                text: "5. POLÍTICA DE RESERVAS Y CANCELACIÓN\n\n5.1 Efectividad: Una reserva se considera efectiva cuando se ha pagado y usted ha recibido confirmación por correo electrónico.\n\n5.2 Cancelación: El usuario puede cancelar su reserva conforme a la política específica de cada evento:\n- Las cancelaciones realizadas con [DIAS_CANCELACION] días o más de anticipación recibirán reembolso completo\n- Las cancelaciones con menos [DIAS_CANCELACION_PARCIAL] días tendrán una penalización\n- Las cancelaciones [DIAS_CANCELACION_NO_REEMBOLSO] días antes del evento no serán reembolsadas\n\n5.3 Modificaciones: Cambios en la reserva están sujetos a disponibilidad y pueden incurrir en costos adicionales.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 7,
              content: {
                text: "6. POLÍTICA DE PAGOS\n\n6.1 Aceptación de pagos: [NOMBRE_EMPRESA] acepta pagos a través de [METODOS_PAGO: tarjeta de crédito, transferencia bancaria, billeteras digitales].\n\n6.2 Procesamiento: Los pagos serán procesados a través de procesadores de pago autorizados que cumplen con los estándares PCI-DSS.\n\n6.3 Precios: Los precios mostrados incluyen/excluyen impuestos según se indique. Pueden cambiar sin previo aviso.\n\n6.4 Reembolsos: Se procesarán dentro de [DIAS_REEMBOLSO] días hábiles a la cuenta de origen.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 8,
              content: {
                text: "7. LIMITACIÓN DE RESPONSABILIDAD\n\n7.1 [NOMBRE_EMPRESA] proporciona los servicios \"tal cual\" sin garantías de ningún tipo, ya sean expresas o implícitas.\n\n7.2 En la máxima medida permitida por la ley, [NOMBRE_EMPRESA] no será responsable de:\n- Daños indirectos, incidentales, especiales o consecuentes\n- Pérdida de datos, ingresos u oportunidades\n- Fallos técnicos o interrupciones del servicio\n- Acciones de terceros\n\n7.3 La responsabilidad máxima de [NOMBRE_EMPRESA] no excederá el monto total pagado por los servicios en los últimos 12 meses.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 9,
              content: {
                text: "8. PROPIEDAD INTELECTUAL\n\n8.1 Contenido: Todo el contenido del sitio web (texto, imágenes, gráficos, logotipos) es propiedad intelectual de [NOMBRE_EMPRESA] o sus proveedores.\n\n8.2 Licencia limitada: Se le otorga una licencia limitada y no transferible para acceder y usar el contenido para fines personales.\n\n8.3 Restricciones: Está prohibido:\n- Reproducir o distribuir sin autorización\n- Crear obras derivadas\n- Utilizar para propósitos comerciales\n- Remover referencias de propiedad intelectual",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 10,
              content: {
                text: "9. ENLACES EXTERNOS\n\n[NOMBRE_EMPRESA] puede incluir enlaces a sitios web de terceros. No somos responsables de:\n- Contenido de sitios externos\n- Disponibilidad de enlaces\n- Prácticas de privacidad de terceros\n- Daños causados por acceso a sitios externos\n\nLa inclusión de un enlace no implica aprobación del contenido.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 11,
              content: {
                text: "10. LEY APLICABLE Y JURISDICCIÓN\n\n10.1 Ley aplicable: Estos Términos se rigen por la ley española, específicamente por:\n- Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE)\n- Ley Orgánica 3/2018 de Protección de Datos (LOPDGDD)\n- Reglamento (UE) 2016/679 (RGPD)\n- Código Civil español\n\n10.2 Jurisdicción: Ambas partes se someten a los juzgados y tribunales competentes de [PROVINCIA_COMPETENCIA].",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 12,
              content: {
                text: "11. CONTACTO Y SOPORTE\n\nPara consultas, reclamaciones o soporte:\n\nCorreo electrónico: [EMAIL_CONTACTO]\nTeléfono: [TELEFONO]\nFormulario: [URL_FORMULARIO_CONTACTO]\nHorario de atención: [HORARIO_ATENCION]",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
          ],
        },
      },
    });

    console.log(`✓ Terms and Conditions created: ${termsConditions.slug}`);

    // Legal Notice
    const legalNotice = await prisma.page.upsert({
      where: { slug: "aviso-legal" },
      update: {},
      create: {
        title: "Aviso Legal",
        slug: "aviso-legal",
        published: true,
        blocks: {
          create: [
            {
              type: "TEXT",
              order: 0,
              content: {
                text: "Aviso Legal",
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
                text: "1. IDENTIFICACIÓN DEL PRESTADOR\n\nConforme a lo establecido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE):\n\nDenominación social: [NOMBRE_EMPRESA]\nNIF: [NIF]\nDomicilio social: [DOMICILIO_COMPLETO]\nTeléfono: [TELEFONO]\nCorreo electrónico: [EMAIL_CONTACTO]\nRegistro Mercantil: [DATOS_REGISTRO_MERCANTIL]\nCIF: [CIF_EMPRESA]",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 3,
              content: {
                text: "2. OBJETO\n\nEste sitio web tiene como objeto la prestación de servicios de:\n\n- Plataforma de reservas para eventos gastronómicos\n- Información sobre servicios y experiencias culinarias\n- Gestión de perfiles de usuario\n- Procesamiento de pagos\n\nEl acceso a este sitio web es de carácter voluntario.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 4,
              content: {
                text: "3. CONDICIONES DE ACCESO Y USO\n\nEl acceso a este sitio web otorga al usuario la condición de usuario del mismo y le obliga al cumplimiento de las presentes condiciones de uso.\n\n[NOMBRE_EMPRESA] se reserva el derecho a:\n- Modificar estas condiciones sin previo aviso\n- Restringir el acceso a ciertos usuarios\n- Interrumpir el servicio por mantenimiento\n- Rechazar o eliminar contenido que vulnere la ley\n\nEl usuario es responsable de asegurar que tiene acceso legal a este sitio web desde su ubicación.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 5,
              content: {
                text: "4. CONTENIDOS\n\n4.1 Exactitud: [NOMBRE_EMPRESA] hace esfuerzos razonables para asegurar la exactitud del contenido, pero no garantiza la completitud o exactitud.\n\n4.2 Responsabilidad: El usuario es responsable de:\n- Verificar la información antes de confiar en ella\n- Tomar sus propias decisiones basadas en dicha información\n- Soportar las consecuencias de sus acciones\n\n4.3 Derechos de propiedad intelectual: Todo el contenido está protegido por derechos de autor. Está prohibida su reproducción sin autorización.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 6,
              content: {
                text: "5. ENLACES A SITIOS EXTERNOS\n\n[NOMBRE_EMPRESA] no es responsable de:\n- Contenido de sitios enlazados\n- Disponibilidad de los mismos\n- Daños o pérdidas causadas por el acceso a terceros sitios\n\nLa inclusión de un enlace no implica aprobación del contenido del sitio enlazado.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 7,
              content: {
                text: "6. LIMITACIÓN DE RESPONSABILIDAD\n\n6.1 [NOMBRE_EMPRESA] proporciona este sitio web \"tal cual\" sin garantía alguna.\n\n6.2 No seremos responsables de:\n- Fallos técnicos o errores\n- Interrupciones del servicio\n- Pérdida de datos o transacciones\n- Daños directos, indirectos o consecuentes\n- Virus u otro código malicioso\n\n6.3 Responsabilidad máxima: La responsabilidad total de [NOMBRE_EMPRESA] no excederá el monto pagado por los servicios en los últimos 12 meses.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 8,
              content: {
                text: "7. PROTECCIÓN DE DATOS\n\nConforme a la Ley Orgánica 3/2018 (LOPDGDD) y al Reglamento (UE) 2016/679 (RGPD):\n\n- [NOMBRE_EMPRESA] es responsable del tratamiento de datos personales\n- Los datos serán tratados de forma lícita, leal y transparente\n- Se implementan medidas de seguridad técnicas y organizativas\n- Los usuarios tienen derechos de acceso, rectificación, supresión, etc.\n\nVer nuestra Política de Privacidad para más información.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 9,
              content: {
                text: "8. COOKIES\n\nEste sitio web utiliza cookies para:\n- Funcionalidad del sitio\n- Análisis de uso\n- Publicidad personalizada\n\nConsulte nuestra Política de Cookies para más información.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 10,
              content: {
                text: "9. MODIFICACIÓN DE ESTE AVISO\n\n[NOMBRE_EMPRESA] se reserva el derecho a modificar este Aviso Legal en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 11,
              content: {
                text: "10. LEY APLICABLE Y JURISDICCIÓN\n\nEste Aviso Legal se rige por las leyes españolas, sin considerar sus conflictos de disposiciones de ley.\n\nLos usuarios se someten a:\n- Ley 34/2002 (LSSI-CE)\n- Ley Orgánica 3/2018 (LOPDGDD)\n- Reglamento (UE) 2016/679 (RGPD)\n- Código Civil español\n\nJurisdicción: Juzgados y tribunales de [PROVINCIA_COMPETENCIA], España.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 12,
              content: {
                text: "11. CONTACTO\n\nPara cualquier consulta relativa a este Aviso Legal:\n\nCorreo electrónico: [EMAIL_CONTACTO]\nTeléfono: [TELEFONO]\nFormulario de contacto: [URL_FORMULARIO]\nAtención: [HORARIO_ATENCION]",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
          ],
        },
      },
    });

    console.log(`✓ Legal Notice created: ${legalNotice.slug}\n`);

    console.log("=== LEGAL PAGES SUMMARY ===\n");
    console.log("✓ Aviso Legal: /aviso-legal");
    console.log("✓ Política de Privacidad: /privacidad");
    console.log("✓ Términos y Condiciones: /terminos-condiciones");
    console.log("\n⚠️  IMPORTANT: Replace all placeholders with your actual data:\n");
    console.log("  [NOMBRE_EMPRESA] - Your company name");
    console.log("  [NIF] - Company tax ID");
    console.log("  [CIF_EMPRESA] - Company CIF");
    console.log("  [DOMICILIO_COMPLETO] - Full address");
    console.log("  [EMAIL_CONTACTO] - Contact email");
    console.log("  [TELEFONO] - Phone number");
    console.log("  [DOMINIO_WEB] - Your website domain");
    console.log("  [DATOS_REGISTRO_MERCANTIL] - Company registry data");
    console.log("  [PROVINCIA_COMPETENCIA] - Jurisdiction province");
    console.log("  [METODOS_PAGO] - Payment methods accepted");
    console.log("  [DIAS_CANCELACION] - Cancellation days (e.g., 30)");
    console.log("  [DIAS_CANCELACION_PARCIAL] - Partial refund days");
    console.log("  [DIAS_CANCELACION_NO_REEMBOLSO] - No refund days");
    console.log("  [DIAS_REEMBOLSO] - Refund processing days");
    console.log("  [URL_FORMULARIO_CONTACTO] - Contact form URL");
    console.log("  [URL_FORMULARIO] - Form URL");
    console.log("  [HORARIO_ATENCION] - Support hours");
  } catch (error) {
    console.error("✗ Error creating legal pages:", error);
    process.exit(1);
  } finally {
    const { prisma: p } = await import("@/lib/prisma");
    await p.$disconnect();
  }
}

createLegalPages();
