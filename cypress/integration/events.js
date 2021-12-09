/// <reference types="cypress" />

it('delivers the ready event', () => {
  cy.visit('public/index.html')
  cy.window().its('tidioChatApi').invoke('on', 'ready', cy.stub().as('ready'))
  cy.get('@ready').should('be.called')
})
