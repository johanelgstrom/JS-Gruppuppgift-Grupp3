import { Customer } from "./models/customer";
import { allProducts, addProductToCart, getCartIds } from "./main";
import { createProductObjectsFromData, Product } from "./models/produkt";

window.onload = function () {
    initialize();

    // TEMPORARY
    addProductToCart(allProducts[0]);
    addProductToCart(allProducts[10]);
    addProductToCart(allProducts[10]);
    console.log("CART IDS: ", getCartIds());
};

function initialize(): void {
    document.getElementById("pay-button").addEventListener("click", () => {
        payOrder();
    });
}

function payOrder() {
    let firstNameInput: HTMLInputElement = document.getElementById(
        "customer-firstname"
    ) as HTMLInputElement;
    let lastNameInput: HTMLInputElement = document.getElementById(
        "customer-lastname"
    ) as HTMLInputElement;
    let mobileInput: HTMLInputElement = document.getElementById(
        "customer-mobile"
    ) as HTMLInputElement;
    let adressInput: HTMLInputElement = document.getElementById(
        "customer-adress"
    ) as HTMLInputElement;
    let deliveryInput: HTMLSelectElement = document.getElementById(
        "customer-delivery"
    ) as HTMLSelectElement;
    let cardNumberInput: HTMLInputElement = document.getElementById(
        "customer-card"
    ) as HTMLInputElement;
    let cardCvcInput: HTMLInputElement = document.getElementById(
        "customer-card-cvc"
    ) as HTMLInputElement;

    let customer: Customer = new Customer(
        firstNameInput.value,
        lastNameInput.value,
        mobileInput.value,
        adressInput.value,
        deliveryInput[deliveryInput.selectedIndex].innerText,
        parseInt(cardNumberInput.value),
        parseInt(cardCvcInput.value)
    );

    sessionStorage.setItem("customer", JSON.stringify(customer));
}
