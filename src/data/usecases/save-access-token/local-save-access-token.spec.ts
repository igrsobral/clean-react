import { LocalStorageAccessToken } from "./local-save-access-token"
import { SetStorageMock } from "@/data/test/mock-storage"
import faker from 'faker'

type SutTypes = {
    sut: LocalStorageAccessToken
    setStorageSpy: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageSpy = new SetStorageMock()
    const sut = new LocalStorageAccessToken(setStorageSpy)
    return {
        sut,
        setStorageSpy
    }
}

describe('LocalSaveAccessToken', () => {
    test('Should call SetStorage with correct value', async () => {
        const { sut, setStorageSpy } = makeSut()
        const accessToken = faker.random.alphaNumeric()
        await sut.save(accessToken)
        expect(setStorageSpy.key).toBe('accessToken')
        expect(setStorageSpy.value).toBe(accessToken)
    })
})