import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import React from 'react'

type SutTypes = {
    history: MemoryHistory
    setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
            <Router history={history}>
                <Header />
            </Router>
        </ApiContext.Provider>
    )

    return {
        history,
        setCurrentAccountMock
    }
}

describe('Header Component', () => {
    test('Should call setCurrentAccount with null', () => {
        const { setCurrentAccountMock, history } = makeSut()
        fireEvent.click(screen.getByTestId('logout'))
        expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
        expect(history.location.pathname).toBe('/login')
    })

    test('Should rendere name correctly', () => {
        const account = mockAccountModel()
        makeSut(account)
        expect(screen.getByTestId('username')).toHaveTextContent(account.name)
    })
})