import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config(); // Carga .env si existe como backup

import { scrapeGastroshowsPage } from "../lib/migration/scraper";
import { prisma } from "../lib/prisma";

async function main() {
  const targetUrl = process.argv[2];
  if (!targetUrl) {
    console.log("Uso: npx tsx scripts/scrape-page.ts <URL>");
    process.exit(1);
  }

  const result = await scrapeGastroshowsPage(targetUrl);
  
  if (result.success) {
    console.log(`✅ ${result.message}`);
  } else {
    console.error(`❌ ${result.message}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
