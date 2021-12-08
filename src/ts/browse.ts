import {
    Product,
    createProductObjectsFromData,
    getFilteredProducts,
    getCategoryProducts,
    getProductById,
} from "./models/produkt";

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

        // PRODUCT CONTAINER //
        let productContainer: HTMLDivElement = document.querySelector(
            ".products-container"
        ) as HTMLDivElement;

        // PRODUCT ITEM //
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
        let productName: HTMLSpanElement = document.createElement(
            "span"
        ) as HTMLSpanElement;
        titleContainer.className = "title-container";
        productName.innerHTML = product.name;

        // PRODUCT PRICE //
        let priceContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        let currencyText: HTMLSpanElement = document.createElement(
            "span"
        ) as HTMLSpanElement;
        let productPrice: HTMLSpanElement = document.createElement(
            "span"
        ) as HTMLSpanElement;
        priceContainer.className = "price-container";
        currencyText.innerHTML = "kr";
        productPrice.innerHTML = product.price.toString();

        // APPENDS //
        imageContainer.appendChild(productImage);
        productItem.appendChild(imageContainer);
        titleContainer.appendChild(productName);
        productItem.appendChild(titleContainer);
        priceContainer.appendChild(productPrice);
        priceContainer.appendChild(currencyText);
        productItem.appendChild(priceContainer);
        productContainer.appendChild(productItem);
    }
}
