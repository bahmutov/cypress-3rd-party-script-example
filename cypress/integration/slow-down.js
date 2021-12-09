/// <reference types="cypress" />

describe('slow down 3rd party JS load', () => {
  it('by returning a promise', () => {
    cy.intercept('https://code.tidio.co/*.js', (req) =>
      Cypress.Promise.delay(3000).then(() => req.continue()),
    ).as('tidio')
    cy.visit('public/index.html')
    cy.wait('@tidio')
    // by now the JS should have loaded
    cy.get('#open-chat').click()
  })
})
