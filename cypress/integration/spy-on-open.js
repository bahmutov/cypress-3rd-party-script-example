/// <reference types="cypress" />

it('calls chat open method', () => {
  cy.visit('public/index.html')
  // get the window.tidioChatApi object
  cy.window()
    .its('tidioChatApi')
    // spy on tidioChatApi.open method call
    .then((tidioChatApi) => {
      cy.spy(tidioChatApi, 'open').as('open')
    })
  // click on the button
  cy.get('#open-chat').click()
  // confirm the spy was called once without arguments
  cy.get('@open').should('be.calledOnceWithExactly')
})
