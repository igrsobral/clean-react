import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-cient';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { mockAuthentication } from '@/domain/test/mock-authentication';
import { internet } from 'faker';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut =   new RemoteAuthentication(url, httpPostClientSpy);
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication' , () => {
    test('Should Call HttpPostClient with correct URL', async () => {
       const url = internet.url()
       const { sut, httpPostClientSpy } = makeSut(url)
       await sut.auth(mockAuthentication())
       expect(httpPostClientSpy.url).toBe(url) 
    })

    test('Should call HttpPostClient with correct body', async () => {
        const { sut, httpPostClientSpy} = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })
   
    test('Should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
        const { sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode : HttpStatusCode.unathorized
        };

        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
})