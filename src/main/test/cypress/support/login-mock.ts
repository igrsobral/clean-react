import * as Http from '../support/http-mocks'
import faker from 'faker'

export const mockUnathorizedError = (): void => Http.mockUnathorizedError(/login/, 'POST')
export const mockServerError = (): void => Http.mockServerError(/login/, 'POST')
export const mockOk = (): void => Http.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })