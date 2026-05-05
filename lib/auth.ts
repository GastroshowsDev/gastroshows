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
        token.role = ((user as { role?: string }).role ?? "ADMIN") as "ADMIN" | "LIVE";
        token.defaultVenue = (user as { defaultVenue?: string | null }).defaultVenue ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string; defaultVenue?: string | null }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { defaultVenue?: string | null }).defaultVenue = (token.defaultVenue as string | null | undefined) ?? null;
      }
      return session;
    },
  },
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  ...(process.env.VERCEL_URL && !process.env.NEXTAUTH_URL
    ? { url: `https://${process.env.VERCEL_URL}` }
    : {}),
};
