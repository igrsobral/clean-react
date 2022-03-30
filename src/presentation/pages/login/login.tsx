import React, { useEffect, useState } from 'react';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

import S from './login-styles.scss';
import { Validation } from '@/presentation/protocols/validation';

type Props = {
    validation: Validation;
}

const Login = ({ validation }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        emailError: 'Campo obrigatório',
        passwordError: 'Campo obrigatório',
        main: ''
    });

    useEffect(() => {   
        validation.validate('email', state.email )
    }, [state.email]);
    useEffect(() => {   
        validation.validate('password', state.password)
    }, [state.password]);
    return (
        <div className={S.login}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
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