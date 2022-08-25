import { AxiosHttpClient } from "./axios-http-client";
import axios from 'axios';

import faker from 'faker'
import { mockAxios, mockHttpResponse } from "@/infra/test";
import { mockGetRequest, mockPostRequest } from "@/data/test";

jest.mock('axios');

type SutTypes = {
    sut: AxiosHttpClient;
    mockedAxios: jest.Mocked<typeof axios>
}

mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient();
}

const mockPostRequest = (): HttpPostParams => ({
    url: faker.internet.url(),
    body: faker.random.objectElement(),
})

describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async () => {
        const request = mockPostRequest();
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    });

    test('Should return the correct statusCode and body', async () => {
        const sut = makeSut();
        const httpResponse = await sut.post(mockPostRequest())
        expect(httpResponse).toEqual({
            statusCode: mockedAxiosResult.status,
            body: mockedAxiosResult.data
        });
    });

    test('Should return the correct statusCode and body on failure', async () => {
        const sut = makeSut();
        mockedAxios.post.mockRejectedValueOnce({
            response: mockHttpResponse()
        })
        const promise = sut.post(mockPostRequest());
        expect(promise).toEqual(mockedAxios.post.mock.results?.[0]?.value)
    });
});
=======
            expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
        });
    })

    describe('get', () => {
        test('Should call axios.get with correct values', async () => {
            const request = mockGetRequest();
            const { sut, mockedAxios } = makeSut()
            await sut.get(request)
            expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
        });

        test('Should return correct response on axios.get', async () => {
            const { sut, mockedAxios } = makeSut()
            const httpResponse = await sut.get(mockGetRequest())
            const axiosResponse = await mockedAxios.get.mock.results[0].value
            expect(httpResponse).toEqual({
                statusCode: axiosResponse.status,
                body: axiosResponse.data,
            })
        });

        test('Should return correct error on axios.get', () => {
            const { sut, mockedAxios } = makeSut()
            mockedAxios.get.mockRejectedValueOnce({
                response: mockHttpResponse()
            })
            const promise = sut.get(mockGetRequest());
            expect(promise).toEqual(mockedAxios.get.mock.results[0].value)
        });
    })
>>>>>>> 52d176295d469fdb75d86bf506df1ba42efb8637
});


