import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    const config = settings.reduce((acc, curr) => ({
      ...acc,
      [curr.key]: curr.value
    }), { demo_mode: "true" }); // Default to true
    
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { key, value } = await req.json();
    
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) }
    });
    
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("[admin/settings] POST error:", error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message || "Failed to update setting" 
    }, { status: 500 });
  }
}
