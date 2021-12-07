import { Customer } from "./models/customer";
import { getCartIds, getProductObjectsFromCart } from "./main";
import { Product } from "./models/produkt";

window.onload = function () {
    let customer: Customer = JSON.parse(sessionStorage.getItem("customer"));
    let cart: number[][] = getCartIds();
    let cartProducts: Product[] = getProductObjectsFromCart();
    console.log("CUSTOMER: ", customer);
    console.log("CART: ", cart, "\nCARTPRODUCTS: ", cartProducts);
};
