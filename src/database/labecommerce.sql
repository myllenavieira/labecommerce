-- Active: 1683162985915@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES ("u001", "Fulano", "fulano@email.com","123456"),
        ("u002", "Beltrana", "beltrana@email.com","654321"),
        ("u003", "Ciclana", "ciclana@email.com","123321");

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
);  

INSERT INTO products (id, name, price, description, category, image_url)
VALUES (
        "p001", 
        "Gargantinha Estrelas", 
        80,
        "Gargantilha semijoia folheada pingentes estrelas", 
        "Acessórios",
        "https://http2.mlstatic.com/D_NQ_NP_957367-MLB44536019148_012021-O.webp"
    ), (
        "p002", 
        "Corrente", 
        100, 
        "Corrente de elos dourada",
        "Acessórios",
        "https://www.piuka.com.br/media/catalog/product/cache/67e72deeb45f53794a57e07fb433497d/c/h/choker-piuka-cami-elos-grumet-folheada-a-ouro-18k-2.jpg"
    ), (
        "p003", 
        "Brinco Pérola", 
        60, 
        "Brinco folheado a ouro com pérolas",
        "Acessórios",
        "https://dryzun.vteximg.com.br/arquivos/ids/160287-1000-1000/091885.jpg?v=637442689816800000"
    ), (
        "p004", 
        "Calça Jeans Feminina", 
        50,
        "Calça jeans MOM lavagem média",
        "Roupas e calçados",
        "https://tfbsmy.vteximg.com.br/arquivos/ids/195849-830-830/96213051f.jpg?v=638067995583900000"
    ), (
        "p005", 
        "Camiseta Preta Feminina", 
        120, 
        "Camiseta Feminina preta em algodão",
        "Roupas e calçados",
        "https://cdn.shopify.com/s/files/1/0526/4123/5093/products/4_10a008ca-c649-4620-b54d-cdbd7a923816.png?v=1669404166"
        );

-- Get All Users
SELECT * FROM users;

-- Get All Products
SELECT * FROM products;

--Search product by name
SELECT * FROM  products WHERE name LIKE "%Gargantinha Estrelas%";

-- Create User
INSERT INTO users(id, name, email, password)
VALUES ("u004", "João", "joao@labenu", "265658");

-- Create Product
INSERT INTO products(id, name, price, description, category, image_url)
VALUES ("p006", "Jaqueta Jeans", 120, "Jaqueta Feminina Jeans Lavagem Média", "Roupas e calçados", "https://img.lojasrenner.com.br/item/667245559/large/6.jpg");    

-- Get Products by IDENTIFIED
SELECT * FROM products
WHERE id = "p001";

-- Delete User by id
DELETE FROM users
WHERE id = "u001";

-- Delete Product by id
DELETE FROM products
WHERE id = "p006";

-- Edit User by id
UPDATE users
SET password = "0606068"
WHERE id = "u001";

-- Edit Product by id
UPDATE products
SET price = 50
WHERE id = "p001";

-- Get All Users(refatorado)
SELECT * FROM users ORDER BY email ASC;

-- Get All Products(refatorado)
SELECT * FROM products ORDER BY price ASC
LIMIT 20 OFFSET 1;

-- Get All Products(refatorado)
SELECT * FROM products 
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

SELECT * FROM purchases;

INSERT INTO purchases(id, buyer, total_price, paid)
VALUES ("c001", "u001", 100, 0),
        ("c002", "u001", 50, 0),
        ("c003", "u002", 30, 0),
        ("c004", "u002", 80, 0),
        ("c005", "u003", 20, 0),
        ("c006", "u003", 60, 0);

--Atualizar purchases com pagamento = 1 e data atualizada da entrega
UPDATE purchases
SET paid = 1, created_at = DATETIME('now')
WHERE id = "c003";

--Query de consulta com JOIN das tabelas (users e purchases)
SELECT 
users.id AS idUsers,
purchases.id,
purchases.total_price,
purchases.created_at,
purchases.paid
FROM purchases
JOIN users ON purchases.buyer = users.id
WHERE users.id = "u003";    

-- Tabela de relação
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL, 
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    );

SELECT * FROM purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES ("c001","p001", 2),
        ("c002","p001", 4),
        ("c003", "p002", 3);

SELECT
purchases.id,
purchases.buyer,
purchases.total_price,
purchases.created_at,
purchases.paid,
purchases_products.product_id AS productId,
purchases_products.quantity,
products.name,
products.price,
products.description,
products.category
FROM purchases
LEFT JOIN purchases_products 
ON purchases_products.purchase_id = purchases.id
INNER JOIN products 
ON purchases_products.product_id = products.id;


