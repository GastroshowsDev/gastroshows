import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gastroshows.es";
  const currentDate = new Date().toISOString().split("T")[0];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cena-clandestina`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/regalo`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/grupos`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/preguntas-frecuentes`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/restaurantes-estrella-michelin-barcelona`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/menu-degustacion-barcelona`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/mejores-restaurantes-menu-degustacion-barcelona`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/la-clandestina-barcelona`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/cena-a-ciegas-barcelona`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/restaurantes-michelin-baratos-barcelona`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  return staticPages;
}
