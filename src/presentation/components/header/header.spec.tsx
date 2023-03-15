import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '@/presentation/components'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import ApiContext from '@/presentation/contexts/api/api-context'

describe('Header Component', () => {
    test('Should call setCurrentAccount with null', () => {
        const history = createMemoryHistory({ initialEntries: ['/'] })
        const setCurrentAccountMock = jest.fn()
        render(
            <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
                <Router history={history}>
                    <Header />
                </Router>
            </ApiContext.Provider>
        )
        fireEvent.click(screen.getByTestId('logout'))
        expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
        expect(history.location.pathname).toBe('/login')
    })
})