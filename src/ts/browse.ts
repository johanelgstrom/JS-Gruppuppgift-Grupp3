// Made by: Filip Engberg & Elias Fredriksson

import {
    basketFunction,
    cartSlideIn,
    menuSlideIn,
} from "./burgerAndBasketFunctions";
import { Customer } from "./models/Customer";
import { Product } from "./models/Product";
import {
    createProductObjectsFromData,
    getFilteredProducts,
    getNewProducts,
    getSaleProducts,
} from "./productFunctions";
import { search } from "./search";
import { sortProductsBy, Sort } from "./sorting";

let allProducts: Product[] = [];

window.onload = function () {
    burgerAndCartInitialize();
    allProducts = createProductObjectsFromData();
    createElementForProducts(allProducts);
    createNewsProducts(allProducts);
    createCampaignProducts(allProducts);
    createProductFilter();
    initialize();
    basketFunction();
};

// MENU AND CART FOR MOIBLE
function burgerAndCartInitialize(): void {
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

    document.getElementById("home-link").addEventListener("click", menuSlideIn);
    document.getElementById("news-link").addEventListener("click", menuSlideIn);
    document
        .getElementById("campaign-link")
        .addEventListener("click", menuSlideIn);
    document
        .getElementById("products-link")
        .addEventListener("click", menuSlideIn);
    document.getElementById("team-link").addEventListener("click", menuSlideIn);
}

// MAIN FEATURES THAT START WHEN THE PAGE IS LOADING
function initialize(): void {
    //FIRST
    let firstCategory: HTMLInputElement = document.getElementById(
        "onormal"
    ) as HTMLInputElement;
    firstCategory.addEventListener("click", () => {
        createElementForProducts(getCurrentPool());
    });

    //SECOND
    let secondCategory: HTMLInputElement = document.getElementById(
        "konstigt"
    ) as HTMLInputElement;
    secondCategory.addEventListener("click", () => {
        createElementForProducts(getCurrentPool());
    });

    //THIRD
    let thirdCategory: HTMLInputElement = document.getElementById(
        "jättekonstigt"
    ) as HTMLInputElement;
    thirdCategory.addEventListener("click", () => {
        createElementForProducts(getCurrentPool());
    });

    //FOURTH
    let fourthCategory: HTMLInputElement = document.getElementById(
        "vadihelavärlden"
    ) as HTMLInputElement;
    fourthCategory.addEventListener("click", () => {
        createElementForProducts(getCurrentPool());
    });

    let filterContainer: HTMLDivElement = document.querySelector(
        ".filter-container"
    ) as HTMLDivElement;

    //EXIT BUTTON
    let exitButton: HTMLButtonElement = document.querySelector(
        ".cross-button"
    ) as HTMLButtonElement;
    exitButton.addEventListener("click", () => {
        filterContainer.style.display = "none";
    });

    //IN FILTER SEARCH
    let secondUserInputTag: HTMLInputElement = document.getElementById(
        "second-product-search"
    ) as HTMLInputElement;
    secondUserInputTag.addEventListener("keyup", () => {
        createElementForProducts(getCurrentPool());
    });

    //CATEGORIES
    let userChoiceTag: HTMLSelectElement = document.getElementById(
        "categories"
    ) as HTMLSelectElement;
    createElementForProducts(
        sortProductsBy(Sort.PRICE_ASCENDING, getCurrentPool())
    );
    userChoiceTag.addEventListener("change", () => {
        createElementForProducts(getCurrentPool());
    });
}

// CREATES ALL PRODUCT ELEMENTS IN PRODUCTS
function createElementForProducts(productPool: Product[]): void {
    let productContainer: HTMLDivElement = document.querySelector(
        ".products-container"
    ) as HTMLDivElement;
    productContainer.innerHTML = "";

    for (let index: number = 0; index < productPool.length; index++) {
        let product: Product = productPool[index];
        let productItem: HTMLDivElement = createProductHTML(
            product,
            productPool,
            index
        );
        productContainer.appendChild(productItem);
    }
}

// CREATES ALL PRODUCT ELEMENTS IN NEWS
function createNewsProducts(productPool: Product[]): void {
    let newsContainer: HTMLDivElement = document.querySelector(
        ".news-container"
    ) as HTMLDivElement;
    newsContainer.innerHTML = "";

    let newProducts: Product[] = getNewProducts(allProducts);

    for (let index = 0; index < newProducts.length; index++) {
        let product: Product = newProducts[index];
        let productItem: HTMLDivElement = createProductHTML(
            product,
            newProducts,
            index
        );
        newsContainer.appendChild(productItem);
    }
}

// CREATES ALL PRODUCT ELEMENTS IN CAMPAIGNS
function createCampaignProducts(productPool: Product[]): void {
    let campaignContainer: HTMLDivElement = document.querySelector(
        ".campaigns-container"
    ) as HTMLDivElement;
    campaignContainer.innerHTML = "";

    let campaignProducts: Product[] = getSaleProducts(allProducts);

    for (let index = 0; index < campaignProducts.length; index++) {
        let product: Product = campaignProducts[index];
        let productItem: HTMLDivElement = createProductHTML(
            product,
            campaignProducts,
            index
        );
        campaignContainer.appendChild(productItem);
    }
}

// CREATING THE HTML FOR ALL PRODUCTS
function createProductHTML(
    product: Product,
    productPool: Product[],
    index: number
): HTMLDivElement {
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
    imageContainer.addEventListener("click", () => {
        goToProductPage(productPool[index]);
    });

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
    shoppingButton.addEventListener("click", () => {
        let customer: Customer = Customer.prototype.getCustomer();
        customer.addProductToCart(productPool[index]);
        basketFunction();
        alert(
            "La till " +
                productPool[index].name.toString() +
                " till din varukorg."
        );
    });

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

    return productItem;
}

// GOING TO PRODUCT-PAGE //
function goToProductPage(clickedProduct: Product) {
    sessionStorage.setItem("clicked-product", JSON.stringify(clickedProduct));
    window.location.href = "product.html";
}

// CREATING THE PRODUCT FILTER
function createProductFilter(): void {
    // FILTER BUTTON //
    let mainPart: HTMLLIElement = document.getElementById(
        "products-main"
    ) as HTMLLIElement;

    let filterButton: HTMLButtonElement = document.createElement(
        "button"
    ) as HTMLButtonElement;
    filterButton.type = "button";
    filterButton.className = "filter-button-hide";

    filterButton.addEventListener("click", triggerFilterWindow);

    let filterIcon: HTMLLIElement = document.createElement(
        "i"
    ) as HTMLLIElement;
    filterIcon.className = "fas fa-filter";

    filterButton.appendChild(filterIcon);
    mainPart.appendChild(filterButton);

    // The icon becomes visible when passing a certain value on the y-axis //
    let iconScrollFunc = function (): void {
        let y = window.scrollY;
        if (y >= 200) {
            filterButton.className = "filter-button-show";
        } else {
            filterButton.className = "filter-button-hide";
        }
    };
    window.addEventListener("scroll", iconScrollFunc);
}

// TRIGGER THE FILTER IN TABLET/MOBILE###########
function triggerFilterWindow() {
    let mainPart: HTMLLIElement = document.getElementById(
        "products-main"
    ) as HTMLLIElement;

    let filterContainer: HTMLDivElement = document.querySelector(
        ".filter-container"
    ) as HTMLDivElement;

    filterContainer.style.display = "flex";

    mainPart.appendChild(filterContainer);
}

// GET CURRENT POOL #######
function getCurrentPool(): Product[] {
    //FILTER
    let filters: string[] = [];
    let firstCategory: HTMLInputElement = document.getElementById(
        "onormal"
    ) as HTMLInputElement;
    let secondCategory: HTMLInputElement = document.getElementById(
        "konstigt"
    ) as HTMLInputElement;
    let thirdCategory: HTMLInputElement = document.getElementById(
        "jättekonstigt"
    ) as HTMLInputElement;
    let fourthCategory: HTMLInputElement = document.getElementById(
        "vadihelavärlden"
    ) as HTMLInputElement;
    if (firstCategory.checked) {
        filters.push(firstCategory.value);
    }
    if (secondCategory.checked) {
        filters.push(secondCategory.value);
    }
    if (thirdCategory.checked) {
        filters.push(thirdCategory.value);
    }
    if (fourthCategory.checked) {
        filters.push(fourthCategory.value);
    }

    let currentProducts: Product[] = getFilteredProducts(filters, allProducts);
    if (filters.length == 0) {
        currentProducts = allProducts;
    }

    //SEARCH
    let searchInputTag: HTMLInputElement = document.getElementById(
        "second-product-search"
    ) as HTMLInputElement;
    if (searchInputTag.value != "") {
        currentProducts = search(searchInputTag.value, currentProducts);
    }

    //SORTING
    let userChoiceTag: HTMLSelectElement = document.getElementById(
        "categories"
    ) as HTMLSelectElement;
    let whichSort: string =
        userChoiceTag.options[userChoiceTag.selectedIndex].value;
    let sortType: Sort;
    if (whichSort == "Stigande pris") {
        sortType = Sort.PRICE_ASCENDING;
    } else if (whichSort == "Sjunkande pris") {
        sortType = Sort.PRICE_DECENDING;
    } else if (whichSort == "Alfabetisk ordning") {
        sortType = Sort.NAME_ALPHABETIC;
    } else if (whichSort == "Omvänd alfabetisk ordning") {
        sortType = Sort.NAME_ALPHABETIC_REVERSE;
    }
    let finalProducts: Product[] = sortProductsBy(sortType, currentProducts);
    return finalProducts;
}
