export type DPeople = {
    id: string,
    email: string,
    password: string
}

export type DProduct = {
    id: string,
    name: string,
    price: number,
    category: 'Acessórios' | "Roupas e calçados" | "Eletrônicos"
}

export type DPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}

export enum Categoria {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}
