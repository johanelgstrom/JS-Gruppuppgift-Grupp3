import { CartItem } from "./models/CartItem";
import { Customer } from "./models/customer";
import { Product } from "./models/Product";
import { createProductObjectsFromData } from "./productFunctions";

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
    let basket: HTMLDivElement = document.getElementById(
        "basket-menu-container"
    ) as HTMLDivElement;
    let cartOn: HTMLElement = document.getElementById("cart-on");
    let cartOff: HTMLElement = document.getElementById("cart-off");
    let cartOnMobile: HTMLElement = document.getElementById("cart-on-mobile");
    let cartOffMobile: HTMLElement = document.getElementById("cart-off-mobile");

    if (basket.classList.contains("show-basket")) {
        basket.classList.remove("show-basket");
        cartOn.classList.remove("cart-toggle");
        cartOff.classList.add("cart-toggle");
        cartOnMobile.classList.remove("cart-toggle");
        cartOffMobile.classList.add("cart-toggle");
    } else {
        basket.classList.add("show-basket");
        cartOn.classList.add("cart-toggle");
        cartOff.classList.remove("cart-toggle");
        cartOnMobile.classList.add("cart-toggle");
        cartOffMobile.classList.remove("cart-toggle");
    }
}

export function basketFunction() {
    let customer: Customer = Customer.prototype.getCustomer();
    let allProducts: Product[] = createProductObjectsFromData();

    document.getElementById("basket-container").innerHTML = "";
    document.getElementById("your-basket").innerHTML = "";

    let randomButton: HTMLButtonElement = document.querySelector(
        ".random-button"
    ) as HTMLButtonElement;
    if (randomButton != null) {
        randomButton.remove();
    }

    // Om varukorgen är tom, lägg till knapp som adderar slumpmässig produkt
    if (customer.cart.length === 0) {
        let yourBasketText: HTMLParagraphElement = document.getElementById(
            "your-basket"
        ) as HTMLParagraphElement;
        yourBasketText.innerHTML =
            "Beslutsångest? Tryck på knappen för att lägga till en slumpmässig artikel i varukorgen.";
        let basketTextAndItem: HTMLDivElement = document.getElementById(
            "basket-text-and-item"
        ) as HTMLDivElement;
        let randomButton: HTMLButtonElement = document.createElement("button");
        randomButton.innerHTML = "Lägg till";
        randomButton.classList.add("random-button");
        basketTextAndItem.appendChild(randomButton);
        randomButton.addEventListener("click", () => {
            let i: number = Math.floor(Math.random() * 35);
            customer.addProductToCart(allProducts[i]);
            yourBasketText.innerHTML = "Din varukorg";
            randomButton.remove();
            basketFunction();
        });
    }
    // annars, skapa html för alla artiklar som ligger i sessionstorage
    else {
        let totalNum: number = 0;
        document.getElementById("your-basket").innerHTML = "Din varukorg";
        let basketContainer: HTMLDivElement = document.getElementById(
            "basket-container"
        ) as HTMLDivElement;
        let basketTotalAndButton: HTMLDivElement =
            document.createElement("div");
        basketTotalAndButton.classList.add("basket-total-and-button");
        let h3Total: HTMLHeadElement = document.createElement("h3");
        let continueButton: HTMLButtonElement =
            document.createElement("button");
        continueButton.innerHTML = "Fortsätt till kassan";
        let linkToCheckout: HTMLAnchorElement = document.createElement("a");
        linkToCheckout.href = "/pages/checkout.html";

        customer.cart.forEach((cartItem: CartItem) => {
            let quantity: number = cartItem.quantity;
            let quantityNum = quantity.toString();
            let itemContainer: HTMLDivElement = document.createElement("div");
            itemContainer.classList.add("item-container");
            // BILD
            let itemPictureContainer: HTMLDivElement =
                document.createElement("div");
            itemPictureContainer.classList.add("item-picture");

            let itemPicture: HTMLImageElement = document.createElement("img");
            itemPicture.src = cartItem.product.imageUrl[0] as unknown as string;
            itemPicture.alt = cartItem.product.name;

            // INFO OCH KNAPPAR
            let itemInfoAndButtons: HTMLDivElement =
                document.createElement("div");
            itemInfoAndButtons.classList.add("item-info-and-buttons");

            let itemInfo: HTMLDivElement = document.createElement("div");
            itemInfo.classList.add("item-info");

            let pName: HTMLParagraphElement = document.createElement("p");
            pName.innerHTML = cartItem.product.name;
            let pPrice: HTMLParagraphElement = document.createElement("p");
            pPrice.innerHTML = "Pris: " + cartItem.product.price + "kr";
            let pAmount: HTMLParagraphElement = document.createElement("p");
            pAmount.innerHTML = "Antal: " + quantityNum;
            let pTotal: HTMLParagraphElement = document.createElement("p");
            let productTotalAmount: number = cartItem.product.price * quantity;
            pTotal.innerHTML = "Totalt: " + productTotalAmount + "kr";
            totalNum += productTotalAmount;

            let itemButtonContainer: HTMLDivElement =
                document.createElement("div");
            itemButtonContainer.classList.add("item-buttons");

            let plusButton: HTMLButtonElement =
                document.createElement("button");
            plusButton.innerHTML = "+";
            //Adderar +1 på antal
            plusButton.addEventListener("click", () => {
                customer.addProductToCart(cartItem.product);
                quantity++;
                pAmount.innerHTML = "Antal: " + quantity;
                pTotal.innerHTML =
                    "Totalt: " + cartItem.product.price * quantity + "kr";
                totalNum += cartItem.product.price;
                calculateTotalNum();
            });
            let minusButton: HTMLButtonElement =
                document.createElement("button");
            minusButton.innerHTML = "-";
            // Subtraherar -1 på antal, om det endast finns 1, ta bort produkten
            minusButton.addEventListener("click", () => {
                if (quantity > 1) {
                    customer.removeProductFromCart(cartItem.product);
                    quantity--;
                    pAmount.innerHTML = "Antal: " + quantity;
                    pTotal.innerHTML =
                        "Totalt: " + cartItem.product.price * quantity + "kr";
                    totalNum -= cartItem.product.price;
                    calculateTotalNum();
                } else {
                    if (
                        confirm(
                            "Är du saker att du vill ta bort denna onormala grej från varukorgen?"
                        )
                    ) {
                        customer.removeProductFromCart(cartItem.product);
                        itemContainer.remove();
                        totalNum -= cartItem.product.price;
                        calculateTotalNum();
                    }
                }
            });

            basketContainer.appendChild(itemContainer);

            itemContainer.appendChild(itemPictureContainer);
            itemPictureContainer.appendChild(itemPicture);

            itemContainer.appendChild(itemInfoAndButtons);
            itemInfoAndButtons.appendChild(itemInfo);
            itemInfo.appendChild(pName);
            itemInfo.appendChild(pPrice);
            itemInfo.appendChild(pAmount);
            itemInfo.appendChild(pTotal);

            itemInfoAndButtons.appendChild(itemButtonContainer);
            itemButtonContainer.appendChild(plusButton);
            itemButtonContainer.appendChild(minusButton);
        });
        calculateTotalNum();

        function calculateTotalNum() {
            if (totalNum > 0) {
                h3Total.innerHTML = "Totalt: " + totalNum + "kr";
            } else {
                continueButton.remove();
                basketTotalAndButton.remove();
                h3Total.remove();
                addRandomItem();
            }
        }

        basketContainer.appendChild(basketTotalAndButton);
        basketTotalAndButton.appendChild(h3Total);
        basketTotalAndButton.appendChild(linkToCheckout);
        linkToCheckout.appendChild(continueButton);

        // Om kundvagnen hade en vara som togs bort, lägg till knapp som adderar slumpmässig produkt
        function addRandomItem() {
            let yourBasketText: HTMLParagraphElement = document.getElementById(
                "your-basket"
            ) as HTMLParagraphElement;
            yourBasketText.innerHTML =
                "Beslutsångest? Tryck på knappen för att lägga till en slumpmässig artikel i varukorgen ;)";
            let basketTextAndItem: HTMLDivElement = document.getElementById(
                "basket-text-and-item"
            ) as HTMLDivElement;
            let randomButton: HTMLButtonElement =
                document.createElement("button");
            basketTextAndItem.appendChild(randomButton);
            randomButton.innerHTML = "Lägg till";
            randomButton.classList.add("random-button");
            randomButton.addEventListener("click", () => {
                let i: number = Math.floor(Math.random() * 35);
                customer.addProductToCart(allProducts[i]);
                h3Total.remove();
                yourBasketText.innerHTML = "Din varukorg";
                randomButton.remove();
                basketFunction();
            });
        }
    }
}
