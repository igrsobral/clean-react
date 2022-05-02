import {  AuthenticationParams } from '@/domain/useCases/authentication';
import { AccountModel } from '@/domain/models';
import * as faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
})