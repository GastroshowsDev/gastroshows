import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const templates = await prisma.emailTemplate.findMany({
      orderBy: { templateKey: "asc" }
    });
    // Map to include 'content' as an alias for 'htmlContent' for frontend compatibility
    const data = templates.map(t => ({
      ...t,
      key: t.templateKey,
      content: t.htmlContent
    }));
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Error al obtener plantillas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { key, subject, content, htmlContent } = await request.json();
    
    if (!key || !subject) {
      return NextResponse.json({ ok: false, error: "Faltan campos" }, { status: 400 });
    }

    const template = await prisma.emailTemplate.upsert({
      where: { templateKey: key },
      create: {
        templateKey: key,
        subject,
        htmlContent: content || htmlContent || "",
      },
      update: {
        subject,
        htmlContent: content || htmlContent || "",
      },
    });

    return NextResponse.json({ ok: true, data: template });
  } catch (err) {
    console.error("[api/templates] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error al guardar plantilla" }, { status: 500 });
  }
}
