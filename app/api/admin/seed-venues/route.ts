import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    console.log("🌱 Seeding venues...");

    const venues = [
      {
        name: "BERTRAND" as const,
        capacity: 40,
        rules: {},
      },
      {
        name: "URGELL" as const,
        capacity: 40,
        rules: {},
      },
    ];

    const created = [];

    for (const venue of venues) {
      const exists = await prisma.venue.findUnique({
        where: { name: venue.name },
      });

      if (!exists) {
        const v = await prisma.venue.create({
          data: venue,
        });
        created.push(v.name);
        console.log(`✅ Created venue: ${v.name}`);
      } else {
        console.log(`⏭️  Venue already exists: ${venue.name}`);
      }
    }

    const all = await prisma.venue.findMany();

    return NextResponse.json({
      ok: true,
      message: `Venues seeded successfully`,
      created,
      total: all.length,
      venues: all.map(v => ({ name: v.name, capacity: v.capacity })),
    });
  } catch (error) {
    console.error("❌ Error seeding venues:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
