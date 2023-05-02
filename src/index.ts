import { products, purchases, users } from "./database";
import { DProduct, DUser, DPurchase, Categoria } from "./types";
import { db } from "./database/knex";
import express, { Request, Response } from 'express';
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001')
})

//GetAllUsers
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT * FROM users`)
        res.status(200).send(result)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});

//GetAllProducts
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT*FROM products`)
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
})

//GetPurchasesById
app.get("/users/:id/purchase", async (req: Request, res: Response) => {


    try {
        const id = req.params.id
        const idUser = users.find((user) => user.id === id)

        if (!idUser) {
            res.status(404)
            throw new Error("Usuario não existe")
        }
        const PurchaseidUser = purchases.filter((p) => {
            return p.buyer_id === idUser.id
        })
        if (!PurchaseidUser[0]) {
            res.status(201).send("Usuario não realizou nenhuma compra")
        } else {
            res.status(200).send(PurchaseidUser)
        }

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

//GetProductById
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        
        const id = req.query.id
        
        const result = await db.raw(`SELECT*FROM products WHERE id= "${id}"; `)

        res.status(200).send(result)

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
//SearchProductByName
app.get('/products/search', async (req: Request, res: Response) => {

    try {

        const name = req.query.name
        
        const result = await db.raw(`SELECT*FROM products WHERE name= "${name}"; `)

        res.status(200).send(result)


        if (result.length < 1) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }


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
    const buyer_id = req.body.buyer_id;
    const id = req.body.id;
    const paid = req.body.paid;
    const total_price = req.body.total_price;

    const newPurchase: DPurchase = {
        buyer_id,
        id,
        total_price,
        paid
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
        return purchase.buyer_id === id
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
        return purchase.buyer_id === id
    })

    if (indexToRemove >= 0) {
        products.splice(indexToRemove, 1)

    }

    res.status(200).send("Produto apagado com sucesso")

})

//createUser
app.post("/users", async (req: Request, res: Response) => {
    try {
            const { id, name, email, password } = req.body as DUser
            const newUser = {
                id,
                name,
                email,
                password
            }
            if (newUser !== undefined) {
                if (!newUser.name || !newUser.password) {
                    res.status(400)
                    throw new Error("Nome ou senha faltando no cadastro")
                }
            }
            if (newUser !== undefined) {
                if (!newUser.id || !newUser.email) {
                    res.status(400)
                    throw new Error("Id ou email faltando no cadastro")
                }
            }
    
            const [ userId ] = await db.raw(`
            SELECT * FROM users
            WHERE id = ("${id}")
        `)
    
        if (userId) {
                res.status(404)
                throw new Error("Id ja cadastrado")
        }
    
        const [ userEmail ] = await db.raw(`
            SELECT * FROM users
            WHERE email = ("${email}")
        `)
    
        if (userEmail) {
                res.status(404)
                throw new Error("Email ja cadastrado")
        }
            await db.raw(`
                INSERT INTO users (id, name, email, password)
                VALUES ("${id}", "${name}", "${email}", "${password}")
            `)
            
        res.status(201).send('Usuario registrado com sucesso!')
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});

//createProduct
app.post("/products", async (req: Request, res: Response) => {
    try {
        
        const { id, name, price, category } = req.body as DProduct
        const newProduct = {
            id,
            name,
            price,
            category
        }
        if (newProduct !== undefined) {
        if (!newProduct.id  || !newProduct.name|| !newProduct.category) {
            res.status(400)
            throw new Error("Informações faltando no cadastro de produtos")
        }

        if (newProduct.price < 1) {
            res.status(400)
            throw new Error("Preço faltando no cadastro de produtos")
        }}

        const [ searchId ] = await db.raw(`
					SELECT * FROM products
					WHERE id = "${id}";
				`) 

				if (searchId) {
					res.status(404)
					throw new Error("Id ja cadastrado")
				}


        await db.raw(`
            INSERT INTO products (id, name, price, category)
            VALUES ("${id}", "${name}", "${price}", "${category}")
        `)

        res.status(201).send('Produto registrado com sucesso!')

    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});

//createPurchase
app.post("/purchase", async (req: Request, res: Response) => {
    try {
        const {id, total_price, created_at, paid, buyer_id} = req.body
        const newPurchase = {
            id,
            total_price,
            created_at,
            paid,
            buyer_id
        }
        if (newPurchase.id.length < 1 ) {
            res.status(400)
            throw new Error("Informações incompletas, preencha o id")
        }

        const [ searchId ] = await db.raw(`
					SELECT * FROM purchases
					WHERE userId = "${id}";
				`) 

				if (searchId) {
					res.status(404)
					throw new Error("Id ja cadastrado")
				}

        
        await db.raw(`
            INSERT INTO purchase (id, name, price, category)
            VALUES ("${id}", "${buyer_id}", "${total_price}", "${paid}")
        `)
        res.status(201).send('Purchase registrada com sucesso!')

    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});