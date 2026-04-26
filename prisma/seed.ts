import "dotenv/config";
import { VenueName } from "@prisma/client";

import { prisma } from "../lib/prisma";

async function main() {
  const bertrand = await prisma.venue.upsert({
    where: { name: VenueName.BERTRAND },
    update: { capacity: 16, rules: { softCap: 14, hardCap: 16 } },
    create: {
      name: VenueName.BERTRAND,
      capacity: 16,
      rules: { softCap: 14, hardCap: 16 },
    },
  });

  const urgell = await prisma.venue.upsert({
    where: { name: VenueName.URGELL },
    update: { capacity: 24, rules: { softCap: 22, hardCap: 24 } },
    create: {
      name: VenueName.URGELL,
      capacity: 24,
      rules: { softCap: 22, hardCap: 24 },
    },
  });

  await prisma.emailTemplate.upsert({
    where: { templateKey: "D4_BERTRAND" },
    update: {
      venueId: bertrand.id,
      subject: "Gastro Shows - Tu experiencia se acerca (D-4)",
      htmlContent:
        "<h1>Hola {{nombre}}</h1><p>Tu reserva en Bertrand es el {{fecha}} ({{turno}}).</p>",
    },
    create: {
      venueId: bertrand.id,
      templateKey: "D4_BERTRAND",
      subject: "Gastro Shows - Tu experiencia se acerca (D-4)",
      htmlContent:
        "<h1>Hola {{nombre}}</h1><p>Tu reserva en Bertrand es el {{fecha}} ({{turno}}).</p>",
    },
  });

  await prisma.emailTemplate.upsert({
    where: { templateKey: "D4_URGELL" },
    update: {
      venueId: urgell.id,
      subject: "Gastro Shows - Tu experiencia se acerca (D-4)",
      htmlContent:
        "<h1>Hola {{nombre}}</h1><p>Tu reserva en Urgell es el {{fecha}} ({{turno}}).</p>",
    },
    create: {
      venueId: urgell.id,
      templateKey: "D4_URGELL",
      subject: "Gastro Shows - Tu experiencia se acerca (D-4)",
      htmlContent:
        "<h1>Hola {{nombre}}</h1><p>Tu reserva en Urgell es el {{fecha}} ({{turno}}).</p>",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed error:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
