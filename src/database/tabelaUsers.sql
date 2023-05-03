-- Active: 1683065859149@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL    
);
DROP TABLE users;

PRAGMA table_info ('users');

INSERT INTO users (id, name, email, password)
VALUES
('u001', "Fulano", "fulano@email.com", "fulano123"),
('u002', "Ciclana", "ciclana@email.com", "ciclana99");


SELECT*FROM users;

-- Create User
-- mocke um novo usuário
-- insere o item mockado na tabela users

-- INSERT INTO users (id, email, password)
-- VALUES ("New User", "new@email.com", "N123");

-- Delete User by id
-- mocke uma id
-- delete a linha baseada no valor mockado

--DELETE FROM users
WHERE id = u005;

-- Edit User by id
-- mocke valores para editar um user
-- edite a linha baseada nos valores mockados
UPDATE users
SET
	email = "mb@email.com",
	password = "0987"
WHERE id = 2;


--Exercicio 3

-- Copie as queries do exercício 1 e refatore-as

--Get All Users
--retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

