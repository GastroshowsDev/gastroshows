import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";
import axios from "axios";

const prisma = new PrismaClient();

async function scrapePage(url: string) {
  console.log(`🔍 Iniciando scrapeado de: ${url}`);
  
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    
    const title = $("title").text() || "Página Scrapeada";
    const seoDesc = $('meta[name="description"]').attr("content") || "";
    const ogImage = $('meta[property="og:image"]').attr("content") || "";
    
    // Generar slug desde la URL
    const urlObj = new URL(url);
    let slug = urlObj.pathname.split("/").filter(Boolean).pop() || "home";
    if (urlObj.pathname === "/") slug = "home";

    console.log(`📄 Título: ${title}`);
    console.log(`🔗 Slug: ${slug}`);

    const blocks: any[] = [];

    // 1. Detectar HERO (Primer elemento visual fuerte)
    // En gastroshows.es suele ser una sección con id o clase específica
    const heroSection = $(".wp-block-cover").first();
    if (heroSection.length) {
      const bgImg = heroSection.find("img").attr("src") || "";
      const h1 = heroSection.find("h1").text().trim();
      blocks.push({
        type: "HERO",
        content: {
          bgImage: bgImg,
          title: h1 || title,
          overlayOpacity: 70,
          styles: { minHeight: "80dvh" }
        }
      });
    }

    // 2. Iterar por bloques principales de contenido
    // WordPress usa clases como .wp-block-group o .wp-block-columns
    const mainContent = $("main, .entry-content, #content").first();
    const children = mainContent.children();

    children.each((_, el) => {
      const $el = $(el);
      
      // Saltamos el hero si ya lo procesamos
      if ($el.hasClass("wp-block-cover") && blocks.length > 0) return;

      // COLUMNAS
      if ($el.hasClass("wp-block-columns")) {
        const columns: any[] = [];
        $el.find(".wp-block-column").each((_, col) => {
          const $col = $(col);
          const elements: any[] = [];
          
          $col.children().each((_, child) => {
            const $child = $(child);
            if ($child.is("h1, h2, h3, h4, h5, h6")) {
              elements.push({ type: "HEADING", level: parseInt($child.prop("tagName").substring(1)), text: $child.text().trim() });
            } else if ($child.is("p")) {
              elements.push({ type: "TEXT", body: $child.html() });
            } else if ($child.find("img").length) {
              elements.push({ type: "IMAGE", src: $child.find("img").attr("src"), alt: $child.find("img").attr("alt") || "" });
            } else if ($child.find("a").hasClass("wp-block-button__link")) {
              elements.push({ type: "BUTTON", text: $child.find("a").text().trim(), link: $child.find("a").attr("href") });
            }
          });

          columns.push({
            width: $col.css("flex-basis") || `${100 / $el.find(".wp-block-column").length}%`,
            elements
          });
        });

        blocks.push({
          type: "SECTION",
          content: { columns, styles: { padding: "4rem 2rem" } }
        });
      }

      // GRUPOS (Secciones simples)
      else if ($el.hasClass("wp-block-group")) {
        const elements: any[] = [];
        $el.find("h1, h2, h3, p, img").each((_, item) => {
          const $item = $(item);
          if ($item.is("h1, h2, h3")) elements.push({ type: "HEADING", level: 2, text: $item.text().trim() });
          else if ($item.is("p")) elements.push({ type: "TEXT", body: $item.html() });
          else if ($item.is("img")) elements.push({ type: "IMAGE", src: $item.attr("src"), alt: $item.attr("alt") || "" });
        });

        if (elements.length > 0) {
          blocks.push({
            type: "SECTION",
            content: { columns: [{ width: "100%", elements }], styles: { padding: "4rem 2rem" } }
          });
        }
      }

      // ELEMENTOS SUELTOS
      else if ($el.is("h1, h2, h3")) {
        blocks.push({
          type: "SECTION",
          content: { columns: [{ width: "100%", elements: [{ type: "HEADING", level: 2, text: $el.text().trim() }] }], styles: { padding: "2rem" } }
        });
      }
      else if ($el.is("p")) {
        blocks.push({
          type: "SECTION",
          content: { columns: [{ width: "100%", elements: [{ type: "TEXT", body: $el.html() }] }], styles: { padding: "1rem 2rem" } }
        });
      }
    });

    // 3. Guardar en Base de Datos
    console.log(`💾 Guardando en DB (${blocks.length} bloques)...`);

    await prisma.$transaction(async (tx) => {
      // Upsert Page
      const page = await tx.page.upsert({
        where: { slug },
        update: {
          title,
          seoTitle: title,
          seoDesc,
          ogImage,
          updatedAt: new Date()
        },
        create: {
          title,
          slug,
          seoTitle: title,
          seoDesc,
          ogImage,
          published: false
        }
      });

      // Limpiar bloques antiguos
      await tx.pageBlock.deleteMany({ where: { pageId: page.id } });

      // Insertar nuevos bloques
      for (let i = 0; i < blocks.length; i++) {
        await tx.pageBlock.create({
          data: {
            pageId: page.id,
            type: blocks[i].type,
            content: blocks[i].content,
            order: i
          }
        });
      }

      console.log(`✅ Página "${title}" importada con éxito.`);
    });

  } catch (err: any) {
    console.error(`❌ Error scrapeando: ${err.message}`);
  }
}

// Ejecutar si se pasa URL por argumento
const targetUrl = process.argv[2];
if (targetUrl) {
  scrapePage(targetUrl)
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
} else {
  console.log("Uso: npx tsx scripts/scrape-page.ts <URL>");
}
