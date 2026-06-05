# 🔗 PLAN DE INTERLINKING — Gastroshows Vercel
**Objetivo:** Links internos estratégicos para SEO + conversión  
**Prioridad:** CRÍTICA (Google premia sitios bien conectados)  
**Fecha:** 2026-06-05

---

## 📊 ESTADO ACTUAL

### ✅ Links que YA EXISTEN
- Homepage → `/cena-clandestina` (CTA principal)
- Blog posts → `/cena-clandestina` (botones "Reservar")
- Footer → Links a todas las páginas principales
- Breadcrumbs en blog posts

### ❌ Links ESTRATÉGICOS QUE FALTAN
- `/cena-clandestina` ↔ `/grupos` (cross-sell)
- `/regalo` → `/cena-clandestina` (upsell)
- `/menu-degustacion` → `/blog` (authority)
- Blog posts ↔ Blog posts (contenido relacionado)
- Homepage → `/preguntas-frecuentes` (trust)

---

## 🎯 ESTRUCTURA DE INTERLINKING RECOMENDADA

### NIVEL 1: PÁGINAS PRINCIPALES (HUB)
```
Homepage (/)
├── Cena Clandestina (/cena-clandestina)
│   ├── → Grupos (para grupos/eventos)
│   ├── → Regalo (para regalar)
│   ├── → Menu Degustación (para ver qué incluye)
│   └── → FAQ (responder dudas)
│
├── Grupos (/grupos)
│   ├── → Cena Clandestina (experiencia base)
│   └── → Menu Degustación (qué comen)
│
├── Regalo (/regalo)
│   ├── → Cena Clandestina (qué regalan)
│   └── → FAQ (cómo funciona el bono)
│
├── Menu Degustación (/menu-degustacion)
│   ├── → Cena Clandestina (experiencia completa)
│   └── → Blog (articulos de gastronomia)
│
└── Blog (/blog)
    ├── → Cena Clandestina (social proof)
    ├── → Grupos (team building posts)
    └── → Otros posts (temas relacionados)
```

---

## 📍 UBICACIONES EXACTAS DONDE AGREGAR LINKS

### 1. `/app/cena-clandestina/page.tsx`

**Sección: "Experiencia Privada para Grupos"**
```typescript
// ANTES: (sin link)
<p>¿Buscas una experiencia privada para tu grupo?</p>

// DESPUÉS: (con link)
<p>
  ¿Buscas una experiencia privada para tu grupo?{' '}
  <Link href="/grupos">
    Descubre nuestras opciones para eventos.
  </Link>
</p>
```

**Sección: "Regala esta Experiencia"**
```typescript
// AGREGAR:
<p>
  Perfecto para regalar.{' '}
  <Link href="/regalo">
    Ver opciones de bono regalo.
  </Link>
</p>
```

---

### 2. `/app/regalo/page.tsx`

**Sección: Hero o Descripción**
```typescript
// AGREGAR CTA:
<Link href="/cena-clandestina" className="btn btn-primary">
  Conocer la Experiencia →
</Link>
```

**Sección: FAQ o Proceso**
```typescript
// AGREGAR:
<p>
  Quieres saber qué incluye exactamente?{' '}
  <Link href="/menu-degustacion">
    Ver menú degustación completo.
  </Link>
</p>
```

---

### 3. `/app/grupos/page.tsx`

**Sección: Características / Qué Incluye**
```typescript
// AGREGAR:
<p>
  La misma experiencia que{' '}
  <Link href="/cena-clandestina">
    nuestra cena clandestina
  </Link>
  , pero diseñada para tu grupo.
</p>
```

**Sección: Footer o CTA Final**
```typescript
// AGREGAR:
<p>
  ¿Prefieres una experiencia individual?{' '}
  <Link href="/cena-clandestina">
    Reserva tu cena clandestina aquí.
  </Link>
</p>
```

---

### 4. `/app/menu-degustacion/page.tsx`

**Sección: Hero o Introducción**
```typescript
// AGREGAR:
<p>
  Este es el menú que disfrutarás en nuestra{' '}
  <Link href="/cena-clandestina">
    cena clandestina
  </Link>
  .
</p>
```

**Sección: Final o "Aprende Más"**
```typescript
// AGREGAR LINK A BLOG:
<Link href="/blog">
  Descubre más sobre gastronomía y maridajes →
</Link>
```

---

### 5. `/app/blog/page.tsx` (Landing del Blog)

**Sección: Header o Introducción**
```typescript
// AGREGAR:
<p>
  Explora nuestro blog sobre gastronomía en Barcelona.
  ¿Buscas la experiencia perfecta?{' '}
  <Link href="/cena-clandestina">
    Prueba nuestras cenas exclusivas.
  </Link>
</p>
```

---

### 6. CADA POST DE BLOG (`/app/blog/[slug]/page.tsx`)

**Sección: CTA Relacionada (después del contenido)**
```typescript
// AGREGAR ANTES DEL FOOTER:
<div style={{ margin: "3rem 0", padding: "2rem", background: "var(--gs-bg2)" }}>
  <h3>¿Quieres vivir una experiencia como la de este artículo?</h3>
  <Link href="/cena-clandestina">
    Reserva tu cena clandestina ahora →
  </Link>
</div>
```

**Sección: Links a Posts Relacionados**
```typescript
// SI POST ES DE MICHELIN:
<Link href="/blog/menu-degustacion-barcelona">
  Lee también: Los mejores menús degustación →
</Link>

// SI POST ES DE REGALOS:
<Link href="/regalo">
  ¿Quieres regalar una experiencia?
</Link>

// SI POST ES GENERAL:
<Link href="/grupos">
  ¿Buscas algo para un grupo?
</Link>
```

---

## 🏗️ ESTRUCTURA DE LINK TYPES

### 1. **CTA Principal** (Conversión)
```
"Reserva Ahora" → /cena-clandestina
"Descubre Más" → /cena-clandestina
"Regala Ahora" → /regalo
```

### 2. **Cross-Sell** (Vender otro servicio)
```
"¿Buscas para grupos?" → /grupos
"Perfecto para regalar" → /regalo
"Descubre el menú" → /menu-degustacion
```

### 3. **Social Proof** (Credibilidad)
```
"Lee nuestro blog" → /blog
"Descubre nuestro menú" → /menu-degustacion
```

### 4. **Support** (Ayuda)
```
"Preguntas frecuentes" → /preguntas-frecuentes
"Política de cancelación" → /preguntas-frecuentes
```

---

## 📊 MATRIZ DE LINKS RECOMENDADOS

| De | A | Anchor Text | Tipo | Ubicación |
|----|----|-------------|------|-----------|
| Homepage | /cena-clandestina | Botón Hero | CTA | Hero section |
| /cena-clandestina | /grupos | "Para grupos" | Cross-sell | Sección grupos |
| /cena-clandestina | /regalo | "Regalar" | Cross-sell | FAQ |
| /cena-clandestina | /menu-degustacion | "Menú completo" | Info | Actos |
| /regalo | /cena-clandestina | "Conocer experiencia" | CTA | Hero |
| /regalo | /menu-degustacion | "Ver menú" | Info | Descripción |
| /grupos | /cena-clandestina | "Cena clandestina" | Info | Features |
| /menu-degustacion | /cena-clandestina | "Nuestra cena" | Info | Hero |
| /menu-degustacion | /blog | "Más sobre gastronomía" | Info | Footer |
| /blog | /cena-clandestina | CTA variado | CTA | Post footer |
| /preguntas-frecuentes | /cena-clandestina | "Reserva aquí" | CTA | FAQ |

---

## 🎨 ANCHOR TEXT STRATEGY

### DO ✅
- "Cena clandestina" (keyword exacto)
- "Menu degustación" (keyword exacto)
- "Experiencia gastronómica" (keyword relacionada)
- "Conocer la experiencia" (natural)
- "Descubre nuestro menú" (natural)

### DON'T ❌
- "Haz clic aquí" (genérico, malo para SEO)
- "Link" (genérico)
- Demasiados links con mismo anchor (sobreopimizar)

---

## ⚠️ REGLAS INTERLINKING

1. **Máximo 5 links por página**
   - Si pones 10+ links, Google ignora algunos
   - Prioriza los más importantes

2. **Links contextuales > Random links**
   - Link cuando tenga sentido en el contexto
   - No fuerces links donde no correspondan

3. **Diversifica anchor text**
   - No todos "Cena clandestina"
   - Mezcla: "nuestra cena", "experiencia", "reserva aquí"

4. **Link to deep pages, not just homepage**
   - `<Link href="/menu-degustacion">` ✅
   - `<Link href="/">` ❌ (overflow de homepage)

5. **Evita dead links**
   - Verifica que todas las rutas existan
   - Test en staging antes de deploy

---

## 🚀 PLAN DE EJECUCIÓN

### PASO 1: Completar `/cena-clandestina` (10 min)
- [ ] Agregar link a `/grupos`
- [ ] Agregar link a `/regalo`
- [ ] Agregar link a `/menu-degustacion`

### PASO 2: Completar `/regalo` (5 min)
- [ ] Agregar CTA a `/cena-clandestina`
- [ ] Agregar link a `/menu-degustacion`

### PASO 3: Completar `/grupos` (5 min)
- [ ] Agregar link a `/cena-clandestina`

### PASO 4: Completar `/menu-degustacion` (5 min)
- [ ] Agregar link a `/cena-clandestina`
- [ ] Agregar link a `/blog`

### PASO 5: Blog Pages (10 min)
- [ ] Agregar CTA en footer de posts
- [ ] Agregar links relacionados si aplica

**TOTAL: ~35 minutos**

---

## 📈 BENEFICIOS ESPERADOS

1. **SEO**
   - Google ve estructura clara
   - Distribución de autoridad (PageRank)
   - +3-5% en posiciones de búsqueda

2. **Conversiones**
   - Usuarios descubren más servicios
   - Cross-sell natural
   - +10-15% tasa de conversión

3. **UX**
   - Navegación más clara
   - Usuarios encuentran info relacionada
   - Menos bounces

---

## 🎯 SIGUIENTE PASO

¿Empezamos a implementar el interlinking?

**Plan:**
1. Actualizar `/cena-clandestina/page.tsx` (agregar 3 links)
2. Actualizar `/regalo/page.tsx` (agregar 2 links)
3. Actualizar `/grupos/page.tsx` (agregar 1 link)
4. Actualizar `/menu-degustacion/page.tsx` (agregar 2 links)
5. Actualizar posts de blog (agregar CTA)

¿Confirmas que proceda?

