export type DPeople = {
    id: string,
    email: string,
    password: string
}

export type DUser = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type DProduct = {
    id: string,
    name: string,
    price: number,
    category: 'Acessórios' | "Roupas e calçados" | "Eletrônicos"
}

// export type DPurchase = {
//     userId: string,
//     productId: string,
//     quantity: number,
//     totalPrice: number
// }

export type DPurchase = {
    id: string,
    buyer_id: string,
    total_price:number
    paid: number    
}

export enum Categoria {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}