import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { mockAccountModel } from '@/domain/test'

describe('CurrentAccountAdapter', () => {
    test('should call LocalStorageAdapter.set with correct values', () => {
        const account = mockAccountModel()
        const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
        setCurrentAccountAdapter(account)
        expect(setSpy).toHaveBeenCalledWith('account', account)
    })

    test('should call LocalStorageAdapter.get with correct value', () => {
        const account = mockAccountModel()
        const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)
        const result = getCurrentAccountAdapter()
        expect(getSpy).toHaveBeenCalledWith('account')
        expect(result).toEqual(account)

    })
})