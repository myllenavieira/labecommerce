import { products, purchase, users } from "./database";
import { DProduct, DUser, DPurchase } from "./types";

import express, {Request, Response} from 'express';
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001')
})

//GetAllUsers
app.get('/users',(req: Request, res: Response)=>{
    res.send(users)
})

//GetAllProducts
app.get('/products',(req: Request, res: Response)=>{
    res.send(products)
})

//GetAllPurchases
app.get('/purchase',(req: Request, res: Response)=>{
    res.status(200).send(purchase)
})

//GetProductById
app.get("/products/:id", (req: Request, res: Response) => {
    res.status(200).send("Objeto Product encontrado.")
})

//GetPurchaseById
app.get("/purchase/:id" , (req:Request, res:Response)=>{
    res.status(200).send("Array de compras do user encontrado.")
})

//GetProductByName
app.get('/products',( req: Request, res: Response)=>{

    const q = req.query.q as string

    const productFilter = products.filter((product)=>{
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    res.send(productFilter)
})

//EditUser
app.post('/users', (req: Request, res: Response)=>{
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password;

    const newUser:DUser = {
        id: id,
        email: email,
        password: password
    }

    users.push(newUser);

    res.status(201).send('Usuário criado com sucesso')
})

//EditProduct
app.post('/products', (req: Request, res: Response)=>{
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price;
    const category = req.body.category;

    const newProduct:DProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }

    products.push(newProduct);

    res.status(201).send('Produto criado com sucesso')
})

//EditPurchase
app.post('/purchase', (req: Request, res: Response)=>{
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;

    const newPurchase:DPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchase.push(newPurchase);

    res.status(201).send('Compras efetuadas com sucesso')
})

//DeleteUserById
app.delete("/users/:id", (req:Request, res:Response)=>{
    const id = req.params.id


    const indexToRemove= users.findIndex((user)=>{
        return user.id === id
    })

    if (indexToRemove >=0){
        users.splice(indexToRemove,1)

    }

    res.status(200).send("User apagado com sucesso")

})

//DeleteProductById
app.delete("/products/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    const indexToRemove= products.findIndex((product)=>{
        return product.id === id
    })

    if (indexToRemove >=0){
        products.splice(indexToRemove,1)

    }

    res.status(200).send("Produto apagado com sucesso")

})