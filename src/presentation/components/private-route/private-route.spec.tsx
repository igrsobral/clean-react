import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import PrivateRoutes from './private-route'

describe('PrivateRoutes', () => {
    test('Should redirect to login if token is empty', () => {
        const history = createMemoryHistory({ initialEntries: ['/'] })
        render(
            <Router history={history}>
                <PrivateRoutes />
            </Router>
        )
        expect(history.location.pathname).toBe('/login')
    })
})