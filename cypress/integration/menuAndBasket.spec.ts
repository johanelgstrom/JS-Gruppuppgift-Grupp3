// Made by: Johan Elgström
// Medieinstitutet FED21S

describe("should make sure that menu and buttons  works", () => {
    it("should go to home mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list li:first").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/pages/browse.html')
    })
    it("should go to news mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list a:nth-child(2)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/pages/browse.html#news')
    })
    it("should go to campaigns mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list a:nth-child(3)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/pages/browse.html#campaigns')
    })
    it("should go to products mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list a:nth-child(4)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/pages/browse.html#products')
    })
    it("should go to information mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list li:last").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/index.html')
    })
    it("should go to home desktop", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        //Act
        cy.get("div#burger-menu").click();
        cy.get("ul.menu-list li:first").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/pages/browse.html')
    })
    it("should go to news desktop", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        //Act
        cy.get("div#burger-menu").click();
        cy.get("ul.menu-list a:nth-child(2)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/pages/browse.html#news')
    })
    it("should go to campaigns desktop", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        //Act
        cy.get("div#burger-menu").click();
        cy.get("ul.menu-list a:nth-child(3)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/pages/browse.html#campaigns')
    })
    it("should go to products desktop", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        //Act
        cy.get("div#burger-menu").click();
        cy.get("ul.menu-list a:nth-child(4)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/pages/browse.html#products')
    })
    it("should go to information desktop", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        //Act
        cy.get("div#burger-menu").click();
        cy.get("ul.menu-list a:nth-child(5)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/index.html')
    })
    it("should take you to browse mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("i.fa-arrow-circle-right").click();
        //Assert
        cy.url().should("eq", "http://localhost:1234/pages/browse.html")
    })
    it("should take you to browse desktop", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        //Act
        cy.get("button#to-browse").click();
        //Assert
        cy.url().should("eq", "http://localhost:1234/pages/browse.html")
    })
    
})
describe("make sure that cart works", () => {
    it("should add random item to cart", () => {
        //Arrange
        sessionStorage.clear()
        cy.visit("http://localhost:1234");
        //Act
        cy.get('#cart-on').click();
        cy.get('.random-button').click();
        //Assert
        cy.get('.item-info > :nth-child(3)').should("contain", "Antal: 1");
    })
    it("should add one to amount of product", () => {
        //Arrange
        sessionStorage.clear()
        cy.visit("http://localhost:1234");
        cy.get('#cart-on').click();
        cy.get('.random-button').click();
        //Act
        cy.get('.item-buttons > :nth-child(1)').click();
        //Assert
        cy.get('.item-info > :nth-child(3)').should("contain", "Antal: 2");

    })
    it("should add one to amount of product, then subtract one", () => {
        //Arrange
        sessionStorage.clear()
        cy.visit("http://localhost:1234");
        cy.get('#cart-on').click();
        cy.get('.random-button').click();
        //Act
        cy.get('.item-buttons > :nth-child(1)').click();
        cy.get('.item-buttons > :nth-child(2)').click();
        //Assert
        cy.get('.item-info > :nth-child(3)').should("contain", "Antal: 1");
    })
    it("should add one item, then remove it", () => {
        //Arrange
        sessionStorage.clear()
        cy.visit("http://localhost:1234");
        cy.get('#cart-on').click();
        //Act
        cy.get('.random-button').click();
        cy.get('.item-buttons > :nth-child(2)').click();
        //Assert
        cy.get('#your-basket').should("contain", "Beslutsångest?")
    })
    it("should add one item, remove it, then add another one", () => {
        //Arrange
        sessionStorage.clear()
        cy.visit("http://localhost:1234");
        cy.get('#cart-on').click();
        //Act
        cy.get('.random-button').click();
        cy.get('.item-buttons > :nth-child(2)').click();
        cy.get('.random-button').click();
        //Arrange
        cy.get('.item-info > :nth-child(3)').should("contain", "Antal: 1");
    })
    it("should add one item, go to checkout and make sure it's the right item", () => {
        //Arrange
        sessionStorage.clear()
        cy.visit("http://localhost:1234");
        cy.get('#cart-on').click();
        //Act
        cy.get('.random-button').click();
        cy.get('.item-info > :nth-child(1)').then(($info) => {
            let info = $info.text();
            cy.get('.basket-total-and-button > a').click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/pages/checkout.html');
        cy.get('.product-text > :nth-child(1)').then(($info2) => {
            expect($info2.text()).to.eq(info)
        })
        });

        
    })
    it("should add one item, add one amount, go to checkout and make sure that it's the right item and right amount", () => {
        //Arrange
        sessionStorage.clear()
        cy.visit("http://localhost:1234");
        cy.get('#cart-on').click();
        //Act
        cy.get('.random-button').click();
        cy.get('.item-buttons > :nth-child(1)').click();
        cy.get('.item-info > :nth-child(1)').then(($info) => {
            let info = $info.text();
            cy.get('.item-info > :nth-child(3)').then(($amount) => {
                let amount = $amount.text();

                cy.get('.basket-total-and-button > a').click();
                //Assert
                cy.url().should('eq', 'http://localhost:1234/pages/checkout.html');
                cy.get('.product-text > :nth-child(1)').then(($info2) => {
                    expect($info2.text()).to.eq(info);
                    cy.get('.product-text > :nth-child(3)').then(($amount2) => {
                        expect($amount2.text()).to.eq(amount);
                    })
                })
            });
        })
            
    })
})