import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "ADMIN" | "LIVE";
      defaultVenue: string | null;
    };
  }
  interface User {
    role: "ADMIN" | "LIVE";
    defaultVenue?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "LIVE";
    defaultVenue?: string | null;
  }
}
