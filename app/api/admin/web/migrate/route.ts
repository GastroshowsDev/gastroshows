import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { scrapeGastroshowsPage } from "@/lib/migration/scraper";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ ok: false, error: "URL is required" }, { status: 400 });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      return NextResponse.json({ ok: false, error: "Invalid URL format" }, { status: 400 });
    }

    const result = await scrapeGastroshowsPage(url);

    if (result.success) {
      return NextResponse.json({ 
        ok: true, 
        message: result.message,
        data: {
          title: result.pageTitle,
          slug: result.slug
        }
      });
    } else {
      return NextResponse.json({ ok: false, error: result.message }, { status: 500 });
    }
  } catch (err: any) {
    console.error("[api] POST /api/admin/web/migrate failed:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
