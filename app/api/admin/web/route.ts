import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ALL_DEFAULTS, getLandingContent } from "@/lib/landing-content";

function adminOnly() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// GET — return full content map merged with defaults
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return adminOnly();

  const content = await getLandingContent();
  return NextResponse.json({ ok: true, content });
}

// PUT — batch upsert content entries
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return adminOnly();

  const body = (await req.json()) as { updates: Record<string, string> };
  if (!body.updates || typeof body.updates !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Only allow keys that exist in ALL_DEFAULTS
  const allowed = new Set(Object.keys(ALL_DEFAULTS));
  const ops = Object.entries(body.updates)
    .filter(([key]) => allowed.has(key))
    .map(([key, value]) => {
      const meta = ALL_DEFAULTS[key]!;
      return prisma.landingContent.upsert({
        where: { key },
        update: { value },
        create: {
          key,
          value,
          type: meta.type,
          label: meta.label,
          section: meta.section,
          order: meta.order,
        },
      });
    });

  await prisma.$transaction(ops);
  return NextResponse.json({ ok: true, saved: ops.length });
}

// POST /api/admin/web?action=seed — populate DB with all defaults (for fresh installs)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return adminOnly();

  const { searchParams } = new URL(req.url);
  if (searchParams.get("action") !== "seed") {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  const ops = Object.entries(ALL_DEFAULTS).map(([key, meta]) =>
    prisma.landingContent.upsert({
      where: { key },
      update: {},
      create: {
        key,
        value: meta.defaultValue,
        type: meta.type,
        label: meta.label,
        section: meta.section,
        order: meta.order,
      },
    })
  );

  await prisma.$transaction(ops);
  return NextResponse.json({ ok: true, seeded: ops.length });
}
