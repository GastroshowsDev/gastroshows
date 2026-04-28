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
    await prisma.holiday.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete holiday:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
