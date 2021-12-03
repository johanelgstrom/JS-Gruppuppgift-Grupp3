import {
    Product,
    createProductObjectsFromData,
    getFilteredProducts,
    getCategoryProducts,
    getProductById,
} from "./models/produkt";

import { Sort, sortProductsBy } from "./models/sorting";

window.onload = function (): void {
    runTests();
    let mobileBurger: HTMLDivElement = document.getElementById("burger-menu") as HTMLDivElement;
    mobileBurger.addEventListener("click", menuSlideIn);
};

function runTests(): void {
    //TESTS
    //##################### GET ALL PRODUCTS (NEED TO HAPPEND FIRST) #####################
    let products: Product[] = createProductObjectsFromData();
    console.log("ALL: ", products);

    //##################### SORT #####################
    let sort: Sort = Sort.PRICE_DECENDING;
    let sortedProducts: Product[] = sortProductsBy(sort, products);
    console.log("SORTED ", sort, ": ", sortedProducts);

    //##################### GET FILTERED PRODUCTS #####################
    let filter: string[] = ["Konstig"];
    let filteredProducts: Product[] = getFilteredProducts(filter, products);
    console.log("FILTERED ", filter, ": ", filteredProducts);

    //##################### GET CATEGORIZED PRODUCTS #####################
    let category: string[] = ["Dator"];
    let categorizedProducts: Product[] = getCategoryProducts(
        category,
        products
    );
    console.log("CATEGORIZED ", category, ": ", categorizedProducts);

    //##################### GET PRODUCT BY ID #####################
    let id: number = 1;
    let product: Product[] = getProductById(id, products);
    console.log("BY ID ", id, ": ", product);
}

function menuSlideIn() {
    let menu: HTMLDivElement = document.getElementById("menu-container") as HTMLDivElement;
    let topBun: HTMLDivElement = document.getElementById("top-bun") as HTMLDivElement;
    let patty: HTMLDivElement = document.getElementById("patty") as HTMLDivElement;
    let bottomBun: HTMLDivElement = document.getElementById("bottom-bun") as HTMLDivElement;

    if (menu.classList.contains("show-menu")) {
        menu.classList.remove("show-menu");
        topBun.classList.remove("top-bun-toggle");
        patty.classList.remove("patty-toggle");
        bottomBun.classList.remove("bottom-bun-toggle");
    } 
    else {
        menu.classList.add("show-menu");
        topBun.classList.add("top-bun-toggle");
        patty.classList.add("patty-toggle");
        bottomBun.classList.add("bottom-bun-toggle");
    }
}