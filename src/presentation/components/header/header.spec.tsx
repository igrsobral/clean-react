import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '@/presentation/components'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import ApiContext from '@/presentation/contexts/api/api-context'
import { AccountModel } from '@/domain/models'

type SutTypes = {
    history: MemoryHistory
    setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
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
})