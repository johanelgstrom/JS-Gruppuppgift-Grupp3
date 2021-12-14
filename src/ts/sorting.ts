// Made by: Elias Fredriksson
// Medieinstitutet FED21S

import { Product } from "./models/product";

//Enum to make sure the developers input the correct syntax for the sorting.
export enum Sort {
    PRICE_ASCENDING = "Stigande pris",
    PRICE_DECENDING = "Sjukande pris",
    NAME_ALPHABETIC = "Alfabetisk ordning",
    NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

//Copy the given product list, sort the copied list according
//to the given sorting method (enum above) and return the copy.
export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
    // Copy the list sense "products" is a reference to all the products.
    let copiedList: Product[] = [];
    products.forEach((product) => copiedList.push(product));

    let sortedList: Product[] = [];
    if (sort === Sort.PRICE_ASCENDING) {
        sortedList = sortList("Price", copiedList);
        sortedList.reverse();
    } else if (sort === Sort.PRICE_DECENDING) {
        sortedList = sortList("Price", copiedList);
    } else if (sort === Sort.NAME_ALPHABETIC) {
        sortedList = sortList("Name", copiedList);
    } else if (sort === Sort.NAME_ALPHABETIC_REVERSE) {
        sortedList = sortList("Name", copiedList);
        sortedList.reverse();
    }

    return sortedList;
}

//Go thourgh all elements in the given list of products,
//sort them using the built in .sort() function. The comparison
//function depends on input.
function sortList(whichAttribute: string, products: Product[]): Product[] {
    return products.sort((p1, p2) => {
        switch (whichAttribute) {
            case "Price":
                if (p1.price < p2.price) {
                    return 1;
                } else if (p1.price > p2.price) {
                    return -1;
                }
                return 0;
            case "Name":
                //We use localCompare sense it compares the two strings according
                //to the local browsers language setting. We dont change the laguage
                //in this project, but if we had automatic language detection and
                //translate the site to the local language, then this function would
                //work no matter the language. We are using Swedish for the products
                //so we supply the locale argument "sv".
                let localCompare = p1.name.localeCompare(p2.name, "sv");
                if (localCompare > 0) {
                    return 1;
                } else if (localCompare < 1) {
                    return -1;
                }
                return 0;
        }
    });
}
