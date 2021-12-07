describe("should make sure that menu works", () => {
    it("should go to home mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list li:first").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/products.html')
    })
    it("should go to news mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list a:nth-child(2)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/products.html#news')
    })
    it("should go to campaigns mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list a:nth-child(3)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/products.html#campaigns')
    })
    it("should go to products mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list a:nth-child(4)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/products.html#products')
    })
    it("should go to information mobile", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        cy.viewport('iphone-x');
        //Act
        cy.get("div#burger-menu-phone").click();
        cy.get("ul.menu-list a:nth-child(5)").click();
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
        cy.url().should('eq', 'http://localhost:1234/products.html')
    })
    it("should go to news desktop", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        //Act
        cy.get("div#burger-menu").click();
        cy.get("ul.menu-list a:nth-child(2)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/products.html#news')
    })
    it("should go to campaigns desktop", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        //Act
        cy.get("div#burger-menu").click();
        cy.get("ul.menu-list a:nth-child(3)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/products.html#campaigns')
    })
    it("should go to products desktop", () => {
        //Arrange
        cy.visit("http://localhost:1234");
        //Act
        cy.get("div#burger-menu").click();
        cy.get("ul.menu-list a:nth-child(4)").click();
        //Assert
        cy.url().should('eq', 'http://localhost:1234/products.html#products')
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
    
})
