import { Login } from '@/presentation/pages';
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '@/presentation/styles/global.scss'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router