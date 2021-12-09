/// <reference types="cypress" />

it('opens the chat from the test code', () => {
  cy.visit('public/index.html')
  // wait for the chat object to be created
  // and then invoke a method on it
  // https://on.cypress.io/invoke
  cy.window().its('tidioChatApi', { timeout: 10000 }).invoke('open')
})
