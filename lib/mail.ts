/**
 * Email sender with dual configuration:
 *   1. Database settings (table Setting) — preferred, managed from admin panel
 *   2. Environment variables (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM) — fallback
 * 
 * If neither is configured, emails are printed to console (dev fallback).
 */
import { prisma } from "@/lib/prisma";

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  fromName: string;
  replyTo: string;
  secure: boolean;
}

/** Cache SMTP settings for 5 minutes to avoid DB hits on every email */
let cachedConfig: SmtpConfig | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function getSmtpConfig(): Promise<SmtpConfig | null> {
  const now = Date.now();
  if (cachedConfig && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedConfig;
  }

  try {
    // Try loading from database (Setting table)
    const settings = await prisma.setting.findMany({
      where: {
        key: {
          in: [
            "smtp_host", "smtp_port", "smtp_user", "smtp_pass",
            "smtp_from", "smtp_from_name", "smtp_reply_to", "smtp_secure",
          ],
        },
      },
    });

    const map = new Map(settings.map((s) => [s.key, s.value]));

    const host = map.get("smtp_host") || process.env.SMTP_HOST || "";
    const user = map.get("smtp_user") || process.env.SMTP_USER || "";
    const pass = map.get("smtp_pass") || process.env.SMTP_PASS || "";

    if (!host || !user || !pass) return null;

    cachedConfig = {
      host,
      port: Number(map.get("smtp_port") || process.env.SMTP_PORT || 587),
      user,
      pass,
      from: map.get("smtp_from") || process.env.SMTP_FROM || "no-reply@gastroshows.com",
      fromName: map.get("smtp_from_name") || "Gastroshows",
      replyTo: map.get("smtp_reply_to") || "",
      secure: (map.get("smtp_secure") || "false") === "true",
    };
    cacheTimestamp = now;
    return cachedConfig;
  } catch {
    // Fallback to env vars if DB is unreachable
    const host = process.env.SMTP_HOST || "";
    const user = process.env.SMTP_USER || "";
    const pass = process.env.SMTP_PASS || "";
    if (!host || !user || !pass) return null;

    return {
      host,
      port: Number(process.env.SMTP_PORT || 587),
      user,
      pass,
      from: process.env.SMTP_FROM || "no-reply@gastroshows.com",
      fromName: "Gastroshows",
      replyTo: "",
      secure: false,
    };
  }
}

/** Invalidate the cached config (call after saving settings in admin) */
export function invalidateSmtpCache() {
  cachedConfig = null;
  cacheTimestamp = 0;
}

export async function sendMail({ to, subject, html, replyTo }: MailOptions): Promise<void> {
  const config = await getSmtpConfig();

  if (!config) {
    console.log("\n─── EMAIL (no SMTP configured) ──────────────────");
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:    ${html.replace(/<[^>]+>/g, "").slice(0, 300)}`);
    console.log("─────────────────────────────────────────────────\n");
    return;
  }

  // Dynamic import so nodemailer is optional at build time
  // @ts-ignore — resolved at runtime
  const nodemailer = await import("nodemailer").catch(() => null);
  if (!nodemailer) {
    console.error("[mail] nodemailer not installed — run: npm install nodemailer");
    return;
  }

  const transporter = nodemailer.default.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure || config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });

  const fromAddress = config.fromName
    ? `"${config.fromName}" <${config.from}>`
    : config.from;

  await transporter.sendMail({
    from: fromAddress,
    to,
    subject,
    html,
    replyTo: replyTo || config.replyTo || undefined,
  });
}

/**
 * Test the SMTP connection without sending a real email.
 * Returns true if connection succeeds.
 */
export async function testSmtpConnection(): Promise<{ ok: boolean; error?: string }> {
  const config = await getSmtpConfig();
  if (!config) return { ok: false, error: "SMTP no configurado" };

  // @ts-ignore
  const nodemailer = await import("nodemailer").catch(() => null);
  if (!nodemailer) return { ok: false, error: "nodemailer no instalado" };

  const transporter = nodemailer.default.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure || config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });

  try {
    await transporter.verify();
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
