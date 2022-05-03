import { LocalStorageAccessToken } from "./local-save-access-token"
import { SetStorageSpy } from "@/data/test/mock-storage"
import faker from 'faker'

type SutTypes = {
    sut: LocalStorageAccessToken
    setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalStorageAccessToken(setStorageSpy)
    return {
        sut,
        SetStorageSpy
    }
}

describe('LocalSaveAccessToken', () => {
    test('Should call SetStorage with correct value', async () => {
        const { sut, setStorageSpy } = makeSut()
        const accessToken = faker.random.uuid()
        await sut.save(accessToken)
        expect(setStorageSpy.key).toBe('accessToken')
        expect(setStorageSpy.value).toBe(accessToken)
    })
})