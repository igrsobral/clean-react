describe('Login', () => {
    it('should load with correct initial state', () => {
        cy.visit('/login');
        cy.get('h1').should('contain', 'Login');
    });
})