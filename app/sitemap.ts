import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { prisma } from "@/lib/prisma";

const baseUrl = "https://gastroshows.es";

// Regenera el sitemap cada hora para recoger páginas publicadas desde la BD.
export const revalidate = 3600;

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  languages?: Record<string, string>;
};

// Helper: build a localized alternates map (absolute URLs)
const alt = (langs: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(langs).map(([lang, p]) => [lang, `${baseUrl}${p}`]),
  );

/**
 * Static, public, indexable routes grouped by SEO priority.
 * Utility/transactional routes (canjear, demo-pago, booking-*, fichaje, eventos)
 * are intentionally excluded — they are not search landing pages.
 */
const staticEntries: Entry[] = [
  // ── Home + money pages ──────────────────────────────────────────────
  {
    path: "/",
    priority: 1.0,
    changeFrequency: "daily",
    languages: { es: "/", ca: "/ca", en: "/en", "x-default": "/" },
  },
  {
    path: "/cena-clandestina",
    priority: 0.95,
    changeFrequency: "weekly",
    languages: {
      es: "/cena-clandestina",
      ca: "/ca/cena-clandestina",
      en: "/clandestine-dinner-barcelona",
      "x-default": "/cena-clandestina",
    },
  },
  {
    path: "/menu-degustacion",
    priority: 0.9,
    changeFrequency: "weekly",
    languages: {
      es: "/menu-degustacion",
      ca: "/ca/menu-degustacion",
      en: "/en/tasting-menu",
      "x-default": "/menu-degustacion",
    },
  },
  {
    path: "/regalo",
    priority: 0.9,
    changeFrequency: "weekly",
    languages: { es: "/regalo", ca: "/ca/regalo", "x-default": "/regalo" },
  },
  {
    path: "/grupos",
    priority: 0.9,
    changeFrequency: "weekly",
    languages: { es: "/grupos", ca: "/ca/grupos", "x-default": "/grupos" },
  },
  { path: "/restaurantes-michelin", priority: 0.85, changeFrequency: "monthly" },
  { path: "/preguntas-frecuentes", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/contacto",
    priority: 0.7,
    changeFrequency: "monthly",
    languages: { es: "/contacto", ca: "/ca/contacto", "x-default": "/contacto" },
  },

  // ── Grupos / eventos privados (servicios) ───────────────────────────
  { path: "/cenas-de-empresa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/eventos-corporativos-con-clientes", priority: 0.8, changeFrequency: "monthly" },
  { path: "/celebraciones-y-aniversarios", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team-building-gastronomico", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team-building-cocina-barcelona", priority: 0.75, changeFrequency: "monthly" },
  { path: "/team-building-masterchef", priority: 0.75, changeFrequency: "monthly" },
  { path: "/cenas-privadas-barcelona", priority: 0.75, changeFrequency: "monthly" },
  { path: "/cena-clandestina-de-barcelona-grupos", priority: 0.75, changeFrequency: "monthly" },
  { path: "/despedida-soltera", priority: 0.7, changeFrequency: "monthly" },

  // ── Experiencias / talleres ─────────────────────────────────────────
  { path: "/actividades-gastronomicas", priority: 0.75, changeFrequency: "monthly" },
  { path: "/talleres-gastronomicos", priority: 0.75, changeFrequency: "monthly" },
  { path: "/taller-de-sushi-barcelona", priority: 0.7, changeFrequency: "monthly" },
  { path: "/taller-cocteles-barcelona", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cena-con-show-en-vivo", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cena-creativa-en-casa", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cenas-espectaculo-barcelona-secreta", priority: 0.7, changeFrequency: "monthly" },

  // ── Regalo / gift ───────────────────────────────────────────────────
  { path: "/regalo-experiencia-gastronomica", priority: 0.75, changeFrequency: "monthly" },
  { path: "/gift-card", priority: 0.7, changeFrequency: "monthly" },
  { path: "/regalos-con-comida", priority: 0.7, changeFrequency: "monthly" },
  { path: "/regalos-originales-barcelona-experiencias", priority: 0.7, changeFrequency: "monthly" },
  { path: "/regalos-originales-en-pareja", priority: 0.7, changeFrequency: "monthly" },
  { path: "/los-mejores-menus-degustacion-para-regalar", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tarjeta-regalo-cena-barcelona", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tarjeta-regalo-cena-para-dos", priority: 0.7, changeFrequency: "monthly" },

  // ── Landing SEO (long tail ES) ──────────────────────────────────────
  { path: "/alquiler-espacio-gastronomico-en-barcelona", priority: 0.7, changeFrequency: "monthly" },
  { path: "/bares-tapas-barcelona-baratos", priority: 0.7, changeFrequency: "monthly" },
  { path: "/donde-cenar-en-barcelona", priority: 0.7, changeFrequency: "monthly" },
  { path: "/las-mejores-cenas-clandestinas-de-barcelona", priority: 0.7, changeFrequency: "monthly" },
  { path: "/las-mejores-terrazas-de-barcelona", priority: 0.7, changeFrequency: "monthly" },
  { path: "/mejores-restaurantes-cocina-tradicional-catalana-barcelona", priority: 0.7, changeFrequency: "monthly" },
  { path: "/mejores-restaurantes-menu-degustacion-barcelona", priority: 0.7, changeFrequency: "monthly" },
  { path: "/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hacer-algo-diferente-en-barcelona", priority: 0.65, changeFrequency: "monthly" },
  { path: "/cosas-que-hacer-con-tu-pareja-en-casa", priority: 0.65, changeFrequency: "monthly" },
  { path: "/ideas-para-san-valentin", priority: 0.65, changeFrequency: "monthly" },
  { path: "/planes-para-halloween-castanyada-en-barcelona", priority: 0.6, changeFrequency: "monthly" },
  { path: "/la-merce-2025-barcelona-guia-completa", priority: 0.6, changeFrequency: "monthly" },
  { path: "/estopa-piromusical-barcelona-merce-2025", priority: 0.55, changeFrequency: "monthly" },

  // ── Landing SEO (EN) ────────────────────────────────────────────────
  {
    path: "/clandestine-dinner-barcelona",
    priority: 0.75,
    changeFrequency: "monthly",
    languages: { en: "/clandestine-dinner-barcelona", es: "/cena-clandestina", "x-default": "/cena-clandestina" },
  },
  {
    path: "/cheap-tapas-bars-in-barcelona",
    priority: 0.65,
    changeFrequency: "monthly",
    languages: { en: "/cheap-tapas-bars-in-barcelona", es: "/bares-tapas-barcelona-baratos", "x-default": "/bares-tapas-barcelona-baratos" },
  },
  {
    path: "/the-best-restaurants-with-tasting-menu-in-barcelona",
    priority: 0.65,
    changeFrequency: "monthly",
    languages: { en: "/the-best-restaurants-with-tasting-menu-in-barcelona", es: "/mejores-restaurantes-menu-degustacion-barcelona", "x-default": "/mejores-restaurantes-menu-degustacion-barcelona" },
  },
  {
    path: "/the-best-tasting-menus-for-gift-giving",
    priority: 0.65,
    changeFrequency: "monthly",
    languages: { en: "/the-best-tasting-menus-for-gift-giving", es: "/los-mejores-menus-degustacion-para-regalar", "x-default": "/los-mejores-menus-degustacion-para-regalar" },
  },
  {
    path: "/the-best-cocktail-bars-in-barcelona",
    priority: 0.65,
    changeFrequency: "monthly",
    languages: { en: "/the-best-cocktail-bars-in-barcelona", es: "/taller-cocteles-barcelona", "x-default": "/taller-cocteles-barcelona" },
  },
  {
    path: "/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e",
    priority: 0.65,
    changeFrequency: "monthly",
    languages: { en: "/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e", es: "/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia", "x-default": "/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia" },
  },
  {
    path: "/3-gastronomic-space-for-rent-in-barcelona",
    priority: 0.65,
    changeFrequency: "monthly",
    languages: { en: "/3-gastronomic-space-for-rent-in-barcelona", es: "/alquiler-espacio-gastronomico-en-barcelona", "x-default": "/alquiler-espacio-gastronomico-en-barcelona" },
  },
  {
    path: "/things-to-do-with-your-partner-at-home",
    priority: 0.6,
    changeFrequency: "monthly",
    languages: { en: "/things-to-do-with-your-partner-at-home", es: "/cosas-que-hacer-con-tu-pareja-en-casa", "x-default": "/cosas-que-hacer-con-tu-pareja-en-casa" },
  },
  { path: "/sushi-workshop-barcelona", priority: 0.6, changeFrequency: "monthly" },

  // ── Recetas (Recipe schema) ─────────────────────────────────────────
  { path: "/receta-de-caballa-marinada", priority: 0.6, changeFrequency: "monthly" },
  { path: "/receta-de-fricando-de-ternera", priority: 0.6, changeFrequency: "monthly" },
  { path: "/mellow-rice-with-mushrooms-recipe", priority: 0.55, changeFrequency: "monthly" },
  { path: "/veal-fricando-recipe", priority: 0.55, changeFrequency: "monthly" },

  // ── Blog index ──────────────────────────────────────────────────────
  {
    path: "/blog",
    priority: 0.75,
    changeFrequency: "weekly",
    languages: { es: "/blog", ca: "/ca/blog", en: "/en/blog", "x-default": "/blog" },
  },

  // ── Catalán (CA) ────────────────────────────────────────────────────
  { path: "/ca", priority: 0.6, changeFrequency: "weekly" },
  { path: "/ca/cena-clandestina", priority: 0.6, changeFrequency: "weekly" },
  { path: "/ca/menu-degustacion", priority: 0.6, changeFrequency: "weekly" },
  { path: "/ca/regalo", priority: 0.55, changeFrequency: "weekly" },
  { path: "/ca/grupos", priority: 0.55, changeFrequency: "weekly" },
  { path: "/ca/contacto", priority: 0.5, changeFrequency: "monthly" },
  { path: "/ca/blog", priority: 0.55, changeFrequency: "weekly" },

  // ── Inglés (EN) ─────────────────────────────────────────────────────
  { path: "/en", priority: 0.6, changeFrequency: "weekly" },
  { path: "/en/tasting-menu", priority: 0.6, changeFrequency: "weekly" },
  { path: "/en/blog", priority: 0.55, changeFrequency: "weekly" },

  // ── Legal ───────────────────────────────────────────────────────────
  { path: "/privacidad", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/aviso-legal", priority: 0.3, changeFrequency: "yearly" },
];

// Grupos dinámicos: claves de eventosData en app/grupos/[slug]/page.tsx
const grupoSlugs = ["team-building", "cenas-empresa", "celebraciones", "corporativo"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Páginas estáticas
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const push = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    lastModified: Date,
    languages?: Record<string, string>,
  ) => {
    const url = `${baseUrl}${path === "/" ? "" : path}`;
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({
      url,
      lastModified,
      changeFrequency,
      priority,
      ...(languages ? { alternates: { languages: alt(languages) } } : {}),
    });
  };

  for (const e of staticEntries) {
    push(e.path, e.priority, e.changeFrequency, now, e.languages);
  }

  // Blog posts (app/blog/[slug] + carpetas estáticas — dedupe por URL)
  for (const post of blogPosts) {
    push(
      `/blog/${post.slug}`,
      0.75,
      "monthly",
      post.publishedAt ? new Date(post.publishedAt) : now,
    );
  }

  // Grupos / eventos privados dinámicos
  for (const slug of grupoSlugs) {
    push(`/grupos/${slug}`, 0.8, "monthly", now);
  }

  // Páginas publicadas desde el Page Builder (BD)
  try {
    const dbPages = await prisma.page.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    for (const p of dbPages) {
      if (!p.slug) continue;
      push(`/${p.slug}`, 0.6, "monthly", p.updatedAt ?? now);
    }
  } catch {
    // Sin conexión a BD (p. ej. durante build) → omitimos páginas dinámicas
  }

  return entries;
}
