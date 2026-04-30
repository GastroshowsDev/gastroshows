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
    const { key, originalKey, subject, content, htmlContent } = await request.json();

    if (!key || !subject) {
      return NextResponse.json({ ok: false, error: "Faltan campos obligatorios (clave y asunto)" }, { status: 400 });
    }

    // If the key was renamed, delete the old entry first
    if (originalKey && originalKey !== key) {
      await prisma.emailTemplate.deleteMany({ where: { templateKey: originalKey } });
    }

    const template = await prisma.emailTemplate.upsert({
      where: { templateKey: key },
      create: { templateKey: key, subject, htmlContent: content || htmlContent || "" },
      update: { subject, htmlContent: content || htmlContent || "" },
    });

    return NextResponse.json({ ok: true, data: template });
  } catch (err) {
    console.error("[api/templates] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error al guardar plantilla" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { key } = await request.json();
    if (!key) return NextResponse.json({ ok: false, error: "Clave requerida" }, { status: 400 });
    await prisma.emailTemplate.deleteMany({ where: { templateKey: key } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Error al eliminar plantilla" }, { status: 500 });
  }
}
