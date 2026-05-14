import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
    include: { blocks: { orderBy: { order: "asc" } } }
  });

  console.log(JSON.stringify(page, null, 2));
}

main();
