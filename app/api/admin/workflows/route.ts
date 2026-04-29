import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const workflows = await prisma.workflow.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ ok: true, data: workflows });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Error al obtener flujos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, trigger, active, steps } = body;
    
    if (!name || !trigger || !steps) {
      return NextResponse.json({ ok: false, error: "Faltan campos" }, { status: 400 });
    }

    const workflow = await prisma.workflow.upsert({
      where: { id: id || "new-id" },
      create: {
        name,
        trigger,
        active: active ?? true,
        steps: steps || []
      },
      update: {
        name,
        trigger,
        active: active ?? true,
        steps: steps || []
      },
    });

    return NextResponse.json({ ok: true, data: workflow });
  } catch (err) {
    console.error("[api/workflows] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error al guardar flujo" }, { status: 500 });
  }
}
