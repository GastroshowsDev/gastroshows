-- Migration: Add CustomerType enum and billing fields to Customer
-- Run this manually in Supabase SQL editor

CREATE TYPE "CustomerType" AS ENUM ('PARTICULAR', 'EMPRESA');

ALTER TABLE "Customer"
  ADD COLUMN IF NOT EXISTS "customerType"  "CustomerType" NOT NULL DEFAULT 'PARTICULAR',
  ADD COLUMN IF NOT EXISTS "cif"           TEXT,
  ADD COLUMN IF NOT EXISTS "billingStreet" TEXT,
  ADD COLUMN IF NOT EXISTS "billingZip"    TEXT,
  ADD COLUMN IF NOT EXISTS "billingCity"   TEXT;

CREATE INDEX IF NOT EXISTS "Customer_customerType_idx" ON "Customer"("customerType");
