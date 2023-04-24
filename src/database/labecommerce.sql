-- Active: 1682342085088@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL    
);

INSERT INTO users (id, email, password)
VALUES
('u001', 'leticia@gmail.com', '123456'),
('u002', 'felipe@gmail.com', '987654'),
('u003', 'larissa@gmail.com', '192837');

SELECT*FROM users;

---------------------------------

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
('p001', 'Samsung S20', 1000.00, 'Eletrônicos'),
('p002', 'Iphone 10', 1800.00, 'Eletrônicos'),
('p003', 'Moto G52', 965.00,'Eletrônicos'),
('p004', 'Mouse Gamer', 100.99,'Acessórios'),
('p005', 'Headset', 200.90,'Acessórios');

SELECT*FROM products;
