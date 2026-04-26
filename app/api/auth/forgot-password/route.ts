import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { email } = await request.json() as { email: string };
    if (!email) return NextResponse.json({ ok: false, error: "Email requerido" }, { status: 400 });

    // Always return success to avoid user enumeration
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (user) {
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
      const resetToken = await prisma.passwordResetToken.create({
        data: { email: user.email, expiresAt },
      });

      const baseUrl = process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
      const resetUrl = `${baseUrl}/admin/reset-password?token=${resetToken.token}`;

      await sendMail({
        to: user.email,
        subject: "GastroShows — Recuperar contraseña",
        html: `
          <p>Hola ${user.name},</p>
          <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
          <p><a href="${resetUrl}" style="background:#7C3AED;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block">Restablecer contraseña</a></p>
          <p>El enlace caduca en 1 hora. Si no solicitaste este cambio, ignora este email.</p>
          <p style="color:#999;font-size:12px">${resetUrl}</p>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[forgot-password] error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
