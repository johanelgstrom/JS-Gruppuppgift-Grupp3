import { Customer } from "./models/customer";
import { allProducts, addProductToCart, getCartIds } from "./main";
import { createProductObjectsFromData, Product } from "./models/produkt";

window.onload = function () {
    initialize();

    // TEMPORARY
    addProductToCart(allProducts[0]);
    addProductToCart(allProducts[10]);
    addProductToCart(allProducts[10]);
    //console.log("CART IDS: ", getCartIds());
};

function initialize(): void {
    document.getElementById("pay-button").addEventListener("click", () => {
        payOrder();
    });

    let form: HTMLFormElement = document.getElementById(
        "input-container"
    ) as HTMLFormElement;

    form.addEventListener("submit", (e: Event) => {
        setTimeout(triggerBuy, 3000);
        e.preventDefault();
    });
}

function payOrder() {
    let button: HTMLButtonElement = document.getElementById(
        "pay-button"
    ) as HTMLButtonElement;

    let i: HTMLElement = document.createElement("i");
    i.className = "fas fa-spinner rotating";
    button.innerHTML = "";
    button.appendChild(i);
}

function triggerBuy(): void {
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
    let regionInput: HTMLInputElement = document.getElementById(
        "customer-region"
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
        regionInput.value,
        deliveryInput[deliveryInput.selectedIndex].innerText,
        parseInt(cardNumberInput.value),
        parseInt(cardCvcInput.value)
    );

    sessionStorage.setItem("customer", JSON.stringify(customer));

    let targetUrl: string = window.location.host + "/pages/receipt.html";
    console.log(targetUrl);
    window.location.href = targetUrl;
}
