import { TUser, TProduct, TPurchase, Category } from "../type";

export const users: TUser[] = [
    {
        id: "1",
        name: "João",
        email: "joao@gmail",
        password: "a1b2c3d43",
        created_at: ""
    },
    {
        id: "2",
        name: "Maria",
        email: "maria@gmail",
        password: "z12z254",
        created_at: ""
    }
];

export const products: TProduct[] = [
    {
        id: "1",
        name: "Galaxy A72",
        price: 3000,
        description: "Celular Smartphone Galaxy A72 128Gb 6,7",
        category: Category.ELECTRONICS,
        image_url: "https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/e/celular-smartphone-galaxy-a72-128gb-6-7-samsung_475186.jpg"
    },
    {
        id: "2",
        name: "Galaxy A04e",
        price: 1000,
        description: "Celular Smartphone Samsung Galaxy A04e 4G Octacore 3Gb Ram 64Gb - Cobre",
        category: Category.ELECTRONICS,
        image_url: "https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/e/celular-smartphone-samsung-galaxy-a04e-4g-octacore-3gb-ram-64gb_796565.jpg"
    }
];

export const purchases: TPurchase[] = [
    {
        id: "1",
        buyer: "1",
        total_price: 1000,
        created_at: "",
        paid: 0
    },
    {
        id: "2",
        buyer: "2",
        total_price: 4000,
        created_at: "",
        paid: 0
    }
];


