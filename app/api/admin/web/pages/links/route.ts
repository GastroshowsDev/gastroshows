import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      where: { published: true },
      select: { title: true, slug: true }
    });
    return NextResponse.json({ ok: true, data: pages });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Failed to fetch page links" }, { status: 500 });
  }
}
