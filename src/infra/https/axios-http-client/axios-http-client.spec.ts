import { AxiosHttpClient } from "./axios-http-client";
import axios from 'axios';

import faker from 'faker'
import { HttpPostParams } from "@/data/protocols/http";
import { mockHttpResponse } from "@/infra/test";

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.datatype.number()
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient();
}

const mockPostRequest = (): HttpPostParams => ({
    url: faker.internet.url(),
    body: faker.random.objectElement(),
})

describe('AxiosHttpClient', () => {
    describe('post', () => {
        test('Should call axios.post with correct values', async () => {
            const request = mockPostRequest();
            const sut = makeSut()
            await sut.post(request)
            expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
        });

        test('Should return correct response on axios.post', async () => {
            const sut = makeSut();
            const httpResponse = await sut.post(mockPostRequest())
            expect(httpResponse).toEqual({
                statusCode: mockedAxiosResult.status,
                body: mockedAxiosResult.data
            });
        });

        test('Should return  correct error on axios.post', async () => {
            const sut = makeSut();
            mockedAxios.post.mockRejectedValueOnce({
                response: mockHttpResponse()
            })
            const promise = sut.post(mockPostRequest());
            expect(promise).toEqual(mockedAxios.post.mock.results?.[0]?.value)
        });
    });

    describe('get', () => {
        test('Should call axios.post with correct values', async () => {
            const request = mockPostRequest();
            const sut = makeSut()
            await sut.post(request)
            expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
        });

        test('Should return correct response on axios.post', async () => {
            const sut = makeSut();
            const httpResponse = await sut.post(mockPostRequest())
            expect(httpResponse).toEqual({
                statusCode: mockedAxiosResult.status,
                body: mockedAxiosResult.data
            });
        });

        test('Should return  correct error on axios.post', async () => {
            const sut = makeSut();
            mockedAxios.post.mockRejectedValueOnce({
                response: mockHttpResponse()
            })
            const promise = sut.post(mockPostRequest());
            expect(promise).toEqual(mockedAxios.post.mock.results?.[0]?.value)
        });
    });
});


