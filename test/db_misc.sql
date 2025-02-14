-- list all indexes on products table
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'products'

-- delete index (you can't update index, just delete and make a new one)
DROP INDEX IF EXISTS idx_title

-- install extension for indexing wildcard searches,
-- see also: using tsvector for Full-Text Search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- create index
CREATE INDEX idx_title ON public.products USING GIN (title gin_trgm_ops)