import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';
import SurveyList from '@/presentation/pages/survey-list/survey-list';
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

type Factory = {
    makeLogin: React.FC;
    makeSignUp: React.FC;
}

const Router = (factory: Factory) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SurveyList} />
                <Route path="/login" exact component={factory.makeLogin} />
                <Route path="/signup" exact component={factory.makeSignUp} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router