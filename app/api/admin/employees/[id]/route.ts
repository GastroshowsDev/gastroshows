import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.employee.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { active } = await request.json();
    const employee = await prisma.employee.update({
      where: { id: params.id },
      data: { active },
    });
    return NextResponse.json(employee);
  } catch (error) {
    console.error("Failed to update employee:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
