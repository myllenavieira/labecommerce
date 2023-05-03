-- Active: 1674131650825@@127.0.0.1@3306
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imagemUrl TEXT NOT NULL
);
--DROP TABLE products;
PRAGMA table_info ('products');

INSERT INTO products (id, name, price, description, imagemUrl)
VALUES
('pro001', 'Mouse gamer', 250, 'Melhor mouse do mercado!', "https://picsum.photos/seed/Teclado%20gamer/400"),
('pro002', 'Monitor', 900, 'Monitor LED Full HD 24 polegadas', "https://picsum.photos/seed/Monitor/400" ),
('pro003', 'Teclado gamer', 200,'Teclado mecânico com numpad', "https://picsum.photos/seed/Teclado%20gamer/400");

-- INSERT INTO products (id, name, description, "imagemUrl")
-- VALUES
-- ('p004', 'Geladeira', 1000.99,'Eletrônico'),
-- ('p005', 'Tênis', 200.80,'Roupas e calçados');

SELECT*FROM products;

-- Search Product by name
-- mocke um termo de busca, por exemplo "monitor"
-- retorna o resultado baseado no termo de busca
SELECT * FROM products
WHERE name = 'Sandálias';

-- Create Product
-- mocke um novo produto
-- insere o item mockado na tabela products
INSERT INTO products (id, name, price, category)
VALUES ("6", "brinco", 5.5, "Acessórios");

--Exercício 2

-- Get Products by id
-- mocke uma id
-- busca baseada no valor mockado
SELECT * FROM products
WHERE id = 6;

-- Delete Product by id
-- mocke uma id
-- delete a linha baseada no valor mockado
DELETE FROM products
WHERE id = 1;

-- Edit Product by id
-- mocke valores para editar um product
-- edite a linha baseada nos valores mockados
UPDATE products
SET
	name = "Fogão",
	price = 25.00,
    category ="Eletrônico"
WHERE id = 2;


INSERT INTO products (id, name, price, category)
VALUES 
("7", "celular", 350, "Eletronicos"),
("8", "tv", 550, "Eletronicos"),
("9", "notebook", 5780, "Eletronicos");


--Exercicio 3

-- Copie as queries do exercício 1 e refatore-as
-- Get All Products versão 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

-- Get All Products versão 2
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products
WHERE
	price >= 300
	and price <= 1000
ORDER BY price ASC;