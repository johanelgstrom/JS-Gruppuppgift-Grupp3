import * as data from "../products-data.json";

export class Product {
    id: number;
    name: string;
    imageUrl: string[];
    price: number;
    description: string;
    categories: string[];
    filters: string[];

    constructor(
        id: number,
        name: string,
        imageUrl: string[],
        price: number,
        description: string,
        categories: string[],
        filters: string[]
    ) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.categories = categories;
        this.filters = filters;
    }
}

export function createProductObjectsFromData(): Product[] {
    return data.map((productJson) => {
        return new Product(
            productJson.id,
            productJson.name,
            productJson.imagesUrl,
            productJson.price,
            productJson.description,
            productJson.categories,
            productJson.filter
        );
    });
}

export function getFilteredProducts(
    searchFilters: string[],
    products: Product[]
): Product[] {
    let result: Product[] = [];
    let wrongProduct: boolean = false;

    products.forEach((p: Product) => {
        for (let filter of searchFilters) {
            if (!p.filters.includes(filter)) {
                wrongProduct = true;
            }
        }

        if (wrongProduct == false) {
            result.push(p);
        }
        wrongProduct = false;
    });

    return result;
}

export function getCategoryProducts(
    searchCategories: string[],
    products: Product[]
): Product[] {
    let result: Product[] = [];
    let wrongProduct: boolean = false;

    products.forEach((p: Product) => {
        for (let category of searchCategories) {
            if (!p.categories.includes(category)) {
                wrongProduct = true;
            }
        }

        if (wrongProduct == false) {
            result.push(p);
        }
        wrongProduct = false;
    });

    return result;
}

export function getProductById(id: number, products: Product[]): Product[] {
    for (let product of products) {
        if (product.id == id) {
            return [product];
        }
    }
    return [];
}
