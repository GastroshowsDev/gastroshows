import type { NextConfig } from "next";

// i18n en App Router: usar rutas `[locale]` (ver PDF). La clave `i18n` de Pages Router no aplica aquí.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pqzvohidkjnonkhitoro.supabase.co" },
    ],
  },
  // Note: Request body size limit is enforced at middleware level in middleware.ts
  // Next.js 16 handles body parsing automatically; use middleware for size validation
};

export default nextConfig;
