import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.page.findMany({
    include: { 
      _count: {
        select: { blocks: true }
      }
    }
  });

  console.log("--- LISTA DE PÁGINAS Y BLOQUES ---");
  pages.forEach(p => {
    console.log(`ID: ${p.id} | Slug: ${p.slug} | Bloques: ${p._count.blocks} | Creada: ${p.createdAt}`);
  });
}

main();
