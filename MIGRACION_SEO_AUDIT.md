# Auditoría SEO & Plan de Migración GastroShows
**Fecha**: 2026-05-11  
**Estado**: Pre-migración  
**Objetivo**: Migrar de web antigua a nueva sin penalización de Google

---

## 📊 ANÁLISIS DE SEARCH CONSOLE

### Métricas Generales
- **URLs con tráfico**: 97 URLs principales
- **Clics totales**: ~300,000 clics/período
- **Impresiones totales**: ~3,200,000 impresiones
- **CTR promedio**: ~4.2%
- **Posición promedio**: ~17.5 (rango 4-55)

### TOP 10 URLs (por tráfico real)

| # | URL | Clics | Impresiones | CTR | Posición | Potencial |
|---|-----|-------|-------------|-----|----------|-----------|
| 1 | / (Home) | 20,770 | 369,907 | 5.61% | 13.37 | Alto |
| 2 | /mejores-restaurantes-menu-degustacion-barcelona/ | 19,807 | 274,640 | 7.21% | 14.38 | Medio |
| 3 | /cena-clandestina-5/ | 14,777 | 242,578 | 6.09% | 12 | Alto |
| 4 | /restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/ | 10,682 | 356,352 | 3% | 13.89 | **CRÍTICO** |
| 5 | /los-mejores-menus-degustacion-para-regalar/ | 4,692 | 124,146 | 3.78% | 21.93 | Alto |
| 6 | /cenas-espectaculo-barcelona-secreta/ | 3,527 | 60,114 | 5.87% | 9.15 | Medio |
| 7 | /bares-tapas-barcelona-baratos/ | 2,018 | 168,390 | 1.2% | 26.57 | **CRÍTICO** |
| 8 | /receta-de-fricando-de-ternera/ | 1,675 | 97,965 | 1.71% | 8.46 | Bajo |
| 9 | /regalo-experiencia-gastronomica/ | 1,584 | 146,068 | 1.08% | 16.4 | **CRÍTICO** |
| 10 | /cheap-tapas-bars-in-barcelona/ | 1,069 | 71,113 | 1.5% | 30.83 | Bajo |

---

## 🎯 OPORTUNIDADES DE MEJORA

### TIER 1 - CRÍTICAS (Máximo impacto)

#### 1. HOME (/)
- **Tráfico actual**: 20,770 clics
- **Problema**: CTR en 5.61% con posición 13.37 (hay margen)
- **Oportunidad**: Optimizar H1, descripción, CTA para mejorar CTR → 7-8%
- **Potencial**: +2,000-3,000 clics/mes adicionales
- **URL nueva**: Mantener `/`
- **Acción**: Reescribir hero section + schema markup mejorado

#### 2. CENA CLANDESTINA-5
- **Tráfico actual**: 14,777 clics
- **Problema**: Es `/cena-clandestina-5/` (debería ser `/cena-clandestina/`)
- **Oportunidad**: Mejor storytelling + conversión mejorada
- **Potencial**: +1,000-2,000 clics/mes si mejora a posición 8-9
- **URL nueva**: `/cena-clandestina/` (renombrando)
- **Acción**: Crear página premium con mejor UX + 301 redirect

#### 3. MENÚ DEGUSTACIÓN BARCELONA
- **URL actual**: `/mejores-restaurantes-menu-degustacion-barcelona/`
- **Tráfico**: 19,807 clics (excelente)
- **Problema**: CTR ya alto (7.21%), posición mediocre (14.38)
- **Oportunidad**: Mejorar a posición 1-3 → CTR 15%+ → +5,000 clics
- **URL nueva**: `/menu-degustacion/` (más corta, mejor UX)
- **Acción**: Contenido exhaustivo + schema MenuItem + comparativas

#### 4. RESTAURANTES MICHELIN MEDIODÍA (CRÍTICO)
- **URL**: `/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/`
- **Tráfico**: 10,682 clics
- **Problema**: CTR muy bajo (3%) con 356k impresiones
- **Oportunidad**: Mejorar a 5% CTR = +7,000 clics
- **URL nueva**: `/restaurantes-michelin-barcelona/` (más corta)
- **Acción**: Reescribir completamente + imágenes + FAQ schema

#### 5. REGALO EXPERIENCIA GASTRONÓMICA (CRÍTICO)
- **URL**: `/regalo-experiencia-gastronomica/`
- **Tráfico**: 1,584 clics
- **Problema**: 146k impresiones pero CTR 1.08% (muy bajo)
- **Oportunidad**: Mejorar a 3% CTR = +2,000 clics
- **URL nueva**: `/regalo/` (más corta y directa)
- **Acción**: Rediseñar CTA + mejor descripción + regalo FAQ

#### 6. BARES TAPAS BARCELONA BARATOS (CRÍTICO)
- **URL**: `/bares-tapas-barcelona-baratos/`
- **Tráfico**: 2,018 clics
- **Problema**: 168k impresiones, CTR 1.2% (bajo)
- **Oportunidad**: Mejorar a 2.5% CTR = +2,300 clics
- **URL nueva**: Mantener (URL ya buena)
- **Acción**: Actualizar con nuevos bares + mejores fotos + UX

---

## 🛠️ ESTRATEGIA DE MIGRACIÓN (Sin penalización)

### Fase 1: Preparación (Esta semana)
- [ ] Crear todas las nuevas páginas en rama SEO con mejor contenido
- [ ] Validar URLs nuevas con Google Search Console
- [ ] Configurar 301 redirects en next.config.ts
- [ ] Crear sitemap.xml actualizado

### Fase 2: Despliegue (Semana siguiente)
- [ ] Deploy rama SEO a staging
- [ ] Probar todos los 301 redirects
- [ ] Validar que no hay contenido duplicado
- [ ] Crear backups de BD

### Fase 3: Migración (Coordinado)
- [ ] Ejecutar 301 redirects en producción
- [ ] Notificar a Google en Search Console
- [ ] Monitorear búsquedas de 48 horas
- [ ] Estar atento a cambios de tráfico

### Fase 4: Optimización (Después)
- [ ] Monitorear CTR improvements
- [ ] A/B testing si es necesario
- [ ] Ajustar posiciones objetivo
- [ ] Crear más contenido para URLs emergentes

---

## 📋 MATRIZ DE URLS A MIGRAR

### URLs CON 301 REDIRECT
```
/mejores-restaurantes-menu-degustacion-barcelona/ → /menu-degustacion/
/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/ → /restaurantes-michelin-barcelona/
/regalo-experiencia-gastronomica/ → /regalo/
/cena-clandestina-5/ → /cena-clandestina/
/los-mejores-menus-degustacion-para-regalar/ → /regalo/ (consolidar con regalo)
```

### URLs CONSOLIDADAS (Evitar duplicación)
- `/tarjeta-regalo-*` → `/regalo/`
- `/gift-card/` → `/regalo/`

### URLs A MEJORAR (Sin cambio de URL)
- `/bares-tapas-barcelona-baratos/` (actualizar contenido)
- `/cenas-espectaculo-barcelona-secreta/` → `/grupos/` (mejor estructura)
- Blog posts: mantener slugs, mejorar contenido

---

## 💡 MEJORAS TÉCNICAS POR PÁGINA

### 1. HOME (/)
**Mejoras**:
- [ ] Hero mejorado con keywords "cena clandestina barcelona"
- [ ] Section experiencia con video o animación
- [ ] FAQ FAQPage schema (15 preguntas críticas)
- [ ] Restaurant schema + LocalBusiness schema
- [ ] Breadcrumb lista en home
- [ ] CTA doble: "Reserva" + "Regala"

### 2. MENÚ DEGUSTACIÓN
**Mejoras**:
- [ ] Introducción con "Qué es menú degustación"
- [ ] 7 actos descritos con imágenes de Unsplash
- [ ] Video embebido de YouTube (opcional)
- [ ] Table of Contents (TOC) con anchors
- [ ] MenuItem schema para cada plato
- [ ] Maridaje section (vinos, cava, gin-tonic)
- [ ] FAQ schema (15 preguntas sobre menú)
- [ ] "Otros menús similares" con enlaces internos

### 3. CENA CLANDESTINA
**Mejoras**:
- [ ] Storytelling mejorado (4 partes = 4 emails)
- [ ] Imágenes profesionales de experiencia
- [ ] Cronología visual de día del evento
- [ ] Event schema con fecha, ubicación, precio
- [ ] Reviews/testimonios integrados
- [ ] CTA: "Descubre tu ubicación" (botón juguetón)
- [ ] FAQ schema (qué esperar, ubicación, etc)

### 4. REGALO
**Mejoras**:
- [ ] Hero con "Regala la experiencia"
- [ ] 6 razones por qué regalar (con iconos)
- [ ] Lista de ocasiones (cumpleaños, aniversario, etc)
- [ ] Cómo funciona (3 pasos visuales)
- [ ] Validez extendida + flexibilidad
- [ ] Product schema + Offer schema
- [ ] FAQ "¿Cómo puedo enviar el regalo?"

### 5. GRUPOS/EVENTOS PRIVADOS
**Mejoras**:
- [ ] Capacidades de grupos (2-100 personas)
- [ ] Tipos de eventos (corporativo, boda, despedida, etc)
- [ ] Galería de eventos pasados
- [ ] Form de contacto con pre-selección de tipo
- [ ] Event schema
- [ ] Testimonios de grupos

---

## 🚀 PRIORIZACIÓN IMPLEMENTACIÓN

### Semana 1 (Esta semana)
1. **Home** - reescribir hero + schema
2. **Cena Clandestina** - página premium con contenido
3. **Menú Degustación** - página exhaustiva

### Semana 2
4. **Regalo** - versión mejorada
5. **Grupos** - página completa
6. **Restaurantes Michelin** - contenido nuevo

### Semana 3
7. Blog posts mejora (fricandó, recetas, actividades)
8. Páginas secundarias (bares, terrazas, etc)
9. Limpieza URLs duplicadas/innecesarias

---

## 📈 PROYECCIÓN DE IMPACTO

| URL | CTR Actual | CTR Meta | Impresiones/mes | Clics Adicionales |
|-----|----------|----------|-----------------|-----------------|
| Home | 5.61% | 7% | 369,907 | +5,239 |
| Cena Clandestina | 6.09% | 8% | 242,578 | +4,670 |
| Menú Degustación | 7.21% | 12% | 274,640 | +13,132 |
| Michelin | 3% | 5% | 356,352 | +7,127 |
| Regalo | 1.08% | 3% | 146,068 | +2,783 |
| Bares Tapas | 1.2% | 2.5% | 168,390 | +2,206 |
| **TOTAL POTENTIAL** | — | — | — | **+35,157 clics/mes** |

**Interpretación**: Con estas mejoras, pasamos de ~20k clics/mes a ~55k clics/mes (+175%)

---

## ⚠️ RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|-----------|
| Google penaliza por contenido duplicado | Baja | 301 redirects únicos, canonical tags, notificación en SC |
| Pérdida de posicionamiento en URLs viejas | Baja | 301 redirect mantiene autoridad, es permanente |
| Usuarios no encuentran URLs nuevas | Muy baja | 301 automático, menús actualizados, interlinking |
| Tiempo de indexación de URLs nuevas | Media | Notificar a Google SC, crear sitemap actualizado |
| CMS dinámico no actualiza enlaces | Media | Script que actualiza links en todos los bloques |

---

## ✅ CHECKLIST PRE-MIGRACIÓN

- [ ] Todas las páginas nuevas creadas en rama SEO
- [ ] Contenido reescrito y optimizado
- [ ] Schema markup validado con Google Rich Results
- [ ] 301 redirects configurados en next.config.ts
- [ ] Sitemap.xml actualizado con nuevas URLs
- [ ] robots.txt actualizado
- [ ] Canonical tags configurados
- [ ] Prueba de 301 redirects en staging
- [ ] No hay contenido duplicado
- [ ] Performance Lighthouse 90+
- [ ] Mobile responsive test
- [ ] Links internos actualizados
- [ ] Search Console preparado para cambio
- [ ] Backup de BD realizado
- [ ] Plan de rollback definido

---

## 📞 PRÓXIMOS PASOS

1. **Tu aprobación**: ¿Procedo con implementación de TIER 1 (Home + Cena + Menú)?
2. **Yo creo**: Todas las páginas mejoradas en rama SEO
3. **Tú validas**: Revisar contenido y mejoras
4. **Ambos ejecutamos**: Deploy coordinado a producción

**¿Aprobado? Empiezo ahora con las 3 páginas críticas.**

