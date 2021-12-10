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
    // getProductsSessionStorage();
    createElementForProducts();
    createProductFilter();
};

// function getProductsSessionStorage(): void {
//     let products: Product[] = createProductObjectsFromData();

//     let productsLocalStorage: string = JSON.stringify(products);
//     sessionStorage.setItem("browse", productsLocalStorage);
// }

function createElementForProducts(): void {
    let allProducts: Product[] = createProductObjectsFromData();

    allProducts.forEach((p: Product) => {
        p.related.forEach((pRelated: Product) => {});
    });

    let productContainer: HTMLDivElement = document.querySelector(
        ".products-container"
    ) as HTMLDivElement;

    for (let index: number = 0; index < allProducts.length; index++) {
        let product: Product = allProducts[index];

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

    // FILTER WINDOW //
    function createFilterWindow() {
        let filterContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        filterContainer.id = "loading";
        filterContainer.className = "filter-container";

        let filterHeader: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        filterHeader.className = "filter-header";

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

        let filterMain: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        filterMain.className = "filter-main";

        let filterCategoriesContainer: HTMLDivElement = document.createElement(
            "div"
        ) as HTMLDivElement;
        filterCategoriesContainer.className = "filter-catagories-container";

        let filterForm: HTMLFormElement = document.createElement(
            "form"
        ) as HTMLFormElement;

        let firstCategory: HTMLInputElement = document.createElement(
            "input"
        ) as HTMLInputElement;
        firstCategory.name = "onormal";
        firstCategory.value = "onormal";
        firstCategory.id = "onormal";
        firstCategory.type = "checkbox";

        let firstLabel: HTMLLabelElement = document.createElement(
            "label"
        ) as HTMLLabelElement;
        firstLabel.innerHTML = "onormal";

        let breakPoint: HTMLBRElement = document.createElement("br");

        let secondCategory: HTMLInputElement = document.createElement(
            "input"
        ) as HTMLInputElement;
        secondCategory.name = "konstigt";
        secondCategory.value = "konstigt";
        secondCategory.id = "konstigt";
        secondCategory.type = "checkbox";

        let secondLabel: HTMLLabelElement = document.createElement(
            "label"
        ) as HTMLLabelElement;
        secondLabel.innerHTML = "Konstigt";

        let secondBreakPoint: HTMLBRElement = document.createElement("br");

        let thirdCategory: HTMLInputElement = document.createElement(
            "input"
        ) as HTMLInputElement;
        thirdCategory.name = "jättekonstigt";
        thirdCategory.value = "jättekonstigt";
        thirdCategory.id = "jättekonstigt";
        thirdCategory.type = "checkbox";

        let thirdLabel: HTMLLabelElement = document.createElement(
            "label"
        ) as HTMLLabelElement;
        thirdLabel.innerHTML = "Jättekonstigt";

        let thirdBreakPoint: HTMLBRElement = document.createElement("br");

        let fourthCategory: HTMLInputElement = document.createElement(
            "input"
        ) as HTMLInputElement;
        fourthCategory.name = "vadihelavärlden";
        fourthCategory.value = "vadihelavärlden";
        fourthCategory.id = "vadihelavärlden";
        fourthCategory.type = "checkbox";

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
