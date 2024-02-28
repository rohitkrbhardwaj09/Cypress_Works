/// <reference types = "Cypress" />
describe("Cypress little advance", () => {
    let myData;
    //Setting up Hooks
    //Data Driven Testing with fixtures
    //Builing custom Cypress commands
    //Parameterize test with Multiple dataset
    //Understand the test Debugging
    //Build page object Design pattern for object
    //Configuration changes in Cypress.json
    //Screenshot and Video recording for Test
    //Exploring Cypress dashboard
    //Understand the Enviromental variables of Cypress
    //Generate Excellent repnpxorts for Test Execution results
    //Integrate Cypress tests with jenkin CI
    // -----------------------------------------------------------------------------------------------
    // Setting up Hooks
    // ================
    before(function () {
        //runs once before all tests in the Block
        cy.fixture('example.json').then(function (data) {
            myData = data
        })

    })

    // after(function(){
    //     //runs once after all tests in the Block
    // })

    beforeEach(function () {
        //runs before each test in the Block
        cy.visit("https://rahulshettyacademy.com/angularpractice/")
    })

    //afterEach(function() {
    //runs after each test in the block
    // })

    it("My first testcase", () => {


        cy.get("div[class='form-group'] input[name='name']").type(myData.name)
        cy.et("#exampleFormControlSelect1").select('Male').type(myData.gender)

        //Verify the TWO-Way Data-binding
        // cy.get("input[class='ng-pristine ng-valid ng-touched']").should('not.have.text', myData.name) 

        //Name edit box minimum character length should be 2
        cy.get("div[class='form-group'] input[name='name']").should("have.attr", "minlength", "2")

        //Employment status, enterpreneur should be disabled
        cy.get("#inlineRadio3").should('be.disabled')
    })

    //Building custom Cypress commands
    it.only("My second testcase", () => {
        cy.get("ul[class='navbar-nav'] li:nth-child(2)").click()

        //Parameterize test with Multiple dataset
        myData.productName.forEach(function (element) {
            cy.selectProduct(element)
        });
    })
})