/// <reference types="cypress" />

describe('wait for 3rd party JS to start working', () => {
  it('waits for the chat object to be created', () => {
    cy.intercept('https://code.tidio.co/*.js', () =>
      Cypress.Promise.delay(3000),
    ).as('tidio')
    cy.visit('public/index.html')
    // wait for the chat object to be created
    // before clicking on the button
    // https://on.cypress.io/its
    cy.window().its('tidioChatApi')
    cy.get('#open-chat').click()
  })
})
