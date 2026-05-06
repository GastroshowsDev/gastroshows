-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'LIVE');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('NOON', 'NIGHT');

-- CreateEnum
CREATE TYPE "ReservationType" AS ENUM ('NORMAL', 'GIFT', 'VISIT');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CANCELLED', 'PAYMENT_FAILED');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('OPEN', 'FULL', 'CLOSED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD');

-- CreateEnum
CREATE TYPE "EmailQueueStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "BackupStatus" AS ENUM ('RUNNING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('PARTICULAR', 'EMPRESA');

-- CreateEnum
CREATE TYPE "TableType" AS ENUM ('TABLE', 'DECORATIVE');

-- CreateEnum
CREATE TYPE "TableShape" AS ENUM ('RECTANGLE', 'ROUND', 'SQUARE');

-- CreateEnum
CREATE TYPE "BookingIntentStatus" AS ENUM ('AWAITING_PAYMENT', 'PAYMENT_FAILED', 'COMPLETED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PARTIAL', 'COMPLETED', 'GIFT');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "customerType" "CustomerType" NOT NULL DEFAULT 'PARTICULAR',
    "cif" TEXT,
    "billingStreet" TEXT,
    "billingZip" TEXT,
    "billingCity" TEXT,
    "allergies" TEXT,
    "previousVisit" BOOLEAN NOT NULL DEFAULT false,
    "newsletter" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "rules" JSONB NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "shift" "Shift" NOT NULL,
    "venueId" TEXT,
    "totalGuests" INTEGER NOT NULL DEFAULT 0,
    "status" "EventStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "type" "ReservationType" NOT NULL,
    "customerId" TEXT NOT NULL,
    "eventId" TEXT,
    "venueId" TEXT,
    "guests" INTEGER NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "paidAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PARTIAL',
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "groupRef" TEXT,
    "mergedGroupId" TEXT,
    "isFirstVisit" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitDate" TIMESTAMP(3),
    "visitTime" TEXT,
    "source" TEXT,
    "comments" TEXT,
    "turitopId" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftVoucher" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "purchaserCustomerId" TEXT NOT NULL,
    "recipientEmail" TEXT,
    "guests" INTEGER NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "redeemedAt" TIMESTAMP(3),
    "reservationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "sendDate" TIMESTAMP(3),

    CONSTRAINT "GiftVoucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentSplit" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentSplit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailQueue" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "templateKey" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "sentAt" TIMESTAMP(3),
    "status" "EmailQueueStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" TEXT NOT NULL,
    "venueId" TEXT,
    "templateKey" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'LIVE',
    "defaultVenue" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Backup" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "triggeredBy" TEXT NOT NULL,
    "status" "BackupStatus" NOT NULL DEFAULT 'RUNNING',
    "sizeBytes" INTEGER,
    "rowCount" INTEGER,
    "data" JSONB,
    "error" TEXT,

    CONSTRAINT "Backup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeoSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "siteTitle" TEXT NOT NULL DEFAULT 'GastroShows · Barcelona',
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "twitterCard" TEXT NOT NULL DEFAULT 'summary_large_image',
    "twitterHandle" TEXT,
    "canonicalUrl" TEXT,
    "robots" TEXT NOT NULL DEFAULT 'index, follow',
    "googleSiteVerification" TEXT,
    "bingSiteVerification" TEXT,
    "googleAnalyticsId" TEXT,
    "googleTagManagerId" TEXT,
    "metaPixelId" TEXT,
    "tiktokPixelId" TEXT,
    "linkedinPartnerId" TEXT,
    "hotjarId" TEXT,
    "googleAdsId" TEXT,
    "googleAdsLabel" TEXT,
    "customHeadScripts" TEXT,
    "customBodyScripts" TEXT,
    "schemaOrg" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeoSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingContent" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'TEXT',
    "label" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandingContent_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "discountPct" DECIMAL(5,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "steps" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowExecution" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'RUNNING',
    "nextStepAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDesc" TEXT,
    "ogImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageBlock" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" JSONB NOT NULL DEFAULT '{}',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redirect" (
    "id" TEXT NOT NULL,
    "fromPath" TEXT NOT NULL,
    "toPath" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL DEFAULT 301,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Redirect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "pin" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeLog" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "clockIn" TIMESTAMP(3) NOT NULL,
    "clockOut" TIMESTAMP(3),
    "autoClockedOut" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holiday" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recurring" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Holiday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionConfig" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "wedThuActive" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromotionConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "type" "TableType" NOT NULL DEFAULT 'TABLE',
    "shape" "TableShape" NOT NULL DEFAULT 'RECTANGLE',
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "rotation" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "capacity" INTEGER NOT NULL,
    "isFixed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableAssignment" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "TableAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "BookingIntent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "allergies" TEXT,
    "previousVisit" BOOLEAN NOT NULL DEFAULT false,
    "newsletter" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,
    "groupRef" TEXT,
    "isFirstVisit" BOOLEAN NOT NULL DEFAULT true,
    "date" TIMESTAMP(3) NOT NULL,
    "shift" "Shift" NOT NULL,
    "guests" INTEGER NOT NULL,
    "eventId" TEXT,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "amountDue" DECIMAL(10,2) NOT NULL,
    "payFull" BOOLEAN NOT NULL DEFAULT false,
    "orderId" TEXT,
    "status" "BookingIntentStatus" NOT NULL DEFAULT 'AWAITING_PAYMENT',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistantChat" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sources" TEXT,
    "helpful" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssistantChat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Customer_email_idx" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Customer_createdAt_idx" ON "Customer"("createdAt");

-- CreateIndex
CREATE INDEX "Customer_customerType_idx" ON "Customer"("customerType");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_name_key" ON "Venue"("name");

-- CreateIndex
CREATE INDEX "Event_venueId_idx" ON "Event"("venueId");

-- CreateIndex
CREATE INDEX "Event_status_date_idx" ON "Event"("status", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Event_date_shift_key" ON "Event"("date", "shift");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_turitopId_key" ON "Reservation"("turitopId");

-- CreateIndex
CREATE INDEX "Reservation_eventId_status_idx" ON "Reservation"("eventId", "status");

-- CreateIndex
CREATE INDEX "Reservation_venueId_createdAt_idx" ON "Reservation"("venueId", "createdAt");

-- CreateIndex
CREATE INDEX "Reservation_groupRef_idx" ON "Reservation"("groupRef");

-- CreateIndex
CREATE INDEX "Reservation_mergedGroupId_idx" ON "Reservation"("mergedGroupId");

-- CreateIndex
CREATE INDEX "Reservation_visitDate_idx" ON "Reservation"("visitDate");

-- CreateIndex
CREATE UNIQUE INDEX "GiftVoucher_token_key" ON "GiftVoucher"("token");

-- CreateIndex
CREATE UNIQUE INDEX "GiftVoucher_reservationId_key" ON "GiftVoucher"("reservationId");

-- CreateIndex
CREATE INDEX "GiftVoucher_expiresAt_idx" ON "GiftVoucher"("expiresAt");

-- CreateIndex
CREATE INDEX "GiftVoucher_redeemedAt_idx" ON "GiftVoucher"("redeemedAt");

-- CreateIndex
CREATE INDEX "PaymentSplit_reservationId_paidAt_idx" ON "PaymentSplit"("reservationId", "paidAt");

-- CreateIndex
CREATE INDEX "EmailQueue_status_scheduledAt_idx" ON "EmailQueue"("status", "scheduledAt");

-- CreateIndex
CREATE INDEX "EmailQueue_reservationId_status_idx" ON "EmailQueue"("reservationId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "EmailTemplate_templateKey_key" ON "EmailTemplate"("templateKey");

-- CreateIndex
CREATE INDEX "EmailTemplate_venueId_idx" ON "EmailTemplate"("venueId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_token_idx" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_email_idx" ON "PasswordResetToken"("email");

-- CreateIndex
CREATE INDEX "Backup_createdAt_idx" ON "Backup"("createdAt");

-- CreateIndex
CREATE INDEX "LandingContent_section_order_idx" ON "LandingContent"("section", "order");

-- CreateIndex
CREATE INDEX "Campaign_active_startDate_endDate_idx" ON "Campaign"("active", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "WorkflowExecution_status_nextStepAt_idx" ON "WorkflowExecution"("status", "nextStepAt");

-- CreateIndex
CREATE INDEX "WorkflowExecution_reservationId_idx" ON "WorkflowExecution"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "PageBlock_pageId_order_idx" ON "PageBlock"("pageId", "order");

-- CreateIndex
CREATE INDEX "MediaAsset_createdAt_idx" ON "MediaAsset"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Redirect_fromPath_key" ON "Redirect"("fromPath");

-- CreateIndex
CREATE INDEX "Redirect_fromPath_idx" ON "Redirect"("fromPath");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_pin_key" ON "Employee"("pin");

-- CreateIndex
CREATE INDEX "Employee_pin_idx" ON "Employee"("pin");

-- CreateIndex
CREATE INDEX "TimeLog_employeeId_clockIn_idx" ON "TimeLog"("employeeId", "clockIn");

-- CreateIndex
CREATE UNIQUE INDEX "Holiday_date_key" ON "Holiday"("date");

-- CreateIndex
CREATE UNIQUE INDEX "TableAssignment_tableId_reservationId_eventId_key" ON "TableAssignment"("tableId", "reservationId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingIntent_orderId_key" ON "BookingIntent"("orderId");

-- CreateIndex
CREATE INDEX "BookingIntent_status_expiresAt_idx" ON "BookingIntent"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "BookingIntent_orderId_idx" ON "BookingIntent"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeArticle_title_key" ON "KnowledgeArticle"("title");

-- CreateIndex
CREATE INDEX "KnowledgeArticle_category_idx" ON "KnowledgeArticle"("category");

-- CreateIndex
CREATE INDEX "KnowledgeArticle_active_idx" ON "KnowledgeArticle"("active");

-- CreateIndex
CREATE INDEX "AssistantChat_userId_idx" ON "AssistantChat"("userId");

-- CreateIndex
CREATE INDEX "AssistantChat_createdAt_idx" ON "AssistantChat"("createdAt");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftVoucher" ADD CONSTRAINT "GiftVoucher_purchaserCustomerId_fkey" FOREIGN KEY ("purchaserCustomerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftVoucher" ADD CONSTRAINT "GiftVoucher_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSplit" ADD CONSTRAINT "PaymentSplit_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailQueue" ADD CONSTRAINT "EmailQueue_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTemplate" ADD CONSTRAINT "EmailTemplate_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowExecution" ADD CONSTRAINT "WorkflowExecution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowExecution" ADD CONSTRAINT "WorkflowExecution_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageBlock" ADD CONSTRAINT "PageBlock_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeLog" ADD CONSTRAINT "TimeLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableAssignment" ADD CONSTRAINT "TableAssignment_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableAssignment" ADD CONSTRAINT "TableAssignment_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
