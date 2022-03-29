import React, { useState } from 'react';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

import S from './login-styles.scss';


const Login = () => {
    const [state] = useState({
        isLoading: false,
        errorMessage: '',

    });

    const [errorState] = useState({
        email: 'Campo obrigatório',
        password: 'Campo obrigatório',
        main: ''
    });

    return (
        <div className={S.login}>
            <LoginHeader />
            <Context.Provider value={{ state, errorState }}>
                <form className={S.form}>
                    <h1>Login</h1>
                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />
                    <button data-testid="submit" disabled type="submit">Entrar</button>
                    <span className={S.link}>criar conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login