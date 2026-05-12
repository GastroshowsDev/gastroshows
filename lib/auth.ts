import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Try DB users first (may fail if table doesn't exist yet in production)
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });

          if (dbUser) {
            const valid = await bcrypt.compare(credentials.password, dbUser.passwordHash);
            if (!valid) return null;
            return { id: dbUser.id, email: dbUser.email, name: dbUser.name, role: dbUser.role, defaultVenue: dbUser.defaultVenue ?? null };
          }
        } catch (err) {
          console.warn("[auth] DB user lookup failed, falling back to env admin:", err);
        }

        // Fallback: env-based admin (backward compatibility during migration)
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash) return null;
        if (credentials.email.toLowerCase() !== adminEmail.toLowerCase()) return null;
        const valid = await bcrypt.compare(credentials.password, adminHash);
        if (!valid) return null;
        return { id: "env-admin", email: adminEmail, name: "Admin", role: "ADMIN" as const, defaultVenue: null };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = ((user as { role?: string }).role ?? "ADMIN") as "ADMIN" | "LIVE";
        token.defaultVenue = (user as { defaultVenue?: string | null }).defaultVenue ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure session.user exists with all required properties
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).name = token.name as string;
        (session.user as any).role = token.role as string;
        (session.user as any).defaultVenue = (token.defaultVenue as string | null) ?? null;
      }
      return session;
    },
  },
  pages: { signIn: "/admin/login" },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Refresh every hour
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const, // CSRF protection
        path: "/",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
