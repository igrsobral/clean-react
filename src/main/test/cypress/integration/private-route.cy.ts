import * as Helper from '../utils/helpers'

describe('Login', () => {
    it('Should logout if survey-list has no token', () => {
        cy.visit('')
        Helper.testUrl('/login')
    })
})