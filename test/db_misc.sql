-- list all indexes on products table
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'products'

-- delete index (you can't update index, just delete and make a new one)
DROP INDEX IF EXISTS idx_title

-- install extension for indexing wildcard searches,
-- see also: using tsvector for Full-Text Search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- create index for searching
CREATE INDEX idx_products_title ON products USING GIN (title gin_trgm_ops)

-- create index for created_at
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_products_stars ON products(stars);
CREATE INDEX idx_products_reviews ON products(reviews);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_stock ON products(stock);
CREATE INDEX idx_products_bought_in_last_month ON products(bought_in_last_month);

