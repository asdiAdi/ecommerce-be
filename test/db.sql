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

CREATE TABLE address (
    id uuid DEFAULT gen_random_uuid() primary key,
    user_id uuid REFERENCES users,
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

