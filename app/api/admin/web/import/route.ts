import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * POST /api/admin/web/import
 * Imports a page structure from JSON.
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    let body = await req.json();
    
    // Improved Scrape transformation logic
    if (body.url && !body.slug) {
      const urlObj = new URL(body.url);
      const slug = urlObj.pathname === "/" ? "home" : urlObj.pathname.split("/").filter(Boolean).pop() || "imported";
      
      const pageBlocks: any[] = [];
      const ogImage = body.open_graph?.image || (body.images && body.images.find((img: any) => !img.src.includes("svg"))?.src) || "";

      // 1. Hero Block
      pageBlocks.push({
        type: "HERO",
        content: {
          bgImage: ogImage,
          title: body.title || "Página Importada",
          titleAccent: "EXPERIENCIA",
          overlayOpacity: 60,
          styles: { minHeight: "70dvh" }
        }
      });

      // 2. Main Content Section (from geo or headings)
      const elements: any[] = [];
      
      // Add lead paragraphs
      const leadParagraphs = body.geo?.lead_paragraphs || [];
      if (leadParagraphs.length > 0) {
        elements.push({
          type: "TEXT",
          body: leadParagraphs.map((p: string) => `<p>${p}</p>`).join(""),
          styles: { fontSize: "1.1rem", marginBottom: "2rem" }
        });
      }

      // Add Headings and content
      if (body.headings?.h2?.length > 0) {
        body.headings.h2.forEach((h: string, idx: number) => {
          elements.push({ type: "HEADING", level: 2, text: h, styles: { marginTop: "2rem" } });
          elements.push({ type: "TEXT", body: `<p>Contenido detallado para la sección ${idx + 1}.</p>`, styles: { marginBottom: "2rem" } });
        });
      }

      pageBlocks.push({
        type: "SECTION",
        content: {
          columns: [{ width: "100%", elements }],
          styles: { padding: "4rem 2rem" }
        }
      });

      // 3. Image Gallery Section (if images available)
      if (body.images && body.images.length > 3) {
        const galleryImages = body.images.slice(0, 6).map((img: any) => ({ src: img.src, alt: img.alt || "" }));
        pageBlocks.push({
          type: "SECTION",
          content: {
            columns: [{ 
              width: "100%", 
              elements: [{ type: "IMAGE", src: galleryImages[0].src, alt: galleryImages[0].alt, styles: { width: "100%", borderRadius: "12px" } }] 
            }],
            styles: { padding: "4rem 2rem", backgroundColor: "#F9FAFB" }
          }
        });
      }

      body = {
        title: body.title || "Página Importada",
        slug: slug,
        seoTitle: body.title,
        seoDesc: body.meta_description,
        ogImage: ogImage,
        blocks: pageBlocks,
        oldPath: urlObj.pathname,
        createRedirect: body.createRedirect
      };
    }

    let items = Array.isArray(body) ? body : [body];
    const results = [];

    for (const item of items) {
      const { title, slug, seoTitle, seoDesc, blocks, ogImage, createRedirect, oldPath } = item;

      if (!title || !slug) continue;

      // Clean slug
      const cleanSlug = slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const result = await prisma.$transaction(async (tx) => {
        // 1. Create or Update Page
        let page = await tx.page.findUnique({ where: { slug: cleanSlug } });

        if (page) {
          page = await tx.page.update({
            where: { id: page.id },
            data: {
              title,
              seoTitle: seoTitle || title,
              seoDesc: seoDesc || null,
              ogImage: ogImage || null,
              updatedAt: new Date(),
            },
          });
          await tx.pageBlock.deleteMany({ where: { pageId: page.id } });
        } else {
          page = await tx.page.create({
            data: {
              title,
              slug: cleanSlug,
              seoTitle: seoTitle || title,
              seoDesc: seoDesc || null,
              ogImage: ogImage || null,
              published: false,
            },
          });
        }

        // 2. Create Blocks
        if (blocks && Array.isArray(blocks)) {
          for (let i = 0; i < blocks.length; i++) {
            const b = blocks[i];
            await tx.pageBlock.create({
              data: {
                pageId: page.id,
                type: b.type || "SECTION",
                content: b.content || {},
                order: i,
              },
            });
          }
        }

        // 3. Create Redirect if requested
        if (createRedirect && oldPath && oldPath !== `/${cleanSlug}`) {
          await tx.redirect.upsert({
            where: { fromPath: oldPath },
            update: { toPath: `/${cleanSlug}` },
            create: { fromPath: oldPath, toPath: `/${cleanSlug}` },
          });
        }

        return page;
      });
      results.push(result);
    }

    return NextResponse.json({ ok: true, data: results[0], count: results.length });
  } catch (err: any) {
    console.error("[api] POST /admin/web/import failed:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed to import page" }, { status: 500 });
  }
}
