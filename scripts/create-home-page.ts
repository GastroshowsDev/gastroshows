/**
 * Script to create the home page if it doesn't exist
 * Run with: npx tsx scripts/create-home-page.ts
 */

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env.local") });

async function createHomePage() {
  const { prisma } = await import("@/lib/prisma");

  try {
    const existing = await prisma.page.findFirst({
      where: { slug: "home" },
    });

    if (existing) {
      console.log("✓ Home page already exists");
      return;
    }

    const page = await prisma.page.create({
      data: {
        title: "Inicio",
        slug: "home",
        published: true,
        blocks: {
          create: [
            {
              type: "HERO",
              order: 0,
              content: {
                title: "Bienvenido a GastroShows",
                subtitle: "Una experiencia culinaria única",
                backgroundImage: "https://images.unsplash.com/photo-1504674900769-0c87f05540c9?w=1200",
                buttonText: "Reservar ahora",
                buttonLink: "/reservar",
              },
            },
            {
              type: "TEXT",
              order: 1,
              content: {
                text: "Descubre una experiencia gastronómica sin igual",
                alignment: "center",
                color: "#1f2937",
              },
            },
          ],
        },
      },
    });

    console.log("✓ Home page created successfully");
    console.log(`  ID: ${page.id}`);
    console.log(`  Slug: ${page.slug}`);
  } catch (error) {
    console.error("✗ Error creating home page:", error);
    process.exit(1);
  } finally {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$disconnect();
  }
}

createHomePage();
