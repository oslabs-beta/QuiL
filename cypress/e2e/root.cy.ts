const checkRootContents = () => {
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
}

describe('checks to see root page contents are properly displayed', () => {
  it('successfully loads root', () => {
  cy.visit('http://localhost:3000/') //this will change to actual domain name
  checkRootContents();
  })
})


// not done yet, need to figure out cookies within cypress
describe('new user visiting root page and registering', () => {
  it('clicks register button and redirects to /Register', () => {
    cy.visit('http://localhost:3000/')
    cy.getByData('root-register-btn').click()
    cy.url().should('include', '/Register')
    cy.getByData('register-form').should('be.visible')
  })
  it('clicks github register button and redirects to github', () => {
    cy.getByData('register-github-btn').click()
    cy.url().should('include', 'github.com/login')
    cy.get('.js-login-field').type('fakeGitHubQuil')
    cy.get('.js-password-field').type('codesmithquil1')
    cy.get('.js-sign-in-button').click()
  })
})

// errors out due to JWT issue. cannot read properties of null
describe.only('returning user attempting to login', () => {
  it('clicks login button and redirects to /Login', () => {
    cy.visit('http://localhost:3000/')
    cy.getByData('root-login-btn').click()
    cy.url().should('include', '/Login')
    cy.getByData('login-form').should('be.visible')
    cy.getByData('login-username').type('KingFritz')
    cy.getByData('login-password').type('1')
    cy.getByData('login-button').click()
  })
})

export {};