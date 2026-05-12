# Protocolos de Verificación

Para asegurar que Gastroshows se mantiene estable, cada cambio debe pasar por este proceso:

## 1. Verificación Automática
Ejecutar el script de validación:
```powershell
./verify.ps1
```
Este script valida el esquema de Prisma y realiza un `npm run build` completo para detectar errores de tipado.

## 2. Verificación Visual
- **Cross-Browser**: Verificar que los cambios se vean bien en Chrome, Safari y Firefox.
- **Responsividad**: Probar en los modos "Escritorio" y "Móvil" del Page Builder.
- **D&D Integrity**: Arrastrar el elemento modificado a una columna diferente para confirmar que no pierde estado ni se rompe.

## 3. Auditoría de Datos
- Al guardar, verificar en la consola que el objeto enviado al API `/save` contiene la estructura correcta y todos los IDs necesarios.
