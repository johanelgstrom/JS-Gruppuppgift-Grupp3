// Made by: Elias Fredriksson
// Medieinstitutet FED21S

import { CartItem } from "./models/CartItem";
import { Customer } from "./models/Customer";

window.onload = function () {
    initialize();
    renderHTML();
};

//Initializes all eventlisteners.
function initialize(): void {
    let form: HTMLFormElement = document.getElementById(
        "input-container"
    ) as HTMLFormElement;
    form.addEventListener("submit", (e: Event) => {
        if (Customer.prototype.getCustomer().cart.length != 0) {
            runLoadingButton();
            setTimeout(triggerBuy, 3000);
        } else {
            alert("Du kan inte checka ut med en tom varukorg.");
        }
        e.preventDefault();
    });
}

//Renders all products in the customers cart to the screen and
//calculates the total cost.
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
            if (cartItem.quantity == 1) {
                let answer: boolean = confirm(
                    "S??ker du vill ta bort sista produkten?"
                );
                if (answer) {
                    customer.removeProductFromCart(cartItem.product);
                    renderHTML();
                }
            } else {
                customer.removeProductFromCart(cartItem.product);
                renderHTML();
            }
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

//Makes the button enter loading state.
function runLoadingButton(): void {
    let button: HTMLButtonElement = document.getElementById(
        "pay-button"
    ) as HTMLButtonElement;

    let i: HTMLElement = document.createElement("i");
    i.className = "fas fa-spinner rotating";
    button.innerHTML = "";
    button.appendChild(i);
}

//Fills in the customer object with credentials from the
//user and goes to the receipt page.
function triggerBuy(): void {
    let firstNameInput: HTMLInputElement = document.getElementById(
        "customer-firstname"
    ) as HTMLInputElement;
    let lastNameInput: HTMLInputElement = document.getElementById(
        "customer-lastname"
    ) as HTMLInputElement;
    let emailInput: HTMLInputElement = document.getElementById(
        "customer-email"
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
    customer.email = emailInput.value;
    customer.mobile = mobileInput.value;
    customer.adress = adressInput.value;
    customer.region = regionInput.value;
    customer.delivery = deliveryInput.value;
    customer.cardNumber = cardNumberInput.value;
    customer.cardCvc = cardCvcInput.value;

    customer.storeCustomer();

    window.location.replace("receipt.html");
}
