import {
    basketFunction,
    cartSlideIn,
    menuSlideIn,
} from "./burgerAndBasketFunctions";
import { CartItem } from "./models/CartItem";
import { Customer } from "./models/Customer";
import { Product } from "./models/Produkt";
import {
    createProductObjectsFromData,
    getFilteredProducts,
    getNewProducts,
    getSaleProducts,
} from "./productFunctions";
import { search } from "./search";
import { sortProductsBy, Sort } from "./sorting";

let allProducts: Product[] = [];
let currentProducts: Product[] = [];

window.onload = function () {
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
    allProducts = createProductObjectsFromData();
    currentProducts = allProducts;
    createElementForProducts(allProducts);
    createNewsProducts(allProducts);
    createCampaignProducts(allProducts);
    createProductFilter();
    initialize();
    basketFunction();
};

function initialize(): void {
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

    let filterContainer: HTMLDivElement = document.querySelector(
        ".filter-container"
    ) as HTMLDivElement;

    let exitButton: HTMLButtonElement = document.querySelector(
        ".cross-button"
    ) as HTMLButtonElement;
    exitButton.addEventListener("click", () => {
        filterContainer.style.display = "none";
    });

    let userInputTag: HTMLInputElement = document.getElementById(
        "product-search"
    ) as HTMLInputElement;

    userInputTag.addEventListener("keydown", () => {
        runSearch(userInputTag);
    });

    let secondUserInputTag: HTMLInputElement = document.getElementById(
        "second-product-search"
    ) as HTMLInputElement;

    secondUserInputTag.addEventListener("keyup", () => {
        runSearch(secondUserInputTag);
    });

    let userChoiceTag: HTMLSelectElement = document.getElementById(
        "categories"
    ) as HTMLSelectElement;
    createElementForProducts(
        sortProductsBy(Sort.PRICE_ASCENDING, currentProducts)
    );

    userChoiceTag.addEventListener("change", () => {
        let value: number = parseInt(
            userChoiceTag.options[userChoiceTag.selectedIndex].value
        );

        if (value == 1) {
            let categorizedProducts: Product[] = sortProductsBy(
                Sort.PRICE_ASCENDING,
                currentProducts
            );
            createElementForProducts(categorizedProducts);
        }
        if (value == 2) {
            let categorizedProducts: Product[] = sortProductsBy(
                Sort.PRICE_DECENDING,
                currentProducts
            );
            createElementForProducts(categorizedProducts);
        }
        if (value == 3) {
            let categorizedProducts: Product[] = sortProductsBy(
                Sort.NAME_ALPHABETIC,
                currentProducts
            );
            createElementForProducts(categorizedProducts);
        }
        if (value == 4) {
            let categorizedProducts: Product[] = sortProductsBy(
                Sort.NAME_ALPHABETIC_REVERSE,
                currentProducts
            );
            createElementForProducts(categorizedProducts);
        }
    });
}

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
        productItem.className = "product-item";
        productItem.addEventListener("click", () => {
            goToProductPage(productPool[index]);
        });

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
        shoppingButton.addEventListener("click", () => {
            let customer: Customer = Customer.prototype.getCustomer();

            customer.addProductToCart(productPool[index]);
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
        productContainer.appendChild(productItem);
    }
}

function createNewsProducts(productPool: Product[]): void {
    let newsContainer: HTMLDivElement = document.querySelector(
        ".news-container"
    ) as HTMLDivElement;
    newsContainer.innerHTML = "";

    let newProducts: Product[] = getNewProducts(allProducts);

    for (let index = 0; index < newProducts.length; index++) {
        let product: Product = newProducts[index];

        // PRODUCT ITEM //
        let productItem: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        productItem.className = "new-item";
        productItem.addEventListener("click", () => {
            goToProductPage(newProducts[index]);
        });

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
        shoppingButton.addEventListener("click", () => {
            let customer: Customer = Customer.prototype.getCustomer();

            customer.addProductToCart(productPool[index]);
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
        newsContainer.appendChild(productItem);
    }
}

function createCampaignProducts(productPool: Product[]): void {
    let campaignContainer: HTMLDivElement = document.querySelector(
        ".campaigns-container"
    ) as HTMLDivElement;
    campaignContainer.innerHTML = "";

    let campaignProducts: Product[] = getSaleProducts(allProducts);

    for (let index = 0; index < campaignProducts.length; index++) {
        let product: Product = campaignProducts[index];

        // PRODUCT ITEM //
        let productItem: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        productItem.className = "campaign-item";
        productItem.addEventListener("click", () => {
            goToProductPage(campaignProducts[index]);
        });

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
        shoppingButton.addEventListener("click", () => {
            let customer: Customer = Customer.prototype.getCustomer();

            customer.addProductToCart(productPool[index]);
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
        campaignContainer.appendChild(productItem);
    }
}

// GOING TO PRODUCT-PAGE //
function goToProductPage(clickedProduct: Product) {
    sessionStorage.setItem("clicked-product", JSON.stringify(clickedProduct));
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

function runFilter(filters: string[], isFromSearch: boolean = false): void {
    if (isFromSearch == false) {
        let secondUserInputTag: HTMLInputElement = document.getElementById(
            "second-product-search"
        ) as HTMLInputElement;
        runSearch(secondUserInputTag, true);
        currentProducts = getFilteredProducts(filters, currentProducts);
    } else {
        currentProducts = getFilteredProducts(filters, allProducts);
    }

    createElementForProducts(currentProducts);
}

// FILTER ###########
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

function runSearch(whichTag: HTMLInputElement, isFromFilter: boolean = false) {
    if (isFromFilter == false) {
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

        let filter: string[] = [];
        if (firstCategory.checked) {
            filter.push(firstCategory.value);
        }
        if (secondCategory.checked) {
            filter.push(secondCategory.value);
        }
        if (thirdCategory.checked) {
            filter.push(thirdCategory.value);
        }
        if (fourthCategory.checked) {
            filter.push(fourthCategory.value);
        }

        runFilter(filter, true);
        let foundProducts: Product[] = search(whichTag.value, currentProducts);
        createElementForProducts(foundProducts);
    } else {
        let foundProducts2: Product[] = search(whichTag.value, allProducts);
        createElementForProducts(foundProducts2);
    }

    if (whichTag.value == "") {
        currentProducts = allProducts;
    }

    //console.log("Current products:", currentProducts);
}
