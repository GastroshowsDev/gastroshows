-- Feature #13 (TPV sala): catálogo común, comandas por comensal,
-- cierre de caja preparado (CashSession) y link Employee ↔ User (PIN de sesión).
-- Aplicar en deploy con `prisma migrate deploy` (la DIRECT_URL no es
-- alcanzable desde todos los entornos).

-- Enums
CREATE TYPE "PosOrderStatus" AS ENUM ('OPEN', 'CLOSED', 'CANCELLED');
CREATE TYPE "CashSessionStatus" AS ENUM ('OPEN', 'CLOSED');

-- Catálogo
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ProductCategory_name_key" ON "ProductCategory"("name");

CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Product_categoryId_order_idx" ON "Product"("categoryId", "order");
CREATE INDEX "Product_active_idx" ON "Product"("active");
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Comandas por comensal (unidad = reserva; mesa compartida no usa TableAssignment)
CREATE TABLE "PosOrder" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "eventId" TEXT,
    "reservationId" TEXT,
    "dinerName" TEXT NOT NULL,
    "status" "PosOrderStatus" NOT NULL DEFAULT 'OPEN',
    "openedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PosOrder_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PosOrder_venueId_status_idx" ON "PosOrder"("venueId", "status");
CREATE INDEX "PosOrder_reservationId_idx" ON "PosOrder"("reservationId");
CREATE INDEX "PosOrder_eventId_idx" ON "PosOrder"("eventId");
ALTER TABLE "PosOrder" ADD CONSTRAINT "PosOrder_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PosOrder" ADD CONSTRAINT "PosOrder_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PosOrder" ADD CONSTRAINT "PosOrder_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PosOrder" ADD CONSTRAINT "PosOrder_openedById_fkey" FOREIGN KEY ("openedById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "PosOrderLine" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "productName" TEXT NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PosOrderLine_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PosOrderLine_orderId_idx" ON "PosOrderLine"("orderId");
ALTER TABLE "PosOrderLine" ADD CONSTRAINT "PosOrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PosOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PosOrderLine" ADD CONSTRAINT "PosOrderLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Cierre de caja (preparado; sin UI en fase 1-2)
CREATE TABLE "CashSession" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "employeeId" TEXT,
    "status" "CashSessionStatus" NOT NULL DEFAULT 'OPEN',
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "expectedTotal" DECIMAL(10,2),
    "actualTotal" DECIMAL(10,2),
    "notes" TEXT,
    CONSTRAINT "CashSession_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "CashSession_venueId_status_idx" ON "CashSession"("venueId", "status");
ALTER TABLE "CashSession" ADD CONSTRAINT "CashSession_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CashSession" ADD CONSTRAINT "CashSession_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Link Employee ↔ User (el PIN del empleado = código de sesión TPV del usuario)
ALTER TABLE "Employee" ADD COLUMN "userId" TEXT;
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
