import { Authentication, AuthenticationParams } from '@/domain/useCases/authentication';
import * as faker from 'faker'
import { mockAccountModel } from './mock-account';

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel();
  params: Authentication.Params;
  callsCount = 0;

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
      this.params = params;
      this.callsCount++;
      return Promise.resolve(this.account);
  }
}