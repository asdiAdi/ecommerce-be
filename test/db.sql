CREATE TABLE users (
    id integer primary key  generated always as identity,
    username VARCHAR(16) not null UNIQUE ,
    password VARCHAR(255) not null,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE ,
    phone VARCHAR(20),
    birthdate date, -- mm/dd/yyyy
    created_at date,
    updated_at date
);

DROP TABLE users;