/// <reference types="cypress" />

it('opens chat widget', () => {
  cy.intercept(
    'https://code.tidio.co/zwjhqkduaeqdmkflwoyfcmqd64fj2a3s.js',
    // (req) => {
    //   return Cypress.Promise.delay(3000).then(() => req.continue())
    // },
  ).as('tidio')
  cy.visit('public/index.html')
  // cy.wait('@tidio')
  // verify the chat widget is ready to work
  // cy.window().its('tidioChatApi') // .invoke('open')
  cy.get('#open-chat').click()
})
