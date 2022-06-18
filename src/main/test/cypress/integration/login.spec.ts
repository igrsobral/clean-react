describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })

    it('should load with correct initial state', () => {
        cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'Campo obrigatório');
    });
})