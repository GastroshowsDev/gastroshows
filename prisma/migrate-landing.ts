import { prisma } from "../lib/prisma";
import { LANDING_DEFAULTS, EVENTOS_DEFAULTS } from "../lib/landing-content";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config(); // Fallback to .env

async function migrate() {
  console.log("🚀 Iniciando migración de contenido a Page Builder...");

  // 1. Obtener contenido actual de la base de datos
  const currentContent = await prisma.landingContent.findMany();
  const contentMap: Record<string, string> = {};
  
  // Llenar con defaults primero
  for (const [key, meta] of Object.entries({ ...LANDING_DEFAULTS, ...EVENTOS_DEFAULTS })) {
    contentMap[key] = meta.defaultValue;
  }
  // Sobrescribir con lo que hay en BD
  for (const row of currentContent) {
    contentMap[row.key] = row.value;
  }

  // 2. MIGRAR LANDING PRINCIPAL (slug: "home")
  console.log("Creating 'home' page...");
  const homePage = await prisma.page.upsert({
    where: { slug: "home" },
    update: {},
    create: {
      title: "Página de Inicio",
      slug: "home",
      published: true,
      seoTitle: "GastroShows · Barcelona | Experiencia Clandestina",
      seoDesc: "Una cena que comienza antes de que llegues. Una ubicación secreta que descubrirás tú solo.",
    },
  });

  // Borrar bloques anteriores si existen para reinicio limpio
  await prisma.pageBlock.deleteMany({ where: { pageId: homePage.id } });

  const homeBlocks = [
    {
      type: "HERO",
      content: {
        bgImage: contentMap["hero.bg_image"],
        eyebrow: contentMap["hero.location"],
        title: "GastroShows",
        titleAccent: "",
        subtitle: contentMap["hero.tagline"],
        ctaPrimaryText: contentMap["hero.cta_reservar"],
        ctaPrimaryLink: "#",
        ctaSecondaryText: contentMap["hero.cta_regalar"],
        ctaSecondaryLink: "#",
        overlayOpacity: 70,
      },
    },
    {
      type: "SPACER",
      content: { height: 140, gradient: "dark-to-light" },
    },
    {
      type: "TEXT",
      content: {
        eyebrow: contentMap["ritual.eyebrow"],
        title: contentMap["ritual.title_line1"],
        titleAccent: contentMap["ritual.title_em"],
        body: "",
        alignment: "center",
      },
    },
    {
      type: "AVAILABILITY",
      content: {},
    },
    {
      type: "SPACER",
      content: { height: 140, gradient: "light-to-dark" },
    },
    {
      type: "CTA",
      content: {
        eyebrow: contentMap["regalo.eyebrow"],
        title: contentMap["regalo.title_line1"],
        titleAccent: contentMap["regalo.title_em"],
        body: contentMap["regalo.body"],
        buttonText: contentMap["regalo.cta"],
        buttonLink: "#",
        bgImage: contentMap["regalo.bg_image"],
      },
    }
  ];

  await prisma.pageBlock.createMany({
    data: homeBlocks.map((b, i) => ({
      pageId: homePage.id,
      type: b.type,
      content: b.content as any,
      order: i,
    })),
  });

  // 3. MIGRAR EVENTOS (slug: "eventos")
  console.log("Creating 'eventos' page...");
  const eventosPage = await prisma.page.upsert({
    where: { slug: "eventos" },
    update: {},
    create: {
      title: "Eventos Privados",
      slug: "eventos",
      published: true,
      seoTitle: "Eventos Privados y Cenas de Empresa | GastroShows",
      seoDesc: "Reserva el local completo para tu grupo o celebración privada en Barcelona.",
    },
  });

  await prisma.pageBlock.deleteMany({ where: { pageId: eventosPage.id } });

  const eventosBlocks = [
    {
      type: "HERO",
      content: {
        bgImage: contentMap["ev.hero.bg_image"],
        title: contentMap["ev.hero.title_line1"],
        titleAccent: contentMap["ev.hero.title_em"],
        subtitle: contentMap["ev.hero.subtitle"],
        ctaPrimaryText: contentMap["ev.cta.button"],
        ctaPrimaryLink: `https://wa.me/${contentMap["ev.cta.whatsapp"].replace(/\D/g, "")}`,
        ctaSecondaryText: "",
        ctaSecondaryLink: "",
        overlayOpacity: 80,
      },
    },
    {
      type: "SPACER",
      content: { height: 120, gradient: "dark-to-light" },
    },
    {
      type: "TEXT",
      content: {
        eyebrow: contentMap["ev.feat.eyebrow"],
        title: contentMap["ev.feat.title"],
        titleAccent: "",
        body: "",
        alignment: "center",
      },
    },
    {
      type: "COLUMNS",
      content: {
        columns: 2,
        children: [
          [
            { id: "f1", type: "TEXT", content: { title: contentMap["ev.feat1.title"], body: contentMap["ev.feat1.body"], alignment: "left" } },
            { id: "f2", type: "TEXT", content: { title: contentMap["ev.feat2.title"], body: contentMap["ev.feat2.body"], alignment: "left" } }
          ],
          [
            { id: "f3", type: "TEXT", content: { title: contentMap["ev.feat3.title"], body: contentMap["ev.feat3.body"], alignment: "left" } },
            { id: "f4", type: "TEXT", content: { title: contentMap["ev.feat4.title"], body: contentMap["ev.feat4.body"], alignment: "left" } }
          ]
        ],
      },
    },
    {
      type: "CTA",
      content: {
        eyebrow: "Contacto",
        title: contentMap["ev.cta.title"],
        titleAccent: "",
        body: contentMap["ev.cta.body"],
        buttonText: contentMap["ev.cta.button"],
        buttonLink: `https://wa.me/${contentMap["ev.cta.whatsapp"].replace(/\D/g, "")}`,
        bgImage: "",
      },
    }
  ];

  await prisma.pageBlock.createMany({
    data: eventosBlocks.map((b, i) => ({
      pageId: eventosPage.id,
      type: b.type,
      content: b.content as any,
      order: i,
    })),
  });

  // 4. MIGRAR PÁGINAS LEGALES
  console.log("Creating legal pages...");
  const legalPages = [
    { slug: "aviso-legal", title: "Aviso Legal" },
    { slug: "privacidad", title: "Política de Privacidad" },
  ];

  for (const lp of legalPages) {
    const p = await prisma.page.upsert({
      where: { slug: lp.slug },
      update: {},
      create: {
        title: lp.title,
        slug: lp.slug,
        published: true,
        seoTitle: `${lp.title} | GastroShows`,
        seoDesc: lp.title,
      },
    });

    await prisma.pageBlock.deleteMany({ where: { pageId: p.id } });
    await prisma.pageBlock.create({
      data: {
        pageId: p.id,
        type: "TEXT",
        order: 0,
        content: {
          title: lp.title,
          body: `Contenido de ${lp.title}.\n\nEdita este bloque en el Page Builder para completar la información legal de tu empresa.`,
          alignment: "left",
        } as any,
      },
    });
  }

  console.log("✅ Migración completada con éxito.");
}

migrate()
  .catch((e) => {
    console.error("❌ Error en la migración:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
