import faker from 'faker'
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from "./local-storage-adapter";

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('Should call localStorage.setItem with correct values', async () => {
        const sut = makeSut();
        const key = faker.database.column()
        const value = faker.random.objectElement<{}>()
        sut.set(key, value)
        expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
    })

    test('Should call localStorage.removeItem if value is null', async () => {
        const sut = makeSut();
        const key = faker.database.column()
        sut.set(key, undefined)
        expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    })

    test('Should call localStorage.getItem with correct value', async () => {
        const sut = makeSut();
        const key = faker.database.column()
        const value = faker.random.objectElement<{}>()
        const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value));
        const object = sut.get(key)
        expect(object).toEqual(value);
        expect(getItemSpy).toHaveBeenCalledWith(key)
    })
});