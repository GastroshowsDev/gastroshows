import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware for handling 301 redirects from old URLs.
 *
 * Checks the `Redirect` table for matching paths and performs
 * permanent (301) or temporary (302) redirects accordingly.
 *
 * Note: We use a lightweight API call instead of importing Prisma directly
 * because Edge Middleware doesn't support Node.js-only modules.
 */
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip static files, API routes, admin, and Next.js internals
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/admin") ||
    path.includes(".") // Static files like .ico, .png, etc.
  ) {
    return NextResponse.next();
  }

  // Check for redirect via internal API
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
    // Match all paths except static files and API
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
