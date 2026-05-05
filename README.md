## Gastro Shows Next (Fase 0)

Base técnica inicial para migrar el MVP HTML/JS de `gastroshows` a un stack productivo:

- Next.js (App Router + TypeScript)
- Prisma ORM
- PostgreSQL en Supabase
- Validación con Zod
- i18n base (`es`, `ca`, `en`)

## Regla de arquitectura (sin duplicidades)

- Prisma es la unica via de escritura y lectura de negocio (`Reservation`, `Event`, `GiftVoucher`, etc.).
- Todas las mutaciones pasan por `app/api/*` y usan `Prisma`.
- Supabase SDK se usa para realtime (suscripciones) y no para persistir datos de negocio.
- No usar `supabase.from(...).insert/update/delete` para tablas del dominio.

## Arranque local

```bash
cp .env.example .env
npm run dev
```

Prisma 7 en este repo usa el adaptador PostgreSQL (`@prisma/adapter-pg` + `pg`) en `lib/prisma.ts`. Asegura `DATABASE_URL` en `.env` antes de `npm run dev` o `npm run build`.

## Scripts útiles

```bash
npm run lint
npm run format
npm run prisma:generate
npm run prisma:migrate:dev
npm run prisma:studio
```

## Endpoint de salud

- `GET /api/health` (valida query con Zod y prueba conexión DB con `SELECT 1`)

Ejemplo:

`http://localhost:3000/api/health?ping=ok`

## Estructura inicial

- `app/` rutas y API routes
- `components/` componentes reutilizables
- `lib/` utilidades compartidas (`lib/prisma.ts`)
- `lib/realtime/` helpers de suscripcion realtime
- `prisma/` esquema y migraciones
- `emails/` plantillas HTML de email
- `types/` tipos compartidos

## Realtime para panel admin

- Helper: `lib/realtime/reservations.ts`
- Pagina demo (sin auth aun): `/admin/live`
  - Actividades recientes: `components/admin/RecentActivityFeed.tsx`
  - Recepcion / mapa: `components/admin/TablesLiveBoard.tsx` (check-in vía `PATCH /api/reservations/[id]`)
- API de datos iniciales: `GET /api/admin/reservations/live`
  - Actividad: `?limit=40`
  - Servicio del dia: `?eventDate=YYYY-MM-DD&shift=NOON|NIGHT`

Para que funcione en Supabase:

1. Ejecutar `supabase/realtime.sql` en el SQL editor (publication `supabase_realtime`).
2. Configurar RLS + politica `SELECT` acorde al JWT del panel (sin esto, `postgres_changes` no entrega filas al cliente).
