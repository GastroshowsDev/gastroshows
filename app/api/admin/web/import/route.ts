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
    
    // Check if it's the "Scrape" format and transform it
    if (body.url && !body.slug) {
      const urlObj = new URL(body.url);
      const slug = urlObj.pathname === "/" ? "home" : urlObj.pathname.split("/").filter(Boolean).pop() || "imported";
      
      const elements: any[] = [];
      const ogImage = body.open_graph?.image || (body.images && body.images.find((img: any) => !img.src.includes("svg"))?.src) || "";

      // 1. Add Title as Heading
      elements.push({ 
        type: "HEADING", 
        level: 1, 
        text: body.title || "Página Importada", 
        styles: { textAlign: "center", marginBottom: "3rem" } 
      });

      // 2. Add OG Image if exists
      if (ogImage) {
        elements.push({
          type: "IMAGE",
          src: ogImage,
          alt: body.title || "",
          styles: { width: "100%", borderRadius: "12px", marginBottom: "3rem" }
        });
      }

      // 3. Add Lead Paragraphs as Text
      const leadParagraphs = body.geo?.lead_paragraphs || [];
      if (leadParagraphs.length > 0) {
        elements.push({
          type: "TEXT",
          body: leadParagraphs.map((p: string) => `<p>${p}</p>`).join(""),
          styles: { fontSize: "1.2rem", lineHeight: "1.8", marginBottom: "4rem" }
        });
      }

      // 4. Add H2 Headings and sub-content
      if (body.headings?.h2?.length > 0) {
        body.headings.h2.forEach((h: string) => {
          elements.push({
            type: "HEADING",
            level: 2,
            text: h,
            styles: { marginTop: "3rem", marginBottom: "1.5rem", borderBottom: "1px solid #EEE", paddingBottom: "0.5rem" }
          });
          elements.push({
            type: "TEXT",
            body: "<p>Contenido importado para esta sección. Puedes editarlo o moverlo.</p>",
            styles: { color: "#666", marginBottom: "2rem" }
          });
        });
      }

      body = {
        title: body.title || "Página Importada",
        slug: slug,
        seoTitle: body.title,
        seoDesc: body.meta_description,
        ogImage: ogImage,
        blocks: [{
          type: "SECTION",
          content: {
            columns: [{ width: "100%", elements }],
            styles: { paddingTop: "6rem", paddingBottom: "10rem", maxWidth: "900px" }
          }
        }],
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
