import LoginHeader from '@/presentation/components/login-header/login-header';
import { Logo } from '@/presentation/components/logo/logo';
import { Spinner } from '@/presentation/components/spinner/spinner';
import React from 'react';
import S from './login-styles.scss';

const Login = () => {
    return (
        <div className={S.login}>
            <LoginHeader />
            <form className={S.form}>
                <h1>Login</h1>
                <div className={S.inputWrap}>
                    <input type="text" name="email" placeholder="Digite seu e-mail" />
                </div>
                <div className={S.inputWrap}>
                    <input type="password" name="password" placeholder="Digite sua senha" />
                </div>
                <button type="submit">Entrar</button>
                <a href="">criar conta</a>
                <Spinner />
            </form>
            <footer className={S.footer}>

            </footer>
        </div>
    )
}

export default Login