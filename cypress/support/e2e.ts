// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

describe("Test home button redirecting to /home", () => {
    it("check if redirected link contans /home", () => {
        cy.visit("http://localhost:3000/users");

        cy.contains("Home").click();

        cy.url().should("include", "/home");
    });
});

describe("User can sign up", () => {
    it("Check if input updates and user registers", () => {
        cy.visit("http://localhost:3000/users");

        cy.contains("Sign Up").click();

        const name = `Test user #${Math.floor(Math.random() * 10000)}`;

        cy.get('[id="sign-up-input"]').type(name);
        cy.get('[id="sign-up-input"]').should("have.value", name);

        cy.contains("Sign up").click();

        cy.contains("Submit New").click();
        cy.contains("Submit New Resource");
    });
});

describe("User can choose a name from the selector", () => {
    it("", () => {
        cy.visit("http://localhost:3000/users");

        cy.get('[id="user-selector"]').select(1);
    });
});

describe("User can filter for a resource", () => {
    it("User types a search string", () => {
        cy.visit("http://localhost:3000/home");
        cy.wait(1000);

        cy.get('[id="search-bar"]').type("Get Link Preview API");
        cy.contains("Get Link Preview API").click();
        cy.contains("Close").click();
    });
});
