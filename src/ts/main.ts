window.onload = function (): void {};

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
