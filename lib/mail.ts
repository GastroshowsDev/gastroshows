/**
 * Simple email sender.
 * Configure SMTP via environment variables:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 * If not configured, the link is printed to console (development fallback).
 */

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: MailOptions): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? "no-reply@gastroshows.com";

  if (!host || !user || !pass) {
    // Development fallback — print to console
    console.log("\n─── EMAIL (no SMTP configured) ──────────────────");
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:    ${html.replace(/<[^>]+>/g, "")}`);
    console.log("─────────────────────────────────────────────────\n");
    return;
  }

  // Dynamic import so nodemailer is optional at build time
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore — resolved at runtime, types vary by install
  const nodemailer = await import("nodemailer").catch(() => null);
  if (!nodemailer) {
    console.error("[mail] nodemailer not installed — run: npm install nodemailer @types/nodemailer");
    return;
  }

  const transporter = nodemailer.default.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  await transporter.sendMail({ from, to, subject, html });
}
