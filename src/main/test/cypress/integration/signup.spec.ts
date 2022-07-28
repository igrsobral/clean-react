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



})