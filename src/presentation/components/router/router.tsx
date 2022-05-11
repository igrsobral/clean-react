import { SignUp } from '@/presentation/pages';
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

type Props = {
    makeLogin: React.FC;
}

const Router = ({ makeLogin }: Props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={makeLogin} />
                <Route path="/signup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router