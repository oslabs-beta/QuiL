describe('checks Main page contents are properly displayed after being redirected from root', () => {

    const checkMainContents = () => {
        it('checks to see if main page contents are properly loaded', () => {
            cy.getByData('nav-bar').should('be.visible')
            cy.getByData('view-schemas-resolvers-btn').should('be.visible')
            cy.getByData('insert-uri-main').should('be.visible')
            cy.getByData('main-launch-btn').should('be.visible')
            cy.getByData('react-flow').should('be.visible')
            cy.getByData('nav-bar').should('be.visible')
        })
    }

    context('mimics non logged in user choosing starwars sample data base from root', () => {
        it('successfully loads root', () => {
            cy.visit('http://localhost:3000/')
        })
        it('clicks on sample database select and clicks starwars then clicks launch', () => {
            cy.getByData('select-sample-db').select('Star Wars')
            cy.getByData('root-launch').click()
        })
        checkMainContents();
    })

    context('mimics non logged in user using personal URI input (starwars)', () => {
        it('successfully loads root', () => {
            cy.visit('http://localhost:3000/')
        })
        it('clicks on sample database select and clicks starwars then clicks launch', () => {
            cy.getByData('root-uri-input').type('postgres://lkdxllvk:GTIkPygxpPOx0ZVNJ3luQHEfApEIJekP@heffalump.db.elephantsql.com/lkdxllvk')
            cy.getByData('root-launch').click()
        })
        checkMainContents();
    })




})






























export {};