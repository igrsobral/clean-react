import * as Helper from '../support/http-mocks'

export const mockUnexpectedError = (): void => Helper.mockServerError(/surveys/, 'GET')
export const mockAccessDeniedError = (): void => Helper.mockForbiddenError(/surveys/, 'GET')
