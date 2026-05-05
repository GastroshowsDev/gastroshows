import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json() as { name?: string; email?: string; password?: string; role?: "ADMIN" | "LIVE"; defaultVenue?: string };

    const data: Record<string, unknown> = {};
    if (body.name) data.name = body.name.trim();
    if (body.email) data.email = body.email.trim().toLowerCase();
    if (body.role) data.role = body.role;
    if ("defaultVenue" in body) data.defaultVenue = body.defaultVenue || null;
    if (body.password) {
      if (body.password.length < 8) {
        return NextResponse.json({ ok: false, error: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 });
      }
      data.passwordHash = await bcrypt.hash(body.password, 12);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, defaultVenue: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, data: user });
  } catch (err) {
    console.error("[users/id] PATCH error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    if (auth.session.user?.id && auth.session.user.id === id) {
      return NextResponse.json(
        { ok: false, error: "No puedes eliminar tu propia cuenta" },
        { status: 400 },
      );
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[users/id] DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
