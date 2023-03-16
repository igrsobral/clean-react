import { Method } from 'axios'
import faker from 'faker'

export const mockUnathorizedError = (url: RegExp, method: Method): void => {
    cy.intercept(method, url, {
        statusCode: 401,
        response: {
            error: faker.random.words()
        },
        hostname: 'localhost'
    }).as('request')
}

export const mockForbiddenError = (url: RegExp, method: Method): void => {
    cy.intercept(method, url, {
        statusCode: 403,
        response: {
            error: faker.random.words()
        },
        hostname: 'localhost'
    }).as('request')
}

export const mockEmailInUseError = (url: RegExp, method: Method): void => {
    cy.intercept(method, url, {
        statusCode: 403,
        response: {
            error: faker.random.words()
        },
        hostname: 'localhost'
    }).as('request')
}

export const mockServerError = (url: RegExp, method: Method): void => {
    cy.intercept(method, url, {
        statusCode: faker.helpers.randomize([400, 404, 500]),
        response: {
            error: faker.random.words()
        },
        hostname: 'localhost'
    }).as('request')
}

export const mockOk = (url: RegExp, method: string, fixture: any, alias: string = 'request'): void => {
    cy.intercept({
        method,
        url
    }, {
        statusCode: 200,
        fixture
    }).as(alias)
}
