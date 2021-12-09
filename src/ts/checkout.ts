import { CartItem } from "./models/CartItem";
import { Customer } from "./models/Customer";
import { Product, createProductObjectsFromData } from "./models/produkt";

window.onload = function () {
    initialize();

    // TEMPORARY

    let allProducts: Product[] = createProductObjectsFromData();
    let cust: Customer = Customer.prototype.getCustomer();
    console.log("CUSTOMER: ", cust);
    //cust.addProductToCart(allProducts[0]);

    // addProductToCart(allProducts[10]);
    // addProductToCart(allProducts[26]);
    //console.log("CART IDS: ", getCartIds());

    renderHTML();
};

function initialize(): void {
    document.getElementById("pay-button").addEventListener("click", () => {});

    let form: HTMLFormElement = document.getElementById(
        "input-container"
    ) as HTMLFormElement;

    form.addEventListener("submit", (e: Event) => {
        runLoadingButton();
        setTimeout(triggerBuy, 3000);
        e.preventDefault();
    });
}

function renderHTML(): void {
    let customer: Customer = Customer.prototype.getCustomer();
    let totalCost: number = 0;

    let basketContainer: HTMLDivElement = document.getElementById(
        "basket-inner-wrapper"
    ) as HTMLDivElement;
    basketContainer.innerHTML = "";

    customer.cart.forEach((cartItem: CartItem) => {
        //Product wrapper
        let productDiv: HTMLDivElement = document.createElement("div");
        productDiv.className = "product";

        //Product image
        let imgDiv: HTMLDivElement = document.createElement("div");
        imgDiv.className = "product-image";
        let img: HTMLImageElement = document.createElement("img");
        img.src = cartItem.product.imageUrl[0];
        imgDiv.appendChild(img);
        productDiv.appendChild(imgDiv);

        //Product info ################################
        let infoDiv: HTMLDivElement = document.createElement("div");
        infoDiv.className = "product-info";

        //Text
        let textDiv: HTMLDivElement = document.createElement("div");
        textDiv.className = "product-text";
        let name: HTMLParagraphElement = document.createElement("p");
        let price: HTMLParagraphElement = document.createElement("p");
        let quantity: HTMLParagraphElement = document.createElement("p");
        name.innerText = cartItem.product.name;
        price.innerText = "Pris: " + cartItem.product.price.toString() + "kr";
        quantity.innerText = "Antal: " + cartItem.quantity.toString();
        textDiv.appendChild(name);
        textDiv.appendChild(price);
        textDiv.appendChild(quantity);
        infoDiv.appendChild(textDiv);

        //Product action buttons
        let actionDiv: HTMLDivElement = document.createElement("div");
        actionDiv.className = "product-actions";
        let addButton: HTMLButtonElement = document.createElement("button");
        addButton.innerText = "+";
        addButton.addEventListener("click", () => {
            customer.addProductToCart(cartItem.product);
            renderHTML();
        });
        actionDiv.appendChild(addButton);
        let removeButton: HTMLButtonElement = document.createElement("button");
        removeButton.innerText = "-";
        removeButton.addEventListener("click", () => {
            customer.removeProductFromCart(cartItem.product);
            renderHTML();
        });
        actionDiv.appendChild(removeButton);
        infoDiv.appendChild(actionDiv);

        //Add info###########################################
        productDiv.appendChild(infoDiv);

        //Add the finished product to html
        basketContainer.appendChild(productDiv);

        totalCost += cartItem.product.price * cartItem.quantity;
    });

    document.getElementById("total-cost").innerHTML =
        "Total: " + totalCost.toString() + "kr";
}

function runLoadingButton(): void {
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

    let customer: Customer = Customer.prototype.getCustomer();
    customer.firstname = firstNameInput.value;
    customer.lastname = lastNameInput.value;
    customer.mobile = mobileInput.value;
    customer.adress = adressInput.value;
    customer.region = regionInput.value;
    customer.delivery = deliveryInput.value;
    customer.cardNumber = parseInt(cardNumberInput.value);
    customer.cardCvc = parseInt(cardCvcInput.value);

    customer.storeCustomer();

    let targetUrl: string = "receipt.html";
    console.log(targetUrl);
    window.location.replace(targetUrl);
}
