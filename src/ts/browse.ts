import { basketFunction, cartSlideIn, menuSlideIn } from "./burgerAndBasketFunctions";
import { CartItem } from "./models/CartItem";
import { Customer } from "./models/Customer";
import { Product } from "./models/Produkt";
import {
    createProductObjectsFromData,
    getFilteredProducts,
} from "./productFunctions";

let allProducts: Product[] = [];

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
    // getProductsSessionStorage();
    allProducts = createProductObjectsFromData();
    createElementForProducts(allProducts);
    createProductFilter();
};
basketFunction();
// function getProductsSessionStorage(): void {
//     let products: Product[] = createProductObjectsFromData();

//     let productsLocalStorage: string = JSON.stringify(products);
//     sessionStorage.setItem("browse", productsLocalStorage);
// }

function createElementForProducts(productPool: Product[]): void {
    let productContainer: HTMLDivElement = document.querySelector(
        ".products-container"
    ) as HTMLDivElement;
    productContainer.innerHTML = "";

    for (let index: number = 0; index < productPool.length; index++) {
        let product: Product = productPool[index];

        // PRODUCT ITEM //
        let productItem: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        productItem.addEventListener("click", () => {
            goToProductPage();
        });
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
// GOING TO PRODUCT-PAGE //
function goToProductPage() {
    window.location.href = "product.html";
}

function createProductFilter(): void {
    // FILTER BUTTON //
    let mainPart: HTMLLIElement = document.getElementById(
        "products-main"
    ) as HTMLLIElement;

    let filterButton: HTMLButtonElement = document.createElement(
        "button"
    ) as HTMLButtonElement;
    filterButton.type = "button";

    filterButton.addEventListener("click", triggerFilterWindow);

    let filterIcon: HTMLLIElement = document.createElement(
        "i"
    ) as HTMLLIElement;
    filterIcon.className = "fas fa-filter";

    filterButton.appendChild(filterIcon);
    mainPart.appendChild(filterButton);

    // The icon becomes visible when passing a certain value on the y-axis //
    let myScrollFunc = function (): void {
        let y = window.scrollY;
        if (y >= 200) {
            filterButton.className = "filter-button-show";
        } else {
            filterButton.className = "filter-button-hide";
        }
    };
    window.addEventListener("scroll", myScrollFunc);

    // FILTER ###########
    function triggerFilterWindow() {
        let filterContainer: HTMLDivElement = document.querySelector(
            ".filter-container"
        ) as HTMLDivElement;

        filterContainer.style.display = "flex";

        let exitButton: HTMLButtonElement = document.querySelector(
            ".cross-button"
        ) as HTMLButtonElement;
        exitButton.addEventListener("click", () => {
            filterContainer.style.display = "none";
        });

        // FILTER FORM ####################################################################

        let filters: string[] = [];

        let firstCategory: HTMLInputElement = document.getElementById(
            "onormal"
        ) as HTMLInputElement;

        firstCategory.addEventListener("click", () => {
            if (firstCategory.checked) {
                filters.push(firstCategory.value);
                runFilter(filters);
            } else {
                if (filters.includes(firstCategory.value)) {
                    filters.splice(filters.indexOf(firstCategory.value), 1);
                    runFilter(filters);
                }
            }
        });

        let secondCategory: HTMLInputElement = document.getElementById(
            "konstigt"
        ) as HTMLInputElement;

        secondCategory.addEventListener("click", () => {
            if (secondCategory.checked) {
                filters.push(secondCategory.value);
                runFilter(filters);
            } else {
                if (filters.includes(secondCategory.value)) {
                    filters.splice(filters.indexOf(secondCategory.value), 1);
                    runFilter(filters);
                }
            }
        });

        let thirdCategory: HTMLInputElement = document.getElementById(
            "jättekonstigt"
        ) as HTMLInputElement;

        thirdCategory.addEventListener("click", () => {
            if (thirdCategory.checked) {
                filters.push(thirdCategory.value);
                runFilter(filters);
            } else {
                if (filters.includes(thirdCategory.value)) {
                    filters.splice(filters.indexOf(thirdCategory.value), 1);
                    runFilter(filters);
                }
            }
        });

        let fourthCategory: HTMLInputElement = document.getElementById(
            "vadihelavärlden"
        ) as HTMLInputElement;

        fourthCategory.addEventListener("click", () => {
            if (fourthCategory.checked) {
                filters.push(fourthCategory.value);
                runFilter(filters);
            } else {
                if (filters.includes(fourthCategory.value)) {
                    filters.splice(filters.indexOf(fourthCategory.value), 1);
                    runFilter(filters);
                }
            }
        });

        mainPart.appendChild(filterContainer);
    }
}

function runFilter(filters: string[]): void {
    let filterProducts: Product[] = getFilteredProducts(filters, allProducts);
    createElementForProducts(filterProducts);
}
