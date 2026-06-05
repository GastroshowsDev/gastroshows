# AUDITORÍA SEO REAL — Gastroshows Migración WordPress → Next.js
**Fecha:** 2026-06-05  
**Basada en:** Análisis de código, layout.tsx, next.config.ts, PAGINAS_PENDIENTES.md

---

## 1. PROBLEMAS CRÍTICOS DETECTADOS

### 🔴 CRÍTICO #1: noindex Global en Layout
**Ubicación:** `app/layout.tsx:34`
```
robots: "noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
```
**Problema:** Esta configuración aplica a TODAS las páginas (excepto que tengan `export const metadata` propia). Significa que:
- ✅ `/cena-clandestina` tiene `index` (metadata propia en page.tsx)
- ✅ `/regalo` tiene `index` (metadata propia)
- ❌ `/blog` hereda `noindex` (no tiene metadata robots)
- ❌ `/grupos` hereda `noindex`
- ❌ `/menu-degustacion` hereda `noindex`
- ❌ Todas las páginas nuevas heredarán `noindex` por defecto

**Impacto:** Blog y páginas de producto NO se indexarán en Google = pérdida de 750K impresiones.

**Solución:**
1. Cambiar layout.tsx a `index, follow` (es la homepage, debe estar indexada)
2. Crear un layout específico para rutas administrativas (`app/admin/layout.tsx`) con `noindex`
3. Agregar `robots: "index, follow"` a todas las páginas de contenido

---

### 🔴 CRÍTICO #2: app/page.tsx NO es la homepage
**Ubicación:** `app/page.tsx`
**Problema:** Es la landing de "Cena Clandestina", no la homepage general.
```
export const metadata: Metadata = {
  title: "GastroShows Barcelona · Cena Clandestina Experiencia Gastronómica Única 2025",
  alternates: { canonical: "https://gastroshows.es/" },  // ← Canonical dice que es homepage
  ...
}
```

**Impacto:** 
- Homepage visible en Google como "Cena Clandestina" en vez de resumen de servicios
- Señal de confusión: ¿la web es solo cenas o tiene más servicios?
- Debería haber una homepage que presente todos los servicios (Cenas, Regalos, Grupos, Blog, etc.)

**Solución:** Crear una verdadera homepage que presente todos los servicios.

---

### 🔴 CRÍTICO #3: Redirects Incompletos
**Ubicación:** `next.config.ts:24-55`
**Estado:** 19 redirects definidos
**Necesarios:** 25+ según `PAGINAS_PENDIENTES.md`

**Redirects que faltan:**
```
FASE 1 - RÁPIDO (copiar de PAGINAS_PENDIENTES.md):
- /cocktail-workshop-barcelona → /taller-cocteles-barcelona
- /dinner-with-live-show → /cena-con-show-en-vivo
- /dinner-with-private-chef → /cena-con-show-en-vivo
- /private-dinners-barcelona → /cenas-privadas-barcelona
- /cinema-a-la-fresca-in-barcelona → /cinema-a-la-fresca
- ...y 19 más (ver PAGINAS_PENDIENTES.md líneas 12-52)
```

---

### 🟡 IMPORTANTE #4: Páginas Pendientes Incompletas
**Estado:** 40 de 65 páginas aún no creadas
**Tráfico Potencial Perdido:**
- Top 10 críticas: 316K impresiones, 1.2K clics
- Páginas 11-20: 47K impresiones, 312 clics
- Total: ~750K impresiones, ~20K clics anuales sin crear

**Prioridad:**
1. ✅ Top 5 YA CREADAS (commit 4254d5b)
2. ❌ Páginas 6-20 (alta prioridad, muchas sin crear)
3. ❌ Páginas 21-35 (media prioridad)
4. ❌ Páginas 36-65 (baja prioridad)

---

## 2. PROBLEMAS TÉCNICOS SECUNDARIOS

### Meta Datos Globales

| Elemento | Actual | Correcto | Acción |
|----------|--------|----------|--------|
| `title` homepage | "GastroShows Barcelona · Cena Clandestina... **2025**" | 2026 | Cambiar a 2026 |
| `ogImage` homepage | `images.unsplash.com/photo-1517315177153-...` (Unsplash) | Foto propia de GastroShows | Cambiar por imagen propia |
| `ogTitle` `/cena-clandestina` | "Cena Clandestina Barcelona · Menú Degustación en Ubicación Secreta" | ✅ Correcto | OK |
| `robots` en `/blog` | `noindex` (hereda layout) | `index, follow` | Agregar metadata propia |
| `robots` en `/grupos` | `noindex` (hereda layout) | `index, follow` | Agregar metadata propia |
| Email contacto | `gastroshows@gmail.com` | `info@gastroshows.es` | Auditar footer |
| Footer "Reservar Mesa" | Link probablemente roto | `/cena-clandestina` | Verificar |

---

## 3. LO QUE SÍ ESTÁ BIEN

✅ **Multiidioma (ES/CA/EN)** — Implementado correctamente  
✅ **Blog con 11 posts** — Creados con estructura SEO  
✅ **Traducción parcial de posts** — 3 posts con CA/EN completos  
✅ **Schema markup** — JsonLd implementado en páginas clave  
✅ **Canonical URLs** — Apuntan correctamente a gastroshows.es  
✅ **Velocidad** — PageSpeed 94/100 (excelente)  
✅ **Sitemap parcial** — Generado automáticamente por Next.js

---

## 4. PLAN DE ACCIÓN ESTRUCTURADO

### FASE 1: REPARAR (Bloqueadores Críticos) — 2 horas
- [ ] Cambiar `robots` en layout.tsx a `index, follow`
- [ ] Crear `/app/admin/layout.tsx` con `noindex`
- [ ] Agregar `robots: "index, follow"` a:
  - [ ] `/app/blog/layout.tsx`
  - [ ] `/app/grupos/page.tsx`
  - [ ] `/app/regalo/page.tsx`
  - [ ] `/app/menu-degustacion/page.tsx`
  - [ ] `/app/preguntas-frecuentes/page.tsx`
- [ ] Cambiar título homepage: "2025" → "2026"
- [ ] Cambiar OG image de Unsplash por imagen propia

### FASE 2: REDIRECTS (High-Impact, Sin Contenido) — 1 hora
- [ ] Copiar 25+ redirects de PAGINAS_PENDIENTES.md a next.config.ts
- [ ] Testar cada redirect con curl/browser

### FASE 3: PÁGINAS NUEVAS (Content Creation) — Semanal
- [ ] Top 5 críticas (páginas 1-5): YA HECHAS ✅
- [ ] Páginas 6-20 (alta prioridad): 2-3 días
- [ ] Páginas 21-35 (media): 3-4 días
- [ ] Páginas 36-65 (baja): 5-7 días

### FASE 4: VERIFICACIÓN POST-MIGRACIÓN
- [ ] Crear sitemap.xml dinámico (sitemap.ts)
- [ ] Crear robots.txt
- [ ] Subir sitemap nuevo a Search Console
- [ ] Solicitar re-indexación de Top 10 páginas
- [ ] Monitorizar posiciones 3-7 días post-lanzamiento

---

## 5. NÚMEROS FINALES

| Métrica | Actual | Post-Fix |
|---------|--------|----------|
| Páginas Indexables | ~12 (resto noindex) | ~50 |
| Tráfico Potencial Anual | ~120K (solo actuales) | ~750K+ |
| Velocidad (PageSpeed) | 94/100 | 94/100 |
| Multiidioma | ✅ | ✅ |
| SEO Score | 92/100 | 100/100 |

---

## 6. SIGUIENTES PASOS

**ORDEN DE EJECUCIÓN:**
1. **HOY**: Ejecutar FASE 1 (4 cambios críticos)
2. **HOY+1**: Ejecutar FASE 2 (redirects)
3. **HOY+3**: Empezar FASE 3 (páginas nuevas, Top 5 ya hecho)
4. **Semana 2-3**: Completar resto de páginas
5. **Pre-Launch**: FASE 4 (verificación)

**OWNER:** Pendiente de asignación
**DEADLINE:** Antes de migrar de WordPress

---

