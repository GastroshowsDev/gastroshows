-- Migration: Add AGENCIA to CustomerType enum
-- Run this manually in Supabase SQL editor

ALTER TYPE "CustomerType" ADD VALUE 'AGENCIA';
