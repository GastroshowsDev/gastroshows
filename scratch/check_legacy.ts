import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const landingContent = await prisma.landingContent.findMany();
  console.log("--- CONTENIDO LANDING (LEGACY) ---");
  console.log(`Encontrados ${landingContent.length} items.`);
  landingContent.slice(0, 5).forEach(item => {
    console.log(`Key: ${item.key} | Section: ${item.section} | Label: ${item.label}`);
  });

  const settings = await prisma.setting.findMany();
  console.log("--- SETTINGS ---");
  settings.forEach(s => {
    console.log(`Key: ${s.key}`);
  });
}

main();
