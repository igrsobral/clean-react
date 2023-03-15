import * as Helper from '../support/http-mocks'

export const mockUnexpectedError = (): void => Helper.mockServerError(/surveys/, 'GET')
