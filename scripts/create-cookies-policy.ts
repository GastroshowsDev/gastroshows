/**
 * Script to create comprehensive Cookies Policy page
 * Run with: npx tsx scripts/create-cookies-policy.ts
 */

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env.local") });

async function createCookiesPolicy() {
  const { prisma } = await import("@/lib/prisma");

  try {
    console.log("Creating Cookies Policy page...\n");

    const cookiesPolicy = await prisma.page.upsert({
      where: { slug: "politica-cookies" },
      update: {},
      create: {
        title: "Política de Cookies",
        slug: "politica-cookies",
        published: true,
        blocks: {
          create: [
            {
              type: "TEXT",
              order: 0,
              content: {
                text: "Política de Cookies",
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
                text: "1. ¿QUÉ SON LAS COOKIES?\n\nLas cookies son pequeños archivos de texto que se guardan en su dispositivo (ordenador, tablet, smartphone) cuando visita un sitio web. Estos archivos permiten que el sitio web:\n\n• Reconozca su dispositivo en futuras visitas\n• Recuerde sus preferencias y configuración\n• Analice el comportamiento de navegación\n• Muestre publicidad personalizada\n• Mejore la experiencia del usuario\n\nLas cookies NO contienen virus, malware ni información personal sensible. Son completamente seguras.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 3,
              content: {
                text: "2. TIPOS DE COOKIES UTILIZADAS\n\n2.1 COOKIES ESENCIALES (Obligatorias)\n✓ Siempre activas - No requieren consentimiento\n✓ Necesarias para el funcionamiento básico del sitio\n\nEjemplos:\n• next-auth.session-token: Mantiene su sesión de login activa\n• PHPSESSID: Identificador de sesión en servidor\n• Preferencias de idioma y región\n• Configuración de seguridad (CSRF tokens)\n• Carrito de compra/reservas\n\nDuración: Sesión (se eliminan al cerrar navegador) o máximo 24 horas\nProveedor: [NOMBRE_EMPRESA]\nFinalidad: Funcionamiento técnico del sitio\n\n2.2 COOKIES DE ANÁLISIS Y RENDIMIENTO\n✓ Requieren consentimiento explícito\n✓ Nos ayudan a entender cómo usa el sitio\n\nProveedor: Google Analytics (GA4)\nCookies utilizadas:\n• _ga: Identifica usuarios únicos\n• _ga_XXXXXXXXXX: Sesión de análisis\n• _gat: Limita solicitudes\n\nDatos recopilados:\n• Páginas visitadas\n• Tiempo en sitio\n• Dispositivo y navegador\n• Ubicación aproximada (ciudad, país)\n• Fuente de tráfico (Google, Facebook, etc.)\n\nDuración: 2 años\nProveedor: Google LLC (Dublin, Irlanda)\nPolítica Google: https://policies.google.com/privacy\nFinalidad: Analizar uso del sitio, identificar problemas técnicos, optimizar rendimiento\n\n2.3 COOKIES DE MARKETING Y PUBLICIDAD\n✓ Requieren consentimiento explícito\n✓ Permiten publicidad personalizada\n\nProveedor: Google Ads (si se implementa)\nCookies:\n• IDE: Publicidad personalizada\n• ANID: Perfiles de interés\n\nDatos recopilados:\n• Páginas visitadas\n• Productos vistos\n• Intereses inferidos\n• Comportamiento de compra\n\nDuración: Hasta 2 años\nProveedor: Google LLC\nPolítica: https://policies.google.com/technologies/ads\nFinalidad: Mostrar anuncios relevantes para sus intereses\n\n2.4 COOKIES DE REDES SOCIALES (Si aplica)\n✓ Se crean si comparte contenido\n✓ Requieren consentimiento si se insertan scripts\n\nProveedor: Facebook, Instagram, LinkedIn, Twitter\nDatos: Perfil social, comportamiento de compra\nDuración: Según política de cada red social\nFinalidad: Compartir contenido, publicidad retargeting",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 4,
              content: {
                text: "3. CONSENTIMIENTO Y GESTIÓN DE COOKIES\n\n3.1 Banner de Consentimiento\nEn su primera visita verá un banner informativo que:\n\n• Explica qué son las cookies\n• Presenta categorías de cookies\n• Ofrece opción de aceptar todo\n• Ofrece opción de rechazar todo (igual de visible)\n• Permite personalizar preferencias\n• Incluye enlace a esta política\n\n3.2 Cómo Gestionar sus Preferencias\n\nMétodo 1: Usar el banner de cookies\n• Haga clic en \"Personalizar\" para seleccionar qué cookies acepta\n• Sus elecciones se guardan en una cookie de preferencias\n\nMétodo 2: Usar la configuración del navegador\nPuede bloquear o eliminar cookies desde:\n\n• Chrome: Menú → Configuración → Privacidad y seguridad → Cookies\n• Firefox: Menú → Preferencias → Privacidad → Cookies\n• Safari: Preferencias → Privacidad → Cookies\n• Edge: Configuración → Privacidad y seguridad → Cookies\n\n3.3 Renovación del Consentimiento\n• El consentimiento se solicita anualmente\n• Si rechaza cookies no esenciales, serán eliminadas\n• Puede cambiar sus preferencias en cualquier momento\n\n3.4 Consentimiento Implícito\n• Si continúa navegando sin actuar, NO implica aceptación\n• Debe actuar explícitamente (Aceptar, Rechazar o Personalizar)\n• El consentimiento es voluntario y revocable",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 5,
              content: {
                text: "4. COOKIES DE TERCEROS\n\nEste sitio puede contener:\n\n• Vídeos incrustados de YouTube (YouTube.com)\n• Mapas de Google Maps (Google.com)\n• Widgets de redes sociales\n• Botones de \"Compartir\"\n\nEstos servicios pueden colocar sus propias cookies incluso sin consentimiento explícito si ya tiene sesión activa en esos servicios.\n\nCada tercero tiene su propia política de cookies:\n• Google: https://policies.google.com/privacy\n• Meta/Facebook: https://www.facebook.com/policies/cookies/\n• YouTube: https://policies.google.com/privacy\n\nNo controlamos estas cookies de terceros. Para más información, consulte sus políticas de privacidad.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 6,
              content: {
                text: "5. TRANSFERENCIAS INTERNACIONALES DE DATOS\n\n5.1 Google Analytics y Google Ads\nGoogle tiene servidores en Estados Unidos. Aunque Google ha implementado:\n\n• Standard Contractual Clauses (SCC)\n• Data Processing Agreements (DPA) GDPR-compatibles\n• Mecanismos de transferencia seguros\n\nLos datos pueden transferirse a USA aunque con protecciones legales.\n\n5.2 Protecciones Implementadas\n[NOMBRE_EMPRESA] ha:\n\n• Firmado Data Processing Agreement con Google\n• Documentado Transfer Impact Assessment\n• Implementado anonimización de datos (no se recogen IPs completas)\n• Limitado retención de datos\n\n5.3 Sus Derechos\nPuede optar por rechazar estas transferencias no aceptando cookies de análisis. El sitio funcionará normalmente.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 7,
              content: {
                text: "6. PRIVACIDAD Y SEGURIDAD\n\n6.1 Información Recopilada por Cookies\nLas cookies NO pueden recopilar:\n• Contraseñas\n• Datos de tarjeta bancaria\n• DNI u otro documento de identidad\n• Información médica\n• Biometría (rostro, huella)\n\nPueden recopilar:\n• ID de sesión\n• Páginas visitadas\n• Tiempo en sitio\n• Dispositivo y navegador\n• Ubicación aproximada (ciudad)\n• Información que usted proporciona voluntariamente\n\n6.2 Protecciones de Seguridad\n• Conexión HTTPS encriptada (candado verde en navegador)\n• Cookies con flag \"Secure\" (solo HTTPS)\n• Cookies con flag \"HttpOnly\" (no accesibles desde JavaScript)\n• SameSite=Strict (protección contra CSRF)\n• Rotación regular de tokens de sesión",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 8,
              content: {
                text: "7. RETENCIÓN DE COOKIES\n\nCada cookie tiene un tiempo de expiración diferente:\n\n• Cookies esenciales de sesión: Expires al cerrar navegador\n• Cookies de autenticación: 24 horas\n• Cookies de análisis Google: 2 años\n• Cookies de marketing: Hasta 2 años\n• Cookies de preferencias: Hasta 1 año\n\nAl expirar, se eliminan automáticamente de su dispositivo.\n\nPuede eliminar manualmente todas las cookies en cualquier momento usando la configuración de su navegador.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 9,
              content: {
                text: "8. CUMPLIMIENTO NORMATIVO\n\n8.1 Marco Legal\nEsta política cumple con:\n\n• Reglamento (UE) 2016/679 (RGPD)\n• Ley Orgánica 3/2018 (LOPDGDD)\n• Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE)\n• Directiva 2002/58/CE (ePrivacy Directive)\n• Directrices del Grupo de Trabajo Art. 29 sobre cookies\n• Jurisprudencia del TJUE sobre consentimiento\n\n8.2 Consentimiento RGPD\n• Debe ser previo, explícito e informado\n• Debe ser específico (por categoría)\n• Debe estar garantizado por opción clara (no por defecto)\n• Debe ser tan fácil revocar como dar\n• No puede condicionarse el acceso al sitio (a menos que sea esencial)\n\n8.3 Control por Autoridades\nEsta política puede ser supervisada por:\n• AEPD (Agencia Española de Protección de Datos): www.aepd.es\n• EDPB (Junta Europea de Protección de Datos)\n• Autoridades de consumidor (si hay prácticas desleales)",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 10,
              content: {
                text: "9. CAMBIOS EN ESTA POLÍTICA\n\n[NOMBRE_EMPRESA] puede modificar esta Política de Cookies en cualquier momento.\n\nAntes de cambios significativos:\n• Notificaremos por email a usuarios registrados\n• Mostraremos aviso prominente en el sitio\n• Solicitaremos nuevo consentimiento si es necesario\n\nLa fecha de la última actualización aparece en la parte superior de este documento.\n\nSu uso continuado del sitio después de cambios implica aceptación de la política modificada.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
            {
              type: "TEXT",
              order: 11,
              content: {
                text: "10. CONTACTO Y RECLAMACIONES\n\n10.1 Para preguntas sobre esta política:\n\nCorreo electrónico: [EMAIL_CONTACTO]\nTeléfono: [TELEFONO]\nFormulario: [URL_FORMULARIO_CONTACTO]\nHorario: [HORARIO_ATENCION]\n\n10.2 Para ejercer derechos RGPD (acceso, supresión, etc.):\n\nDirección postal: [DOMICILIO_COMPLETO]\nCorreo: [EMAIL_PRIVACIDAD]\nFórmula: Indique \"Ejercicio de derechos ARCO\"\n\nPlaza máxima de respuesta: 30 días\n\n10.3 Reclamación ante la autoridad:\n\nAgencia Española de Protección de Datos (AEPD)\nWeb: www.aepd.es\nTeléfono: 901 100 099\nDirección: C/ Jorge Juan, 6, 28001 Madrid\n\nPuede presentar reclamación si considera vulnerados sus derechos.",
                alignment: "left",
                color: "#374151",
                fontSize: "15px",
              },
            },
          ],
        },
      },
    });

    console.log(`✓ Cookies Policy created: ${cookiesPolicy.slug}\n`);
  } catch (error) {
    console.error("✗ Error creating cookies policy:", error);
    process.exit(1);
  } finally {
    const { prisma: p } = await import("@/lib/prisma");
    await p.$disconnect();
  }
}

createCookiesPolicy();
