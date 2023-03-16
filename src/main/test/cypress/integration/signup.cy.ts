import * as FormHelper from '../utils/form-helpers';
import * as Helpers from '../utils/helpers';
import * as Http from '../utils/http-mocks'
import faker from 'faker'

const mockEmailInUseError = (): void => Http.mockEmailInUseError(/signup/, 'POST')
const mockServerError = (): void => Http.mockServerError(/signup/, 'POST')
const mockSuccess = (): void => Http.mockOk(/signup/, 'POST', { accessToken: faker.datatype.uuid() })

const populateFields = (): void => {
    cy.getByTestId('name').focus().type(faker.name.findName());
    cy.getByTestId('email').focus().type(faker.internet.email());
    const password = faker.random.alphaNumeric(7);
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
    populateFields()
    cy.getByTestId('submit').click()
}

describe('Login', () => {
    beforeEach(() => {
        cy.visit('signup')
    })

    it('Should load with correct initial state', () => {
        cy.getByTestId('name').should('have.attr', 'readOnly');
        FormHelper.testInputsStatus('name', 'Campo obrigatório');
        cy.getByTestId('email').should('have.attr', 'readOnly');
        FormHelper.testInputsStatus('email', 'Campo obrigatório');
        cy.getByTestId('password').should('have.attr', 'readOnly');
        FormHelper.testInputsStatus('email', 'Campo obrigatório');
        cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
        FormHelper.testInputsStatus('passwordConfirmation', 'Campo obrigatório');
        cy.getByTestId('submit').should('have.attr', 'disabled');
        cy.getByTestId('error-wrap').should('not.have.descendants');
    });

    it('Should present error state if form is invalid', () => {
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3));
        FormHelper.testInputsStatus('name', 'Valor inválido');
        cy.getByTestId('email').focus().type(faker.random.word());
        FormHelper.testInputsStatus('email', 'Valor inválido');
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
        FormHelper.testInputsStatus('password', 'Valor inválido');
        cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4));
        FormHelper.testInputsStatus('passwordConfirmation', 'Valor inválido');
        cy.getByTestId('submit').should('have.attr', 'disabled');
        cy.getByTestId('error-wrap').should('not.have.descendants');
    });

    it('Should present valid state if form is valid', () => {
        cy.getByTestId('name').focus().type(faker.name.findName());
        FormHelper.testInputsStatus('name');
        cy.getByTestId('email').focus().type(faker.internet.email());
        FormHelper.testInputsStatus('email');
        const password = faker.random.alphaNumeric(5);
        cy.getByTestId('password').focus().type(password);
        FormHelper.testInputsStatus('password');
        cy.getByTestId('passwordConfirmation').focus().type(password);
        FormHelper.testInputsStatus('passwordConfirmation');
        cy.getByTestId('submit').should('not.have.attr', 'disabled');
        cy.getByTestId('error-wrap').should('not.have.descendants');
    });

    it('Should present EmailInUseError on 403', () => {
        mockEmailInUseError();
        simulateValidSubmit();
        FormHelper.testMainError('Este e-mail já está sendo usado')
        Helpers.testUrl('/signup')
    });

    it('Should present UnexpectedError on default error cases', () => {
        mockServerError();
        simulateValidSubmit();
        FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve')
        Helpers.testUrl('/signup')
    });

    it('Should present save accessToken if valid data crendentials are provided', () => {
        mockSuccess();
        simulateValidSubmit();
        cy.getByTestId('error-wrap').should('not.have.descendants');
        Helpers.testUrl('/')
        Helpers.testLocalStorageItem('account')
    });

    it('Should not call submit if form is invalid', () => {
        mockSuccess();
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}');
        Helpers.testHttpCallCount(0)
    });
})

