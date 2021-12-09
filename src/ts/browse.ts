import { CartItem } from "./models/CartItem";
import { Customer } from "./models/Customer";
import {
    Product,
    createProductObjectsFromData,
    getFilteredProducts,
    getCategoryProducts,
    getProductById,
} from "./models/Produkt";

window.onload = function () {
    createElementForProducts();
    getProductsSessionStorage();
};

function getProductsSessionStorage(): void {
    let products: Product[] = createProductObjectsFromData();

    let productsLocalStorage: string = JSON.stringify(products);
    sessionStorage.setItem("browse", productsLocalStorage);
}

function createElementForProducts() {
    let allProducts: Product[] = createProductObjectsFromData();

    for (let index: number = 0; index < allProducts.length; index++) {
        let product: Product = allProducts[index];

        // PRODUCT ITEM //
        let productContainer: HTMLDivElement = document.querySelector(
            ".products-container"
        ) as HTMLDivElement;
        let productItem: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        productItem.className = "product-item";

        // PRODUCT IMAGE //
        let imageContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        imageContainer.className = "image-container";
        let productImage: HTMLImageElement = document.createElement(
            "img"
        ) as HTMLImageElement;
        productImage.src = product.imageUrl[0];
        productImage.alt = "Image";

        // PRODUCT TITLE //
        let titleContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        titleContainer.className = "title-container";
        let productName: HTMLSpanElement = document.createElement(
            "span"
        ) as HTMLSpanElement;
        productName.innerHTML = product.name;

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
        productPrice.innerHTML = product.price.toString();

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
        imageContainer.appendChild(productImage);
        productItem.appendChild(imageContainer);
        titleContainer.appendChild(productName);
        productItem.appendChild(titleContainer);
        priceContainer.appendChild(productPrice);
        priceContainer.appendChild(currencyText);
        productItem.appendChild(priceContainer);
        shoppingButton.appendChild(shoppingIcon);
        shoppingContainer.appendChild(shoppingButton);
        productItem.appendChild(shoppingContainer);
        productContainer.appendChild(productItem);
    }
}
