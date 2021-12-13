import { menuSlideIn, cartSlideIn, basketFunction } from "./burgerAndBasketFunctions";
window.onload = function (): void {
    let mobileBurger: HTMLDivElement = document.getElementById(
        "burger-menu-phone"
    ) as HTMLDivElement;
    mobileBurger.addEventListener("click", menuSlideIn);
    let burger: HTMLDivElement = document.getElementById(
        "burger-menu"
    ) as HTMLDivElement;
    burger.addEventListener("click", menuSlideIn);

    let mobileCart: HTMLDivElement = document.getElementById("cart-icon") as HTMLDivElement;
    mobileCart.addEventListener("click", cartSlideIn);
    let cart: HTMLDivElement = document.getElementById("cart-container") as HTMLDivElement;
    cart.addEventListener("click", cartSlideIn);
    basketFunction();
};
