import React, { FormEvent, useEffect, useState } from 'react';
import S from './signup-styles.scss';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/useCases';
import { stat } from 'fs';

type Props = {
    validation: Validation;
    addAccount: AddAccount
}

const SignUp = ({ validation, addAccount }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
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

    useEffect(() => {
        setState({
            ...state,
            nameError: validation.validate('name', state.name),
            emailError: validation.validate('email', state.email),
            passwordError: validation.validate('pasword', state.password),
            passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation),
        })
    }, [state.name, state.email, state.password, state.passwordConfirmation])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (state.isLoading || state.emailError || state.nameError || state.passwordError || state.passwordConfirmationError) {
            return;
        }

        setState({ ...state, isLoading: true });
        await addAccount.add({
            name: state.name,
            email: state.email,
            password: state.password,
            passwordConfirmation: state.passwordConfirmation,
        });
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
                    <Input type="passwordConfirmation" name="passwordConfirmation" placeholder="Repita sua senha" />
                    <button disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError} data-testid="submit" type="submit" className={S.submit}>Cadastrar</button>
                    <span className={S.link}>voltar para login</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default SignUp