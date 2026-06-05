# 🖼️ PLAN DE IMÁGENES — REAL (Basado en lo que tienes)
**Objetivo:** Reemplazar Unsplash por imágenes propias que ya tienes  
**Estado:** Inventario completado  
**Prioridad:** CRÍTICA

---

## 📊 INVENTARIO DE LO QUE TIENES

### ✅ Carpetas YA ORGANIZADAS (listas para usar)
```
public/images/
├── cena-clandestina-de-barcelona-grupos/       (11 imágenes ✅)
├── cena-con-show-en-vivo/                      (3 imágenes ✅)
├── cena-creativa-en-casa/                      (8 imágenes ✅)
├── cenas-espectaculo-secreta/                  (5 imágenes ✅)
├── cenas-privadas-barcelona/                   (5+ imágenes ✅)
├── blog/michelin-barcelona/                    (5 imágenes ✅)
├── actividades-gastronomicas/                  (7 imágenes ✅)
├── bares-tapas-baratos/                        (3 imágenes ✅)
├── alquiler-espacio-gastronomico/              (3 imágenes ✅)
└── ... (más carpetas) ✅
```

### ⚠️ Carpeta SIN ORGANIZAR (fotos originales)
```
public/images/imagenesweb2026/                  (70+ fotos sin organizar)
├── _DSC2898 copia.jpg
├── Boda Jordi + Julio (387 de 404).jpg
├── IMG_3370.JPG
├── R5II6154-5 copia.jpg
├── ... (muchas más)
└── maridaje-vinos-cocteles-barcelona.webp ✅ (algunas ya tienen buen nombre)
```

---

## 🎯 ESTRATEGIA: 2 FASES

### FASE 1: Usar lo que YA ESTÁ ORGANIZADO (80% listo)
Hay suficientes imágenes en carpetas organizadas para:
- ✅ Cena Clandestina (grupos)
- ✅ Cena con Show en Vivo
- ✅ Cena Creativa en Casa
- ✅ Blog posts (Michelin, etc.)
- ✅ Actividades gastronómicas
- ✅ Cenas privadas

### FASE 2: Organizar `imagenesweb2026/` (20% pendiente)
Para el resto de páginas que faltan imágenes.

---

## 📋 CHECKLIST POR PÁGINA — Qué REEMPLAZAR

### ✅ PÁGINAS LISTAS (tienen imágenes organizadas)

#### `/cena-clandestina`
**Actual:** ❌ Usa Unsplash en homepage (`/page.tsx`)  
**Disponible:** ✅ `public/images/cena-clandestina-de-barcelona-grupos/`
```
- hero-cena-clandestina-grupos-barcelona.jpg (usa esta)
- candelabro-dorado-vela-ambiente-cena-clandestina.jpg
- mesa-larga-grupos-cristaleria-ambiente-pre-cena.jpg
- cena-clandestina-grupos-degustacion.jpg
```
**Acción:** Reemplazar Unsplash en `/app/page.tsx` y `/app/cena-clandestina/page.tsx`

---

#### `/grupos`
**Actual:** ❌ Sin imágenes  
**Disponible:** ✅ `public/images/cena-clandestina-de-barcelona-grupos/` (ya está)
**Acción:** Agregar imágenes al archivo `/app/grupos/page.tsx`

---

#### `/regalo`
**Actual:** ⚠️ Referencia a `og-regalo.jpg` (posible que no exista)  
**Disponible:** ✅ Usar foto elegante de cena/mesa de `cena-privadas-barcelona/`
**Acción:** 
1. Crear/usar imagen OG de regalo (1200x630)
2. Agregar 2-3 imágenes en la página

---

#### `/menu-degustacion`
**Actual:** ⚠️ Referencia a `og-menu.jpg` (posible que no exista)  
**Disponible:** ✅ Fotos de platos en `imagenesweb2026/` (identificar cuáles)
**Acción:**
1. Crear/usar imagen OG de menú (1200x630)
2. Agregar 4-5 imágenes de platos

---

#### `/blog/restaurantes-michelin`
**Actual:** ✅ YA TIENE imágenes  
**Disponible:** ✅ `public/images/blog/michelin-barcelona/`
**Status:** OK, mantener

---

### 🟡 PÁGINAS PARCIALES

#### `/actividades-gastronomicas`
**Actual:** ❌ Posiblemente sin imágenes  
**Disponible:** ✅ `public/images/actividades-gastronomicas/`
**Acción:** Verificar página y agregar si falta

---

#### `/cena-con-show-en-vivo`
**Actual:** ⚠️ Probablemente sin imágenes  
**Disponible:** ✅ `public/images/cena-con-show-en-vivo/`
**Acción:** Agregar imágenes de chef con fuego/espectáculo

---

#### `/cena-creativa-en-casa`
**Actual:** ⚠️ Probablemente sin imágenes  
**Disponible:** ✅ `public/images/cena-creativa-en-casa/`
**Acción:** Agregar imágenes de platos y experiencia

---

### ❌ PÁGINAS QUE NECESITAN imagenesweb2026/

#### `/homepage` (page.tsx)
**Actual:** ❌ Usa Unsplash genérica  
**Necesario:** Hero elegante de cena/ambiente
**De imagenesweb2026:** Identificar las mejores fotos (probablemente las R5II*.jpg que parecen profesionales)

---

## 🚀 PLAN DE EJECUCIÓN

### PASO 1: Identificar mejores fotos en imagenesweb2026/
**Qué hacer:**
1. Abrir `public/images/imagenesweb2026/` en explorador
2. Revisar cada carpeta y seleccionar las MEJORES
3. Crear lista de: "Foto X es buena para [sección]"

**Fotos probablemente BUENAS (por nombre):**
```
✅ R5II6154-5 copia.jpg         (profesional - menú/platos)
✅ R5II6313-2.jpg               (profesional)
✅ R5II6197-2.jpg               (profesional)
✅ R5II7167.jpg                 (profesional)
✅ maridaje-vinos-cocteles-barcelona.webp (YA tiene buen nombre)
✅ cena-privada-barcelona-gastroshows.jpg (YA tiene buen nombre)
✅ menu-degustacion-platos-gastronomia.jpg (YA tiene buen nombre)
✅ mesa-chef-bocados-experiencia-gastroshows.jpg (YA tiene buen nombre)
```

**Fotos probablemente MALAS (por nombre):**
```
❌ IMG_20250104_202826.jpg      (fotos normales de teléfono)
❌ IMG_3370.JPG                 (fotos normales)
❌ 1736068912883.jpg            (screenshots/random)
```

---

### PASO 2: Renombrar y reorganizar imagenesweb2026/
**Crear estructura nueva:**
```
public/images/
├── imagenesweb2026-procesadas/
│   ├── hero/
│   │   ├── homepage-hero.jpg              (mejor foto para home)
│   │   ├── regalo-hero.jpg                (elegante, mesa/regalo)
│   │   └── menu-hero.jpg                  (platos mejor presentados)
│   ├── platos/
│   │   ├── acto-1-entrada.jpg
│   │   ├── acto-2-sorpresa.jpg
│   │   ├── acto-3-principal.jpg
│   │   └── acto-4-postre.jpg
│   └── ambiente/
│       ├── mesa-detalle.jpg
│       ├── copa-vino.jpg
│       └── ambiente-general.jpg
```

---

### PASO 3: Optimizar imágenes
**Requisitos:**
- Tamaño: <500KB por imagen
- Resolución: 1200px mínimo
- Formato: JPG (o WebP si es muy pesado)

**Herramienta fácil:** 
- Usar Preview en Mac o Photos en Windows
- O TinyPNG online: https://tinypng.com (sube y descarga)

---

### PASO 4: Reemplazar URLs en código

#### EN `/app/page.tsx` (homepage - CRÍTICO)
**ACTUAL:**
```typescript
src="https://images.unsplash.com/photo-1517315177153-612f65b43bd5?w=1920&h=1080&fit=crop"
```

**NUEVO:**
```typescript
src="/images/imagenesweb2026-procesadas/hero/homepage-hero.jpg"
alt="Cena elegante en Barcelona - Ambiente sofisticado de GastroShows"
```

---

#### EN `/app/cena-clandestina/page.tsx`
**YA TIENE:** `/images/experiencia/ambiente.jpg` ✅  
**AGREGAR:** Más imágenes si es necesario

---

#### EN `/app/regalo/page.tsx`
**Buscar OG image:**
```typescript
images: [{ url: "https://gastroshows.es/og-regalo.jpg" }]
```

**CAMBIAR A:**
```typescript
images: [{ url: "/images/imagenesweb2026-procesadas/hero/regalo-hero.jpg" }]
```

---

#### EN `/app/menu-degustacion/page.tsx`
**Buscar OG image:**
```typescript
images: [{ url: "https://gastroshows.es/og-menu.jpg" }]
```

**CAMBIAR A:**
```typescript
images: [{ url: "/images/imagenesweb2026-procesadas/hero/menu-hero.jpg" }]
```

---

### PASO 5: Testing
- [ ] `npm run build` sin errores
- [ ] Verificar imágenes cargan en navegador
- [ ] Core Web Vitals en PageSpeed (no debe afectar LCP)
- [ ] Mobile responsive

---

## ⏱️ TIMELINE REALISTA

| Paso | Tiempo | Responsable |
|------|--------|-------------|
| 1. Revisar imagenesweb2026/ | 30 min | Tú (propietario - mejor ojo) |
| 2. Seleccionar + renombrar | 1 hora | Tú |
| 3. Optimizar imágenes | 1 hora | Yo (si me pasas archivos) o tú |
| 4. Subir a carpeta optimizada | 30 min | Tú |
| 5. Reemplazar URLs en código | 1 hora | Yo |
| 6. Testing + commit | 30 min | Yo |
| **TOTAL** | **~4 horas** | **Colabo** |

---

## 🎯 SIGUIENTE PASO

**¿Cuál es tu situación?**

**Opción A:** Te paso archivos para optimizar
→ Tú revisat imagenesweb2026/ + selectas mejores  
→ Yo optimizo + reemplazo URLs

**Opción B:** Yo reviso y selecciono
→ Tú me dices acceso a las fotos  
→ Yo hago todo

**¿Cuál prefieres?**

