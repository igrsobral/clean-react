import * as FormHelper from '../utils/form-helpers';
import * as Helpers from '../utils/helpers';
import * as Http from '../utils/http-mocks'
import faker from 'faker'

const path = /login/
export const mockUnathorizedError = (): void => Http.mockUnathorizedError(path, 'POST')
export const mockServerError = (): void => Http.mockServerError(path, 'POST')
export const mockSuccess = (): void => Http.mockOk(path, 'POST', 'account')

const populateFields = () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
}

const simulateValidSubmit = (): void => {
    populateFields();
    cy.getByTestId('submit').click()
}

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })

    it('Should load with correct initial state', () => {
        cy.getByTestId('email').should('have.attr', 'readOnly');
        FormHelper.testInputsStatus('email', 'Campo obrigatório');
        cy.getByTestId('password').should('have.attr', 'readOnly');
        FormHelper.testInputsStatus('email', 'Campo obrigatório');
        cy.getByTestId('submit').should('have.attr', 'disabled');
        cy.getByTestId('error-wrap').should('not.have.descendants');
    });

    it('Should present error state if form is invalid', () => {
        cy.getByTestId('email').focus().type(faker.random.word());
        FormHelper.testInputsStatus('email', 'Valor inválido');
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
        FormHelper.testInputsStatus('password', 'Valor inválido');
        cy.getByTestId('submit').should('have.attr', 'disabled');
        cy.getByTestId('error-wrap').should('not.have.descendants');
    });

    it('Should present valid state if form is valid', () => {
        cy.getByTestId('email').focus().type(faker.internet.email());
        FormHelper.testInputsStatus('email');
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
        cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
        cy.getByTestId('password').should('not.have.attr', 'title')
        cy.getByTestId('password-label').should('not.have.attr', 'title')
        cy.getByTestId('submit').should('not.have.attr', 'disabled');
        cy.getByTestId('error-wrap').should('not.have.descendants');
    });

    it('Should present InvalidCredentialsError on 401', () => {
        mockUnathorizedError();
        simulateValidSubmit();
        FormHelper.testMainError('Credenciais inválidas')
        Helpers.testUrl('/login')
    });

    it('Should  present UnexpectedError on default error cases', () => {
        mockServerError();
        simulateValidSubmit();
        FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve')
        Helpers.testUrl('/login')
    });

    it('Should present save accessToken if valid credentials are provided', () => {
        mockSuccess();
        simulateValidSubmit();
        cy.getByTestId('error-wrap').should('not.have.descendants');
        Helpers.testUrl('/')
        Helpers.testLocalStorageItem('account')
    });

    // it('Should prevent multiple submits', () => {
    //     mockOk();
    //     populateFields()
    //     cy.getByTestId('submit').dblclick()
    //     FormHelper.testHttpCallCount(1)
    // });

    it('Should not call submit if form is invalid', () => {
        mockSuccess();
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}');
        Helpers.testHttpCallCount(0)
    });
})