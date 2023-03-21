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

app.get('/Ping',(req: Request, res: Response)=>{
    res.send('Pong')
})

app.get('/users',(req: Request, res: Response)=>{
    res.send(users)
})

app.get('/products',(req: Request, res: Response)=>{
    res.send(products)
})

app.get('/purchase',(req: Request, res: Response)=>{
    res.status(200).send(purchase)
})

app.get('/products',( req: Request, res: Response)=>{

    const q = req.query.q as string

    const productFilter = products.filter((product)=>{
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    res.send(productFilter)
})

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