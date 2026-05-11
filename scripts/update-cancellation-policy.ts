/**
 * Script to update Terms and Conditions with specific cancellation policy
 * Run with: npx tsx scripts/update-cancellation-policy.ts
 */

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env.local") });

async function updateCancellationPolicy() {
  const { prisma } = await import("@/lib/prisma");

  try {
    console.log("Updating cancellation policy in Terms and Conditions...\n");

    // Find the terms page
    const termsPage = await prisma.page.findUnique({
      where: { slug: "terminos-condiciones" },
      include: { blocks: true },
    });

    if (!termsPage) {
      throw new Error("Terms and Conditions page not found. Run create-legal-pages.ts first.");
    }

    // Delete old blocks
    await prisma.pageBlock.deleteMany({
      where: { pageId: termsPage.id },
    });

    // Create updated blocks with new cancellation policy
    const updatedPage = await prisma.page.update({
      where: { slug: "terminos-condiciones" },
      data: {
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
                text: "1. IDENTIFICACIÓN Y CONDICIONES GENERALES\n\n1.1 Prestador de servicios:\nDenominación social: [NOMBRE_EMPRESA]\nNIF: [NIF]\nDomicilio: [DOMICILIO_COMPLETO]\nCorreo electrónico: [EMAIL_CONTACTO]\nTeléfono: [TELEFONO]\nRegistro Mercantil: [DATOS_REGISTRO_MERCANTIL]\n\n1.2 Objeto:\nEstos Términos y Condiciones (\"Términos\") regulan el acceso y uso del sitio web [DOMINIO_WEB] y de todos los servicios que proporciona [NOMBRE_EMPRESA] (\"el Prestador\"), incluyendo la plataforma de reservas y gestión de eventos gastronómicos.",
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
                text: "3. DESCRIPCIÓN DE SERVICIOS\n\n[NOMBRE_EMPRESA] proporciona una plataforma digital para:\n\n• Consulta y exploración de experiencias gastronómicas\n• Realización de reservas para eventos y servicios\n• Compra de regalos gastronómicos (gift cards/vales)\n• Gestión de perfiles de usuario\n• Comunicación con el prestador de servicios\n• Procesamiento de pagos\n\nLa prestación de estos servicios está sujeta a disponibilidad y a las condiciones específicas de cada reserva o compra.",
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
                text: "5. POLÍTICA DE RESERVAS, MODIFICACIONES Y CANCELACIÓN\n\n5.1 Efectividad de la reserva:\nUna reserva se considera efectiva cuando:\n• Se ha realizado el pago completo\n• Usted ha recibido confirmación por correo electrónico\n• El sistema ha procesado y validado los datos\n\n5.2 Modificación de reservas:\nLas reservas pueden MODIFICARSE (cambio de fecha, hora, número de comensales, etc.) ÚNICAMENTE si la solicitud de modificación se realiza con UN MÍNIMO DE 48 HORAS DE ANTICIPACIÓN respecto a la fecha y hora de la reserva.\n\nCondiciones:\n• La modificación debe estar disponible en el sistema\n• Se requiere confirmación por nuestra parte\n• Las modificaciones están sujetas a disponibilidad\n• Pueden incurrir en costos adicionales si aumenta el valor de la reserva\n• No se reembolsan diferenciales si disminuye el valor\n\n5.3 Cancelación de reservas:\nNO SE ADMITEN CANCELACIONES con menos de 48 HORAS DE ANTICIPACIÓN respecto a la fecha y hora de la reserva.\n\nSi solicita cancelación con menos de 48 horas:\n• La solicitud será RECHAZADA\n• Se le cobrará el 100% del importe\n• No recibirá reembolso\n\nSi desea no asistir, puede intentar modificar su reserva a otra fecha si lo solicita con tiempo suficiente.\n\n5.4 Política de reembolsos:\n[NOMBRE_EMPRESA] NO OFRECE REEMBOLSOS en ninguna circunstancia.\n\nEl importe pagado por su reserva es FINAL E IRREVOCABLE.\n\nSu única opción es MODIFICAR la reserva a otra fecha siempre que:\n• La solicitud se realice con MÍNIMO 48 HORAS de anticipación\n• Haya disponibilidad en la nueva fecha solicitada\n\nEXCEPCIONES que podrían dar lugar a reembolso (a discreción de [NOMBRE_EMPRESA]):\n• Cancelación por [NOMBRE_EMPRESA] del evento\n• Circunstancias extraordinarias documentadas (enfermedad grave, fallecimiento cercano, etc.)\n• Error administrativo atribuible a [NOMBRE_EMPRESA]\n\n5.5 No-shows (no presentación):\nSi no se presenta a su reserva sin cancelar previamente:\n• Perderá el 100% del importe pagado\n• No se ofrecerá reembolso ni crédito\n• Recomendamos cancelar con tiempo si sus planes cambian",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 7,
              content: {
                text: "6. POLÍTICA DE REGALOS GASTRONÓMICOS\n\n6.1 Validez de los regalos:\nTodos los regalos (gift cards, vales, créditos) comprados a través de [NOMBRE_EMPRESA] son válidos durante 6 MESES DESDE LA FECHA DE COMPRA.\n\nFecha de compra: La que figura en el comprobante/email de confirmación.\n\n6.2 Canje del regalo:\nPara utilizar un regalo:\n1. Acceda a su perfil de usuario\n2. Localice el regalo en la sección \"Mis regalos\"\n3. Seleccione una experiencia disponible\n4. Reserve con su código de regalo\n5. El valor se deducirá automáticamente\n\n6.3 Validez después de expiración:\nUna vez caducado el plazo de 6 meses:\n• El regalo EXPIRARÁ automáticamente\n• Perderá TODO valor y NO podrá ser canjeado\n• NO se admitirán excepciones por vencimiento\n• No se concederán reembolsos por regalos expirados\n• [NOMBRE_EMPRESA] no es responsable de recordar fechas de caducidad\n\n6.4 Transferencia de regalos:\nLos regalos son intransferibles y únicamente pueden ser utilizados por:\n• La persona que realizó la compra\n• La persona a quien fue regalado (si fue enviado a un email específico)\n\n6.5 Saldo parcial:\nSi el regalo tiene un saldo inferior al valor de la experiencia deseada:\n• Puede pagar la diferencia con otro método de pago\n• O elegir una experiencia de menor valor\n• Los saldos parciales no se reembolsan en efectivo\n\n6.6 Seguro del regalo:\n[NOMBRE_EMPRESA] no es responsable de:\n• Regalos no utilizados después de expiración\n• Pérdida de código de regalo\n• Uso no autorizado si comparte su código\n• Cambios de disponibilidad después de compra",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 8,
              content: {
                text: "7. POLÍTICA DE PAGOS\n\n7.1 Aceptación de pagos:\n[NOMBRE_EMPRESA] acepta pagos a través de: [METODOS_PAGO: tarjeta de crédito, transferencia bancaria, billeteras digitales].\n\n7.2 Procesamiento:\nLos pagos serán procesados a través de procesadores de pago autorizados que cumplen con los estándares PCI-DSS.\n\n7.3 Precios:\nLos precios mostrados incluyen/excluyen impuestos según se indique. Pueden cambiar sin previo aviso.\n\n7.4 Reembolsos:\nConforme a nuestra política, NO SE CONCEDEN REEMBOLSOS. Ver sección 5.4.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 9,
              content: {
                text: "8. LIMITACIÓN DE RESPONSABILIDAD\n\n8.1 [NOMBRE_EMPRESA] proporciona los servicios \"tal cual\" sin garantías de ningún tipo, ya sean expresas o implícitas.\n\n8.2 En la máxima medida permitida por la ley, [NOMBRE_EMPRESA] no será responsable de:\n- Daños indirectos, incidentales, especiales o consecuentes\n- Pérdida de datos, ingresos u oportunidades\n- Fallos técnicos o interrupciones del servicio\n- Acciones de terceros\n- No presentación del cliente a su reserva\n\n8.3 La responsabilidad máxima de [NOMBRE_EMPRESA] no excederá el monto total pagado por los servicios en los últimos 12 meses.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 10,
              content: {
                text: "9. PROPIEDAD INTELECTUAL\n\n9.1 Contenido: Todo el contenido del sitio web (texto, imágenes, gráficos, logotipos) es propiedad intelectual de [NOMBRE_EMPRESA] o sus proveedores.\n\n9.2 Licencia limitada: Se le otorga una licencia limitada y no transferible para acceder y usar el contenido para fines personales.\n\n9.3 Restricciones: Está prohibido:\n- Reproducir o distribuir sin autorización\n- Crear obras derivadas\n- Utilizar para propósitos comerciales\n- Remover referencias de propiedad intelectual",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 11,
              content: {
                text: "10. ENLACES A SITIOS EXTERNOS\n\n[NOMBRE_EMPRESA] no es responsable de:\n- Contenido de sitios enlazados\n- Disponibilidad de los mismos\n- Prácticas de privacidad de terceros\n- Daños causados por acceso a sitios externos\n\nLa inclusión de un enlace no implica aprobación del contenido del sitio enlazado.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 12,
              content: {
                text: "11. LEY APLICABLE Y JURISDICCIÓN\n\n11.1 Ley aplicable: Estos Términos se rigen por la ley española, específicamente por:\n- Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE)\n- Ley Orgánica 3/2018 de Protección de Datos (LOPDGDD)\n- Reglamento (UE) 2016/679 (RGPD)\n- Código Civil español\n\n11.2 Jurisdicción: Ambas partes se someten a los juzgados y tribunales competentes de [PROVINCIA_COMPETENCIA].",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 13,
              content: {
                text: "12. CONTACTO Y SOPORTE\n\nPara consultas, reclamaciones o soporte:\n\nCorreo electrónico: [EMAIL_CONTACTO]\nTeléfono: [TELEFONO]\nFormulario: [URL_FORMULARIO_CONTACTO]\nHorario de atención: [HORARIO_ATENCION]",
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

    console.log(`✓ Terms and Conditions updated with new cancellation policy\n`);
    console.log("📋 KEY CHANGES:");
    console.log("  • Minimum 48 hours for cancellations/modifications");
    console.log("  • NO REFUNDS policy (only modifications allowed)");
    console.log("  • Gift cards valid for 6 months from purchase");
    console.log("  • No-show: 100% loss of payment\n");
  } catch (error) {
    console.error("✗ Error updating cancellation policy:", error);
    process.exit(1);
  } finally {
    const { prisma: p } = await import("@/lib/prisma");
    await p.$disconnect();
  }
}

updateCancellationPolicy();
