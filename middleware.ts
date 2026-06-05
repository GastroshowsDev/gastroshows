import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/blog': {
      es: '/blog',
      ca: '/blog',
      en: '/blog',
    },
    '/blog/[slug]': {
      es: '/blog/[slug]',
      ca: '/blog/[slug]',
      en: '/blog/[slug]',
    },
    '/menu-degustacion': {
      es: '/menu-degustacion',
      ca: '/menu-degustacio',
      en: '/tasting-menu',
    },
    '/cena-clandestina': {
      es: '/cena-clandestina',
      ca: '/sopar-clandesti',
      en: '/clandestine-dinner',
    },
    '/regalo': {
      es: '/regalo',
      ca: '/regal',
      en: '/gift',
    },
    '/contacto': {
      es: '/contacto',
      ca: '/contacte',
      en: '/contact',
    },
    '/preguntas-frecuentes': {
      es: '/preguntas-frecuentes',
      ca: '/preguntes-freqents',
      en: '/faq',
    },
  },
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
