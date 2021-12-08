/// <reference types="cypress" />

Cypress.Commands.add('getIframeBody', () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  cy.log('getIframeBody')

  return (
    cy
      .get('iframe#tidio-chat-iframe', { log: false })
      .its('0.contentDocument.body', { log: false })
      .should(($body) => {
        expect($body).to.not.be.empty
      })
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then((body) => cy.wrap(body, { log: false }))
  )
})

it('opens chat widget', () => {
  // cy.intercept('https://code.tidio.co/*.js', (req) => {
  //   return Cypress.Promise.delay(3000).then(() => req.continue())
  // }).as('tidio')
  // DOES NOT WORK - Cypress does not understand a promise resolved with a number
  // cy.intercept('https://code.tidio.co/*.js', Cypress.Promise.delay(3000)).as(
  //   'tidio',
  // )

  // Tip: slow down the response by 3 seconds
  cy.intercept('https://code.tidio.co/*.js', () =>
    Cypress.Promise.delay(3000),
  ).as('tidio')

  cy.visit('public/index.html')
  cy.wait('@tidio')
  // verify the chat widget is ready to work
  // cy.window().its('tidioChatApi') // .invoke('open')
  cy.window().its('tidioChatApi')
  // cy.get('#open-chat').click()

  // let's confirm the chat widget events are working
  // https://docs.tidio.com/docs/listeners_events
  cy.window()
    .its('tidioChatApi')
    .invoke('on', 'messageFromVisitor', cy.stub().as('messageFromVisitor'))

  cy.getIframeBody().within(() => {
    cy.get('[data-testid=flyNewMessageButton]')
      .should('be.visible')
      .type('I am CY!{enter}')
    cy.get('.chat')
      .should('be.visible')
      .contains('.message-visitor', 'I am CY!')
      .should('be.visible')
  })

  // confirm the message event was fired
  cy.get('@messageFromVisitor').should('be.calledOnceWith', {
    message: 'I am CY!',
    fromBot: false,
  })
})
