import { prisma } from "../lib/prisma";

async function main() {
  console.log("🚀 Iniciando limpieza y transformación artística...");

  // 1. Limpiar bloques con HTML roto y bloques vacíos
  const pages = await prisma.page.findMany({
    include: { blocks: true }
  });

  for (const page of pages) {
    console.log(`📄 Procesando página: ${page.title} (${page.slug})`);

    for (const block of page.blocks) {
      let content = block.content as any;
      let changed = false;

      // Limpiar HTML de textos migrados accidentalmente como literales
      if (block.type === "TEXT" || block.type === "HERO" || block.type === "CTA") {
        const fieldsToClean = ["body", "title", "subtitle", "eyebrow", "text"];
        fieldsToClean.forEach(field => {
          if (content[field] && typeof content[field] === "string") {
            const original = content[field];
            const cleaned = original.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ");
            if (original !== cleaned) {
              content[field] = cleaned;
              changed = true;
            }
          }
        });
      }

      // Aplicar estilos "Espaciales/Picassianos" por defecto
      if (!content.styles) content.styles = {};
      
      if (block.type === "HERO") {
        content.styles.animation = "gs-nebula-rotate";
        content.titleStyles = { ...content.titleStyles, className: "gs-cosmic-glow" };
        changed = true;
      }

      if (block.type === "IMAGE") {
        content.styles.className = "gs-picasso-mask gs-3d-lift";
        changed = true;
      }

      // Eliminar bloques vacíos o sin sentido (opcional, ser precavido)
      const isEmpty = (block.type === "TEXT" && !content.body) || 
                      (block.type === "IMAGE" && !content.src);

      if (isEmpty) {
        console.log(`  🗑 Eliminando bloque vacío: ${block.id}`);
        await prisma.pageBlock.delete({ where: { id: block.id } });
        continue;
      }

      if (changed) {
        await prisma.pageBlock.update({
          where: { id: block.id },
          data: { content }
        });
      }
    }
  }

  console.log("✅ Transformación completada.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
