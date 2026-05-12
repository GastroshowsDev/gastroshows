# verify.ps1 — Script de validación para Gastroshows

Write-Host "--- Iniciando Verificación de Gastroshows ---" -ForegroundColor Cyan

# 1. Verificar dependencias y entorno
Write-Host "[1/4] Verificando entorno..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "❌ Error: node_modules no encontrado. Ejecuta 'npm install'." -ForegroundColor Red
    exit 1
}

# 2. Verificar Prisma
Write-Host "[2/4] Verificando Prisma Schema..." -ForegroundColor Yellow
npx prisma validate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Esquema de Prisma inválido." -ForegroundColor Red
    exit 1
}

# 3. Verificar Typescript y Build
Write-Host "[3/4] Ejecutando Build (TypeScript check)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: El Build ha fallado. Revisa los errores de TypeScript." -ForegroundColor Red
    exit 1
}

# 4. Verificar feature_list.json
Write-Host "[4/4] Verificando estado de tareas..." -ForegroundColor Yellow
$features = Get-Content "feature_list.json" | ConvertFrom-Json
$inProgress = $features | Where-Object { $_.status -eq "in_progress" }

if ($inProgress.Count -gt 1) {
    Write-Host "⚠️ Advertencia: Hay más de una tarea en 'in_progress'. El paradigma Harness recomienda trabajar en una sola." -ForegroundColor Cyan
}

Write-Host "`n✅ ¡Entorno validado correctamente! Puedes proceder con seguridad." -ForegroundColor Green
