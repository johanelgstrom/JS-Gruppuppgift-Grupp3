// Made by: Elias Fredriksson
// Medieinstitutet FED21S

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
