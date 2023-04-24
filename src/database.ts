import { DUser, DProduct, DPurchase, Categoria } from "./types"

export const users: DUser[] = [{
    id: '1',
    email: 'myllena@email.com',
    password: '123'
},
{
    id: '2',
    email: 'my@email.com',
    password: '321'
},
{
    id: '3',
    email: 'mylle@email.com',
    password: '123321'
}]

export const products: DProduct[] = [{
    id: '1',
    name: 'Samsung S20',
    price: 500,
    category: Categoria.ELECTRONICS
},{
    id: '2',
    name: 'Iphone 10',
    price: 800,
    category: Categoria.ELECTRONICS
},{
    id: '3',
    name: 'Moto G52',
    price: 400,
    category: Categoria.ELECTRONICS
}]

let quantity = 0
for (let i in products){
    quantity += products[i].price
}


export const purchases: DPurchase[] = [{
    userId: users[0].id,
    productId: products[0].id,
    quantity: products.length,
    totalPrice: quantity
},
{
    userId: users[1].id,
    productId: products[1].id,
    quantity: products.length,
    totalPrice: quantity
},{
    userId: users[2].id,
    productId: products[1].id,
    quantity: products.length,
    totalPrice: quantity
}]