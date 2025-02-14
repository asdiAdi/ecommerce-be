CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- for uuid

CREATE TABLE users (
    id uuid DEFAULT gen_random_uuid() primary key, -- v7 will come soon
    username VARCHAR(20) not null UNIQUE,
    password VARCHAR(255) not null,
    avatar VARCHAR(255),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE ,
    phone VARCHAR(20),
    birthdate date, -- mm/dd/yyyy
    created_at timestamptz,
    updated_at timestamptz
);

CREATE TABLE addresses (
    id uuid DEFAULT gen_random_uuid() primary key,
    user_id uuid REFERENCES users ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    description text,
    created_at timestamptz,
    updated_at timestamptz
);


CREATE TABLE categories (
    id uuid DEFAULT gen_random_uuid() primary key,
    parent_id uuid REFERENCES categories(id) ON DELETE CASCADE, -- null if parent, uuid if subcategory
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at timestamptz default current_timestamp,
    updated_at timestamptz default current_timestamp
)

-- create product table on the arrangement you want
CREATE TABLE products (
    asin VARCHAR(10) unique primary key,
    title text,
    description text,
    img_url VARCHAR(255),
    product_url VARCHAR(255),
    stars DECIMAL(2,1),
    reviews int,
    price DECIMAL(10,2),
    stock int, -- generate random
    is_best_seller bool,
    bought_in_last_month int,
    category_name VARCHAR(255), -- will be deleted
    category_id uuid references categories ON DELETE SET NULL,
    created_at timestamptz default current_timestamp,
    updated_at timestamptz default current_timestamp
);

-- ##### copy csv to local https://www.kaggle.com/datasets/asaniczka/amazon-uk-products-dataset-2023
-- \copy products(asin,title,img_url,product_url,stars,reviews,price,is_best_seller,bought_in_last_month,category_name) FROM 'downloads/amazon.csv' WITH (FORMAT csv, HEADER true, QUOTE '"')

-- generate random values on stock
UPDATE products
SET stock = FLOOR(RANDOM() * 101); -- random 0 to 100
WHERE stock IS NULL;

-- generate categories, also preventing duplicates
INSERT INTO categories(name)
SELECT DISTINCT category_name from products
WHERE category_name NOT IN (SELECT name from categories)

-- set the category_id into products by comparing the name from categories
UPDATE products p
SET category_id = c.id
FROM categories c
WHERE p.category_name = c.name;

-- can delete category_name on products now
ALTER TABLE products DROP COLUMN category_name;

-- delete auto generation on subsequent, let the orm handle it
ALTER TABLE products ALTER created_at DROP default;
ALTER TABLE products ALTER updated_at DROP default;
ALTER TABLE categories ALTER created_at DROP default;
ALTER TABLE categories ALTER updated_at DROP default;

-- display max length and their value
SELECT title, length(title) as name_length from amazon
where length(title) = (select max(length(title)) from amazon)