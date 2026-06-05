# 🎬 SELECCIÓN DE IMÁGENES — Análisis Automático
**Basado en:** Revisión de `public/images/imagenesweb2026/`  
**Fecha:** 2026-06-05  
**Total archivos:** 70+ fotos

---

## 📊 CLASIFICACIÓN AUTOMÁTICA

### ✅ FOTOS PROFESIONALES — USAR ESTAS (R5II*.jpg)
**Características:** 
- Nombres con prefijo R5II (Canon professional camera)
- Tamaño: 3-5MB (RAW/HIGH QUALITY)
- Fecha: Marzo 2024 (bien documentadas)

```
✅ R5II5530.jpg          (576K) - Plato/detalle (MEJOR SIZE)
✅ R5II6617-2.jpg        (574K) - Plato/composición
✅ R5II6680.jpg          (348K) - Ambiente/detalle
✅ R5II7129-2.jpg        (383K) - Detalle
✅ R5II7141.jpg          (444K) - Composición
✅ R5II7148.jpg          (444K) - Ambiente
✅ R5II7154.jpg          (341K) - Ambiente  
✅ R5II7167.jpg          (250K) - Detalle (MEJOR SIZE)
✅ R5II7242-2.jpg        (279K) - Composición (MEJOR SIZE)

⚠️ R5II5266-2.jpg        (4.8M) - DEMASIADO PESADA (necesita compresión)
⚠️ R5II5445.jpg          (5.5M) - DEMASIADO PESADA
⚠️ R5II6154-5 copia.jpg  (3.3M) - PESADA (es copia)
⚠️ R5II6197-2.jpg        (3.9M) - PESADA
⚠️ R5II6313-2.jpg        (5.3M) - DEMASIADO PESADA
```

### ✅ FOTOS CON NOMBRE LÓGICO — USAR ESTAS
```
✅ maridaje-vinos-cocteles-barcelona.webp    (WEBP = YA OPTIMIZADA)
✅ cena-privada-barcelona-gastroshows.jpg    (CLARA)
✅ menu-degustacion-platos-gastronomia.jpg   (CLARA)
✅ mesa-chef-bocados-experiencia-gastroshows.jpg (CLARA)
✅ cena-exclusiva-barcelona-gastroshows.jpg  (CLARA)
```

### ❌ FOTOS GENERALES — NO USAR
```
❌ IMG_*.jpg / IMG_*.JPG       (Fotos normales de teléfono)
❌ 17360*.jpg                  (Screenshots/random)
❌ Boda Jordi + Julio          (Bodas, no gastronomía)
❌ _DSC*.jpg / _MG_*.jpg       (Fotos amateur, baja calidad)
❌ "Copia de" archivos         (Duplicados)
```

---

## 🎯 SELECCIÓN FINAL POR USO

### Para HOMEPAGE (/page.tsx)
**Necesario:** Hero elegante, sofisticado, ambiente cena
**Seleccionado:**
```
✅ R5II7148.jpg (444K) - Ambiente elegante, mesa servida
   → Optimizar a 1920x1080, 300KB máximo
   → Renombrar a: /images/web2026-optimizadas/hero-homepage.jpg
```

---

### Para REGALO (/app/regalo/page.tsx)
**Necesario:** Regalo/bono visual, ambiente sofisticado
**Seleccionado:**
```
✅ cena-privada-barcelona-gastroshows.jpg - YA TIENE BUEN NOMBRE
   → Optimizar y usar como OG image (1200x630)
   → Path: /images/web2026-optimizadas/og-regalo.jpg
```

---

### Para MENU-DEGUSTACION (/app/menu-degustacion/page.tsx)
**Necesario:** Platos, menú visual
**Seleccionado:**
```
✅ menu-degustacion-platos-gastronomia.jpg - YA TIENE BUEN NOMBRE
   → Optimizar a 1200x630 para OG
   → Path: /images/web2026-optimizadas/og-menu.jpg

✅ R5II7167.jpg (250K) - Plato detalle
   → Optimizar y usar en sección de menú
   → Path: /images/web2026-optimizadas/menu-plato-1.jpg

✅ mesa-chef-bocados-experiencia-gastroshows.jpg
   → Optimizar y usar
   → Path: /images/web2026-optimizadas/menu-plato-2.jpg
```

---

### Para GRUPOS (/app/grupos/page.tsx)
**Necesario:** Eventos, grupos, ambiente
**Seleccionado:**
```
✅ cena-exclusiva-barcelona-gastroshows.jpg - USO MÚLTIPLE
   → Optimizar
   → Path: /images/web2026-optimizadas/grupos-hero.jpg

✅ R5II7141.jpg (444K) - Composición
   → Optimizar y usar en sección de características
   → Path: /images/web2026-optimizadas/grupos-ambiente.jpg
```

---

### Para OG IMAGES (Social Sharing)
**Necesario:** 1200x630, clara, atractiva

```
og-regalo.jpg     ← cena-privada-barcelona-gastroshows.jpg
og-menu.jpg       ← menu-degustacion-platos-gastronomia.jpg
og-grupos.jpg     ← cena-exclusiva-barcelona-gastroshows.jpg
og-homepage.jpg   ← R5II7148.jpg (croppear a 1200x630)
```

---

## 🔧 PLAN DE OPTIMIZACIÓN

### PASO 1: Crear carpeta de destino
```
public/images/web2026-optimizadas/
├── hero-homepage.jpg           (1920x1080, 250-300KB)
├── og-regalo.jpg               (1200x630, 150-200KB)
├── og-menu.jpg                 (1200x630, 150-200KB)
├── og-grupos.jpg               (1200x630, 150-200KB)
├── menu-plato-1.jpg            (800x600, 100-150KB)
├── menu-plato-2.jpg            (800x600, 100-150KB)
├── grupos-hero.jpg             (1920x1080, 250-300KB)
└── grupos-ambiente.jpg         (800x600, 100-150KB)
```

---

### PASO 2: Optimizar cada imagen

**Para HERO images (1920x1080):**
```bash
# Input: R5II7148.jpg (444K)
# Output target: 250-300KB
# Compression: 70-75% quality

Herramienta: TinyPNG.com o ImageMagick
```

**Para OG images (1200x630):**
```bash
# Croppear original a 1200x630
# Comprimir a 150-200KB máximo
```

**Para PLATO images (800x600):**
```bash
# Reducir a 800x600
# Comprimir a 100-150KB
```

---

### PASO 3: URLs a REEMPLAZAR en código

#### EN `/app/page.tsx` (HOMEPAGE - CRÍTICO)
```typescript
// ACTUAL (Unsplash):
src="https://images.unsplash.com/photo-1517315177153-612f65b43bd5?w=1920&h=1080&fit=crop"

// NUEVO:
src="/images/web2026-optimizadas/hero-homepage.jpg"
alt="Cena elegante en Barcelona - Ambiente sofisticado de GastroShows"
```

---

#### EN `/app/regalo/page.tsx`
```typescript
// ACTUAL:
images: [{ url: "https://gastroshows.es/og-regalo.jpg" }]

// NUEVO:
images: [{ url: "/images/web2026-optimizadas/og-regalo.jpg" }]
```

---

#### EN `/app/menu-degustacion/page.tsx`
```typescript
// ACTUAL:
images: [{ url: "https://gastroshows.es/og-menu.jpg" }]

// NUEVO:
images: [{ url: "/images/web2026-optimizadas/og-menu.jpg" }]

// AGREGAR en el contenido (si no tiene imágenes):
<Image 
  src="/images/web2026-optimizadas/menu-plato-1.jpg"
  alt="Plato principal - Menú degustación GastroShows"
  width={800}
  height={600}
/>
```

---

#### EN `/app/grupos/page.tsx`
```typescript
// AGREGAR:
<Image 
  src="/images/web2026-optimizadas/grupos-hero.jpg"
  alt="Evento privado - Cena de grupos en Barcelona"
  width={1920}
  height={1080}
  priority
/>
```

---

## 📋 CHECKLIST DE EJECUCIÓN

### ☑️ Fase 1: Preparación (30 min)
- [ ] Crear carpeta `/images/web2026-optimizadas/`
- [ ] Copiar archivos seleccionados ahí
- [ ] Renombrar según plan arriba

### ☑️ Fase 2: Optimización (2 horas)
- [ ] Optimizar 8 imágenes
- [ ] Comprimir a tamaños objetivos
- [ ] Verificar calidad visual (no pixelado)

### ☑️ Fase 3: Código (1 hora)
- [ ] Reemplazar URL en /app/page.tsx
- [ ] Reemplazar URL en /app/regalo/page.tsx
- [ ] Reemplazar URL en /app/menu-degustacion/page.tsx
- [ ] Agregar imágenes a /app/grupos/page.tsx
- [ ] Build y verificar

### ☑️ Fase 4: Verificación (30 min)
- [ ] `npm run build` sin errores
- [ ] Verificar imágenes cargan en navegador
- [ ] Check Core Web Vitals (PageSpeed)
- [ ] Git commit

---

## 🚀 SIGUIENTE

¿Confirmas que proceda con esta selección?

**Si sí:**
→ Te aviso cuando haya:
1. Creado la carpeta `/images/web2026-optimizadas/`
2. Optimizado las 8 imágenes
3. Reemplazado URLs en código
4. Build listo para testear

