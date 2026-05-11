/**
 * POST /api/admin/pages/init
 * Initialize with home page if it doesn't exist
 */

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const existing = await prisma.page.findFirst({
      where: { slug: "home" },
    });

    if (existing) {
      return NextResponse.json({
        ok: true,
        message: "Home page already exists",
        data: existing,
      });
    }

    const page = await prisma.page.create({
      data: {
        title: "Inicio",
        slug: "home",
        published: true,
        blocks: {
          create: [
            {
              type: "HERO",
              order: 0,
              content: {
                title: "Bienvenido a GastroShows",
                subtitle: "Una experiencia culinaria única",
                backgroundImage: "https://images.unsplash.com/photo-1504674900769-0c87f05540c9?w=1200",
                buttonText: "Reservar ahora",
                buttonLink: "/reservar",
              },
            },
            {
              type: "TEXT",
              order: 1,
              content: {
                text: "Descubre una experiencia gastronómica sin igual",
                alignment: "center",
                color: "#1f2937",
              },
            },
          ],
        },
      },
      include: { blocks: true },
    });

    return NextResponse.json({
      ok: true,
      message: "Home page created",
      data: page,
    });
  } catch (error) {
    console.error("[pages/init]", error);
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR", error: "Failed to initialize pages" },
      { status: 500 }
    );
  }
}
