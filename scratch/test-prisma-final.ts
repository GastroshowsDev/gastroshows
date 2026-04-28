import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

// Load env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function test() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set in .env.local");
    return;
  }

  console.log("Connecting to:", connectionString.split("@")[1]);

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("Checking prisma models...");
    const keys = Object.keys(prisma);
    console.log("Available models/properties:", keys.filter(k => !k.startsWith("$") && !k.startsWith("_")));

    if ((prisma as any).promotionConfig) {
      console.log("Found promotionConfig! Attempting findUnique...");
      const config = await (prisma as any).promotionConfig.findUnique({ where: { id: "default" } });
      console.log("Config result:", config);
    } else {
      console.error("CRITICAL: promotionConfig is MISSING from prisma client.");
    }
  } catch (err) {
    console.error("Error during test:", err);
  } finally {
    await pool.end();
  }
}

test();
