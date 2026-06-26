import { MetadataRoute } from "next";

const baseUrl = "https://gastroshows.es";

// Rutas privadas / transaccionales que ningún crawler debe indexar.
const privatePaths = [
  "/admin",
  "/api",
  "/.next",
  "/canjear",
  "/demo-pago",
  "/fichaje",
  "/booking-confirmation",
  "/booking-payment-failed",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Crawlers tradicionales (Google, Bing, etc.)
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      // Motores de respuesta / IA — permitidos explícitamente para aparecer
      // en ChatGPT, Claude, Perplexity, Gemini y Bing/Copilot (GEO/AEO).
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "CCBot",
          "Bytespider",
        ],
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
