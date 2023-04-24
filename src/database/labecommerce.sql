-- Active: 1682342085088@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO
    users (id, email, password)
VALUES (
        'u001',
        'leticia@gmail.com',
        '123456'
    ), (
        'u002',
        'felipe@gmail.com',
        '987654'
    ), (
        'u003',
        'larissa@gmail.com',
        '192837'
    );

SELECT*FROM users;

-------------------------------------------------------

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        'p001',
        'Samsung S20',
        1000.00,
        'Eletrônicos'
    ), (
        'p002',
        'Iphone 10',
        1800.00,
        'Eletrônicos'
    ), (
        'p003',
        'Moto G52',
        965.00,
        'Eletrônicos'
    ), (
        'p004',
        'Mouse Gamer',
        100.99,
        'Acessórios'
    ), (
        'p005',
        'Headset',
        200.90,
        'Acessórios'
    );

SELECT*FROM products;

-------------------------------------------------------

-- Get All Users

SELECT * FROM users;

-- Get All Products

SELECT * FROM products;

-- Search Product by name

SELECT * FROM products WHERE name = 'Iphone 10';

-- Create User

INSERT INTO
    users (id, email, password)
VALUES (
        "u004",
        "daniela@email.com",
        "abc123"
    );

-- Create Product

INSERT INTO
    products (id, name, price, category)
VALUES (
        "p006",
        "Moletom Gamer",
        199.99,
        "Roupas e calçados"
    );

-- Get Products by id

SELECT * FROM products WHERE id = "p006";

-- Delete User by id

DELETE FROM users WHERE id = "u004";

-- Delete Product by id

DELETE FROM products WHERE id = "p006";

-- Edit User by id

UPDATE users
SET
    email = "dani@email.com",
    password = "dan123"
WHERE id = "u004";

-- Edit Product by id

UPDATE products
SET
    name = "Moletom básico",
    price = 119.99,
    category = "Roupas e calçados"
WHERE id = "p006";

INSERT INTO
    products (id, name, price, category)
VALUES (
        "p007",
        "Mousepad",
        26.50,
        "Acessórios"
    ), (
        "p008",
        "TV LCD",
        679.90,
        "Eletrônicos"
    ), (
        "p009",
        "Notebook Lenovo",
        3850.00,
        "Eletrônicos"
    );

-------------------------------------------------------

--Get All Users

SELECT * FROM users ORDER BY email ASC;

-- Get All Products

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

SELECT *
FROM products
WHERE
    price >= 300
    and price <= 1000
ORDER BY price ASC;

-------------------------------------------------------

CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL UNIQUE NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users (id)
    );

SELECT * FROM purchases;

INSERT INTO
    purchases (id, total_price, paid, buyer_id)
VALUES ("p001", 1000, 0, "u001"),
    ("p002", 1800, 0, "u001"),
    ("p003", 965, 0, "u002"), 
    ("p004", 100.99, 0, "u002"), 
    ("p005", 200.9, 0, "u003"), 
    ("p006", 119.99, 0, "u003");

UPDATE purchases
SET
    paid = 1,
    delivered_at = DATETIME('now')
WHERE id = "p001";

SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id
WHERE
    purchases.buyer_id = "u001";



