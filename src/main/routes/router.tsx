import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'

import SurveyList from '@/presentation/pages/survey-list/survey-list';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SurveyList} />
                <Route path="/login" exact component={makeLogin} />
                <Route path="/signup" exact component={makeSignUp} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router