import { getServerSession, type Session } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";

export type Role = "ADMIN" | "LIVE";

export type AuthorizedSession = Session & {
  user: { id?: string; email?: string | null; name?: string | null; role: Role };
};

function getRole(session: Session | null): Role | null {
  const role = (session?.user as { role?: string } | undefined)?.role;
  return role === "ADMIN" || role === "LIVE" ? role : null;
}

export async function requireAdmin(): Promise<
  { ok: true; session: AuthorizedSession } | { ok: false; response: NextResponse }
> {
  const session = await getServerSession(authOptions);
  const role = getRole(session);
  if (!session || role !== "ADMIN") {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: "Forbidden" },
        { status: session ? 403 : 401 },
      ),
    };
  }
  return { ok: true, session: session as AuthorizedSession };
}

export async function requireStaff(): Promise<
  { ok: true; session: AuthorizedSession; role: Role } | { ok: false; response: NextResponse }
> {
  const session = await getServerSession(authOptions);
  const role = getRole(session);
  if (!session || !role) {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: session ? "Forbidden" : "Unauthorized" },
        { status: session ? 403 : 401 },
      ),
    };
  }
  return { ok: true, session: session as AuthorizedSession, role };
}
