import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { validatePassword } from "@/lib/validators";
import { apiErrorResponse } from "@/lib/api-errors";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true, role: true, defaultVenue: true, createdAt: true },
  });
  return NextResponse.json({ ok: true, data: users });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json() as { name: string; email: string; password: string; role?: "ADMIN" | "LIVE"; defaultVenue?: string };

    if (!body.name?.trim() || !body.email?.trim() || !body.password) {
      return NextResponse.json(
        { ok: false, code: "INVALID_INPUT", error: "Name, email, and password required" },
        { status: 400 }
      );
    }

    const pwValidation = validatePassword(body.password);
    if (!pwValidation.valid) {
      return NextResponse.json(
        { ok: false, code: "INVALID_INPUT", error: pwValidation.reason },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await prisma.user.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        passwordHash,
        role: body.role ?? "LIVE",
        defaultVenue: body.defaultVenue || null,
      },
      select: { id: true, name: true, email: true, role: true, defaultVenue: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, data: user }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("Unique constraint")) {
      return NextResponse.json(
        { ok: false, code: "CONFLICT", error: "User with that email already exists" },
        { status: 409 }
      );
    }
    const [data, status] = apiErrorResponse(err, "Failed to create user");
    return NextResponse.json(data, { status });
  }
}
