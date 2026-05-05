import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ARTICLES = [
  {
    title: "Guía paso a paso: Cómo hacer una reserva",
    category: "Reservas - Tutorial",
    keywords: "reserva, paso a paso, tutorial, cómo reservar, formulario, guía completa, aprendizaje, pedagógico",
    content: `# 📋 Guía Completa: Cómo Hacer una Reserva en GastroShows

## Introducción
¡Bienvenido! Esta guía te llevará paso a paso a través de todo el proceso de reserva. Te tomaremos de la mano en cada punto para que sea fácil y divertido.

---

## 🎯 PASO 1: Accede a la Página Principal
**¿Dónde estoy?** En la página de inicio de GastroShows

**¿Qué ves?**
- Un gran título "GastroShows" con letras en dorado y plata
- Una frase elegante debajo: "Una noche que empieza antes de que llegues"
- DOS BOTONES grandes:
  - 🟡 RESERVAR (Botón dorado) ← **ESTE ES EL QUE NECESITAS HACER CLIC**
  - ⬜ REGALAR (Botón transparente con borde dorado)

**Acción:** Haz clic en el botón dorado "RESERVAR"

💡 **Consejo:** Si no lo ves, desplázate hacia arriba.

---

## 📝 PASO 2: Se Abre el Formulario de Reserva

Cuando hagas clic, se abrirá un modal (ventana emergente) con varios campos. No tengas miedo, ¡los explicamos todos!

---

## 👤 PASO 3: Completa tu Nombre

**Campo:** "Tu nombre"
**Acción:** Escribe tu nombre completo (ej: "María López")

---

## 🌍 PASO 4: Teléfono y País

### Selectiona tu país:
1. Haz clic en el botón con la bandera (🇪🇸 +34)
2. Busca por: nombre ("España"), código ("ES"), o número ("+34")
3. Haz clic en tu país

### Escribe tu teléfono:
1. Solo números, sin espacios
2. Ejemplo: 620269585
3. El sistema valida automáticamente ✅

---

## 📧 PASO 5: Tu Email

**Introduce:** tu.email@gmail.com

---

## 📅 PASO 6: Fecha y Turno

### Fecha:
1. Haz clic en el calendario
2. Elige el día (🟢 = disponible, 🔴 = completo)

### Turno:
- 🌅 MEDIODÍA: 12:45 (elegante)
- 🌙 NOCHE: 19:45 (misterioso)

---

## 👥 PASO 7: Número de Personas

Escribe entre 2-40 personas

---

## 🚫 PASO 8: ¿Primera Visita?

Elige: "Sí" o "No, es mi primera vez"

---

## 🍽️ PASO 9: Alergias

Si tienes: "Alergia a frutos secos", "Sin gluten", "Vegetariano"
Si no tienes: Deja en blanco

---

## 💬 PASO 10: Comentarios (Opcional)

Por ejemplo: "Es un cumpleaños" o "Primera cita"

---

## ✅ PASO 11: Términos

☑️ Política de Privacidad (OBLIGATORIO)
☑️ Comunicaciones de marketing (opcional)

---

## 👀 PASO 12: Resumen

Revisa todo. Si algo está mal, haz clic en "ATRÁS" para corregir.
Si OK: "CONFIRMAR Y PAGAR"

---

## 💳 PASO 13: Pago

1. Número de tarjeta
2. Fecha de vencimiento
3. CVV (3 dígitos atrás)
4. Confirmar

---

## 🎉 PASO 14: ¡LISTO!

✅ RESERVA CONFIRMADA

Recibirás 4 emails con pistas antes del evento.

---

## 🆘 ¿PROBLEMAS?

- "No hay sitio" → Intenta otra fecha/turno
- "Teléfono inválido" → Verifica: solo números, país correcto
- Error en pago → Verifica tarjeta válida

**Contacto:** WhatsApp +34 620 26 95 85 (Lunes-viernes, 10:00-20:00)

---

## ¡Lo hiciste! 🎊 Bienvenido a GastroShows!`,
    order: 1,
  },
  {
    title: "¿Cómo hago una reserva?",
    category: "Reservas",
    keywords: "reserva, booking, cómo reservar, hacer reserva",
    content: `Para hacer una reserva en GastroShows:

1. Accede a la página principal
2. Haz clic en el botón "RESERVAR" en la sección hero
3. Completa el formulario con:
   - Tu nombre
   - Teléfono (selecciona tu país)
   - Email
   - Fecha y turno (MEDIODÍA 12:45 o NOCHE 19:45)
   - Número de personas
   - Alergias (si aplica)
   - Si es tu primera visita
   - Comentarios adicionales

4. Revisa la disponibilidad (máximo 40 personas por turno)
5. Acepta los términos de privacidad
6. Confirma y paga

El sistema valida tu teléfono automáticamente según tu país.`,
    order: 1,
  },
  {
    title: "Validación de teléfono internacional",
    category: "Teléfono",
    keywords: "teléfono, validación, país, código, internacional, +34, +1",
    content: `GastroShows soporta validación de teléfono para 60+ países:

Cómo funciona:
1. En el formulario de reserva, encontrarás un botón con la bandera de tu país
2. Haz clic para abrir el selector de país
3. Busca tu país por:
   - Nombre del país (ej: "España")
   - Código de país (ej: "ES")
   - Código de marcado (ej: "+34")

4. Se autocompletará el código internacional
5. Escribe tu teléfono (solo dígitos)
6. El sistema valida automáticamente el formato

Ejemplo:
- País: España (+34)
- Teléfono: 620269585
- Validado como: +34 620 26 95 85

Si tu país no aparece, contacta por WhatsApp.`,
    order: 2,
  },
  {
    title: "Vales regalo - ¿Cómo funcionan?",
    category: "Regalo",
    keywords: "vale regalo, regalo, gift, voucher, comprar regalo",
    content: `Los vales regalo de GastroShows son la forma perfecta de regalar una experiencia:

Características:
✓ Válido por 6 meses desde la compra
✓ El destinatario elige la fecha (dentro del periodo de validez)
✓ No requiere cantidad mínima de personas
✓ Se envía un email elegante al destinatario
✓ Personalizable con tu mensaje

Cómo comprar un vale:
1. Haz clic en "REGALAR" en la página principal
2. Selecciona el número de personas
3. Completa los datos del destinatario
4. Añade un mensaje personalizado
5. Realiza el pago

El destinatario recibirá un email con:
- Código único del vale
- Instrucciones para canjear
- Periodo de validez`,
    order: 3,
  },
  {
    title: "Eventos privados - Celebra con nosotros",
    category: "Eventos",
    keywords: "evento privado, célébra, grupo, empresa, despedida, reunión",
    content: `GastroShows ofrece la posibilidad de reservar el espacio completo para eventos privados.

¿Qué incluye?
• Espacio completo (hasta 40 personas)
• Menú personalizado según vuestras preferencias
• Maridaje a medida
• El ritual completo adaptado a vuestro grupo
• Atención especializada

Perfecto para:
- Cenas de empresa
- Despedidas
- Celebraciones especiales
- Reuniones privadas
- Eventos corporativos

Cómo reservar un evento:
1. Ve a la página de "Eventos"
2. Haz clic en "Contactar por WhatsApp"
3. Cuéntanos:
   - Número de personas
   - Fecha aproximada
   - Tipo de evento
   - Restricciones dietéticas
   - Presupuesto (opcional)

4. Nos ponemos en contacto en menos de 24 horas
5. Diseñamos la experiencia a medida

Contacto: +34 620 26 95 85`,
    order: 4,
  },
  {
    title: "¿Cuál es el horario de las experiencias?",
    category: "Información General",
    keywords: "horario, turno, mediodía, noche, qué hora, cuándo",
    content: `GastroShows tiene dos turnos disponibles:

🌅 MEDIODÍA (Turno de día)
• Hora: 12:45
• Duración: Aproximadamente 2-2.5 horas
• Atmósfera: Luminosa, elegante

🌙 NOCHE (Turno nocturno)
• Hora: 19:45
• Duración: Aproximadamente 3-3.5 horas
• Atmósfera: Clandestina, misterio, luces tenues

Ambos turnos incluyen:
✓ El ritual completo
✓ Menú secreto de 5-7 platos
✓ Maridaje de bebidas
✓ Experiencia sensorial completa

Disponibilidad:
• Máximo 40 personas por turno
• Se abre disponibilidad con 4 semanas de anticipación
• Revisa la sección "Disponibilidad" para ver slots libres`,
    order: 5,
  },
  {
    title: "Política de cancelación",
    category: "Reservas",
    keywords: "cancelar, reembolso, devolución, cambio de fecha",
    content: `Política de cancelación y cambios:

Hasta 7 días antes:
✓ Cancelación gratuita
✓ Reembolso completo
✓ Posibilidad de cambiar fecha sin penalización

De 7 a 3 días antes:
⚠ Se retiene el 50% del importe
✓ Puedes cambiar de fecha

Menos de 3 días:
❌ No se permite cancelación
❌ No hay reembolso
✓ Puedes cambiar de fecha (sujeto a disponibilidad)

Día de la reserva:
❌ No se permite cancelación
❌ No hay reembolso

Para cambiar fecha o cancelar:
Contacta por WhatsApp: +34 620 26 95 85`,
    order: 6,
  },
  {
    title: "¿Hay restricciones de alergias?",
    category: "Reservas",
    keywords: "alergia, restricción dietética, intolerancia, sin gluten, vegetariano",
    content: `En GastroShows adaptamos el menú a tus restricciones dietéticas.

Al hacer la reserva:
1. Indica tus alergias en el campo "Alergias"
2. Especifica si eres vegetariano/vegano/celiaco
3. Añade cualquier restricción adicional

Restricciones que controlamos:
✓ Alergias comunes (frutos secos, marisco, huevo, etc.)
✓ Intolerancias (gluten, lactosa, etc.)
✓ Preferencias dietéticas (vegetariano, vegano, kosher)
✓ Preferencias personales (no me gusta el pescado, etc.)

Proceso:
1. Guardamos tus preferencias en la reserva
2. Nuestro chef revisa antes de la experiencia
3. Se adapta el menú según sea posible
4. Avisamos si algo no puede adaptarse

Importante: Menciona alergias graves (anafilaxis) en el campo de comentarios para máxima atención.`,
    order: 7,
  },
];

export async function GET(request: Request) {
  try {
    // En desarrollo, permite sin autenticación
    if (process.env.NODE_ENV === "production") {
      const authHeader = request.headers.get("authorization");
      if (!authHeader?.includes("Bearer")) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
      }
    }

    // Limpiar artículos anteriores (opcional)
    // await prisma.knowledgeArticle.deleteMany({});

    let createdCount = 0;
    for (const article of ARTICLES) {
      const existing = await prisma.knowledgeArticle.findUnique({
        where: { title: article.title },
      });

      if (existing) {
        continue;
      }

      await prisma.knowledgeArticle.create({
        data: {
          ...article,
          active: true,
        },
      });
      createdCount++;
    }

    return NextResponse.json({
      ok: true,
      message: `Seed completado. ${createdCount} artículos creados.`,
      total: ARTICLES.length,
    });
  } catch (err: any) {
    console.error("[api/admin/asistente/seed] Error:", err);
    return NextResponse.json({ ok: false, error: "Error seeding articles" }, { status: 500 });
  }
}
