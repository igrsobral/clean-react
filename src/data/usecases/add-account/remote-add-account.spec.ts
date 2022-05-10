import { RemoteAddAccount } from './remote-add-account';
import { HttpPostClientSpy } from '@/data/test';
import { AddAccountParams } from '@/domain/useCases/add-account';
import faker from 'faker'
import { mockAddAccountParams } from '@/domain/test';
import { AccountModel } from '@/domain/models';
 
type SutTypes = {
    sut: RemoteAddAccount
    httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}


const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>();
    const sut = new RemoteAddAccount(url, httpPostClientSpy);
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication' , () => {
    test('Should Call HttpPostClient with correct URL', async () => {
       const url = faker.internet.url()
       const { sut, httpPostClientSpy } = makeSut(url)
       await sut.add(mockAddAccountParams())
       expect(httpPostClientSpy.url).toBe(url) 
    })
})