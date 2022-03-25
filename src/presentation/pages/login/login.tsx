import React from 'react';
import { LoginHeader } from '@/presentation/components';
import { Input } from '@/presentation/components';
import { Footer } from '@/presentation/components';
import { FormStatus } from '@/presentation/components';

import S from './login-styles.scss';

const Login = () => {
    return (
        <div className={S.login}>
            <LoginHeader />
            <form className={S.form}>
                <h1>Login</h1>
                <Input type="email" name="email" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" placeholder="Digite sua senha" />
                <button type="submit">Entrar</button>
                <span>criar conta</span>
                <FormStatus />
            </form>
            <Footer />
        </div>
    )
}

export default Login