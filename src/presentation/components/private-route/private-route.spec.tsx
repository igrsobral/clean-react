import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import PrivateRoutes from './private-route'

type SutTypes = {
    history: MemoryHistory
}

const makeSut = (): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
        <Router history={history}>
            <PrivateRoutes />
        </Router>
    )
    return { history }
}

describe('PrivateRoutes', () => {
    test('Should redirect to login if token is empty', () => {
        const { history } = makeSut()
        expect(history.location.pathname).toBe('/login')
    })
})