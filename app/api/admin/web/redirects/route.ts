import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const redirects = await prisma.redirect.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ ok: true, data: redirects });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Failed to fetch redirects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { fromPath, toPath, statusCode } = await req.json();

    // 1. Validation: Prevent loops
    if (fromPath === toPath) {
      return NextResponse.json({ ok: false, error: "Origen y destino no pueden ser iguales (Bucle detectado)" }, { status: 400 });
    }

    // 2. Validation: Check for existing redirect chain
    const targetRedirect = await prisma.redirect.findUnique({ where: { fromPath: toPath } });
    if (targetRedirect) {
      return NextResponse.json({ ok: false, error: `Cuidado: ${toPath} ya redirige a ${targetRedirect.toPath}. Evita cadenas de redirección.` }, { status: 400 });
    }

    const redirect = await prisma.redirect.create({
      data: { 
        fromPath: fromPath.startsWith("/") ? fromPath : "/" + fromPath, 
        toPath: toPath.startsWith("/") ? toPath : "/" + toPath, 
        statusCode: statusCode || 301 
      }
    });

    return NextResponse.json({ ok: true, data: redirect });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ ok: false, error: "Ya existe una redirección para este origen" }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: "Error al crear redirección" }, { status: 500 });
  }
}
