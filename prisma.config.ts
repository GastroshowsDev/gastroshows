import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
    // @ts-ignore - directUrl is required by Prisma 7 for migrations but type is missing
    directUrl: env("DIRECT_URL"),
  },
});
