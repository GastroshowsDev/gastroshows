import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { title, category, content, keywords } = await request.json();

    const article = await prisma.knowledgeArticle.create({
      data: {
        title,
        category,
        content,
        keywords,
        active: true,
        order: 999,
      },
    });

    return NextResponse.json({ ok: true, article }, { status: 201 });
  } catch (err: any) {
    console.error("[api/admin/asistente/articles] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error creating article" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, category, content, keywords } = await request.json();

    const article = await prisma.knowledgeArticle.update({
      where: { id },
      data: {
        title,
        category,
        content,
        keywords,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, article });
  } catch (err: any) {
    console.error("[api/admin/asistente/articles] PUT error:", err);
    return NextResponse.json({ ok: false, error: "Error updating article" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, active } = await request.json();

    const article = await prisma.knowledgeArticle.update({
      where: { id },
      data: { active, updatedAt: new Date() },
    });

    return NextResponse.json({ ok: true, article });
  } catch (err: any) {
    console.error("[api/admin/asistente/articles] PATCH error:", err);
    return NextResponse.json({ ok: false, error: "Error updating article" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    }

    await prisma.knowledgeArticle.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[api/admin/asistente/articles] DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Error deleting article" }, { status: 500 });
  }
}
