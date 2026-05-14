import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pqzvohidkjnonkhitoro.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "www.xavierpellicer.com" },
      { protocol: "https", hostname: "xavierpellicer.com" },
      { protocol: "https", hostname: "tabernanoroeste.com" },
      { protocol: "https", hostname: "slowandlowbcn.com" },
      { protocol: "https", hostname: "www.mineralbcn.com" },
      { protocol: "https", hostname: "mineralbcn.com" },
      { protocol: "https", hostname: "www.cruixrestaurant.com" },
      { protocol: "https", hostname: "cruixrestaurant.com" },
    ],
  },

  async redirects() {
    return [
      // Legacy URLs → New optimized URLs (with trailing slash handling)
      { source: "/experiencia", destination: "/cena-clandestina", permanent: true },
      { source: "/experiencia/", destination: "/cena-clandestina", permanent: true },
      { source: "/menu", destination: "/menu-degustacion", permanent: true },
      { source: "/menu/", destination: "/menu-degustacion", permanent: true },
      { source: "/faq", destination: "/preguntas-frecuentes", permanent: true },
      { source: "/faq/", destination: "/preguntas-frecuentes", permanent: true },

      // Cena Clandestina canonical
      { source: "/cena-clandestina-5", destination: "/cena-clandestina", permanent: true },
      { source: "/cena-clandestina-5/", destination: "/cena-clandestina", permanent: true },
      // Old regalo URLs → new canonical
      { source: "/regalo-experiencia-gastronomica", destination: "/regalo", permanent: true },
      { source: "/regalo-experiencia-gastronomica/", destination: "/regalo", permanent: true },
      // Old michelin URLs (only short version → main page; long URL is now its own SEO page)
      { source: "/restaurantes-con-estrella-michelin", destination: "/restaurantes-michelin", permanent: true },
      { source: "/restaurantes-con-estrella-michelin/", destination: "/restaurantes-michelin", permanent: true },

      // Blog category & tag redirects
      { source: "/category/:path*", destination: "/blog", permanent: true },
      { source: "/tag/:path*", destination: "/blog", permanent: true },

      // Legacy blog date-based URLs → new blog structure
      { source: "/2024/:month/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/2023/:month/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/2022/:month/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
