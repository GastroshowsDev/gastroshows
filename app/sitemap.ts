import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gastroshows.com';

  // 1. Fetch all published pages
  const pages = await prisma.page.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true }
  });

  const pageEntries = pages.map((page) => ({
    url: `${baseUrl}/${page.slug === 'home' ? '' : page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: page.slug === 'home' ? 1 : 0.8,
  }));

  // 2. Static routes
  const staticRoutes = [
    '',
    '/eventos',
    '/contacto',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...pageEntries, ...staticRoutes];
}
