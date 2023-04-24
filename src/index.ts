import { products, purchases, users } from "./database";
import { DProduct, DUser, DPurchase, Categoria } from "./types";

import express, { Request, Response } from 'express';
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001')
})

//GetAllUsers
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users);
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});

//GetAllProducts
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
})

//GetPurchasesById
app.get("/users/:id/purchase", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const idUser = users.find((user) => user.id === id)

        if (!idUser) {
            res.status(404)
            throw new Error("Usuario não existe")
        }
        const PurchaseidUser = purchases.filter((p) => {
            return p.userId === idUser.id
        })
        if (!PurchaseidUser[0]) {
            res.status(201).send("Usuario não realizou nenhuma compra")
        } else {
            res.status(200).send(PurchaseidUser)
        }

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500) 
        }

        res.send(error.message)
    }

})

//GetProductById
app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(id.toLowerCase())
        })

        if (id.length < 1) {
            res.status(400)
            throw new Error("Id deve possuir pelo menos 1 caracter.")
        }

        if (result.length < 1) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }

        res.status(200).send(result);
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
})

//EditUserById
app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newEmail = req.body.email;
        const newPassword = req.body.password;

        const searchUserId = users.find((user) => user.id === id);

        if (!searchUserId) {
            res.status(404);
            throw new Error("Usuário não existe. Verifique o 'id'");
        }

        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("'email' deve ser do tipo 'string'")
            }
        }

        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("'password' deve ser do tipo 'string'")
            }
        }
        const result = users.find((user) => user.id === id);
        if (result) {
            result.email = newEmail || result.email;
            result.password = newPassword || result.password;
        }
        res.status(200).send("Cadastro atualizado com sucesso");
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
})

//EditProductById
app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newName = req.body.name
        const newPrice = req.body.price
        const newCategory = req.body.category

        const searchProduct = products.find(product => product.id === id)
        if (!searchProduct) {
            res.status(404)
            throw new Error("Produto não encontrado. Verifique o 'id'")
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser do tipo 'string'")
            }
        }
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("'price' deve ser do tipo 'number'")
            }
        }
        if (newCategory !== undefined) {
            if (
                newCategory !== Categoria.ACCESSORIES &&
                newCategory !== Categoria.CLOTHES_AND_SHOES &&
                newCategory !== Categoria.ELECTRONICS
            ) {
                res.status(400);
                throw new Error(
                    "'category' deve ter um tipo válido: 'Acessórios', 'Roupas e calçados', 'Eletrônicos'"
                );
            }
        }
        const result = products.find((product) => product.id === id);
        if (result) {
            result.name = newName || result.name;
            result.price = newPrice || result.price;
            result.category = newCategory || result.category;
        }
        res.status(200).send("Produto atualizado com sucesso");
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
})

//EditPurchase
app.put('/purchase', (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;

    const newPurchase: DPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase);

    res.status(201).send('Compras efetuadas com sucesso')
})

//DeleteUserById
app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id


    const indexToRemove = users.findIndex((user) => {
        return user.id === id
    })

    if (indexToRemove >= 0) {
        users.splice(indexToRemove, 1)

    }

    res.status(200).send("User apagado com sucesso")

})

//DeleteProductById
app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const searchUserId = users.find((user) => user.id === id);
    if (!searchUserId) {
        res.status(404);
        throw new Error("Usuário não existe. Verifique o 'id'");
    }

    const indexToPurchase = purchases.findIndex((purchase) => {
        return purchase.userId === id
    });

    if (indexToPurchase >= 0) {
        products.splice(indexToPurchase, 1)

    }

    res.status(200).send("Compras apagadas com sucesso")

})

//DeletePurchaseById
app.delete("/purchase/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = purchases.findIndex((purchase) => {
        return purchase.userId === id
    })

    if (indexToRemove >= 0) {
        products.splice(indexToRemove, 1)

    }

    res.status(200).send("Produto apagado com sucesso")

})

//createUser
app.post("/users", (req: Request, res: Response) => {
    try {
        const { id, email, password }: DUser = req.body;
        if (!id) {
            res.status(400);
            throw new Error("'id' deve ser passado no body");
        }
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser do tipo 'string'");
        }
        if (!email) {
            res.status(400);
            throw new Error("'email' deve ser passado no body");
        }
        if (typeof email !== "string") {
            res.status(400);
            throw new Error("'email' deve ser do tipo 'string'");
        }
        if (!password) {
            res.status(400);
            throw new Error("'password' deve ser passado no body");
        }
        if (typeof password !== "string") {
            res.status(400);
            throw new Error("'password' deve ser do tipo 'string'");
        }
        const searchId = users.find((user) => user.id === id);
        if (searchId) {
            res.status(400);
            throw new Error("Já existe uma conta com esse id");
        }
        const searchEmail = users.find((user) => user.email === email);
        if (searchEmail) {
            res.status(400);
            throw new Error("Já existe uma conta com esse email");
        }
        const newUser: DUser = { id, email, password };
        users.push(newUser);
        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});

//createProduct
app.post("/products", (req: Request, res: Response) => {
    try {
        const { id, name, price, category }: DProduct = req.body;

        if (!id) {
            res.status(400);
            throw new Error("'id' deve ser passado no body");
        }

        if (!name) {
            res.status(400);
            throw new Error("'name' deve ser passado no body");
        }

        if (!price) {
            res.status(400);
            throw new Error("'price' deve ser passado no body");
        }

        if (!category) {
            res.status(400);
            throw new Error("'category' deve ser passado no body");
        }

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' deve ser do tipo 'string'");
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("'name' deve ser do tipo 'string'");
            }
        }

        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400);
                throw new Error("'price' deve ser do tipo 'number'");
            }
        }

        if (category !== undefined) {
            if (
                category !== Categoria.ACCESSORIES &&
                category !== Categoria.CLOTHES_AND_SHOES &&
                category !== Categoria.ELECTRONICS
            ) {
                res.status(400);
                throw new Error(
                    "'category' deve ter um tipo válido: 'Acessórios', 'Roupas e calçados', 'Eletrônicos', 'Beleza', 'Banho'"
                );
            }
        }

        const searchId = products.find((product) => product.id === id);
        if (searchId) {
            res.status(400);
            throw new Error("Já existe um produto cadastrado com esse 'id'");
        }
        const newProduct: DProduct = { id, name, price, category };
        products.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});

//createPurchase
app.post("/purchase", (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice }: DPurchase = req.body;

        if (!userId) {
            res.status(400);
            throw new Error("'userId' deve ser passado no body");
        }
        if (!productId) {
            res.status(400);
            throw new Error("'productId' deve ser passado no body");
        }
        if (!quantity) {
            res.status(400);
            throw new Error("'quantity' deve ser passado no body");
        }
        if (!totalPrice) {
            res.status(400);
            throw new Error("'totalPrice' deve ser passado no body");
        }
        if (userId !== undefined) {
            if (typeof userId !== "string") {
                res.status(400);
                throw new Error("'userId' deve ser do tipo 'string'");
            }
        }
        if (productId !== undefined) {
            if (typeof productId !== "string") {
                res.status(400);
                throw new Error("'productId' deve ser do tipo 'string'");
            }
        }
        if (quantity !== undefined) {
            if (typeof quantity !== "number") {
                res.status(400);
                throw new Error("'quantity' deve ser do tipo 'number'");
            }
        }
        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                res.status(400);
                throw new Error("'totalPrice' deve ser do tipo 'number'");
            }
        }
        const searchUserId = users.find((user) => user.id === userId);
        if (!searchUserId) {
            res.status(404);
            throw new Error(
                "'userId' deve corresponder à 'id' de um usuário cadastrado"
            );
        }
        const searchProductId = products.find(
            (product) => product.id === productId
        );
        if (!searchProductId) {
            res.status(400);
            throw new Error(
                "'productId' deve corresponder à 'id' de um produto cadastrado"
            );
        }
        if (searchProductId) {
            if (searchProductId.price * quantity !== totalPrice) {
                res.status(400);
                throw new Error(
                    "O valor total da compra não corresponde ao valor do produto vezes a quantidade informada"
                );
            }
        }
        const newPurchase: DPurchase = { userId, productId, quantity, totalPrice };
        purchases.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso!");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});