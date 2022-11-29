describe('root page contents', () => {
  it('successfully loads root', () => {
  cy.visit('http://localhost:3000/') //this will change to actual domain name
  }) 

  before(() => {
    cy.visit('http://localhost:3000/')
  })

  it('checks to see if root page displays elements and contains the correct values', () => {
    cy.getByData('root-register').should('be.visible')
    cy.getByData('root-login').should('be.visible')
    cy.getByData('root-uri-input').should('be.visible')
    cy.getByData('root-h1').contains('QuiL').should('be.visible')
    cy.getByData('root-p').should('be.visible')
    cy.getByData('select-sample-db').select('Star Wars').should('have.value', 
    'postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk')
    cy.getByData('select-sample-db').select('Quitr').should('have.value', 
    'postgres://nsjouiot:4nVVHLiARTADoIiwArtQLG-HfkhQR03k@peanut.db.elephantsql.com/nsjouiot')
  })
})

export {};