// Made by: Elias Fredriksson
// Medieinstitutet FED21S

export class Product {
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

    constructor(
        id: number,
        name: string,
        imageUrl: string[],
        price: number,
        description: string,
        categories: string[],
        filters: string[],
        isNew: boolean,
        isOnSale: boolean,
        related: number[] = []
    ) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.categories = categories;
        this.filters = filters;
        this.isNew = isNew;
        this.isOnSale = isOnSale;
        this.related = related;
    }
}
