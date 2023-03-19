import { HttpGetClientSpy } from "@/data/test"
import { RemoteLoadSurveyResult } from "@/data/usecases"
import faker from 'faker'

describe('RemoteSurveyList', () => {
    test('Should call HtttGetClient with correct url', async () => {
        const url = faker.internet.url()
        const httpGetClientSpy = new HttpGetClientSpy
        const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
        await sut.load()
        expect(httpGetClientSpy.url).toBe(url)
    })
})