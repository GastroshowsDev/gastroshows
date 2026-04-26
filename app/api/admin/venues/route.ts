import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

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
