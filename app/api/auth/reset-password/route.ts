import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json() as { token: string; password: string };
    if (!token || !password) return NextResponse.json({ ok: false, error: "Token y contraseña requeridos" }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ ok: false, error: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 });

    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!resetToken) return NextResponse.json({ ok: false, error: "Token inválido" }, { status: 400 });
    if (resetToken.usedAt) return NextResponse.json({ ok: false, error: "Token ya utilizado" }, { status: 400 });
    if (resetToken.expiresAt < new Date()) return NextResponse.json({ ok: false, error: "Token expirado" }, { status: 400 });

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.$transaction([
      prisma.user.update({ where: { email: resetToken.email }, data: { passwordHash } }),
      prisma.passwordResetToken.update({ where: { token }, data: { usedAt: new Date() } }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reset-password] error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
