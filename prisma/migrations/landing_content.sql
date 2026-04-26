-- Run this in Supabase SQL Editor for new instances
-- Creates the LandingContent table for the CMS

CREATE TABLE IF NOT EXISTS "LandingContent" (
  "key"       TEXT PRIMARY KEY,
  "value"     TEXT NOT NULL DEFAULT '',
  "type"      TEXT NOT NULL DEFAULT 'TEXT',
  "label"     TEXT NOT NULL DEFAULT '',
  "section"   TEXT NOT NULL DEFAULT '',
  "order"     INTEGER NOT NULL DEFAULT 0,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "LandingContent_section_order_idx"
  ON "LandingContent" ("section", "order");

-- After creating the table, go to /admin/web in the admin panel
-- and click "Inicializar BD" to populate with default values.
-- The site works correctly even with an empty table (falls back to hardcoded defaults).
