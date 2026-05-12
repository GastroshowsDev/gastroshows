import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as cheerio from "cheerio";
import axios from "axios";

// Match project's Prisma instantiation logic
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL no encontrada en el entorno.");
  process.exit(1);
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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

    // 1. Detectar HERO (Sección con fondo y contenido)
    const firstSection = $(".et_pb_section").first();
    const heroBg = firstSection.css("background-image") || "";
    const heroTitle = firstSection.find("h1").text().trim();
    
    if (firstSection.length) {
      blocks.push({
        type: "HERO",
        content: {
          bgImage: heroBg.replace(/url\(["']?(.*?)["']?\)/, "$1") || ogImage,
          title: heroTitle || title,
          overlayOpacity: 60,
          styles: { minHeight: "70dvh" }
        }
      });
    }

    // 2. Iterar por Secciones de Divi
    $(".et_pb_section").each((idx, section) => {
      if (idx === 0 && blocks.length > 0) return; // Saltar el hero si ya se procesó
      
      const $section = $(section);
      const rows = $section.find(".et_pb_row");

      rows.each((_, row) => {
        const $row = $(row);
        const columns: any[] = [];
        
        $row.find(".et_pb_column").each((_, col) => {
          const $col = $(col);
          const elements: any[] = [];
          
          // Buscar módulos de Divi dentro de la columna
          $col.find(".et_pb_module").each((_, module) => {
            const $mod = $(module);
            
            // Texto y Títulos (Mejorado para capturar todo el contenido)
            if ($mod.hasClass("et_pb_text")) {
              const inner = $mod.find(".et_pb_text_inner");
              inner.children().each((_, child) => {
                const $child = $(child);
                const tagName = $child.prop("tagName").toLowerCase();
                
                if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
                  elements.push({ 
                    type: "HEADING", 
                    level: parseInt(tagName.substring(1)), 
                    text: $child.text().trim() 
                  });
                } else {
                  // Capturar cualquier otro bloque como TEXT
                  elements.push({ 
                    type: "TEXT", 
                    body: $child.html() || $child.text().trim() 
                  });
                }
              });

              // Si no hay hijos directos pero hay texto (caso raro en Divi pero posible)
              if (inner.children().length === 0 && inner.text().trim()) {
                elements.push({ type: "TEXT", body: inner.html() });
              }
            }
            
            // Acordeones (Muy común en Gastroshows)
            else if ($mod.hasClass("et_pb_accordion")) {
              $mod.find(".et_pb_accordion_item").each((_, item) => {
                const $item = $(item);
                const aTitle = $item.find(".et_pb_accordion_item_title").text().trim();
                const aContent = $item.find(".et_pb_accordion_content").html();
                
                if (aTitle) elements.push({ type: "HEADING", level: 4, text: `🔹 ${aTitle}` });
                if (aContent) elements.push({ type: "TEXT", body: aContent });
              });
            }
            
            // Imágenes
            else if ($mod.hasClass("et_pb_image")) {
              const $img = $mod.find("img");
              if ($img.length) {
                elements.push({ type: "IMAGE", src: $img.attr("src"), alt: $img.attr("alt") || "" });
              }
            }
            
            // Botones
            else if ($mod.hasClass("et_pb_button_module_wrapper") || $mod.hasClass("et_pb_button")) {
              const $btn = $mod.is("a") ? $mod : $mod.find("a");
              if ($btn.length) {
                elements.push({ type: "BUTTON", text: $btn.text().trim(), link: $btn.attr("href") });
              }
            }

            // Blurbs (Icono + Texto)
            else if ($mod.hasClass("et_pb_blurb")) {
              const bTitle = $mod.find(".et_pb_module_header").text().trim();
              const bContent = $mod.find(".et_pb_blurb_description").html();
              const bImg = $mod.find(".et_pb_main_blurb_image img").attr("src");
              
              if (bImg) elements.push({ type: "IMAGE", src: bImg, alt: bTitle });
              if (bTitle) elements.push({ type: "HEADING", level: 3, text: bTitle });
              if (bContent) elements.push({ type: "TEXT", body: bContent });
            }
          });

          if (elements.length > 0) {
            // Determinar ancho basado en clase de Divi
            let width = "100%";
            if ($col.hasClass("et_pb_column_1_2")) width = "50%";
            else if ($col.hasClass("et_pb_column_1_3")) width = "33.33%";
            else if ($col.hasClass("et_pb_column_2_3")) width = "66.66%";
            else if ($col.hasClass("et_pb_column_1_4")) width = "25%";

            columns.push({ width, elements });
          }
        });

        if (columns.length > 0) {
          blocks.push({
            type: "SECTION",
            content: { columns, styles: { padding: "4rem 2rem" } }
          });
        }
      });
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
