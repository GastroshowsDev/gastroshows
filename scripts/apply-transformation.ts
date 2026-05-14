import { prisma } from "../lib/prisma";

async function main() {
  console.log("🚀 Aplicando transformación radical a la página principal...");

  const homePage = await prisma.page.findUnique({
    where: { slug: "home" },
    include: { blocks: { orderBy: { order: "asc" } } }
  });

  if (!homePage) {
    console.error("No se encontró la página home.");
    return;
  }

  // Mover todos los bloques existentes un nivel hacia abajo
  for (const block of homePage.blocks) {
    await prisma.pageBlock.update({
      where: { id: block.id },
      data: { order: block.order + 10 }
    });
  }

  // Insertar el plato artístico al principio
  console.log("🎨 Insertando Plato Artístico...");
  await prisma.pageBlock.create({
    data: {
      pageId: homePage.id,
      type: "ARTISTIC_PLATE",
      order: 0,
      content: {
        title: "La Alquimia de Gastroshows",
        subtitle: "Donde los ingredientes del universo se fusionan en una experiencia que desafía los sentidos."
      }
    }
  });

  // Aplicar estilos "Glassmorphism" y "Picasso" a las secciones existentes
  for (const block of homePage.blocks) {
    if (block.type === "SECTION") {
      let content = block.content as any;
      if (!content.styles) content.styles = {};
      
      // Aplicar clase espacial a la sección
      content.styles.className = "gs-glass-spatial gs-3d-lift";
      
      await prisma.pageBlock.update({
        where: { id: block.id },
        data: { content }
      });
    }
  }

  console.log("✅ Transformación aplicada.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
