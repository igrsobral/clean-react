import { Method } from 'axios'
import faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
    cy.intercept('POST', url, {
        statusCode: 401,
        response: {
            error: faker.random.words()
        },
        hostname: 'localhost'
    }).as('request')
}

export const mockEmailInUseError = (url: RegExp): void => {
    cy.intercept('POST', url, {
        statusCode: 403,
        response: {
            error: faker.random.words()
        },
        hostname: 'localhost'
    }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: Method): void => {
    cy.intercept(method, url, {
        statusCode: faker.helpers.randomize([400, 404, 500]),
        response: {
            error: faker.random.words()
        },
        hostname: 'localhost'
    }).as('request')
}

export const mockOk = (url: RegExp, method: Method, response: any): void => {
    cy.server()
    cy.intercept(url, (req) => {
        req.reply((res) => {
            // replaces 'res.body' with "Success" and sends the response to the browser
            res.send(method, {
                accessToken: faker.random.uuid()
            })
            res.delay = 200
        })
    }).as('request')
}