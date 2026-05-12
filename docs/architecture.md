# Arquitectura de Gastroshows

## 1. Stack Tecnológico
- **Framework**: Next.js 16.2 (App Router).
- **Base de Datos**: PostgreSQL vía Supabase.
- **ORM**: Prisma.
- **Estilos**: Vanilla CSS con variables CSS globales para el tema (Gastroshows Design System).
- **Page Builder**: Motor propio basado en `@dnd-kit/sortable`.

## 2. El Page Builder Atómico
El sistema se basa en una jerarquía de tres niveles:
1. **Bloques (BlockData)**: Contenedores principales (Sección, Header, Footer).
2. **Columnas**: Sub-contenedores dentro de los bloques que definen el layout.
3. **Elementos (ElementData)**: Átomos de contenido (Título, Texto, Imagen, Botón, Widgets).

### Identidad de los Elementos
Cada elemento **debe** poseer un `id` persistente generado en el momento de su creación. Este ID es la clave para el sistema de arrastre y para la edición de propiedades sin perder el foco.

## 3. Lógica de Persistencia
Los cambios se guardan de forma atómica en el endpoint `/api/admin/pages/[id]/save`. Antes de guardar, se realiza una sanitización recursiva de IDs para asegurar que no falte ninguno.
