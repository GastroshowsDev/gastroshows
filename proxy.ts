import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Modern Middleware (proxy.ts convention for Next.js 16.x)
 * Handling Auth and SEO Redirects manually for maximum control.
 */
export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  console.log(`[Middleware] Path: ${path} | Secret present: ${!!process.env.NEXTAUTH_SECRET}`);

  // 1. Skip system paths and public assets
  if (
    path.startsWith("/_next") ||
    path.includes(".") ||
    path.startsWith("/api/auth") ||
    (path.startsWith("/api") && !path.startsWith("/api/admin") && !path.startsWith("/api/public"))
  ) {
    return NextResponse.next();
  }

  // 2. SEO Redirects (ONLY in Production)
  if (process.env.NODE_ENV === "production") {
    try {
      const apiUrl = new URL("/api/public/redirect", req.url);
      apiUrl.searchParams.set("path", path);
      const res = await fetch(apiUrl.toString(), { headers: { "x-middleware-check": "1" } });
      if (res.ok) {
        const data = await res.json();
        if (data.redirect) {
          return NextResponse.redirect(new URL(data.redirect.toPath, req.url), data.redirect.statusCode);
        }
      }
    } catch (err) {
      // Ignore redirect errors
    }
  }

  // 3. Auth Protection for /admin and /api/admin
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    // Skip login and reset-password
    if (path.startsWith("/admin/login") || path.startsWith("/admin/reset-password")) {
      return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      console.log(`[Middleware] No token for path: ${path}. Redirecting to login.`);
      const url = new URL("/admin/login", req.url);
      // Don't add callbackUrl for API routes
      if (!path.startsWith("/api")) {
        url.searchParams.set("callbackUrl", path);
      }
      return path.startsWith("/api") 
        ? NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
        : NextResponse.redirect(url);
    }

    // Role-based protection
    const role = (token.role as string) || "LIVE";
    if (role === "LIVE") {
      const restricted = ["/admin/estadisticas", "/admin/usuarios", "/api/admin/usuarios"];
      if (restricted.some(p => path.startsWith(p))) {
        return path.startsWith("/api")
          ? NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 })
          : NextResponse.redirect(new URL("/admin/live", req.url));
      }
    }
  }

  // 4. Default: Add security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Security headers for admin
  if (path.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/((?!api|auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
