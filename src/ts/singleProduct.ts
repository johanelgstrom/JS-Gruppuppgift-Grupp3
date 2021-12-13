import {
    menuSlideIn,
    cartSlideIn,
    basketFunction,
} from "./burgerAndBasketFunctions";
import { Product } from "./models/Produkt";
import { IProduct } from "./models/IProduct";
import {
    createProductObjectsFromData,
    getProductById,
} from "./productFunctions";

let product: Product;

window.onload = function (): void {
    let mobileBurger: HTMLDivElement = document.getElementById(
        "burger-menu-phone"
    ) as HTMLDivElement;
    mobileBurger.addEventListener("click", menuSlideIn);
    let burger: HTMLDivElement = document.getElementById(
        "burger-menu"
    ) as HTMLDivElement;
    burger.addEventListener("click", menuSlideIn);

    let mobileCart: HTMLDivElement = document.getElementById(
        "cart-icon"
    ) as HTMLDivElement;
    mobileCart.addEventListener("click", cartSlideIn);
    let cart: HTMLDivElement = document.getElementById(
        "cart-container"
    ) as HTMLDivElement;
    cart.addEventListener("click", cartSlideIn);
    initialize();
    createElementForClickedProduct();
    createRelatedProducts();
};
basketFunction();

function initialize(): void {
    let storedProduct: IProduct = JSON.parse(
        sessionStorage.getItem("clicked-product")
    );

    product = new Product(
        storedProduct.id,
        storedProduct.name,
        storedProduct.imageUrl,
        storedProduct.price,
        storedProduct.description,
        storedProduct.categories,
        storedProduct.filters,
        storedProduct.isNew,
        storedProduct.isOnSale,
        storedProduct.related
    );

    console.log(product);
}

function createElementForClickedProduct(): void {
    // IMAGE //
    let imageContainer: HTMLDivElement = document.querySelector(
        ".product-image"
    ) as HTMLDivElement;

    let productImage: HTMLImageElement = document.createElement(
        "img"
    ) as HTMLImageElement;

    productImage.src = product.imageUrl[0];
    productImage.alt = "image";
    // TITLE //
    let titleContainer: HTMLDivElement = document.querySelector(
        ".product-title-container"
    ) as HTMLDivElement;

    let productTitle: HTMLHeadingElement = document.createElement(
        "h2"
    ) as HTMLHeadingElement;

    productTitle.innerHTML = product.name;

    // INFORMATION

    let informationContainer: HTMLDivElement = document.querySelector(
        ".product-information"
    ) as HTMLDivElement;

    let productInformation: HTMLSpanElement = document.createElement(
        "span"
    ) as HTMLSpanElement;

    productInformation.innerHTML = product.description;

    // APPENDS //

    informationContainer.appendChild(productInformation);
    titleContainer.appendChild(productTitle);
    imageContainer.appendChild(productImage);
}

function createRelatedProducts(): void {
    let allProducts: Product[] = createProductObjectsFromData();
    for (let index = 0; index < product.related.length; index++) {
        let relatedProduct: Product = getProductById(
            product.related[index],
            allProducts
        )[0];

        // PRODUCT CONTAINER //
        let relatedProductContainer: HTMLDivElement = document.querySelector(
            ".product-similiar-product"
        ) as HTMLDivElement;

        let relatedItem: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        relatedItem.className = "product-similiar-item";

        // PRODUCT IMAGE //
        let imageContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        imageContainer.className = "image-container";

        let relatedImage: HTMLImageElement = document.createElement(
            "img"
        ) as HTMLImageElement;
        relatedImage.className = "image-container";
        relatedImage.src = relatedProduct.imageUrl[0];
        relatedImage.alt = "image";

        // PRODUCT TITLE //

        let titleContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        titleContainer.className = "title-container";

        let productTitle: HTMLSpanElement = document.createElement(
            "span"
        ) as HTMLSpanElement;

        productTitle.innerHTML = relatedProduct.name;

        // PRODUCT PRICE //
        let priceContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        priceContainer.className = "price-container";
        let currencyText: HTMLSpanElement = document.createElement(
            "span"
        ) as HTMLSpanElement;
        currencyText.innerHTML = "kr";
        let productPrice: HTMLSpanElement = document.createElement(
            "span"
        ) as HTMLSpanElement;
        productPrice.innerHTML = relatedProduct.price.toString();

        // SHOPPING BAG //

        let shoppingContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        shoppingContainer.className = "shopping-container";
        let shoppingIcon: HTMLLIElement = document.createElement(
            "i"
        ) as HTMLLIElement;
        shoppingIcon.className = "fas fa-shopping-bag";
        let shoppingButton: HTMLButtonElement = document.createElement(
            "button"
        ) as HTMLButtonElement;
        shoppingButton.type = "button";
        shoppingButton.id = "add-to-cart";

        // APPENDS //
        imageContainer.appendChild(relatedImage);
        relatedItem.appendChild(imageContainer);
        titleContainer.appendChild(productTitle);
        relatedItem.appendChild(titleContainer);
        priceContainer.appendChild(productPrice);
        priceContainer.appendChild(currencyText);
        relatedItem.appendChild(priceContainer);
        shoppingButton.appendChild(shoppingIcon);
        shoppingContainer.appendChild(shoppingButton);
        relatedItem.appendChild(shoppingContainer);
        relatedProductContainer.appendChild(relatedItem);
        console.log(relatedProduct);
    }
}
