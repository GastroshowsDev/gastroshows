# 🖼️ PLAN DE IMÁGENES — Gastroshows Vercel
**Objetivo:** Reemplazar Unsplash por imágenes propias (100%)  
**Estado:** En auditoría  
**Prioridad:** CRÍTICA (afecta SEO + UX)

---

## 📊 AUDIT ACTUAL — Páginas principales

### 1. `/page.tsx` (Homepage/Cena Clandestina)
```
🔴 Hero image: https://images.unsplash.com/photo-1517315177153-612f65b43bd5
Status: USAR PROPIA
Needed: Foto elegante de cena/ambiente
```

### 2. `/cena-clandestina`
```
✅ Hero: /images/experiencia/ambiente.jpg (LOCAL)
Status: OK
Needed: Más imágenes en el contenido
```

### 3. `/regalo`
```
🟡 OG image reference: https://gastroshows.es/og-regalo.jpg
Status: NECESITA VERIFICAR SI EXISTE
Needed: Si no existe, crear imagen de gift card/bono
```

### 4. `/menu-degustacion`
```
🟡 OG image reference: https://gastroshows.es/og-menu.jpg
Status: NECESITA VERIFICAR SI EXISTE
Needed: Si no existe, crear imagen de platos/menú
```

### 5. `/grupos`
```
🔴 NO hay imágenes (solo texto)
Status: FALTA
Needed: Foto de evento/grupos/team building
```

### 6. `/blog` (landing)
```
🔴 NO hay imágenes
Status: FALTA
Needed: Foto hero de blog
```

### 7. `/blog/*` (posts individuales)
```
🔴 Michelin post - sin imágenes intermedias
Status: FALTA
Needed: Fotos de restaurantes Michelin (si es posible conseguir)
```

---

## 🎯 CHECKLIST POR PÁGINA — Qué se necesita

### Páginas de PRODUCTO (Cena, Regalo, Grupos, Menu)

```
CENA-CLANDESTINA
- [ ] Hero 1920x1080 (ambiente/ambiente elegante)
- [ ] 2-3 imágenes de ambiente interior
- [ ] 1-2 fotos de platos
- [ ] 1 foto de maridaje/vinos
- [ ] Tamaño: optimizado para web (300-500KB por imagen)
- [ ] Formato: WebP + fallback JPG
- [ ] Alt text: descriptivo para SEO

REGALO
- [ ] Hero/bono visual (1200x630 para OG)
- [ ] Foto de cena en contexto regalo
- [ ] Imagen de proceso (cómo funciona)
- [ ] Tamaño: 300-400KB

GRUPOS
- [ ] Hero de evento/team building (1920x1080)
- [ ] 2-3 fotos de grupos en ambiente
- [ ] 1 foto de chef con grupo
- [ ] Tamaño: 300-500KB

MENU-DEGUSTACION
- [ ] Hero de platos/mesa (1200x630 para OG)
- [ ] 4-5 fotos de platos individuales
- [ ] 1 foto de copa de vino
- [ ] Tamaño: 300-400KB por imagen
```

### Blog Posts
```
CADA POST
- [ ] 1 Hero image (1200x630)
- [ ] 2-3 imágenes intermedias
- [ ] Alt text único por imagen
- [ ] Tamaño: 200-300KB por imagen
- [ ] Relevantes al contenido (no genéricas)
```

---

## 📁 ESTRUCTURA DE CARPETAS (Propuesta)

```
public/
├── images/
│   ├── experiencia/         (YA EXISTE)
│   │   └── ambiente.jpg
│   ├── hero/
│   │   ├── homepage.jpg
│   │   ├── regalo.jpg
│   │   ├── grupos.jpg
│   │   └── menu.jpg
│   ├── blog/
│   │   ├── michelin/
│   │   │   ├── xavi-pellicer.jpg
│   │   │   ├── coque.jpg
│   │   │   └── enigma.jpg
│   │   └── tasting-menu/
│   │       ├── acto-1.jpg
│   │       ├── acto-2.jpg
│   │       └── ...
│   ├── og/
│   │   ├── og-regalo.jpg
│   │   ├── og-menu.jpg
│   │   └── og-grupos.jpg
```

---

## 🔧 PROCESO DE EJECUCIÓN

### PASO 1: Obtener imágenes de WordPress
**De:** gastroshows.es (WordPress)
**Cómo:**
1. Acceder a media library de WordPress
2. Descargar imágenes de calidad originales
3. O tomar screenshots de la web actual
4. Guardar en carpeta temporal

**Imágenes críticas:**
- Hero image principal
- Fotos de cenas anteriores (si existen)
- Logos/branding
- Fotos del ambiente/local
- Fotos de platos (si tiene)

---

### PASO 2: Optimizar imágenes
**Herramientas:** TinyPNG, ImageMagick, o VS Code

**Requisitos:**
- Tamaño final: <500KB por imagen
- Resolución: 1200px ancho mínimo (para high-DPI)
- Formato: WebP (primary) + JPG (fallback)
- Compresión: 75-85% quality

**Comando (si usas ImageMagick):**
```bash
convert input.jpg -quality 80 -resize 1920x1080 output.jpg
```

---

### PASO 3: Crear OG images (1200x630)
**Para:**
- og-regalo.jpg
- og-menu.jpg
- og-grupos.jpg
- og-blog.jpg

**Diseño propuesto:**
- Fondo: Color dorado (#DAA520) o imagen tenue
- Texto: Título de la página
- Logo: GastroShows pequeño
- Tamaño exacto: 1200x630px
- Formato: JPG

**Herramienta:** Canva (rápido) o Photoshop

---

### PASO 4: Subir a Supabase Storage
**Ya configurado en el proyecto**

**Pasos:**
1. Ir a Supabase Dashboard
2. Storage → crear carpeta `public/images` (si no existe)
3. Subir archivos optimizados
4. Hacer públicas (enable public access)
5. Copiar URLs públicas

**Formato de URL:**
```
https://pqzvohidkjnonkhitoro.supabase.co/storage/v1/object/public/images/hero/homepage.jpg
```

---

### PASO 5: Reemplazar URLs en código
**De:**
```typescript
src="https://images.unsplash.com/photo-1517315177153-612f65b43bd5"
```

**A:**
```typescript
src="/images/hero/homepage.jpg"  // Local, más rápido
// o
src="https://pqzvohidkjnonkhitoro.supabase.co/storage/v1/object/public/images/hero/homepage.jpg"
```

---

## 📋 CHECKLIST DE EJECUCIÓN

### Semana 1
- [ ] Auditar gastroshows.es y descargar todas las imágenes disponibles
- [ ] Crear lista de imágenes faltantes (que no existen en WordPress)
- [ ] Optimizar todas las imágenes descargadas
- [ ] Crear OG images (1200x630)

### Semana 2
- [ ] Subir a Supabase Storage (público)
- [ ] Reemplazar URLs en `/app/page.tsx` (homepage)
- [ ] Reemplazar URLs en `/app/cena-clandestina/page.tsx`
- [ ] Reemplazar URLs en `/app/regalo/page.tsx`
- [ ] Reemplazar URLs en `/app/grupos/page.tsx`
- [ ] Reemplazar URLs en `/app/menu-degustacion/page.tsx`

### Semana 3
- [ ] Agregar imágenes a posts de blog
- [ ] Verificar Core Web Vitals (no debe afectar LCP)
- [ ] Testing en móvil y desktop
- [ ] Commit con mensaje claro

---

## ⚠️ CONSIDERACIONES TÉCNICAS

### Lazy Loading
**Importante:** No TODAS las imágenes deben ser `priority={true}`

```typescript
// Hero = priority (para LCP)
<Image src="..." priority sizes="100vw" />

// Otras imágenes = lazy loading
<Image src="..." loading="lazy" sizes="..." />
```

### Responsive Images
**Usar `sizes` prop:**
```typescript
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

### Alt Text (SEO + A11y)
```typescript
// ❌ MAL
<Image src="..." alt="imagen" />

// ✅ BIEN
<Image src="..." alt="Sala secreta GastroShows con candelabros dorados y ambiente elegante" />
```

---

## 🎨 IMÁGENES QUE NO PUEDES USAR

❌ Stock photos genéricas (Unsplash, Pexels)  
❌ Imágenes sin copyright verification  
❌ Logos de competidores  
❌ Imágenes de baja resolución (<800px)  

✅ Fotos propias (GastroShows)  
✅ Fotos licenciadas (Shutterstock, iStock)  
✅ CC0 con verificación (si aplica)  

---

## 📞 SIGUIENTE PASO

¿Tienes acceso a descargar imágenes de gastroshows.es?

**Si SÍ:**
→ Empezamos a descargar + optimizar

**Si NO:**
→ Necesitamos:
1. FTP/acceso a WordPress media library
2. O credenciales WordPress
3. O lista de fotos que tienes disponibles

¿Cuál es tu situación?

