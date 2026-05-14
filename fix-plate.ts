import { prisma } from "./lib/prisma";

async function fixBlock() {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
    include: { blocks: true }
  });

  if (!page) return;

  for (const block of page.blocks) {
    const content = block.content as any;
    if (content.title === "La Alquimia de Gastroshows") {
      console.log("Fixing block", block.id);
      await prisma.pageBlock.update({
        where: { id: block.id },
        data: {
          type: "ARTISTIC_PLATE",
          content: {
            title: "La Alquimia de Gastroshows",
            subtitle: "Donde los ingredientes del universo se fusionan en una experiencia que desafía los sentidos."
          }
        }
      });
    }
  }
}

fixBlock().then(() => prisma.$disconnect());
