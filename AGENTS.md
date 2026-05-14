# AGENTS.md — Mapa de navegación para agentes de IA en Gastroshows

> Este archivo es el **punto de entrada** para cualquier agente que trabaje en Gastroshows. Define el paradigma de **Harness Engineering** para garantizar seguridad, control y trazabilidad.

---

## 1. Antes de empezar (obligatorio)

1. Ejecuta `./verify.sh` y verifica que termina sin errores. Si falla, **para** y resuelve el entorno antes de tocar código.
2. Lee `progress/current.md` para entender el estado de la sesión activa.
3. Lee `feature_list.json` y elige **una** tarea con estado `pending`. No trabajes en más de una a la vez.

## 2. Mapa del repositorio

| Archivo / carpeta            | Qué contiene                                              | Cuándo leerlo |
|------------------------------|-----------------------------------------------------------|---------------|
| `feature_list.json`          | Lista de tareas con estado (pending / in_progress / done) | Al empezar cada tarea |
| `progress/current.md`        | Estado de la sesión actual (bitácora viva)                | Durante el trabajo |
| `progress/history.md`        | Historial de sesiones anteriores                          | Para contexto histórico |
| `docs/architecture.md`       | Estructura del Page Builder y la plataforma               | Antes de cambios estructurales |
| `docs/conventions.md`        | Reglas de TypeScript, CSS (Vanilla) y Estilo              | Antes de escribir código |
| `docs/verification.md`       | Protocolos de prueba y validación                         | Antes de cerrar una tarea |
| `CHECKPOINTS.md`             | Criterios de "Trabajo Terminado"                          | Para auto-evaluación |
| `app/`                       | Rutas de Next.js (App Router)                             | Para lógica de páginas/APIs |
| `components/`                | Componentes React (Atómicos y de Bloque)                  | Para el Page Builder |
| `lib/`                       | Utilidades, tipos y lógica de base de datos (Prisma)      | Para lógica de negocio |

## 3. Reglas de Oro (no negociables)

- **Una sola feature a la vez.** Mantén los commits limpios y atómicos.
- **Verificación Continua.** No cierres una tarea sin ejecutar `./verify.sh`.
- **Trazabilidad en Disco.** Documenta tus decisiones en `progress/current.md`. Si el chat se reinicia, el progreso vive en el repo.
- **Aesthetics First.** En el Page Builder, el diseño debe ser premium. No uses placeholders.

## 4. Lifecycle de una Tarea

1. **Plan**: Abre `feature_list.json`, cambia una tarea a `in_progress`. Anota el plan en `progress/current.md`.
2. **Implementación**: Realiza los cambios siguiendo `docs/conventions.md`.
3. **Revisión**: Auto-evalúa contra `CHECKPOINTS.md`.
4. **Cierre**: Ejecuta `./verify.sh`. Mueve el log de `current.md` a `history.md` y marca la tarea como `done`.

## 5. Si te bloqueas

- Relee la documentación en `docs/`.
- Si hay un error de entorno, repórtalo en `progress/current.md` y detente. No intentes "hacks" que degraden la calidad del arnés.
