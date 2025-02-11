CREATE TABLE amazon (
    asin VARCHAR(10) primary key,
    title text,
    img_url VARCHAR(255),
    product_url VARCHAR(255),
    stars DECIMAL(2,1),
    reviews int,
    price DECIMAL(10,2),
    is_best_seller bool,
    bought_in_last_month int,
    category_name VARCHAR(255)
);

-- ##### copy csv to local https://www.kaggle.com/datasets/asaniczka/amazon-uk-products-dataset-2023
-- \copy amazon FROM 'downloads/amazon.csv' WITH (FORMAT csv, HEADER true, QUOTE '"')

-- auto generate timestamp
ALTER TABLE amazon ADD description text;
ALTER TABLE amazon ADD created_at timestamptz default current_timestamp;
ALTER TABLE amazon ADD updated_at timestamptz default current_timestamp;

-- delete auto generation on subsequent, let the orm handle it
ALTER TABLE amazon ALTER created_at DROP default;
ALTER TABLE amazon ALTER updated_at DROP default;

-- if I want to rearrange columns,
-- create new table with same data types but rearranged columns
-- copy all to it
CREATE TABLE products (
    asin VARCHAR(10) primary key,
    title text,
    description text,
    img_url VARCHAR(255),
    product_url VARCHAR(255),
    stars DECIMAL(2,1),
    reviews int,
    price DECIMAL(10,2),
    is_best_seller bool,
    bought_in_last_month int,
    category_name VARCHAR(255),
    created_at timestamptz,
    updated_at timestamptz
);

-- copy from old to new table (requires equal schema)
INSERT INTO products
SELECT
    asin,
    title,
    description,
    img_url,
    product_url,
    stars,
    reviews,
    price,
    is_best_seller,
    bought_in_last_month,
    category_name,
    created_at,
    updated_at
FROM amazon;


