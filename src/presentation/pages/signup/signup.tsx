import React, { FormEvent, useContext, useEffect, useState } from 'react';
import S from './signup-styles.scss';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import { Link, useHistory } from 'react-router-dom';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/useCases';
import SubmitButton from '@/presentation/components/submitButton/submitButton';
import { ApiContext } from '@/presentation/contexts';

type Props = {
    validation: Validation;
    addAccount: AddAccount;
}

const SignUp = ({ validation, addAccount }: Props) => {
    const history = useHistory();
    const { setCurrentAccount } = useContext(ApiContext)
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        nameError: '',
        emailError: '',
        passwordError: 'Campo obrigatório',
        passwordConfirmationError: 'Campo obrigatório',
        main: ''
    })


    useEffect(() => validate('name'), [state.name]);
    useEffect(() => validate('email'), [state.email]);
    useEffect(() => validate('password'), [state.password]);
    useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation]);

    const validate = (field: string): void => {
        setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, state) }))
        setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            if (state.isLoading || state.isFormInvalid) {
                return;
            }

            setState(old => ({ ...old, isLoading: true }));
            const account = await addAccount.add({
                name: state.name,
                email: state.email,
                password: state.password,
                passwordConfirmation: state.passwordConfirmation,
            });
            setCurrentAccount(account);
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
        <div className={S.signup}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form data-testid="form" className={S.form} onSubmit={handleSubmit}>
                    <h1>Criar Conta</h1>
                    <Input type="text" name="name" placeholder="Digite seu nome" />
                    <Input type="text" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />
                    <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
                    <SubmitButton text="Cadatrar" />
                    <Link data-testid="signup-link" to="/signup" className={S.link}>voltar para login</Link>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default SignUp