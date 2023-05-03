import { type } from "os"

export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string|number,
}
export type TProduct = {
    id: string,
    name: string,
    price: number,
    description:string,
    imagemUrl: string
}
 export type TPurchase = {    
    id: string,
    buyer_id: string,   
    total_price:number,
    paid: number, 
    
}
export type TProductsInPurchase = {
    id:string
    buyer_id: string
    total_price: number
    paid:number
    products:TProduct[]
}
export type TPurchases_products = {
    purchase_id: string, 
    product_id: string,
    quantity:number,
}
export type TProductToBuy = {
    productId: string,
    quantity: number
  }
