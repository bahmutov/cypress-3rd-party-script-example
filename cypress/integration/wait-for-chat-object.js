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
    // we increase the timeout, because the network request
    // is slowed down by 3 seconds, leaving very little time
    // for the the library to load and start working
    cy.window().its('tidioChatApi', { timeout: 6000 })
    cy.get('#open-chat').click()
  })
})
