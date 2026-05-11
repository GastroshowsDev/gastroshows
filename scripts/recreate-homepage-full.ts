/**
 * Script to recreate the full homepage with all sections
 * Run with: npx tsx scripts/recreate-homepage-full.ts
 */

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env.local") });

async function recreateHomepage() {
  const { prisma } = await import("@/lib/prisma");

  try {
    console.log("Recreating full homepage...\n");

    // Delete old home blocks
    const homePage = await prisma.page.findUnique({
      where: { slug: "home" },
    });

    if (homePage) {
      await prisma.pageBlock.deleteMany({
        where: { pageId: homePage.id },
      });
    }

    // Create full homepage with all sections
    const page = await prisma.page.upsert({
      where: { slug: "home" },
      update: {},
      create: {
        title: "Inicio",
        slug: "home",
        published: true,
        blocks: {
          create: [
            // ==================== SECCIÓN 1: HERO ====================
            {
              type: "HERO",
              order: 0,
              content: {
                title: "Gastroshows",
                subtitle: "Experiencias gastronómicas",
                backgroundImage: "[IMAGEN_PLATO_HERO]",
                buttonText: "Reservar",
                buttonLink: "/reservar",
                secondaryButtonText: "Regalar",
                secondaryButtonLink: "/regalar",
                badge: "CLANDESTINO",
                badgeSecondary: "REVELADO",
                badgeColor: "#D4A574",
                location: "BARCELONA",
                description: "Una noche que empieza antes de que llegues.",
                hasIcons: true,
                iconsType: "gift,calendar,whatsapp",
                hasCookiesBadge: true,
              },
            },

            // ==================== SECCIÓN 2: EL RITUAL ====================
            {
              type: "TEXT",
              order: 1,
              content: {
                text: "EL RITUAL",
                alignment: "center",
                color: "#D4A574",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "2px",
              },
            },
            {
              type: "TEXT",
              order: 2,
              content: {
                text: "Una cena que comienza",
                alignment: "center",
                color: "#1f2937",
                fontSize: "48px",
                fontWeight: "600",
              },
            },
            {
              type: "TEXT",
              order: 3,
              content: {
                text: "antes de que llegues.",
                alignment: "center",
                color: "#D4A574",
                fontSize: "48px",
                fontWeight: "400",
                fontStyle: "italic",
              },
            },
            {
              type: "CARDS_GRID",
              order: 4,
              content: {
                layout: "4-columns",
                backgroundColor: "#f5f3f0",
                padding: "60px 20px",
                cards: [
                  {
                    number: "01",
                    image: "[IMAGEN_MONTAÑA_1]",
                    hasImage: true,
                  },
                  {
                    badge: "D-3",
                    badgeLabel: "LA PISTA",
                    title: "Segundo Email",
                    description: "Una pista visual sobre lo que vas a degustar en la ubicación secreta.",
                    backgroundColor: "#ffffff",
                  },
                  {
                    badge: "D-2",
                    badgeLabel: "EL LUGAR",
                    title: "Tercer Email",
                    description: "Las coordenadas exactas para encontrarnos. El misterio se revela.",
                    backgroundColor: "#ffffff",
                  },
                  {
                    number: "04",
                    image: "[IMAGEN_MONTAÑA_2]",
                    hasImage: true,
                  },
                ],
              },
            },

            // ==================== SECCIÓN 3: EVENTOS PARA GRUPOS ====================
            {
              type: "HERO",
              order: 5,
              content: {
                title: "Un experiencia",
                subtitle: "que une a cualquier equipo",
                backgroundImage: "[IMAGEN_EVENTO_GRUPOS]",
                buttonText: "Celebra con nosotros",
                buttonLink: "/eventos-grupos",
                badge: "EVENTOS PARA GRUPOS",
                description: "Una experiencia clandestina para tu equipo con diferentes actividades relacionadas con la gastronomía: talleres de coctelería, competiciones de Masterchef, cenas clandestinas...",
                textColor: "#ffffff",
                subtitleColor: "#D4A574",
                descriptionColor: "#ffffff",
              },
            },

            // ==================== SECCIÓN 4: DISPONIBILIDAD ====================
            {
              type: "TEXT",
              order: 6,
              content: {
                text: "DISPONIBILIDAD",
                alignment: "left",
                color: "#D4A574",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "2px",
                paddingTop: "40px",
                paddingLeft: "20px",
              },
            },
            {
              type: "TEXT",
              order: 7,
              content: {
                text: "Hay 200 plazas libres esta semana",
                alignment: "left",
                color: "#1f2937",
                fontSize: "48px",
                fontWeight: "600",
                paddingLeft: "20px",
              },
            },
            {
              type: "AVAILABILITY_CALENDAR",
              order: 8,
              content: {
                layout: "4-days",
                backgroundColor: "#f5f3f0",
                padding: "40px 20px",
                days: [
                  {
                    dayOfWeek: "MIE",
                    date: "6",
                    month: "may",
                    slots: [
                      { time: "Noche", available: "40 lib.", total: "40 de 40 disponibles" },
                    ],
                  },
                  {
                    dayOfWeek: "JUE",
                    date: "7",
                    month: "may",
                    slots: [
                      { time: "Noche", available: "40 lib.", total: "40 de 40 disponibles" },
                    ],
                  },
                  {
                    dayOfWeek: "VIE",
                    date: "8",
                    month: "may",
                    slots: [
                      { time: "Noche", available: "40 lib.", total: "40 de 40 disponibles" },
                    ],
                  },
                  {
                    dayOfWeek: "SÁB",
                    date: "9",
                    month: "may",
                    slots: [
                      { time: "Med.", available: "40 lib.", total: "40 disponibles" },
                      { time: "Noche", available: "40 lib.", total: "80 de 80 disponibles" },
                    ],
                  },
                ],
                navigationLabel: "Esta semana",
              },
            },
            {
              type: "TEXT",
              order: 9,
              content: {
                text: "Reservar ahora",
                alignment: "center",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor: "#D4A574",
                padding: "16px 48px",
                borderRadius: "50px",
                marginTop: "40px",
                cursor: "pointer",
                link: "/reservar",
              },
            },

            // ==================== SECCIÓN 5: EXPERIENCIA INMERSIVA ====================
            {
              type: "HERO",
              order: 10,
              content: {
                title: "Gastroshows",
                subtitle: "Una experiencia inolvidable",
                backgroundImage: "[IMAGEN_COMIDA_CLOSE]",
                buttonText: "Quiero reservar",
                buttonLink: "/reservar",
                location: "BARCELONA",
                description: "Comida gourmet",
                textColor: "#ffffff",
                subtitleColor: "#D4A574",
                descriptionColor: "#ffffff",
              },
            },

            // ==================== FOOTER ====================
            {
              type: "FOOTER",
              order: 11,
              content: {
                backgroundColor: "#f5f3f0",
                columns: [
                  {
                    type: "info",
                    logo: "GastroShows",
                    logoColor: "#D4A574",
                    description: "Una cena que comienza antes de que llegues. Cuatro mensajes, una ubicación secreta y una noche inolvidable en Barcelona.",
                  },
                  {
                    type: "navigation",
                    title: "NAVEGACIÓN",
                    titleColor: "#D4A574",
                    links: [
                      { label: "Regalar Experiencia", url: "/regalar" },
                      { label: "Reservar Mesa", url: "/reservar" },
                    ],
                  },
                  {
                    type: "legal",
                    title: "LEGAL",
                    titleColor: "#D4A574",
                    links: [
                      { label: "Aviso Legal", url: "/aviso-legal" },
                      { label: "Privacidad", url: "/privacidad" },
                      { label: "Política de Cookies", url: "/politica-cookies" },
                    ],
                  },
                  {
                    type: "social",
                    title: "SÍGUENOS",
                    titleColor: "#D4A574",
                    links: [
                      { label: "Instagram", url: "https://instagram.com" },
                      { label: "TikTok", url: "https://tiktok.com" },
                      { label: "Facebook", url: "https://facebook.com" },
                    ],
                  },
                ],
                copyright: "© 2026 GastroShows Barcelona. Las mejores cenas clandestinas.",
                credit: "Hecho con pasión en BCN",
                hasCookiesBadge: true,
                hasIcons: true,
              },
            },
          ],
        },
      },
      include: { blocks: true },
    });

    console.log(`✓ Homepage recreated successfully\n`);
    console.log("📋 SECCIONES CREADAS:");
    console.log("  1. HERO - Bienvenida con imagen plato");
    console.log("  2. EL RITUAL - 4 cards con progresión D-3, D-2");
    console.log("  3. EVENTOS PARA GRUPOS - Sección oscura con imagen");
    console.log("  4. DISPONIBILIDAD - Calendario de 4 días");
    console.log("  5. EXPERIENCIA INMERSIVA - HERO con imagen comida close");
    console.log("  6. FOOTER - Completo con navegación y links legales\n");
    console.log("⚠️  PRÓXIMO PASO: Reemplazar placeholders de imágenes\n");
    console.log("📷 IMÁGENES NECESARIAS:");
    console.log("  - [IMAGEN_PLATO_HERO] - Plato gourmet (sección 1)");
    console.log("  - [IMAGEN_MONTAÑA_1] - Triángulo/montaña (ritual card 1)");
    console.log("  - [IMAGEN_MONTAÑA_2] - Triángulo/montaña (ritual card 4)");
    console.log("  - [IMAGEN_EVENTO_GRUPOS] - Gente en evento (sección 3)");
    console.log("  - [IMAGEN_COMIDA_CLOSE] - Close-up comida (sección 5)");
  } catch (error) {
    console.error("✗ Error recreating homepage:", error);
    process.exit(1);
  } finally {
    const { prisma: p } = await import("@/lib/prisma");
    await p.$disconnect();
  }
}

recreateHomepage();
