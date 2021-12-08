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
    let mobileBurger: HTMLDivElement = document.getElementById("burger-menu-phone") as HTMLDivElement;
    mobileBurger.addEventListener("click", menuSlideIn);
    let burger: HTMLDivElement = document.getElementById("burger-menu") as HTMLDivElement;
    burger.addEventListener("click", menuSlideIn);
    
    let mobileCart: HTMLDivElement = document.getElementById("cart-icon") as HTMLDivElement;
    mobileCart.addEventListener("click", cartSlideIn);
    let cart: HTMLDivElement = document.getElementById("cart-container") as HTMLDivElement;
    cart.addEventListener("click", cartSlideIn);
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
    let topBunPhone: HTMLDivElement = document.getElementById("top-bun-phone") as HTMLDivElement;
    let pattyPhone: HTMLDivElement = document.getElementById("patty-phone") as HTMLDivElement;
    let bottomBunPhone: HTMLDivElement = document.getElementById("bottom-bun-phone") as HTMLDivElement;
    let topBun: HTMLDivElement = document.getElementById("top-bun") as HTMLDivElement;
    let patty: HTMLDivElement = document.getElementById("patty") as HTMLDivElement;
    let bottomBun: HTMLDivElement = document.getElementById("bottom-bun") as HTMLDivElement;

    if (menu.classList.contains("show-menu")) {
        menu.classList.remove("show-menu");
        topBunPhone.classList.remove("top-bun-toggle");
        pattyPhone.classList.remove("patty-toggle");
        bottomBunPhone.classList.remove("bottom-bun-toggle");
        topBun.classList.remove("top-bun-toggle");
        patty.classList.remove("patty-toggle");
        bottomBun.classList.remove("bottom-bun-toggle");
    } 
    else {
        menu.classList.add("show-menu");
        topBunPhone.classList.add("top-bun-toggle");
        pattyPhone.classList.add("patty-toggle");
        bottomBunPhone.classList.add("bottom-bun-toggle");
        topBun.classList.add("top-bun-toggle");
        patty.classList.add("patty-toggle");
        bottomBun.classList.add("bottom-bun-toggle");
    }
}
function cartSlideIn() {
    console.log("hej")
    let basket: HTMLDivElement = document.getElementById("basket-menu-container") as HTMLDivElement;
    let cartOn: HTMLElement = document.getElementById("cart-on");
    let cartOff: HTMLElement = document.getElementById("cart-off");
    let cartOnMobile: HTMLElement = document.getElementById("cart-on-mobile")
    let cartOffMobile: HTMLElement = document.getElementById("cart-off-mobile")
    
    if (basket.classList.contains("show-basket")) {
        basket.classList.remove("show-basket");
        cartOn.classList.remove("cart-toggle")
        cartOff.classList.add("cart-toggle")
        cartOnMobile.classList.remove("cart-toggle")
        cartOffMobile.classList.add("cart-toggle")
    }
    else {
        basket.classList.add("show-basket");
        cartOn.classList.add("cart-toggle")
        cartOff.classList.remove("cart-toggle")
        cartOnMobile.classList.add("cart-toggle")
        cartOffMobile.classList.remove("cart-toggle")
    }
}