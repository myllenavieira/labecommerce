import { DPeople, DProduct, DPurchase } from "./types"

export const users: DPeople[] = [{
    id: '1',
    email: 'myllena@email.com',
    password: '123'
}, {
    id: '2',
    email: 'myllena@email.com',
    password: '321'
}]

export const products: DProduct[] = [{
    id: '1',
    name: 'Samsung S20',
    price: 500,
    category: 'Telephone'
},
{
    id: '2',
    name: 'Mouse Gamer',
    price: 200,
    category: 'Periferics Computer'
}]

export const purchase: DPurchase[] = [{
    userId: users[0].id,
    productId: products[0].id,
    quantity: products.length,
    totalPrice: products[0].price + products[1].price
}]