import * as Helpers from '../support/helpers';
import * as Http from '../support/survey-list-mocks';
import faker from 'faker'

describe('SurveyList', () => {
    beforeEach(() => {
        Helpers.setLocalStorageItem('account', {
            accessToken: faker.datatype.uuid(),
            name: faker.name.findName(),
        })
    })

    it('Should present error on UnexpectedError', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve')
    });

    it('Should logout on AccessDeniedError', () => {
        Http.mockAccessDeniedError()
        cy.visit('')
        Helpers.testUrl('/login')
    });

    it('Should correct username', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        const { name } = Helpers.getLocalStorageItem('account')
        cy.getByTestId('username').should('contain.text', name)
    });

    it('Should logout on logout link click', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('logout').click()
        Helpers.testUrl('/login')
    });
})