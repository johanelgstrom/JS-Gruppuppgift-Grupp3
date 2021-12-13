import { Product } from "./Produkt";

export interface IProduct {
    id: number;
    name: string;
    imageUrl: string[];
    price: number;
    description: string;
    categories: string[];
    filters: string[];
    isNew: boolean;
    isOnSale: boolean;
    related: number[];
}
