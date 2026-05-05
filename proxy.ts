import { withAuth } from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";
import type { NextFetchEvent } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Combined Middleware (proxy.ts):
 * 1. Protects /api/admin routes.
 * 2. Handles Auth and Role-based access for /admin pages.
 * 3. Handles SEO 301/302 Redirects (Enabled ONLY in Production).
 */

// ── Auth logic for admin UI ──
const authMiddleware = withAuth(
  function proxy(req) {
    const role = req.nextauth.token?.role ?? "LIVE";
    const { pathname } = req.nextUrl;

    if (role === "LIVE") {
      if (
        pathname.startsWith("/admin/estadisticas") ||
        pathname.startsWith("/admin/usuarios")
      ) {
        return NextResponse.redirect(new URL("/admin/live", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
    pages: { signIn: "/admin/login" },
  }
);

// ── Main Middleware Dispatcher ──
export default async function proxy(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;

  // 1. FAST SKIP: Ignore static files and internal Next.js paths immediately
  if (
    path.startsWith("/_next") ||
    path.includes(".") ||
    (path.startsWith("/api") && !path.startsWith("/api/admin"))
  ) {
    return NextResponse.next();
  }

  // 2. Protect ADMIN API routes — token + role-based access
  if (path.startsWith("/api/admin")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const role = (token.role as "ADMIN" | "LIVE" | undefined) ?? "LIVE";

    // Endpoints accesibles también por rol LIVE (operativa de sala).
    // Cualquier ruta /api/admin/* fuera de esta lista exige rol ADMIN.
    const LIVE_ALLOWED_PREFIXES = [
      "/api/admin/reservations/live",
      "/api/admin/reservations/pending",
      "/api/admin/reservations/merge",
      "/api/admin/reservations/allergies",
      "/api/admin/visits",
      "/api/admin/venues",
    ];
    const LIVE_ALLOWED_EXACT = new Set<string>([]);

    const isLiveAllowed =
      LIVE_ALLOWED_EXACT.has(path) ||
      LIVE_ALLOWED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));

    if (role !== "ADMIN" && !isLiveAllowed) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.next();
  }

  // 3. Admin UI Auth
  if (path.startsWith("/admin")) {
    if (path.startsWith("/admin/login") || path.startsWith("/admin/reset-password")) {
      return NextResponse.next();
    }
    return authMiddleware(request as NextRequestWithAuth, event);
  }

  // 4. SEO Redirects (ONLY in Production to avoid local deadlocks)
  if (process.env.NODE_ENV === "production") {
    try {
      const apiUrl = new URL("/api/public/redirect", request.url);
      apiUrl.searchParams.set("path", path);

      const res = await fetch(apiUrl.toString(), {
        headers: { "x-middleware-check": "1" },
      });

      if (res.ok) {
        const data = (await res.json()) as { redirect?: { toPath: string; statusCode: number } };
        if (data.redirect) {
          const destination = new URL(data.redirect.toPath, request.url);
          return NextResponse.redirect(destination, data.redirect.statusCode);
        }
      }
    } catch {
      // Continue normally if fetch fails
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
