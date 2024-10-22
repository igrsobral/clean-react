import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import PrivateRoute from './private-route'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
    history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
        <ApiContext.Provider value={{ getCurrentAccount: () => account }} >
            <BrowserRouter>
                <Router history={history}>
                    <PrivateRoute />
                </Router>
            </BrowserRouter>
        </ApiContext.Provider>
    )
    return { history }
}

describe('PrivateRoutes', () => {
    test('Should redirect to login if token is empty', () => {
        const { history } = makeSut(null)
        expect(history.location.pathname).toBe('/login')
    })

    test('Should render component if token is not empty', () => {
        const { history } = makeSut()
        expect(history.location.pathname).toBe('/')
    })
})