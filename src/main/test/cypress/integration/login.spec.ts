import faker from 'faker'


describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })

    it('should load with correct initial state', () => {
        cy.get('[data-testid="email"]').should('have.attr', 'readOnly');
        cy.get('[data-testid="email-status"]')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('contain.text', '🔴')
        cy.get('[data-testid="password"]').should('have.attr', 'readOnly');
        cy.get('[data-testid="password-status"]')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('contain.text', '🔴')
        cy.get('[data-testid="submit"]').should('have.attr', 'disabled');
        cy.get('[data-testid="error-wrap"]').should('not.have.descendants');
    });

    it('should present error if form is invalid', () => {
        cy.get('[data-testid="email"]').focus().type(faker.random.word());
        cy.get('[data-testid="email-status"]')
            .should('have.attr', 'title', 'Valor inválido')
            .should('contain.text', '🔴')
        cy.get('[data-testid="password"]').focus().type(faker.random.alphaNumeric(3));
        cy.get('[data-testid="password-status"]')
            .should('have.attr', 'title', 'Valor inválido')
            .should('contain.text', '🔴')
        cy.get('[data-testid="submit"]').should('have.attr', 'disabled');
        cy.get('[data-testid="error-wrap"]').should('not.have.descendants');
    });

    it('should present valid state if form is valid', () => {
        cy.get('[data-testid="email"]').focus().type(faker.internet.email());
        cy.get('[data-testid="email-status"]')
            .should('have.attr', 'title', 'Tudo certo')
            .should('contain.text', '✅')
        cy.get('[data-testid="password"]').focus().type(faker.random.alphaNumeric(5));
        cy.get('[data-testid="password-status"]')
            .should('have.attr', 'title', 'Tudo certo')
            .should('contain.text', '✅')
        cy.get('[data-testid="submit"]').should('not.have.attr', 'disabled');
        cy.get('[data-testid="error-wrap"]').should('not.have.descendants');
    });
})