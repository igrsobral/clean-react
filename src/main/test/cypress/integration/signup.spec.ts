import * as FormHelper from '../support/form-helper';
import faker from 'faker'

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
})