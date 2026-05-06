import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { validatePassword } from "@/lib/validators";
import { apiErrorResponse } from "@/lib/api-errors";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json() as { token: string; password: string };

    if (!token || !password) {
      return NextResponse.json(
        { ok: false, code: "INVALID_INPUT", error: "Token and password required" },
        { status: 400 }
      );
    }

    const pwValidation = validatePassword(password);
    if (!pwValidation.valid) {
      return NextResponse.json(
        { ok: false, code: "INVALID_INPUT", error: pwValidation.reason },
        { status: 400 }
      );
    }

    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!resetToken) {
      return NextResponse.json(
        { ok: false, code: "NOT_FOUND", error: "Invalid token" },
        { status: 400 }
      );
    }
    if (resetToken.usedAt) {
      return NextResponse.json(
        { ok: false, code: "CONFLICT", error: "Token already used" },
        { status: 400 }
      );
    }
    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { ok: false, code: "CONFLICT", error: "Token expired" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.$transaction([
      prisma.user.update({ where: { email: resetToken.email }, data: { passwordHash } }),
      prisma.passwordResetToken.update({ where: { token }, data: { usedAt: new Date() } }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const [data, status] = apiErrorResponse(err, "Failed to reset password");
    return NextResponse.json(data, { status });
  }
}
