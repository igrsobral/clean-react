import faker from 'faker'

const baseUrl = Cypress.config().baseUrl;

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

    it('should present InvalidCredentialsError on 401', () => {
        cy.intercept('POST', '/login/', {
            statusCode: 401,
            response: {
                error: faker.random.words()
            }
        }).as('request')
        cy.get('[data-testid="email"]').focus().type(faker.internet.email());
        cy.get('[data-testid="password"]').focus().type(faker.random.alphaNumeric(5));
        cy.get('[data-testid="submit"]').click();
        cy.get('[data-testid="spinner"]').should('not.exist')
        cy.get('[data-testid="main-error"]').should('contain.text', 'Credenciais inválidas')
        cy.url().should('eq', `${baseUrl}/login`)
    });

    it('should  present UnexpectedError if invalid data is returned', () => {
        cy.intercept('POST', '/login/', {
            statusCode: 200,
            response: {
                invalidProperty: faker.random.uuid()
            }
        }).as('request')
        cy.get('[data-testid="email"]').focus().type(faker.internet.email());
        cy.get('[data-testid="password"]').focus().type(faker.random.alphaNumeric(5)).type('{enter}');
        cy.get('[data-testid="spinner"]').should('not.exist')
        cy.get('[data-testid="main-error"]').should('contain.text', 'Credenciais inválidas')
        cy.url().should('eq', `${baseUrl}/login`)
    });

    it('should save accessToken if valid credentials are provided', () => {
        cy.intercept('POST', '/login/', {
            statusCode: 200,
            response: {
                accessToken: faker.random.uuid()
            }
        }).as('request')
        cy.get('[data-testid="email"]').focus().type(faker.internet.email());
        cy.get('[data-testid="password"]').focus().type(faker.random.alphaNumeric(5));
        cy.get('[data-testid="submit"]').click();
        cy.get('[data-testid="main-error"]').should('not.exist')
        cy.get('[data-testid="spinner"]').should('not.exist')
        cy.url().should('eq', `${baseUrl}/login`)
    });

    it('should prevent multiple submits', () => {
        cy.intercept('POST', '/login/', {
            statusCode: 200,
            response: {
                accessToken: faker.random.uuid()
            }
        }).as('request')
        cy.get('[data-testid="email"]').focus().type(faker.internet.email());
        cy.get('[data-testid="password"]').focus().type(faker.random.alphaNumeric(5));
        cy.get('[data-testid="submit"]').dblclick()
        cy.get('@request.all').should('have.length', 0)
    });

    it('should not call submit if form is invalid', () => {
        cy.intercept('POST', '/login/', {
            statusCode: 200,
            response: {
                accessToken: faker.random.uuid()
            }
        }).as('request')
        cy.get('[data-testid="email"]').focus().type(faker.internet.email()).type('{enter}');
        cy.get('@request.all').should('have.length', 0)
    });

})