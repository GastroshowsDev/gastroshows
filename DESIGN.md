# GastroShows · Design System

Referencia visual: propuesta Emporio Armani Barcelona (09/09/2025)
Principio rector: **estética monocroma negro/blanco con geometrías limpias**

---

## 1. Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--gs-black` | `#050505` | Fondo base, backgrounds principales |
| `--gs-black2` | `#0A0A0A` | Fondo cards, secciones alternadas |
| `--gs-black3` | `#111111` | Fondo footer, bordes interiores |
| `--gs-white` | `#F5F0E8` | Texto principal (off-white cálido) |
| `--gs-white-sub` | `rgba(245,240,232,0.55)` | Texto secundario, descripciones |
| `--gs-white-muted` | `rgba(245,240,232,0.35)` | Texto terciario, metadatos |
| `--gs-gold` | `#C8A96E` | Acento principal (dorado envejecido) |
| `--gs-gold-bright` | `#DAA520` | Hover, CTA primario activo |
| `--gs-gold-subtle` | `rgba(200,169,110,0.12)` | Fondos de tarjetas con acento |
| `--gs-border` | `rgba(200,169,110,0.1)` | Bordes y separadores |
| `--gs-border-strong` | `rgba(200,169,110,0.25)` | Bordes hover |

**Regla clave:** nunca usar blanco puro (`#FFFFFF`) ni negro puro (`#000000`).
El dorado es acento, no fondo. Nunca más del 20% de la pantalla en dorado.

---

## 2. Tipografía

### Tipografía serif — Títulos y display
```
font-family: Cormorant Garamond, Georgia, serif
```
- H1: `font-size: clamp(3.5rem, 8vw, 7rem)` · `font-weight: 300` · `line-height: 0.95`
- H2: `font-size: clamp(2rem, 4vw, 3.5rem)` · `font-weight: 300` · `line-height: 1.1`
- H3: `font-size: clamp(1.4rem, 2.5vw, 2rem)` · `font-weight: 300`
- Citas / display: `font-style: italic` · color dorado o blanco
- Numerales decorativos: `font-size: 4-6rem` · `opacity: 0.15-0.25`

### Tipografía sans — UI y etiquetas
```
font-family: Montserrat, system-ui, sans-serif
```
- Etiquetas/tags: `font-size: 0.58-0.65rem` · `letter-spacing: 0.3-0.5em` · `text-transform: uppercase` · `font-weight: 500`
- Cuerpo/párrafo: `font-size: 0.875-0.95rem` · `line-height: 1.8` · `font-weight: 300`
- Botones: `font-size: 0.65-0.75rem` · `letter-spacing: 0.15em` · `font-weight: 600-700`
- Precio/datos: `font-size: 0.8rem` · `font-weight: 400`

---

## 3. Espaciado y ritmo vertical

- Sección grande (hero, showcase): `padding: 8-10rem 2rem`
- Sección media (contenido): `padding: 5-6rem 2rem`
- Sección pequeña (banners, CTAs): `padding: 3-4rem 2rem`
- Max-width contenido texto: `720px`
- Max-width layout completo: `1100px`
- Gap entre elementos de grid: `0` (sin gaps en grids de imágenes) o `4px` (microespacio)
- Gap entre elementos de lista: `1-1.5rem`

---

## 4. Layout y grid

### Principio Armani: **geometrías limpias, colocación en línea recta**
- Siempre grid de 2 columnas para imagen+texto (50/50 o 55/45)
- Nunca 3 columnas de igual peso en mobile
- Imagen siempre a sangre (sin padding, sin border-radius)
- Texto alineado al centro verticalmente en su columna
- Alternar imagen izquierda/derecha en listas de items

### Grids de imágenes
```
display: grid;
grid-template-columns: repeat(3, 1fr); /* galería */
gap: 4px; /* microespacio, no gap grande */
```

---

## 5. Componentes

### Navegación (SiteNav)
```
position: fixed
height: 60px
background: rgba(5,5,5,0.95)
backdrop-filter: blur(12px)
border-bottom: 1px solid rgba(200,169,110,0.08)
```
- Logo: Cormorant Garamond, 1.4rem, peso 300, color dorado
- Links: Montserrat, 0.65rem, uppercase, letter-spacing 0.12em, color rgba(245,240,232,0.55)
- Link activo: color dorado
- Botón Regalar: borde dorado sutil, texto dorado
- Botón Reservar: fondo dorado, texto negro
- Selector idiomas: ES | CA | EN, separados por |, tamaño muy pequeño

### Hero sections
- Altura: `100vh` (portada) o `60-85vh` (subpáginas)
- Imagen de fondo: `objectFit: cover`, sin `opacity` en la imagen
- Overlay: solo degradado abajo `linear-gradient(to bottom, rgba(5,5,5,0.2), rgba(5,5,5,0.85))`
- Texto siempre abajo centrado (bottom-aligned)
- Línea decorativa dorada (1px) antes/después de secciones de texto puro

### Cards de restaurante / ítem
```
display: grid
grid-template-columns: 1fr 1fr
height imagen: 520px (fija, para fill)
padding texto: 3.5rem 3rem
```
- Número decorativo: Cormorant, grande, dorado con opacity 0.2
- Sin border-radius nunca
- Border: 1px solid rgba(200,169,110,0.1)

### Botones
```css
/* Primario */
background: #C8A96E
color: #050505
padding: 0.9rem 2.5rem
font-family: Montserrat
font-size: 0.72rem
font-weight: 700
letter-spacing: 0.15em
text-transform: uppercase
border: none

/* Secundario */
background: transparent
border: 1px solid rgba(200,169,110,0.4)
color: #C8A96E
/* mismo padding y tipografía */
```

### Separadores decorativos
```jsx
/* Línea vertical dorada */
<div style={{ width: "1px", height: "60-80px", 
  background: "linear-gradient(to bottom, transparent, #C8A96E)" }} />

/* Línea horizontal */
<div style={{ width: "40px", height: "1px", background: "#C8A96E" }} />

/* Tag/etiqueta */
font-size: 0.6rem · letter-spacing: 0.4em · uppercase · color: dorado
```

### Badges en imágenes
```
position: absolute, top: 1.5rem, left: 1.5rem
background: --gs-gold
color: #050505
padding: 0.35rem 1rem
font-size: 0.58rem · uppercase · letter-spacing: 0.12em · font-weight: 700
```

---

## 6. Imágenes

**Regla principal (Emporio Armani):** las imágenes se ven, no se tapan.
- **Nunca** `opacity` en la imagen misma
- Overlays solo en los bordes (degradado top/bottom) cuando hay texto encima
- Overlay máximo en zona de texto: `rgba(5,5,5,0.7)`
- Usar `objectFit: cover` + `objectPosition: center` siempre
- Contenedor con `height` fija y `position: relative` + `overflow: hidden`
- Imágenes propias GastroShows en carpeta `/public/images/experiencia/`

### Imágenes disponibles (propias)
| Archivo | Uso recomendado |
|---|---|
| `ambiente.jpg` | Hero cena clandestina (sala vacía, candelabros) |
| `mesa-cena-clandestina.jpg` | Sección de ambiente/comensales |
| `chef-preparando.jpg` | Sección cocina/proceso |
| `plato-oscuro.jpg` | Showcase de plato (fondo negro total) |
| `plato-humo.jpg` | Efecto dramático, mesa del chef |
| `postre-bola-nieve.jpg` | Postres, dulces |
| `coctel-bienvenida.webp` | Sección cóctel/maridaje |
| `plato-principal.jpg` | Plato principal arroz |

---

## 7. Voz y tono (copy)

Basado en el estilo de la web y la propuesta Emporio Armani:
- **Frases cortas**. Nunca párrafos de más de 3 líneas.
- **Puntos suspensivos** para crear tensión: "No sabes dónde vas..."
- **Números romanos** para los actos del menú (I, II, III...)
- **Mayúsculas** en las etiquetas de sección (siempre)
- **Comillas tipográficas** para citas: "Una noche que empieza antes de llegar."
- Sin exclamaciones. Misterio ≠ entusiasmo.
- Distancia elegante. No informal, no frío.

---

## 8. Principios de diseño (extraídos del brief Armani)

1. **Monocromía** — negro/blanco son los protagonistas. El dorado es un susurro, no un grito.
2. **Geometría limpia** — sin curvas, sin border-radius, todo recto y alineado.
3. **Un elemento por sección** — no saturar. Bandejas no saturadas, colocación en línea recta.
4. **Bocados one bite** — en diseño: secciones que se leen de un vistazo.
5. **Discreción** — sin logos de catering visibles, sin elementos decorativos innecesarios.
6. **Ritmo constante** — el scroll debe sentirse fluido, las secciones con cadencia.
7. **Fondo negro = misterio** — el negro no es ausencia, es presencia.

---

## 9. Lo que NO hacer

- ❌ `border-radius` (nunca, en ningún elemento)
- ❌ `opacity` en imágenes (solo overlays)
- ❌ Gradientes de colores (solo negro a negro/transparente o dorado a transparente)
- ❌ Sombras grandes o coloridas (`box-shadow` solo si es muy sutil)
- ❌ Fondos blancos o grises claros en la web pública
- ❌ Más de 2 pesos tipográficos por página
- ❌ CTAs de colores que no sean dorado o transparente/borde dorado
- ❌ Imágenes con texto superpuesto sin overlay correcta
- ❌ Grid de más de 3 columnas
- ❌ Animaciones o transiciones largas (máximo 0.2-0.3s)
- ❌ Iconos decorativos (solo si son absolutamente necesarios)

---

## 10. Checklist antes de publicar una página

- [ ] ¿El fondo es negro (#050505)?
- [ ] ¿Las imágenes se ven nítidas (sin opacity)?
- [ ] ¿Los textos tienen letra-spacing en las etiquetas?
- [ ] ¿El H1 usa Cormorant Garamond en peso 300?
- [ ] ¿Los botones siguen el sistema (dorado/borde dorado)?
- [ ] ¿Hay una etiqueta en mayúsculas + letra-spacing antes de cada H2?
- [ ] ¿Los números de posición son grandes, dorados y con opacity baja?
- [ ] ¿La página tiene una CTA clara de Reservar y/o Regalar?
- [ ] ¿Los links internos están en dorado subrayado?
- [ ] ¿Hay al menos una imagen a sangre (sin padding)?
