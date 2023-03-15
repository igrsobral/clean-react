import faker from 'faker'
import * as Helper from '../support/http-mocks'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/, 'POST')
export const mockServerError = (): void => Helper.mockServerError(/signup/, 'POST')
export const mockOk = (): void => Helper.mockOk(/signup/, 'POST', { accessToken: faker.datatype.uuid() })
