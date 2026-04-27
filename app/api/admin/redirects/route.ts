import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/redirects — List all redirects
 */
export async function GET() {
  try {
    const redirects = await prisma.redirect.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, data: redirects });
  } catch (err) {
    console.error("[api] GET /admin/redirects failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to list redirects" }, { status: 500 });
  }
}

/**
 * POST /api/admin/redirects — Create a new redirect
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      fromPath: string;
      toPath: string;
      statusCode?: number;
    };

    if (!body.fromPath || !body.toPath) {
      return NextResponse.json({ ok: false, error: "fromPath and toPath required" }, { status: 400 });
    }

    // Normalize paths to start with /
    const fromPath = body.fromPath.startsWith("/") ? body.fromPath : `/${body.fromPath}`;
    const toPath = body.toPath.startsWith("/") ? body.toPath : `/${body.toPath}`;

    const redirect = await prisma.redirect.create({
      data: {
        fromPath,
        toPath,
        statusCode: body.statusCode ?? 301,
      },
    });

    return NextResponse.json({ ok: true, data: redirect }, { status: 201 });
  } catch (err) {
    console.error("[api] POST /admin/redirects failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to create redirect" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/redirects — Delete a redirect
 */
export async function DELETE(req: Request) {
  try {
    const { id } = (await req.json()) as { id: string };
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    }
    await prisma.redirect.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api] DELETE /admin/redirects failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to delete redirect" }, { status: 500 });
  }
}
