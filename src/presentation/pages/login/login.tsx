import React, { FormEvent, useContext, useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

import S from './login-styles.scss';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/useCases';
import SubmitButton from '@/presentation/components/submitButton/submitButton';
import { ApiContext } from '@/presentation/contexts';

type Props = {
    validation: Validation;
    authentication: Authentication;
}

const Login = ({ validation, authentication }: Props) => {
    const { setCurrentAccount } = useContext(ApiContext)
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

    const validate = (field: string): void => {
        setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, state) }))
        setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
    }

    useEffect(() => validate('email'), [state.email]);
    useEffect(() => validate('password'), [state.password]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            if (state.isLoading || state.isFormInvalid) return;
            setState(old => ({ ...old, isLoading: true }));
            const account = await authentication.auth({
                email: state.email,
                password: state.password
            });
            setCurrentAccount(account);
            history.replace('/');
        } catch (error) {
            setState(old => ({
                ...old,
                isLoading: false,
                main: error.message
            }));
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
                    <Link data-testid="login-link" replace to="/signup" className={S.link}>criar conta</Link>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login