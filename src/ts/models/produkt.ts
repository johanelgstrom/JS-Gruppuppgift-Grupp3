import * as data from "../products-data.json";
import { ProductError } from "./productError";

export class Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    categories: string[];
    filter: string[];

    constructor(
        id: number,
        name: string,
        imageUrl: string,
        price: number,
        description: string,
        categories: string[],
        filter: string[]
    ) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.categories = categories;
        this.filter = filter;
    }
}

export function createProductObjectsFromData(): Product[] {
    return data.map((productJson) => {
        return new Product(
            productJson.id,
            productJson.name,
            productJson.imageUrl,
            productJson.price,
            productJson.description,
            productJson.categories,
            productJson.filter
        );
    });
}

export function getFilterProducts(
    filter: string,
    products: Product[]
): Product[] {
    let result: Product[] = [];
    products.forEach((p: Product) => {
        for (let productFilter of p.filter) {
            if (productFilter == filter) {
                result.push(p);
            }
        }
    });

    if (result.length <= 0) {
        throw new ProductError("No products with that filter exists.");
    }

    return result;
}

export function getCategoryProducts(
    category: string,
    products: Product[]
): Product[] {
    let result: Product[] = [];
    products.forEach((p: Product) => {
        for (let productCategory of p.categories) {
            if (productCategory == category) {
                result.push(p);
            }
        }
    });

    if (result.length <= 0) {
        throw new ProductError("No products with that category exists.");
    }

    return result;
}

export function getProductById(id: number, products: Product[]): Product {
    for (let product of products) {
        if (product.id == id) {
            return product;
        }
    }
    throw new ProductError("No product with that ID exists.");
}
