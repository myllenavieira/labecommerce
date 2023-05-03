-- Active: 1674131650825@@127.0.0.1@3306


CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
--DROP TABLE purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("pur001", "pro001", 2),
("pur002", "pro002", 4),
("pur003", "pro001", 1);

SELECT * FROM purchases_products;

--DELETE FROM purchases_products;

SELECT*FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id

