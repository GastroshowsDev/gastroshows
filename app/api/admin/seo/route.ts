import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function adminOnly() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") return adminOnly();

  try {
    const settings = await prisma.seoSettings.findUnique({ where: { id: "default" } });
    return NextResponse.json({ ok: true, settings });
  } catch {
    return NextResponse.json({ ok: true, settings: null });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") return adminOnly();

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Whitelist allowed fields
  const allowed = [
    "siteTitle", "metaDescription", "metaKeywords",
    "ogTitle", "ogDescription", "ogImage",
    "twitterCard", "twitterHandle", "canonicalUrl", "robots",
    "googleSiteVerification", "bingSiteVerification",
    "googleAnalyticsId", "googleTagManagerId",
    "metaPixelId", "tiktokPixelId", "linkedinPartnerId", "hotjarId",
    "googleAdsId", "googleAdsLabel",
    "customHeadScripts", "customBodyScripts", "schemaOrg",
  ] as const;

  const data: Record<string, string | null> = {};
  for (const key of allowed) {
    if (key in body) {
      data[key] = typeof body[key] === "string" && body[key].trim() !== "" ? body[key].trim() : null;
    }
  }
  // siteTitle must not be null
  if ("siteTitle" in data && !data.siteTitle) data.siteTitle = "GastroShows · Barcelona";
  if ("twitterCard" in data && !data.twitterCard) data.twitterCard = "summary_large_image";
  if ("robots" in data && !data.robots) data.robots = "index, follow";

  try {
    const settings = await prisma.seoSettings.upsert({
      where: { id: "default" },
      create: { id: "default", ...data },
      update: data,
    });
    return NextResponse.json({ ok: true, settings });
  } catch (err) {
    console.error("[seo PUT]", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
