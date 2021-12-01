import {
    Product,
    createProductObjectsFromData,
    getFilteredProducts,
    getCategoryProducts,
    getProductById,
} from "./models/produkt";

window.onload = function () {
    //TESTS
    //get all products
    let products: Product[] = createProductObjectsFromData();
    console.log("ALL: ", products);

    //get filtered products
    let filteredProducts: Product[] = getFilteredProducts(
        ["Konstig"],
        products
    );
    console.log("FILTERED: 'Konstig' ", filteredProducts);

    //get categorized products
    let categorizedProducts: Product[] = getCategoryProducts(
        ["Dator"],
        products
    );
    console.log("CATEGORIZED: ", categorizedProducts);

    //get product by id
    let product: Product[] = getProductById(3, products);
    console.log("BY ID: ", product);
};
