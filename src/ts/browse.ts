import { CartItem } from "./models/CartItem";
import { Customer } from "./models/Customer";
import { Product } from "./models/Produkt";
import {
    createProductObjectsFromData,
    getFilteredProducts,
} from "./productFunctions";

let allProducts: Product[] = [];

window.onload = function () {
    // getProductsSessionStorage();
    allProducts = createProductObjectsFromData();
    createElementForProducts(allProducts);
    createProductFilter();
};

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

    filterButton.addEventListener("click", createFilterWindow);

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
    function createFilterWindow() {
        let filterContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        filterContainer.id = "loading";
        filterContainer.className = "filter-container";

        // FILTER HEADER ####################################################################

        let filterHeader: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        filterHeader.className = "filter-header";

        // FILTER HEADER BUTTONS ####################################################################

        let filterButtonContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        filterButtonContainer.className = "filter-button-container";

        let filterLogo: HTMLLIElement = document.createElement(
            "i"
        ) as HTMLLIElement;
        filterLogo.className = "fas fa-filter";

        let crossButton: HTMLButtonElement = document.createElement(
            "button"
        ) as HTMLButtonElement;
        crossButton.className = "cross-button";
        crossButton.addEventListener("click", () => {
            filterContainer.remove();
        });

        let crossIcon: HTMLLIElement = document.createElement(
            "i"
        ) as HTMLLIElement;
        crossIcon.className = "fas fa-times";

        // FILTER MAIN ####################################################################

        let filterMain: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        filterMain.className = "filter-main";

        let filterCategoriesContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        filterCategoriesContainer.className = "filter-catagories-container";

        // FILTER FORM ####################################################################

        let filters: string[] = [];

        let filterForm: HTMLFormElement = document.createElement(
            "form"
        ) as HTMLFormElement;

        let firstCategory: HTMLInputElement = document.createElement(
            "input"
        ) as HTMLInputElement;
        firstCategory.value = "Onormal";
        firstCategory.id = "onormal";
        firstCategory.type = "checkbox";

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

        let firstLabel: HTMLLabelElement = document.createElement(
            "label"
        ) as HTMLLabelElement;
        firstLabel.innerHTML = "onormal";

        let breakPoint: HTMLBRElement = document.createElement("br");

        let secondCategory: HTMLInputElement = document.createElement(
            "input"
        ) as HTMLInputElement;
        secondCategory.value = "Konstig";
        secondCategory.id = "konstigt";
        secondCategory.type = "checkbox";

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

        let secondLabel: HTMLLabelElement = document.createElement(
            "label"
        ) as HTMLLabelElement;
        secondLabel.innerHTML = "Konstigt";

        let secondBreakPoint: HTMLBRElement = document.createElement("br");

        let thirdCategory: HTMLInputElement = document.createElement(
            "input"
        ) as HTMLInputElement;

        thirdCategory.value = "Jättekonstig";
        thirdCategory.id = "jättekonstigt";
        thirdCategory.type = "checkbox";

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

        let thirdLabel: HTMLLabelElement = document.createElement(
            "label"
        ) as HTMLLabelElement;
        thirdLabel.innerHTML = "Jättekonstigt";

        let thirdBreakPoint: HTMLBRElement = document.createElement("br");

        let fourthCategory: HTMLInputElement = document.createElement(
            "input"
        ) as HTMLInputElement;
        fourthCategory.value = "Vad i hela världen";
        fourthCategory.id = "vadihelavärlden";
        fourthCategory.type = "checkbox";

        thirdCategory.value = "Jättekonstig";
        thirdCategory.id = "jättekonstigt";
        thirdCategory.type = "checkbox";

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

        let fourthLabel: HTMLLabelElement = document.createElement(
            "label"
        ) as HTMLLabelElement;
        fourthLabel.innerHTML = "Vad i hela världen";

        crossButton.appendChild(crossIcon);
        filterButtonContainer.appendChild(filterLogo);
        filterButtonContainer.appendChild(crossButton);
        filterHeader.appendChild(filterButtonContainer);
        filterForm.appendChild(firstCategory);
        filterForm.appendChild(firstLabel);
        filterForm.appendChild(breakPoint);
        filterForm.appendChild(secondCategory);
        filterForm.appendChild(secondLabel);
        filterForm.appendChild(secondBreakPoint);
        filterForm.appendChild(thirdCategory);
        filterForm.appendChild(thirdLabel);
        filterForm.appendChild(thirdBreakPoint);
        filterForm.appendChild(fourthCategory);
        filterForm.appendChild(fourthLabel);
        filterCategoriesContainer.appendChild(filterForm);
        filterMain.appendChild(filterCategoriesContainer);
        filterContainer.appendChild(filterHeader);
        filterContainer.appendChild(filterMain);
        mainPart.appendChild(filterContainer);
    }
}

function runFilter(filters: string[]): void {
    let filterProducts: Product[] = getFilteredProducts(filters, allProducts);
    createElementForProducts(filterProducts);
}
