-- Active: 1683065859149@@127.0.0.1@3306

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL, 
    paid INTEGER DEFAULT(0) NOT NULL ,
    FOREIGN KEY (buyer_id) REFERENCES users (id)); 

--DROP TABLE purchases;

INSERT INTO purchases (id, buyer_id, total_price)
VALUES
("pur001", "u001", 200), -- o now anula a data de entrega
("pur002", "u001", 100),  -- se quiser uma data tem q colocar a data
("pur003", "u002", 250),
("pur004", "u002", 700),
("pur005", "u003", 150),
("pur006", "u003", 130);

SELECT * FROM purchases
WHERE id="pur001";

UPDATE purchases
SET paid = 1,
    delivered_at = DATETIME('now')
WHERE id = "p001";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE purchases.buyer_id = "u001";

SELECT * FROM purchases;
SELECT * FROM users;

--DELETE FROM purchases;