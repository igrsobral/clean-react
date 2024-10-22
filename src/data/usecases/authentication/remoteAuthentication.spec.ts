import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { mockAuthenticationModel, mockAuthenticationParams } from '@/domain/test';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { internet } from 'faker';

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy<RemoteAuthentication.Model>
}

const makeSut = (url: string = internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<RemoteAuthentication.Model>();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {
    test('Should Call HttpPostClient with correct URL', async () => {
        const url = internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthenticationParams())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })

    test('Should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized
        };

        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw UnexpectedError if HttpPostClient return 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        };

        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient return 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        };

        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient return 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        };

        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should return an Authentication.Model if HttpPostClient return 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const httpResult = mockAuthenticationModel()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        };

        const account = await sut.auth(mockAuthenticationParams())
        expect(account).toEqual(httpResult)
    })
})