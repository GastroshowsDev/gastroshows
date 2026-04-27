import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("🚀 Iniciando migración maestra de bloques...");

  try {
    const blocks = await prisma.pageBlock.findMany();
    let migratedCount = 0;

    for (const block of blocks) {
      const content = block.content as any;
      if (!content) continue;
      
      let newContent = content;
      let newType = block.type;

      // 1. Migrar bloques COLUMNS antiguos a SECTION con Átomos
      if (block.type === "COLUMNS" || (block.type === "SECTION" && !content.columns?.[0]?.elements)) {
        console.log(`📦 Migrando bloque ${block.id} (${block.type})...`);
        
        const rawColumns = content.columns;
        const oldColumns = Array.isArray(rawColumns) ? rawColumns : (rawColumns ? [rawColumns] : []);
        
        const newColumns = oldColumns.map((col: any) => {
          if (!col) return { width: "100%", elements: [] };
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
          styles: content.styles || { padding: "4rem 2rem" }
        };
        newType = "SECTION";
      }

      // 2. Migrar bloques TEXT antiguos a SECTION con Átomo HEADING/TEXT
      if (block.type === "TEXT" && !content.columns) {
          console.log(`📝 Migrando bloque TEXT ${block.id}...`);
          newContent = {
              columns: [{ 
                width: "100%", 
                elements: [
                    ...(content.title ? [{ type: "HEADING", level: 2, text: content.title }] : []),
                    ...(content.body ? [{ type: "TEXT", body: content.body }] : [])
                ] 
              }],
              styles: content.styles || { padding: "4rem 2rem" }
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

    return NextResponse.json({ ok: true, migratedCount, message: "Migración completada con éxito" });
  } catch (err: any) {
    console.error("❌ Error en migración:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
