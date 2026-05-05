import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { testSmtpConnection, invalidateSmtpCache, sendMail } from "@/lib/mail";
import { requireAdmin } from "@/lib/auth-helpers";

const SMTP_KEYS = [
  "smtp_host", "smtp_port", "smtp_user", "smtp_pass",
  "smtp_from", "smtp_from_name", "smtp_reply_to", "smtp_secure",
];

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: SMTP_KEYS } },
    });
    const map: Record<string, string> = {};
    for (const s of settings) {
      // Mask the password
      map[s.key] = s.key === "smtp_pass" ? (s.value ? "••••••••" : "") : s.value;
    }
    return NextResponse.json({ ok: true, data: map });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Error al obtener ajustes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const { action, settings, testEmail } = body;

    if (action === "save" && settings) {
      for (const [key, value] of Object.entries(settings)) {
        if (!SMTP_KEYS.includes(key)) continue;
        // Don't overwrite password with mask
        if (key === "smtp_pass" && value === "••••••••") continue;

        await prisma.setting.upsert({
          where: { key },
          create: { key, value: String(value) },
          update: { value: String(value) },
        });
      }
      invalidateSmtpCache();
      return NextResponse.json({ ok: true });
    }

    if (action === "test") {
      invalidateSmtpCache();
      const result = await testSmtpConnection();
      return NextResponse.json({ ok: result.ok, error: result.error });
    }

    if (action === "test_send" && testEmail) {
      invalidateSmtpCache();
      try {
        await sendMail({
          to: testEmail,
          subject: "✅ Test Gastroshows — SMTP configurado correctamente",
          html: `
            <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; color: #0A0A0A; font-weight: 300;">¡Conexión exitosa!</h1>
              <p style="color: #666; line-height: 1.6;">
                Este email confirma que tu servidor SMTP (Mailrelay) está correctamente configurado en Gastroshows.
              </p>
              <p style="color: #666; line-height: 1.6;">
                A partir de ahora, todas las plantillas, automatizaciones y campañas se enviarán a través de esta conexión.
              </p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="font-size: 12px; color: #aaa;">Gastroshows · Panel de Gestión</p>
            </div>
          `,
        });
        return NextResponse.json({ ok: true });
      } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message });
      }
    }

    return NextResponse.json({ ok: false, error: "Acción no válida" }, { status: 400 });
  } catch (err) {
    console.error("[api/smtp-settings] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
