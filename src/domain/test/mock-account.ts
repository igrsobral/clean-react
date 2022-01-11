import {  AuthenticationParams } from '@/domain/useCases/authentication';
import { AccountModel } from '../models';
import * as faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
})