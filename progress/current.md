## Sesión Actual: Sistema Multiidioma (ES, CA, EN) (ID: 8)
- Feature: Sistema Multiidioma (ES, CA, EN)
- Inicio: 2026-06-05
- [x] Configurar `next-intl` en next.config.ts con plugin withNextIntl
- [x] Crear middleware.ts para enrutamiento y mapeo de rutas multiidioma
- [x] Crear archivos de traducción JSON (messages/es.json, messages/ca.json, messages/en.json) con UI strings
- [x] Refactorizar `BlogPost` type para incluir propiedad `translations` con soporte CA/EN
- [x] Crear `useCurrentLocale()` hook para detectar locale desde pathname
- [x] Crear `blog-translations.ts` con traducciones de 2 posts principales (ES/CA/EN)
- [x] Refactorizar `app/blog/page.tsx` para ser multiidioma con `useCurrentLocale()` hook
- [x] Actualizar `app/ca/blog/page.tsx` y crear `app/en/blog/page.tsx` para reutilizar componente Blog
- [ ] Agregar traducciones para todos los posts restantes (9 posts más)
- [ ] Traducir metadata SEO (seoTitle, seoDesc) para todos los posts
- [ ] Crear versiones multiidioma de otras páginas (menu-degustacion, cena-clandestina, etc.)
- [ ] Verificar que los links internos funcionen correctamente con locale prefixes
- [ ] Ejecutar `verify.sh` para validar la implementación completa

## Notas de Implementación (i18n)
- **Estructura**: Usando enfoque hybrid:
  - `app/blog/page.tsx` es multiidioma con `useCurrentLocale()` hook
  - `app/ca/blog/page.tsx` y `app/en/blog/page.tsx` reutilizan el componente Blog
  - Hook detecta locale basado en pathname (/ca/, /en/, o root para ES)
- **Blog Data**: Posts con traducciones en `blog-translations.ts` que se merge en BlogPost type
- **Mensajes UI**: JSON files en `messages/` directory para strings comunes
- **Rutas**: Middleware configura pathnames personalizados para URLs amigables en cada idioma

## Bloqueos
- Ninguno. Trabajo en progreso.
