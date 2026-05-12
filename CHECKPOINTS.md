# CHECKPOINTS.md — Criterios de Calidad de Gastroshows

Este archivo define qué significa que una tarea está "Terminada" (Definition of Done) en este proyecto.

---

## 1. Page Builder (General)
- [ ] **Estabilidad de IDs**: Todo elemento nuevo o importado debe tener un ID único y persistente.
- [ ] **Movilidad**: El elemento debe ser arrastrable a través de cualquier columna o bloque.
- [ ] **Handle Uniforme**: El tirador `⠿` debe ser visible y funcional al seleccionar el elemento.
- [ ] **Edición Inline**: Los textos y configuraciones básicas deben ser editables "in-context" sin depender exclusivamente del panel lateral.

## 2. Estética y UX
- [ ] **Premium Design**: Colores armónicos (Gastroshows Palette), tipografía cuidada (Cormorant/Inter) y espaciados consistentes.
- [ ] **Responsividad**: El diseño debe verse perfecto en móviles (Mobile-First) y escritorio.
- [ ] **Micro-animaciones**: Uso de `framer-motion` o CSS transitions para suavizar la experiencia.

## 3. Código y Arquitectura
- [ ] **TypeScript**: Cero `any` (a menos que sea estrictamente necesario por migración legacy). Tipado fuerte en props.
- [ ] **Atomicidad**: Los componentes deben ser pequeños, reutilizables y sin lógica de negocio pesada (usar hooks o lib).
- [ ] **Prisma & DB**: Esquemas migrados y tipos sincronizados.
- [ ] **Performance**: Carga de imágenes optimizada y mínimo de re-renders innecesarios.

## 4. Verificación y Entrega
- [ ] **Build Check**: `npm run build` termina sin errores.
- [ ] **Trazabilidad**: Log de la sesión registrado en `progress/history.md`.
- [ ] **Limpieza**: Eliminación de `console.log`, comentarios de debug y archivos temporales.
