## Pendiente: Sync live Turitop -> ERP + Credenciales Getloud (2026-09-30)

> Objetivo usuario: todas las reservas que lleguen a Turitop se vuelquen como reservas del ERP.
> Docs: https://developers.turitop.com (spec `turitop_api.yaml`, solo sandbox `https://app.turitopsandbox.com/v1` en spec; prod a confirmar `https://app.turitop.com/v1`).
> Estado: investigación hecha, sin implementar. Feature #13 TPV sigue `in_progress` — no empezar código hasta cerrar/planificar (una sola feature a la vez).

### Hallazgos Turitop
- Auth OAuth2: `POST /authorization/grant {short_id, secret_key}` -> `access_token` 60min + `refresh_token` 60días. Token va en **body** `{access_token, data:{...}}`, atado a IP. `POST /authorization/refresh|renew|revoke`. Bearer API-Key no está en el YAML.
- Webhooks (vía primaria, sin cuota): `POST /company/insertwebhooks {action: all|booking.insert|booking.update|booking.delete, end_point}` + `get/delete/testwebhooks {hash, booking_short_id}`. No hay evento checkin propio — llega como `booking.update` (`checked`, `date_enjoyed`).
- Payload webhook no documentado en YAML — hay que capturar un `testwebhooks` real para fijar firma/headers/JSON.
- Respaldo polling: `POST /booking/getbookings {filter: bookings_modified_from/_to, event_date_from/_to, product_short_id|multi_product_short_id, status|multi_status, checked_in, show_deleted, booking_limit/page}` + `pagination {has_more}`. Cuota por módulo consultable en `POST /consumption` (exento de throttle).
- `Booking` clave: `short_id`, `product_short_id/name`, `date_event/date_booking/date_modified`, `client_data {name,email,phone,comments}`, `ticket_type_count[] {count, price_per_ticket}`, `total_price/currency`, `status [pending,confirmed,paid,cancelled...]`, `checked`, `gift_certificate`, `source widget|backoffice|API|OTA`.

### Encaje ERP actual
- `Reservation.turitopId @unique` ya existe (`prisma/schema.prisma:87`), `source TURITOP` ya usado en `lib/turitop-migrator.ts:121` y pintado en `components/admin/ReservasTable.tsx:1130`.
- Flujo a reutilizar (`app/api/payments/callback/route.ts:72`): transacción `Customer.upsert/create` + `Reservation.create(CONFIRMED)` + `PaymentSplit` + `buildEmailQueueSchedule` + `triggerWorkflows(RESERVATION_CONFIRMED)`.
- `Setting {key,value}` disponible como almacén temporal de credenciales (`prisma/schema.prisma:424`).

### Plan propuesto (no iniciado)
1. `lib/turitop-client.ts`: grant/refresh, `getbooking/getbookings`, mapper `Booking -> {Customer, Event(date+shift), Reservation(turitopId, source=TURITOP)}` idempotente por `turitopId`.
2. `app/api/turitop/webhook/route.ts` público: `booking.insert/update/delete` -> upsert, `delete` -> `CANCELLED`, verifica origen si Turitop firma.
3. Cron respaldo `getbookings` por `bookings_modified_from` + `Event.totalGuests` increment.
4. Credenciales interinas en `Setting`/`env` (`TURITOP_SHORT_ID/SECRET_KEY`, `product_short_id -> venueId`).

### Pendiente Getloud — Espacio Credenciales
- Usuario tiene en Getloud un espacio `Credenciales` para APIs (whatsapp, meta, google, etc.) con posible campo `turitop`.
- **Bloqueado hasta que dé acceso al código de Getloud.** Cuando lo dé: leer Store de Credenciales y migrar `TURITOP_*` de `Setting/env` a Getloud como fuente canónica.
- No tocar Getloud por ahora.

---

## Sesión Actual: TPV sala (feature #13)

> Objetivo fase 1: base de datos + catálogo configurable + PIN de sesión en ficha de usuario.
> Decisiones usuario: carta común a ambas salas, reutilizar PIN de empleado, reserva rápida obligatoria para walk-ins.
> Nota: feature #12 (SEO) pausada temporalmente (pending) para respetar "una sola feature a la vez".

### Plan fase 1
- [x] Registrar feature #13 en `feature_list.json`
- [x] Schema: `ProductCategory`, `Product`, `PosOrder`, `PosOrderLine`, `CashSession` (preparada, sin UI), `Employee.userId` ↔ `User` — `prisma validate` OK, cliente generado OK, sin errores nuevos en `tsc`
- [x] Migración SQL manual `prisma/migrations/20260929014500_pos_base/migration.sql` — **APLICADA el 29-09 vía SQL directo por pooler** (el `migrate deploy` no llega por red desde aquí) + registrada en `_prisma_migrations` con checksum sha256. DDL aditivo, sin tocar datos. Empleado test "Test TPV" PIN 0000 creado (el 1234 lo usa Estela Diaz).
- [x] CRUD carta `/admin/configuracion/carta` + APIs `/api/admin/pos/catalog` y `/api/admin/pos/products` (+ botón "Crear base")
- [x] PIN en ficha usuario: `lib/pos-pin.ts`, `posPin` en crear/editar de `/admin/usuarios` (crea/vincula empleado, valida 4 dígitos y unicidad)
- [x] TPV mobile-first `/admin/tpv` (entrada en sidebar): PIN de operario, tabs Bertrand/Urgell, comensales por nombre del servicio de hoy + buscador, reserva rápida, comanda con snapshot de precios, totales por comensal y por sala. APIs: `session`, `diners`, `orders`, `quick-reservation` (todas `requireStaff`)

### Fase 2 (siguiente): pantalla TPV
- Login con PIN, selector sala (venueId aísla datos), tablero comensales por nombre (reservas CONFIRMED/CHECKED_IN del evento del día), reserva rápida, totales por comensal.

### Hotfix fuera de feature (crash en home)
- `components/tracking/TikTokPixel.tsx`: el snippet tenía el loop de `instance` corrupto (`ttq[m]=setAndDefer(...)` sobrescribía los stubs con `undefined` → `ttq.page is not a function`). Corregido a la forma oficial (`ttq.setAndDefer(o,...)` sin asignación). Verificado en Node: el código viejo reproduce el TypeError exacto, el nuevo encola `page`/`track` bien. `MetaPixel.tsx` revisado, sin problema.

---

## Sesión Actual: Roadmap "Web perfecta antes de migrar" (GEO/SEO)

> Premisa: NO tocar el `noindex` global ni el DNS (migración la hace el usuario al final).
> Objetivo: superar a la web antigua para ganar posiciones al indexar.

### Plan ordenado por importancia (features 9-12 en feature_list.json)
- Bloque 1 Fundamentos: sitemap dinámico completo (#9), hreflang + blog server components (#11)
- Bloque 2 GEO/AEO en todas las páginas (#10): llms.txt, bots IA, bloques AEO, schema 100%
- Bloque 3 Paridad vs web antigua (#12): EN/CA reales, interlinking, imágenes propias, H1/meta

### Completado en esta sesión:
- [x] **Sitemap dinámico y completo** (`app/sitemap.ts`): de 18 URLs estáticas a cobertura real
  - Rutas estáticas públicas agrupadas por prioridad (home/money/servicios/landing/recetas/legal)
  - Posts dinámicos desde `blogPosts` (lib/blog-data) con `publishedAt` como lastModified
  - Grupos dinámicos (`team-building`, `cenas-empresa`, `celebraciones`, `corporativo`)
  - Páginas publicadas desde BD (Prisma `page` where published, con try/catch para build sin BD)
  - hreflang (alternates.languages) en tríos ES/CA/EN verificados + x-default
  - Dedupe por URL
- [x] **Reglas de bots IA** (`app/robots.ts`): allow explícito a GPTBot, OAI-SearchBot, ClaudeBot,
      PerplexityBot, Google-Extended, etc.; disallow ampliado (canjear, demo-pago, fichaje, booking-*); host
- [x] **llms.txt** (`app/llms.txt/route.ts`): pitch GEO estructurado (qué es, precio, capacidad, servicios, FAQ, cómo reservar)
- [x] Typecheck OK en los 3 archivos (tsc --noEmit)

### Completado en esta sesión (continuación — desarrollo autónomo):
- [x] **Blog a server component** (#11): creado `components/BlogIndex.tsx` (client con el grid/filtros);
      `app/blog/page.tsx`, `app/ca/blog/page.tsx`, `app/en/blog/page.tsx` ahora son server components
      con metadata real (title, description, canonical, hreflang trío + x-default, OG). Antes eran "use client" sin metadata.
- [x] **Componente AEO** `components/seo/AeoAnswer.tsx`: respuesta directa (40-80 palabras) + tabla de datos.
      Aplicado a: cena-clandestina, menu-degustacion, regalo, grupos, restaurantes-michelin.
- [x] **faqSchema inyectado** en las 5 money pages (la FAQ visible no estaba en JSON-LD → ahora sí, apta para rich results e IA).
- [x] **hreflang en head** de home + 5 money pages (ES) con trío es/ca/en + x-default.
- [x] **BUG corregido**: páginas CA (ca/cena-clandestina, ca/grupos) y EN (clandestine-dinner-barcelona)
      canonicalizaban a la versión ES → ahora self-canonical + clúster hreflang bidireccional + locale correcto.
- [x] **Interlinking**: restaurantes-michelin tenía 0 enlaces internos → añadidos a cena-clandestina,
      menu-degustacion, regalo y grupos.
- [x] **Sitemap**: añadido `export const revalidate = 3600` para recoger páginas de BD sin rebuild.
- [x] **BUILD DE PRODUCCIÓN OK**: `npm run build` compila; /llms.txt (dinámico), /sitemap.xml, /robots.txt
      y todas las rutas generadas. typecheck sin errores nuevos (los de blog/* article son preexistentes e
      ignorados por `ignoreBuildErrors: true`).

### Completado en esta sesión (3ª tanda — feature #12 parcial):
- [x] **ca/regalo a server component**: extraído `app/ca/regalo/RegaloClient.tsx` (client con openGift);
      `page.tsx` ahora server con metadata catalana (title, desc, canonical self, hreflang es/ca + x-default, OG ca_ES).
- [x] **BUG canonical ca/contacto**: canonicalizaba a `/contacto` (ES) → corregido a self `/ca/contacto` + languages + robots index.
- [x] **x-default** añadido a los tríos de menu-degustacion (ca y en).
- [x] **Unsplash evaluado, NO sustituido a propósito**: las ~30 imágenes Unsplash están en 6 páginas
      editoriales tipo listicle (terrazas, bares de tapas, otros restaurantes Michelin) y representan
      VENUES DE TERCEROS. Sustituirlas por fotos de GastroShows sería engañoso. Las money pages ya usan
      imágenes locales propias (/images/experiencia/*, /images/web2026-optimizadas/*). Decisión de contenido
      que requiere fotos reales de esos venues (descargar de WordPress / banco propio) — no fabricar swaps.
- [x] **BUILD OK** de nuevo (`✓ Compiled successfully in 5.2s`); /ca/regalo y /ca/contacto generadas con metadata.

### Pendiente real (futuras iteraciones):
- [ ] Imágenes de los 6 listicles editoriales: conseguir fotos reales/propias de los venues (no Unsplash hotlink)
- [ ] Versiones EN de más money pages (regalo EN, grupos EN, contacto EN) si se quiere paridad total
- [ ] Auditoría H1/meta vs WordPress y rellenar galerías vacías
- [ ] (Migración: la hace el usuario al final — quitar noindex global del layout, desplegar, enviar sitemap a Search Console)

---

## Sesión Anterior: Actualización Blog Michelin 2026 + Pruebas

### Completado:
- [x] Actualizar blog post: "Restaurantes Estrella Michelin en Barcelona"
  - [x] Metadatos: título, SEO, excerpt, año 2026
  - [x] Introducción con 42 estrellas, 29 restaurantes
  - [x] Nuevos restaurantes: Kamikaze, Scapar (1⭐), Enigma, Mont Bar, Aleia (2⭐)
  - [x] Time Out Market Barcelona (sección nueva)
  - [x] Descripciones expandidas de todos los chefs (Airaudo, De Bedoya, Adrià, Castro, Buendía, etc.)
  - [x] Pricing actualizado para 2026
  - [x] Commit realizado: feat(blog): Update Michelin restaurants guide with 2026 edition

---

## Sesión Completada: Sistema Multiidioma (ES, CA, EN) (ID: 8)
- Feature: Sistema Multiidioma (ES, CA, EN)
- Inicio: 2026-06-05 | Fin: 2026-06-05
- [x] Configurar `next-intl` en next.config.ts con plugin withNextIntl
- [x] Crear archivos de traducción JSON (messages/es.json, messages/ca.json, messages/en.json) con UI strings
- [x] Refactorizar `BlogPost` type para incluir propiedad `translations` con soporte CA/EN
- [x] Crear `useCurrentLocale()` hook para detectar locale desde pathname
- [x] Crear `blog-translations.ts` con traducciones de 3 posts principales (ES/CA/EN)
- [x] Refactorizar `app/blog/page.tsx` para ser multiidioma con `useCurrentLocale()` hook
- [x] Actualizar `app/ca/blog/page.tsx` y crear `app/en/blog/page.tsx` para reutilizar componente Blog
- [x] Resolver conflicto middleware.ts vs proxy.ts (eliminar middleware.ts)
- [x] Verificar compilación sin errores (✓ Compiled successfully in 4.7s)
- [x] Feature markedoas done en feature_list.json

## Notas de Implementación (i18n)
- **Estructura implementada**: Hybrid approach:
  - `app/blog/page.tsx` es multiidioma con `useCurrentLocale()` hook
  - `app/ca/blog/page.tsx` y `app/en/blog/page.tsx` reutilizan el componente Blog
  - Hook detecta locale basado en pathname (/ca/, /en/, o root para ES)
- **Blog Data**: Posts con traducciones en `blog-translations.ts` que se merge en BlogPost type
- **Mensajes UI**: JSON files en `messages/` directory para strings comunes (nav, blog UI, common labels)
- **Fallback**: Posts sin traducción muestran contenido en español
- **Commits realizados**: 
  - feat(i18n): implement multi-language system (main infra)
  - feat(i18n): add more blog post translations (5 posts)
  - fix: remove middleware.ts conflict

## Trabajos Pendientes (para iteración futura)
- Traducir todos los 11 posts de blog completamente (actualmente 3 con contenido completo)
- Crear versiones multiidioma de otras páginas (menu-degustacion, cena-clandestina, regalo, etc.)
- Implementar language switcher en la UI (selector de idiomas)
- Traducir emails y notificaciones (si aplica)
- Testing multiidioma en navegadores reales

## Status Final
✅ COMPLETADO - Sistema multiidioma funcional con fallback a español. Blog page ahora detecta automáticamente el idioma basado en la ruta y muestra contenido traducido para 3 posts principales (mejores-restaurantes, cena-clandestina, menu-degustacion). Otros 8 posts disponibles en español con marcadores para traducciones futuras.
