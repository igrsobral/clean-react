import * as Helpers from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /api\/surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'survey-list')

describe('SurveyList', () => {
    beforeEach(() => {
        cy.fixture('account').then(account => {
            Helpers.setLocalStorageItem('account', account)
        })
    })

    it('Should present error on UnexpectedError', () => {
        mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve')
    });

    it('Should reload on button click', () => {
        mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve')
        mockSuccess()
        cy.getByTestId('reload').click()
        cy.get('li:not(:empty)').should('have.length', 2)
    });

    it('Should logout on AccessDeniedError', () => {
        mockAccessDeniedError()
        cy.visit('')
        Helpers.testUrl('/login')
    });

    it('Should correct username', () => {
        mockUnexpectedError()
        cy.visit('')
        const { name } = Helpers.getLocalStorageItem('account')
        cy.getByTestId('username').should('contain.text', name)
    });

    it('Should logout on logout link click', () => {
        mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('logout').click()
        Helpers.testUrl('/login')
    });

    it('Should present survey items', () => {
        mockSuccess()
        cy.visit('')
        cy.get('li:empty').should('have.length', 4)
        cy.get('li:not(:empty)').should('have.length', 2)
        cy.get('li:nth-child(1)').then(li => {
            assert.equal(li.find('[data-testid="day"]').text(), '03')
            assert.equal(li.find('[data-testid="month"]').text(), 'fev')
            assert.equal(li.find('[data-testid="year"]').text(), '2018')
            assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
            cy.fixture('icons').then(icon => {
                assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
            })
        })
        cy.get('li:nth-child(2)').then(li => {
            assert.equal(li.find('[data-testid="day"]').text(), '03')
            assert.equal(li.find('[data-testid="month"]').text(), 'fev')
            assert.equal(li.find('[data-testid="year"]').text(), '2022')
            assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
            cy.fixture('icons').then(icon => {
                assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
            })
        })
    });
})