import React, { useState } from 'react';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

import S from './login-styles.scss';

type StateProps = {
    isLoading: boolean;
    errorMessage: string;
}


const Login = () => {
    const [state] = useState<StateProps>({
        isLoading: false,
        errorMessage: '',
    });

    return (
        <div className={S.login}>
            <LoginHeader />
            <Context.Provider value={state}>
                <form className={S.form}>
                    <h1>Login</h1>
                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />
                    <button type="submit">Entrar</button>
                    <span className={S.link}>criar conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login