import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { requireAdmin } from "@/lib/auth-helpers";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const appDir = path.join(process.cwd(), "app");
    const entries = fs.readdirSync(appDir, { withFileTypes: true });

    const hardcodedPages = entries
      .filter(entry => {
        if (!entry.isDirectory()) return false;
        const name = entry.name;
        // Ignore system folders
        if (["api", "admin", "[slug]", "ca", "en", "fichaje", "booking-confirmation", "booking-payment-failed", "demo-pago"].includes(name)) return false;
        
        // Check if page.tsx exists
        const pagePath = path.join(appDir, name, "page.tsx");
        return fs.existsSync(pagePath);
      })
      .map(entry => ({
        id: `hardcoded-${entry.name}`,
        title: entry.name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        slug: entry.name,
        type: "hardcoded",
        published: true, // TSX files are considered published if they exist
        updatedAt: fs.statSync(path.join(appDir, entry.name, "page.tsx")).mtime.toISOString(),
      }));

    // Special case for root page.tsx (Home)
    if (fs.existsSync(path.join(appDir, "page.tsx"))) {
      hardcodedPages.unshift({
        id: "hardcoded-home",
        title: "Inicio (Home)",
        slug: "",
        type: "hardcoded",
        published: true,
        updatedAt: fs.statSync(path.join(appDir, "page.tsx")).mtime.toISOString(),
      });
    }

    return NextResponse.json({ ok: true, data: hardcodedPages });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
