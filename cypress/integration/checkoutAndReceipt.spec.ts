import { first } from "cypress/types/lodash";
import { Product } from "../../src/ts/models/produkt";

describe("Checkout and Receipt page tests", () => {
    beforeEach(() => {
        cy.visit("localhost:1234");
        sessionStorage.clear();
    });

    //############################################### CHECKOUT //###############################################
    // // CHECKS FOR ADDING AND REMOVING ITEMS FROM CART
    // it("Should have added 1 product to cart and it shows up in checkout. / Desktop", () => {
    //     //1. Arrange
    //     cy.viewport("macbook-15");
    //     cy.get("#to-browse").click();
    //     cy.get(".products-container > :nth-child(1)").click();
    //     cy.get("#add-button").click();
    //     cy.get("#cart-on").click();

    //     //2. Act
    //     cy.get(".basket-total-and-button > a > button").click();

    //     //3. Asses
    //     cy.get("#basket-inner-wrapper").should("have.length", 1);
    // });

    // it("Should have added 1 product x2 to cart and it shows up in checkout. / Desktop", () => {
    //     //1. Arrange
    //     cy.viewport("macbook-15");
    //     cy.get("#to-browse").click();
    //     cy.get(".products-container > :nth-child(1)").click();
    //     cy.get("#add-button").click();
    //     cy.get("#add-button").click();
    //     cy.get("#cart-on").click();

    //     //2. Act
    //     cy.get(".basket-total-and-button > a > button").click();

    //     //3. Asses
    //     cy.get("#basket-inner-wrapper > div").should("have.length", 1);
    //     cy.get(".product-text > :nth-child(3)").should("have.text", "Antal: 2");
    // });

    // it("Should have added 2 products x1 to cart and it shows up in checkout. / Desktop", () => {
    //     //1. Arrange
    //     cy.viewport("macbook-15");
    //     cy.get("#to-browse").click();

    //     //2. Act
    //     // first product
    //     cy.get(".products-container > :nth-child(1)").click();
    //     cy.get("#add-button").click();
    //     cy.get("#back-icon").click();
    //     // second product
    //     cy.get(".products-container > :nth-child(2)").click();
    //     cy.get("#add-button").click();
    //     cy.get("#back-icon").click();

    //     // go to checkout
    //     cy.get("#cart-on").click();
    //     cy.get(".basket-total-and-button > a > button").click();

    //     //3. Asses
    //     cy.get("#basket-inner-wrapper > div").should("have.length", 2);
    //     cy.get(
    //         "#basket-inner-wrapper > div:nth-child(1) > div:nth-child(2) p:nth-child(3)"
    //     ).should("have.text", "Antal: 1");
    //     cy.get(
    //         "#basket-inner-wrapper > div:nth-child(2) > div:nth-child(2) p:nth-child(3)"
    //     ).should("have.text", "Antal: 1");
    // });

    // it("Should add one product x1 to cart and then increase quantity to 2 in checkout. / Desktop", () => {
    //     //1. Arrange
    //     cy.viewport("macbook-15");
    //     cy.get("#to-browse").click();
    //     cy.get(".products-container > :nth-child(1)").click();
    //     cy.get("#add-button").click();
    //     cy.get("#cart-on").click();
    //     cy.get(".basket-total-and-button > a > button").click();
    //     cy.get("#basket-inner-wrapper > div").should("have.length", 1);
    //     cy.get(
    //         "#basket-inner-wrapper > div:nth-child(1) > div:nth-child(2) p:nth-child(3)"
    //     ).should("have.text", "Antal: 1");

    //     //2. Act
    //     cy.get(".product-actions button:nth-child(1)").click();

    //     //3. Asses
    //     cy.get(
    //         "#basket-inner-wrapper > div:nth-child(1) > div:nth-child(2) p:nth-child(3)"
    //     ).should("have.text", "Antal: 2");
    // });

    // it("Should add one product x1 to cart and then decrease quantity to 0 in checkout. / Desktop", () => {
    //     //1. Arrange
    //     cy.viewport("macbook-15");
    //     cy.get("#to-browse").click();
    //     cy.get(".products-container > :nth-child(1)").click();
    //     cy.get("#add-button").click();
    //     cy.get("#cart-on").click();
    //     cy.get(".basket-total-and-button > a > button").click();
    //     cy.get("#basket-inner-wrapper > div").should("have.length", 1);
    //     cy.get(
    //         "#basket-inner-wrapper > div:nth-child(1) > div:nth-child(2) p:nth-child(3)"
    //     ).should("have.text", "Antal: 1");

    //     //2. Act
    //     cy.get(".product-actions button:nth-child(2)").click();

    //     //3. Asses
    //     cy.get("#basket-inner-wrapper > div").should("have.length", 0);
    // });

    // // CHECKS FOR VALIDATION
    // it("Should not allow you to check out without entering valid information. / Desktop", () => {
    //     //1. Arrange
    //     cy.viewport("macbook-15");
    //     cy.get("#to-browse").click();
    //     cy.get(".products-container > :nth-child(1)").click();
    //     cy.get("#add-button").click();
    //     cy.get("#cart-on").click();
    //     cy.get(".basket-total-and-button > a > button").click();
    //     cy.get("#basket-inner-wrapper > div").should("have.length", 1);

    //     //2. Act
    //     cy.get("#pay-button").click();

    //     //3. Asses
    //     cy.get("#input-container").within(() => {
    //         cy.get("#customer-firstname")
    //             .invoke("prop", "validationMessage")
    //             .should("equal", "Please fill in this field.");
    //     });
    //     cy.url().should("include", "pages/checkout.html");
    // });

    // it("Should not allow you to check out with an empty cart. / Desktop", () => {
    //     //1. Arrange
    //     cy.viewport("macbook-15");
    //     cy.get("#to-browse").click();
    //     cy.get(".products-container > :nth-child(1)").click();
    //     cy.get("#add-button").click();
    //     cy.get("#cart-on").click();
    //     cy.get(".basket-total-and-button > a > button").click();
    //     cy.get("#basket-inner-wrapper > div").should("have.length", 1);
    //     cy.get(".product-actions button:nth-child(2)").click();
    //     cy.get("#basket-inner-wrapper > div").should("have.length", 0);

    //     //2. Act
    //     cy.get("#customer-firstname").type("Bengt");
    //     cy.get("#customer-lastname").type("Persson");
    //     cy.get("#customer-email").type("bengt.person@gmail.com");
    //     cy.get("#customer-mobile").type("123456789");
    //     cy.get("#customer-adress").type("TheBestRoad 64");
    //     cy.get("#customer-region").type("13833");
    //     cy.get("#customer-region").type("13833");
    //     cy.get("#customer-delivery").select(0);
    //     cy.get("#customer-card").type("040012341234");
    //     cy.get("#customer-card-cvc").type("123");
    //     cy.get("#pay-button").click();

    //     //cy.wait(3500);

    //     //3. Asses
    //     cy.on("window:alert", (str: string) => {
    //         expect(str).to.equal("Du kan inte checka ut med en tom varukorg.");
    //     });
    //     cy.url().should("include", "pages/checkout.html");
    // });

    //############################################### RECEIPT ###############################################

    it("Should simulate a purchase and end up on receipt page with correct products. / Desktop", () => {
        //1. Arrange
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();
        // first product
        let id1: number = getRandomNumberInRange(35, 1);
        let id2: number = id1 + 1;
        let id3: number = id1 + 2;
        if (id1 > 33) {
            id2 = 1;
            id3 = 2;
        }

        cy.get(
            ".products-container > :nth-child(" + id1.toString() + ")"
        ).click();
        cy.get("#add-button").click();
        cy.get("#back-icon").click();
        // second product
        cy.get(
            ".products-container > :nth-child(" + id2.toString() + ")"
        ).click();
        cy.get("#add-button").click();
        cy.get("#back-icon").click();
        // second product
        cy.get(
            ".products-container > :nth-child(" + id3.toString() + ")"
        ).click();
        cy.get("#add-button").click();
        cy.get("#back-icon").click();
        // go to checkout
        cy.get("#cart-on").click();
        cy.get(".basket-total-and-button > a > button").click();
        cy.get("#basket-inner-wrapper > div").should("have.length", 3);
        cy.get("#customer-firstname").type("Bengt");
        cy.get("#customer-lastname").type("Persson");
        cy.get("#customer-email").type("bengt.persson@gmail.com");
        cy.get("#customer-mobile").type("123456789");
        cy.get("#customer-adress").type("TheBestRoad 64");
        cy.get("#customer-region").type("13833");
        cy.get("#customer-delivery").select(0);
        cy.get("#customer-card").type("040012341234");
        cy.get("#customer-card-cvc").type("123");

        let productNames: string[] = [];
        cy.get(
            "#basket-inner-wrapper > div:nth-child(1) .product-info .product-text > p:nth-child(1)"
        )
            .invoke("text")
            .then((s: string) => {
                productNames.push(s.toString());
            });
        cy.get(
            "#basket-inner-wrapper > div:nth-child(2) .product-info .product-text > p:nth-child(1)"
        )
            .invoke("text")
            .then((s: string) => {
                productNames.push(s.toString());
            });
        cy.get(
            "#basket-inner-wrapper > div:nth-child(3) .product-info .product-text > p:nth-child(1)"
        )
            .invoke("text")
            .then((s: string) => {
                productNames.push(s.toString());

                //2. Act
                cy.get("#pay-button").click();
                cy.wait(3500);

                //3. Asses
                cy.url().should("include", "pages/receipt.html");
                cy.get("#basket-inner-wrapper > div").should("have.length", 3);
                cy.get(
                    "#basket-inner-wrapper > div:nth-child(1) .product-info .product-text > p:nth-child(1)"
                ).should("have.text", productNames[0]);
                cy.get(
                    "#basket-inner-wrapper > div:nth-child(2) .product-info .product-text > p:nth-child(1)"
                ).should("have.text", productNames[1]);
                cy.get(
                    "#basket-inner-wrapper > div:nth-child(3) .product-info .product-text > p:nth-child(1)"
                ).should("have.text", productNames[2]);
            });
    });

    it("Should check that the information displayed on receipt are the same as entered on checkout page. / Desktop", () => {
        //1. Arrange
        cy.viewport("macbook-15");
        cy.get("#to-browse").click();
        // first product
        let id1: number = getRandomNumberInRange(35, 1);
        let id2: number = id1 + 1;
        let id3: number = id1 + 2;
        if (id1 > 33) {
            id2 = 1;
            id3 = 2;
        }

        cy.get(
            ".products-container > :nth-child(" + id1.toString() + ")"
        ).click();
        cy.get("#add-button").click();
        cy.get("#back-icon").click();
        // second product
        cy.get(
            ".products-container > :nth-child(" + id2.toString() + ")"
        ).click();
        cy.get("#add-button").click();
        cy.get("#back-icon").click();
        // second product
        cy.get(
            ".products-container > :nth-child(" + id3.toString() + ")"
        ).click();
        cy.get("#add-button").click();
        cy.get("#back-icon").click();
        // go to checkout
        cy.get("#cart-on").click();
        cy.get(".basket-total-and-button > a > button").click();
        cy.get("#basket-inner-wrapper > div").should("have.length", 3);

        let firstName: string = "Bengt";
        let lastName: string = "Persson";
        let email: string = "bengt.persson@gmail.com";
        let mobile: string = "123456789";
        let adress: string = "TheBestRoad 64";
        let region: string = "13833";
        let card: string = "040012341234";
        let cvc: string = "123";

        cy.get("#customer-firstname").type(firstName);
        cy.get("#customer-lastname").type(lastName);
        cy.get("#customer-email").type(email);
        cy.get("#customer-mobile").type(mobile);
        cy.get("#customer-adress").type(adress);
        cy.get("#customer-region").type(region);
        cy.get("#customer-delivery").select(0);
        cy.get("#customer-card").type(card);
        cy.get("#customer-card-cvc").type(cvc);

        //Go to receipt
        cy.get("#pay-button").click();
        cy.wait(3500);
        cy.url().should("include", "pages/receipt.html");
        cy.get("#basket-inner-wrapper > div").should("have.length", 3);

        //2. Act
        //3. Asses
        cy.get("#fullname").should("have.text", firstName + " " + lastName);
        cy.get("#adress").should("have.text", adress);
        cy.get("#region-code").should("have.text", region);
        cy.get("#email").should("have.text", email);
        cy.get("#card").should("have.text", card + " (" + cvc + ")");
    });
});

function getRandomNumberInRange(
    UpperRange: number,
    LowerRange: number
): number {
    return (
        Math.floor(Math.random() * (UpperRange - LowerRange + 1)) + LowerRange
    );
}
