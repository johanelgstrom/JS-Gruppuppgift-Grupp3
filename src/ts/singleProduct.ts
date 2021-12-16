// Made by: Filip Engberg & Elias Fredriksson

import {
    basketFunction,
    menuAndBasketTrigger,
} from "./burgerAndBasketFunctions";
import { Product } from "./models/Product";
import { IProduct } from "./models/IProduct";
import {
    createProductObjectsFromData,
    getProductById,
} from "./productFunctions";
import { Customer } from "./models/Customer";

let product: Product;

window.onload = function (): void {
    menuAndBasketTrigger();
    initialize();
    createElementForClickedProduct();
    createRelatedProducts();
    basketFunction();
};

// MAIN FEATURES THAT START WHEN THE PAGE IS LOADING
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

    let addButton: HTMLButtonElement = document.getElementById(
        "add-button"
    ) as HTMLButtonElement;

    addButton.addEventListener("click", () => {
        let customer: Customer = Customer.prototype.getCustomer();
        let amountTag: HTMLSelectElement = document.getElementById(
            "count"
        ) as HTMLSelectElement;
        let value: number = parseInt(
            amountTag.options[amountTag.selectedIndex].value
        );
        for (let count = 0; count < value; count++) {
            customer.addProductToCart(product);
        }
        alert(
            "La till " + value + "st " + product.name + " till din varukorg."
        );
        basketFunction();
    });

    let backButton: HTMLLIElement = document.getElementById(
        "back-icon"
    ) as HTMLLIElement;

    backButton.addEventListener("click", () => {
        history.back();
    });
}

// CREATES ELEMENTS FOR A SPECIFIC PRODUCT
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

    // INFORMATION & PRICE

    let informationContainer: HTMLDivElement = document.querySelector(
        ".product-information"
    ) as HTMLDivElement;

    let productInformation: HTMLSpanElement = document.createElement(
        "span"
    ) as HTMLSpanElement;

    productInformation.innerHTML = product.description;

    let priceContainer: HTMLDivElement = document.createElement(
        "div"
    ) as HTMLDivElement;

    priceContainer.className = "price-container";

    let productPrice: HTMLHeadingElement = document.createElement(
        "h2"
    ) as HTMLHeadingElement;

    productPrice.innerHTML = JSON.stringify(product.price) + "kr";

    // APPENDS //

    priceContainer.appendChild(productPrice);
    informationContainer.appendChild(productInformation);
    informationContainer.appendChild(priceContainer);
    titleContainer.appendChild(productTitle);
    imageContainer.appendChild(productImage);
}

// CREATES ELEMENTS FOR PRODUCTS RELATED TO THE SPECIFIC PRODUCT
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
        imageContainer.addEventListener("click", () => {
            sessionStorage.setItem(
                "clicked-product",
                JSON.stringify(relatedProduct)
            );
            window.location.reload();
        });

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
        shoppingButton.addEventListener("click", () => {
            let customer: Customer = Customer.prototype.getCustomer();
            customer.addProductToCart(relatedProduct);
            basketFunction();
            alert(
                "La till " + relatedProduct.name.toString() + " i din varukorg."
            );
        });

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
    }
}
