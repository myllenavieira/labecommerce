export type DPeople = {
    id: string,
    email: string,
    password: string
}

export type DProduct = {
    id: string,
    name: string,
    price: number,
    category: string
}

export type DPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}