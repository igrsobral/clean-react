import React, { useState } from 'react';
import S from './signup-styles.scss';
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';


const SignUp = () => {
    const [state, setState] = useState({
        isLoading: false,
        nameError: 'Campo obrigatório',
        emailError: 'Campo obrigatório',
        passwordError: 'Campo obrigatório',
        passwordConfirmationError: 'Campo obrigatório',
        main: ''
    })
    return (
        <div className={S.signup}>
            <LoginHeader />
            <Context.Provider value={{ state }}>
                <form data-testid="form" className={S.form}>
                    <h1>Criar Conta</h1>
                    <Input type="text" name="name" placeholder="Digite seu nome" />
                    <Input type="text" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />
                    <Input type="passwordConfirmation" name="passwordConfirmation" placeholder="Repita sua senha" />
                    <button data-testid="submit" type="submit" disabled className={S.submit}>Cadastrar</button>
                    <span className={S.link}>voltar para login</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default SignUp