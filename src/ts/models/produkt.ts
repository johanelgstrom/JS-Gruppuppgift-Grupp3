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
    related: Product[];

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
        related: Product[] = []
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
