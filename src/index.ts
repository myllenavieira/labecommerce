import express, { Request, Response } from "express";

import cors from "cors";
import {
    products,
    purchases,
    users,
} from "./database/database";
import { Category, TProduct, TPurchase, TPurchaseProduct, TUser } from "./type";
import { db } from "./database/knex";



const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})


app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//GetAllUsers
app.get("/users", async (req: Request, res: Response) => {
    try {

        const result = await db("users")

        res.status(200).send({ users: result });

    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
//CreateUsers
app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password, created_at } = req.body as TUser;

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' inválido, deve ser uma string!");
            }
        }

        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                res.status(400);
                throw new Error(
                    "Este Id não está disponível para cadastro. Tente um novo Id."
                );
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("Nome do user deve ser uma string");
            }
        }

        if (id.length < 1 || name.length < 1) {
            res.status(400);
            throw new Error("'Id' ou 'Name' devem ter no minímo 1 caractere.");
        }

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                res.status(400);
                throw new Error(
                    "Este E-mail não está disponível para cadastro. Tente um novo E-mail."
                );
            }
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400);
                throw new Error("Email do user deve ser uma string");
            }
        }

        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400);
                throw new Error("Password do user deve ser uma string");
            }
        }

        const newUser = {
            id,
            name,
            email,
            password,
            created_at,
        };
        users.push(newUser);

        await db.raw(`
    INSERT INTO users (id, name, email, password) 
    VALUES ("${id}", "${name}", "${email}","${password}")`);

        res.status(201).send(`${name} cadastrado com sucesso!`);

    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});


//GetAllProducts
app.get("/products", async (req: Request, res: Response) => {
    try {

        const result = await db("products")

        res.status(200).send({ products: result });

    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
//GetProductByName
app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string
        const result = await db("products").select().where("name", "LIKE", `%${name}%`)

        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400)
                throw new Error("Nome do produto deve possuir ao menos 1 caractere")
            }
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("Nome do produto deve ser uma string")
            }
            if (result.length < 1) {
                res.status(404)
                throw new Error("Produto não encontrado")
            }
        }

        res.status(200).send(result)
    } catch (err: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado!")
        };
        res.send(err.message)
    }
});
//GetProductById
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await db("products").where({ id: id })

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' no formato incorreto, precisa ser uma string")
            }
            if (result.length < 1) {
                res.status(400)
                throw new Error("'id' incorreto, selecione um produto válido")
            }
        };

        res.status(200).send(result)
    }
    catch (err: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado!")
        };
        res.send(err.message)
    }
});
//CreateProducts
app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, category, image_url } = req.body as TProduct;

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("Id deve ser uma string");
            }
        }

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                res.status(400);
                throw new Error(
                    "Este Id não está disponível para cadastro. Tente um novo Id."
                );
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("Name deve ser uma string");
            }
        }

        if (id.length < 1 || name.length < 1) {
            res.status(400);
            throw new Error(
                "'Id' ou 'Name' de produto deve ter no minímo 1 caractere."
            );
        }

        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400);
                throw new Error("'Price' do produto deve ser um número");
            }
        }

        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400);
                throw new Error("'Description' inválida, deve ser uma string");
            }
        }

        if (category !== undefined) {
            if (typeof category !== "string") {
                res.status(400);
                throw new Error("'Category' invalida, deve ser uma string");
            }
        }

        if (image_url !== undefined) {
            if (typeof image_url !== "string") {
                res.status(400);
                throw new Error("'Image_url' inválida, deve ser uma string");
            }
        }

        const newProduct = {
            id,
            name,
            price,
            description,
            category,
            image_url
        };
        products.push(newProduct);

        await db.raw(`
    INSERT INTO products (id, name, price, description, category, image_url)
    VALUES ("${id}", "${name}", "${price}", "${description}", "${category}", "${image_url}");
    `);

        res.status(201).send(`Produto ${name} cadastrado com sucesso!`);

    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});
//EditProductById
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const newName = req.body.name.toUpperCase()
        const newPrice = req.body.price
        const newCategory = req.body.category.toUpperCase()

        const [getProduct] = await db("products").where({ id: id })

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' no formato incorreto, precisa ser uma string")
        }
        if (!getProduct) {
            res.status(400)
            throw new Error("'id' do produto incorreto, selecione um produto válido")
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' no formato incorreto, precisa ser uma string")
            };
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("'price' no formato incorreto, precisa ser um number")
            }
        }

        if (getProduct) {
            const editedProduct = {
                name: newName || getProduct.name,
                price: newPrice || getProduct.price,
                category: newCategory || getProduct.category
            }

            await db("products").update(editedProduct).where({ id: id })
        }

        res.status(200).send("Produto atualizado com sucesso!")
    }
    catch (err: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado!")
        };
        res.send(err.message)
    }
});


//GetPurchases
app.get("/purchases", async (req: Request, res: Response) => {
    try {

        const result = await db("purchases")

        res.status(200).send({ purchases: result });

    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
//GetPurchasesById
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await db("purchases").where({ id: id })

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' no formato incorreto, precisa ser uma string")
            }
            if (result.length < 1) {
                res.status(400)
                throw new Error("'id' incorreto ou nenhuma compra registrada")
            }
        };

        res.status(200).send(result)
    }
    catch (err: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado!")
        };
        res.send(err.message)
    }
});
//CreatePurchase
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, user_id, product_id, quantity, paid } = req.body;

        if (!id || !user_id || !product_id || !quantity || !paid) {
            res.status(400);
            throw new Error('Existem dados faltantes!');
        } if (typeof id !== "string") {
            res.status(400);
            throw new Error("Id do user deve ser uma string");
        } if (typeof user_id !== "string") {
            res.status(400);
            throw new Error("Nome do user deve ser uma string");
        } if (typeof product_id !== "string") {
            res.status(400);
            throw new Error("Nome do user deve ser uma string");
        } if (typeof quantity !== "number") {
            res.status(400);
            throw new Error("Nome do user deve ser uma string");
        } if (typeof paid !== "number") {
            res.status(400);
            throw new Error("Nome do user deve ser uma string");
        }

        const [verifyUser] = await db("users").where({ id: user_id })
        let totalPrice = 0

        if (!verifyUser) {
            res.status(400)
            throw new Error("'userId' incorreto, selecione um usuário válido")
        };

        const [verifyProduct] = await db("products").where({ id: product_id })
        if (!verifyProduct) {
            res.status(400)
            throw new Error("'id' do produto incorreto, selecione um produto válido")
        };

        const productTotalPrice = quantity * verifyProduct.price
        totalPrice += productTotalPrice


        const newPurchasesProducts: TPurchaseProduct = {
            purchase_id: id,
            product_id: verifyProduct.id,
            quantity: quantity
        }

        await db("purchases_products").insert(newPurchasesProducts)

        const newPurchase: TPurchase = {
            id: id,
            buyer: user_id,
            total_price: totalPrice,
            created_at: Date.now().toString(),
            paid: paid
        }

        await db("purchases").insert(newPurchase)
        res.status(200).send("Compra criada com sucesso!")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado!")
        }
        res.send(error.message)
    }
});
//DeletePurchaseById
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const email = req.body.email as string
        const password = req.body.password as string

        const [verifyPurchaseId] = await db("purchases").where({ id: id })
        const [verifyEmail] = await db("users").where({ email: email })

        if (!verifyPurchaseId) {
            res.status(400)
            throw new Error("'id' inválido ou nenhuma compra registrada")
        }

        if (!verifyEmail) {
            res.status(401)
            throw new Error("'email' incorreto, selecione um email válido")
        }

        if (verifyPurchaseId.buyer !== verifyEmail.id) {
            res.status(401)
            throw new Error("A compra não pertence a este usuário, por favor não tente cancelar a compra alheia")
        }

        if (verifyEmail.password !== password) {
            res.status(401)
            throw new Error("'password' incorreto, selecione uma senha válida")
        }

        await db("purchases").delete().where({ id: id })

        res.status(201).send("Compra cancelada com sucesso!")
    }
    catch (err: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Erro inesperado!")
        };
        res.send(err.message)
    }
});