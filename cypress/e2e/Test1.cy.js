/// <reference types ="Cypress"/>

describe('My first test suite', function(){
    it('My first test case', function(){
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get(".search-keyword").type("ca")
        cy.wait(2000)
        //Selenium get hit url in browser, cypress get acts like findelement of selenium
        cy.get(".product:visible").should('have.length', '4')

        //Aliasing
        cy.get(".products").as('productLocator')

        //Parent Child Chaining
        cy.get("@productLocator").find('.product').should('have.length', '4')
        // cy.get(".products").find(".product").eq(2).contains('ADD TO CART').click()
        
        cy.get("@productLocator").find(".product").each(($el, index, $list) => {
            const textVeg = $el.find("h4.product-name").text()
            if(textVeg.includes("Cashews")){
                // cy.wrap($el) is used to wrap the jQuery object $el into a Cypress object, and then you can use the find and click commands on it. This ensures that Cypress handles the event triggering and removes any deprecated warnings.
                cy.wrap($el).find('button').click();
            }
        })

        

        //When we concatnating One Cypress Command to another Cypress Command then Cypress command understand that both are CypressCommand
        //So it will wait and it will resolve promise by internally and it will passed to this.
        //cy.get(".products").find(".product").eq(2).contains('ADD TO CART').click() 
        //In the above line, if we see, find is cypress command, eq is cypress command, contains is cypress command
        //This will also return an promish, but each method have an ability to resolve the promish whatever it is receiving.
        //And after resolving only it applied .product on this, eq method also have ability to handle, and contains also have ability to resolve promish its own

        // /assert if logo is correctly displayed
        cy.get(".brand").should('have.text', "GREENKART")


        // const logo = cy.get(".brand")
        // cy.log(logo.text())

        //But here, when we store in an variable, variable is not cypress.
        //Variable do not have ability to grab that and resolve a promise
        //So without resolving promise, it will simply returs the state of behavior
        //But the ultimate aim is to resolve it then work on it, but here we are simply returning promise
        //So on that we cannot work.

        //So when it happens like that, we will manually resolve it by using .Then() method
        cy.get(".brand").then(function(logo) {
            cy.log(logo.text())
            //text() is also not a cypress command
            //Cypress also supports JQuery method, and text() is JQuery method.
            //There is no inbuilt mthod available in cypress to grab the text
        })

        //NON CYPRESS COMMANDS CANNOT RESOLVE PROMISE BY THEMSELVES. WE NEED TO MANUALLY RESOLVE IT BY THEN()

        cy.get("img[alt='Cart']").click()
        cy.contains("PROCEED TO CHECKOUT").click()
        cy.contains("Place Order").click()
    })
})