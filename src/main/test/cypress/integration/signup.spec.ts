import * as FormHelper from '../support/form-helper';
import faker from 'faker'

describe('Login', () => {
    beforeEach(() => {
        cy.visit('signup')
    })

    it('should load with correct initial state', () => {
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

    it('should present error state if form is invalid', () => {
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
})