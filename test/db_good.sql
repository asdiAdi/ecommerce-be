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

-- TODO: add type (business/home address), isDefault
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


-- Orders and Cart
CREATE TABLE carts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id  uuid UNIQUE,
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
    cart_id uuid NOT NULL,
    product_asin VARCHAR(10) UNIQUE NOT NULL,
    quantity INTEGER NOT NULL,
    created_at timestamptz,
    updated_at timestamptz,
    PRIMARY KEY (cart_id, product_asin),
    CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    CONSTRAINT fk_product_asin FOREIGN KEY (product_asin) REFERENCES products(asin) ON DELETE CASCADE,
    CONSTRAINT chk_quantity CHECK (quantity > 0) -- add checking on nest to throw an error when quantity is zero
);


CREATE TABLE wishlists (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid,
    product_asin VARCHAR(10) UNIQUE NOT NULL,
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_product_asin FOREIGN KEY (product_asin) REFERENCES products(asin) ON DELETE CASCADE
);

-- one to many with users
CREATE TABLE orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at timestamptz, -- also means order_date
    updated_at timestamptz,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    order_id uuid NOT NULL,
    product_asin VARCHAR(10) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL, -- Price at the time of purchase
    PRIMARY KEY (order_id, product_asin),
    CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_product_asin FOREIGN KEY (product_asin) REFERENCES products(asin) ON DELETE CASCADE,
    CONSTRAINT chk_quantity CHECK (quantity > 0)
);
