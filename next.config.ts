import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },

  async redirects() {
    return [
      { source: "/experiencia", destination: "/cena-clandestina", permanent: true },
      { source: "/experiencia/", destination: "/cena-clandestina", permanent: true },
      { source: "/menu-degustacion", destination: "/cena-clandestina", permanent: true },
      { source: "/menu-degustacion/", destination: "/cena-clandestina", permanent: true },
      { source: "/menu", destination: "/cena-clandestina", permanent: true },
      { source: "/menu/", destination: "/cena-clandestina", permanent: true },
      { source: "/faq", destination: "/preguntas-frecuentes", permanent: true },
      { source: "/faq/", destination: "/preguntas-frecuentes", permanent: true },
      { source: "/category/:path*", destination: "/blog", permanent: true },
      { source: "/tag/:path*", destination: "/blog", permanent: true },
      { source: "/2024/:month/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/2023/:month/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/2022/:month/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/mejores-restaurantes-menu-degustacion-barcelona", destination: "/blog/mejores-restaurantes-menu-degustacion-barcelona", permanent: true },
      { source: "/cena-clandestina-5", destination: "/blog/cena-clandestina-barcelona-experiencia-unica", permanent: true },
      { source: "/restaurantes-con-estrella-michelin", destination: "/blog/restaurantes-estrella-michelin-barcelona", permanent: true },
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
