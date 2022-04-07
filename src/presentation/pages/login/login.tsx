import React, { FormEvent, useEffect, useState } from 'react';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

import S from './login-styles.scss';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/useCases';

type Props = {
    validation: Validation;
    authentication: Authentication;
}

const Login = ({ validation, authentication }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        main: ''
    });

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate('email', state.email),
            passwordError: validation.validate('password', state.password)
        });
    }, [state.email, state.password]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (state.isLoading || state.emailError || state.passwordError) return;
        setState({
            ...state,
            isLoading: true,
        });

        await authentication.auth({
            email: state.email,
            password: state.password
        });

    }

    return (
        <div className={S.login}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form data-testid="form" className={S.form} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />
                    <button disabled={!!state.emailError || !!state.passwordError} data-testid="submit" type="submit">Entrar</button>
                    <span className={S.link}>criar conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login