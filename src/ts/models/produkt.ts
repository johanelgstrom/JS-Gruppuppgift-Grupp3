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

//Create a new list of Product objects for each object found in
//the "products-data.json" file. No need for an interface sense
//we know all its attributenames.
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

//Search through all the products and find the products
//which has all the specified categories.
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

//Search through all the products and find the products
//which has all the specified categories.
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
//Find the product that has matching id and return that
//object in a new list. Otherwise return empty list.
export function getProductById(id: number, products: Product[]): Product[] {
    for (let product of products) {
        if (product.id == id) {
            return [product];
        }
    }
    return [];
}

//Find all products which match the current list of IDs
// export function getProductsByIds(
//     ids: number[],
//     products: Product[]
// ): Product[] {
//     return;
// }
