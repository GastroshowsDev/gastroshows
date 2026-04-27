import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/public/redirect?path=/old-slug
 *
 * Used by the middleware to check for 301/302 redirects.
 * Returns the redirect target if a match is found.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  if (!path) {
    return NextResponse.json({});
  }

  try {
    const redirect = await prisma.redirect.findUnique({
      where: { fromPath: path },
    });

    if (redirect) {
      return NextResponse.json({
        redirect: {
          toPath: redirect.toPath,
          statusCode: redirect.statusCode,
        },
      });
    }
  } catch {
    // Table might not exist yet during migration
  }

  return NextResponse.json({});
}
