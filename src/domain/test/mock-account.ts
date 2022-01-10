import { Authentication, AuthenticationParams } from '@/domain/useCases/authentication';
import * as faker from 'faker'
import { AccountModel } from '../models/accout-models';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
})