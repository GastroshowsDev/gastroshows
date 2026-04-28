import type { NextConfig } from "next";

// i18n en App Router: usar rutas `[locale]` (ver PDF). La clave `i18n` de Pages Router no aplica aquí.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pqzvohidkjnonkhitoro.supabase.co" },
    ],
  },
};

export default nextConfig;
