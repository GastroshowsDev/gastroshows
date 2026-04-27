import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); 

import { PrismaClient } from "@prisma/client";

// In Prisma 7, just use the default constructor and it will pick up DATABASE_URL from process.env
const prisma = new PrismaClient();

async function migrate() {
  console.log("🚀 Iniciando migración de bloques...");
  
  try {
    const blocks = await prisma.pageBlock.findMany();
    console.log(`🔍 Encontrados ${blocks.length} bloques totales.`);
    let migratedCount = 0;

    for (const block of blocks) {
      const content = block.content as any;
      let newContent = content;
      let newType = block.type;

      // 1. Migrar bloques COLUMNS antiguos a SECTION con Átomos
      if (block.type === "COLUMNS" || block.type === "SECTION") {
        // Si el bloque SECTION ya tiene el formato nuevo (tiene elementos), no lo tocamos
        const hasElements = content.columns && content.columns.length > 0 && content.columns[0].elements;
        if (hasElements) continue;

        console.log(`📦 Migrando bloque ${block.id} (${block.type})...`);
        
        const oldColumns = content.columns || [];
        const newColumns = oldColumns.map((col: any) => {
          const elements: any[] = [];
          
          if (col.title) elements.push({ type: "HEADING", level: 3, text: col.title });
          if (col.text) elements.push({ type: "TEXT", body: col.text });
          if (col.image) elements.push({ type: "IMAGE", src: col.image, alt: col.title || "" });

          return {
            width: col.width || `${100 / (oldColumns.length || 1)}%`,
            elements
          };
        });

        newContent = {
          columns: newColumns,
          styles: { padding: "4rem 2rem" }
        };
        newType = "SECTION";
      }

      // 2. Migrar bloques TEXT antiguos a SECTION con Átomo HEADING/TEXT
      if (block.type === "TEXT") {
          console.log(`📝 Migrando bloque TEXT ${block.id}...`);
          const elements = [];
          if (content.title) elements.push({ type: "HEADING", level: 2, text: content.title });
          if (content.body) elements.push({ type: "TEXT", body: content.body });

          newContent = {
              columns: [{ width: "100%", elements }],
              styles: { padding: "4rem 2rem" }
          };
          newType = "SECTION";
      }

      // Actualizar en DB si ha cambiado
      if (newType !== block.type || JSON.stringify(newContent) !== JSON.stringify(content)) {
        await prisma.pageBlock.update({
          where: { id: block.id },
          data: {
            type: newType as any,
            content: newContent
          }
        });
        migratedCount++;
      }
    }

    console.log(`✅ Migración completada. ${migratedCount} bloques actualizados.`);
  } catch (err) {
    console.error("❌ Error durante la migración:", err);
  }
}

migrate()
  .catch(e => console.error("❌ Error fatal:", e))
  .finally(() => prisma.$disconnect());
