// Made by: Filip Engberg
// Medieinstitutet FED21S

describe("Browse and product page tests", () => {
    beforeEach(() => {
        cy.visit("localhost:1234");
        sessionStorage.clear();
    });

    // BROWSE /////////////////////////////////////////
    // CHECKING THAT EVERYTHING WORKS IN THE BROWSE-SITE

    it("Should click on a product from news-category and see if it gets a product", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".news-container > :nth-child(1)").click();

        // ARRANGE
        cy.get(".product-image").find("img");
        cy.get(".product-information").find("h2");
        cy.get(".product-information").find("span");
        cy.get(".product-title-container").find("h2");
        cy.get(".product-buttons").find("select");
        cy.get(".product-buttons").find("button");
    });

    it("Should click on a product from products-category and see if it gets a product", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".campaigns-container > :nth-child(1)").click();

        // ARRANGE
        cy.get(".product-image").find("img");
        cy.get(".product-information").find("h2");
        cy.get(".product-information").find("span");
        cy.get(".product-title-container").find("h2");
        cy.get(".product-buttons").find("select");
        cy.get(".product-buttons").find("button");
    });
    it("Should click on a product from campaign-category and see if it gets a product", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".products-container > :nth-child(1)").click();

        // ARRANGE
        cy.get(".product-image").find("img");
        cy.get(".product-information").find("h2");
        cy.get(".product-information").find("span");
        cy.get(".product-title-container").find("h2");
        cy.get(".product-buttons").find("select");
        cy.get(".product-buttons").find("button");
    });

    it("Should click on add product button in news to see if it gets a item added in cart", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".shopping-container > button").eq(0).click();
        cy.on("window:alert", (txt) => {
            expect(txt).to.contains(
                "La till Skrämmande Hästhuvudprydnad till din varukorg."
            );
        });
        cy.get(".cart-container").click();

        // ARRANGE
        cy.get(".basket-container > .item-container").should("have.length", 1);
    });

    it("Should click on add product button in campaigns to see if it gets a item added in cart", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".shopping-container > button").eq(13).click();
        cy.on("window:alert", (txt) => {
            expect(txt).to.contains(
                "La till Får toalettpapper hållare till din varukorg."
            );
        });
        cy.get(".cart-container").click();

        // ARRANGE
        cy.get(".basket-container > .item-container").should("have.length", 1);
    });

    it("Should click on add product button in products to see if it gets a item added in cart", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".shopping-container > button").eq(29).click();
        cy.on("window:alert", (txt) => {
            expect(txt).to.contains(
                "La till Pussel med 1 miljon bitar till din varukorg."
            );
        });
        cy.get(".cart-container").click();

        // ARRANGE
        cy.get(".basket-container > .item-container").should("have.length", 1);
    });

    it("Should get filtered after pressing onormal checkbox", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".filter-catagories-container > form > input").eq(0).click();

        // ARRANGE
        cy.get(".products-container > .product-item").should("have.length", 23);
    });

    it("Should get filtered after pressing konstigt checkbox", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".filter-catagories-container > form > input").eq(1).click();

        // ARRANGE
        cy.get(".products-container > .product-item").should("have.length", 23);
    });

    it("Should get filtered after pressing jättekonstigt checkbox", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".filter-catagories-container > form > input").eq(2).click();

        // ARRANGE
        cy.get(".products-container > .product-item").should("have.length", 9);
    });

    it("Should get filtered after pressing vadihelavärlden checkbox", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".filter-catagories-container > form > input").eq(3).click();

        // ARRANGE
        cy.get(".products-container > .product-item").should("have.length", 4);
    });

    it("Should get filtered after pressing all checkbox", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".filter-catagories-container > form > input").eq(0).click();
        cy.get(".filter-catagories-container > form > input").eq(1).click();
        cy.get(".filter-catagories-container > form > input").eq(2).click();
        cy.get(".filter-catagories-container > form > input").eq(3).click();

        // ARRANGE
        cy.get(".products-container > .product-item").should("have.length", 0);
    });

    it("Should have a specific product after the search in the search box", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        let userInput: string = "Uppstoppad Anklampa";
        cy.get("#second-product-search").type(userInput);

        // ARRANGE
        cy.get(".products-container > .product-item").should("have.length", 1);
        cy.get(".title-container > span").contains(userInput);
    });

    it("Should click on the first option in selector and affect products price scheme ", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        let firstValue: string = "39";
        let secondValue: string = "49";
        let thirdValue: string = "49";

        // ACT
        cy.get("#categories").select("Stigande pris");

        // ARRANGE
        cy.get(".products-container > .product-item > .price-container > span")
            .eq(0)
            .should("have.text", firstValue);
        cy.get(".products-container > .product-item")
            .eq(1)
            .find(".price-container > span")
            .eq(0)
            .should("have.text", secondValue);
        cy.get(".products-container > .product-item")
            .eq(2)
            .find(".price-container > span")
            .eq(0)
            .should("have.text", thirdValue);
    });

    it("Should click on the second option in selector and affect products price scheme", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        let firstValue: string = "8990";
        let secondValue: string = "799";
        let thirdValue: string = "799";

        // ACT
        cy.get("#categories").select("Sjunkande pris");

        // ARRANGE
        cy.get(".products-container > .product-item > .price-container > span")
            .eq(0)
            .should("have.text", firstValue);
        cy.get(".products-container > .product-item")
            .eq(1)
            .find(".price-container > span")
            .eq(0)
            .should("have.text", secondValue);
        cy.get(".products-container > .product-item")
            .eq(2)
            .find(".price-container > span")
            .eq(0)
            .should("have.text", thirdValue);
    });
    it("Should click on the third option in selector and affect products alphabetical order", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        let firstValue: string = "B";
        let secondValue: string = "D";
        let thirdValue: string = "D";

        // ACT
        cy.get("#categories").select("Alfabetisk ordning");

        // ARRANGE

        cy.get(".products-container > .product-item > .title-container > span")
            .eq(0)
            .should("have.text", firstValue + "anan USB-hub");
        cy.get(".products-container > .product-item")
            .eq(1)
            .find(".title-container > span")
            .eq(0)
            .should("have.text", secondValue + "onald Trump kartongfigur");
        cy.get(".products-container > .product-item")
            .eq(2)
            .find(".title-container > span")
            .eq(0)
            .should("have.text", thirdValue + "usch Vinhållare");
    });

    it("Should click on the third option in selector and affect products alphabetical order", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        let firstValue: string = "Ö";
        let secondValue: string = "W";
        let thirdValue: string = "U";

        // ACT

        cy.get("#categories").select("Omvänd alfabetisk ordning");

        // ARRANGE

        cy.get(".products-container > .product-item > .title-container > span")
            .eq(0)
            .should("have.text", firstValue + "lväst");
        cy.get(".products-container > .product-item")
            .eq(1)
            .find(".title-container > span")
            .eq(0)
            .should("have.text", secondValue + "hite trash cooking");
        cy.get(".products-container > .product-item")
            .eq(2)
            .find(".title-container > span")
            .eq(0)
            .should("have.text", thirdValue + "ppstoppad Anklampa");
    });

    // PRODUCT /////////////////////////////////////////
    // CHECKING THAT EVERYTHING WORKS IN THE PRODUCT-SITE

    it("Should click on add button and get a product in cart", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".news-container > :nth-child(1)").click();
        cy.get("#add-button").click();

        // ARRANGE
        cy.on("window:alert", (txt) => {
            expect(txt).to.contains(
                "La till 1st Skrämmande Hästhuvudprydnad till din varukorg."
            );
        });
        cy.get("#cart-on").click();
        cy.get(".basket-container > .item-container").should("have.length", 1);
    });

    it("Should click on fourth option in selector and add 4 products", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        let amountValue: string = "4";

        // ACT
        cy.get(".news-container > :nth-child(1)").click();
        cy.get("#count").select("4");
        cy.get("#add-button").click();

        // ARRANGE
        cy.on("window:alert", (txt) => {
            expect(txt).to.contains(
                "La till 4st Skrämmande Hästhuvudprydnad till din varukorg."
            );
        });
        cy.get("#cart-on").click();
        cy.get(
            ".basket-container > .item-container > .item-info-and-buttons > .item-info > p"
        )
            .eq(2)
            .should("have.text", "Antal: " + amountValue);
    });
    it("Should click on the first product in similar products and get the product", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".news-container > :nth-child(1)").click();
        cy.get(
            ".product-similiar-product > .product-similiar-item > .image-container"
        )
            .eq(0)
            .click();

        // ARRANGE
        cy.get(".product-image").find("img");
        cy.get(".product-information").find("h2");
        cy.get(".product-information").find("span");
        cy.get(".product-title-container").find("h2");
        cy.get(".product-buttons").find("select");
        cy.get(".product-buttons").find("button");
    });

    it("Should click add to cart button in similiar products and get that product in cart", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".news-container > :nth-child(1)").click();
        cy.get("#add-to-cart").eq(0).click();

        // ARRANGE
        cy.on("window:alert", (txt) => {
            expect(txt).to.contains("La till Banan USB-hub i din varukorg.");
        });
        cy.get("#cart-on").click();
        cy.get(".basket-container > .item-container").should("have.length", 1);
    });

    it("Should click on back icon and get to browse site", () => {
        // ARRANGE
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();

        // ACT
        cy.get(".news-container > :nth-child(1)").click();
        cy.get("#back-icon").click();

        // ARRANGE

        cy.get("#products-body").find("#products-main");
    });
});
