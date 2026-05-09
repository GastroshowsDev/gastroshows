import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    // Intentar enviar por SMTP si está configurado
    try {
      const { prisma } = await import("@/lib/prisma");
      const smtpSettings = await prisma.sMTPSettings?.findUnique?.({ where: { id: "default" } }).catch(() => null);

      if (smtpSettings?.host) {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          host: smtpSettings.host,
          port: smtpSettings.port,
          secure: smtpSettings.secure,
          auth: { user: smtpSettings.user, pass: smtpSettings.password },
        });

        await transporter.sendMail({
          from: smtpSettings.fromEmail || smtpSettings.user,
          to: smtpSettings.fromEmail || "info@gastroshows.es",
          subject: `[Web] Contacto: ${subject} - ${name}`,
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
            <p><strong>Motivo:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
          replyTo: email,
        });
      }
    } catch {
      // Si no hay SMTP configurado, simplemente continúa sin error
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
