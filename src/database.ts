import { DPeople, DProduct, DPurchase, Categoria } from "./types"

export const users: DPeople = {
    id: '1',
    email: 'myllena@email.com',
    password: '123'
}

export const products: DProduct = {
    id: '1',
    name: 'Samsung S20',
    price: 500,
    category: Categoria.ELECTRONICS
}

export const arrayUsers:DPeople[] = []
arrayUsers.push(users)

export const arrayProducts:DProduct[] = []
arrayProducts.push(products)

//USERS - GET E PUT
const createUser = (id: string, email:string, password:string)=> {
    let newUser = {
        id: id,
        email:email,
        password: password
    }

    return arrayUsers.push(newUser)
}

export const getAllUsers = () => {
    return console.table(arrayUsers)
}

createUser("2", "myllenavieira@email.com", "123213");

//PRODUCT - GET E PUT
const createProduct = (id: string, name:string, price:number, category:'Acessórios' | "Roupas e calçados" | "Eletrônicos")=> {
    let newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }

    return arrayProducts.push(newProduct)
}

export const getAllProducts = () => {
    return console.table(arrayProducts)
}

export const getProductsById = (id: string) => {
    let idTableProducts = arrayProducts.filter((product)=>{
    return product.id === id
    });
    return console.table(idTableProducts)
}

export const queryProductsByName = (name: string) => {
    let nameTableProducts = arrayProducts.filter((product)=>{
        return product.name === name
    })
    return console.table(nameTableProducts)
}

createProduct('2', 'Brusinha', 80, Categoria.CLOTHES_AND_SHOES)

let quantity = 0
for(let i in arrayProducts){
    quantity += arrayProducts[i].price 
}

export const purchase: DPurchase = {
    userId: arrayUsers[0].id,
    productId: arrayProducts[0].id,
    quantity: arrayProducts.length,
    totalPrice: quantity
}

export const getAllPurchasesFromUserId = (id: string) => {
    let purchaseId = arrayProducts.filter((product)=>{
    return product.id === id
    });
    return console.table(purchaseId)
}
