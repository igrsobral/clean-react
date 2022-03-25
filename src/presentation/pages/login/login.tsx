import { Spinner } from '@/presentation/components/spinner/spinner';
import LoginHeader from '@/presentation/components/login-header/login-header';
import Footer from '@/presentation/components/footer/footer';
import React from 'react';
import S from './login-styles.scss';
import Input from '@/presentation/components/input/input';
import FormStatus from '@/presentation/components/form-status/form-status';

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