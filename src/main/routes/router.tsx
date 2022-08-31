import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'

import SurveyList from '@/presentation/pages/survey-list/survey-list';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter';
const Router = () => {
    return (
        <ApiContext.Provider value={{
            setCurrentAccount: setCurrentAccountAdapter,
            getCurrentAccount: getCurrentAccountAdapter
        }}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={SurveyList} />
                    <Route path="/login" exact component={makeLogin} />
                    <Route path="/signup" exact component={makeSignUp} />
                </Switch>
            </BrowserRouter>
        </ApiContext.Provider>
    )
}

export default Router