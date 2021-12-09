import { cartSlideIn, getCartIds, getProductObjectsFromCart, menuSlideIn, addProductToCart, allProducts, removeProductFromCart } from "./main";
import { getProductById, Product } from "./models/produkt";
window.onload = function () {
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

}
addProductToCart(allProducts[18]);
addProductToCart(allProducts[24]);
// addProductToCart(allProducts[24]);
// addProductToCart(allProducts[29]);
// addProductToCart(allProducts[14]);
let cart: number[][] = getCartIds();
console.log(cart)
if (cart.length === 0) {
    console.log("den är tom");
    let yourBasketText: HTMLParagraphElement = document.getElementById("your-basket") as HTMLParagraphElement;
    yourBasketText.innerHTML = "Lägg till något onormalt i din varukorg innan du försöker gå till kassan ;)"
}
else {

    let cartProducts: Product[] = getProductObjectsFromCart();
console.log(cart)
    console.log(cartProducts)
    let totalNum : number = 0;

let basketContainer: HTMLDivElement = document.getElementById("basket-container") as HTMLDivElement;

let basketTotalAndButton: HTMLDivElement = document.createElement("div");
    let h3Total: HTMLHeadElement = document.createElement("h3");
    let continueButton: HTMLButtonElement = document.createElement("button");
    continueButton.innerHTML = "Fortsätt till kassan"
    let linkToCheckout: HTMLAnchorElement = document.createElement("a");
    linkToCheckout.href = "/pages/checkout.html"


cart.forEach((cartItem: number[]) => {
    let id: number = cartItem[0];
    let quantity: number = cartItem[1];

    let cartProduct: Product[] = getProductById(id, cartProducts);

    // console.log(id)
    // console.log(quantity)
    // console.log(cartProduct[0].name)
    // console.log(cartProduct[0].price)
    // console.log(cartProduct[0].imageUrl)
    let quantityNum = quantity.toString();
    // BILD
    let itemContainer: HTMLDivElement = document.createElement("div")
    itemContainer.classList.add("item-container");

    let itemPictureContainer: HTMLDivElement = document.createElement("div")
    itemPictureContainer.classList.add("item-picture")

    let itemPicture: HTMLImageElement = document.createElement("img");
    itemPicture.src = cartProduct[0].imageUrl as unknown as string;
    itemPicture.alt = cartProduct[0].name;

    // INFO OCH KNAPPAR
    let itemInfoAndButtons: HTMLDivElement = document.createElement("div");
    itemInfoAndButtons.classList.add("item-info-and-buttons");

    let itemInfo:HTMLDivElement = document.createElement("div");
    itemInfo.classList.add("item-info");

    let pName: HTMLParagraphElement = document.createElement("p");
    pName.innerHTML = cartProduct[0].name;
    let pPrice: HTMLParagraphElement = document.createElement("p");
    pPrice.innerHTML = "Pris: " + cartProduct[0].price + "kr";
    let pAmount: HTMLParagraphElement = document.createElement("p");
    pAmount.innerHTML = "Antal: " + quantityNum;
    let pTotal: HTMLParagraphElement = document.createElement("p");
    let productTotalAmount: number = cartProduct[0].price*quantity;
    pTotal.innerHTML = "Totalt: " + productTotalAmount + "kr";
    totalNum += productTotalAmount;
    console.log(productTotalAmount)
    console.log(totalNum)

    let itemButtonContainer: HTMLDivElement = document.createElement("div");
    itemButtonContainer.classList.add("item-buttons");

    let plusButton: HTMLButtonElement = document.createElement("button");
    plusButton.innerHTML = "+";
    plusButton.addEventListener("click", () => {
        addProductToCart(cartProduct[0]);
        quantity++
        pAmount.innerHTML = "Antal: " + quantity;
        pTotal.innerHTML = "Totalt: " + cartProduct[0].price*quantity + "kr";
        totalNum += cartProduct[0].price;
        calculateTotalNum();
        console.log(quantity)
    })
    let minusButton: HTMLButtonElement = document.createElement("button");
    minusButton.innerHTML = "-";
    minusButton.addEventListener("click", () => {
        if (quantity > 1) {
            removeProductFromCart(cartProduct[0])
            quantity--
            pAmount.innerHTML = "Antal: " + quantity;
        pTotal.innerHTML = "Totalt: " + cartProduct[0].price*quantity + "kr";
        totalNum -= cartProduct[0].price;
        calculateTotalNum();
        }
        else {
            if (confirm("Är du saker att du vill ta bort denna onormala grej från varukorgen?")) {
                removeProductFromCart(cartProduct[0])
                itemContainer.remove();
                totalNum -= cartProduct[0].price;
                calculateTotalNum();
                console.log(cart)
                let test = localStorage.getItem("cart")
                JSON.parse(test)
                console.log(test)
              }
            

        }
    })



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
})
console.log(totalNum)
calculateTotalNum()
    function calculateTotalNum() {
        if (totalNum > 0) {
            h3Total.innerHTML = "Total: " + (totalNum) + "kr"
        }
        else {
            continueButton.remove();
            h3Total.innerHTML = "Hoppsan Kerstin, du har visst tagit bort allt från varukorgen"
        }
        
    }

    


basketContainer.appendChild(basketTotalAndButton)
basketTotalAndButton.appendChild(h3Total)
basketTotalAndButton.appendChild(linkToCheckout)
linkToCheckout.appendChild(continueButton)
}




