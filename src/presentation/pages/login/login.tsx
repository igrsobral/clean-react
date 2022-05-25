import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

import S from './login-styles.scss';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication, SaveAccessToken } from '@/domain/useCases';
import SubmitButton from '@/presentation/components/submitButton/submitButton';

type Props = {
    validation: Validation;
    authentication: Authentication;
    saveAccessToken: SaveAccessToken;
}

const Login = ({ validation, authentication, saveAccessToken }: Props) => {
    const history = useHistory();
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        main: ''
    });

    useEffect(() => {
        const emailError = validation.validate('email', state.email);
        const passwordError = validation.validate('password', state.password);
        setState({
            ...state,
            emailError,
            passwordError,
            isFormInvalid: !!emailError || !!passwordError
        });
    }, [state.email, state.password]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            if (state.isLoading || state.isFormInvalid) return;
            setState({
                ...state,
                isLoading: true,
            });

            const account = await authentication.auth({
                email: state.email,
                password: state.password
            });
            await saveAccessToken.save(account?.accessToken);
            history.replace('/');
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                main: error.message
            });
        }
    }

    return (
        <div className={S.login}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form data-testid="form" className={S.form} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />
                    <SubmitButton text="Entrar" />
                    <Link data-testid="login-link" replace to="/login" className={S.link}>criar conta</Link>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login