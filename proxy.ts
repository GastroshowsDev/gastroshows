import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import type { NextFetchEvent } from "next/server";

const authProxy = withAuth(
  function proxy(req) {
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

export function proxy(request: NextRequest, event: NextFetchEvent) {
  return authProxy(request as unknown as NextRequestWithAuth, event);
}

export const proxyConfig = {
  matcher: ["/admin/((?!login|reset-password).*)"],
};
