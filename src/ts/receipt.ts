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
    document.getElementById("back-button").addEventListener("click", () => {
        window.location.replace("/");
    });
}

//Renders the customers cart items which they just purchased. Along with
//the customers credentials, ordernumber and deliverytime.
function renderHTML(): void {
    let customer: Customer = Customer.prototype.getCustomer();
    let totalCost: number = 0;

    let basketContainer: HTMLDivElement = document.getElementById(
        "basket-inner-wrapper"
    ) as HTMLDivElement;

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

        //Add info###########################################
        productDiv.appendChild(infoDiv);

        //Add the finished product to html
        basketContainer.appendChild(productDiv);

        totalCost += cartItem.product.price * cartItem.quantity;
    });

    document.getElementById("total-cost").innerText =
        "Total: " + totalCost.toString() + "kr";

    //sessionStorage.removeItem("customer");

    document.getElementById("fullname").innerText =
        customer.firstname + " " + customer.lastname;
    document.getElementById("email").innerText = customer.email;
    document.getElementById("adress").innerText = customer.adress;
    document.getElementById("region-code").innerText = customer.region;
    document.getElementById("card").innerText =
        customer.cardNumber + " (" + customer.cardCvc + ")";

    //This function generates a random order number every time the page is
    //refreshed. In real life this would be made is way so that there will
    //be no duplicates. And if the page is refreshed, we get the info via
    //the ordernumber. The ordernumber would the only thing remaining in the
    //session storage after refresh.
    let ordernumber: number = getRandomNumber();
    document.getElementById("order-number").innerText = ordernumber.toString();
    customer.ordernumbers.push(ordernumber);

    //We generate a new date every time the page is refreshed. In real life
    //this would not be the case. We would find the order via the ordernumber
    //by finding it in the current logged in users orders,
    //and get the date object via that.
    document.getElementById("date").innerText = createDateString(new Date());
    document.getElementById("delivery-time").innerText = "3 veckor";
}

//Creates and returns a random number. (Simple simulation
//of a random ordernumber).
function getRandomNumber(): number {
    return Math.round(
        (Math.random() * 10 +
            Math.random() * 100 +
            Math.random() * 1000 +
            Math.random() * 10000) /
            Math.random()
    );
}

//Creates a datestring based on the given Date object
//formatted according to UTC standard.
function createDateString(dateObject: Date): string {
    let date: string =
        padTo2Digits(dateObject.getUTCDate()) +
        "/" +
        padTo2Digits(dateObject.getUTCMonth() + 1) +
        "/" +
        padTo2Digits(dateObject.getFullYear());

    return date;
}

//Makes a number a string with minimun of 2 digits, where
//we fill with 0's before the number.
function padTo2Digits(num: number): string {
    return num.toString().padStart(2, "0");
}
