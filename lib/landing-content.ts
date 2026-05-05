import { prisma } from "@/lib/prisma";
import type { LandingContentMap } from "@/lib/landing-client";

export type ContentType = "TEXT" | "TEXTAREA" | "IMAGE_URL" | "URL";
export type { LandingContentMap };

export type FieldMeta = {
  key: string;
  label: string;
  type: ContentType;
  section: string;
  order: number;
  defaultValue: string;
};

// ── All editable fields with their defaults ──────────────────────────────────
export const LANDING_DEFAULTS: Record<string, Omit<FieldMeta, "key">> = {
  // Hero
  "hero.location": {
    label: "Ubicación", type: "TEXT", section: "hero", order: 1,
    defaultValue: "Barcelona",
  },
  "hero.tagline": {
    label: "Tagline (mecanografía)", type: "TEXT", section: "hero", order: 2,
    defaultValue: "Una noche que empieza antes de que llegues.",
  },
  "hero.cta_reservar": {
    label: "Botón Reservar", type: "TEXT", section: "hero", order: 3,
    defaultValue: "Reservar",
  },
  "hero.cta_regalar": {
    label: "Botón Regalar", type: "TEXT", section: "hero", order: 4,
    defaultValue: "Regalar",
  },
  "hero.bg_image": {
    label: "Imagen de fondo (URL)", type: "IMAGE_URL", section: "hero", order: 5,
    defaultValue: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=85",
  },

  // Ritual
  "ritual.eyebrow": {
    label: "Eyebrow", type: "TEXT", section: "ritual", order: 1,
    defaultValue: "La experiencia",
  },
  "ritual.title_line1": {
    label: "Título línea 1", type: "TEXT", section: "ritual", order: 2,
    defaultValue: "Algo más que una cena",
  },
  "ritual.title_em": {
    label: "Título línea 2 (dorado)", type: "TEXT", section: "ritual", order: 3,
    defaultValue: "en Barcelona.",
  },
  "ritual.step1.day":     { label: "Paso 1 — Etiqueta de día", type: "TEXT",     section: "ritual", order: 10, defaultValue: "D−4" },
  "ritual.step1.eyebrow": { label: "Paso 1 — Subtítulo",        type: "TEXT",     section: "ritual", order: 11, defaultValue: "El primer mensaje" },
  "ritual.step1.title":   { label: "Paso 1 — Título",            type: "TEXT",     section: "ritual", order: 12, defaultValue: "Algo comienza a llegar" },
  "ritual.step1.body":    { label: "Paso 1 — Texto",             type: "TEXTAREA", section: "ritual", order: 13, defaultValue: "Recibes un email distinto a todos los que has recibido. No hay menú. No hay dirección. Solo la confirmación de que algo extraordinario está en marcha." },

  "ritual.step2.day":     { label: "Paso 2 — Etiqueta de día", type: "TEXT",     section: "ritual", order: 20, defaultValue: "D−3" },
  "ritual.step2.eyebrow": { label: "Paso 2 — Subtítulo",        type: "TEXT",     section: "ritual", order: 21, defaultValue: "Una pista" },
  "ritual.step2.title":   { label: "Paso 2 — Título",            type: "TEXT",     section: "ritual", order: 22, defaultValue: "El misterio toma forma" },
  "ritual.step2.body":    { label: "Paso 2 — Texto",             type: "TEXTAREA", section: "ritual", order: 23, defaultValue: "Un segundo mensaje. Esta vez con una imagen, un fragmento, una frase que no lo dice todo. Tu mente empieza a construir lo que aún no existe." },

  "ritual.step3.day":     { label: "Paso 3 — Etiqueta de día", type: "TEXT",     section: "ritual", order: 30, defaultValue: "D−2" },
  "ritual.step3.eyebrow": { label: "Paso 3 — Subtítulo",        type: "TEXT",     section: "ritual", order: 31, defaultValue: "Cada vez más cerca" },
  "ritual.step3.title":   { label: "Paso 3 — Título",            type: "TEXT",     section: "ritual", order: 32, defaultValue: "Pistas que se acumulan" },
  "ritual.step3.body":    { label: "Paso 3 — Texto",             type: "TEXTAREA", section: "ritual", order: 33, defaultValue: "El tercer mensaje te lleva más lejos. Hay algo en el tono, en los detalles. Empiezas a saber que lo que se acerca no tiene nada que ver con una cena ordinaria." },

  "ritual.step4.day":     { label: "Paso 4 — Etiqueta de día", type: "TEXT",     section: "ritual", order: 40, defaultValue: "D−0" },
  "ritual.step4.eyebrow": { label: "Paso 4 — Subtítulo",        type: "TEXT",     section: "ritual", order: 41, defaultValue: "La noche" },
  "ritual.step4.title":   { label: "Paso 4 — Título",            type: "TEXT",     section: "ritual", order: 42, defaultValue: "La dirección llega. Ya no hay marcha atrás." },
  "ritual.step4.body":    { label: "Paso 4 — Texto",             type: "TEXTAREA", section: "ritual", order: 43, defaultValue: "El día del evento, el último mensaje te da la ubicación exacta. Has llegado hasta aquí. Ahora solo queda cruzar la puerta." },

  // Regalo
  "regalo.eyebrow":     { label: "Eyebrow",                    type: "TEXT",     section: "regalo", order: 1, defaultValue: "Vale regalo" },
  "regalo.title_line1": { label: "Título línea 1",              type: "TEXT",     section: "regalo", order: 2, defaultValue: "Regala lo que" },
  "regalo.title_em":    { label: "Título línea 2 (dorado)",     type: "TEXT",     section: "regalo", order: 3, defaultValue: "no se compra en una tienda." },
  "regalo.body":        { label: "Texto descriptivo",           type: "TEXTAREA", section: "regalo", order: 4, defaultValue: "Una experiencia clandestina para dos, para cuatro, para quien tú elijas. El destinatario elige la fecha cuando quiera — el vale es válido seis meses." },
  "regalo.feature1":    { label: "Característica 1",            type: "TEXT",     section: "regalo", order: 5, defaultValue: "Válido 6 meses" },
  "regalo.feature2":    { label: "Característica 2",            type: "TEXT",     section: "regalo", order: 6, defaultValue: "Fecha libre" },
  "regalo.feature3":    { label: "Característica 3",            type: "TEXT",     section: "regalo", order: 7, defaultValue: "Email elegante" },
  "regalo.cta":         { label: "Texto del botón",             type: "TEXT",     section: "regalo", order: 8, defaultValue: "Crear vale regalo" },
  "regalo.bg_image":    { label: "Imagen de fondo (URL)",       type: "IMAGE_URL",section: "regalo", order: 9, defaultValue: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80" },

  // Footer
  "footer.tagline":    { label: "Tagline",       type: "TEXT", section: "footer", order: 1, defaultValue: "Barcelona · Experiencia clandestina" },
  "footer.copyright":  { label: "Copyright",     type: "TEXT", section: "footer", order: 2, defaultValue: "GastroShows · Todos los derechos reservados" },
};

// ── Public getter — falls back to defaults if DB is empty or unavailable ─────
export async function getLandingContent(): Promise<LandingContentMap> {
  // Build map from defaults
  const map: LandingContentMap = {};
  for (const [key, meta] of Object.entries(LANDING_DEFAULTS)) {
    map[key] = meta.defaultValue;
  }

  try {
    const rows = await prisma.landingContent.findMany();
    for (const row of rows) {
      map[row.key] = row.value;
    }
  } catch {
    // Silently fall back to defaults (e.g., table not yet created in new instance)
  }

  return map;
}

// ── Events page defaults (private group / venue hire landing) ────────────────
export const EVENTOS_DEFAULTS: Record<string, Omit<FieldMeta, "key">> = {
  // Hero
  "ev.hero.eyebrow":     { label: "Eyebrow",                type: "TEXT",      section: "ev-hero", order: 1, defaultValue: "Eventos privados" },
  "ev.hero.title_line1": { label: "Título línea 1",          type: "TEXT",      section: "ev-hero", order: 2, defaultValue: "Tu espacio exclusivo" },
  "ev.hero.title_em":    { label: "Título línea 2 (dorado)", type: "TEXT",      section: "ev-hero", order: 3, defaultValue: "para la noche." },
  "ev.hero.subtitle":    { label: "Subtítulo",               type: "TEXTAREA",  section: "ev-hero", order: 4, defaultValue: "Reserva el local completo para tu grupo, empresa o celebración. Diseñamos una experiencia a medida desde el primer mensaje hasta el último bocado." },
  "ev.hero.bg_image":    { label: "Imagen de fondo (URL)",   type: "IMAGE_URL", section: "ev-hero", order: 5, defaultValue: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1920&q=85" },

  // Feature highlights
  "ev.feat.eyebrow": { label: "Eyebrow sección",         type: "TEXT", section: "ev-feat", order: 1, defaultValue: "¿Qué incluye?" },
  "ev.feat.title":   { label: "Título sección",           type: "TEXT", section: "ev-feat", order: 2, defaultValue: "Una noche entera. Solo para vosotros." },

  "ev.feat1.title": { label: "Característica 1 — Título", type: "TEXT",     section: "ev-feat", order: 10, defaultValue: "Espacio completo" },
  "ev.feat1.body":  { label: "Característica 1 — Texto",  type: "TEXTAREA", section: "ev-feat", order: 11, defaultValue: "El local es vuestro. Sin extraños, sin interrupciones. Solo vuestro grupo y una experiencia diseñada para vosotros." },

  "ev.feat2.title": { label: "Característica 2 — Título", type: "TEXT",     section: "ev-feat", order: 20, defaultValue: "Menú personalizado" },
  "ev.feat2.body":  { label: "Característica 2 — Texto",  type: "TEXTAREA", section: "ev-feat", order: 21, defaultValue: "Creamos el menú con vosotros. Maridaje, restricciones alimentarias y detalles que marcan la diferencia." },

  "ev.feat3.title": { label: "Característica 3 — Título", type: "TEXT",     section: "ev-feat", order: 30, defaultValue: "Hasta 40 personas" },
  "ev.feat3.body":  { label: "Característica 3 — Texto",  type: "TEXTAREA", section: "ev-feat", order: 31, defaultValue: "Aforo completo del local. Ideal para cenas de empresa, despedidas o celebraciones que merecen un escenario a la altura." },

  "ev.feat4.title": { label: "Característica 4 — Título", type: "TEXT",     section: "ev-feat", order: 40, defaultValue: "El ritual, para todos" },
  "ev.feat4.body":  { label: "Característica 4 — Texto",  type: "TEXTAREA", section: "ev-feat", order: 41, defaultValue: "Tus invitados reciben los mensajes previos al evento igual que en una experiencia estándar, adaptados a tu grupo." },

  // Contact CTA
  "ev.cta.title":    { label: "Título sección contacto",        type: "TEXT",     section: "ev-cta", order: 1, defaultValue: "¿Quieres reservar el espacio completo?" },
  "ev.cta.body":     { label: "Texto",                          type: "TEXTAREA", section: "ev-cta", order: 2, defaultValue: "Cuéntanos quiénes sois, cuántos seréis y qué queréis celebrar. Nos ponemos en contacto contigo en menos de 24 horas." },
  "ev.cta.whatsapp": { label: "Número WhatsApp (internacional)",type: "TEXT",     section: "ev-cta", order: 3, defaultValue: "+34 620 26 95 85" },
  "ev.cta.button":   { label: "Texto del botón",                type: "TEXT",     section: "ev-cta", order: 4, defaultValue: "Contactar por WhatsApp" },
};

// ── Combined defaults (all pages) ─────────────────────────────────────────────
export const ALL_DEFAULTS: Record<string, Omit<FieldMeta, "key">> = {
  ...LANDING_DEFAULTS,
  ...EVENTOS_DEFAULTS,
};

// ── Helper — get a single value with default fallback ────────────────────────
export function c(content: LandingContentMap, key: string): string {
  return content[key] ?? ALL_DEFAULTS[key]?.defaultValue ?? "";
}
