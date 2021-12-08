import {
    Product,
    createProductObjectsFromData,
    getFilteredProducts,
    getCategoryProducts,
    getProductById,
} from "./models/produkt";

import { Sort, sortProductsBy } from "./sorting";

//This is the array of Product that contains all the product objects
//from the "products-data.json" file. This is the starting pool for all
//searches.
export let allProducts: Product[] = createProductObjectsFromData();
//The cart is a 2 dimentional array. (a list of a list of numbers).
//The first number is the id of the product, second number is quantity.
//EX;
// [
//  [1,2],      id = 1, quantity = 2
//  [10,5]      id = 10, quantity = 5
// ]
let cart: number[][] = [];

window.onload = function (): void {
    runTests();
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
// Meny, gör så att menyn kommer in/ut, även animering för ikonen
// Om din sida har en hamburgarmeny, importera denna
export function menuSlideIn() {
    let menu: HTMLDivElement = document.getElementById(
        "menu-container"
    ) as HTMLDivElement;
    let topBunPhone: HTMLDivElement = document.getElementById(
        "top-bun-phone"
    ) as HTMLDivElement;
    let pattyPhone: HTMLDivElement = document.getElementById(
        "patty-phone"
    ) as HTMLDivElement;
    let bottomBunPhone: HTMLDivElement = document.getElementById(
        "bottom-bun-phone"
    ) as HTMLDivElement;
    let topBun: HTMLDivElement = document.getElementById(
        "top-bun"
    ) as HTMLDivElement;
    let patty: HTMLDivElement = document.getElementById(
        "patty"
    ) as HTMLDivElement;
    let bottomBun: HTMLDivElement = document.getElementById(
        "bottom-bun"
    ) as HTMLDivElement;

    if (menu.classList.contains("show-menu")) {
        menu.classList.remove("show-menu");
        topBunPhone.classList.remove("top-bun-toggle");
        pattyPhone.classList.remove("patty-toggle");
        bottomBunPhone.classList.remove("bottom-bun-toggle");
        topBun.classList.remove("top-bun-toggle");
        patty.classList.remove("patty-toggle");
        bottomBun.classList.remove("bottom-bun-toggle");
    } else {
        menu.classList.add("show-menu");
        topBunPhone.classList.add("top-bun-toggle");
        pattyPhone.classList.add("patty-toggle");
        bottomBunPhone.classList.add("bottom-bun-toggle");
        topBun.classList.add("top-bun-toggle");
        patty.classList.add("patty-toggle");
        bottomBun.classList.add("bottom-bun-toggle");
    }
}
// Varukorg, gör så att varukorgen kommer in/ut, även viss animering för ikonerna
// Om din sida har en varukorg, importera denna
export function cartSlideIn() {
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

export function storeCartIds(): void {
    let recalculatedCart: number[][] = [];
    cart.forEach((cartItem: number[]) => {
        if (cartItem[1] > 0) {
            let item: number[] = [];
            item.push(cartItem[0]); // ID
            item.push(cartItem[1]); // Quantity
            recalculatedCart.push(item);
        }
    });
    localStorage.setItem("cart", JSON.stringify(recalculatedCart));
}

export function getCartIds(): number[][] {
    return JSON.parse(localStorage.getItem("cart"));
}

export function addProductToCart(product: Product): void {
    for (let pIndex = 0; pIndex < cart.length; pIndex++) {
        if (cart[pIndex][0] == product.id) {
            // The product is already in cart.
            cart[pIndex][1] += 1;
            storeCartIds();
            return;
        }
    }

    //If we reach this code line, it means we didnt have the item in the cart.
    let newCartItem: number[] = [];
    newCartItem.push(product.id);
    newCartItem.push(1);
    cart.push(newCartItem);
    storeCartIds();
}

export function removeProductFromCart(product: Product): void {
    for (let pIndex = 0; pIndex < cart.length; pIndex++) {
        if (cart[pIndex][0] == product.id) {
            // The product is already in cart.
            cart[pIndex][1] -= 1;
            storeCartIds();
            return;
        }
    }
    //If we reach this code line, it means we didnt have the product in the cart.
}

export function getProductObjectsFromCart(): Product[] {
    let answer: Product[] = [];
    allProducts.forEach((p: Product) => {
        //console.log("PRODUCT: ", p);
        getCartIds().forEach((cartItem: number[]) => {
            if (cartItem[0] == p.id) {
                answer.push(p);
            }
        });
    });
    return answer;
}

