# 📋 TAREAS REALES PENDIENTES — Gastroshows Vercel
**Objetivo:** Que gastroshows.vercel.app sea igual/mejor que gastroshows.es  
**Estado:** EN DESARROLLO (No migrar DNS hasta completar)  
**Última actualización:** 2026-06-05

---

## 🎯 ESTRATEGIA GENERAL

- ✅ NO crear 65 páginas nuevas
- ✅ SOLO las de ALTO tráfico (con muchas visitas en Search Console)
- ✅ Páginas de bajo tráfico → redirects a similares
- ✅ Mejorar las existentes vs expandir
- ✅ Mantener/superar SEO de WordPress
- ✅ Optimizar para IA (Gemini, ChatGPT, Claude)

---

## 🔴 BLOQUEADORES CRÍTICOS (Falta de todo)

### 1. IMÁGENES — Ausentes prácticamente todas
**Estado:** ❌ Falta el 90%  
**Impacto:** Alto - afecta UX, SEO (image alt), PageSpeed

**Dónde faltan:**
- [ ] `/cena-clandestina` - Múltiples seções sin imágenes
- [ ] `/regalo` - Galería vacía
- [ ] `/grupos` - Sin imágenes de eventos
- [ ] `/blog` - Posts sin imágenes intermedias
- [ ] `/menu-degustacion` - Sin fotos de platos
- [ ] Todas las páginas nuevas (Michelin, etc.)

**Qué hacer:**
1. Descargar imágenes de gastroshows.es (screenshots, fotos)
2. Optimizar (compresión, WebP, lazy loading)
3. Subir a Supabase Storage (ya configurado)
4. Reemplazar URLs Unsplash por imágenes propias
5. Agregar `alt` descriptivos (SEO + A11y)

**Formato esperado:**
```typescript
<Image
  src="/images/experiencia/ambiente.jpg"  // ← Local, no Unsplash
  alt="Sala secreta GastroShows con candelabros dorados"
  width={1200}
  height={600}
/>
```

---

### 2. INTERLINKING — NO está implementado
**Estado:** ❌ Falta completamente  
**Impacto:** Crítico - Google premia sitios bien conectados

**Qué es:**
- Links internos entre páginas relacionadas
- Ejemplo: En `/blog/michelin` → link a `/cena-clandestina`
- Ej: En `/regalo` → link a `/cena-clandestina`
- Ej: En `/menu-degustacion` → link a `/blog/tasting-menu`

**Estructura esperada (de WordPress):**
```
Homepage → Cena Clandestina (CTA principal)
Homepage → Grupos (teams, despedidas)
Homepage → Regalo (gift cards)
Homepage → Blog (social proof)

Blog posts → Cena Clandestina (botón "Reservar")
Blog posts → Grupos (si menciona team building)

Grupos → Cena Clandestina (link alternativa)
Regalo → Cena Clandestina (upgrade experience)
```

**Tareas:**
- [ ] Auditar interlinking en gastroshows.es (qué links hay)
- [ ] Crear mapa de interlinking estratégico
- [ ] Implementar en Vercel (componentes, CTAs, breadcrumbs)
- [ ] Verificar que todos los links funcionen

---

### 3. CONSISTENCIA DE TEXTOS — H1, H2, párrafos
**Estado:** ⚠️ Parcial (algunos hechos, otros no)  
**Impacto:** Medio - confunde a bots, duplicados = penalización

**Revisar:**
- [ ] **H1**: Debe ser único por página, igual o mejor que WordPress
  - `/cena-clandestina` H1: "La Cena Clandestina Más Exclusiva de Barcelona"
  - `/regalo` H1: "Regala la Experiencia Más Exclusiva de Barcelona"
  
- [ ] **H2, H3**: Estructura lógica, no duplicados
  
- [ ] **Párrafos intro**: Primeros 2-3 párrafos = igual a WordPress (o mejor)
  
- [ ] **Meta descriptions**: Idénticas o superiores a WordPress
  
- [ ] **Keywords primarias**: Presentes en título, H1, primeros párrafos

**Checklist por página:**
```
Página: /cena-clandestina
- [ ] H1 es único y potente
- [ ] Meta description = "Cena clandestina en Barcelona..."
- [ ] Primeros párrafos = WordPress
- [ ] 2+ imágenes hero/ambiente
- [ ] 5+ H2s lógicos y descriptivos
- [ ] Links internos a /regalo, /blog, /grupos
- [ ] Schema markup (eventSchema, restaurantSchema)
```

---

## 🟡 FUNCIONALIDADES PENDIENTES (No bloqueadores, pero importantes)

### 4. SEO BÁSICO — Revisar antes de GEO
**Estado:** ⚠️ Parcial implementado

**Checklist:**
- [ ] Títulos todos con año correcto (2026, no 2025)
- [ ] OG images son propias, no Unsplash
- [ ] OG titles y descriptions en TODAS las páginas
- [ ] Canonical URLs correctas (gastroshows.es)
- [ ] JSON-LD schemas en todas las páginas key
- [ ] Sitemap dinámico funcional (`/sitemap.xml`)
- [ ] Robots.txt correcto (`/robots.txt`)
- [ ] Mobile responsive 100%
- [ ] Core Web Vitals 90+ (LCP, CLS, INP)

**Herramientas para verificar:**
- Google PageSpeed Insights
- Google Rich Results Test (schema)
- Google Mobile-Friendly Test

---

### 5. GEO OPTIMIZATION — Para IA (Gemini, ChatGPT, Claude)
**Estado:** ❌ No iniciado  
**Impacto:** Alto - IA recomienda basada en estos factores

**Qué es GEO en contexto de IA:**
- Semántica natural (no keywords forzados)
- Respuestas claras a preguntas comunes
- Contenido estructurado (FAQ, listas, tablas)
- Authority + relevancia
- E-E-A-T signals (Expertise, Experience, Authority, Trustworthiness)

**Qué hacer:**
- [ ] **FAQ expandido** - Responder preguntas tipo "cómo funciona", "precio", "dónde"
- [ ] **Contenido conversacional** - "Qué incluye", "Cómo reservar", "Preguntas frecuentes"
- [ ] **Tablas de comparación** - "Nuestro vs restaurantes similares"
- [ ] **Review/Testimonios** - Mostrar satisfacción (credibilidad)
- [ ] **Información clara de negocio** - Ubicación, horarios, teléfono (si aplica)
- [ ] **Breadcrumbs** - Ayudan a IA a entender estructura
- [ ] **Schema markup completo** - Para IA extraiga datos

**Ejemplo FAQ mejorada:**
```
Q: ¿Cuántas personas pueden venir?
A: Máximo 12 personas por sesión. Grupos más grandes necesitan dos sesiones separadas.

Q: ¿Qué pasa si cancelo?
A: Cancelación gratuita hasta 7 días antes. 3-7 días: 50% cargo. <3 días: sin reembolso.

Q: ¿Apto para vegetarianos?
A: 100% sí. El chef adapta el menú a alergias y dietas. Avisa al reservar.
```

---

## 📊 PRIORIZACIÓN DE TAREAS

### SEMANA 1: FOUNDATION
- [ ] **Imágenes** (80% crítico)
  - Descargar de WordPress
  - Optimizar
  - Subir a Storage
  - Reemplazar URLs
  
- [ ] **Interlinking** (20% crítico)
  - Mapear estructura
  - Agregar CTAs/links
  - Testing

**Estimado:** 15-20 horas  
**Resultado:** Vercel empieza a parecer "real"

---

### SEMANA 2: PULIDO
- [ ] **Consistencia de textos**
  - Auditar H1/H2 vs WordPress
  - Igualar o mejorar
  - Verificar keywords
  
- [ ] **SEO básico**
  - Títulos (2026)
  - OG images propias
  - Schema markup

**Estimado:** 10-15 horas  
**Resultado:** SEO al nivel de WordPress

---

### SEMANA 3: OPTIMIZACIÓN AVANZADA
- [ ] **GEO para IA**
  - FAQ expandido
  - Contenido conversacional
  - E-E-A-T signals
  - Testimonios

**Estimado:** 10-12 horas  
**Resultado:** IA lo recomienda naturalmente

---

## ❌ COSAS QUE NO HACER (por ahora)

- ❌ Crear 65 páginas nuevas
- ❌ Agregar noindex/index (se hace en migración final)
- ❌ Cambiar DNS a Vercel
- ❌ Investigar herramientas de análisis nuevas
- ❌ Diseño completo (solo mejorar existente)
- ❌ Traducción completa a CA/EN (mantener ES primario)

---

## 📈 MÉTRICA DE ÉXITO

Cuando todo esté listo:
- ✅ Vercel tiene 95% de contenido de WordPress
- ✅ Imágenes = 100% locales (no Unsplash)
- ✅ Interlinking = Google lo recomienda
- ✅ Textos = iguales o mejores
- ✅ IA lo recomienda naturalmente
- ✅ PageSpeed 90+
- ✅ Build sin errores

**Resultado:** Migración DNS = sin penalización SEO

---

## 🚀 SIGUIENTE: ¿Por cuál empezamos?

**Opción A:** Imágenes primero (foundation visual)  
**Opción B:** Interlinking primero (SEO signal)  
**Opción C:** Consistency primero (contenido)  

¿Cuál prefieres?

