import { prisma } from "../lib/prisma";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function test() {
  console.log("Checking prisma properties...");
  const keys = Object.keys(prisma);
  console.log("Keys on prisma:", keys);
  
  const models = Object.keys(prisma).filter(k => !k.startsWith("_") && !k.startsWith("$"));
  console.log("Found models:", models);

  if ((prisma as any).promotionConfig) {
    console.log("SUCCESS: promotionConfig exists.");
  } else {
    console.error("FAILURE: promotionConfig is MISSING.");
  }
}

test();

