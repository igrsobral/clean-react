import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { AddAccount, AddAccountParams, AuthenticationParams } from '@/domain/useCases';

export class AddAccountSpy implements AddAccount {
    account = mockAccountModel();
    params: AddAccountParams;

    async add(params: AddAccountParams): Promise<AccountModel> {
        this.params = params;
        return this.account;
    }
}