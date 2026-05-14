import { prisma } from "./lib/prisma";
prisma.page.findUnique({
  where: { slug: "home" },
  include: { blocks: { orderBy: { order: "asc" } } }
}).then(p => {
  console.log("Total blocks:", p?.blocks.length);
  p?.blocks.forEach(b => console.log(b.type, b.order));
}).finally(() => prisma.$disconnect());

