import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true, role: true, defaultVenue: true, createdAt: true },
  });
  return NextResponse.json({ ok: true, data: users });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json() as { name: string; email: string; password: string; role?: "ADMIN" | "LIVE"; defaultVenue?: string };
    if (!body.name?.trim() || !body.email?.trim() || !body.password) {
      return NextResponse.json({ ok: false, error: "Nombre, email y contraseña son obligatorios" }, { status: 400 });
    }
    if (body.password.length < 8) {
      return NextResponse.json({ ok: false, error: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await prisma.user.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        passwordHash,
        role: body.role ?? "LIVE",
        defaultVenue: body.defaultVenue || null,
      },
      select: { id: true, name: true, email: true, role: true, defaultVenue: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, data: user }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("Unique constraint")) {
      return NextResponse.json({ ok: false, error: "Ya existe un usuario con ese email" }, { status: 409 });
    }
    console.error("[users] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
