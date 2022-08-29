import { setCurrentAccountAdapter } from './current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { mockAccountModel } from '@/domain/test'
import { UnexpectedError } from '@/domain/errors'

describe('CurrentAccountAdapter', () => {
    test('should call LocalStorageAdapter with correct values', () => {
        const account = mockAccountModel()
        const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
        setCurrentAccountAdapter(account)
        expect(setSpy).toHaveBeenCalledWith('account', account)
    })

    test('should throw UnexpectedError', () => {
        expect(() => {
            setCurrentAccountAdapter(undefined)
        }).toThrow(new UnexpectedError())
    })
})