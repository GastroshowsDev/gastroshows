import { withAuth } from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";
import type { NextFetchEvent } from "next/server";

/**
 * Combined Middleware:
 * 1. Handles SEO 301/302 Redirects for public pages.
 * 2. Handles Auth and Role-based access for /admin pages.
 */

// ── Auth logic (from legacy proxy.ts) ──
const authMiddleware = withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role ?? "LIVE";
    const { pathname } = req.nextUrl;

    // LIVE users cannot access Estadísticas or Usuarios
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
export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;

  // 1. If it's an ADMIN route, use the auth middleware
  if (path.startsWith("/admin")) {
    if (path.startsWith("/admin/login") || path.startsWith("/admin/reset-password")) {
      return NextResponse.next();
    }
    return authMiddleware(request as NextRequestWithAuth, event);
  }

  // 2. Skip static files, API routes, and Next.js internals for SEO redirects
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes(".") // Static files like .ico, .png, etc.
  ) {
    return NextResponse.next();
  }

  // 3. Check for SEO redirects via internal API
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
    // If the redirect check fails, continue normally
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match admin routes and all public paths for SEO check
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
