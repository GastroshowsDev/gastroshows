import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const employees = await prisma.employee.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, email, phone, pin } = await request.json();
    if (!name || !pin) return NextResponse.json({ error: "Name and PIN are required" }, { status: 400 });
    
    // Ensure PIN is exactly 4 digits
    if (!/^\d{4}$/.test(pin)) {
      return NextResponse.json({ error: "El PIN debe tener exactamente 4 dígitos" }, { status: 400 });
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        email: email || null,
        phone: phone || null,
        pin,
      },
    });

    return NextResponse.json(employee);
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "El PIN o Email ya está en uso por otro empleado" }, { status: 400 });
    }
    console.error("Failed to create employee:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
