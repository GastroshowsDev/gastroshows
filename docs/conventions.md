# Convenciones de Desarrollo

## 1. Nomenclatura
- **Componentes**: PascalCase (`PageBuilderEditor.tsx`).
- **Hooks**: camelCase con prefijo use (`usePageSync.ts`).
- **APIs**: kebab-case para rutas (`/api/admin/page-settings`).

## 2. Tipado (TypeScript)
- Se prohíbe el uso de `any` en componentes nuevos.
- Todas las props deben estar interfaces o tipos exportados.
- Los tipos de los bloques y elementos residen en `lib/blocks/types.ts`.

## 3. Estilos y Diseño
- Usar **Vanilla CSS**. No introducir Tailwind a menos que se solicite explícitamente.
- Priorizar el uso de variables CSS globales (`--gs-gold`, `--gs-bg`, etc.).
- Las animaciones deben ser sutiles y elegantes, usando `framer-motion` o transiciones nativas.

## 4. Gestión de Estado
- Usar `useState` y `useEffect` para estados locales.
- El estado global de la página se centraliza en `PageBuilderEditor.tsx` y se comunica mediante props para mantener la pureza de los componentes de renderizado.
