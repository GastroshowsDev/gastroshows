import { prisma } from "../lib/prisma";

async function seed() {
  console.log("Seeding PromotionConfig...");
  const existing = await prisma.promotionConfig.findUnique({ where: { id: "default" } });
  if (!existing) {
    await prisma.promotionConfig.create({
      data: { id: "default", wedThuActive: false }
    });
    console.log("Created default PromotionConfig.");
  } else {
    console.log("PromotionConfig already exists.");
  }
}

seed().catch(console.error).finally(() => process.exit());
