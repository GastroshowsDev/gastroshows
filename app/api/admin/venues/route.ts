import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const venues = await prisma.venue.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ ok: true, data: venues });
  } catch (err) {
    console.error("[api] GET /admin/venues failed:", err);
    return NextResponse.json({ ok: false, error: "Error al cargar locales" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    if (!body.name?.trim()) {
      return NextResponse.json({ ok: false, error: "Nombre obligatorio" }, { status: 400 });
    }
    const normalizedName = (body.name as string).trim().toUpperCase().replace(/\s+/g, "_");
    const existing = await prisma.venue.findUnique({ where: { name: normalizedName } });
    if (existing) {
      return NextResponse.json({ ok: false, error: "Ya existe ese local" }, { status: 409 });
    }
    const venue = await prisma.venue.create({
      data: { name: normalizedName, capacity: body.capacity ?? 40, rules: body.rules ?? {} },
    });
    return NextResponse.json({ ok: true, data: venue }, { status: 201 });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[api] POST /admin/venues failed:", errorMsg);
    return NextResponse.json({ ok: false, error: `Error al crear local: ${errorMsg}` }, { status: 500 });
  }
}
