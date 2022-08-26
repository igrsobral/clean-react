import React, { FormEvent, useEffect, useState } from 'react';
import S from './signup-styles.scss';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import { Link, useHistory } from 'react-router-dom';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount, UpdateCurrentAccount } from '@/domain/useCases';
import SubmitButton from '@/presentation/components/submitButton/submitButton';

type Props = {
    validation: Validation;
    addAccount: AddAccount;
    updateCurrentAccount: UpdateCurrentAccount;
}

const SignUp = ({ validation, addAccount, updateCurrentAccount }: Props) => {
    const history = useHistory();
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

    useEffect(() => {
        const { name, email, password, passwordConfirmation } = state;
        const formData = { name, email, password, passwordConfirmation };
        const nameError = validation.validate('name', formData);
        const emailError = validation.validate('email', formData);
        const passwordError = validation.validate('password', formData);
        const passwordConfirmationError = validation.validate('passwordConfirmation', formData);

        setState({
            ...state,
            nameError,
            emailError,
            passwordError,
            passwordConfirmationError,
            isFormInvalid: !!emailError || !!nameError || !!passwordError || !!passwordConfirmationError
        })
    }, [state.name, state.email, state.password, state.passwordConfirmation])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            if (state.isLoading || state.isFormInvalid) {
                return;
            }

            setState({ ...state, isLoading: true });
            const account = await addAccount.add({
                name: state.name,
                email: state.email,
                password: state.password,
                passwordConfirmation: state.passwordConfirmation,
            });
            await updateCurrentAccount.save(account);
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