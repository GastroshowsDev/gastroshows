import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * DEBUG: Check current session and auth config
 * Remove this in production!
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    session,
    env: {
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✓ Configured" : "✗ Missing",
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || "✗ Missing",
      ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ? "✓ Configured" : "✗ Missing",
      NODE_ENV: process.env.NODE_ENV,
    },
  });
}
