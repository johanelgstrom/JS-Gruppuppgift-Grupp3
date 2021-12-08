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

        // PRODUCT TITLE //
        let productName: HTMLSpanElement = document.createElement(
            "span"
        ) as HTMLSpanElement;
        productName.innerHTML = product.name;

        // PRODUCT PRICE //
        let productPrice: HTMLSpanElement = document.createElement(
            "span"
        ) as HTMLSpanElement;
        productPrice.innerHTML = product.price.toString();

        // APPENDS //
        productContainer.appendChild(productItem);
        productItem.appendChild(imageContainer);
        imageContainer.appendChild(productImage);
        productItem.appendChild(productName);
        productItem.appendChild(productPrice);
    }
}
