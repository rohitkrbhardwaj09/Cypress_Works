/// <reference types="Cypress"/>
/// <reference types="cypress-iframe"/>
import 'cypress-iframe'
describe("Cypress Elements", function () {

    beforeEach(() => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    })

    it("Automate Checkboxes", function () {

        //Checking a checkbox
        cy.get("#checkBoxOption1").check();
        // cy.get("#checkBoxOption1").should('be.checked')
        // cy.get("#checkBoxOption1").should('have.value', "option1")

        cy.get("#checkBoxOption1").should('be.checked').and('have.value', "option1")

        //Uncheck the checkbox
        cy.get("#checkBoxOption1").uncheck();
        cy.get("#checkBoxOption1").should('not.be.checked')

        //check multiple checkbox at a time without writing multiple steps
        //First we need to choose a Common Selector
        //Then need to pass values of value in an array with check
        cy.get("input[type='checkbox']").check(['option2', 'option3'])
    })

    it("Automate Static Dropdowns", function () {
        //here, select is the tag name
        //selecting using value attribute
        // cy.get('select').select('option2').should('have.value', 'option2')
        //selecting using text
        cy.get('select').select('Option2').should('contain', 'Option2')
    })

    it("Automate Dynamic Dropdown", function () {
        cy.get("#autocomplete").type("pa")
        // cy.wait(2000)
        cy.get(".ui-menu-item div").each(($el, index, $list) => {
            if ($el.text() === "Pakistan") {
                cy.wrap($el).click()
            }
        })

        cy.get("#autocomplete").should('have.value', "Pakistan")
    })

    it("Handling Visible and Invisible Elements", () => {
        cy.get("#hide-textbox").click()
        cy.get("#displayed-text").should("not.be.visible")
        cy.wait(1000)
        cy.get("#show-textbox").click()
        cy.get("#displayed-text").should("be.visible")
    })

    it("Automate Radio Button", () => {
        cy.get("input[value='radio2']").check()
    })

    it("Handling ALert Box", () => {
        //In cypress, alert automatically accepts 
        cy.get("#alertbtn").click()
        cy.get("#confirmbtn").click()

        //How to get text of an alert box
        cy.on('window:alert', (str) => {
            expect(str).to.equal("Hello , share this practice page and share your knowledge")
        })

        cy.on('window:confirm', str => {
            expect(str).to.equal("Hello , Are you sure you want to confirm?")
        })

    })

    it("Handling Child Window", () => {

        cy.get("#opentab").invoke('removeAttr', 'target').click()
        //In Cypress, Invoke command is often used to intract with and retrive values from DOM elements.
        //It allows you to invoke a method or property on a subject (usually a DOM element) and then make assertion based on the result.

        //removeAttr is a Jquery method, and all the Jquery methods are by default supported by the Cypress.
    })

    it("Browser Navigation Methods", () => {

        cy.get("#opentab").click()
        cy.url().should('include', 'rahul')
        cy.go('back')
    })

    it('Handling Webtable', () => {

        cy.get("#product tbody tr td:nth-child(2)").each(($el, index, $list) => {
            const text = $el.text()
            if (text.includes("Python")) {
                // .eq(index): This method filters the selection to include only the element at the specified index. 
                // .next(): This method selects the immediately following sibling of the previously selected element. It's moving to the next sibling of the selected table cell.
                cy.get("#product tbody tr td:nth-child(2)").eq(index).next().then((x) => {
                    const priceText = x.text()
                    expect(priceText).to.equal('25')
                })
            }
        })

    })

    it("Mouse hover popups", () => {
        //There is no support for hover in Cypress, but using Jquery we can handle it

        cy.get("div.mouse-hover-content").invoke('show').click()
        cy.contains('Top').click({force : true})
        cy.url().should('include','top')
    })

    it("Handling Child Window", () => {
        //In this, we will learn how to grab attribute value
        //As we will try to grab href value, and try to reopen using cy.visit
        cy.get("#openwindow").then((element)=>{
           const url =  element.prop('href')
           cy.log(url);  
        })
    })

    it.only("Handling Frames", () => {
        cy.frameLoaded("#courses-iframe")

        cy.iframe().find("a[href*='mentorship']").eq(0).click()
    })
})